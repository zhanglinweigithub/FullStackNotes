# Go

官网：https://golang.org/#

Go中文网：https://studygolang.com/pkgdoc

dordon 金华鼠

![image-20230422130547461](D:\FullStackNotes\docs\guide\Go\img\image-20230422130547461.png)

## 一、概述

### 简介

### 搭建环境

SDK下载：https://golang.google.cn/dl/。

下载完后傻瓜式安装

### 验证是否安装成功

进入Go安装目录下的bin文件夹 --> 打开 cmd --> 输入 go version，如下证明安装成功

![image-20230422133330495](D:\FullStackNotes\docs\guide\Go\img\image-20230422133330495.png)

### 配置环境变量

右击我的电脑 ---> 属性 ---> 高级系统设置 --- > 环境变量，添加如下内容

![image-20230422141010657](D:\FullStackNotes\docs\guide\Go\img\image-20230422141010657.png)

![image-20230422140758272](D:\FullStackNotes\docs\guide\Go\img\image-20230422140758272.png)

PATH下

![image-20230422133758491](D:\FullStackNotes\docs\guide\Go\img\image-20230422133758491.png)

![image-20230422134023106](D:\FullStackNotes\docs\guide\Go\img\image-20230422134023106.png)

GOPATH表示GO项目的工作目录，即你存放GO项目的目录

### 验证环境变量

重新打开 cmd 窗口---> 输入 go version，输出如下说明成功

![image-20230422134252050](D:\FullStackNotes\docs\guide\Go\img\image-20230422134252050.png)

### 目录层级

![image-20230422134827244](D:\FullStackNotes\docs\guide\Go\img\image-20230422134827244.png)

### helloworld

在main下新建 hello.go 文件，内容如下

~~~go
package main  // 把 test.go 归属到main
import "fmt"  // 引入一个包
func main() {
	// 输出hello
	fmt.Println("hello")
}
~~~

在 go 中，每个文件都必须属于一个包

go 文件的后缀是 .go 

- package main： 表示 hello.go 文件所在包是 main

- import "fmt"：表示引入一个包，引入该包后，就可以使用该包的函数
- func main()：
  - func 是关键字，表示一个函数
  - main 是函数名，是一个主函数，即我们程序的入口
- fmt.Println("hello")：调用 fmt 包的 Println 函数，输出 hello

通过 go build 对 go 文件进行编译，生成 .exe 文件

![image-20230422141150359](D:\FullStackNotes\docs\guide\Go\img\image-20230422141150359.png)

也可以使用 go run 命令

![image-20230422141226852](D:\FullStackNotes\docs\guide\Go\img\image-20230422141226852.png)

### GO执行流程

go build

![image-20230422141436969](D:\FullStackNotes\docs\guide\Go\img\image-20230422141436969.png)

go run

![image-20230422141451875](D:\FullStackNotes\docs\guide\Go\img\image-20230422141451875.png)

**区别：**

- 如果我们先 go build 编译生成了 .exe 可执行文件，那么我们可以将该可执行文件拷贝到没有 go 开发环境的机器上，仍然可以运行
- 如果直接 go run ，那么在没有 go 开发环境的机器上，无法运行
- 在编译时，编译器会将程序运行依赖库的库文件包含在可执行文件中，所以，可执行文件变大了很多

![image-20230422143623318](D:\FullStackNotes\docs\guide\Go\img\image-20230422143623318.png)

**注意事项：**

- 有了 go 源文件，通过编译器将其编译成机器可以识别的二进制码文件

- 可以指定生成的可执行文件名，在 window 下必须以 .exe 结尾

- ~~~go
  go build -o myhello.exe hello.go
  ~~~

- 如果程序没有错误，则没有任何提示，会在当前目录下生成 .exe 可执行文件

- 如果程序有错误，编译时，会在错误的那一行报错

### GO程序开发注意事项

- Go源文件以 .go 结尾
- Go应用程序的执行入口是 main() 方法
- Go语言严格区分大小写
- Go语句后不需要分号（Go语言会在每行后自动加分号）
- Go编译器是一行一行进行编译的，因此一行只写一条语句，不要把多条语句写在同一行，否则报错
- Go语言定义的变量或import的包如果没有用到，代码不能编译通过
- 大括号都是成对出现的，缺一不可

