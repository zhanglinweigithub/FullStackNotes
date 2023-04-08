# 目录

[[toc]]

## 循环依赖
## 什么是循环依赖
循环依赖，即多个`bean`之间相互依赖，形成了一个闭环
比如：A依赖B、B依赖C、C依赖A

## 如何检测是否存在循环依赖
会使用一个列表来记录正在创建中的`bean`，`bean`创建之前，会先去记录中看一下自己是否已经在列表中了，如果在，说明存在循环依赖，如果不在，则将其加入到这个列表，`bean`创建完毕之后，将其再从这个列表中移除 

**spring创建单例bean时候，会调用下面方法**

```java
protected void beforeSingletonCreation(String beanName) {
	if (!this.inCreationCheckExclusions.contains(beanName) &&
			!this.singletonsCurrentlyInCreation.add(beanName)) {
		throw new BeanCurrentlyInCreationException(beanName);
	}
}
/**
singletonsCurrentlyInCreation 就是用来记录目前正在创建中的bean名称列表
this.singletonsCurrentlyInCreation.add(beanName) 返回 false ，
说明beanName已经在当前列表中了，
此时会抛循环依赖的异常 BeanCurrentlyInCreationException
*/
```
**非单例bean的情况， 以prototype情况为例**
```java
//检查正在创建的bean列表中是否存在beanName，如果存在，说明存在循环依赖，抛出循环依赖的异常
if (isPrototypeCurrentlyInCreation(beanName)) {
	throw new BeanCurrentlyInCreationException(beanName);
}
//判断scope是否是prototype
if (mbd.isPrototype()) {
	Object prototypeInstance = null;
    try {
		//将beanName放入正在创建的列表中
		beforePrototypeCreation(beanName);
		prototypeInstance = createBean(beanName, mbd, args);
	}
	finally {
		//将beanName从正在创建的列表中移除
		afterPrototypeCreation(beanName);
	}
}

```
## Spring如何解决循环依赖的问题  
`Spring`是在属性注入阶段，采用三级缓存的方式解决循环依赖的
属性注入有两种情况：

- 通过构造器注入（无法解决）
- 通过setter注入

由于单例`bean`在`spring`容器中只存在一个，所以`spring`容器中肯定是有一个缓存来存放所有已创建好的单例`bean`；

获取单例`bean`之前，可以先去缓存中找，找到了直接返回，找不到的情况下再去创建，创 建完毕之后再将其丢到缓存中，可以使用一个`map`来存储单例`bean` 
**三级缓存对应代码**

```java
/** 第一级缓存：单例bean的缓存 */
private final Map<String, Object> singletonObjects = new ConcurrentHashMap<>
(256);

/** 第二级缓存：早期暴露的bean的缓存 */
private final Map<String, Object> earlySingletonObjects = new HashMap<>(16);

/** 第三级缓存：单例bean工厂的缓存 */
private final Map<String, ObjectFactory<?>> singletonFactories = new HashMap<>
(16);
```
开始的时候，获取A，调用如下代码

@1代码块

```java
protected <T> T doGetBean(final String name, @Nullable final Class<T>
				requiredType, @Nullable final Object[] args, 
    			boolean typeChekOnly) throws BeansException {
	//1.查看缓存中是否已经有这个bean了
	Object sharedInstance = getSingleton(beanName); 
	if (sharedInstance != null && args == null) {
	bean = getObjectForBeanInstance(sharedInstance, name, beanName, null);
	} else {
	//若缓存中不存在，准备创建这个bean
		if (mbd.isSingleton()) {// @1
			//2.下面进入单例bean的创建过程
			sharedInstance = getSingleton(beanName, () -> {
				try {
					return createBean(beanName, mbd, args); // @2
				}
				catch (BeansException ex) {
					throw ex;
				}
			});
			bean = getObjectForBeanInstance(sharedInstance, 
                                            name, beanName,mbd);
		}
	}
	return (T) bean;
}
```
然后进入下面方法，会依次尝试从3级缓存中查找`bean`，注意下面的第2个参数，为`ture`的时候，才会从第3级中查找，否则只会查找1、2级缓存  

@2代码块

