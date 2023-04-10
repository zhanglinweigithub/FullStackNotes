---
title: 监听器
---
# 目录

[[toc]]

## SpringBoot 中自定义事件监听

###  自定义事件

需要继承 `ApplicationEvent` 对象，在事件中定义一个 `User` 对象来模拟数据，构造方法中将 `User` 对象 传进来初始化

~~~java
/**
 * 自定义事件
 */
public class MyEvent extends ApplicationEvent {
    private User user;
    public MyEvent(Object source, User user) {
        super(source);
        this.user = user;
    }
	// 省去get、set方法
}
~~~

### 发布事件

注入 `ApplicationContext`，在业务代码处理完之后，通过 `ApplicationContext` 对象手动发布 `MyEvent` 事件

这样我们自定义的监听器就能监听到

~~~java
/**
 * UserService
 */
@Service
public class UserService {
    @Resource
    private ApplicationContext applicationContext;
    /**
     * 发布事件
     * @return
     */
    public User getUser2() {
        User user = new User(1L, "zhanglinwei", "123456");
		// 发布事件
        MyEvent event = new MyEvent(this, user);
        applicationContext.publishEvent(event);
        return user;
    }
}
~~~



### 自定义监听器

自定义一个监听器来监听上面定义的 `MyEvent` 事件

自定义监听器需要实现 `ApplicationListener` 接口

然后重写 `onApplicationEvent` 方法，将自定义的 `MyEvent` 事件传进来

~~~java
/**
 * 自定义监听器，监听MyEvent事件
 */
@Component
public class MyEventListener implements ApplicationListener<MyEvent> {
    @Override
    public void onApplicationEvent(MyEvent myEvent) {
		// 把事件中的信息获取到
        User user = myEvent.getUser();
		// 处理事件，实际项目中可以通知别的微服务或者处理其他逻辑等等
        System.out.println("用户名：" + user.getUsername());
        System.out.println("密码：" + user.getPassword());
    }
}
~~~



### 测试

~~~java
@GetMapping("/publish")
public User publishEvent() {
    return userService.getUser2();
}
~~~





## 监听Servlet上下文对象

### 数据库查询信息

~~~java
@Service
public class UserService {
    /**
     * 获取用户信息
     * @return
     */
    public User getUser() {
		// 实际中会根据具体的业务场景，从数据库中查询对应的信息
        return new User(1L, "zhanglinwei", "123456");
    }
}
~~~

### 编写监听器

写一个监听器，实现 `ApplicationListener` 接口，重写 `onApplicationEvent` 方 法，将 `ContextRefreshedEvent` 对象传进去。

如果我们想在加载或刷新应用上下文时，也重新刷新下我们预加载的资源，就可以通过监听 `ContextRefreshedEvent` 来做这样的事情。

~~~java
/**
 * 使用ApplicationListener来初始化一些数据到application域中的监听器
 */
@Component
public class MyServletContextListener implements ApplicationListener<ContextRefreshedEvent> {
    @Override
    public void onApplicationEvent(ContextRefreshedEvent contextRefreshedEvent) {
		// 先获取到application上下文
        ApplicationContext applicationContext = contextRefreshedEvent.getApplicationContext();
		// 获取对应的service
        UserService userService = applicationContext.getBean(UserService.class);
        User user = userService.getUser();
		// 获取application域对象，将查到的信息放到application域中
        ServletContext application = applicationContext.getBean(ServletContext.class);
        application.setAttribute("user", user);
    }
}
~~~

~~~java
@RestController
@RequestMapping("/listener")
public class TestController {
    @GetMapping("/user")
    public User getUser(HttpServletRequest request) {
        ServletContext application = request.getServletContext();
        return (User) application.getAttribute("user");
    }
}
~~~

## 监听HTTP会话 Session对象

监听 `session` 对象，来获取在线用户数量

- 首先该监听器需要实现 `HttpSessionListener` 接口
- 然后重写 `sessionCreated` 和 `sessionDestroyed` 方法
- 在 `sessionCreated` 方法中传递一个 `HttpSessionEvent` 对象
- 然后将当前 `session` 中的用户数量加1
- `sessionDestroyed` 方法刚好相反

~~~java
/**
 * 使用HttpSessionListener统计在线用户数的监听器
 */
@Component
public class MyHttpSessionListener implements HttpSessionListener {
    private static final Logger logger = LoggerFactory.getLogger(MyHttpSessionListener.class);
    /**
     * 记录在线的用户数量
     */
    public Integer count = 0;
    @Override
    public synchronized void sessionCreated(HttpSessionEvent httpSessionEvent) {
        logger.info("新用户上线了");
        count++;
        httpSessionEvent.getSession().getServletContext().setAttribute("count", count);
    }
    @Override
    public synchronized void sessionDestroyed(HttpSessionEvent httpSessionEvent) {
        logger.info("用户下线了");
        count--;
        httpSessionEvent.getSession().getServletContext().setAttribute("count", count);
    }
}
~~~

~~~java
@GetMapping("/total2")
public String getTotalUser(HttpServletRequest request,HttpServletResponse response){
        Cookie cookie;
        try{
			// 把sessionId记录在浏览器中
        	cookie=new Cookie("JSESSIONID",URLEncoder.encode(request.getSession().getId(),"utf8"));
        	cookie.setPath("/");
			//设置cookie有效期为2天，设置长一点
        	cookie.setMaxAge(48*60*60);
        	response.addCookie(cookie);
        } catch (UnsupportedEncodingException e){
        	e.printStackTrace();
        }
        Integer count=(Integer)request.getSession().getServletContext().getAttribute("count");
        return"当前在线人数："+count;
}
~~~

> 该处理逻辑是让服务器记得原来那个 `session`，即把原来的 `sessionId` 记录在浏览器中，下次再打开时，把这个 `sessionId` 传过去，这样服务器就不会重新再创建了

## 监听客户端请求Servlet Request对象

获取用户的访问信息比较简单，实现 `ServletRequestListener` 接口即可，然后通过 `request` 对象获取 一些信息

~~~java
/**
 * 使用ServletRequestListener获取访问信息
 */
@Component
public class MyServletRequestListener implements ServletRequestListener {
    private static final Logger logger =
            LoggerFactory.getLogger(MyServletRequestListener.class);

    @Override
    public void requestInitialized(ServletRequestEvent servletRequestEvent) {
        HttpServletRequest request = (HttpServletRequest)
                servletRequestEvent.getServletRequest();
        logger.info("session id为：{}", request.getRequestedSessionId());
        logger.info("request url为：{}", request.getRequestURL());
        request.setAttribute("name", "zhanglinwei");
    }

    @Override
    public void requestDestroyed(ServletRequestEvent servletRequestEvent) {
        logger.info("request end");
        HttpServletRequest request = (HttpServletRequest)
                servletRequestEvent.getServletRequest();
        logger.info("request域中保存的name值为：{}", request.getAttribute("name"));
    }
}
~~~

~~~java
@GetMapping("/request")
public String getRequestInfo(HttpServletRequest request) {
        System.out.println("requestListener中的初始化的name数据：" + request.getAttribute("name"));
        return "success";
}
~~~