### GO语言的常用转义字符

`\t \n \\ \" \t`

`\t` 一个制表位

`\n` 换行

`\\` 一个\

`\"` 一个 "

`\r` 一个回车（会从当前行的最前面开始输出，覆盖掉以前的内容）

### GO语言代码风格

正确

~~~go
package main  // 把 test.go 归属到main
import "fmt"  // 引入一个包
func main() {
	// 输出hello
	fmt.Println("hello")
}
~~~

错误

~~~go
package main  // 把 test.go 归属到main
import "fmt"  // 引入一个包
func main() 
{
	// 输出hello
	fmt.Println("hello")
}
~~~



## 二、语法

### 注释

GO有注释有两种

- 行注释
- 块注释（多行）

~~~go
package main  // 把 test.go 归属到main
import "fmt"  // 引入一个包
func main() {
	// 输出hello
	fmt.Println("hello")
}
~~~

~~~go
package main 
import "fmt" 
/*
func main() {
	fmt.Println("hello")
}
*/
~~~

块注释不允许嵌套块注释

### 变量

变量是程序的基本组成单位

变量相当于内存中一个数据存储空间得表示

变量使用得三种方式

- 指定变量类型，声明后若不赋值，使用默认值
- 根据值自行判定为变量类型（类型推导）
- 省略 var，注意： = 左侧得变量不应该是已经声明过得
- 支持多变量声明

~~~go
package main  
import "fmt"  
func main() {
	var i int
	fmt.Printf("i=", i)
    
    var num = 10.11
    fmt.Printf("num=", num)
    
    // 等价于 var name string	name = "tom"
    name := "tom"
    
    var n1,n2,n3 int
    fmt.Printf("n1=", n1, "n2=", n2, "n3=", n3)
    
    var c1, user, c3 = 100, "tom", 777
    
    b1, b2, b3 := 100, "lucy", 999
    
}

package main  
import "fmt"  
func main() {
	// 定义变量 i 类型为 int
	var i int
	// 给 i 赋值
	i = 10
	// 使用变量 i
	fmt.Printf("i=", i)
}
~~~

**全局变量**

在函数外声明的变量就是全局变量

~~~go
package main  
import "fmt"  

// 定义全局变量
var n1 = 100
var n2 = 200
var n3 = "zlw"

// 第二种方式
var (
	n4 = 90
	n5 = "mary"
)
func main() {
	fmt.Printf(n1, n2, n3, n4, n5)
}
~~~

### 数据类型

| 类型       | 描述                                                         |
| ---------- | ------------------------------------------------------------ |
| 数字类型   | 整型 int 和浮点型 float32、float64，Go 语言支持整型和浮点型数字，并且支持复数，其中位的运算采用补码。 |
| 字符串类型 | 字符串就是一串固定长度的字符连接起来的字符序列。Go 的字符串是由单个字节连接起来的。Go 语言的字符串的字节使用 UTF-8 编码标识 Unicode 文本。 |
| 布尔型     | 布尔型的值只可以是常量 true 或者 false                       |
| 派生类型   | 包括：指针类型（Pointer）、数组类型、结构化类型(struct)、Channel 类型、函数类型、切片类型、接口类型（interface）、Map 类型 |

#### 数字类型

超出范围报错

