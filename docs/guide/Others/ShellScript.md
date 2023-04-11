---
title: Shell脚本
sidebar: 'auto'
---
# 目录

[[toc]]

## Shell脚本

`Linux`提供的 `Shell`解析器：

`cat  /etc/shells`	查看

- `/bin/sh` 
- `/bin/bash`       默认
- `/usr/bin/sh` 
- `/usr/bin/bash` 
- `/bin/tcsh` 
- `/bin/csh`

`sh`指向`bash`



## 脚本格式

脚本以 `#!/bin/bash` 开头，指定解析器

`echo` 打印

`echo` “hello word”   输出 hello word

`sh` 脚本文件，运行脚本

`bash` 脚本文件，运行脚本

`./`脚本文件，运行脚本（需要执行权限 777）

 

## 常用系统变量

**显示当前 Shell 中所有变量：`set`**

`$HOME` : 返回当前角色的home路径

`$PWD` : 返回当前所在目录

`$SHELL` ：返回默认解析器是哪一个

`$USER` ：返回当前用户名



~~~
echo $HOME    》》/home/zhang
~~~



## 自定义变量

- 等号两侧不能有空格
- 在 `bash` 中，变量默认类型都是字符串类型，无法直接进行数值运算
- 变量的值如果有空格，需要使用双引号或单引号括起来



### **定义变量**

变量`=`值 	

~~~bash
A=1
echo $A  //1
~~~

::: warning

`=`两边不能有空格

:::

### **撤销变量**

`unset`  变量

~~~bash
unset A
echo $A  //报错
~~~



### **声明静态变量**

`readonly`  `B=3`	

~~~bash
readonly  B=3
echo $B  //3
unset B  //报错
~~~

::: warning

`readonly`声明的变量不能 `unset`

:::

### **变量提升为全局环境变量**

`export`  变量名

~~~bash
#!/bin/bash
echo "helloworld"
echo $B
//helloworld  B没输出

export B
//helloworld
//3
~~~



## 特殊变量

### **$n**

`n` 为数字，`$0` 代表该脚本名称，`$1-$9` 代表第一到第九个参数，十以上的参数，十以上的参数需要用大括号包含，如`${10}`

~~~bash
touch  parameter.sh
vim parameter.sh

#!/bin/bash
echo '========$n========'
echo $0
echo $1
echo $2

bash parameter.sh  cs1  cs2

//========$n========
//parameter.sh
//cs1
//cs2
~~~



### **$#**

获取所有**输入参数个数**，常用于循环,判断参数的个数是否正确以及加强脚本的健壮性

~~~bash
#!/bin/bash
echo '========$n========'
echo $0
echo $1
echo $2
echo '========$#========'
echo $#

bash parameter.sh  cs1  cs2

//========$n========
//parameter.sh
//cs1
//cs2
//========$#========
//2
~~~



### **$*、 $@**

`$*` （这个变量代表命令行中所有的参数，`$*`把所有的参数看成一个**整体**）

`$@` （这个变量也代表命令行中所有的参数，不过`$@`把每个参数**区分对待**）

注：具体区别请看 `for` 循环部分

~~~bash
#!/bin/bash
echo '========$n========'
echo $0
echo $1
echo $2
echo '========$#========'
echo $#
echo '========$*========'
echo $*
echo '========$@========'
echo $@

bash parameter.sh  a b c d e f g

//========$n========
//parameter.sh
//a
//b
//========$#========
//7
//========$*========
//a b c d e f g
//========$@========
//a b c d e f g
~~~



### **$?**

最后一次执行的命令的返回状态。如果这个变量的值为 0，证明上一 个命令正确执行；如果这个变量的值为非 0（具体是哪个数，由命令自己来决定），则证明 上一个命令执行不正确了

~~~bash
//判断 helloworld.sh 脚本是否正确执行

bash helloworld.sh	//hello word
echo $?		//0
~~~



## 运算符

`$((运算式))`	或	`$[运算式]`

~~~bash
//计算（2+3）* 4 的值

S=$[(2+3)*4]
echo $S	//20
~~~



