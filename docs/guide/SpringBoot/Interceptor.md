---
title: 拦截器
---
# 目录

[[toc]]

## SpringBoot使用拦截器

只需要两步即可：

- 定义拦截器
- 配置拦截器

## 定义拦截器

只需要实现 `HandlerInterceptor` 接口

> `HandlerInterceptor` 接口是所有自定义拦截器或者 `Spring Boot` 提供的拦截器的大爹
>
> 该接口中有三个方法： 
>
> - `preHandle(……)` ：该方法的执行时机是，当某个 `url` 已经匹配到对应的 `Controller` 中的某个方法，且在 这个方法执行之前。
>
>   所以 `preHandle(……)` 方法可以决定是否将请求放行，返回 `true` 则放行，返回 `false` 则不会向后执行
>
> - `postHandle(……)`：该方法的执行时机是，当某个 `url` 已经匹配到对应的 `Controller` 中的某个方法，且 在执行完了该方法，但是在 `DispatcherServlet` 视图渲染之前。
>
>   所以在这个方法中有个 `ModelAndView` 参 数，可以在此做一些修改动作。
>
> - `afterCompletion(……)`：该方法是在整个请求处理完成后（包括视图渲染）执行
>
>   这时做一 些资源的清理工作，这个方法只有在 p`reHandle(……)` 被成功执行后并且返回 `true` 才会被执行。

~~~java
/**
 * 自定义拦截器
 */
public class MyInterceptor implements HandlerInterceptor {
    private static final Logger logger = LoggerFactory.getLogger(MyInterceptor.class);

    @Override
    public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object
            handler) throws Exception {
        HandlerMethod handlerMethod = (HandlerMethod) handler;
        Method method = handlerMethod.getMethod();
        String methodName = method.getName();
        logger.info("====拦截到了方法：{}，在该方法执行之前执行====", methodName);
		// 返回true才会继续执行，返回false则取消当前请求
        return true;
    }

    @Override
    public void postHandle(HttpServletRequest request, HttpServletResponse response, Object
            handler, ModelAndView modelAndView) throws Exception {
        logger.info("执行完方法之后进执行(Controller方法调用之后)，但是此时还没进行视图渲染");
    }

    @Override
    public void afterCompletion(HttpServletRequest request, HttpServletResponse response, Object
            handler, Exception ex) throws Exception {
        logger.info("整个请求都处理完咯，DispatcherServlet也渲染了对应的视图咯，此时我可以做一些清理的
                工作了");
    }
}
~~~

## 配置拦截器

继承 `WebMvcConfigurationSupport` 或 实现 `WebMvcConfigurer` 接口

- `WebMvcConfigurationSupport`：会拦截静态资源
- `WebMvcConfigurer`：不会拦截静态资源

重写 `addInterceptors` 方法，将我们上面自定义的拦截器添加进去

`addPathPatterns` 方法是添加要 拦截的请求，这里我们拦截所有的请求

~~~java
@Configuration
public class MyInterceptorConfig extends WebMvcConfigurationSupport {
    @Override
    protected void addInterceptors(InterceptorRegistry registry) {
        // 实现WebMvcConfigurationSupport会导致静态资源被拦截
        registry.addInterceptor(new MyInterceptor()).addPathPatterns("/**");
        super.addInterceptors(registry);
    }
}

// = = = = = = = = = 
@Configuration
public class MyInterceptorConfig implements WebMvcConfigurer {
    @Override
    public void addInterceptors(InterceptorRegistry registry) {
		// 实现WebMvcConfigurer不会导致静态资源被拦截
        registry.addInterceptor(new MyInterceptor()).addPathPatterns("/**");
    }
}
~~~

## 测试

~~~java
@Controller
@RequestMapping("/interceptor")
public class InterceptorController {
    @RequestMapping("/test")
    public String test() {
        return "hello";
    }
}
~~~

~~~
====拦截到了方法：test，在该方法执行之前执行====
执行完方法之后进执行(Controller方法调用之后)，但是此时还没进行视图渲染
整个请求都处理完咯，DispatcherServlet也渲染了对应的视图咯，此时我可以做一些清理的工作了
~~~

## 解决静态资源被拦截问题

重写 `addResourceHandlers`方法 ，将静态资源放开

~~~java
/**
 * 用来指定静态资源不被拦截，否则继承WebMvcConfigurationSupport这种方式会导致静态资源无法直接访问
 */
@Override
protected void addResourceHandlers(ResourceHandlerRegistry registry){
        registry.addResourceHandler("/**").addResourceLocations("classpath:/static/");
        super.addResourceHandlers(registry);
}
~~~

## 取消拦截

### 自定义一个注解

~~~java
/**
 * 该注解用来指定某个方法不用拦截
 */
@Target(ElementType.METHOD)
@Retention(RetentionPolicy.RUNTIME)
public @interface UnInterception {
}
~~~

### 修改拦截器逻辑

~~~java
@Override
public boolean preHandle(HttpServletRequest request,HttpServletResponse response,Object
        handler)throws Exception{
    
        HandlerMethod handlerMethod=(HandlerMethod)handler;
        Method method=handlerMethod.getMethod();
        String methodName=method.getName();
        logger.info("====拦截到了方法：{}，在该方法执行之前执行====",methodName);
		// 通过方法，可以获取该方法上的自定义注解，然后通过注解来判断该方法是否要被拦截
		// @UnInterception 是我们自定义的注解
        UnInterception unInterception=method.getAnnotation(UnInterception.class);
        // 如果存在@UnInterception注解则放行
    	if(null!= unInterception){
        	return true;
        }
		// 返回true才会继续执行，返回false则取消当前请求
        return true;
        }
~~~

> 在 Controller 中的某个方法上添加该注解，即可取消拦截该方法

## 使用实例，判断用户是否登录

如果用户登录成功了，每次请求的时候都会带上该用户的 `token`，如果未登 录，则没有该 `token`

~~~java
@Override
public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object
        handler) throws Exception {
    
        HandlerMethod handlerMethod = (HandlerMethod) handler;
        Method method = handlerMethod.getMethod();
        String methodName = method.getName();
        logger.info("====拦截到了方法：{}，在该方法执行之前执行====", methodName);
		// 判断用户有没有登陆，一般登陆之后的用户都有一个对应的token
        String token = request.getParameter("token");
        if (null == token || "".equals(token)) {
        	logger.info("用户未登录，没有权限执行……请登录");
        	return false;
        }
		// 返回true才会继续执行，返回false则取消当前请求
        return true;
}
~~~

