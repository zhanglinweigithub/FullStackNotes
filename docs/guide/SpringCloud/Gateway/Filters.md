---
title: 过滤器
---
# 目录

[[toc]]

## 过滤器工厂

`GatewayFilter`是网关中提供的一种过滤器，可以对进入网关的请求和微服务返回的响应做处理：

![image-20210714212312871](./img/image-20210714212312871.png)



### 路由过滤器的种类

`Spring`提供了31种不同的路由过滤器工厂。例如：

| **名称**             | **说明**                     |
| -------------------- | ---------------------------- |
| AddRequestHeader     | 给当前请求添加一个请求头     |
| RemoveRequestHeader  | 移除请求中的一个请求头       |
| AddResponseHeader    | 给响应结果中添加一个响应头   |
| RemoveResponseHeader | 从响应结果中移除有一个响应头 |
| RequestRateLimiter   | 限制请求的流量               |



### 请求头过滤器

下面我们以`AddRequestHeader` 为例来讲解。

> **需求**：给所有进入userservice的请求添加一个请求头：Truth=itcast is freaking awesome!



只需要修改`gateway`服务的`application.yml`文件，添加路由过滤即可

```yaml
spring:
  cloud:
    gateway:
      routes:
      - id: user-service 
        uri: lb://userservice 
        predicates: 
        - Path=/user/** 
        filters: # 过滤器
        - AddRequestHeader=Truth, Itcast is freaking awesome! # 添加请求头
```

当前过滤器写在`userservice`路由下，因此仅仅对访问`userservice`的请求有效。





### 默认过滤器

如果要对所有的路由都生效，则可以将过滤器工厂写到`default`下。格式如下：

```yaml
spring:
  cloud:
    gateway:
      routes:
      - id: user-service 
        uri: lb://userservice 
        predicates: 
        - Path=/user/**
      default-filters: # 默认过滤项
      - AddRequestHeader=Truth, Itcast is freaking awesome! 
```



### 总结

过滤器的作用是什么？

① 对路由的请求或响应做加工处理，比如添加请求头

② 配置在路由下的过滤器只对当前路由的请求生效

`defaultFilters`的作用是什么？

① 对所有路由都生效的过滤器



## 全局过滤器

上面说道的过滤器，网关提供了31种，但每一种过滤器的作用都是固定的。

如果我们希望拦截请求，做自己的业务逻辑则没办法实现。

### 全局过滤器作用

全局过滤器的作用也是处理一切进入网关的请求和微服务响应，与`GatewayFilter`的作用一样。区别在于`GatewayFilter`通过配置定义，处理逻辑是固定的；

而`GlobalFilter`的逻辑需要自己写代码实现。

定义方式是实现`GlobalFilter`接口。

```java
public interface GlobalFilter {
    /**
     *  处理当前请求，有必要的话通过{@link GatewayFilterChain}将请求交给下一个过滤器处理
     *
     * @param exchange 请求上下文，里面可以获取Request、Response等信息
     * @param chain 用来把请求委托给下一个过滤器 
     * @return {@code Mono<Void>} 返回标示当前过滤器业务结束
     */
    Mono<Void> filter(ServerWebExchange exchange, GatewayFilterChain chain);
}
```



在`filter`中编写自定义逻辑，可以实现下列功能：

- 登录状态判断
- 权限校验
- 请求限流等





### 自定义全局过滤器

需求：定义全局过滤器，拦截请求，判断请求的参数是否满足下面条件：

- 参数中是否有`authorization`，

- `authorization`参数值是否为`admin`

如果同时满足则放行，否则拦截



实现：

在`gateway`中定义一个过滤器：

```java
@Order(-1)
@Component
public class AuthorizeFilter implements GlobalFilter {
    @Override
    public Mono<Void> filter(ServerWebExchange exchange, GatewayFilterChain chain) {
        // 1.获取请求参数
        MultiValueMap<String, String> params = exchange.getRequest().getQueryParams();
        // 2.获取authorization参数
        String auth = params.getFirst("authorization");
        // 3.校验
        if ("admin".equals(auth)) {
            // 放行
            return chain.filter(exchange);
        }
        // 4.拦截
        // 4.1.禁止访问，设置状态码
        exchange.getResponse().setStatusCode(HttpStatus.FORBIDDEN);
        // 4.2.结束处理
        return exchange.getResponse().setComplete();
    }
}
```





### 过滤器执行顺序

请求进入网关会碰到三类过滤器：当前路由的过滤器、`DefaultFilter`、`GlobalFilter`

请求路由后，会将当前路由过滤器和`DefaultFilter`、`GlobalFilter`，合并到一个过滤器链（集合）中，排序后依次执行每个过滤器：

![image-20210714214228409](./img/image-20210714214228409.png)



排序的规则是什么呢？

- 每一个过滤器都必须指定一个`int`类型的`order`值，**`order`值越小，优先级越高，执行顺序越靠前**。
- `GlobalFilter`通过实现`Ordered`接口，或者添加`@Order`注解来指定`order`值，由我们自己指定
- 路由过滤器和`defaultFilter`的`order`由`Spring`指定，默认是按照声明顺序从`1`递增。
- 当过滤器的`order`值一样时，会按照 `defaultFilter` > 路由过滤器 > `GlobalFilter`的顺序执行。



详细内容，可以查看源码：

`org.springframework.cloud.gateway.route.RouteDefinitionRouteLocator#getFilters()`方法是先加载defaultFilters，然后再加载某个`route`的`filters`，然后合并。



`org.springframework.cloud.gateway.handler.FilteringWebHandler#handle()`方法会加载全局过滤器，与前面的过滤器合并后根据`order`排序，组织过滤器链

