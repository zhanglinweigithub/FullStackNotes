# 目录
[[toc]]
# MySQL约束

**概念：** 约束是作用于表中字段上的规则，用于限制存储在表中的数据。

**目的：** 保证数据库中数据的正确、有效性和完整性。  

| **约束**                  | **描述**                                                    | **关键字**  |
| ------------------------- | ----------------------------------------------------------- | ----------- |
| 非空约束                  | 限制该字段的数据不能为null                                  | NOT NULL    |
| 唯一约束                  | 保证该字段的所有数据都是唯一、不重复的                      | UNIQUE      |
| 主键约束                  | 主键是一行数据的唯一标识，要求非空且唯一                    | PRIMARY KEY |
| 默认约束                  | 保存数据时，如果未指定该字段的值，则采用默认值              | DEFAULT     |
| 检查约束(8.0.16版本 之后) | 保证字段值满足某一个条件                                    | CHECK       |
| 外键约束                  | 用来让两张表的数据之间建立连接，保证数据的一致 性和完整  性 | FOREIGN KEY |

 **注意：约束是作用于表中字段上的，可以在创建表/修改表的时候添加约束。**

~~~sql
CREATE TABLE tb_user(
	id int AUTO_INCREMENT PRIMARY KEY COMMENT 'ID唯一标识',
	name varchar(10) NOT NULL UNIQUE COMMENT '姓名' ,
	age int check (age > 0 && age <= 120) COMMENT '年龄' ,
	status char(1) default '1' COMMENT '状态',
	gender char(1) COMMENT '性别'
);
~~~

