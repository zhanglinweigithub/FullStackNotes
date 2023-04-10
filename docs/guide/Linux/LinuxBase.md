---
title: Linux基础
---
# 目录

[[toc]]

## **隐藏文件、文件夹**

在Linux中以 `.` 开头的，均是隐藏的。 默认不显示出来，需要 `-a` 选项才可查看到

## **HOME目录**

每一个用户在`Linux`系统中都有自己的专属工作目录，称之为`HOME`目录。 

- 普通用户的`HOME`目录，默认在：`/home/用户名` 
- `root`用户的`HOME`目录，在：`/root` 

FinalShell登陆终端后，默认的工作目录就是用户的`HOME`目录



## **相对路径、绝对路径**

- 相对路径， 非  `/`  开头的称之为相对路径 

相对路径表示以当前目录作为起点，去描述路径，如`test/a.txt`，表示当前 工作目录内的`test`文件夹内的`a.txt`文件 

- 绝对路径， 以 `/`开头的称之为绝对路径 

绝对路径从根开始描述路径  

## **特殊路径符**

- **.** ，表示当前，比如`./a.txt`，表示当前文件夹内的`a.txt`文件 
- **. .** ，表示上级目录，比如 `../`表示上级目录， `../ ../`表示上级的上级目录 
- **~** ，表示用户的`HOME`目录，比如`cd ~`，即可切回用户`HOME`目录  

## 环境变量


临时设置： **export 变量名=变量值**

永久设置：

针对用户，设置用户HOME目录内：**.bashrc文件**

针对全局，设置**/etc/profile**


## PATH变量


记录了执行程序的搜索路径 

可以将自定义路径加入PATH内，实现自定义命令在任意地方均可执行的效果 


## $ 符号 取出指定的环境变量的值


语法：**$变量名** 

示例： echo $PATH，输出PATH环境变量的值 

​           echo ${PATH}ABC，输出PATH环境变量的值以及ABC 

如果变量名和其它内容混淆在一起，可以使用${} 


## 压缩解压缩

Linux系统中常用压缩格式有：**.tar、.gzip、.zip **

.tar，常见为**.tar**，称之为tarball，归档文件，既简单的将文件组装到一个.tar的文件内，并没有太多文件体积的减少，仅仅是简单的封装

.gz，也常见为**.tar.gz**，gzip格式压缩文件，即使用gzip压缩算法将文件压缩到一个文件内，可以极大的减少压缩后的体积

针对以上两种格式，使用**tar**命令均可以进行压缩和解压缩的操作

zip格式则需要使用**zip**命令进行压缩和解压缩的操作

### 压缩

#### **.tar、.gzip的压缩**

tar [-c -v -x -f -z -C] 要压缩的文件1，要压缩的文件2……要压缩的文件N

选项：

**-c：**创建压缩文件，用于压缩模式

**-v：**显示压缩、解压过程，用于查看进度

**-x：**解压模式

**-f：**要创建的文件，或要解压的文件，-f必须在所有选项中位置处于最后一个

**-z：**gzip模式，不使用-z就是普通的tarball格式

**-C：**选择解压的目的地，用于解压模式

**tar的常用组合（压缩）**

tar -cvf test.tar 1.txt 2.txt 3.txt	将1.txt 2.txt 3.txt压缩到test.tar文件内

tar -zcvf test.tar.gz 1.txt 2.txt 3.txt	将1.txt 2.txt 3.txt压缩到test.tar.gz文件内，使用gzip模式

**注意：**-z如果使用，需处于选项位第一个。-f必须在选项位最后一个

#### **.zip的压缩**

**使用zip命令，压缩为.zip文件**

zip [-r] 参数1 参数2 ……参数N

-r：被压缩的包含文件夹时，需要用-r选项（和rm命令的-r效果一致）

例：

zip test.zip a.txt b.txt c.txt	将a.txt b.txt c.txt压缩到test.zip文件内

zip -r test.zip test itheima a.txt	将test itheima两个文件夹和 a.txt文件压缩到test.zip文件内


### 解压缩

#### **.tar、.gzip的解压缩**

tar [-c -v -x -f -z -C] 要解压的文件

选项：

**-c：**创建压缩文件，用于压缩模式

**-v：**显示压缩、解压过程，用于查看进度

**-x：**解压模式

**-f：**要创建的文件，或要解压的文件，-f必须在所有选项中位置处于最后一个

**-z：**gzip模式，不使用-z就是普通的tarball格式

**-C：**选择解压的目的地，用于解压模式

**tar的常用组合（解压缩）**

tar -xvf test.tar	解压test.tar，解压到当前目录

tar -xvf test.tar -C .home.itheima	解压test.tar，解压到指定目录（.home.itheima）

tar -zxvf test.tar.gz -C .home.itheima	解压test.tar.gz，解压到指定目录（.home.itheima）

**注意：**-f必须在最后一位，-z必须在开头，-C必须单独使用和解压所需其他参数分开

#### **.zip的解压缩**

**使用unzip命令，解压.zip的文件**

unzip [-d] 参数

-d：**指定解压去的位置（同tar的-C）**

参数：被解压的zip压缩包文件

例：

unzip test.zip	将test.zip解压到当前目录

unzip test.zip -d .home.itheima	将test.zip解压到指定目录（.home.itheima）
