# 目录

[[toc]]

## Spring IOC
`IOC`就是控制反转，是一个`Spring`容器

使用者之前要使用`B`对象的时候都需要自己去创建和组装，而现在这些创建和组装都交给`Spring`容器去给完成了，使用者只需要去`Spring`容器中查找需要使用的对象就可以了 

这个过程中`B`对象的创建和组装，之前是由开发者控制的，现在交给了`Spring`去控制，即控制反转

作用： 主要是为了降低系统代码的耦合度，让系统利于维护和扩展  

## DI

`DI`，依赖注入

> `IOC`是一种设计理念，而`DI`是这种理念的实现

依赖注入是`spring`容器中创建对象时给其设置依赖对象的方式 

比如给`spring`一个清单，清单中列出了需要创建`B`对象以及其他的一些对象（可能包含了`B`类型中需要依赖对象），此时`spring`在创建`B`对象的时候，会看`B`对象需要依赖于哪些对象，然后去查找一下清单中有没有包含这些被依赖的对象，如果有就去将其创建好，然后将其传递给`B`对象；

可能`B`需要依赖于很多对象，`B`创建之前完全不需要知道其他对象是否存在或者其他对象在哪里以及被他们是如何创建，而`spring`容器会将`B`依赖对象主动创建好并将其注入到`B`中去

比如`spring`容器创建`B`的时候，发现`B`需要依赖于`A`，那么`spring`容器在清单中找到`A` 的定义并将其创建好之后，注入到`B`对象中。  

## Spring 容器对象

### BeanFactory接口  

`spring`容器中具有代表性的容器就是`BeanFactory`接口，这个是`spring`容器的顶层接口，提供了容器最 基本的功能。  

```java
//按bean的id或者别名查找容器中的bean
Object getBean(String name) throws BeansException
    
//按照bean的id或者别名查找指定类型的bean，返回指定类型的bean对象
<T> T getBean(String name, Class<T> requiredType) throws BeansException;

//返回容器中指定类型的bean对象
<T> T getBean(Class<T> requiredType) throws BeansException;

//获取指定类型bean对象的获取器，这个方法比较特别，以后会专门来讲
<T> ObjectProvider<T> getBeanProvider(Class<T> requiredType);
```
### ApplicationContext接口  
这个接口继承了`BeanFactory`接口，所以内部包含了`BeanFactory`所有的功能，并且在其上进行了扩 展，增加了很多企业级功能，比如`AOP`、国际化、事件支持等等  
### ClassPathXmlApplicationContext类  

这个类实现了`ApplicationContext`接口，注意一下这个类名称包含了`ClassPathXml`，说明这个容器类 可以从`classpath`中加载`bean.xml`配置文件，然后创建`xml`中配置的`bean`对象  
### AnnotationConfigApplicationContext类  
这个类也实现了`ApplicationContext`接口，注意其类名包含了`Annotation`和`config`两个单词，当我们使用注解的方式定义`bean`的时候，就需要用到这个容器来装载了，这个容器内部会解析注解来构建构建和管理需要的`bean`。  
## ApplicationContext 和 BeanFactory 的区别 
`BeanFactory` 是 `Spring` 框架的基础设施，面向 `Spring` 本身；

而 `ApplicationContext` 面向使用 `Spring` 的开发者， 相比 `BeanFactory` 提供了更多面向实际应用的功能，几乎所有场合都可以直接使用 `ApplicationContext`，而不是 底层的 `BeanFactory`。 
![image.png](./img/1675490318624-71d0e066-0e6e-4db4-bf2f-6ec8c98e2140.png)

### 1、延迟加载

- `BeanFactroy` 采用的是延迟加载形式来注入 `Bean` 的，即只有在使用到某个 `Bean` 时(调用 `getBean()`)，才对 该 `Bean` 进行加载实例化。

  这样，我们就不能发现一些存在的 `spring` 的配置问题  

- `ApplicationContext` 则是在容器启动时，一次性创建了所有的 `Bean`。

  这样，在容器启动时，我们就可以发现 `Spring` 中存 在的配置错误  

### 2、国际化

- `BeanFactory` 是不支持国际化功能的，因为 `BeanFactory` 没有扩展 `Spring` 中 `MessageResource` 接口  
- 由于 `ApplicationContext` 扩展了 `MessageResource` 接口，因而具有消息处理的能力（`i18N`）  

### 3、事件机制（Event）

`ApplicationContext` 的事件机制主要通过 `ApplicationEvent` 和 `ApplicationListener` 这两个接口来提供的  ， 当 `ApplicationContext` 中发布一个事件时，所有扩展了 `ApplicationListener` 的 `Bean` 都将接受到这个事件，并进行相应的处理 

### 4、底层资源的访问  

- `BeanFactory` 是没有扩展 `ResourceLoader`  
- `ApplicationContext` 扩展了 `ResourceLoader`（资源加载器）接口，从而可以用来加载多个 `Resource`  

