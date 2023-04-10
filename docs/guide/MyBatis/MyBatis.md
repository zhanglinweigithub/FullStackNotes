---
title: MyBatis
---
# 目录

[[toc]]

## MyBatis

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



### 什么是ORM

**ORM（Object Relational Mapping）：**对象关系映射，简单点说就是将数据库中的表和java中的对象 建立映射关系，可以让我们操作对象来间接的操作数据库



















