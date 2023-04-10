---
title: MyBatis传参
---
# 目录

[[toc]]

## MyBatis传参的几种方式

### **传递一个参数**

~~~java
User getByName(String name);
~~~

`Mapper.xml`引用这个`name`参数：`#{任意合法名称}`

- 当一个参数的 时候 `#{变量名称}` 中变量名称可以随意写，都可以取到传入的参数



### **传递一个Map参数**

如果我们需要传递的参数比较多，参数个数是动态的，那么我们可以将这些参数放在一个`map`中，`key` 为参数名称，`value`为参数的值

~~~java
//我们传递
Map<String, Object> map = new HashMap<>();
	map.put("id", 1L);
	map.put("name", "张学友");

//Mapper接口中可以这么定义
List<User> getByMap(Map<String,Object> map);

//对应的mapper xml中可以通过 #{map中的key} 可以获取key在map中对应的value的值作为参数
SELECT * FROM t_user WHERE id=#{id} OR name = #{name}
~~~



### **传递一个java对象参数**

当参数比较多，但是具体有多少个参数我们是确定的时候，我们可以将这些参数放在一个`javabean`对象 中

~~~java
//Mapper
List<UserModel> getListByUserFindDto(UserFindDto userFindDto);

//对应的UserMapper.xml中这么写
<select id="getListByUserFindDto"
	parameterType="com.javacode2018.chat03.demo4.dto.UserFindDto"
	resultType="com.javacode2018.chat03.demo4.model.UserModel">
    
	SELECT * FROM t_user WHERE id=#{userId} OR name = #{userName}

</select>
~~~

- 传递`java`对象的方式相对于`map`的方式更清晰一些，可以明确知道具体有哪些参数，而传递`map`，我们是不知道这个`map`中具体需要哪些参数的，`map`对参数也没有约束，参数可以随意传，建议多个参 数的情况下选择通过`java`对象进行传参



### 传递多个参数

上面我们介绍的都是传递一个参数，那么是否可以传递多个参数呢？我们来试试吧

~~~java
//Mapper
UserModel getByIdOrName(Long id, String name);

//Mapper.xml
<select id="getByIdOrName"
	resultType="com.javacode2018.chat03.demo4.model.UserModel">

	SELECT * FROM t_user WHERE id=#{id} OR name = #{name} LIMIT 1  //报错 Available parameters are [arg1, arg0, param1, param2]
	SELECT * FROM t_user WHERE id=#{arg0} OR name = #{arg1} LIMIT 1  //正常
    SELECT * FROM t_user WHERE id=#{param1} OR name = #{param2} LIMIT 1  //正常
    
</select>
~~~

- mybatis处理多个参数的时候，会将多个参数封装到一个map中，map的key为参数的名称，java可以通 过反射获取方法参数的名称
- 编译之后，方法参数的名称通过反射获取的并不是 `id`、`name` ，而是 `arg0`、`arg1` 
- 也就是说编译之 后，方法真实的参数名称会丢失，会变成 arg+参数下标 的格式



### 传递1个Collection参数

当传递的参数类型是 java.util.Collection 的时候，会被放在`map`中，`key`为 `collection` ，`value` 为参数的值

~~~java
//Mapper
List<UserModel> getListByIdCollection(Collection<Long> idCollection)
    
//xml
<select id="getListByIdCollection"
resultType="com.javacode2018.chat03.demo4.model.UserModel">

	SELECT * FROM t_user WHERE id IN (#{collection[0]},#{collection[1]})

</select>

~~~

集合参数，`mybatis`会进行一些特殊处理,源码如下：

~~~java
private Object wrapCollection(final Object object) {
	if (object instanceof Collection) {
		StrictMap<Object> map = new StrictMap<>();
		map.put("collection", object);
		if (object instanceof List) {
			map.put("list", object);
		}
		return map;
	} else if (object != null && object.getClass().isArray()) {
		StrictMap<Object> map = new StrictMap<>();
		map.put("array", object);
		return map;
	}
	return object;
}
~~~

- 判断参数是否是 `java.util.Collection` 类型，如果是，会放在`map`中，key为 `collection` 。 
- 如果参数是 `java.util.List` 类型的，会在`map`中继续放一个 `list` 作为`key`来引用这个对象。 
- 如果参数是数组类型的，会通过 `array` 来引用这个对象







































































































