| 类型    | 描述                                                         | 占用空间                     | 表示范围                       |
| ------- | ------------------------------------------------------------ | ---------------------------- | ------------------------------ |
| uintptr | 无符号整型，用于存放一个指针                                 |                              |                                |
| uint    | 32 或 64 位                                                  | 32位系统4字节，64位系统8字节 | 0 ~ 2^32-1，0 ~ 2^64-1         |
| uint8   | 无符号 8 位整型 (0 到 255)                                   | 1字节                        | 0 ~ 255                        |
| uint16  | 无符号 16 位整型 (0 到 65535)                                | 2字节                        | 0 ~ 2^16-1                     |
| uint32  | 无符号 32 位整型 (0 到 4294967295)                           | 4字节                        | 0 ~ 2^32-1                     |
| uint64  | 无符号 64 位整型 (0 到 18446744073709551615)                 | 8字节                        | 0 ~ 2^64-1                     |
| int     | 与 uint 一样大小                                             | 32位系统4字节，64位系统8字节 | -2^31 ~ 2^31-1，-2^63 ~ 2^63-1 |
| int8    | 有符号 8 位整型 (-128 到 127)                                | 1字节                        | -128 ~ 127                     |
| int16   | 有符号 16 位整型 (-32768 到 32767)                           | 2字节                        | -2^15 ~ 2^15-1                 |
| int32   | 有符号 32 位整型 (-2147483648 到 2147483647)                 | 4字节                        | -2^31 ~ 2^31-1                 |
| int64   | 有符号 64 位整型 (-9223372036854775808 到 9223372036854775807) | 8字节                        | -2^63 ~ 2^63-1                 |
| byte    | 类似 uint8，无符号，当要存储字符时先用byte，go的字符串是由字节组成的 | 1字节                        | 0 ~ 255                        |
| rune    | 类似 int32，有符号，表示一个 Unicode 码                      | 4字节                        | -2^31 ~ 2^31-1                 |

#### 字符型

当要存储字符时选用byte，go的字符串是由字节组成的

|      |                    |       |         |
| ---- | ------------------ | ----- | ------- |
| byte | 类似 uint8，无符号 | 1字节 | 0 ~ 255 |

~~~go
var c1 byte = 'a'
var c2 byte = '0'
fmt.Println("c1=", c1)	// 97
fmt.Println("c2=", c2)	// 48
~~~

- 直接输出byte，相当于输出对应的字符的码值

- 如果我们希望输出对应字符，需要格式化输出

- ~~~go
  var c1 byte = 'a'
  var c2 byte = '0'
  fmt.Println("c1=%c", c1)	// a
  fmt.Println("c2=%c", c2)	// 0
  ~~~

- byte 不能存汉字，会报错

- ~~~go
  var c3 = '北'
  fmt.Println("c3=", c3)	// overflow 溢出
  
  var c4 int = '北'
  fmt.Println("c4=%c, 码值=%d", c4,c4)	// 北 21271
  ~~~

- 如果我们保存的字符在 ASCII 表，可直接使用 byte

- 如果我们保存的字符对应码值大于 255，这时考虑用 int 

- 如果我们需要按照字符的方式输出，这时需要格式化输出

#### 布尔型

|      |                          |       |            |
| ---- | ------------------------ | ----- | ---------- |
| bool | 适合逻辑运算，true false | 1字节 | true false |

- 不可以 0 或非 0 的整数替代 false或true

#### 字符串类型

- GO语言字符串的字节使用 UTF-8 编码表示 Unicode 文本，不会有中文乱码问题
- 字符串一旦赋值，就不能修改，在Go中字符串是不可变的
- 字符串的表示形式
  - 双引号，会识别转义字符
  - 反引号，以字符串的原生形式输出，可防止攻击、输出源代码等效果



#### 浮点型

| 类型       | 描述                   | 占用空间 | 表示范围               |
| ---------- | ---------------------- | -------- | ---------------------- |
| float32    | 单精度浮点型数，有符号 | 4字节    | -3.403E38 ~ 3.403E38   |
| float64    | 双精度浮点型数，有符号 | 8字节    | -1.798E308 ~ 1.798E308 |
| complex64  | 32 位实数和虚数        |          |                        |
| complex128 | 64 位实数和虚数        |          |                        |

浮点数 = 符号位 + 指数位 + 尾数位

尾数部分可能丢失，造成精度损失

~~~go
var num1 float32 = -123.0000901
var num2 float64 = -123.0000901
fmt.Printf(num1, num2) // 输出 -123.00009   -123.0000901
~~~

- float64 比 float32 更准确
- 若要表示准确数，使用 float64

### 整型的使用细节

go 的整型默认声明为int

~~~go
var n1 = 100
fmt.Printf("n1 的数据类型 %T", n1) // 输出 int
~~~

在程序中查看某个变量的字节大小和数据类型（使用较多）