```java
//allowEarlyReference:是否允许从三级缓存singletonFactories中通过getObject拿到bean
protected Object getSingleton(String beanName, boolean allowEarlyReference) {
	//1.先从一级缓存中找
	Object singletonObject = this.singletonObjects.get(beanName);
	if (singletonObject == null && isSingletonCurrentlyInCreation(beanName)) {
		synchronized (this.singletonObjects) {
			//2.从二级缓存中找
			singletonObject = this.earlySingletonObjects.get(beanName);
			if (singletonObject == null && allowEarlyReference) {
				//3.二级缓存中没找到 && allowEarlyReference为true的情况下,从三级缓存找
				ObjectFactory<?> singletonFactory = this.singletonFactories.get(beanName);
				if (singletonFactory != null) {
					//三级缓存返回的是一个工厂，通过工厂来获取创建bean
					singletonObject = singletonFactory.getObject();
					//将创建好的bean丢到二级缓存中
					this.earlySingletonObjects.put(beanName, singletonObject);
					//从三级缓存移除
					this.singletonFactories.remove(beanName);
				}
			}
		}
	}
	return singletonObject;
}

```
刚开始，3个缓存中肯定是找不到的，会返回null，接着会执行上面@1代码准备创建 A  

最终执行  `getSingleton(String beanName, ObjectFactory singletonFactory)`  方法

@3代码块

```java
public Object getSingleton(String beanName, ObjectFactory<?> singletonFactory) {
	synchronized (this.singletonObjects) {
		Object singletonObject = this.singletonObjects.get(beanName);
		if (singletonObject == null) {
    		//单例bean创建之前调用，将其加入正在创建的列表中，主要用来检测循环依赖用的
			beforeSingletonCreation(beanName);
			boolean newSingleton = false;
			try {
				//调用工厂创建bean
				singletonObject = singletonFactory.getObject();//@1中的@2传入
				newSingleton = true;
			}
			finally {
				//单例bean创建之后调用,主要是将其从正在创建的列表中移除
				afterSingletonCreation(beanName);
			}
			if (newSingleton) {
				//将创建好的单例bean放入缓存中
				addSingleton(beanName, singletonObject);
			}
		}
		return singletonObject;
	}
}
```
@1中的@2 `createBean`方法，会调用如下方法

createBean代码块

```java
BeanWrapper instanceWrapper = null;
if (instanceWrapper == null) {
	//通过反射调用构造器实例化serviceA
	instanceWrapper = createBeanInstance(beanName, mbd, args);
}
//变量bean：表示刚刚同构造器创建好的bean示例
final Object bean = instanceWrapper.getWrappedInstance();
//判断是否需要暴露早期的bean，条件为（是否是单例bean && 当前容器允许循环依赖 && bean名称存在
//于正在创建的bean名称清单中）
boolean earlySingletonExposure = (mbd.isSingleton() && this.allowCircularReferences 
                                  && isSingletonCurrentlyInCreation(beanName));
if (earlySingletonExposure) {
	//若earlySingletonExposure为true，通过addSingletonFactory将早期的bean暴露到三级缓存去
	addSingletonFactory(beanName, 
                        () -> getEarlyBeanReference(beanName, mbd,bean));
}
```
刚刚实例化好的`bean`就是早期的`bean`，此时`bean`还未进行属性填充，初始化等操作  
```java
protected void addSingletonFactory(String beanName, ObjectFactory<?>
										singletonFactory) {
	Assert.notNull(singletonFactory, "Singleton factory must not be null");
	synchronized (this.singletonObjects) {
		//第1级缓存中不存在bean
		if (!this.singletonObjects.containsKey(beanName)) {
		//将其丢到第3级缓存中
		this.singletonFactories.put(beanName, singletonFactory);
		//后面的2行代码不用关注
		this.earlySingletonObjects.remove(beanName);
		this.registeredSingletons.add(beanName);
		}
	}
}

```
上面的方法执行之后，A就被丢到第3级的缓存中了。 

后续的过程A开始注入依赖的对象，发现需要注入B，会从容器中获取B，而 B的获取又会走上面同样的过程实例化B，然后将B提前暴露出去，然后B 开始注入依赖的对象，B发现自己需要注入A，此时去容器中找A，找A会 先去缓存中找，会执行 getSingleton("serviceA",true) ，此时会走@2部分的代码： 

方法走完之后，A会被放入二级缓存 earlySingletonObjects 中，会将A返回， 此时B中的A注入成功，B继续完成创建，然后将自己返回给A，此时 A通过set方法将B注入。 A创建完毕之后，会调用 addSingleton 方法将其加入到缓存中，这块代码如下：  

```java
protected void addSingleton(String beanName, Object singletonObject) {
	synchronized (this.singletonObjects) {
		//将bean放入第1级缓存中
		this.singletonObjects.put(beanName, singletonObject);
		//将其从第3级缓存中移除
		this.singletonFactories.remove(beanName);
		//将其从第2级缓存中移除
		this.earlySingletonObjects.remove(beanName);
	}
}
```
到此，serviceA和serviceB之间的循环依赖注入就完成了 
捋一捋整个过程：

