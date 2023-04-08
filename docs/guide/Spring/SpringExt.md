# 目录
[[toc]]
## Spring中常用的11个扩展点
![image.png](./img/1675760402754-884bdf35-a86c-4f9b-9692-46663c6153d6.png)
### 1、自定义拦截器
`spring mvc` 拦截器和 `spring` 拦截器相比，它里面能够获取**HttpServletRequest**和**HttpServletResponse**等 `web` 对象实例。
`spring mvc` 拦截器的顶层接口是：**HandlerInterceptor**，包含三个方法：

- **preHandle** 目标方法执行前执行
- **postHandle** 目标方法执行后执行
- **afterCompletion 请求完成时执行**

一般情况会用**HandlerInterceptor**接口的实现类**HandlerInterceptorAdapter**类。
假如有权限认证、日志、统计的场景，可以使用该拦截器。

#### 第一步

继承**HandlerInterceptorAdapter**类定义拦截器：

```java
public class AuthInterceptor extends HandlerInterceptorAdapter {

    // 目标方法执行前执行
    @Override
    public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler)
            throws Exception {
        String requestUrl = request.getRequestURI();
        if (checkAuth(requestUrl)) {
            return true;
        }

        return false;
    }

    // 目标方法
    private boolean checkAuth(String requestUrl) {
        System.out.println("===权限校验===");
        return true;
    }
}
```
#### 第二步

将该拦截器注册到spring容器：

```java
@Configuration
public class WebAuthConfig extends WebMvcConfigurerAdapter {
 
    @Bean
    public AuthInterceptor getAuthInterceptor() {
        return new AuthInterceptor();
    }

    @Override
    public void addInterceptors(InterceptorRegistry registry) {
        registry.addInterceptor(new AuthInterceptor());
    }
}
```
### 2、获取Spring容器对象
#### BeanFactoryAware接口
实现**BeanFactoryAware**接口，然后重写**setBeanFactory**方法，就能从该方法中获取到`spring`容器对象。
```java
@Service
public class PersonService implements BeanFactoryAware {
    private BeanFactory beanFactory;

    @Override
    public void setBeanFactory(BeanFactory beanFactory) throws BeansException {
        this.beanFactory = beanFactory;
    }

    public void add() {
        Person person = (Person) beanFactory.getBean("person");
    }
}
```
#### ApplicationContextAware接口
实现**ApplicationContextAware**接口，然后重写**setApplicationContext**方法，也能从该方法中获取到 `spring` 容器对象。
```java
@Service
public class PersonService2 implements ApplicationContextAware {
    private ApplicationContext applicationContext;

    @Override
    public void setApplicationContext(ApplicationContext applicationContext) throws BeansException {
        this.applicationContext = applicationContext;
    }

    public void add() {
        Person person = (Person) applicationContext.getBean("person");
    }
}
```
#### ApplicationListener接口
```java
@Service
public class PersonService3 implements ApplicationListener<ContextRefreshedEvent> {
    private ApplicationContext applicationContext;
    @Override
    public void onApplicationEvent(ContextRefreshedEvent event) {
        applicationContext = event.getApplicationContext();
    }

    public void add() {
        Person person = (Person) applicationContext.getBean("person");
    }
}
```
### 3.全局异常处理
以前我们在开发接口时，如果出现异常，为了给用户一个更友好的提示，例如：
```java
@RequestMapping("/test")
@RestController
public class TestController {

    @GetMapping("/add")
    public String add() {
        int a = 10 / 0;
        return "成功";
    }
}
```
如果不做任何处理请求，`add`接口结果直接报错：
![image.png](./img/1675761008375-bc7dabcb-e528-4627-9495-aa1acf970697.png)

这种交互方式给用户的体验非常差，为了解决这个问题，我们通常会在接口中捕获异常：

