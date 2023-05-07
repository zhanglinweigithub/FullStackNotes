# GoLang

GoLang的设计理念：一种事情有且仅有一种方法完成

官网：[https://golang.org/#](https://golang.org/#)

Go中文网：[https://studygolang.com/pkgdoc](https://studygolang.com/pkgdoc)

吉祥物：dordon 金华鼠

![image-20230422130547461](D:\FullStackNotes\docs\guide\Go\img\image-20230422130547461.png)

## 一、概述

### 搭建环境

#### 下载SDK

SDK下载地址：[https://golang.google.cn/dl/](https://golang.google.cn/dl/)。

下载完后傻瓜式安装

**验证是否安装成功**

进入Go安装目录下的bin文件夹 ===> 打开 cmd ===> 输入 `go version`，如下证明安装成功

![image-20230422133330495](D:\FullStackNotes\docs\guide\Go\img\image-20230422133330495.png)

#### 配置环境变量

右击我的电脑 ===> 属性 ===> 高级系统设置 ===> 环境变量，添加如下内容

**添加两个变量**

GOPATH表示Go项目的工作目录，即你存放Go项目的目录

![image-20230422141010657](D:\FullStackNotes\docs\guide\Go\img\image-20230422141010657.png)

**添加PATH**

![image-20230422133758491](D:\FullStackNotes\docs\guide\Go\img\image-20230422133758491.png)

**验证环境变量**

在任意目录重新打开 cmd 窗口===> 输入 `go version`，输出如下说明成功

![image-20230422134252050](D:\FullStackNotes\docs\guide\Go\img\image-20230422134252050.png)

### 目录层级

![image-20230422134827244](D:\FullStackNotes\docs\guide\Go\img\image-20230422134827244.png)

### HelloWorld

在 main下新建 `hello.go` 文件，内容如下

~~~go
package main  // 把 hello.go 归属到main
import "fmt"  // 引入一个包，引入该包后，就可以使用该包的函数
func main() {
	// 输出hello
	fmt.Println("hello")
}
~~~

- package main： 表示 `hello.go` 文件所在包是 main
- import "fmt"：表示引入一个包，引入该包后，就可以使用该包的函数
- func main()：
  - func 是关键字，表示一个函数
  - main 是函数名，是一个主函数，即我们程序的入口
- fmt.Println("hello")：调用 fmt 包的 Println 函数，输出 hello

::: tip

在 Go 中，每个文件都必须属于一个包

Go 文件的后缀是 `.go` 

:::

**编译**

~~~go
go build 文件名
~~~

通过 go build  文件名，对 go 文件进行编译，会在当前目录生成 `.exe` 文件

![image-20230422141150359](D:\FullStackNotes\docs\guide\Go\img\image-20230422141150359.png)

也可以使用 go run 命令

~~~go
go run 文件名
~~~

![image-20230422141226852](D:\FullStackNotes\docs\guide\Go\img\image-20230422141226852.png)

::: warning 注意

要在源代码所在目录执行

:::

### Go执行流程

**go build**

![image-20230422141436969](D:\FullStackNotes\docs\guide\Go\img\image-20230422141436969.png)

**go run**

![image-20230422141451875](D:\FullStackNotes\docs\guide\Go\img\image-20230422141451875.png)

**区别：**

- 如果我们先 go build 编译生成了 `.exe` 可执行文件，那么我们可以将该可执行文件拷贝到没有 Go 开发环境的机器上，仍然可以运行
- 如果直接 go run ，那么在没有 Go 开发环境的机器上，无法运行
- 在编译时，编译器会将程序运行依赖库的库文件包含在可执行文件中，所以，可执行文件变大了很多

![image-20230422143623318](D:\FullStackNotes\docs\guide\Go\img\image-20230422143623318.png)

::: tip

有了 Go 源文件，通过编译器将其编译成机器可以识别的二进制码文件

可以指定生成的可执行文件名，在 window 下必须以 `.exe` 结尾

~~~go
go build -o myhello.exe hello.go
~~~

如果程序没有错误，则没有任何提示，会在当前目录下生成 `.exe` 可执行文件

如果程序有错误，编译时，会在错误的那一行报错

:::

### GO程序开发注意事项

- Go源文件以 `.go` 结尾
- Go应用程序的执行入口是 main() 方法
- Go语言严格区分大小写
- Go语句后不需要分号（Go语言会在每行后自动加分号）
- Go编译器是一行一行进行编译的，因此一行只写一条语句，不要把多条语句写在同一行，否则报错
- Go语言定义的变量或 import 的包如果没有用到，代码不能编译通过
- 大括号都是成对出现的，缺一不可

### GO语言的常用转义字符

`\t、\n、\\、\"、\t`

`\t` 一个制表位

`\n` 换行

`\\` 一个\

`\"` 一个 "

`\r` 一个回车（会从当前行的最前面开始输出，覆盖掉以前的内容）

### GO语言代码风格

**正确**

~~~go
package main
import "fmt"
func main() {
	fmt.Println("hello")
}
~~~

**错误**

~~~go
package main
import "fmt"
func main() 
{
	fmt.Println("hello")
}
~~~

::: tip

注意看 `{}` 位置

:::

### Go保留关键字

Go中有25个保留关键字

| break        | default         | func       | interface   | select     |
| ------------ | --------------- | ---------- | ----------- | ---------- |
| **case**     | **defer**       | **go**     | **map**     | **struct** |
| **chan**     | **else**        | **goto**   | **package** | **switch** |
| **const**    | **fallthrough** | **if**     | **range**   | **type**   |
| **continue** | **for**         | **import** | **return**  | **var**    |

### Go预定标识符

Go提供了36个预定标识符，其中包括基础数据类型和系统内嵌函数

| append        | bool           | byte        | cap        | close      | complex     |
| ------------- | -------------- | ----------- | ---------- | ---------- | ----------- |
| **complex64** | **complex128** | **iota**    | **copy**   | **false**  | **float32** |
| **float64**   | **imag**       | **int**     | **int8**   | **int16**  | **int32**   |
| **int64**     | **unit**       | **unit8**   | **unit16** | **unit32** | **unit64**  |
| **len**       | **make**       | **new**     | **nil**    | **panic**  | **print**   |
| **println**   | **real**       | **recover** | **string** | **true**   | **uintprt** |

### 注释

Go有注释有两种

- 行注释: `//`
- 块注释（多行）：`/* */`

~~~go
package main  // 把 test.go 归属到main

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

::: warning 注意

块注释不允许嵌套块注释

:::

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

当要存储字符时选用byte，Go的字符串是由字节组成的

| 类型 | 描述               | 占用空间 | 表示范围 |
| ---- | ------------------ | -------- | -------- |
| byte | 类似 uint8，无符号 | 1字节    | 0 ~ 255  |

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

| 类型 | 描述                     | 占用空间 | 表示范围   |
| ---- | ------------------------ | -------- | ---------- |
| bool | 适合逻辑运算，true false | 1字节    | true false |

- 不可以 0 或非 0 的整数替代 false或true

#### 字符串类型

- Go语言字符串的字节使用 UTF-8 编码表示 Unicode 文本，不会有中文乱码问题
- 字符串一旦赋值，就不能修改，在Go中字符串是不可变的（但可以重新赋值）
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

#### 基本数据类型默认值

默认值又叫零值

| 数据类型 | 默认值 |
| -------- | ------ |
| 整型     | 0      |
| 浮点型   | 0      |
| 字符串   | ""     |
| 布尔类型 | false  |

### 数据类型使用细节

#### 整型的使用细节

Go 的整型默认声明为int

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

#### 浮点型使用细节

Go 的浮点型默认位 float64

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

#### 字符类型使用细节

Go语言的字符使用 UTF-8 编码

字符类型，可以进行运算，相当于一个整数，因为都有对应的 Unicode 码

~~~go
var a1 = 10 + 'a'  // 10 + 97 = 107
fmt.Printf("a1", a1) // 输出 107
~~~

英文字母1个字节，汉字3个字节

直接给某个变量赋一个数字，然后按格式化输出时 `%c` 会输出该数字对应的 Unicode 字符

~~~go
var c5 int = 22269
fmt.Printf("c5 %c", c5) // 输出 国
~~~

字符型存储到计算机中，需要将字符对应的码值找出来

- 存储： 字符 ---> 找到对应码值 ---> 转为二进制 ---> 存储
- 读取: 拿到对应二进制 ---> 转为对应码值 ---> 找到对应字符 ---> 读取

utf8码值表：[http://www.mytju.com/classcode/tools/encode_utf8.asp](http://www.mytju.com/classcode/tools/encode_utf8.asp)

#### string使用细节

加号拼接时， `+`要留在上面一行，否则报错

### 标识符命名规范

Go对各种变量、方法、函数等命名时使用的字符序列称为标识符

通俗的讲：凡是自己起名字的地方都叫标识符

标识符命名规则：

- 由字母、数字、_ 组成，不能以数字开头
- 严格区分大小写
- 不能有空格
- 不能以系统保留关键字作为标识符
- _ 下划线不能单独使用

::: tip

_ 本身在Go中是一个特殊的标识符，称为空标识符。可以代表任何其它的标识符，但是他对应的值会被忽略（比如：忽略某个返回值）。

:::

**注意事项：**

包名：保持 package 的名字和目录保持一致

变量名、函数名、常量名：采用驼峰法

Go特性：若 变量名、函数名、常量名 首字母大写，则可以被其它包访问，小写则只能在本包使用

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

::: tip

Go中，若（变量名、函数名、常量名）首字母大写，则表示公用的，可以在其他包使用

小写，则表示私有的，只能在本包使用

类似 Java 的 public、private

:::

## 二、Go基本语法

### 变量

变量使用的三种方式

- 指定变量类型，声明后若不赋值，使用默认值
- 根据值自行判定为变量类型（类型推导）
- 省略 var，注意： `=` 左侧得变量不应该是已经声明过得
- 支持多变量声明

~~~go
package main  
import "fmt"  
func main() {
	var i int
	fmt.Printf("i=", i) // 0
    
    var m int
    m = 50
	fmt.Printf("m=", m) // 50
    
    var num = 10.11
    fmt.Printf("num=", num) // 10.11 自动推导类型
    
    // 等价于 var name string	name = "tom"
    name := "tom"
    
    var n1,n2,n3 int
    fmt.Printf("n1=", n1, "n2=", n2, "n3=", n3) // 0 0 0 
    
    var c1, user, c3 = 100, "tom", 777 // c1=100, user="rom", c3=777
    
    b1, b2, b3 := 100, "lucy", 999 // b1=100, b2="lucy", b3=999
    
}
~~~

#### 全局变量

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
	fmt.Printf(n1, n2, n3, n4, n5) // 100 200 zlw 90 mary
}
~~~

### 数据类型转换

Go在不同类型的变量之间赋值时，需要显示转换。也就是说Go中数据类型不能自动转换

语法：

~~~go
T(v)  // 将值v转换为类型T
~~~

- T：就是数据类型，如int32 . . .
- v：就是需要转换的变量

~~~go
var i int32 = 100
var n1 float32 = float32(i)
var n2 int8 = int8(i)
var n3 int64 = int64(i) // 低精度 ==》 高精度 也需要转换
fmt.Printf("%v, %v, %v, %v",i, n1, n2, n3) // 100 100 100
~~~

::: warning 注意

- Go，数据类型转换可以从 小 => 大，也可以从 大=>小
- 被转换的是变量存储的数据，变量本身的数据类型没有变化
- int64 => int8 不会报错，只是转换结果按溢出处理，和期望结果不一样

:::

#### 基本数据类型和string转换

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

#### string转基本数据类型

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

::: warning 注意

- 在进行数据类型转换时，要确保能转换成有效的数据，否则 Go 会直接转换成转换后类型的默认值
- 如： "123" => 123      "hello" => 0

:::

### 运算符

::: warning 注意

Go语言明确不支持三元运算符，因为其设计理念为【一种事情有且仅有一种方法完成】

:::

- 算数运算符
- 赋值运算符
- 比较运算符(关系运算符)
- 逻辑运算符
- 位运算符
- 其他运算符
- 运算符优先级

#### 算数运算符

是对数值类型的变量进行运算的。如：加减乘除

| 运算符 | 描述       | 范例         | 结果    |
| ------ | ---------- | ------------ | ------- |
| `+`    | 正号       | +3           | 3       |
| `-`    | 负号       | -3           | -3      |
| `+`    | 加         | 5 + 5        | 10      |
| `-`    | 减         | 5 - 5        | 0       |
| `*`    | 乘         | 5 * 5        | 25      |
| `/`    | 除         | 5 / 5        | 1       |
| `%`    | 取模       | 7 % 5        | 2       |
| `++`   | 自增       | a=2    a++   | a=3     |
| `--`   | 自减       | a=2    a--   | a=1     |
| `+`    | 字符串相加 | "he" + "llo" | "hello" |

两个整数相除，结果舍弃小数保留整数

~~~go
fmt.Println(10 / 4)  // 2
fmt.Println(10 / 4.0)  // 2.5
~~~

取模 `%`公式

~~~
a % b = a - a / b * b
~~~

~~~go
fmt.Println(10 % 3)  	// 1
fmt.Println(-10 % 3)  	// -1
fmt.Println(10 % -3)  	// 1
fmt.Println(-10 % -3)  	// -1
~~~

::: warning 注意

Go中 `++`，`--`运算符

只能独立使用，不能这样使用：`b := a++` 或 `b := a--`或 `i++ > 0`

只能出现在变量的后面，不能写在前面：（`--a`，`++a`）  ===> 错误

:::

#### 比较运算符

比较运算符的结果都是 bool 型的。常用在 if 结构和循环结构

关系运算符组成的表达式，成为关系表达式

| 运算符 | 描述     | 范例   | 结果  |
| ------ | -------- | ------ | ----- |
| `==`   | 相等     | 4 == 3 | false |
| `!=`   | 不等     | 4 != 3 | true  |
| `<`    | 小于     | 4 < 3  | false |
| `>`    | 大于     | 4 > 3  | true  |
| `<=`   | 小于等于 | 4 <= 3 | false |
| `>=`   | 大于等于 | 4 >= 3 | true  |

#### 逻辑运算符

用于连接多个条件，最终结果是一个 bool 值

| 运算符 | 描述                                                         | 实例               |
| :----- | :----------------------------------------------------------- | :----------------- |
| &&     | 逻辑 AND 运算符。 如果两边的操作数都是 True，则条件 True，否则为 False。 | (A && B) 为 False  |
| \|\|   | 逻辑 OR 运算符。 如果两边的操作数有一个 True，则条件 True，否则为 False。 | (A \|\| B) 为 True |
| !      | 逻辑 NOT 运算符。 如果条件为 True，则逻辑 NOT 条件 False，否则为 True。 | !(A && B) 为 True  |

::: warning 注意

&&也叫短路与，如果第一个条件为 false，则第二个条件不会执行，返回 false

||也叫短路或，如果第一个条件为 true，则第二个条件不会执行，返回 true

:::

#### 赋值运算符

将某个运算后的值，赋值给指定的变量

| 运算符 | 描述                                           | 实例                                  |
| :----- | :--------------------------------------------- | :------------------------------------ |
| =      | 简单的赋值运算符，将一个表达式的值赋给一个左值 | C = A + B 将 A + B 表达式结果赋值给 C |
| +=     | 相加后再赋值                                   | C += A 等于 C = C + A                 |
| -=     | 相减后再赋值                                   | C -= A 等于 C = C - A                 |
| *=     | 相乘后再赋值                                   | C *= A 等于 C = C * A                 |
| /=     | 相除后再赋值                                   | C /= A 等于 C = C / A                 |
| %=     | 求余后再赋值                                   | C %= A 等于 C = C % A                 |
| <<=    | 左移后赋值                                     | C <<= 2 等于 C = C << 2               |
| >>=    | 右移后赋值                                     | C >>= 2 等于 C = C >> 2               |
| &=     | 按位与后赋值                                   | C &= 2 等于 C = C & 2                 |
| ^=     | 按位异或后赋值                                 | C ^= 2 等于 C = C ^ 2                 |
| \|=    | 按位或后赋值                                   | C \|= 2 等于 C = C \| 2               |

- 运算顺序从右往左
- 赋值运算符的**左边只能是变量**，右边可以是变量、表达式、常量值、函数
- 符合运算符 a += 3  ===> a = a + 3

#### 位运算符

| 运算符 | 描述                                                         | 实例                                   |
| :----- | :----------------------------------------------------------- | :------------------------------------- |
| &      | 按位与运算符"&"是双目运算符。 其功能是参与运算的两数各对应的二进位相与。 | (A & B) 结果为 12, 二进制为 0000 1100  |
| \|     | 按位或运算符"\|"是双目运算符。 其功能是参与运算的两数各对应的二进位相或 | (A \| B) 结果为 61, 二进制为 0011 1101 |
| ^      | 按位异或运算符"^"是双目运算符。 其功能是参与运算的两数各对应的二进位相异或，当两对应的二进位相异时，结果为1。 | (A ^ B) 结果为 49, 二进制为 0011 0001  |
| <<     | 左移运算符"<<"是双目运算符。左移n位就是乘以2的n次方。 其功能把"<<"左边的运算数的各二进位全部左移若干位，由"<<"右边的数指定移动的位数，高位丢弃，低位补0。 | A << 2 结果为 240 ，二进制为 1111 0000 |
| >>     | 右移运算符">>"是双目运算符。右移n位就是除以2的n次方。 其功能是把">>"左边的运算数的各二进位全部右移若干位，">>"右边的数指定移动的位数。 | A >> 2 结果为 15 ，二进制为 0000 1111  |

&：两位都为 1 则结果为 1，否则为 0。如：1 & 1 = 1，1 & 0 = 0，0 & 0 = 0

|：两位都为 0 则结果为 0，否则为 1。如：1 | 1 = 1，1 | 0 = 1， 0 | 0 = 0

^：两位一个为 1 一个为 0，则结果为 1，否则为 0。如：1 ^ 0 = 1，1 ^ 1 = 0

`>>`：低位溢出，符号位不变，并用符号位补溢出的高位

`<<`：符号位不变，低位补 0

~~~go
// 注意先转为补码在运算
fmt.Println(2&3)  // 2
fmt.Println(2|3)  // 3
fmt.Println(2^3)  // 3
fmt.Println(-2^3) // -4

a := 1 >> 2 // 0000 0001 ===> 0000 0000 ===> 0
c := 1 << 2 // 0000 0001 ===> 0000 0100 ===> 4
~~~

#### 其它运算符

| 运算符 | 描述             | 实例                       |
| :----- | :--------------- | :------------------------- |
| &      | 返回变量存储地址 | &a; 将给出变量的实际地址。 |
| `*`    | 指针变量。       | `*a`; 是一个指针变量       |

#### 运算符优先级

由上到下，优先级由高到低

| 优先级 | 运算符           |
| :----- | :--------------- |
| 5      | * / % << >> & &^ |
| 4      | + - \| ^         |
| 3      | == != < <= > >=  |
| 2      | &&               |
| 1      | \|\|             |

- 括号，++，--
- 单目运算符
- 算术运算符
- 移位运算符
- 关系运算符
- 位运算符
- 逻辑运算符
- 赋值运算符
- 逗号

当然，你可以通过使用括号来临时提升某个表达式的整体运算优先级。

::: tip 拓展

有两个变量 a 和 b，要求将其进行交换，但是不允许使用中间变量，最终打印结果

~~~go
var a int = 10
var b int = 20

a = a + b // a = 30
b = a - b // b = 30 - 20 = 10
a = a - b // a = 30 - 10 = 20
~~~

:::

### 键盘输入语句

导入 fmt 包，

调用 fmt.ScanIn() 或 fmt.Scanf()

fmt.ScanIn()：换行时结束

fmt.Scanf()：按指定格式赋值

~~~go
// fmt.ScanIn()
var name string
var age byte
var sal float32
var isPass bool

fmt.ScanIn(&name)
fmt.ScanIn(&age)
fmt.ScanIn(&sal)
fmt.ScanIn(&isPass)
fmt.Printf(name, age, sal, isPass)

// fmt.Scanf() 空格隔开
// 用什么隔开，取决于前面的格式 如：%s %d %f %t ===> 空格隔开
// %s,%d,%f,%t ===> 逗号隔开
fmt.Scanf("%s %d %f %t", &name, &age, &sal, &isPass)
~~~

- - 

### 值类型和引用类型

值类型：基本数据类型、数组、结构体struct

引用类型：指针、slice切片、map、chan管道、interface等

**区别：**

值类型：变量直接存储值，内存通常分配在栈中

引用类型：变量存储地址，这个地址对应的空间才真正存储值，内存通常分配在堆中，当没有任何变量引用这个地址时，该地址对应的数据空间就成为一个垃圾，由GC来回收

### 进制运算

对于整数，有四种表示方式

- 二进制：0，1 。逢2进1
- 八进制：0 ~ 7 。逢8进1。以 0 开头，如：06，016
- 十进制：0 ~ 9。逢10进1
- 十六进制：0 ~ 9及 A ~ F。逢16进1，0x 或 0X 开头，如：0x21F

#### 二进制 ===> 十进制

从最低为开始（最右边），将每个位上的数提取出来，乘以2的（位数 -1）次方，然后求和

~~~go
// 位数：4 3 2 1     
二进制： 1 0 1 1
1011 = 1*2^3 + 0*2^2 + 1*2^1 + 1*2^0 = 8 + 0 + 2 + 1 = 11
~~~

#### 八进制 ===> 十进制

从最低为开始（最右边），将每个位上的数提取出来，乘以8的（位数 -1）次方，然后求和

~~~go
// 位数：  3 2 1     
八进制： 0 1 2 3
0123 = 1*8^2 + 2*8^1 + 3*8^0 = 64 + 16 + 3 = 83
~~~

#### 十六进制 ===> 十进制

从最低为开始（最右边），将每个位上的数提取出来，乘以16的（位数 -1）次方，然后求和

~~~go
// 位数：    3 2 1     
十六进制： 0x 3 4 A
0x34A = 3*16^2 + 4*16^1 + 10*16^0 = 768 + 64 + 10 = 842
~~~

#### 十进制 ===> 二进制

将十进制数不断除2，直到商为0，然后将余数倒过来，就是对应的二进制

~~~go
十进制：56
// 除2     余数
56/2		0
28/2		0
14/2		0
7/2			1
3/2			1
1/2			1
0
二进制：111000
~~~

#### 十进制 ===> 八进制

将十进制数不断除8，直到商为0，然后将余数倒过来，就是对应的八进制

~~~go
十进制：156
// 除8		余数
156/8		  4
19/8		  3
2/8			  2
0
八进制：0234
~~~

#### 十进制 ===> 十六进制

将十进制数不断除16，直到商为0，然后将余数倒过来，就是对应的十六进制

~~~go
十进制：356
// 除16		余数
356/16		  4
22/16         6
1/16		  1
0
十六进制：0x164
~~~

#### 二进制 ===> 八进制

将二进制数每三位一组（从低位开始组合），转成对应八进制数即可

~~~go
二进制：11010101
011 010 101 = 3 2 5
八进制：0325
~~~

#### 二进制 ===> 十六进制

将二进制数每四位一组（从低位开始组合），转成对应十六进制数即可

~~~go
二进制：11010101
1101 0101 = D 5
十六进制：0xD5
~~~

#### 八进制 ===> 二进制

将八进制每一位，转成对应的一个三位的二进制数即可

~~~go
八进制：0237
2 3 7 = 010 011 111
二进制：010011111
~~~

#### 十六进制 ===> 二进制

将十六进制每一位，转成对应的一个四位的二进制数即可

~~~go
十六进制：0x237
2 3 7 = 0010 0011 0111
二进制：001000110111
~~~

### 原码、反码、补码

对于有符号的而言

- 二进制的最高位是符号位：0表示正数，1表示负数
- 整数的原码、反码、补码都一样
- 负数的反码=它的原码符号位不变，其它位取反（0 -> 1，1 -> 0）
- 负数的补码=它的反码+1
- 0的反码、补码都是0
- 在计算机运算的时候，都是以补码的方式来运算的

### 流程控制语句

- 顺序控制
- 分支控制
- 循环控制

#### 顺序控制

程序从上到下逐行执行，中间没有任何判断和跳转

#### 分支控制

##### if ... else if ... else

~~~go
// 当条件表达式为 true 时，执行{}内的内容
if 条件表达式 {
    // do something
}

// 当条件表达式为 true 时，执行 do something1
// 否则执行 do something2
if 条件表达式 {
    // do something1
} else {
    // do something2
}

// else 不是必须的
if 条件表达式1 {
    // do something1
} else if 条件表达式2 {
    // do something2
} else {
    // do something3
}

// 可以嵌套
if 条件表达式 {
    if 条件表达式 {
    	// do something1
	} else {
    	// do something2
	}
}
~~~

Go的 if 有一个强大的地方就是条件判断语句里面允许声明一个变量，这个变量的作用域只能在该条件逻辑块内。其他地方不起作用

~~~go
// 注意分号
if age := 20; age > 18 {
    // do something
}
~~~

::: warning 注意

在Go中，即使 {} 内只有一条语句，{} 也不可省略

:::

##### switch

~~~go
switch 表达式 {
    case 表达式1，表达式2...: 
    	语句块1
   		fallthrouge
    case 表达式3，表达式4...: 
    	语句块2
    	fallthrouge
    ...
    case 表达式n，表达式n+1...: 
    	语句块n
    	fallthrouge
    default: 
    	语句块
}
~~~

- case 后是一个表达式（常量、变量、函数都可）
- case 后表达式的值，必须和 switch 后的表达式数据类型一致
- case 后可以有多个表达式，逗号分隔
- defalut 不是必须的

::: warning 注意

Go中，switch 的 case 后不需要加 break，会自动跳出

若要 switch 穿透，需要在 case 语句块后添加 fallthrouge，则会执行下一个 case（默认只能穿透一层）

:::

#### 循环控制

##### for

让你的代码循环执行

~~~go
// 注意分号
// 方式1
for 循环变量初始值; 循环条件; 循环变量迭代 {
    // do something
}

// 方式2
循环变量初始值
for 循环条件 {
    // do something
}

// 方式3 死循环 需要配合 break 使用
for { // 等价于 for ;; {}
    // do something
}
例：
for i := 1; i <= 10; i++ {
    // do something
}

j := 1
for j <= 10 {
    // do something
    j++
}

k := 1
for {
    // do something
    if k > 10{
        break
    }
    k++
}
~~~

##### for range

用于遍历数组和字符串

~~~go
str = "abc~ok"
for index,val := range str {
    fmt.Printf("index=%d, val=%c",index, val)
}
// index=0,val=a
// index=1,val=b
// index=2,val=c
// index=3,val=~
// index=4,val=o
// index=5,val=k
~~~

::: tip 

如果我们的字符串含有中文，那么传统的遍历字符串方式，就是错误的，会出现乱码

原因是Go对字符串是按照**字节**来遍历，而一个汉字在utf8对应3个字节

~~~go
str = "abc上海"
for index,val := range str {
    fmt.Printf("index=%d, val=%c",index, val)
}
// index=0,val=a
// index=1,val=b
// index=2,val=c
// index=3,val=上
// index=6,val=海
~~~

:::

::: warning 注意

Go没有 while 和 do ... while 语法，若要使用，可以用 for 来实现

:::

### break、continue、return、goto

##### break

表示跳出当前最近的 for 循环或 switch 语句

::: tip

在多层嵌套语句块内，可以通过标签指明要终止的是哪一层语句块

~~~go
label2:
for i := 0; i < 4; i++ {
    // label1:
    for j := 0; j < 10; j++ {
        break label2 // 若不指定lable，默认会跳出最近的 for 循环
    }
}
~~~

:::

##### continue

表示，结束本次循环，开始下一次循环，同样可以通过标签指明

##### goto

goto 可以无条件的转移到程序中指定的地方，通常与条件语句配合使用，**一般不主张使用 goto 语句**，以避免程序流程混乱

~~~go
goto label
...

例：
fmt.Println("1")
goto label1
fmt.Println("2")
fmt.Println("3")
label1:
fmt.Println("4")
fmt.Println("5")
fmt.Println("6")
fmt.Println("7")

// 输出 14567
~~~

##### return

表示结束所在函数或方法，即不再执行函数中 return 后面的代码

::: warning 注意

如果在 main 函数使用 return，表示终止 main 函数，也就是终止程序

:::

### 包

三大作用

- 区分相同名字的函数、变量、标识符等
- 当程序文件很多时，可以很好的管理项目
- 控制函数、变量等的访问范围，即作用域

~~~go
// 打包
package 包名

package utils

// 引入包
import "包路径"

import "go_code/project/utils"

// 引入包并起别名
import 别名 "包路径"

import utils "go_code/project/utils"

// 访问其它包的内容时
包名.函数名或变量名...

utils.Name
~~~

**注意事项：**

- 文件的包名通常和文件所在的文件夹名一致，一般为小写字母
- package 要在文件的第一行，然后是 import
- 在 import 导入包时，路径从定义的环境变量 ROOTPATH 开始，不需要带 src ，会自动从 src 下开始引入

### 函数

未完成某一功能的程序指令（语句）的集合，称为函数

Go的函数可以返回多个值，逗号分隔。函数可以有返回值，也可以没有

当返回多个返回值，接收时，可以使用 `_` 忽略返回值 

~~~go
func 函数名 (形参列表) (返回值列表) {
    // 语句
    return 返回值列表
}

例：
func sumNum (num int, num2 int) int {
	sum := num + num2
	return sum
}
func main() {
    sum := sumNum(10, 20)
    fmt.Println(sum) // 30
}

// 忽略返回值
func cal(n1 int, n2 int) (int, int) {
    sum = n1 + n2
    sub = n1 - n2
    return sum, sub
}

a, _ := cal(10, 20) // 直接收了 sum， sub 被忽略
fmt.Println(a) // 30
~~~

**注意事项：**

- 函数中的变量时局部的，函数外不生效
- 基本数据类型和数组默认都是值传递，即进行值拷贝。在函数内修改，不会影响原来的值
- 如果希望函数内的变量能修改函数外的变量，可以传入变量的地址&，函数内以指针的方式操作变量

::: warning 注意

Go不支持函数重载

:::

::: tip

Go中

- 函数也是一种数据类型，可以赋值给一个变量。通过该变量可以对函数调用
- 函数可以作为形参，并且调用
- 支持对函数返回值命名
- 支持可变参数

:::

~~~go
// 函数赋值给变量
func getSum(n1 int, n2 int) int {
    return n1+ n2
}
a := getSum
fmt.Printf("a的类型%T, getSum类型%T", a, getSum) // func<int, int> int, func<int, int> int
fmt.Printf(a(10, 20)) // 30

// 函数作为形参
func myFun(funvar func(int, int) int, num1 int, num2 int) {
    return funvar(num1, num2)
}
res2 := myFun(getSum, 50, 60)
fmt.Printf(res2) // 110

// 函数对返回值命名
// 会返回 sum 和 sub
func cal(n1 int, n2 int) (sum int, sub int) {
    sum = n1 + n2
    sub = n1 - n2
    return
}

// 可变参数
func sum(n1 int ,args... int) int {
    sum := n1
    // 遍历 args
    for i := 0; i < len(args); i++ {
        sum += args[i]
    }
    return sum
}
~~~

::: warning 注意

如果一个函数的形参列表中有可变参数，则可变参数必须放在形参列表的最后

:::

### init 函数

每一个源文件都可以包含一个 init 函数，该函数会在 main 执行前执行（相当于 Java 的构造函数）

最主要的作用，就是完成一些初始化的工作

~~~go
func init() {
    fmt.Println("main init")
}
func main() {
    fmt.Println("main")
}
~~~

- 如果一个文件同时包含了全局变量、init函数、main函数，则执行流程为
  - 全局变量 ==> inti 函数 ==> main 函数 

若在本包引用了其他包，如：main 包引用 utils 包，则执行流程为

- utils的变量定义 ==> utils的 init 函数 ==> 本包变量定义 ==> 本包 init 函数 ==> 本包 main 函数

### 匿名函数

如果我们某个函数只是希望使用一次，可以考虑使用匿名函数

当然，匿名函数也可以实现多次调用

使用方式：

- 定义匿名函数时，直接调用
- 将匿名函数赋给一个变量，通过该变量来调用匿名函数
- 全局匿名函数

~~~go
// 定义匿名函数时，直接调用
res := func (n1 int, n2 int) int {
    return n1 + n2
}(10, 20)

fmt.Println(res) // 30

// 将匿名函数赋给一个变量，通过该变量来调用匿名函数
res2 := func (n1 int, n2 int) int {
    return n1 + n2
}
res3 := res2(20, 30)
fut.Println(res2(30, 40), res3) // 70 50
// 全局匿名函数
var (
    Fun1 = func (n1 int, n2 int) int {
        return n1 * n2
    }
)
~~~

### 自定义数据类型

Go支持自定义数据类型

~~~go
type 自定义类型名 数据类型 // 相当于定义了一个别名

type myInt int // 此时 myInt 就等价于 int 来使用
type mySum func(int,int) int // 此时 mySum 就等价一个函数类型
~~~

::: warning 注意

虽然 myInt 和 int 都是 int 类型，但是 Go 认为 myInt 和 Int 是两个类型

~~~go
type myInt int
var num1 myInt
var num2 int
num1 = 40
num2 = num1 // 报错，类型不同
num2 = int(num1) // 正确
~~~

### 闭包

闭包就是一个函数和与其相关的引用环境组合的一个整体

~~~go
// AddUpper 是一个函数，返回的类型为 fun(int) int
func AddUpper() func(int) int {
    var n int = 10
    // 返回的是一个匿名函数，但是这个匿名函数引用到函数外的 n，
    // 因此这个匿名函数就和 n 形成一个整体，构成闭包
    return func(x int) int {
        n = n + x
        return n
    }
}

func main() {
    f := AddUpper() // 返回一个闭包
    fmt.Println( f(1) ) // 11
    fmt.Println( f(2) ) // 13
    fmt.Println( f(3) ) // 16
    // 当我们反复调用的时候，n 只初始化了一次，所以没调用一次就进行累加
}
~~~

- 闭包的好处：闭包可以保留上次引用的某个值，所以我们输入一次就可以反复使用

例：

编写一个函数 makeSuffix(suffix string) 可以接收一个文件名后缀（比如 .jpg），并返回一个闭包

调用闭包，传入一个文件名，如果改文件名没有指定的后缀（.jpg），则返回`文件名.jpg`，如果已有 `.jpg` 后缀，则返回原文件名

~~~go
func makeSuffix(suffix string) func (string) string {
	
	return func (fileName string) string {
		if (strings.HasSuffix(fileName, suffix)) {
			return fileName
		} else {
			return fileName + suffix
		}
	}
}

func main() {
	f := makeSuffix(".jpg")
	fmt.Printf(f("winter")) // winter.jpg
	fmt.Printf(f("abc.jpg")) // abc.jpg

}
~~~

### defer

在函数中，经常会使用某些资源，使用接收需要关闭这些资源（如：数据库连接等）

为了在函数执行完毕后，及时的释放资源，Go提供了 defer（延时机制）

~~~go
func sum(n1 int, n2 int) int {
    // 当执行到 defer 时，暂时不执行，会将 defer 后面的语句压入到独立的栈中
    // 在将 defer 语句放入栈时，会将相关的值同时拷贝入栈
    // 当函数执行完毕后，在从栈中，按照先入后出的方式出栈，执行
    defer fmt.Println("ok1 n1=", n1) // 3. ok1 n1 = 10
    defer fmt.Println("ok2 n2=", n2) // 2. ok2 n2 = 20
    
    n1++ // n1 = 11
    n2++ // n2 = 21
    
    res := n1 + n2 // res = 32
    defer fmt.Println("ok3 res=", res) // 1. ok3 res=32
    return res
}
func main () {
    res := sum(10, 20)
    fmt.Println("res=", res) // 4. res = 32
}
~~~

::: tip

defer 最主要的价值就是，当函数执行完毕后，可以及时的释放函数创建的资源

:::

~~~go
// 例
func test() {
    // 关闭文件资源
    file = openfile(文件名)
    defer file.close()
    // 其它代码
}

func test() {
    // 关闭数据库资源
    connect = openDatabse(文件名)
    defer connect.close()
    // 其它代码
}
~~~

- 创建资源 ===> defer 关闭资源 ===> 继续使用资源 ===> 函数执行完毕 ===> 从栈中取出语句 ===> 关闭资源

### 函数参数的传递方式

值类型参数默认就是值传递

- 值类型：int、float、bool、string、数组、结构体

引用类型参数默认就是引用传递

- 引用类型：指针、切片、map、管道、interface等

::: tip

不管是值传递还是引用传递，传递给函数的都是变量副本，不同的时是

- 值传递是值得拷贝
- 引用传递时地址得拷贝

一般来说，地址拷贝效率高，因为数据量小，而值拷贝取决于拷贝数据得大小，数据越大，效率越低

:::

### 变量作用域

- 函数内部声明/定义得变量叫局部变量，作用域仅限于函数内部
- 函数外部声明/定义得变量叫全局变量，作用域在整个包内，如果其首字母大写，则作用域在整个程序有效
- 如果变量在一个代码块中，如for 、if ，那么这个变量得作用域就在该代码块中

~~~go
// 函数外部声明/定义得变量叫全局变量
// 作用域在整个包内，如果其首字母大写，则作用域在整个程序有效
var age int = 50
var Name string = "jack"

func test() {
    // Name age 得作用域，只在 test 函数内部
    age := 10
    Name := "tom"
    fmt.Println("age=", age) // 10
    fmt.Println("Name=", Name) // tom
}

func main() {
    fmt.Println("age=", age) // 50
    fmt.Println("Name=", Name) // jack
}
~~~

### 字符串常用函数

- 统计字符串长度，按字节

~~~go
str := "hello张"
// 一个汉字占3个字节
fmt.Println(len(str)) // 8
~~~

- 字符串遍历，同时处理中文得问题

~~~go
str := "hello张林伟"
r := []rune(str)
for i := 0; i < len(r); i++ {
    fmt.Printf("%c", r[i])
}
~~~

- 字符串转整数

~~~go
n, err := strconv.Atoi("123")
if err != nil {
    fmt.Println("转换错误", err)
} else {
     fmt.Println("转换成功", n) // 123 int
}
~~~

- 整数转字符串

~~~go
str = strconv.Itoa(12345)
fmt.Printf("str=%v, str=%T", str, str) // 12345 
~~~

- 字符串转 []byte

~~~go
var bytes = []byte("hello go")
 fmt.Printf("bytes=%v", bytes) // [104 101 108 111 32 103 111]
~~~

- []byte 转字符串

~~~go
str = string([]byte{97, 98, 99})
 fmt.Printf("str=%v", str) //abc
~~~

- 10进制转 2，8，16 进制

~~~go
str = strconv.FormatInt(123, 2)
fmt.Printf("123对应的二进制是%v", str) // 1111011

str = strconv.FormatInt(123, 8)
fmt.Printf("123对应的八进制是%v", str) // 173

str = strconv.FormatInt(123, 16)
fmt.Printf("123对应的十六进制是%v", str) // 7B
~~~

- 查找子串是否在指定得字符串中

~~~go
b := strings.Contains("seafood", "fool")
fmt.Printf("n=%v", b) // true
~~~

- 统计一个字符串有几个指定得子串

~~~go
num := strings.Count("ceheese", "e")
fmt.Printf("num=%v", num) // 4
~~~

- 不区分大小写得字符串比较（== 是区分大小写得）

~~~go
b = strings.EqualFold("abc", "ABC")
fmt.Printf("b=%v", b) // true

fmt.Println("abc" == "ABC") // false
~~~

- 返回子串在字符串第一次出现的 index 值，没有则返回 -1

~~~go
strings.Index("NLT_abc", "abc") // 4
~~~

- 返回子串在字符串最后一次出现的 index 值，没有返回 -1

~~~go
strings.LastIndex("go golang", "go") // 3
~~~

- 将指定得子串替换成另一个子串

~~~go
// 将 go 替换成 张 -1表示全部替换，1表示替换一个
str = strings.Replace("go go hello", "go", "张", -1)
~~~

- 按照指定得某个字符，将字符串拆分为数组

~~~go
strings.Split("hello,wrold,ok", ",") // [hello wrold ok]
~~~

- 字符串字符大小写转换

~~~go
str = "goLang Hello"
strings.ToLower(str) // 转小写 golang hello
strings.ToUpper(str) // 转大写 GOLANG HELLO
~~~

- 去掉字符串左右两边得空格

~~~GO
strings.TrimSpace("   tn a lone   ") // tn a lone
~~~

- 去掉字符串左右两边指定的字符

~~~go
strings.Trim("! hello!", "!") // hello
~~~

- 去掉字符串左边指定的字符

~~~go
strings.TrimLeft("! hello!") // hello!
~~~

- 去掉字符串右边指定的字符

~~~go
strings.TrimRight("! hello!") // ! hello
~~~

- 判断字符串是否以指定得字符串开头

~~~go
strings.HasPrefix("ftp://123", "ftp") // true
~~~

- 判断字符串是否以指定得字符串结束

~~~go
strings.HasSuffix("ftp://123", "ftp") // false
~~~

### 时间日期常用函数

需要导入 time 包

- 获取当前时间

~~~go
now := time.Now() 
fmt.Printf("now=%v,type=%T", now, now)
// 2018-05-29 16:19:21.1196972 +0800 CST m=+0.022001301, type = time.Time

// 通过上面得 now 可以获得年月日时分秒
now.Year()
now.Month()
int(now.Month()) // 强转得到对应数字
now.Day()
now.Hour()
now.Minute()
now.Second()
~~~

- 格式化日期时间

~~~go
// 年-月-日 时:分:秒
fmt.Printf(""%d-%d-%d %d:%d:%d", 
           now.Year(),now.Month(),now.Day(),now.Hour(),now.Minute(),now.Second())

// 方式二
fmt.Printf(now.Format("2006-01-02 15:04:05"))
// 2006-01-02 15:04:05 各个数字是固定得，必须这样写。
// 相当于 yyyy-MM-dd HH:mm:ss
~~~

### 内置函数

- len：求长度，前面说过
- new：分配内存，主要用来分配值类型，返回的是指针
- make：分配内存，主要用来分配引用类型

~~~go
num2 := new(int) // 返回 *int
// num2得类型 ==> *int
// num2的值 ===> 地址
// num2的地址 ===> 地址
// num2指向的值 ===> 0
*num2 = 100
// num2指向的值 ===> 100
~~~

### 错误处理

Go语言不支持 try...catch...finally 这种处理方式

Go的错误处理方式为 defer，panic，recover

Go可以抛出一个 panic 的异常。然后通过 recover 捕获这个异常

~~~go
func test() {
    // 使用 defer + recover 来捕获和处理异常
    defer func() {
        err := recover() // 内置函数，可以捕获到异常
        if err != nil {
            fmt.Println("err=", err)
            // 这里可以通知管理员
            fmt.Println("通知管理员")
        }
    }()
    num1 := 10
    num2 := 0
    res := num1 / num2
    fmt.Println("res=", res)
}

func main() {
    test()
    fmt.Println("程序正常执行") // 会输出
}
~~~

#### 自定义错误

使用 `errors.New()` 和 `panic()` 内置函数

~~~go
errors.New("错误说明") // 会返回一个 error 类型的值，表示一个错误
panic() // 接收任何值作为参数，输出错误信息，并退出程序

func readConf(name string) (err error) {
    if name == "config.ini" {
        // do something
        return nil
    } else {
        return errors.New("读取文件错误")
    }
}

func test() {
    err := readConf("abc")
    if err != nil {
        // 输出这个错误，并终止程序
        panic(err)
    }
    fmt.Println("不会继续执行")
}
~~~

## 三、Go高级语法

### 指针

基本数据类型，变量存的就是值，也叫值类型

获取变量的地址，用 & 如： var num int 获取num的地址： &num

指针类型，指针变量存的是一个地址，这个地址指向的空间存的才是值 。如： var ptr *int = &num

获取指针类型所指向的值，使用 *。比如：var ptr *int。使用 *ptr获取 ptr 指向的值

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

// = = = = = = = = = = 分割线 = = = = = = = = = 

// 通过指针修改变量的值
package main  
import "fmt"  

func main() {
	var num int = 10
	fmt.Printf("num地址=%v\n", &num) // 0xc00000e0c8
	var ptr *int = &num
	*ptr = 20
	fmt.Printf("num=%v\n", num) // 20

}
~~~

![image-20230422182313455](D:\FullStackNotes\docs\guide\Go\img\image-20230422182313455.png)

- 每个值类型，都有对应的指针类型，形式为 *数据类型，比如： int 对应的指针类型为 `*int`，float32对应的指针类型就是 `*float`，依此类推
- 值类型包括：
  - 基本数据类型： int，float，bool，string
  - 数组
  - 结构体 struct
