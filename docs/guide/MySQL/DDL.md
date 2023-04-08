# 目录
[[toc]]
# DDL(Data Definition Language)

数据定义语言，用来定义数据库对象(数据库，表，字段) 。 

用于创建或修改数据库、表、表结构

## 数据库操作

~~~sql
-- 查询所有数据库
show databases;

-- 查询当前数据库
select database();

-- 创建数据库 方式一
create database [ if not exists ] 数据库名 [ default charset 字符集 ] [ collate 排序规则 ];

create database ilovemysql;

create database if not exists ilovemysql; -- ilovemysql不存在就创建，存在不创建

create database ilikemysql default charset utf8mb4; -- 指定字符集

-- 创建数据库 方式二
create schema 数据库名;

create schema db01;


-- 删除数据库
drop database [ if exists ] 数据库名;

drop database ilovemysql;

drop database if exists ilovemysql; -- 若存在 itcast 数据库，就删除

-- 切换数据库
use 数据库名;

use ilikemysql;
~~~

## 表操作

```sql
-- 查询当前数据库所有表
show tables;

-- 查看指定表结构
-- 通过这条指令，我们可以查看到指定表的字段，字段的类型、是否可以为NULL，是否存在默认值等信息
desc 表名;

--  查询指定表的建表语句
show create table 表名;

-- 创建表结构
CREATE TABLE 表名(
	字段1 字段1类型 [ COMMENT 字段1注释 ],
	字段2 字段2类型 [COMMENT 字段2注释 ],
	字段3 字段3类型 [COMMENT 字段3注释 ],
	......
	字段n 字段n类型 [COMMENT 字段n注释 ]
) [ COMMENT 表注释 ];

--  添加字段
ALTER TABLE 表面 ADD 字段名 类型(长度) [ COMMENT 注释 ] [ 约束 ];

ALTER TABLE emp ADD nickname varchar(20) COMMENT '昵称';

-- 修改数据类型
ALTER TABLE 表名 MODIFY 字段名 新数据类型(长度);

-- 修改字段名和字段类型
ALTER TABLE 表名 CHANGE 旧字段名 新字段名 类型(长度) [ COMMENT 注释 ] [ 约束 ];

ALTER TABLE emp CHANGE nickname username varchar(30) COMMENT '昵称';

-- 删除字段
ALTER TABLE 表名 DROP 字段名;

ALTER TABLE emp DROP username;

-- 修改表名
ALTER TABLE 表名 RENAME TO 新表名;

ALTER TABLE emp RENAME TO employee;

-- 删除表
DROP TABLE [ IF EXISTS ] 表名;

DROP TABLE IF EXISTS tb_user;

--  删除指定表, 并重新创建表 （在删除表时，数据也会被删除）
TRUNCATE TABLE 表名;

```