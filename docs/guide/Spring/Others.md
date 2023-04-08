# 目录

[[toc]]

## @Autowired 和 @Resource 的区别？  

**@Autowired**
 `@Autowired`为`Spring`提供的注解，是按照类型（byType）装配依赖对象，默认情况下它要求依赖对象必须存在，如果允许null值， 可以设置它的`required`属性为`false`。如果我们想使用按照名称（byName）来装配，可以结合`@Qualifier`注解一起使用  

```java
public class TestServiceImpl {
	// 下面两种@Autowired只要使用一种即可
	@Autowired
	private UserDao userDao; // 用于字段上
	@Autowired
	public void setUserDao(UserDao userDao) { // 用于属性的方法上
		this.userDao = userDao;
	}
}

public class TestServiceImpl {
	@Autowired
	@Qualifier("userDao")
	private UserDao userDao;
}

```
**@Resource**
`@Resource` 是`Java`的注解，默认按照`ByName`自动注入，`@Resource`有两个重要的属性：`name`和`type`，而`Spring`将`@Resource`注解的`name`属性解析为`bean`的名字，而`type`属性则解析为`bean`的类型  

```java
public class TestServiceImpl {
	// 下面两种@Resource只要使用一种即可
	//name="userDao"这里就是只定了name
	@Resource(name="userDao")
	private UserDao userDao; // 用于字段上
    
	@Resource(name="userDao")
	public void setUserDao(UserDao userDao) { // 用于属性的setter方法上
		this.userDao = userDao;
	}
}
```
**注：最好是将 @Resource 放在setter方法上，因为这样更符合面向对象的思想，通过set、get去操作属性，而不是 直接去操作属性。** 
@Resource 装配顺序： 

- 如果同时指定了`name`和`type`，则从`Spring`上下文中找到唯一匹配的`bean`进行装配，找不到则抛出异常。 
- 如果指定了`name`，则从上下文中查找名称（id）匹配的`bean`进行装配，找不到则抛出异常。  
-  如果指定了`type`，则从上下文中找到类似匹配的唯一`bean`进行装配，找不到或是找到多个，都会抛出异常。 
- 如果既没有指定`name`，又没有指定`type`，则自动按照`byName`方式进行装配；如果没有匹配，则回退为一个 原始类型进行匹配，如果匹配则自动装配。  

## Spring中Bean的几种作用域
（1）singleton：默认，每个容器中只有一个bean的实例，单例的模式由BeanFactory自身来维护。 

（2）prototype：为每一个bean请求提供一个实例。 

（3）request：为每一个网络请求创建一个实例，在请求完成以后，bean会失效并被垃圾回收器回收。 

（4）session：与request范围类似，确保每个session中有一个bean的实例，在session过期后，bean会随之失 效。 

（5）global-session：全局作用域，global-session和Portlet应用相关。当你的应用部署在Portlet容器中工作时， 它包含很多portlet。

如果你想要声明让所有的portlet共用全局的存储变量的话，那么这全局变量需要存储在 global-session中。

全局作用域与Servlet中的session作用域效果相同。  

## Spring事务的传播级别
事务的传播行为是指，多个声明了事务的方法，在互相调用时，事务应该如何传递
`Spring`事务定义了7种传播机制： 

1. `PROPAGATION_REQUIRED`:默认的Spring事物传播级别，若当前存在事务，则加入该事务，若不存在事务， 则新建一个事务。 
2. `PAOPAGATION_REQUIRE_NEW`:若当前没有事务，则新建一个事务。若当前存在事务，则新建一个事务，新老事务相互独立。外部事务抛出异常回滚不会影响内部事务的正常提交。 
3. `PROPAGATION_NESTED`:如果当前存在事务，则嵌套在当前事务中执行。如果当前没有事务，则新建一个事 务，类似于`REQUIRE_NEW`。 
4. `PROPAGATION_SUPPORTS`:支持当前事务，若当前不存在事务，以非事务的方式执行。 
5. `PROPAGATION_NOT_SUPPORTED`:以非事务的方式执行，若当前存在事务，则把当前事务挂起。 
6. `PROPAGATION_MANDATORY`:强制事务执行，若当前不存在事务，则抛出异常. 
7. `PROPAGATION_NEVER`:以非事务的方式执行，如果当前存在事务，则抛出异常。  
## 事务注解的本质是什么？  
声明式事务主要是得益于`Spring AOP`。使用一个事务拦截器，在方法调用的前后/周围进行事务性增强 （advice），来驱动事务完成 

`@Transactional` 注解具有两方面功能，一是表明该方法要参与事务，二是配置相关属性来定制事务的参与方式和运行行为 

`@Transactional` 注解既可以标注在类上，也可以标注在方法上。

当在类上时，默认应用到类里的所有方法。

如果 此时方法上也标注了，则方法上的优先级高。 

> 另外注意方法一定要是`public`的  

## BeanFactory和FactoryBean
`BeanFactory` 是 `IOC`容器，是用来装载对象的

`FactoryBean` 是一个接口类型的`Bean`，当我们容器中的`Bean`实现该接口时，通过`getBean(beanName)`获取`Bean`时，获取到的并不是接口的实现类对象，而是接口中`getObject`方法所返回的对象。

只有通过`getBean(&beanName)`获取到的才是接口的实现类对象。

> 是`Spring`对`Bean`的一种扩展

## @Repository、@Service、@Compent、@Controller它们有什么区别
这四个注解的本质都是一样的，都是将被该注解标识的对象放入 spring 容器当中，只是为了在使用上区分不同的应用分层

- @Repository:	dao层
- @Service:	service层
- @Controller:	controller层
- @Compent:	其他不属于以上三层的统一使用该注解



