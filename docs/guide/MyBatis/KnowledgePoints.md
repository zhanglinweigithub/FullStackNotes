---
title: MyBatis知识点
---
# 目录

[[toc]]

## Dao 接口里的方法，参数不同时能重载吗

不能重载。

因为 `xml` 中的`id`和方法名是对应的，如果方法重载了，那就对应会出现两个相同的`id`，在 `xml` 中会报错 的。 

再往深的说，在`MyBatis`源码中，会以方法名为`key`（也就是xml中的id），存放在`map`中，`map`的`key`是不能 重复的。

## 不同的 xml 映射文件，id是否可以重复

不同的 `xml` 映射文件，如果配置了 `namespace` ，那么`id`可以重复；

如果没有配置`namespace`，那么`id`不能重复；

原因就是 `namespace+id` 是作为 `Map` 的`key`使用的，如果没有 `namespace` ，就剩下`id`， 那么，`id`重复会导致数据互相覆盖。

有了 `namespace` ，自然`id`就可以重复， `namespace` 不同， `namespace+id` 自然 也就不同。

## #{} 和 ${} 的区别是什么

`\#{}`:为参数占位符 `？`，即`sql`预编译，将`sql` 中的 `#{}` 替换为 `?` 号 ，然后对他进行赋值，可以 防止`sql`注入

`${}`:为字符串替换， 就是把 `{}` 直接替换成变量的值，不能防止`sql`注入。



## 当实体类中的属性名和表中的字段名不一样时怎么办

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



## MyBatis 的手动编程步骤

1. 创建 SqlSessionFactory
2. 通过 SqlSessionFactory 创建 SqlSession
3. 通过 sqlsession 执行数据库操作 
4. 调用 session.commit()提交事务 
5. 调用 session.close()关闭会话



## MyBatis 工作的流程

1.加载配置并初始化

2.接收调用请求

3.处理操作请求 触发条件

4.返回处理结果



## 增删改返回值说明

插入成功1行返回结果就是1，删除了10行记录，返回就是10，更新了5行记录，返回的就是 5



## Mapper接口的原理

使用`java`中的动态代理实现的，`mybatis`启动的时候会加载全局配置文件

然后解析这个文件中的 `mapper`元素指定的UserMapper.xml ，会根据 UserMapper.xml的`namespace`的 值 创建这个接口的一个动态代理

主要使用`java`中的`Proxy`实现的， 使用 `java.lang.reflect.Proxy` 类中的 `newProxyInstance` 方法，我们可以创建任意一个接口的一个 代理对象



## MyBatis分页

`MyBatis` 使用`RowBounds`对象进行分页，它是针对`ResultSet`结果集执行的内存分页，而非物理分页，先把数据都 查出来，然后再做分页

可以在`sql`内直接书写带有物理分页的参数来完成物理分页功能，也可以使用分页插件来完成物理分页



## 分页插件的基本原理？

使用`Mybatis`提供的插件接口，实现自定义插件，在插件的拦截方法内拦截待执行的`sql`，然后重写`sql`根据`dialect`方言，添加对应的物理分页语句和物理分页参数



## 简述Mybatis的插件运行原理？

`MyBatis` 仅可以编写针对`ParameterHandler`、`ResultSetHandler`、`StatementHandler`、`Executor`这4种接口的插件

`MyBatis` 使用`JDK`的动态代理，为需要拦截的接口生成代理对象以实现接口方法拦截功能，每当执行这4种接口对象的方法时，就会进入拦截方法，具体就是`InvocationHandler`的`invoke()`方法，当然，只会拦截那些你指定需要拦截的方法



















































































































