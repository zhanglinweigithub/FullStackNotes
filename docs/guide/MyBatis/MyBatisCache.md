# 目录

[[toc]]

## Mybatis的缓存机制

`mybatis`中分为一级缓存和二级缓存

### **一级缓存**

​	是`SqlSession`级别的缓存，在操作数据库时需要构造 `sqlSession`对象，在对象中有一个数据结 构（HashMap）用于存储缓存数据，不同的`sqlSession`之

​	间的缓存数据区域（`HashMap`）是互相不影响的，`mybatis`中一级缓存是默认自动开启的

工作原理：

​	在同一个`SqlSession`中去多次去执行同样的查询，每次执行的时候会先到一级缓存 中查找，如果缓存中有就直接返回，如果一级缓存中没有相关数据，`mybatis`

​	就会去`db`中进行查找，然 后将查找到的数据放入一级缓存中，第二次执行同样的查询的时候，会发现缓存中已经存在了，会直接 返回。一级缓存的存储介质是

​	内存，是用一个`HashMap`来存储数据的，所以访问速度是非常快的

让一级缓存失效有3种方式：

1. `SqlSession`中执行增、删、改操作，此时`sqlsession`会自动清理其内部的一级缓存
2. 调用`SqlSession`中的`clearCache`方法清理其内部的一级缓存
3. 设置`Mapper` `xml`中`select`元素的`flushCache`属性值为`true`，那么执行查询的时候会先清空一级 缓存中的所有数据，然后去`db`中获取数据



~~~
一级缓存使用上存在局限性，必须要在同一个SqlSession中执行同样的查询，一级缓存才能提升查询速
度，如果想在不同的SqlSession之间使用缓存来加快查询速度，此时我们需要用到二级缓存了。
~~~



### **二级缓存**

​	二级缓存是`mapper`级别的缓存，每个`mapper.xml`有个`namespace`，二级缓存和`namespace`绑定的， 每个`namespace`关联一个二级缓存，多个`SqlSession`可

​	以共用二级缓存，二级缓存是跨`SqlSession`的

​	二级缓存默认是没有开启的，需要我们在`mybatis`全局配置文件中进行开启

~~~xml
<settings>
<!-- 开启二级缓存 -->
<setting name="cacheEnabled" value="true"/>
</settings>
<!-- 上面配置好了以后，还需要在对应的mapper.xml加上下面配置，表示这个mapper中的查询开启二级缓存 -->
<cache/>
~~~



### **一二级缓存共存时查询原理**

1. 当发起一个查询的时候，`mybatis`会先访问这个`namespace`对应的二级缓存，如果二级缓存中有 数据则直接返回，否则继续向下 
2. 查询一级缓存中是否有对应的数据，如果有则直接返回，否则继续向下 
3. 访问db获取需要的数据，然后放在当前`SqlSession`对应的二级缓存中，并且在本地内存中的另外 一个地方存储一份（这个地方我们就叫`TransactionalCache`） 
4. 当`SqlSession`关闭的时候，也就是调用`SqlSession`的`close`方法的时候，此时会将 `TransactionalCache`中的数据放到二级缓存中，并且会清空当前`SqlSession`一级缓存中的数据



### **清空或者跳过二级缓存的3种方式**

   1.对应的`mapper`中执行增删改查会清空二级缓存中数据 

2. `select`元素的`flushCache`属性置为`true`，会先清空二级缓存中的数据，然后再去`db`中查询数据， 然后将数据再放到二级缓存中 
3. select元素的`useCache`属性置为`true`，可以使这个查询跳过二级缓存，然后去查询数据