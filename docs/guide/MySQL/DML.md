---
title: DML
---
# 目录
[[toc]]
# DML（Data Manipulation Language）

数据操作语言，用来对数据库中表的数据记录进 行增、删、改操作

## insert 添加

-  插入数据时，指定的字段顺序需要与值的顺序是一一对应的。  
-  字符串和日期型数据应该包含在引号中。  
-  插入的数据大小，应该在字段的规定范围内。  

~~~sql
--  给指定字段添加数据
INSERT INTO 表名 (字段名1, 字段名2, ...) VALUES (值1, 值2, ...);

insert into employee(id,workno,name,gender,age,idcard,entrydate)
values(1,'1','Itcast','男',10,'123456789012345678','2000-01-01');

-- 给全部字段添加数据
INSERT INTO 表名 VALUES (值1, 值2, ...);

insert into employee values(2,'2','张无忌','男',18,'123456789012345670','2005-01-01');

-- 批量添加数据
INSERT INTO 表名 (字段名1, 字段名2, ...) VALUES (值1, 值2, ...), (值1, 值2, ...), (值
1, 值2, ...) ;
INSERT INTO 表名 VALUES (值1, 值2, ...), (值1, 值2, ...), (值1, 值2, ...) ;

insert into employee values(3,'3','韦一笑','男',38,'123456789012345670','2005-01-
01'),(4,'4','赵敏','女',18,'123456789012345670','2005-01-01');
~~~

## update 修改

修改语句的条件可以有，也可以没有，如果没有条件，则会修改整张表的所有数据。  

~~~sql
UPDATE 表名 SET 字段名1 = 值1 , 字段名2 = 值2 , .... [ WHERE 条件 ] ;

update employee set name = 'itheima' where id = 1;

update employee set name = '小昭' , gender = '女' where id = 1;

update employee set entrydate = '2008-01-01';
~~~

## delete 删除

-  DELETE 语句的条件可以有，也可以没有，如果没有条件，则会删除整张表的所有数据。  
-  DELETE 语句不能删除某一个字段的值(可以使用UPDATE，将该字段值置为NULL即 可)。  

~~~sql
DELETE FROM 表名 [ WHERE 条件 ] ;

delete from employee where gender = '女';

delete from employee;
~~~