~~~go
import (
	"fmt"
    "unsafe"
)
var n2 int64 = 10
fmt.Printf("n2 的数据类型 %T, n2占用的字节数 %d", n2, unsafe.Sizeof(n2)) // 输出 int64 8
~~~

### 浮点型使用细节

go 的浮点型默认位 float64

~~~go
var num1 = 1.1
fmt.Printf("num1 的数据类型 %T", num1) // 输出 float64
~~~

浮点型有两种表示形式

~~~go
// 十进制数形式  5.12   .512（必须有小数点）
num2 := 5.12
num3 := .123  // 等价于 0.123

// 科学计数法形式
num4 := 5.1234e2  // 等价于 5.1234 * 10 的2次方
num5 := 5.1234E2  // 等价于 5.1234 * 10 的2次方
num6 := 5.1234E-2  // 等价于 5.1234 / 10 的2次方
~~~

### 字符类型使用细节

GO语言的字符使用 UTF-8编码

字符类型，可以进行运算，相当于一个整数，因为都有对应的 Unicode 码

~~~go
var a1 = 10 + 'a'  // 10 + 97 = 107
fmt.Printf("a1", a1) // 输出 107
~~~

英文字母1个字节，汉字3个字节

直接给某个变量赋一个数字，然后按格式化输出时 %c 会输出该数字对应的 Unicode 字符

~~~go
var c5 int = 22269
fmt.Printf("c5 %c", c5) // 输出 国
~~~

字符型存储到计算机中，需要将字符对应的码值找出来

- 存储： 字符 ---> 找到对应码值 ---> 转为二进制 ---> 存储
- 读取: 拿到对应二进制 ---> 转为对应码值 ---> 找到对应字符 ---> 读取

utf8码值表：http://www.mytju.com/classcode/tools/encode_utf8.asp

### string使用细节

加号拼接时， `+`要留在上面一行，否则报错

### 基本数据类型默认值

默认值又叫零值

| 数据类型 | 默认值 |
| -------- | ------ |
| 整型     | 0      |
| 浮点型   | 0      |
| 字符串   | ""     |
| 布尔类型 | false  |

### 数据类型转换

GO在不同类型的变量之间赋值时，需要显示转换。也就是说Go中数据类型不能自动转换

语法：T(v)  将值v转换为类型T

- T：就是数据类型，如int32...
- v：就是需要转换的变量

~~~go
var i int32 = 100
var n1 float32 = float32(i)
var n2 int8 = int8(i)
var n3 int64 = int64(i) // 低精度 ==》 高精度 也需要转换
fmt.Printf("%v, %v, %v, %v",i, n1, n2, n3) // 100 100 100
~~~

**细节**

- GO，数据类型转换可以从 小=> 大，也可以从 大=>小
- 被转换的是变量存储的数据，变量本身的数据类型没有变化
- int64 => int8 不会报错，知识转换结果按溢出处理，和期望结果不一样

### 基本数据类型和string转换

两种方式

- fmt.Sprintf("%参数", 表达式)
- strconv 包的函数

**fmt.Sprintf("%参数", 表达式)**

~~~go
var num1 int = 99
var num2 float64 = 23.456
var b bool = true
var myChar byte = 'h'
var str string  // 空的str

str = fmt.Sprintf("%d", num1)
fmt.Printf("str Type %T str=%v", str, str)  // string 99

str = fmt.Sprintf("%f", num2)
fmt.Printf("str Type %T str=%v", str, str)  // string 23.456000

str = fmt.Sprintf("%t", b)
fmt.Printf("str Type %T str=%v", str, str)  // string true

str = fmt.Sprintf("%c", b)
fmt.Printf("str Type %T str=%v", str, str)  // string h
~~~

**strconv** 

~~~go
import (
	"fmt"
    "strconv"
)
var num3 int = 99
var num4 float64 = 23.456
var b2 bool = true

str = strconv.FormatInt(int64(num3), 10)
fmt.Printf("str Type %T str=%v", str, str)  // string 99