## 条件判断

**基本语法**

`test  condition`		

[ `condition` ]	

`condition`非空即为 `true` ， `[ zhang]`返回 `true`	`[   ]` 返回 `false`

::: warning

`condition` 前后要有空格

:::

### （1）两个整数之间比较 

`-eq` 等于（equal） 

`-ne` 不等于（not equal）

`-lt` 小于（less than） 

`-le` 小于等于（less equal） 

`-gt` 大于（greater than） 

`-ge` 大于等于（greater equal） 



~~~bash
//23 是否大于等于 22
[ 23 -ge 22 ]
echo $?  //0
~~~

::: warning

如果是字符串之间的比较 ，用等号“`=`”判断相等；

用“`!=`”判断不等。 

:::

### （2）按照文件权限进行判断 

`-r` 有读的权限（read） 

`-w` 有写的权限（write） 

`-x` 有执行的权限（execute） 

~~~bash
//helloworld.sh 是否具有写权限
[ -w helloworld.sh ]
echo $?  //0
~~~



### （3）按照文件类型进行判断 

`-e` 文件存在（existence） 

`-f` 文件存在并且是一个常规的文件（file） 

`-d` 文件存在并且是一个目录（directory）

~~~bash
//  /home/zhang/cls.txt 目录中的文件是否存在
[ -e /home/zhang/cls.txt ]
echo $?  //1
~~~



### （4）多条件判断

`&&` 表示前一条命令执行成功时，才执行后一条命令

`||` 表示上一 条命令执行失败后，才执行下一条命令

~~~bash
[ zhang ] && echo OK || echo noOK  //OK
[   ] && echo OK || echo noOK  //noOK
~~~



## 流程控制

- `[ 条件判断式 ]`，中括号和条件判断式之间必须有空格
- `if` 后要有空格



### if判断

#### **单分支**

基本语法

~~~bash
if [ 条件判断表达式 ];then
	程序
fi

或

if [ 条件判断表达式 ]
then
	程序
fi
~~~



#### **多分支**

基本语法

~~~bash
if [ 条件判断表达式 ]
then
	程序
elif [ 条件判断表达式 ]
then
	程序
else
	程序
fi
~~~



例

~~~bash
// 输入一个数字，如果是 1，则输出 banzhang zhen shuai，如果是 2，则输出 cls zhen mei，如果是其它，什么也不输出

touch if.sh
vim if.sh

#!/bin/bash

if [ $1 -eq 1 ]
then
	echo "banzhang zhen shuai"
elif [ $1 -eq 2 ]
then
	echo "cls zhenmei"
fi

bash if.sh 1  //banzhang zhen shuai
~~~



### case 语句

- `case` 行尾必须为单词`in`，每一个模式匹配必须以右括号 `)` 结束
- 双分号`;;`表示命令序列结束，相当于 `java` 中的 `break`
- 最后的`*)`表示默认模式，相当于 `java` 中的 `default`



基本语法

~~~bash
case $变量名 in
"值 1")
	如果变量的值等于值1，则执行程序1
;;
"值 2")
	如果变量的值等于值2，则执行程序2
;;
	...
*)
	如果变量的值不是以上的值，则执行此程序
;;
esac
~~~



例 

输入一个数字，如果是 1，则输出 `banzhang`，如果是 2，则输出 `cls`，如果是其它，输出 `renyao`

~~~bash
touch case.sh
vim case.sh

#!/bin/bash

case $1 in
"1")
	echo "banzhang"
;;
"2")
	echo "cls"
;;
*)
	echo "renyao"
;;
esac

bash case.sh 1  // banzhang
~~~



### for 循环





基本语法1

~~~bash
for (( 初始值;循环控制条件;变量变化 ))
do
	程序
done
~~~

例

​	从1加到100

~~~bash
touch for1.sh
vim for1.sh

#!/bin/bash

sum=0

for (( i=0;[ i<=100;i++ ] ))
do
	sum=$[ $sum+$i ]
done

echo $sum
bash for1.sh  // 5050
~~~



基本语法2

