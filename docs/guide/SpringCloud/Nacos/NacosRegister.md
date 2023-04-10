---
title: Nacos注册中心
---
# 目录

[[toc]]

## Nacos注册中心

国内公司一般都推崇阿里巴巴的技术，比如注册中心，SpringCloudAlibaba也推出了一个名为Nacos的注册中心。

## 服务注册到Nacos

`Nacos`是`SpringCloudAlibaba`的组件，而`SpringCloudAlibaba`也遵循`SpringCloud`中定义的服务注册、服务发现规范。因此使用`Nacos`和使用`Eureka`对于微服务来说，并没有太大区别。

主要差异在于：

- 依赖不同
- 服务地址不同



### 1）引入依赖

父工程的`pom`文件中的`<dependencyManagement>`中引入`SpringCloudAlibaba`的依赖：

```xml
<dependency>
    <groupId>com.alibaba.cloud</groupId>
    <artifactId>spring-cloud-alibaba-dependencies</artifactId>
    <version>2.2.6.RELEASE</version>
    <type>pom</type>
    <scope>import</scope>
</dependency>
```

然后在user-service和order-service中的`pom`文件中引入`nacos-discovery`依赖：

```xml
<dependency>
    <groupId>com.alibaba.cloud</groupId>
    <artifactId>spring-cloud-starter-alibaba-nacos-discovery</artifactId>
</dependency>
```

### 2）配置nacos地址

在user-service和order-service的`application.yml`中添加`nacos`地址：

```yaml
spring:
  cloud:
    nacos:
      server-addr: localhost:8848
```



### 3）重启

重启微服务后，登录`nacos`管理页面，可以看到微服务信息：

![image-20210713231439607](./img/image-20210713231439607.png)



## 服务分级存储模型

一个**服务**可以有多个**实例**，例如我们的user-service，可以有:

- 127.0.0.1:8081
- 127.0.0.1:8082
- 127.0.0.1:8083

假如这些实例分布于全国各地的不同机房，例如：

- 127.0.0.1:8081，在上海机房
- 127.0.0.1:8082，在上海机房
- 127.0.0.1:8083，在杭州机房

`Nacos`就将同一机房内的实例 划分为一个**集群**。

也就是说，user-service是服务，一个服务可以包含多个集群，如杭州、上海，每个集群下可以有多个实例，形成分级模型，如图：

![image-20210713232522531](./img/image-20210713232522531.png)



微服务互相访问时，应该尽可能访问同集群实例，因为本地访问速度更快。当本集群内不可用时，才访问其它集群。例如：

![image-20210713232658928](./img/image-20210713232658928.png)

杭州机房内的order-service应该优先访问同机房的user-service。





### 给user-service配置集群



修改user-service的`application.yml`文件，添加集群配置：

```yaml
spring:
  cloud:
    nacos:
      server-addr: localhost:8848
      discovery:
        cluster-name: HZ # 集群名称
```

重启两个user-service实例后，我们可以在`nacos`控制台看到下面结果：

![image-20210713232916215](./img/image-20210713232916215.png)



我们再次复制一个user-service启动配置，添加属性：

```sh
-Dserver.port=8083 -Dspring.cloud.nacos.discovery.cluster-name=SH
```

配置如图所示：

![image-20210713233528982](./img/image-20210713233528982.png)



启动UserApplication3后再次查看`nacos`控制台：

![image-20210713233727923](./img/image-20210713233727923.png)



### 同集群优先的负载均衡

默认的`ZoneAvoidanceRule`并不能实现根据同集群优先来实现负载均衡。

因此`Nacos`中提供了一个`NacosRule`的实现，可以优先从同集群中挑选实例。

1）给order-service配置集群信息

修改order-service的`application.yml`文件，添加集群配置：

```yaml
spring:
  cloud:
    nacos:
      server-addr: localhost:8848
      discovery:
        cluster-name: HZ # 集群名称
```



2）修改负载均衡规则

修改order-service的`application.yml`文件，修改负载均衡规则：

```yaml
userservice:
  ribbon:
    NFLoadBalancerRuleClassName: com.alibaba.cloud.nacos.ribbon.NacosRule # 负载均衡规则 
```



## 权重配置

实际部署中会出现这样的场景：

服务器设备性能有差异，部分实例所在机器性能较好，另一些较差，我们希望性能好的机器承担更多的用户请求。

但默认情况下`NacosRule`是同集群内随机挑选，不会考虑机器的性能问题。



因此，`Nacos`提供了权重配置来控制访问频率，权重越大则访问频率越高。



在`nacos`控制台，找到user-service的实例列表，点击编辑，即可修改权重：

![image-20210713235133225](./img/image-20210713235133225.png)

在弹出的编辑窗口，修改权重：

![image-20210713235235219](./img/image-20210713235235219.png)





> **注意**：如果权重修改为0，则该实例永远不会被访问



## 环境隔离

`Nacos`提供了`namespace`来实现环境隔离功能。

- `nacos`中可以有多个`namespace`
- `namespace`下可以有`group`、`service`等
- 不同`namespace`之间相互隔离，例如不同`namespace`的服务互相不可见



![image-20210714000101516](./img/image-20210714000101516.png)



### 创建namespace

默认情况下，所有service、data、group都在同一个namespace，名为public：

![image-20210714000414781](./img/image-20210714000414781.png)



我们可以点击页面新增按钮，添加一个namespace：

![image-20210714000440143](./img/image-20210714000440143.png)



然后，填写表单：

![image-20210714000505928](./img/image-20210714000505928.png)

就能在页面看到一个新的namespace：

![image-20210714000522913](./img/image-20210714000522913.png)



### 给微服务配置namespace

给微服务配置`namespace`只能通过修改配置来实现。

例如，修改order-service的`application.yml`文件：

```yaml
spring:
  cloud:
    nacos:
      server-addr: localhost:8848
      discovery:
        cluster-name: HZ
        namespace: 492a7d5d-237b-46a1-a99a-fa8e98e4b0f9 # 命名空间，填ID
```



重启order-service后，访问控制台，可以看到下面的结果：

![image-20210714000830703](./img/image-20210714000830703.png)



![image-20210714000837140](./img/image-20210714000837140.png)

此时访问order-service，因为`namespace`不同，会导致找不到userservice，控制台会报错：

![image-20210714000941256](./img/image-20210714000941256.png)



## Nacos与Eureka的区别

`Nacos`的服务实例分为两种l类型：

- 临时实例：如果实例宕机超过一定时间，会从服务列表剔除，默认的类型。

- 非临时实例：如果实例宕机，不会从服务列表剔除，也可以叫永久实例。



配置一个服务实例为永久实例：

```yaml
spring:
  cloud:
    nacos:
      discovery:
        ephemeral: false # 设置为非临时实例
```





Nacos和Eureka整体结构类似，服务注册、服务拉取、心跳等待，但是也存在一些差异：

![image-20210714001728017](./img/image-20210714001728017.png)



- Nacos与eureka的共同点
  - 都支持服务注册和服务拉取
  - 都支持服务提供者心跳方式做健康检测

- Nacos与Eureka的区别
  - Nacos支持服务端主动检测提供者状态：临时实例采用心跳模式，非临时实例采用主动检测模式
  - 临时实例心跳不正常会被剔除，非临时实例则不会被剔除
  - Nacos支持服务列表变更的消息推送模式，服务列表更新更及时
  - Nacos集群默认采用AP方式，当集群中存在非临时实例时，采用CP模式；Eureka采用AP方式

