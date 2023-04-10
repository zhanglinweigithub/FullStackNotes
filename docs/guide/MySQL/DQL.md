---
title: DQL
---
# 目录
[[toc]]
# DQL（Data QueryLanguage）

数据查询语言，用来查询数据库中表的记录。  

## 语法结构

~~~sql
SELECT
	字段列表
FROM
	表名列表
WHERE
	条件列表
GROUP BY
	分组字段列表
HAVING
	分组后条件列表
ORDER BY
	排序字段列表
LIMIT
	分页参数

-- 语句执行顺序
FROM
	表名列表
WHERE
	条件列表
GROUP BY
	分组字段列表
HAVING
	分组后条件列表
SELECT
	字段列表
ORDER BY
	排序字段列表
LIMIT
	分页参数
~~~

## 使用示例

### 基本查询

~~~sql
-- 查询多个字段
SELECT 字段1, 字段2, 字段3 ... FROM 表名 ; -- 查询指定字段
SELECT * FROM 表名 ; -- 查询全部字段(少用 * ，不直观，影响效率)

select name,workno,age from emp;
select * from emp;

-- 字段设置别名
SELECT 字段1 [ AS 别名1 ] , 字段2 [ AS 别名2 ] ... FROM 表名;
SELECT 字段1 [ 别名1 ] , 字段2 [ 别名2 ] ... FROM 表名;

select workaddress as '工作地址' from emp;
select workaddress '工作地址' from emp; -- as 可以省略

-- 去除重复记录
SELECT DISTINCT 字段列表 FROM 表名; -- DISTINCT 为去重

select distinct workaddress '工作地址' from emp;
~~~

### where 条件查询

~~~sql
-- 根据 where 条件查询
SELECT 字段列表 FROM 表名 WHERE 条件列表 ;

select * from emp where age = 88;
select * from emp where age < 20;
select * from emp where age <= 20;

select * from emp where idcard is null;
select * from emp where idcard is not null;

select * from emp where age != 88;
select * from emp where age <> 88;

select * from emp where age >= 15 && age <= 20;
select * from emp where age >= 15 and age <= 20;
select * from emp where age between 15 and 20;

select * from emp where gender = '女' and age < 25;
select * from emp where age = 18 or age = 20 or age =40;

select * from emp where age in(18,20,40);
select * from emp where age not in(18,20,40);

select * from emp where name like '__'; -- _表示匹配一个任意字符
select * from emp where idcard like '%X'; -- %表示匹配多个任意字符
~~~

### 使用函数

NULL值是不参与所有聚合函数运算的。

~~~ sql
-- 聚合函数
SELECT 聚合函数(字段列表) FROM 表名 ;

select count(*) from emp; -- 统计的是总记录数
select count(idcard) from emp; -- 统计的是idcard字段不为null的记录数

select avg(age) from emp; -- 统计该企业员工的平均年龄

select max(age) from emp; -- 统计该企业员工的最大年龄

select min(age) from emp; -- 统计该企业员工的最小年龄

select sum(age) from emp where workaddress = '西安'; -- 统计西安地区员工的年龄之和

-- 字符串函数
-- 企业员工的工号，统一为5位数，目前不足5位数的全部在前面补0。比如： 1号员工的工号应该为00001。

update emp set workno = lpad(workno, 5, '0');

-- 数值函数
-- 通过数据库的函数，生成一个六位数的随机验证码。
select lpad(round(rand()*1000000 , 0), 6, '0');
 
-- 日期函数 
select date_add(now(), INTERVAL 70 YEAR );

-- 流程函数
-- 查询emp表的员工姓名和工作地址 (北京/上海 ----> 一线城市 , 其他 ----> 二线城市)
select name,
( case workaddress when '北京' then '一线城市' when '上海' then '一线城市' else
'二线城市' end ) as '工作地址' from emp;
~~~

### group 分组查询

分组之后，查询的字段一般为聚合函数和分组字段，查询其他字段无任何意义。  

**执行顺序:** where > 聚合函数 > having 。  

支持多字段分组, 具体语法为 : `group by columnA,columnB`  

**where与having区别**
**1、执行时机不同：**

- where是分组之前进行过滤，不满足where条件，不参与分组；
- 而having是分组之后对结果进行过滤。

**2、判断条件不同：**

- where不能对聚合函数进行判断，而having可以。 

~~~sql
-- ASC : 升序(默认值)  DESC: 降序
SELECT 字段列表 FROM 表名 ORDER BY 字段1 排序方式1 , 字段2 排序方式2 ;

select * from emp order by age asc;
select * from emp order by age;

select * from emp order by entrydate desc;
select * from emp order by age asc , entrydate desc;
~~~

- **如果是升序, 可以不指定排序方式ASC  **
- **如果是多字段排序，当第一个字段值相同时，才会根据第二个字段进行排序  **

### 分页查询

-  **起始索引从0开始，起始索引 = （查询页码 - 1）* 每页显示记录数**
-  **分页查询是数据库的方言，不同的数据库有不同的实现，MySQL中是LIMIT**
-  **如果查询的是第一页数据，起始索引可以省略，直接简写为 limit 10  **

~~~sql
SELECT 字段列表 FROM 表名 LIMIT 起始索引, 查询记录数 ;

select * from emp limit 0,10;
select * from emp limit 10;

--  查询第2页员工数据, 每页展示10条记录
select * from emp limit 10,10;
~~~

