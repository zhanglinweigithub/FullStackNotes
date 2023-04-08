# 目录

[[toc]]

## 读取配置文件

### @Value

`@Value` 注解上通过 ${key} 即可获取配置文件中和 `key` 对应的 `value` 值。

~~~yaml
server:
	port: 8001
application:
	name: zhanglinwei
# 配置多个微服务的地址
url:
	# 订单微服务的地址
	orderUrl: http://localhost:8002
	# 用户微服务的地址
	userUrl: http://localhost:8003
	# 购物车微服务的地址
	shoppingUrl: http://localhost:8004
lesson: SpringBoot
~~~

~~~java
@RestController
@RequestMapping("/test")
public class ConfigController {
    private static final Logger LOGGER = LoggerFactory.getLogger(ConfigController.class);
    @Value("${application.name}")
    private String name;

    @RequestMapping("/config")
    public String testConfig() {
        LOGGER.info("=====项目名称：{}", name);
        return "success";
    }
}
~~~

### @ConfigurationProperties

使用 `@ConfigurationProperties` 注解并且使用 `prefix` 来指定一个前缀，然后该类中 的属性名就是配置中去掉前缀后的名字，一一对应即可，使用时直接注入即可

#### 自定义实体类

~~~java
@Component
// 指定前缀
@ConfigurationProperties(prefix = "url")
public class MicroServiceUrl {
	private String orderUrl;
	private String userUrl;
	private String shoppingUrl;
	// 省去get和set方法
}

~~~

#### 使用

~~~java
@RestController
@RequestMapping("/test")
public class TestController {
    private static final Logger LOGGER = LoggerFactory.getLogger(TestController.class);
    @Resource
    private MicroServiceUrl microServiceUrl;

    @RequestMapping("/config")
    public String testConfig() {
        LOGGER.info("=====获取的订单服务地址为：{}", microServiceUrl.getOrderUrl());
        LOGGER.info("=====获取的用户服务地址为：{}", microServiceUrl.getUserUrl());
        LOGGER.info("=====获取的购物车服务地址为：{}", microServiceUrl.getShoppingUrl());
        return "success";
    }
}
~~~

### Environment

`SpringBoot`提供的一个对象，能够把所有的数据都封装到这一个对象中，使用自动装配注解可以将所有的`yaml`数据封装到这个对象中

获取属性时，通过`Environment`的接口操作进行，具体方法是`getProperties（String）`，参数填写属性名即可

~~~java
@RestController
@RequestMapping("/test")
public class TestController {
    private static final Logger LOGGER = LoggerFactory.getLogger(TestController.class);
    @Autowired
    private Environment env;

    @RequestMapping("/config")
    public String testConfig() {
        LOGGER.info("=====application.name：{}", env.getProperties("env.application.name"));
        LOGGER.info("=====lesson：{}", env.getProperties("env.lesson"));
        return "success";
    }
}
~~~

## 指定项目配置文件

新建两个配置文件： `application-dev.yml` 和 `application-pro.yml` ，分别用来对开发环境和生产环境进行 相关配置

~~~yaml
# 开发环境配置文件
server:
	port: 8001
~~~

~~~yaml
# 生产环境配置文件
server:
	port: 8002
~~~

然后在 `application.yml` 文件中指定读取哪个配置文件即可

~~~yaml
spring:
	profiles:
		active:
		- dev
~~~

