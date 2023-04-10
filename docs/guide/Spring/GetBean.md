---
title: 获取Bean
---

# 目录

[[toc]]

## Spring获取Bean的几种方式
一共七种方式：

1、使用 **`BeanFactory`** 直接获取（不推荐）

2、在初始化时保存 **`ApplicationContext`** 对象

3、继承自抽象类 **`ApplicationObjectSupport`**

4、继承自抽象类 **`WebApplicationObjectSupport`**

5、使用`Spring`提供的工具类 **`WebApplicationContextUtils`**

6、实现 **`ApplicationContextAware`** 接口

7、使用 **`ContextLoader`** 提供的 **`getCurrentWebApplicationContext`()** 方法



### 1、使用BeanFactory直接获取（不推荐）
使用 **`BeanFactory`** 从工厂中直接获取`Bean`实例，但是 **`XmlBeanFactory`** 类已经废弃，因此不建议使用
```java
/**
 * 方式一：XmlBeanFactory已经废弃不建议使用
 */
@Test
public void getBeanTest1() {
    BeanFactory beanFactory = new XmlBeanFactory(new ClassPathResource("applicationContext.xml"));
    UserInfo userInfo = (UserInfo) beanFactory.getBean("userInfo");
    System.out.println(userInfo);
}
```
### 2、在初始化时保存ApplicationContext对象
可以在初始化的时候保存 **`ApplicationContext`** 对象，然后通过这个对象获取`Bean`

