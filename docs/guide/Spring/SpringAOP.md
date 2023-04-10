---
title: SpringAOP
---
# 目录

[[toc]]

## Spring AOP
`AOP`（Aspect-Oriented Programming，面向切面编程）能够将那些与业务无关，却为业务模块所共同调用的逻辑 或责任（例如事务处理、日志管理、权限控制等）封装起来，便于减少系统的重复代码，降低模块间的耦合度  

> 大白话说就是：在不改变源代码的情况下，实现对源代码功能的增强

`Spring AOP`是基于动态代理的

- 如果要代理的对象实现了某个接口，那么就会使用`JDK`动态代理去创建代理对象；
- 而对于没有实现接口的对象，就使用`CGlib`动态代理生成一个被代理对象的子类来作为代理。  

`Spring AOP`中已经集成了`AspectJ`  

- `Spring AOP` 是属于运行时增强，而`AspectJ`是编译时增强。
- `Spring AOP`基于代理（Proxying），而`AspectJ`基于字节码操作（Bytecode Manipulation）。  

## JDK动态代理、CGLIB动态代理
### JDK动态代理
`jdk`中是使用`Proxy`类来创建代理的，而`Proxy`类只能为接口生成代理类 ，所以`jdk`动态代理只能为接口生成代理
`jdk`中为实现代理提供了支持，主要用到2个类： 

> java.lang.reflect.Proxy 
> java.lang.reflect.InvocationHandler 

**java.lang.reflect.Proxy**

这是`jdk`动态代理中主要的一个类，里面有一些静态方法会经常用到  

```java
// 为指定的接口创建代理类，返回代理类的Class对象 
// loader：定义代理类的类加载器
// interfaces：指定需要实现的接口列表，创建的代理默认会按顺序实现interfaces指定的接口
public static Class<?> getProxyClass(ClassLoader loader,
										Class<?>... interfaces)
// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 

// 创建代理类的实例对象
public static Object newProxyInstance(ClassLoader loader,
					Class<?>[] interfaces,InvocationHandler h)
// 其中 InvocationHandler是个接口
public Object invoke(Object proxy, Method method, Object[] args) throws Throwable;
/** 
newProxyInstance方法会返回一个代理对象，当调用代理对象的任何方法的时候，
就会被 InvocationHandler 接口的 invoke 方法处理，
所以主要代码需要卸载 invoke 方法中
*/
// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 

// 判断指定的类是否是一个代理类
public static boolean isProxyClass(Class<?> cl)
// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 

// 获取代理对象的 InvocationHandler 对象
public static InvocationHandler getInvocationHandler(Object proxy)
											throws IllegalArgumentException
```
#### 创建代理

##### 方式一
> 1.使用`InvocationHandler`接口创建代理类的处理器 
> 2.使用`Proxy`类的静态方法`newProxyInstance`直接创建代理对象 
> 3.使用代理对象 
> （也可以自定义一个类，实现  `InvocationHandler`  接口，重写 `invoke` 方法来作为代理类的处理器）

```java
// IService 接口
public interface IService {
	void m1();
	void m2();
	void m3();
}

@Test
public void m2() throws Exception {
	// 1. 创建代理类的处理器
	InvocationHandler invocationHandler = new InvocationHandler() {
		@Override
		public Object invoke(Object proxy, Method method, Object[] args) throws Throwable {
			System.out.println("我是InvocationHandler，被调用的方法是：" +
			method.getName());
			return null;
		}
	};
	// 2. 创建代理实例
	IService proxyService = (IService) Proxy.newProxyInstance(IService.class.getClassLoader(), 
                                                              new Class[]{IService.class}, invocationHandler);
	// 3. 调用代理的方法
	proxyService.m1();
	proxyService.m2();
	proxyService.m3();
}
```
##### 方式二
> 1.调用Proxy.getProxyClass方法获取代理类的`Class`对象 
> 2.使用`InvocationHandler`接口创建代理类的处理器 
> 3.通过代理类和`InvocationHandler`创建代理对象 
> 4.上面已经创建好代理对象了，接着我们就可以使用代理对象了

