# 目录

[[toc]]

## 主从数据同步原理

### 全量同步

主从第一次建立连接时，会执行**全量同步**，将`master`节点的所有数据都拷贝给`slave`节点，流程：

![image-20210725152222497](./img/image-20210725152222497.png)



这里有一个问题，`master`如何得知`salve`是第一次来连接呢？？

有几个概念，可以作为判断依据：

- **Replication Id**：简称`replid`，是数据集的标记，`id`一致则说明是同一数据集。每一个`master`都有唯一的`replid`，`slave`则会继承`master`节点的`replid`
- **offset**：偏移量，随着记录在`repl_baklog`中的数据增多而逐渐增大。`slave`完成同步时也会记录当前同步的`offset`。如果`slave`的`offset`小于`master`的`offset`，说明`slave`数据落后于`master`，需要更新。

因此`slave`做数据同步，必须向`master`声明自己的`replication id` 和`offset`，`master`才可以判断到底需要同步哪些数据。



因为`slave`原本也是一个`master`，有自己的`replid`和`offset`，当第一次变成`slave`，与`master`建立连接时，发送的`replid`和`offset`是自己的`replid`和`offset`。

`master`判断发现`slave`发送来的`replid`与自己的不一致，说明这是一个全新的`slave`，就知道要做全量同步了。

`master`会将自己的`replid`和`offset`都发送给这个`slave`，`slave`保存这些信息。以后`slave`的`replid`就与`master`一致了。

因此，**`master`判断一个节点是否是第一次同步的依据，就是看`replid`是否一致**。

如图：

![image-20210725152700914](./img/image-20210725152700914.png)



完整流程描述：

- `slave`节点请求增量同步
- `master`节点判断`replid`，发现不一致，拒绝增量同步
- `master`将完整内存数据生成`RDB`，发送`RDB`到`slave`
- `slave`清空本地数据，加载`master`的`RDB`
- `master`将RDB期间的命令记录在`repl_baklog`，并持续将`log`中的命令发送给`slave`
- `slave`执行接收到的命令，保持与`master`之间的同步



### 增量同步

全量同步需要先做`RDB`，然后将`RDB`文件通过网络传输个`slave`，成本太高了。因此除了第一次做全量同步，其它大多数时候`slave`与`master`都是做**增量同步**。

什么是增量同步？就是只更新`slave`与`master`存在差异的部分数据。如图：

![image-20210725153201086](./img/image-20210725153201086.png)



那么`master`怎么知道`slave`与自己的数据差异在哪里呢?



### repl_backlog原理

`master`怎么知道`slave`与自己的数据差异在哪里呢?

这就要说到全量同步时的`repl_baklog`文件了。

这个文件是一个固定大小的数组，只不过数组是环形，也就是说**角标到达数组末尾后，会再次从0开始读写**，这样数组头部的数据就会被覆盖。

`repl_baklog`中会记录`Redis`处理过的命令日志及`offset`，包括`master`当前的`offset`，和`slave`已经拷贝到的`offset`：

![image-20210725153359022](./img/image-20210725153359022.png) 

`slave`与`master`的`offset`之间的差异，就是`salve`需要增量拷贝的数据了。

随着不断有数据写入，`master`的`offset`逐渐变大，`slave`也不断的拷贝，追赶`master`的`offset`：

![image-20210725153524190](./img/image-20210725153524190.png) 



直到数组被填满：

![image-20210725153715910](./img/image-20210725153715910.png) 

此时，如果有新的数据写入，就会覆盖数组中的旧数据。不过，旧的数据只要是绿色的，说明是已经被同步到`slave`的数据，即便被覆盖了也没什么影响。因为未同步的仅仅是红色部分。



但是，如果`slave`出现网络阻塞，导致`master`的`offset`远远超过了`slave`的`offset`： 

![image-20210725153937031](./img/image-20210725153937031.png) 

如果`master`继续写入新数据，其`offset`就会覆盖旧的数据，直到将`slave`现在的`offset`也覆盖：

![image-20210725154155984](./img/image-20210725154155984.png) 



棕色框中的红色部分，就是尚未同步，但是却已经被覆盖的数据。此时如果`slave`恢复，需要同步，却发现自己的`offset`都没有了，无法完成增量同步了。只能做全量同步。

![image-20210725154216392](./img/image-20210725154216392.png)





## 主从同步优化

主从同步可以保证主从数据的一致性，非常重要。

可以从以下几个方面来优化`Redis`主从集群：

- 在`master`中配置`repl-diskless-sync yes`启用无磁盘复制，避免全量同步时的磁盘IO。
- `Redis`单节点上的内存占用不要太大，减少`RDB`导致的过多磁盘IO
- 适当提高`repl_baklog`的大小，发现`slave`宕机时尽快实现故障恢复，尽可能避免全量同步
- 限制一个`master`上的`slave`节点数量，如果实在是太多`slave`，则可以采用主-从-从链式结构，减少`master`压力

主从从架构图：

![image-20210725154405899](./img/image-20210725154405899.png)



## 小结

简述全量同步和增量同步区别？

- 全量同步：`master`将完整内存数据生成`RDB`，发送`RDB`到`slave`。后续命令则记录在`repl_baklog`，逐个发送给`slave`。
- 增量同步：`slave`提交自己的`offset`到`master`，`master`获取`repl_baklog`中从`offset`之后的命令给`slave`

什么时候执行全量同步？

- `slave`节点第一次连接`master`节点时
- `slave`节点断开时间太久，`repl_baklog`中的`offset`已经被覆盖时

什么时候执行增量同步？

- `slave`节点断开又恢复，并且在`repl_baklog`中能找到`offset`时