```java
@GetMapping("/add")
public String add() {
    String result = "成功";
    try {
        int a = 10 / 0;
    } catch (Exception e) {
        result = "数据异常";
    }
    return result;
}
```
接口改造后，出现异常时会提示：“数据异常”，对用户来说更友好。
看起来挺不错的，但是有问题。。。
如果只是一个接口还好，但是如果项目中有成百上千个接口，都要加上异常捕获代码吗？
答案是否定的，这时全局异常处理就派上用场了：**RestControllerAdvice**。
```java
@RestControllerAdvice
public class GlobalExceptionHandler {

    @ExceptionHandler(Exception.class)
    public String handleException(Exception e) {
        if (e instanceof ArithmeticException) {
            return "数据异常";
        }
        if (e instanceof Exception) {
            return "服务器内部异常";
        }
        retur null;
    }
}
```
只需在**handleException**方法中处理异常情况，业务接口中可以放心使用，不再需要捕获异常（有人统一处理了）。真是爽歪歪。
### 4.类型转换器
`spring`目前支持3中类型转换器：

- `Converter<S,T>`：将 S 类型对象转为 T 类型对象
- `ConverterFactory<S, R>`：将 S 类型对象转为 R 类型及子类对象
- `GenericConverter`：它支持多个`source`和目标类型的转化，同时还提供了`source`和目标类型的上下文，这个上下文能让你实现基于属性上的注解或信息来进行类型转换。

这3种类型转换器使用的场景不一样，我们以**Converter<S,T>**为例。假如：接口中接收参数的实体对象中，有个字段的类型是`Date`，但是实际传参的是字符串类型：2021-01-03 10:20:15，要如何处理呢？

#### 第一步

定义一个实体User：

```java
@Data
public class User {

    private Long id;
    private String name;
    private Date registerDate;
}
```
#### 第二步

定义一个类，实现**Converter**接口：

```java
public class DateConverter implements Converter<String, Date> {

    private SimpleDateFormat simpleDateFormat = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");

    @Override
    public Date convert(String source) {
        if (source != null && !"".equals(source)) {
            try {
                simpleDateFormat.parse(source);
            } catch (ParseException e) {
                e.printStackTrace();
            }
        }
        return null;
    }
}
```
#### 第三步

将新定义的类型转换器注入到spring容器中：

```java
@Configuration
public class WebConfig extends WebMvcConfigurerAdapter {

    @Override
    public void addFormatters(FormatterRegistry registry) {
        registry.addConverter(new DateConverter());
    }
}
```
#### 第四步

调用接口

```java
@RequestMapping("/user")
@RestController
public class UserController {

    @RequestMapping("/save")
    public String save(@RequestBody User user) {
        return "success";
    }
}
```
请求接口时`User`对象中`registerDate`字段会被自动转换成`Date`类型。
### 5.导入配置
有时我们需要在某个配置类中引入另外一些类，被引入的类也加到spring容器中。

这时可以使用 **@Import** 注解完成这个功能。

如果你看过它的源码会发现，引入的类支持三种不同类型。

但是我认为最好将普通类和@Configuration注解的配置类分开讲解，所以列了四种不同类型：
![image.png](./img/1675763424053-34ac115f-0d49-4435-af8a-09337d1eee99.png)

#### 普通类
这种引入方式是最简单的，被引入的类会被实例化`bean`对象。
```java
public class A {
}

@Import(A.class)
@Configuration
public class TestConfiguration {
}
```
通过 **@Import** 注解引入A类，`spring`就能自动实例化A对象，然后在需要使用的地方通过 **@Autowired** 注解注入即可
```java
@Autowired
private A a;
```
是不是挺让人意外的？不用加 **@Bean** 注解也能实例化`bean`。
#### 配置类
这种引入方式是最复杂的，因为 **@Configuration** 注解还支持多种组合注解，比如：