```java
/**
 * 方式二：使用ClassPathXmlApplicationContext获取ApplicationContext
 */
@Test
public void getBeanTest2() {
    ApplicationContext applicationContext = new ClassPathXmlApplicationContext("applicationContext.xml");
    UserInfo userInfo = (UserInfo) applicationContext.getBean("userInfo");
    System.out.println(userInfo);
}
```
### 3、继承自抽象类ApplicationObjectSupport
可以继承抽象类 **`ApplicationObjectSupport`** 并将自己继承的类注入到`Spring`容器中
```java
/**
 * 方法三：继承ApplicationObjectSupport来获取ApplicationContext，
 * 注意：需要把自己继承的类注入到Spring
 */
@Test
public void getBeanTest3() {
    ApplicationContextUtil2 applicationContextUtil2 = (ApplicationContextUtil2) ApplicationContextUtil.getBean("applicationContextUtil2");
    UserInfo userInfo = (UserInfo) applicationContextUtil2.getBean("userInfo");
    System.out.println(userInfo);
}
```
其中**ApplicationContextUtil2**的代码如下
```java
@Component
public class ApplicationContextUtil2 extends ApplicationObjectSupport {

    /**
     * 通过bean的id获取bean对象
     * @param beanName
     * @return
     */
    public Object getBean(String beanName){
        return super.getApplicationContext().getBean(beanName);
    }

}
```
### 4、继承自抽象类WebApplicationObjectSupport
可以继承抽象类 **`WebApplicationObjectSupport`** 并将自己继承的类注入到`Spring`容器中
```java
/**
 * 方法四：继承WebApplicationObjectSupport来获取ApplicationContext，
 * 注意：需要把自己继承的类注入到Spring，同时需要添加@WebAppConfiguration注解，否则会找不到web容器
 */
@Test
public void getBeanTest4() {
    ApplicationContextUtil3 applicationContextUtil3 = (ApplicationContextUtil3) ApplicationContextUtil.getBean("applicationContextUtil3");
    UserInfo userInfo = (UserInfo) applicationContextUtil3.getBean("userInfo");
    System.out.println(userInfo);
}
```
其中 **ApplicationContextUtil3** 的示例代码如下：
```java
@Component
public class ApplicationContextUtil3 extends WebApplicationObjectSupport{

    /**
     * 通过bean的id获取bean对象
     * @param beanName
     * @return
     */
    public Object getBean(String beanName){
        return super.getWebApplicationContext().getBean(beanName);
    }

}
```
### 5、使用Spring提供的工具类WebApplicationContextUtils
使用`Spring`提供的工具类 **`WebApplicationContextUtils`** 来获取 **`WebApplicationContext`** 对象，这个方法很常见于`SpringMVC`构建的`web`项目中
```java

/**
 * 方法五：使用WebApplicationContextUtils提供的方法获取ApplicationContext对象
 */
@Test
public void getBeanTest5(){
    //模拟ServletContext上下文，不然会出现空指针异常
    MockServletContext sc = new MockServletContext("");
    sc.addInitParameter(ContextLoader.CONFIG_LOCATION_PARAM, "/applicationContext.xml");
    ServletContextListener listener = new ContextLoaderListener();
    ServletContextEvent event = new ServletContextEvent(sc);
    listener.contextInitialized(event);

    //使用WebApplicationContextUtils的getRequiredWebApplicationContext方法
    WebApplicationContext webApplicationContext = WebApplicationContextUtils.getRequiredWebApplicationContext(sc);
    UserInfo userInfo = (UserInfo) webApplicationContext.getBean("userInfo");
    System.out.println(userInfo);
    //使用WebApplicationContextUtils的getWebApplicationContext方法
    WebApplicationContext webApplicationContext2 = WebApplicationContextUtils.getWebApplicationContext(sc);
    UserInfo userInfo2 = (UserInfo) webApplicationContext2.getBean("userInfo");
    System.out.println(userInfo2);
}
```
### 6、实现ApplicationContextAware接口
通过实现 **`ApplicationContextAware`** 接口，在`Spring`容器启动的时候将**`ApplicationContext`**注入进去，从而获取**`ApplicationContext`**对象，这种方法也是常见的获取`Bean`的一种方式
```java
/**
 *方法六：实现ApplicationContextAware接口获取ApplicationContext
 */
@Test
public void getBeanTest6(){
    UserInfo userInfo2 = (UserInfo) ApplicationContextUtil.getBean("userInfo");
    System.out.println(userInfo2);
}
```
其中**ApplicationContextUtil**的实现如下：
```java
public class ApplicationContextUtil implements ApplicationContextAware{
    private static ApplicationContext applicationContext;

    /**
     * 通过bean的id获取bean对象
     * @param beanName
     * @return
     */
    public static Object getBean(String beanName){
        return applicationContext.getBean(beanName);
    }

    /**
     * 根据bean的id和类型获取bean对象
     * @param beanName
     * @param clazz
     * @param <T>
     * @return
     */
    public static <T> T getBean(String beanName,Class<T> clazz){
        return clazz.cast(getBean(beanName));
    }


    @Override
    public void setApplicationContext(ApplicationContext applicationContext) throws BeansException {
        this.applicationContext = applicationContext;
    }
}
```
### 7、使用ContextLoader提供的getCurrentWebApplicationContext()方法
使用 **`ContextLoader`** 提供的 **`getCurrentWebApplicationContext`** 方法提供的方法也是常用的获取 **`WebApplicationContext`** 的一种方法，这个方法常见于SpringMVC实现的web项目中
```java
/**
 * 方法七：使用ContextLoader的getCurrentWebApplicationContext方法获取WebApplicationContext
 */
@Test
public void getBeanTest7() {
    MockServletContext sc = new MockServletContext("");
    sc.addInitParameter(ContextLoader.CONFIG_LOCATION_PARAM, "/applicationContext.xml");
    ServletContextListener listener = new ContextLoaderListener();
    ServletContextEvent event = new ServletContextEvent(sc);
    listener.contextInitialized(event);
    //如果不加上面的模拟创建ServletContext对象，会报空指针异常
    WebApplicationContext wac = ContextLoader.getCurrentWebApplicationContext();
    UserInfo userInfo = (UserInfo) wac.getBean("userInfo");
    System.out.println(userInfo);
}
```