~~~bash
for 变量 in 值 1 值 2 值 3…
do
	程序
done
~~~

例

​	打印所有输入参数

~~~bash
touch for2.sh
vim for2.sh

#!/bin/bash
#打印数字
for i in cls mly wls
do
	echo "ban zhang love $i"
done

bash for2.sh
ban zhang love cls
ban zhang love mly
ban zhang love wls
~~~



比较`$*`和`$@`区别

`$*`和`$@`都表示传递给函数或脚本的所有参数，不被双引号“”包含时，都以`$1 $2 …$n` 的形式输出所有参数

~~~bash
touch for3.sh
vim for3.sh

#!/bin/bash
echo '=============$*============='
for i in $*
do
	echo "ban zhang love $i"
done
echo '=============$@============='

for j in $@
do
	echo "ban zhang love $j"
done
bash for3.sh cls mly wls

=============$*=============
banzhang love cls
banzhang love mly
banzhang love wls
=============$@=============
banzhang love cls
banzhang love mly
banzhang love wls
~~~



当它们被双引号`“”`包含时

​	`$*`会将所有的参数作为一个整体，以“`$1 $2 …$n`”的形式输 出所有参数；

​	`$@`会将各个参数分开，以`“$1” “$2”…“$n”`的形式输出所有参数

~~~bash
vim for4.sh

#!/bin/bash
echo '=============$*============='
for i in "$*"
#$*中的所有参数看成是一个整体，所以这个 for 循环只会循环一次
do
	echo "ban zhang love $i"
done
echo '=============$@============='

for j in "$@"
#$@中的每个参数都看成是独立的，所以“$@”中有几个参数，就会循环几次
do
	echo "ban zhang love $j"
done

bash for4.sh cls mly wls

=============$*=============
banzhang love cls mly wls
=============$@=============
banzhang love cls
banzhang love mly
banzhang love wls
~~~



### while 循环

基本语法

~~~bash
while [ 条件判断式 ]
do
	程序
done
~~~

例

​	从1加到100

~~~bash
touch while.sh
vim while.sh

#!/bin/bash
sum=0
i=1

while [ $i -le 100 ]
do
	sum=$[$sum+$i]
	i=$[$i+1]
done

echo $sum
bash while.sh
5050
~~~



## read 读取控制台输入

基本语法

~~~
read  (选项)  (参数)
~~~

选项：

​	**`-p`：**指定读取值时的提示符

​	**`-t`：**指定读取值时等待的事件（秒）如果 `-t` 不加则表示一直等待

参数：

​	**变量：**指定读取值的变量名

例

​	提示 7 秒内，读取控制台输入的名称

~~~bash
touch read.sh
vim read.sh

#!/bin/bash
read -t 7 -p "Enter your name in 7 seconds :" NN
echo $NN

bash read.sh
Enter your name in 7 seconds : zhang
zhang
~~~



## 函数



### 系统函数



#### **basename**

基本语法

~~~bash
basename  [string / pathname]  [suffix]		
~~~

功能描述：`basename` 命令会删掉所有的前 缀包括最后一个（‘`/`’）字符，然后将字符串显示出来

`basename` 可以理解为取路径里的文件名称

`suffix` 为后缀，如果 `suffix` 被指定了，`basename` 会将 `pathname` 或 `string` 中的 `suffix` 去掉

~~~bash
截取该/home/zhang/banzhang.txt 路径的文件名称

basename /home/zhang/banzhang.txt
banzhang.txt
basename /home/zhang/banzhang.txt .txt
banzhang
~~~



#### **dirname**

基本语法

~~~bash
dirname  文件绝对路径 
~~~

功能描述：从给定的包含绝对路径的文件名中去除文件名 （非目录的部分），然后返回剩下的路径（目录的部分）

`dirname` 可以理解为取文件路径的绝对路径名称

~~~bash
获取 banzhang.txt 文件的路径。

dirname /home/zhang/banzhang.txt
/home/zhang
~~~



### 自定义函数