- @Import
- @ImportResource
- @PropertySource等。
```java
public class A {
}

public class B {
}

@Import(B.class)
@Configuration
public class AConfiguration {

    @Bean
    public A a() {
        return new A();
    }
}

@Import(AConfiguration.class)
@Configuration
public class TestConfiguration {
}
```
通过`@Import`注解引入`@Configuration`注解的配置类，会把该配置类相关 **@Import** 、**@ImportResource**、**@PropertySource**等注解引入的类进行递归，一次性全部引入。
#### ImportSelector
这种引入方式需要实现**ImportSelector**接口：
```java
public class AImportSelector implements ImportSelector {

private static final String CLASS_NAME = "com.sue.cache.service.test13.A";
    
 public String[] selectImports(AnnotationMetadata importingClassMetadata) {
        return new String[]{CLASS_NAME};
    }
}

@Import(AImportSelector.class)
@Configuration
public class TestConfiguration {
}
```
这种方式的好处是**selectImports**方法返回的是数组，意味着可以同时引入多个类，还是非常方便的。
#### ImportBeanDefinitionRegistrar
这种引入方式需要实现**ImportBeanDefinitionRegistrar**接口：
```java
public class AImportBeanDefinitionRegistrar implements ImportBeanDefinitionRegistrar {
    @Override
    public void registerBeanDefinitions(AnnotationMetadata importingClassMetadata, BeanDefinitionRegistry registry) {
        RootBeanDefinition rootBeanDefinition = new RootBeanDefinition(A.class);
        registry.registerBeanDefinition("a", rootBeanDefinition);
    }
}

@Import(AImportBeanDefinitionRegistrar.class)
@Configuration
public class TestConfiguration {
}
```
这种方式是最灵活的，能在**registerBeanDefinitions**方法中获取到**BeanDefinitionRegistry**容器注册对象，可以手动控制`BeanDefinition`的创建和注册
### 6.项目启动时
有时候我们需要在项目启动时定制化一些附加功能，比如：加载一些系统参数、完成初始化、预热本地缓存等，该怎么办呢？
好消息是`springboot`提供了：

- `CommandLineRunner`
- `ApplicationRunner`

这两个接口帮助我们实现以上需求。
它们的用法还是挺简单的，以**ApplicationRunner**接口为例：
```java
@Component
public class TestRunner implements ApplicationRunner {

    @Autowired
    private LoadDataService loadDataService;

    public void run(ApplicationArguments args) throws Exception {
        loadDataService.load();
    }
}
```
实现**ApplicationRunner**接口，重写**run**方法，在该方法中实现自己定制化需求。
如果项目中有多个类实现了ApplicationRunner接口，他们的执行顺序使用 **@Order(n)** 注解来指定，n的值越小越先执行。当然也可以通过 **@Priority** 注解指定顺序。

### 7.修改BeanDefinition
`Spring IOC`在实例化`Bean`对象之前，需要先读取`Bean`的相关属性，保存到**BeanDefinition**对象中，然后通过`BeanDefinition`对象，实例化`Bean`对象。
如果想修改`BeanDefinition`对象中的属性，我们可以实现**BeanFactoryPostProcessor**接口。

```java
@Component
public class MyBeanFactoryPostProcessor implements BeanFactoryPostProcessor {
    
    @Override
    public void postProcessBeanFactory(ConfigurableListableBeanFactory configurableListableBeanFactory) throws BeansException {
        DefaultListableBeanFactory defaultListableBeanFactory = (DefaultListableBeanFactory) configurableListableBeanFactory;
        BeanDefinitionBuilder beanDefinitionBuilder = BeanDefinitionBuilder.genericBeanDefinition(User.class);
        beanDefinitionBuilder.addPropertyValue("id", 123);
        beanDefinitionBuilder.addPropertyValue("name", "阿伟说技术");
        defaultListableBeanFactory.registerBeanDefinition("user", beanDefinitionBuilder.getBeanDefinition());
    }
}
```
在 `postProcessBeanFactory` 方法中，可以获取 `BeanDefinition` 的相关对象，并且修改该对象的属性。
### 8.初始化Bean前后
有时，你想在初始化Bean前后，实现一些自己的逻辑。
这时可以实现：**BeanPostProcessor**接口。
该接口目前有两个方法：

- `postProcessBeforeInitialization` 该在初始化方法之前调用。
- `postProcessAfterInitialization` 该方法在初始化方法之后调用。

