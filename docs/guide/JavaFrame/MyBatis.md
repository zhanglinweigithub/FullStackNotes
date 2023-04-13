---
title: MyBatis
sidebar: 'auto'
---
# MyBatis 

## 一、概述

### 什么是MyBatis

MyBatis 是一款优秀的持久层框架，它支持自定义 SQL

MyBatis 免除了几乎所有的 JDBC 代码以及设置参数和获取结果集的工作

MyBatis 可以通过简单的 XML 或注解来配置和映射原始类型、接口和 Java POJO（Plain Old Java Objects， 普通老式 Java 对象）为数据库中的记录。

MyBatis 是一个半自动化的ORM框架，因为他需要我们自己去写sql

### MyBatis的优缺点

优点：

- 基于SQL语句编程，相当灵活，SQL写在XML里，解除 sql与程序代码的耦合，便于统一管理，支持编写动态SQL语句
- 与JDBC相比，减少了50%以上的代码量，消除了JDBC大量冗余的代码，不需要手动开关连接
- 很好的与各种数据库兼容（因为MyBatis使用JDBC来连接数据库，所以只要JDBC支持的数据库MyBatis都支 持）
- 能够与Spring很好的集成
- 提供映射标签，支持对象与数据库的ORM字段关系映射

缺点：

- SQL语句的编写工作量较大，尤其当字段多、关联表多时，对开发人员编写SQL语句的功底有一定要求
- SQL语句依赖于数据库，导致数据库移植性差，不能随意更换数据库

### ORM

**ORM（Object Relational Mapping）：**对象关系映射，简单点说就是将数据库中的表和java中的对象 建立映射关系，可以让我们操作对象来间接的操作数据库



## 二、动态sql

MyBatis 动态sql可以在Xml映射文件内，以标签的形式编写动态sql，执行原理是根据表达式的值完成逻辑判断并动态调整sql的功能

Mybatis提供了9种动态sql标签： `trim | where | set | foreach | if | choose | when | otherwise | bind`

~~~xml
<!-- 
	if
	相当于 java 中的 if 判断
 	test的值为一个判断表达式，当test成立的时候，if体内部的sql会被拼接上
-->
<if test="判断条件"> 
需要追加的sql
</if>

<!-- 
	choose/when/otherwise
	相当于 java 中的 if..else if..else
 	choose内部的条件满足一个，choose内部的sql拼接就会结束
	otherwise属于可选的，当所有条件都不满足的时候，otherwise将起效
-->
<choose>
	<when test="条件1">
		满足条件1追加的sql
	</when>
	<when test="条件2">
		满足条件2追加的sql
	</when>
	<otherwise>
		都不满足追加的sql
	</otherwise>
</choose>

<!-- 
	where
	当使用where元素的时候，mybatis会将where内部拼接的sql进行处理，
	会将这部分sql前面的 AND 或者 OR 给去掉，并在前面追加一个where
-->
<select id="getList1" resultType="com.javacode2018.chat05.demo8.model.UserModel"
parameterType="map">
SELECT id,name,age FROM t_user
	<where>
		<if test="id!=null">
			AND id = #{id}
		</if>
		<if test="name!=null and name.toString()!=''">
			AND name = #{name}
		</if>
		<if test="age!=null">
			AND age = #{age}
		</if>
	</where>
</select>

<!-- 
	set
	我们将sql中的set去掉了，加了个set元素，set元素会对其内部拼接的sql进行处理，
	会将这部分sql前后的逗号给去掉并在前面加上 set
-->
<update id="update1"
	parameterType="com.javacode2018.chat05.demo8.model.UserModel">
	UPDATE t_user
	<set>
		<if test="name!=null">
			name = #{name},
		</if>
		<if test="age!=null">
			age = #{age},
		</if>
	</set>
	<where>
		<if test="id!=null">
    		AND id = #{id}
		</if>
	</where>
</update>

