---
title: JSON
---
# 目录

[[toc]]

## SpringBoot返回JSON数据

`Spring Boot` 中 默认使用的 `Json` 解析技术框架是 `jackson`。

并已经集成在了 `spring-boot-starter-web` 依赖中

## 默认 jackson

### User实体类

~~~java
public class User {
	private Long id;
	private String username;
	private String password;
	/* 省略get、set和带参构造方法 */
}
~~~

### Controller类

~~~java
@RestController
@RequestMapping("/json")
public class JsonController {
    @RequestMapping("/user")
    public User getUser() {
        return new User(1, "zhanglinwei", "123456");
    }

    @RequestMapping("/list")
    public List<User> getUserList() {
        List<User> userList = new ArrayList<>();
        User user1 = new User(1, "zhanglinwei", "123456");
        User user2 = new User(2, "linweizhang", "123456");
        userList.add(user1);
        userList.add(user2);
        return userList;
    }

    @RequestMapping("/map")
    public Map<String, Object> getMap() {
        Map<String, Object> map = new HashMap<>(3);
        User user = new User(1, "zhanglinwei", "123456");
        map.put("作者信息", user);
        map.put("博客地址", "http://zhanglinwei");
        map.put("CSDN地址", "http://zhanglinwei");
        map.put("粉丝数量", 1000000);
        return map;
    }
}
~~~

### 返回结果

#### **User**

~~~json
{
	"id": 1,
	"username": "zhanglinwei",
	"password": "123456"
}
~~~

#### **List**

~~~json
[
    {
		"id": 1,
		"username": "zhanglinwei",
		"password": "123456"
	}, 
    {
		"id": 2,
		"username": "linweizhang",
		"password": "123456"
	}
]
~~~

#### **Map**

~~~json
{
	"作者信息": {
					"id": 1,
					"username": "zhanglinwei",
					"password": "123456"
			   },
	"CSDN地址": "http://zhanglinwei",
	"粉丝数量": 10000000,
	"博客地址": "http://zhanglinwei"
}
~~~

### Null值处理

#### **添加配置**

~~~java
@Configuration
public class JacksonConfig {
    @Bean
    @Primary
    @ConditionalOnMissingBean(ObjectMapper.class)
    public ObjectMapper jacksonObjectMapper(Jackson2ObjectMapperBuilder builder) {
        ObjectMapper objectMapper = builder.createXmlMapper(false).build();
        objectMapper.getSerializerProvider().setNullValueSerializer(new JsonSerializer<Object>() {
            @Override
            public void serialize(Object o, JsonGenerator jsonGenerator, SerializerProvider
                    serializerProvider) throws IOException {
                jsonGenerator.writeString("");
            }
        });
        return objectMapper;
    }
}
~~~

#### **修改 map 接口**

```java
@RequestMapping("/map")
public Map<String, Object> getMap(){
        Map<String, Object> map=new HashMap<>(3);
        User user=new User(1,"zhanglinwei",null);
        map.put("作者信息",user);
        map.put("博客地址","http://zhanglinwei");
        map.put("CSDN地址",null);
        map.put("粉丝数量",10000000);
        return map;
}
```

#### **结果**

~~~json
{
	"作者信息": {
				"id": 1,
				"username": "zhanglinwei",
				"password": ""
			   },
	"CSDN地址": "",
	"粉丝数量": 4153,
	"博客地址": "http://zhanglinwei"
}
~~~

## FastJson（Alibaba）

### 依赖

~~~xml
<dependency>
	<groupId>com.alibaba</groupId>
	<artifactId>fastjson</artifactId>
	<version>1.2.35</version>
</dependency>
~~~

### Null值处理

~~~java
@Configuration
public class fastJsonConfig extends WebMvcConfigurationSupport {
    /**
     * 使用阿里 FastJson 作为JSON MessageConverter
     *
     * @param converters
     */
    @Override
    public void configureMessageConverters(List<HttpMessageConverter<?>> converters) {
        FastJsonHttpMessageConverter converter = new FastJsonHttpMessageConverter();
        FastJsonConfig config = new FastJsonConfig();
        config.setSerializerFeatures(
				// 保留map空的字段
                SerializerFeature.WriteMapNullValue,
				// 将String类型的null转成""
                SerializerFeature.WriteNullStringAsEmpty,
				// 将Number类型的null转成0
                SerializerFeature.WriteNullNumberAsZero,
				// 将List类型的null转成[]
                SerializerFeature.WriteNullListAsEmpty,
				// 将Boolean类型的null转成false
                SerializerFeature.WriteNullBooleanAsFalse,
				// 避免循环引用
                SerializerFeature.DisableCircularReferenceDetect);
        converter.setFastJsonConfig(config);
        converter.setDefaultCharset(Charset.forName("UTF-8"));
        List<MediaType> mediaTypeList = new ArrayList<>();
		// 解决中文乱码问题，相当于在Controller上的@RequestMapping中加了个属性produces ="application/json"
        mediaTypeList.add(MediaType.APPLICATION_JSON);
        converter.setSupportedMediaTypes(mediaTypeList);
        converters.add(converter);
    }
}
~~~



##  jackson 和 FastJson 的对比

| 选项                  | fastJson | jackson |
| --------------------- | -------- | ------- |
| 上手难易程度          | 容易     | 中等    |
| 高级特性支持          | 中等     | 丰富    |
| 官方文档、Example支持 | 中文     | 英文    |
| 处理json速度          | 略快     | 快      |



## 封装统一返回的数据结构

### 代码

~~~java
public class JsonResult<T> {
    private T data;
    private String code;
    private String msg;

    /**
     * 若没有数据返回，默认状态码为0，提示信息为：操作成功！
     */
    public JsonResult() {
        this.code = "0";
        this.msg = "操作成功！";
    }

    /**
     * 若没有数据返回，可以人为指定状态码和提示信息
     *
     * @param code
     * @param msg
     */
    public JsonResult(String code, String msg) {
        this.code = code;
        this.msg = msg;
    }

    /**
     * 有数据返回时，状态码为0，默认提示信息为：操作成功！
     *
     * @param data
     */
    public JsonResult(T data) {
        this.data = data;
        this.code = "0";
        this.msg = "操作成功！";
    }

    /**
     * 有数据返回，状态码为0，人为指定提示信息
     *
     * @param data
     * @param msg
     */
    public JsonResult(T data, String msg) {
        this.data = data;
        this.code = "0";
        this.msg = msg;
    }
	// 省略get和set方法
}
~~~

### 结果

#### User

~~~json
{
	"code": "0",
	"data": {
		"id": 1,
		"password": "123456",
		"username": "zhanglinwei"
	},
	"msg": "操作成功！"
}
~~~



#### List

~~~json
{
	"code": "0",
	"data": [
        		{
					"id": 1,
					"password": "123456",
					"username": "zhanglinwei"
				},
				{
					"id": 2,
					"password": "123456",
					"username": "linweizhang"
				}
	],
	"msg": "获取用户列表成功"
}
~~~



#### Map

~~~json
{
	"code": "0",
	"data": {
				"作者信息": {
					"id": 1,
					"password": "",
					"username": "zhanglinwei"
				},
				"CSDN地址": null,
				"粉丝数量": 10000000,
				"博客地址": "http://zhanglinwei"
	},
	"msg": "操作成功！"
}
~~~









































