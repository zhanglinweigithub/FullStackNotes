# 目录

[[toc]]

## AOP处理

### 依赖

~~~xml
<dependency>
	<groupId>org.springframework.boot</groupId>
	<artifactId>spring-boot-starter-aop</artifactId>
</dependency>
~~~

### 实现AOP切面

新建一个类，用来定义切面和处理方法。

在类上加个 `@Aspect` 注解即可，并交给`Spring`管理。

> @Aspect 注解用来描述 一个切面类，定义切面类的时候需要打上这个注解。

~~~java
@Aspect
@Component
public class LogAspectHandler {
    
}
~~~

几个常用的注解及使用

1.`@Pointcut`：定义一个切面，即上面所描述的关注的某件事入口。

2.`@Before`：在做某件事之前做的事。

3.`@After`：在做某件事之后做的事。

4.`@AfterReturning`：在做某件事之后，对其返回值做增强处理。

5.`@AfterThrowing`：在做某件事抛出异常时，处理。

### @Pointcut 注解

~~~java
@Aspect
@Component
public class LogAspectHandler {
    /**
     * 定义一个切面，拦截com.itcodai.course09.controller包和子包下的所有方法
     */
    @Pointcut("execution(* com.zhang.linwei.controller..*.*(..))")
    public void pointCut() {
    }
}
~~~

两个常用的表达式：

- 一个是使用 execution() 

  > - execution() 为表达式主体 
  > - 第一个 `*` 号的位置：表示返回值类型， `*` 表示所有类型 
  > - 包名：表示需要拦截的包名，后面的两个`. .`表示当前包和当前包的所有子包， `com.zhang.linwei.controller` 包、子包下所有类的方法 
  > - 第二个 `*` 号的位置：表示类名， `*` 表示所有类 
  > - `*(..)` ：这个星号表示方法名， `*` 表示所有的方法，后面括弧里面表示方法的参数，两个句点表示任何参数

- 另一个是使用 `annotation()` 

  - `annotation()` 方式是针对某个注解来定义切面，比如我们对具有 `@GetMapping` 注解的方法做切面，可以如下定义切面

  - ~~~java
    @Pointcut("@annotation(org.springframework.web.bind.annotation.GetMapping)")
    public void annotationCut() {}
    ~~~

  - 然后使用该切面的话，就会切入注解是 `@GetMapping` 的方法。

### @Before 注解

`@Before` 注解指定的方法在切面切入目标方法之前执行

~~~java
@Aspect
@Component
public class LogAspectHandler {
    private final Logger logger = LoggerFactory.getLogger(this.getClass());

    /**
     * 在上面定义的切面方法之前执行该方法
     *
     * @param joinPoint jointPoint
     */
    @Before("pointCut()")
    public void doBefore(JoinPoint joinPoint) {
        logger.info("====doBefore方法进入了====");
		// 获取签名
        Signature signature = joinPoint.getSignature();
		// 获取切入的包名
        String declaringTypeName = signature.getDeclaringTypeName();
		// 获取即将执行的方法名
        String funcName = signature.getName();
        logger.info("即将执行方法为: {}，属于{}包", funcName, declaringTypeName);
		// 也可以用来记录一些信息，比如获取请求的url和ip
        ServletRequestAttributes attributes = (ServletRequestAttributes)
                RequestContextHolder.getRequestAttributes();
        HttpServletRequest request = attributes.getRequest();
		// 获取请求url
        String url = request.getRequestURL().toString();
		// 获取请求ip
        String ip = request.getRemoteAddr();
        logger.info("用户请求的url为：{}，ip地址为：{}", url, ip);
    }
}
~~~

> `JointPoint` 对象很有用，可以用它来获取一个签名，然后利用签名可以获取请求的包名、方法名，包括参数（通过 `joinPoint.getArgs()` 获取）

### @After 注解

`@After` 注解和 `@Before` 注解相对应，指定的方法在切面切入目标方法之后执行

~~~java
@Aspect
@Component
public class LogAspectHandler {
    private final Logger logger = LoggerFactory.getLogger(this.getClass());

    /**
     * 定义一个切面，拦截com.zhang.linwei.controller包下的所有方法
     */
    @Pointcut("execution(* com.zhang.linwei.controller..*.*(..))")
    public void pointCut() {
    }

    /**
     * 在上面定义的切面方法之后执行该方法
     *
     * @param joinPoint jointPoint
     */
    @After("pointCut()")
    public void doAfter(JoinPoint joinPoint) {
        logger.info("====doAfter方法进入了====");
        Signature signature = joinPoint.getSignature();
        String method = signature.getName();
        logger.info("方法{}已经执行完", method);
    }
}
~~~

### 测试

~~~java
@RestController
@RequestMapping("/aop")
public class AopController {
    @GetMapping("/{name}")
    public String testAop(@PathVariable String name) {
        return "Hello " + name;
    }
}
~~~

输出

~~~
====doBefore方法进入了====
即将执行方法为: testAop，属于com.zhang.linwei.controller.AopController包
用户请求的url为：http://localhost:8080/aop/name，ip地址为：0:0:0:0:0:0:0:1
====doAfter方法进入了====
方法testAop已经执行完

~~~

### @AfterReturning 注解

`@AfterReturning` 注解和 `@After` 有些类似，区别在于 `@AfterReturning` 注解可以用来捕获切入方法执行完之后的返回值，对返回值进行业务逻辑上的增强处理

该方法中的第二个入参就是被切方法的返回值，在 `doAfterReturning` 方法中可以对返回值进行增强

~~~java
@Aspect
@Component
public class LogAspectHandler {
    private final Logger logger = LoggerFactory.getLogger(this.getClass());

    /**
     * 在上面定义的切面方法返回后执行该方法，可以捕获返回对象或者对返回对象进行增强
     *
     * @param joinPoint joinPoint
     * @param result    result
     */
    @AfterReturning(pointcut = "pointCut()", returning = "result")
    public void doAfterReturning(JoinPoint joinPoint, Object result) {
        Signature signature = joinPoint.getSignature();
        String classMethod = signature.getName();
        logger.info("方法{}执行完毕，返回参数为：{}", classMethod, result);
		// 实际项目中可以根据业务做具体的返回值增强
        logger.info("对返回参数进行业务上的增强：{}", result + "增强版");
    }
}
~~~

> 注意：在 `@AfterReturning` 注解 中，属性 `returning` 的值必须要和参数保持一致，否则会检测不到

~~~
方法testAop执行完毕，返回参数为：Hello SpringBoot
对返回参数进行业务上的增强：Hello SpringBoot增强版
~~~

### @AfterThrowing 注解

`@AfterThrowing` 注解是当被切方法执行时抛出异常时，会进入 `@AfterThrowing` 注解的方法中执行

在该方法中可以做一些异常的处理逻辑。

> 注意： throwing 属性的值必须要和参数一致，否则会报错。

该方法 中的第二个入参即为抛出的异常。

~~~java
@Aspect
@Component
public class LogAspectHandler {
    private final Logger logger = LoggerFactory.getLogger(this.getClass());

    /**
     * 在上面定义的切面方法执行抛异常时，执行该方法
     *
     * @param joinPoint jointPoint
     * @param ex        ex
     */
    @AfterThrowing(pointcut = "pointCut()", throwing = "ex")
    public void afterThrowing(JoinPoint joinPoint, Throwable ex) {
        Signature signature = joinPoint.getSignature();
        String method = signature.getName();
		// 处理异常的逻辑
        logger.info("执行方法{}出错，异常为：{}", method, ex);
    }
}
~~~