```java
// 创建 IService 接口的代理对象
@Test
public void m1() throws Exception {
	// 1. 获取接口对应的代理类
	Class<IService> proxyClass = (Class<IService>)
		Proxy.getProxyClass(IService.class.getClassLoader(), 
                            IService.class);
	// 2. 创建代理类的处理器
	InvocationHandler invocationHandler = new InvocationHandler() {
		@Override
		public Object invoke(Object proxy, Method method, Object[] args) throws Throwable {
			System.out.println("我是InvocationHandler，被调用的方法是：" + method.getName());
			return null;
		}
	};
	// 3. 创建代理实例
	IService proxyService = proxyClass.getConstructor(InvocationHandler.class)
        							  .newInstance(invocationHandler);
	// 4. 调用代理的方法
	proxyService.m1();
	proxyService.m2();
	proxyService.m3();
}
```
### CGLIB动态代理
如果我们想为普通的类也实现代理功能，我们就需要用到`cglib`来实现 

`cglib`是一个强大、高性能的字节码生成库，它用于在运行时扩展`Java`类和实现接口；

本质上它是通过动态的生成一个子类去覆盖所要代理的类（非final修饰的类和方法）。

`Enhancer`可能是`CGLIB`中最常用的 一个类，和`jdk`中的`Proxy`不同的是，`Enhancer`既能够代理普通的`class`，也能够代理接口。

`Enhancer`创 建一个被代理对象的子类并且拦截所有的方法调用（包括从`Object`中继承的`toString`和`hashCode`方 法）。

`Enhancer`不能够拦截`final`方法，例如`Object.getClass()`方法，这是由于`Java` `final`方法语义决定 的。

基于同样的道理，`Enhancer`也不能对`final`类进行代理操作  



## 关注点、横切关注点、连接点、切入点

- 关注点是应用中一个模块的行为，一个关注点可能会被定义成一个我们想实现的一个功能  
- 横切关注点也是一个关注点，此关注点是整个应用都会使用的功能，并影响整个应用，比如日志，安全和数据传输，几乎应用的每个模块都需要的功能。因此这些都属于横切关注点。  
- 连接点代表一个应用程序的某个位置，在这个位置我们可以插入一个`AOP`切面，它实际上是个应用程序执行`Spring AOP`的位置 
-  切入点是一个或一组连接点，通知将在这些位置执行  
## 通知
通知是个在方法执行前或执行后要做的动作，实际上是程序执行时要通过`SpringAOP`框架触发的代码段 

`Spring`切面可以应用五种类型的通知： 

- **before**：前置通知，在一个方法执行前被调用。 
- **after**: 在方法执行之后调用的通知，无论方法执行是否成功。 
- **after-returning**: 仅当方法成功完成后执行的通知。 
- **after-throwing**: 在方法抛出异常退出时执行的通知。 
- **around**: 在方法执行之前和之后调用的通知。  
## SpringAOP中一些概念
**目标对象(target)** 
目标对象指将要被增强的对象，即包含主业务逻辑的类对象。 

**连接点(JoinPoint)**
连接点，程序运行的某一个点，比如执行某个方法，在`Spring AOP`中`Join Point`总是表示一个方法的执行 

**代理对象(Proxy)**
`AOP`中会通过代理的方式，对目标对象生成一个代理对象，代理对象中会加入需要增强功能，通过代理 对象来间接的方式目标对象，起到增强目标对象的效果。 

**通知(Advice)**
需要在目标对象中增强的功能，如：业务方法前验证用户的功能、方法执行之后打印方法的执行日志。 
通知中有2个重要的信息：方法的什么地方，执行什么操作，这2个信息通过通知来指定。

**切入点(Pointcut )**
用来指定需要将通知使用到哪些地方，比如需要用在哪些类的哪些方法上，切入点就是做这个配置的。 

**切面（Aspect）** 
通知（Advice）和切入点（Pointcut）的组合。切面来定义在哪些地方（Pointcut）执行什么操作 （Advice）。 

**顾问（Advisor)**
`Advisor` 其实它就是 `Pointcut` 与 `Advice` 的组合，`Advice` 是要增强的逻辑，而增强的逻辑要在什么地方 执行是通过`Pointcut`来指定的，所以 `Advice` 必需与 `Pointcut` 组合在一起，这就诞生了 `Advisor` 这个 类，`spring Aop`中提供了一个`Advisor`接口将`Pointcut` 与 `Advice` 的组合起来。 `Advisor`有好几个称呼：顾问、通知器。  