- 必须在调用函数地方之前，先声明函数，`shell` 脚本是逐行运行。不会像其它语言一 样先编译
- 函数返回值，只能通过$?系统变量获得，可以显示加：`return` 返回，如果不加，将 以最后一条命令运行结果，作为返回值。`return` 后跟数值 n(0-255)



基本语法

~~~bash
[  function ]  funname[()]

{
		Action;
		[return int;]
}
~~~

~~~bash
计算两个输入参数的和

touch fun.sh
vim fun.sh

#!/bin/bash
function sum()
{
s=0
s=$[$1+$2]
echo "$s"
}
read -p "Please input the number1: " n1;
read -p "Please input the number2: " n2;
sum $n1 $n2;

bash /fun.sh
Please input the number1: 2
Please input the number2: 5
7
~~~



## 正则表达式

正则表达式使用单个字符串来描述、匹配一系列符合某个语法规则的字符串。

在很多文 本编辑器里，正则表达式通常被用来检索、替换那些符合某个模式的文本。

在 `Linux` 中，`grep`， `sed`，`awk` 等文本处理工具都支持通过正则表达式进行模式匹配



### **常规匹配**

一串不包含特殊字符的正则表达式匹配它自己

~~~bash
cat  /etc/passwd | grep zhang
~~~

会匹配所有包含 zhang的行



### **常用特殊字符**

**`^`：**匹配一行的开头

~~~bash
cat  /etc/passwd | grep ^a
~~~

会匹配所有 a 开头的行



**`$`：**匹配一行的结束

~~~bash
cat /etc/passwd | grep t$
~~~

会匹配出所有以 `t` 结尾的行



**`.`：**匹配一个任意字符

~~~bash
cat /etc/passwd | grep r..t
~~~

会匹配包含 `rabt`,`rbbt`,`rxdt`,`root` 等的所有行



`*`：不单独使用，他和上一个字符连用，表示匹配上一个字符 0 次或多次，

~~~bash
cat /etc/passwd | grep ro*t 
~~~

会匹配 rt, rot, root, rooot, roooot 等所有行