例如：
```java
@Component
public class MyBeanPostProcessor implements BeanPostProcessor {

    @Override
    public Object postProcessAfterInitialization(Object bean, String beanName) throws BeansException {
        if (bean instanceof User) {
            ((User) bean).setUserName("阿伟说技术");
        }
        return bean;
    }
}
```
其实，我们经常使用的注解，比如：`@Autowired`、`@Value`、`@Resource`、`@PostConstruct`等，是通过`AutowiredAnnotationBeanPostProcessor`和`CommonAnnotationBeanPostProcessor`实现的。
### 9.初始化方法
目前`spring`中使用比较多的初始化`bean`的方法有：

1. 使用`@PostConstruct`注解
2. 实现`InitializingBean`接口
#### 使用@PostConstruct注解
```java
@Service
public class AService {
    @PostConstruct
    public void init() {
        System.out.println("===初始化===");
    }
}
```
在需要初始化的方法上增加 **@PostConstruct** 注解，这样就有初始化的能力。
#### 实现InitializingBean接口
```java
@Service
public class BService implements InitializingBean {

    @Override
    public void afterPropertiesSet() throws Exception {
        System.out.println("===初始化===");
    }
}
```
实现**InitializingBean**接口，重写**afterPropertiesSet**方法，该方法中可以完成初始化功能。
### 10.关闭容器前
有时候，我们需要在关闭`spring`容器前，做一些额外的工作，比如：关闭资源文件等。
这时可以实现**DisposableBean**接口，并且重写它的**destroy**方法：

```java
@Service
public class DService implements InitializingBean, DisposableBean {
 
    @Override
    public void destroy() throws Exception {
        System.out.println("DisposableBean destroy");
    }
 
    @Override
    public void afterPropertiesSet() throws Exception {
        System.out.println("InitializingBean afterPropertiesSet");
    }
}
```
这样`spring`容器销毁前，会调用该`destroy`方法，做一些额外的工作。
通常情况下，我们会同时实现`InitializingBean`和`DisposableBean`接口，重写初始化方法和销毁方法。

### 11.自定义作用域
我们都知道 `spring` 默认支持的**Scope**只有两种：

- `singleton` 单例，每次从 `spring` 容器中获取到的 `bean` 都是同一个对象。
- `prototype` 多例，每次从 `spring` 容器中获取到的 `bean` 都是不同的对象。

`spring web`又对 `Scope` 进行了扩展，增加了：

- `RequestScope` 同一次请求从 `spring` 容器中获取到的 `bean` 都是同一个对象。
- `SessionScope` 同一个会话从 `spring` 容器中获取到的 `bean` 都是同一个对象。

即便如此，有些场景还是无法满足我们的要求。
比如，我们想在同一个线程中从`spring`容器获取到的`bean`都是同一个对象，该怎么办？
这就需要自定义 `Scope` 了。

#### 第一步

实现 `Scope` 接口：

```java
public class ThreadLocalScope implements Scope {
    private static final ThreadLocal THREAD_LOCAL_SCOPE = new ThreadLocal();

    @Override
    public Object get(String name, ObjectFactory<?> objectFactory) {
        Object value = THREAD_LOCAL_SCOPE.get();
        if (value != null) {
            return value;
        }

        Object object = objectFactory.getObject();
        THREAD_LOCAL_SCOPE.set(object);
        return object;
    }

    @Override
    public Object remove(String name) {
        THREAD_LOCAL_SCOPE.remove();
        return null;
    }

    @Override
    public void registerDestructionCallback(String name, Runnable callback) {
    }

    @Override
    public Object resolveContextualObject(String key) {
        return null;
    }

    @Override
    public String getConversationId() {
        return null;
    }
}
```
#### 第二步

将新定义的 `Scope` 注入到 `spring` 容器中：

```java
@Component
public class ThreadLocalBeanFactoryPostProcessor implements BeanFactoryPostProcessor {
    @Override
    public void postProcessBeanFactory(ConfigurableListableBeanFactory beanFactory) throws BeansException {
        beanFactory.registerScope("threadLocalScope", new ThreadLocalScope());
    }
}
```
#### 第三步

使用新定义的`Scope`：

```java
@Scope("threadLocalScope")
@Service
public class CService {
    public void add() {
    }
}
```
