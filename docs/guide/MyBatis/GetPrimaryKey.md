---
title: MyBatis获取主键
---
# 目录

[[toc]]

## MyBatis获取主键的几种方式



### 方式一：配置useGeneratedKeys="true" keyProperty="id"

我们需要在`Mapper.xml`中进行配置

~~~xml
<insert id="insertUser1"
useGeneratedKeys="true" keyProperty="id">

INSERT INTO t_user (name,age,salary,sex) VALUES (#{name},#{age},#{salary},#{sex})

</insert>
~~~

- `useGeneratedKeys`：设置为`true`
- `keyProperty`：参数对象中的属性名称，最后插入成功之后，`mybatis`会通过反射将自增值设置给 `keyProperty`指定的这个属性



### 方式二：插入后查询获取主键

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



















































































































































