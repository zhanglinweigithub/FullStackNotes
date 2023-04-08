
# 目录
[[toc]]
# 多表查询

内容包含：连接查询、联合查询、子查询



 各个表之间的联系，基本上分为三种： 

- 一对多(多对一) 
- 多对多 
- 一对一  

## 连接查询

- **内连接：** 相当于查询A、B交集部分数据  
- **左外连接：** 查询左表所有数据，以及两张表交集部分数据  
- **右外连接：** 查询右表所有数据，以及两张表交集部分数据  
- **自连接：** 当前表与自身的连接查询，自连接必须使用表别名  

### 内连接

内连接的语法分为两种: 

- 隐式内连接
- 显式内连接

内连接查询的是两张表交集部分的数 据。(也就是绿色部分的数据)  

![image-20230405131436509](./img/image-20230405131436509.png)

#### 1). 隐式内连接  

~~~sql
SELECT 字段列表 FROM 表1 , 表2 WHERE 条件 ... ;

-- 查询每一个员工的姓名 , 及关联的部门的名称
select e.name,d.name from emp e , dept d where e.dept_id = d.id;
~~~

#### 2). 显式内连接  

~~~sql
SELECT 字段列表 FROM 表1 [ INNER ] JOIN 表2 ON 连接条件 ... ;

-- 查询每一个员工的姓名 , 及关联的部门的名称
select e.name, d.name from emp e join dept d on e.dept_id = d.id;
~~~

### 外连接

 外连接分为两种：

- 左外连接： 左外连接相当于查询表1(左表)的所有数据，当然也包含表1和表2交集部分的数据
- 右外连接：右外连接相当于查询表2(右表)的所有数据，当然也包含表1和表2交集部分的数据。  

#### 1). 左外连接 

 左外连接相当于查询表1(左表)的所有数据，当然也包含表1和表2交集部分的数据

~~~sql
SELECT 字段列表 FROM 表1 LEFT [ OUTER ] JOIN 表2 ON 条件 ... ;

-- 查询emp表的所有数据, 和对应的部门信息
select e.*, d.name from emp e left join dept d on e.dept_id = d.id;
~~~

#### 2). 右外连接

右外连接相当于查询表2(右表)的所有数据，当然也包含表1和表2交集部分的数据。  

~~~sql
SELECT 字段列表 FROM 表1 RIGHT [ OUTER ] JOIN 表2 ON 条件 ... ;

-- 查询dept表的所有数据, 和对应的员工信息
select d.*, e.* from dept d left outer join emp e on e.dept_id = d.id;
~~~

### 自连接

自连接查询，顾名思义，就是自己连接自己，也就是把一张表连接查询多次  
而对于自连接查询，可以是内连接查询，也可以是外连接查询。  

~~~sql
SELECT 字段列表 FROM 表A 别名A JOIN 表A 别名B ON 条件 ... ;

--  查询员工 及其 所属领导的名字
select a.name , b.name from emp a , emp b where a.managerid = b.id;

-- 查询所有员工 emp 及其领导的名字 emp , 如果员工没有领导, 也需要查询出来
select a.name '员工', b.name '领导' from emp a left join emp b on a.managerid = b.id;
~~~

## 联合查询

 对于union查询，就是把多次查询的结果合并起来，形成一个新的查询结果集  

- 联合查询的多张表的列数必须保持一致，字段类型也需要保持一致
- `union all` 会将全部的数据直接合并在一起，`union` 会对合并之后的数据去重

```sql
SELECT 字段列表 FROM 表A ...
UNION [ ALL ]
SELECT 字段列表 FROM 表B ....;

select * from emp where salary < 5000
union all
select * from emp where age > 50;

```

## 子查询

 SQL语句中嵌套SELECT语句，称为嵌套查询，又称子查询

 子查询外部的语句可以是`INSERT` / `UPDATE` / `DELETE` / `SELECT` 的任何一个  

根据子查询结果不同，分为： 

- 标量子查询（子查询结果为单个值），常用的操作符：=、<>、>、>=、<、<=
- 列子查询(子查询结果为一列) ，常用的操作符：IN 、NOT IN 、 ANY 、SOME 、 ALL  
- 行子查询(子查询结果为一行)  ，= 、<> 、IN 、NOT IN  
- 表子查询(子查询结果为多行多列)，IN 

~~~sql
SELECT * FROM t1 WHERE column1 = ( SELECT column1 FROM t2 );

-- 标量子查询
-- 根据 "销售部" 部门ID, 查询员工信息
select * from emp where dept_id = (select id from dept where name = '销售部');

--  查询在 "方东白" 入职之后的员工信息
select * from emp where entrydate > (select entrydate from emp where name = '方东白');


-- 列子查询
-- 查询 "销售部" 和 "市场部" 的所有员工信息
select * from emp where dept_id in (select id from dept where name = '销售部' or name = '市场部');

-- 查询比 财务部 所有人工资都高的员工信息
select * from emp where salary > all ( select salary from emp where dept_id =
(select id from dept where name = '财务部') );

-- 查询比研发部其中任意一人工资高的员工信息
select * from emp where salary > any ( select salary from emp where dept_id =
(select id from dept where name = '研发部') );


-- 行子查询
--  查询与 "张无忌" 的薪资及直属领导相同的员工信息
select * from emp where (salary,managerid) = (select salary, managerid from emp
where name = '张无忌');


-- 表子查询
 -- 查询与 "鹿杖客" , "宋远桥" 的职位和薪资相同的员工信息
select * from emp where (job,salary) in ( select job, salary from emp where name =
'鹿杖客' or name = '宋远桥' );

--  查询入职日期是 "2006-01-01" 之后的员工信息 , 及其部门信息
select e.*, d.* from (select * from emp where entrydate > '2006-01-01') e left
join dept d on e.dept_id = d.id ;
~~~