// 'f'：格式  10：保留10位小数   64：表示这个小数是float64
str = strconv.FormatFloat(num4, 'f', 10, 64)
fmt.Printf("str Type %T str=%v", str, str)  // string 23.4560000000

str = strconv.FormatBool(b2)
fmt.Printf("str Type %T str=%v", str, str)  // string true
~~~

### string转基本数据类型

使用 strconv 包

~~~go
import (
	"fmt"
    "strconv"
)

var str string = "true"
var b bool

// strconv.ParseBool() 会返回两个值 bool, error
// 因为我只想获取 bool, 所以 使用 _ 忽略另一个值
b, _ = strconv.ParseBool(str)
fmt.Printf("b Type %T b=%v", b, b) // 输出 bool true

var str2 string = "1234590"
var n1 int64
n1, _ = strconv.ParseInt(str2, 10, 64)
fmt.Printf("n1 Type %T n1=%v", n1, n1) // 输出 int64 1234590

var str3 string = "123.456"
var f1 float64
f1, _ = strconv.ParseFloat(str3, 64)
fmt.Printf("f1 Type %T f1=%v", n1, n1) // 输出 float64 123.456
~~~

- 在进行 string 与基本数据类型时，要确保 string 能转换成有效的数据，否则 GO 会直接转换成转换后类型的默认值
- 如： "123" => 123      "hello" => 0

## 指针

基本数据类型，变量存的就是值，也叫值类型

获取变量的地址，用 & 如： var num int 获取num的地址： &num

指针类型，指针变量存的是一个地址，这个地址指向的空间存的才是值 。如： var ptr *int = &num

获取指针类型所指向的值，使用 `*`。比如：var ptr *int。使用 *ptr获取ptr指向的值

~~~go
var num int = 10
fmt.Printf("num的地址=%v", &num)	   // 0xc042052038
// ptr 是一个指针变量 
// ptr 的类型是 *int
// ptr 本身的值是 &num 
var ptr *int = &num
fmt.Printf("ptr=%v", prt) 			// 0xc042052038
fmt.Printf("ptr的地址=%v", &prt)	  // 0xc042064020
fmt.Printf("ptr指向的值=%v", *prt)	 // 10
~~~

![image-20230422182313455](D:\FullStackNotes\docs\guide\Go\img\image-20230422182313455.png)

**细节：**

- 每个值类型，都有对应的指针类型，形式为 `*数据类型`，比如： int 对应的指针类型为 `*int`，float32对应的指针类型就是 `*float`，依此类推
- 值类型包括：
  - 基本数据类型： int，float，bool，string
  - 数组
  - 结构体struct

## 值类型和引用类型

值类型：基本数据类型、数组、结构体struct

引用类型：指针、slice切片、map、chan管道、interface等

**区别：**

值类型：变量直接存储值，内存通常分配在栈中

引用类型：变量存储地址，这个地址对应的空间才真正存储值，内存通常分配在堆中，当没有任何变量引用这个地址时，该地址对应的数据空间就成为一个垃圾，由GC来回收

## 标识符命名规范

GO对各种变量、方法、函数等命名时使用的字符序列称为标识符

通俗的讲：凡是自己起名字的地方都叫标识符

标识符命名规则：

- 由字母、数字、_ 组成，不能以数字开头
- 严格区分大小写
- 不能有空格
- 不能以系统保留关键字作为标识符
- _ 下划线不能单独使用

下划线本身在GO中是一个特殊的标识符，称为空标识符。可以代表任何其它的标识符，但是他对应的值会被忽略（比如：忽略某个返回值）。座椅

**注意事项：**

包名：保持package的名字和目录保持一致

变量名、函数名、常量名：采用驼峰法

go特性：若 变量名、函数名、常量名 首字母大写，则可以被其它包访问，小写则只能在本包使用

~~~go
package model

var heroName string = "张林伟"
var Age int = 24

// = = = = = = = = = = = = = = = 分割线 = = = = = = = = = = = =

package main
import (
	"fmt"
    "go_code/model/model"
)

func main() {
    fmt.Println(model.heroName)  // 报错，因为heroName首字母小写，不可在其它包使用
    fmt.Println(model.Age)  // 没有问题，正常使用
}

~~~