> 1.从容器中获取serviceA 
>
> 2.容器尝试从3个缓存中找serviceA，找不到 
>
> 3.准备创建serviceA 
>
> 4.调用serviceA的构造器创建serviceA，得到serviceA实例，此时serviceA还未填充属性，未进行其他任何初始化的操作 
>
> 5.将早期的serviceA暴露出去：即将其丢到第3级缓存singletonFactories中 
>
> 6.serviceA准备填充属性，发现需要注入serviceB，然后向容器获取serviceB 
>
> 7.容器尝试从3个缓存中找serviceB，找不到 
>
> 8.准备创建serviceB 
>
> 9.调用serviceB的构造器创建serviceB，得到serviceB实例，此时serviceB还未填充属性，未进行其 他任何初始化的操作 
>
> 10.将早期的serviceB暴露出去：即将其丢到第3级缓存singletonFactories中 
>
> 11.serviceB准备填充属性，发现需要注入serviceA，然后向容器获取serviceA 
>
> 12.容器尝试从3个缓存中找serviceA，发现此时serviceA位于第3级缓存中，经过处理之后，serviceA 会从第3级缓存中移除，然后会存到第2级缓存中，然后将其返回给serviceB，此时serviceA通过 serviceB中的setServiceA方法被注入到serviceB中 
>
> 13.serviceB继续执行后续的一些操作，最后完成创建工作，然后会调用addSingleton方法，将自己丢到 第1级缓存中，并将自己从第2和第3级缓存中移除 
>
> 14.serviceB将自己返回给serviceA 
>
> 15.serviceA通过setServiceB方法将serviceB注入进去 
>
> 16.serviceA继续执行后续的一些操作，最后完成创建工作,然后会调用addSingleton方法，将自己丢到第 1级缓存中，并将自己从第2和第3级缓存中移除  

## 循环依赖无法解决的情况  
**多例的情况下，无法解决循环依赖**
只有单例的`bean`会通过三级缓存提前暴露来解决循环依赖的问题，而非单例的`bean`，每次从容器中获 取都是一个新的对象，都会重新创建，所以非单例的bean是没有缓存的，不会将其放到三级缓存中。 
**情况一：**
serviceA：多例 	serviceB：多例  	
结果： 此时不管是任何方式都是无法解决循环依赖的问题，最终都会报错，因为每次去获取依赖的`bean`都会重新创建 

**情况二：**
 serviceA：单例 	serviceB：多例 
结果：

- 若使用构造器的方式相互注入，是无法完成注入操作的，会报错  
- 若采用`set`方式注入，所有`bean`都还未创建的情况下，先去容器中获取`serviceB`，会报错，为什么？我 们来看一下过程  
> 1.从容器中获取serviceB 
>
> 2.serviceB由于是多例的，所以缓存中肯定是没有的 
>
> 3.检查serviceB是在正在创建的bean名称列表中，没有 
>
> 4.准备创建serviceB 
>
> 5.将serviceB放入正在创建的bean名称列表中 
>
> 6.实例化serviceB（由于serviceB是多例的，所以不会提前暴露，必须是单例的才会暴露） 
>
> 7.准备填充serviceB属性，发现需要注入serviceA 
>
> 8.从容器中查找serviceA 
>
> 9.尝试从3级缓存中找serviceA，找不到 
>
> 10.准备创建serviceA 
>
> 11.将serviceA放入正在创建的bean名称列表中 
>
> 12.实例化serviceA 
>
> 13.由于serviceA是单例的，将早期serviceA暴露出去，丢到第3级缓存中 
>
> 14.准备填充serviceA的属性，发现需要注入serviceB 
>
> 15.从容器中获取serviceB 
>
> 16.先从缓存中找serviceB，找不到 
>
> 17.检查serviceB是在正在创建的bean名称列表中,发现已经存在了，抛出循环依赖的异常  

## 为什么需要用3级缓存，二级缓存不行吗？
不行
原因：早期暴露给其他依赖者的`bean`和最终暴露的`bean`不一致的问题 

若将刚刚实例化好的`bean`直接丢到二级缓存中暴露出去，如果后期这个`bean`对象被更改了，比如可能 在上面加了一些拦截器，将其包装为一个代理了，那么暴露出去的`bean`和最终的这个`bean`就不一样的

将自己暴露出去的时候是一个原始对象，而自己最终却是一个代理对象，最终会导致被暴露出去的和最终的`bean`不是同一个`bean`的，将产生意向不到的效果，而三级缓存就可以发现这个问题，会报错  

## 单例bean解决了循环依赖，还存在什么问题？
循环依赖的情况下，由于注入的是早期的`bean`，此时早期的`bean`中还未被填充属性，初始化等各种操 作，也就是说此时`bean`并没有被完全初始化完毕，此时若直接拿去使用，可能存在有问题的风险。  