**`\`：**表示转义，并不会单独使用

~~~bash
cat /etc/passwd | grep ‘a\$b‘
~~~

就会匹配所有包含 `a$b` 的行。注意需要使用单引号将表达式引起来。



**字符区间 [ ]：**`[ ]` 表示匹配某个范围内的一个字符

`[6,8]`------匹配 6 或者 8 

`[0-9]`------匹配一个 0-9 的数字 

`[0-9]*`------匹配任意长度的数字字符串 

`[a-z]`------匹配一个 a-z 之间的字符 

`[a-z]*` ------匹配任意长度的字母字符串 

`[a-c, e-f]`-匹配 a-c 或者 e-f 之间的任意字符

~~~bash
cat /etc/passwd | grep r[a,b,c]*t
~~~

会匹配 rt,rat, rbt, rabt, rbact,rabccbaaacbt 等等所有行



## 文本处理工具



### **cut**

`cut` 的工作就是“剪”，具体的说就是在文件中负责剪切数据用的。

`cut` 命令从文件的每 一行剪切字节、字符和字段并将这些字节、字符和字段输出

基本用法

~~~bash
cut  [选项参数]  filename
~~~

​	说明：默认分隔符时制表符

选项参数说明

| 选项参数 | 功能                                           |
| -------- | ---------------------------------------------- |
| -f       | 列号，提取第几列                               |
| -d       | 分隔符，按照指定分隔符分割列，默认是制表符  \t |
| -c       | 按字符进行切割后，加 n 表示取第几列  如 -c 1   |

~~~bash
（1）数据准备
[zhang@hadoop101 shells]$ touch cut.txt
[zhang@hadoop101 shells]$ vim cut.txt
dong shen
guan zhen
wo wo
lai lai
le le

（2）切割 cut.txt 第一列
[zhang@hadoop101 shells]$ cut -d " " -f 1 cut.txt
dong
guan
wo
lai
le 

（3）切割 cut.txt 第二、三列
[zhang@hadoop101 shells]$ cut -d " " -f 2,3 cut.txt
shen
zhen
wo
lai
le
（4）在 cut.txt 文件中切割出 guan
[zhang@hadoop101 shells]$ cat cut.txt |grep guan | cut -d " " -f 1
guan

（5）选取系统 PATH 变量值，第 2 个“：”开始后的所有路径：
[zhang@hadoop101 shells]$ echo $PATH
/usr/local/bin:/usr/bin:/usr/local/sbin:/usr/sbin:/home/zhang/.local/bin:/
home/zhang/bin
[zhang@hadoop101 shells]$ echo $PATH | cut -d ":" -f 3-
/usr/local/sbin:/usr/sbin:/home/zhang/.local/bin:/home/zhang/bin 

（6）切割 ifconfig 后打印的 IP 地址
[zhang@hadoop101 shells]$ ifconfig ens33 | grep netmask | cut -d " " -f 10
192.168.111.101
~~~



### **awk**

一个强大的文本分析工具，把文件逐行的读入，以空格为默认分隔符将每行切片，切开 的部分再进行分析处理。

基本用法 

~~~bash
awk  [选项参数]  ‘/pattern1/{action1}  /pattern2/{action2}...’  filename 
~~~



​	`pattern`：表示 `awk` 在数据中查找的内容，就是匹配模式 

​	`action`：在找到匹配内容时所执行的一系列命令

选项参数说明

| 选项参数 | 功能                 |
| -------- | -------------------- |
| -F       | 指定输入文件分隔符   |
| -v       | 赋值一个用户定义变量 |

~~~bash
（1）数据准备
[zhang@hadoop101 shells]$ sudo cp /etc/passwd ./
passwd 数据的含义
用户名:密码(加密过后的):用户 id:组 id:注释:用户家目录:shell 解析器

（2）搜索 passwd 文件以 root 关键字开头的所有行，并输出该行的第 7 列。
[zhang@hadoop101 shells]$ awk -F : '/^root/{print $7}' passwd
/bin/bash

（3）搜索 passwd 文件以 root 关键字开头的所有行，并输出该行的第 1 列和第 7 列，
中间以“，”号分割。
[zhang@hadoop101 shells]$ awk -F : '/^root/{print $1","$7}' passwd
root,/bin/bash
注意：只有匹配了 pattern 的行才会执行 action。

（4）只显示/etc/passwd 的第一列和第七列，以逗号分割，且在所有行前面添加列名 user，
shell 在最后一行添加"dahaige，/bin/zuishuai"。
[zhang@hadoop101 shells]$ awk -F : 'BEGIN{print "user, shell"} {print $1","$7}
END{print "dahaige,/bin/zuishuai"}' passwd
user, shell
root,/bin/bash
bin,/sbin/nologin 。。。
zhang,/bin/bash
dahaige,/bin/zuishuai
注意：BEGIN 在所有数据读取行之前执行；END 在所有数据执行之后执

（5）将 passwd 文件中的用户 id 增加数值 1 并输出
[zhang@hadoop101 shells]$ awk -v i=1 -F : '{print $3+i}' passwd
1
2
3
4
~~~



**awk 的内置变量** 

| 变量     | 说明                                   |
| -------- | -------------------------------------- |
| FILENAME | 文件名                                 |
| NR       | 已读的记录号（行号）                   |
| NF       | 浏览记录的域的个数（切割后，列的个数） |

~~~bash
1）统计 passwd 文件名，每行的行号，每行的列数 
[zhang@hadoop101 shells]$ awk -F : '{print "filename:" FILENAME ",linenum:" NR ",col:"NF}' passwd filename:passwd,linenum:1,col:7 
filename:passwd,linenum:2,col:7 
filename:passwd,linenum:3,col:7 
... 

（2）查询 ifconfig 命令输出结果中的空行所在的行号 
[zhang@hadoop101 shells]$ ifconfig | awk '/^$/{print NR}' 
9 
18 
26

（3）切割 IP 
[zhang@hadoop101 shells]$ ifconfig ens33 | awk '/netmask/ {print $2}' 
192.168.6.101
~~~