<!-- 
	trim
	语法：
		<trim prefix="" prefixOverrides="" suffix="" suffixOverrides="">
		</trim>
	trim元素内部可以包含各种动态sql，如where、chose、sql等各种元素，使用trim包含的元素，
	mybatis处理过程：
		1. 先对trim内部的sql进行拼接，比如这部分sql叫做sql1
		2. 将sql1字符串前面的部分中包含trim的prefixOverrides指定的部分给去掉，得到sql2
		3. 将sql2字符串后面的部分中包含trim的suffixOverrides指定的部分给去掉，得到sql3
		4. 在sql3前面追加trim中prefix指定的值，得到sql4
		5. 在sql4后面追加trim中suffix指定的值，得到最终需要拼接的sql5
	prefixOverrides的值的写法，如果有多个需要覆盖的之间用 | 进行分割，suffixOverrides
	写法和prefixOverrides的写法类似
-->
<select id="getList1" resultType="com.javacode2018.chat05.demo8.model.UserModel"
	parameterType="map">
	SELECT id,name,age FROM t_user
	<trim prefix="where" prefixOverrides="and|or">
		<if test="id!=null">
			AND id = #{id}
		</if>
		<if test="name!=null and name.toString()!=''">
			AND name = #{name}
		</if>
		<if test="age!=null">
			AND age = #{age}
		</if>
	</trim>
</select>

<update id="update1"
	parameterType="com.javacode2018.chat05.demo8.model.UserModel">
	UPDATE t_user
	<trim prefix="SET" prefixOverrides="," suffixOverrides=",">
		<if test="name!=null">
			name = #{name},
		</if>
		<if test="age!=null">
			age = #{age},
		</if>
	</trim>
	<where>
		<if test="id!=null">
			AND id = #{id}
		</if>
	</where>
</update>

<!-- 
	foreach
	相当于java中的循环，可以用来遍历数组、集合、map等
	语法：
		<foreach collection="需要遍历的集合" item="集合中当前元素" index="" open=""
			separator="每次遍历的分隔符" close="">
			动态sql部分
		</foreach>
	collection：可以是一个List、Set、Map或者数组
	item：集合中的当前元素的引用
	index：用来访问当前元素在集合中的位置
	separator：各个元素之间的分隔符
	open和close用来配置最后用什么前缀和后缀将foreach内部所有拼接的sql给包装起来
-->
<select id="getList1" resultType="com.javacode2018.chat05.demo8.model.UserModel"
	parameterType="map">
	SELECT id,name,age FROM t_user
	<where>
		<if test="id!=null">
			AND id = #{id}
		</if>
		<if test="name!=null and name.toString()!=''">
			AND name = #{name}
		</if>
		<if test="age!=null">
			AND age = #{age}
		</if>
		<if test="idList!=null and idList.size()>=1">
			<foreach collection="idList" item="id" open="AND id in ("
				separator="," close=")">
				#{id}
			</foreach>
		</if>
	</where>
</select>

<insert id="insertBatch" parameterType="list">
	INSERT INTO t_user (id,name,age) VALUES
	<foreach collection="collection" separator="," item="item">
		(#{item.id}, #{item.name}, #{item.age})
	</foreach>
</insert>

<!-- 
	sql/include
	这两2个元素一般进行配合使用，可以实现代码重用的效果
	sql元素可以用来定义一段动态sql，语法如下：
		<sql id="sql片段id">
			各种动态sql
		</sql>
	其他地方需要使用的时候需要通过include关键字进行引入
		<include refid="需要引入的sql片段的id"/>
	注意：refid值的写法，refid的值为mapper xml的 namespace的值.sql的id ，
		如果在同一个mapper中，namespace可以省略，直接写对应的sql的id就可以了
-->
<sql id="findSql">
	<where>
		<if test="id!=null">
			AND id = #{id}
		</if>
		<if test="name!=null and name.toString()!=''">
			AND name = #{name}
		</if>
		<if test="age!=null">
			AND age = #{age}
		</if>
		<if test="idList!=null and idList.size()>=1">
			<foreach collection="idList" item="id" open="AND id in ("
			separator="," close=")">
				#{id}
			</foreach>
		</if>
	</where>
</sql>

<select id="getList1" resultType="com.javacode2018.chat05.demo8.model.UserModel"
parameterType="map">
	SELECT id,name,age FROM t_user
	<include refid="com.javacode2018.chat05.demo8.mapper.UserMapper.findSql" />
</select>

<select id="getList1Count"
resultType="com.javacode2018.chat05.demo8.model.UserModel" parameterType="map">
	SELECT count(*) FROM t_user
	<include refid="findSql" />
</select>

<!-- 
	bind
	bind元素允许我们通过ognl表达式在上下文中自定义一个变量，最后在动态sql中可以使用这个变量
	语法：<bind name="变量名称" value="ognl表达式">
-->
<if test="likeName!=null and likeName.trim()!=''">
	<bind name="nameLike" value="'%'+likeName.trim()+'%'" />
	AND name like #{nameLike}
</if>
~~~



### Xml映射文件中标签

除了常见的`select`|`insert`|`updae`|`delete`标签之外，

还有：`<resultMap>、<parameterMap>、<sql>、<include>、<selectKey>` ，加上动态`sql`的9个标签，其中  为`sql`片段标签，通过`<include>`  标签引入sql片

段，`<selectKey>`  为不支持自增的主键生成策略标签。

## 三、MyBatis传参的几种方式

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

## 四、Mybatis的缓存机制

`mybatis`中分为一级缓存和二级缓存

### **一级缓存**

​	是`SqlSession`级别的缓存，在操作数据库时需要构造 `sqlSession`对象，在对象中有一个数据结 构（HashMap）用于存储缓存数据，不同的`sqlSession`之

​	间的缓存数据区域（`HashMap`）是互相不影响的，`mybatis`中一级缓存是默认自动开启的

工作原理：

​	在同一个`SqlSession`中去多次去执行同样的查询，每次执行的时候会先到一级缓存 中查找，如果缓存中有就直接返回，如果一级缓存中没有相关数据，`mybatis`

​	就会去`db`中进行查找，然 后将查找到的数据放入一级缓存中，第二次执行同样的查询的时候，会发现缓存中已经存在了，会直接 返回。一级缓存的存储介质是

​	内存，是用一个`HashMap`来存储数据的，所以访问速度是非常快的

让一级缓存失效有3种方式：

1. `SqlSession`中执行增、删、改操作，此时`sqlsession`会自动清理其内部的一级缓存
2. 调用`SqlSession`中的`clearCache`方法清理其内部的一级缓存
3. 设置`Mapper` `xml`中`select`元素的`flushCache`属性值为`true`，那么执行查询的时候会先清空一级 缓存中的所有数据，然后去`db`中获取数据



~~~
一级缓存使用上存在局限性，必须要在同一个SqlSession中执行同样的查询，一级缓存才能提升查询速
度，如果想在不同的SqlSession之间使用缓存来加快查询速度，此时我们需要用到二级缓存了。
~~~



### **二级缓存**

​	二级缓存是`mapper`级别的缓存，每个`mapper.xml`有个`namespace`，二级缓存和`namespace`绑定的， 每个`namespace`关联一个二级缓存，多个`SqlSession`可

​	以共用二级缓存，二级缓存是跨`SqlSession`的

​	二级缓存默认是没有开启的，需要我们在`mybatis`全局配置文件中进行开启

~~~xml
<settings>
<!-- 开启二级缓存 -->
<setting name="cacheEnabled" value="true"/>
</settings>
<!-- 上面配置好了以后，还需要在对应的mapper.xml加上下面配置，表示这个mapper中的查询开启二级缓存 -->
<cache/>
~~~



### **一二级缓存共存时查询原理**

1. 当发起一个查询的时候，`mybatis`会先访问这个`namespace`对应的二级缓存，如果二级缓存中有 数据则直接返回，否则继续向下 
2. 查询一级缓存中是否有对应的数据，如果有则直接返回，否则继续向下 
3. 访问db获取需要的数据，然后放在当前`SqlSession`对应的二级缓存中，并且在本地内存中的另外 一个地方存储一份（这个地方我们就叫`TransactionalCache`） 
4. 当`SqlSession`关闭的时候，也就是调用`SqlSession`的`close`方法的时候，此时会将 `TransactionalCache`中的数据放到二级缓存中，并且会清空当前`SqlSession`一级缓存中的数据



### **清空或者跳过二级缓存的3种方式**

   1.对应的`mapper`中执行增删改查会清空二级缓存中数据 

2. `select`元素的`flushCache`属性置为`true`，会先清空二级缓存中的数据，然后再去`db`中查询数据， 然后将数据再放到二级缓存中 
3. select元素的`useCache`属性置为`true`，可以使这个查询跳过二级缓存，然后去查询数据



## 五、MyBatis获取主键的几种方式



### 方式一：配置

配置`useGeneratedKeys="true" keyProperty="id"`

我们需要在`Mapper.xml`中进行配置

~~~xml
<insert id="insertUser1"
useGeneratedKeys="true" keyProperty="id">

INSERT INTO t_user (name,age,salary,sex) VALUES (#{name},#{age},#{salary},#{sex})

</insert>
~~~

- `useGeneratedKeys`：设置为`true`
- `keyProperty`：参数对象中的属性名称，最后插入成功之后，`mybatis`会通过反射将自增值设置给 `keyProperty`指定的这个属性



### 方式二：插入后查询

插入后查询获取主键

~~~xml
<insert id="insertUser2"
parameterType="com.javacode2018.chat04.demo1.model.UserModel">
    
<selectKey keyProperty="id" order="AFTER" resultType="long">
SELECT LAST_INSERT_ID()
</selectKey>

INSERT INTO t_user (name,age,salary,sex) VALUES (#{name},#{age},#{salary},#{sex})
</insert>
~~~

`selectKey` 元素有3个属性需要指定

- `keyProperty`：参数对象中的属性名称，最后插入成功之后，`mybatis`会通过反射将自增值设置给 `keyProperty`指定的这个属性
- `order`：指定`selectKey`元素中的`sql`是在插入之前运行还是插入之后运行，可选值 （`BEFORE`|`AFTER`）
- `resultType`：`keyProperty`指定的属性对应的类型，如上面的`id`对应的类型是 java.lang.Long ， 我们直接写的是别名 long



## 六、MyBatis 延迟加载

`Mybatis`仅支持`association`关联对象和`collection`关联集合对象的延迟加载，

> `association`指的就是一对一， `collection`指的就是一对多查询。

在`Mybatis`配置文件中，**可以全局配置是否启用延迟加载** 

- ​	`lazyLoadingEnabled`：这个属性比较好理解，是否开启延迟加载，默认为`false`，如果需要开启延迟加载，将其设置为`true`

- ​	`aggressiveLazyLoading`：当为`true`的时候，调用任意延迟属性，会去加载所有延迟属性，如果为 `false`，则调用某个属性的时候，只会加载指定的属性


全局的方式会对所有的关联查询起效，影响范围比较大，`mybatis`也提供了在关联查询中进行设置的方 式，只会对当前设置的关联查询起效。 

关联查询，一般我们使用 `association`、`collection` ，这两个元素都有个属性 `fetchType` ，通过这个 属性可以指定关联查询的加载方式

​	`fetchType`值有2种，

- `eager`：立即加载；
- `lazy`：延迟加载。



### 延迟加载的基本原理

比如：查询订单并且关联查询用户信息。如果先查询订单信息即可满足要求，当我们需要查询用户信息时再查询用户信息。

把对用户信息的按需去查询就是延迟加载 。 

所以延迟加载即先从单表查询、需要时再从关联表去关联查 询，大大提高数据库性能，因为查询单表要比关联查询多张表速度要快

## 七、其它

### Dao 接口里的方法，参数不同时能重载吗

不能重载。

因为 `xml` 中的`id`和方法名是对应的，如果方法重载了，那就对应会出现两个相同的`id`，在 `xml` 中会报错 的。 

再往深的说，在`MyBatis`源码中，会以方法名为`key`（也就是xml中的id），存放在`map`中，`map`的`key`是不能 重复的。

### 不同的 xml 映射文件，id是否可以重复

不同的 `xml` 映射文件，如果配置了 `namespace` ，那么`id`可以重复；

如果没有配置`namespace`，那么`id`不能重复；

原因就是 `namespace+id` 是作为 `Map` 的`key`使用的，如果没有 `namespace` ，就剩下`id`， 那么，`id`重复会导致数据互相覆盖。

有了 `namespace` ，自然`id`就可以重复， `namespace` 不同， `namespace+id` 自然 也就不同。

### #{} 和 ${} 的区别是什么

`\#{}`:为参数占位符 `？`，即`sql`预编译，将`sql` 中的 `#{}` 替换为 `?` 号 ，然后对他进行赋值，可以 防止`sql`注入

`${}`:为字符串替换， 就是把 `{}` 直接替换成变量的值，不能防止`sql`注入。



### 当实体类中的属性名和表中的字段名不一样时怎么办

**第 1 种：**定义别名

​	通过在查询的 sql 语句中定义字段名的别名，让字段名的别名和实体类的属性名一致

~~~xml
<select id="selectById" resultMap="User">
	select id, name as userName, pwd as password from m_user
	<where>
		<if test="id != null">
			id = #{id}
		</if>
	</where>
</select>

~~~

**第 2 种：**通过  来映射字段名和实体类属性名的一一对应的关系

**第 3 种：**使用注解时候，使用Result，和第二种类似



### MyBatis 的手动编程步骤

1. 创建 SqlSessionFactory
2. 通过 SqlSessionFactory 创建 SqlSession
3. 通过 sqlsession 执行数据库操作 
4. 调用 session.commit()提交事务 
5. 调用 session.close()关闭会话



### MyBatis 工作的流程

1.加载配置并初始化

2.接收调用请求

3.处理操作请求 触发条件

4.返回处理结果



### 增删改返回值说明

插入成功1行返回结果就是1，删除了10行记录，返回就是10，更新了5行记录，返回的就是 5



### Mapper接口的原理

使用`java`中的动态代理实现的，`mybatis`启动的时候会加载全局配置文件

然后解析这个文件中的 `mapper`元素指定的UserMapper.xml ，会根据 UserMapper.xml的`namespace`的 值 创建这个接口的一个动态代理

主要使用`java`中的`Proxy`实现的， 使用 `java.lang.reflect.Proxy` 类中的 `newProxyInstance` 方法，我们可以创建任意一个接口的一个 代理对象



### MyBatis分页

`MyBatis` 使用`RowBounds`对象进行分页，它是针对`ResultSet`结果集执行的内存分页，而非物理分页，先把数据都 查出来，然后再做分页

可以在`sql`内直接书写带有物理分页的参数来完成物理分页功能，也可以使用分页插件来完成物理分页



### 分页插件的基本原理？

使用`Mybatis`提供的插件接口，实现自定义插件，在插件的拦截方法内拦截待执行的`sql`，然后重写`sql`根据`dialect`方言，添加对应的物理分页语句和物理分页参数



### 简述Mybatis的插件运行原理？

`MyBatis` 仅可以编写针对`ParameterHandler`、`ResultSetHandler`、`StatementHandler`、`Executor`这4种接口的插件

`MyBatis` 使用`JDK`的动态代理，为需要拦截的接口生成代理对象以实现接口方法拦截功能，每当执行这4种接口对象的方法时，就会进入拦截方法，具体就是`InvocationHandler`的`invoke()`方法，当然，只会拦截那些你指定需要拦截的方法



































































































































































































































































































































































































































































































































































































































































































