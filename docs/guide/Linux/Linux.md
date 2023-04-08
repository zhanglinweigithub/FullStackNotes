**隐藏文件、文件夹   **<br />在Linux中以 . 开头的，均是隐藏的。 默认不显示出来，需要 -a 选项才可查看到  <br />**HOME目录  **<br />每一个用户在Linux系统中都有自己的专属工作目录，称之为HOME目录。 

- 普通用户的HOME目录，默认在：/home/用户名 
- root用户的HOME目录，在：/root 

FinalShell登陆终端后，默认的工作目录就是用户的HOME目录  <br />**相对路径、绝对路径  **

- 相对路径， 非  /  开头的称之为相对路径 

相对路径表示以当前目录作为起点，去描述路径，如test/a.txt，表示当前 工作目录内的test文件夹内的a.txt文件 

- 绝对路径， 以 /开头的称之为绝对路径 

绝对路径从根开始描述路径  

**特殊路径符  **

- **.** ，表示当前，比如./a.txt，表示当前文件夹内的a.txt文件 
- **. .** ，表示上级目录，比如 ./表示上级目录， ./ ./表示上级的上级目录 
- **~** ，表示用户的HOME目录，比如cd ~，即可切回用户HOME目录  
# 1、Linux的目录结构
![image.png](https://cdn.nlark.com/yuque/0/2023/png/34929664/1674454377994-168fe220-29f1-4fec-a4f7-6076c5c3c7e4.png#averageHue=%23f0ede8&clientId=uaf6bd301-67de-4&from=paste&height=310&id=uc31b759d&name=image.png&originHeight=279&originWidth=747&originalType=binary&ratio=1&rotation=0&showTitle=false&size=97114&status=done&style=none&taskId=ub7d68a12-89f6-4766-8436-47cdfb1914b&title=&width=830.0000219874918)

- ** /，根目录是最顶级的目录了  ， Linux只有一个顶级目录：/  **
- ** 路径描述的层次关系同样适用/来表示  **
- ** /home/itheima/a.txt，表示根目录下的home文件夹内有itheima文件夹， 内有a.txt  **
# 2、常用命令
:::success
// 查看命令帮助<br />命令 --help<br />// 查看命令的详细手册  <br />man 命令  
:::
## ls  列出文件夹信息  
:::success
语法：**ls [-l -h -a] [参数]**

- 参数：被查看的文件夹，不提供参数，表示查看当前工作目录 
- -l，以列表形式查看 
- -h，配合-l，以更加人性化的方式显示文件大小 
- -a，显示隐藏文件  
:::
## pwd  展示当前工作目录  
:::success
语法：**pwd**
:::
## cd  切换工作目录  
:::success
语法：**cd [目标目录]** <br />参数：目标目录，要切换去的地方，不提供默认切换到当前登录用户HOME目录  
:::
## mkdir  创建文件夹  
:::success
语法：**mkdir [-p] 参数** 

- 参数：被创建文件夹的路径 
- 选项：-p，可选，表示创建前置路径  
:::
## touch  创建文件  
:::success
语法：**touch 参数** 

- 参数：被创建的文件路径  
:::
## cat  查看文件内容  
:::success
 语法：**cat 参数** 

- 参数：被查看的文件路径  
:::
## more  查看文件，可以支持翻页查看  
:::success
语法：**more 参数** 

- 参数：被查看的文件路径 
- 在查看过程中： 
   - 空格键翻页 
   - q退出查看  
:::
## cp  功能：复制文件、文件夹  
:::success
语法：**cp [-r] 参数1 参数2** 

- 参数1，被复制的 
- 参数2，要复制去的地方 
- 选项：-r，可选，复制文件夹使用 

示例： 

- cp a.txt b.txt，复制当前目录下a.txt为b.txt 
- cp a.txt test/，复制当前目录a.txt到test文件夹内 
- cp -r test test2，复制文件夹test到当前文件夹内为test2存在  
:::
## mv  移动文件、文件夹  
:::success
语法：**mv 参数1 参数2** 

- 参数1：被移动的 
- 参数2：要移动去的地方，参数2如果不存在，则会进行改名  
:::
## rm  删除文件、文件夹  
:::success
语法：**rm [-r -f] 参数 . . . 参数** 

- 参数：支持多个，每一个表示被删除的，空格进行分隔 
- 选项：
   - -r，删除文件夹使用 
   - -f，强制删除，不会给出确认提示，一般root用户会用到  
:::
## which  查看命令的程序本体文件路径  
:::success
语法：**which 参数** 

- 参数：被查看的命令  
:::
## find  搜索文件  
:::success
语法：**按文件名搜索：find 路径 -name 参数** 

- 路径，搜索的起始路径 
- 参数，搜索的关键字，支持通配符 *， 比如：*test表示搜索任意以test结尾 的文件  
:::
## grep  过滤关键字  
:::success
语法：**grep [-n] 关键字 文件路径** 

- 选项：-n，可选，表示在结果中显示匹配的行的行号。 
- 关键字，必填，表示过滤的关键字，带有空格或其它特殊符号，建议使 用””将关键字包围起来 
- 文件路径，必填，表示要过滤内容的文件路径，可作为内容输入端口  
:::
**文件路径，可以作为管道符的输入  **
## wc  统计  
:::success
语法：**wc [-c -m -l -w] 文件路径** 

- 选项：
   - -c，统计bytes数量 选项
   - -m，统计字符数量 选项
   - -l，统计行数 选项
   - -w，统计单词数量 
- 文件路径，被统计的文件，可作为内容输入端口  
:::
**文件路径，可以作为管道符的输入  **
## 管道符 |   将符号左边的结果，作为符号右边的输入  
:::success
示例： <br />**cat a.txt | grep itheima**，将cat a.txt的结果，作为grep命令的输入， 用来过滤itheima关键字 <br />可以支持嵌套： <br />**cat a.txt | grep itheima | grep itcast ** 
:::
## echo  输出内容  
:::success
语法：**echo 参数** 

- 参数：被输出的内容  
:::
## ` 反引号   被两个反引号包围的内容，会作为命令执行  
:::success
示例： 

- **echo `pwd`**，会输出当前工作目录  
:::
## tail  查看文件尾部内容  
:::success
语法：**tail [-f] 参数** 

- 参数：被查看的文件 
- 选项：-f，持续跟踪文件修改  
:::
## head  查看文件头部内容  
:::success
语法：**head [-n] 参数** 

- 参数：被查看的文件 
- 选项：-n，查看的行数  
:::
## >> 重定向符   将符号左边的结果，输出到右边指定的文件中去  
:::success

- >，表示覆盖输出 
- >>，表示追加输出  
:::
# 3、vi 编辑器
## 3.1 命令模式快捷键
| **命令** | **描述** |
| --- | --- |
| **i** | 在当前光标位置进入，**输入模式** |
| **a** | 在当前光标位置之后进入，**输入模式** |
| **I （大写i）** | 在当前行的开头，进入 **输入模式** |
| **A** | 在当前行的结尾，进入 **输入模式** |
| **o** | 在当前光标下一行，进入**输入模式** |
| **O** | 在当前光标上一行，进入**输入模式** |
| **esc** | 回到**命令模式** |
| **↑、k** | 向上移动光标 |
| **↓、j** | 向下移动光标 |
| **←、h** | 向左移动光标 |
| **→、l（小写L）** | 向右移动光标 |
| **0(数字0)** | 移动光标到当前行的开头 |
| **$** | 移动光标到当前行的结尾 |
| **PgUp** | 向上翻页 |
| **PgDn** | 向下翻页 |
| **/** | 进入搜索模式 |
| **n** | 向下继续搜索 |
| **N** | 向上继续搜索 |
| **dd** | 删除光标所在行的内容 |
| **ndd** | n是数字，表示删除当前光标向下n行 |
| **yy** | 复制当前行 |
| **nyy** | n是数字，复制当前行和下面的n行 |
| **p** | 粘贴 |
| **u** | 撤销修改 |
| **ctrl + r** | 反向撤销 |
| **gg** | 跳到首行 |
| **G** | 跳到行尾 |
| **dG** | 从当前行开始，向下全部删除 |
| **dgg** | 从当前行开始，向上全部删除 |
| **d$** | 从当前光标开始，删除到本行的结尾 |
| **d0（数字0）** | 从当前光标开始，删除到本行的开头 |

## 3.2 底线命令快捷键
| **命令** | **描述** |
| --- | --- |
| **:wq** | 保存并退出 |
| **:q** | 仅退出 |
| **:q!** | 强制退出 |
| **:w** | 仅保存 |
| **:set nu** | 显示行号 |
| **:set paste** | 设置粘贴模式 |

# 4、Linxu常用操作
## 4.1 软件安装
**yum 和 apt 均需 root 权限**
### CentOS系统
:::success
yum [install remove search] [-y] 软件名称 

- install 安装 
- remove 卸载 
- search 搜索 
- -y，自动确认  
:::
### Ubuntu系统
:::success
apt [install remove search] [-y] 软件名称 

- install 安装 
- remove 卸载 
- search 搜索 
- -y，自动确认  
:::
## 4.2 常用命令
### su 切换用户
:::success
语法：**su [-] [用户]  **<br />选项：<br />-：表示切换后加载环境变量，建议带上<br />用户：可以省略，省略默认切换到 root 用户
:::
### sudo 让普通命令带有 root 权限
:::success
语法：**sudo 其它命令**<br />**需要以 root 用户执行 visudo 命令，增加配置方可让普通用户有 sudo 命令的执行权限**<br /> 比如：<br />itheima ALL=(ALL)	NOPASSWD: ALL<br /> 在visudo内配置如上内容，可以让itheima用户，无需密码直接使用sudo  
:::
### chmod  修改文件、文件夹权限 
:::success
语法：**chmod [-R] 权限 参数** <br />选项-R，设置文件夹和其内部全部内容一样生效  <br />参数，被修改的文件、文件夹 <br />权限，要设置的权限，比如755，表示：rwxr-xr-x  <br />![image.png](https://cdn.nlark.com/yuque/0/2023/png/34929664/1674470787604-507a08cb-371d-4714-a70a-30cfcb0b6396.png#averageHue=%23f4f3f1&clientId=ud6a35c9b-55b4-4&from=paste&height=421&id=u9ff33bb9&name=image.png&originHeight=421&originWidth=298&originalType=binary&ratio=1&rotation=0&showTitle=false&size=85064&status=done&style=none&taskId=ueca897df-e9ae-42ad-85c5-0bc15166324&title=&width=298)<br />**u**表示user所属用户权限，**g**表示group组权限，**o**表示other其他用户权限
:::
### chown  修改文件、文件夹所属用户、组  
:::success
语法：**chown [-R] [用户][:][用户组] 文件或文件夹**  <br />选项：<br />-R：同chmod<br />用户：修改所属用户<br />用户组：修改所属用户组<br />：：用于分割用户和用户组<br />![image.png](https://cdn.nlark.com/yuque/0/2023/png/34929664/1674470998782-1749c8d0-7cc7-452e-a3fa-25b5db7dab44.png#averageHue=%23f5f4f2&clientId=ud6a35c9b-55b4-4&from=paste&height=119&id=ud49c01bf&name=image.png&originHeight=119&originWidth=605&originalType=binary&ratio=1&rotation=0&showTitle=false&size=60749&status=done&style=none&taskId=u976c5c70-31c6-40e5-8467-8d333735fe0&title=&width=605)<br />![image.png](https://cdn.nlark.com/yuque/0/2023/png/34929664/1674471055747-bd3c794a-febc-4c06-a95a-760297fdc3e4.png#averageHue=%2330495a&clientId=ud6a35c9b-55b4-4&from=paste&height=135&id=uc0df191f&name=image.png&originHeight=135&originWidth=305&originalType=binary&ratio=1&rotation=0&showTitle=false&size=75251&status=done&style=none&taskId=udc784227-f112-41f6-b4df-51293540087&title=&width=305)
:::
### 用户组管理
:::success
创建用户组<br />**groupadd 用户组名**<br />删除用户组<br />**groupdel 用户组名**<br />**以上命令需要 root 权限**
:::
### getent 查看系统全部用户、用户组
:::success
**getent group**，查看系统全部的用户组  <br />![image.png](https://cdn.nlark.com/yuque/0/2023/png/34929664/1674471617103-6d7b3eea-6433-42be-8529-2d9da81c7797.png#averageHue=%23264358&clientId=ud6a35c9b-55b4-4&from=paste&height=363&id=u2a5b791a&name=image.png&originHeight=363&originWidth=642&originalType=binary&ratio=1&rotation=0&showTitle=false&size=155578&status=done&style=none&taskId=u9cf1bcf7-181f-41fe-9542-6ce1c2d3b65&title=&width=642)<br />信息从左至右分别为： 组名称：组认证：组ID<br />**getent passwd**，查看当前系统中有哪些用户<br />![image.png](https://cdn.nlark.com/yuque/0/2023/png/34929664/1674471654250-b98bb9b0-36e6-47e2-b231-fd9bc969bd24.png#averageHue=%232c4253&clientId=ud6a35c9b-55b4-4&from=paste&height=260&id=ud5b36ea2&name=image.png&originHeight=260&originWidth=634&originalType=binary&ratio=1&rotation=0&showTitle=false&size=232259&status=done&style=none&taskId=u0ef836fd-054c-4a63-b4af-fb033798d6c&title=&width=634)<br />信息从左至右分别为： 用户名：密码：用户ID：组ID：描述信息（无用）：HOME目录：执行中断（默认bash）
:::
### env 查看系统全部的环境变量
:::success
**env**， 查看系统全部的环境变量  
:::
### 用户管理
:::success
创建用户<br />**useradd [-g -d] 用户名**<br />选项：<br />-g：指定用户组，不指定-g，会创建同名用户组并自动加入<br />指定-g，需要组已存在，若已存在同名组，必须使用-g<br />-d：指定用户HOME路径，不指定，HOME默认在：/home/用户名

删除用户<br />**userdel [-r] 用户名**<br />选项：-r，删除用户的HOME目录，不使用-r，删除用户时，HOME目录保留

查看用户所属组<br />**id [用户名]**<br />用户名：被查看的用户，不提供则查看自身

修改用户所属组<br />**usermod -aG 用户组 用户名**<br />指定用户加入指定用户组↑
:::
### systemctl  控制系统服务的启动关闭等
:::success
语法：**systemctl start | stop | restart | disable | enable | status 服务名** 

- start，启动 
- stop，停止 
- status，查看状态 
- disable，关闭开机自启 
- enable，开启开机自启 
- restart，重启  
:::
### 软链接  创建文件、文件夹软链接（快捷方式）  
:::success
语法：**ln -s 参数1 参数2** 

- 参数1：被链接的 
- 参数2：要链接去的地方（快捷方式的名称和存放位置）  
:::
### 日期
:::success
语法：**date [-d] [+格式化字符串]** 

- -d 按照给定的字符串显示日期，一般用于日期计算 
- 格式化字符串：通过特定的字符串标记，来控制显示的日期格式 
   - %Y 年%y 年份后两位数字 (00 .99) 
   - %m 月份 (01 .12) 
   - %d 日 (01 .31) 
   - %H 小时 (00 .23) 
   - %M 分钟 (00 .59) 
   - %S 秒 (00 .60) 
   - %s 自 1970-01-01 00:00:00 UTC 到现在的秒数  

示例：

-  按照2022-01-01的格式显示日期  

![image.png](https://cdn.nlark.com/yuque/0/2023/png/34929664/1674457817656-f91759ca-cab4-4bc2-9ad6-f3fcfb895a03.png#averageHue=%232c495b&clientId=uaf6bd301-67de-4&from=paste&height=88&id=ueb17ee91&name=image.png&originHeight=79&originWidth=626&originalType=binary&ratio=1&rotation=0&showTitle=false&size=50071&status=done&style=none&taskId=u822e75e2-731a-43ee-ad1c-ec793d82711&title=&width=695.5555739814857)

-  按照2022-01-01 10:00:00的格式显示日期  

![image.png](https://cdn.nlark.com/yuque/0/2023/png/34929664/1674457846067-8c936128-9bdb-4419-a5d9-830385a2590d.png#averageHue=%23315166&clientId=uaf6bd301-67de-4&from=paste&height=82&id=u51ffa438&name=image.png&originHeight=74&originWidth=685&originalType=binary&ratio=1&rotation=0&showTitle=false&size=57323&status=done&style=none&taskId=u1289519b-3787-4ed0-9307-8d6c5d83166&title=&width=761.1111312736705)

-  -d选项日期计算  

![image.png](https://cdn.nlark.com/yuque/0/2023/png/34929664/1674457855658-3a943c87-8363-4fe3-9785-a72f5f00cd1f.png#averageHue=%23ede4e2&clientId=uaf6bd301-67de-4&from=paste&height=197&id=u63fb85b0&name=image.png&originHeight=177&originWidth=483&originalType=binary&ratio=1&rotation=0&showTitle=false&size=55078&status=done&style=none&taskId=uff5aa1a6-da8b-4e87-9d30-6b989e2c3b5&title=&width=536.6666808834786)

   -  支持的时间标记为：  
   - ![image.png](https://cdn.nlark.com/yuque/0/2023/png/34929664/1674457865947-8237b776-a413-42a6-a291-310eeae2a2a0.png#averageHue=%23f8f7f7&clientId=uaf6bd301-67de-4&from=paste&height=366&id=u5785dfd9&name=image.png&originHeight=329&originWidth=543&originalType=binary&ratio=1&rotation=0&showTitle=false&size=59572&status=done&style=none&taskId=ud894278c-e8ab-491a-baa8-afb12650acb&title=&width=603.3333493162089)
:::
### 时区
:::success
修改时区为中国时区  <br />rm -f /etc/localtime<br />sudu ln -s /usr/share/zoneinfo/Asia/Shanghai /etc/localtime
:::
### ntp 同步时间
:::success
安装：yum install -y ntp <br />启动管理：systemctl start | stop | restart | status | disable | enable ntpd <br />手动校准时间：ntpdate -u ntp.aliyun.com  
:::
### ip地址
:::success
格式：a.b.c.d 

- abcd为0~255的数字 

特殊IP： 

- 127.0.0.1，表示本机 
- 0.0.0.0 
   - 可以表示本机 
   - 也可以表示任意IP（看使用场景） 

查看ip：ifconfig  
:::
### 主机名  Linux系统的名称  
:::success
查看：hostname <br />设置：hostnamectl set-hostname 主机名  
:::
### ps  查看进程信息  
:::success
语法：**ps -ef**，查看全部进程信息<br />可以搭配grep做过滤：**ps -ef | grep xxx ** 
:::
### kill 关闭进程
:::success
语法：**kill [9] 进程ID**<br />选项： -9，表示强制关闭进程。不使用此选项会向进程发送信号要求其关闭，但是否关闭看进程自身的处理机制
:::
### nmap 查看端口占用情况
:::success
安装 nmap ：yum install -y nmap<br />语法：**nmap 被查看的 ip 地址**<br />![image.png](https://cdn.nlark.com/yuque/0/2023/png/34929664/1674468349273-30eb8a89-6306-47fa-9e20-d380167494f5.png#averageHue=%23375669&clientId=ud6a35c9b-55b4-4&from=paste&height=174&id=ud3af17fa&name=image.png&originHeight=157&originWidth=299&originalType=binary&ratio=1&rotation=0&showTitle=false&size=57963&status=done&style=none&taskId=u617f9008-4a34-411a-afb6-791e283bedc&title=&width=332.2222310231058)<br />可以看到，本机（127.0.0.1）有5个端口被占用
:::
### netstat 查看端口占用
:::success
用法： netstat -anp | grep xxx
:::
### ping  测试网络是否联通  
:::success
语法：**ping [-c num] 参数  **<br />选项：-c，检查的次数，不使用 -c 将无限次持续检查<br />参数：被检查的 ip 或主机名
:::
### wget 非交互式文件下载器
:::success
语法：**wget [-b] url**<br />选项：-b，可选，后台下载，会将日志写入到当前工作目录的 wget-log 文件<br />url：下载链接<br />![image.png](https://cdn.nlark.com/yuque/0/2023/png/34929664/1674468679157-e2bd6653-62ec-486b-a549-ba5a9ca39c20.png#averageHue=%23c9c9c5&clientId=ud6a35c9b-55b4-4&from=paste&height=101&id=ub9ab0338&name=image.png&originHeight=91&originWidth=719&originalType=binary&ratio=1&rotation=0&showTitle=false&size=58273&status=done&style=none&taskId=u26dea889-969b-422f-958c-e76a066a91f&title=&width=798.8889100522176)<br />**无论下载是否完成，都会生产要下载的文件，如果下载未完成，请及时清理未完成的不可以文件**
:::
### curl 发送http网络请求
:::success
语法：**curl [-O] url**<br />选项：-O，用于下载文件，当url时下载链接时，可用此选项保存文件<br />url：要发送请求的网络地址
:::
### top 查看主机运行状态
:::success
语法：**top**，查看基础信息<br />选项：<br />-p：只显示某个进程的信息<br />-d：设置刷新时间，默认5s<br />-c：显示产生进程的完整命令，默认时进程名<br />-n：指定刷新次数<br />-b：以非交互式非全屏模式运行，一般配合-n指定输出几次统计信息，将输出重定向到指定文件 <br />如： top -b -n 3 >> /tmp/top.tmp<br />-i：不显示任何闲置或无用的进程<br />-u：查找特定用户启动的进程<br />交互模式可用快捷键：<br />![image.png](https://cdn.nlark.com/yuque/0/2023/png/34929664/1674469156672-a009e8a4-961b-49d2-a9bb-1c49cbc7ee4b.png#averageHue=%23f6f5f5&clientId=ud6a35c9b-55b4-4&from=paste&height=461&id=uf80251c9&name=image.png&originHeight=415&originWidth=735&originalType=binary&ratio=1&rotation=0&showTitle=false&size=131427&status=done&style=none&taskId=u441da059-a08b-41d1-bc5e-d28723965ca&title=&width=816.6666883009457)
:::
### df 查看磁盘占用
:::success
语法：**df [-h]**<br />选项：-h，以更人性化的单位显示
:::
### iostat 查看CPU、磁盘的相关信息
:::success
语法：** iostat [-x] [num1] [num2]**<br />选项：<br />-x：显示更多信息<br />num1：数字，刷新间隔<br />num2：数字，刷新几次<br />![image.png](https://cdn.nlark.com/yuque/0/2023/png/34929664/1674469387552-ababdd58-7ec1-4926-8cfe-9f96ccb725bf.png#averageHue=%23faf8f7&clientId=ud6a35c9b-55b4-4&from=paste&height=173&id=u4c2c1eef&name=image.png&originHeight=156&originWidth=736&originalType=binary&ratio=1&rotation=0&showTitle=false&size=69926&status=done&style=none&taskId=u6d4399d4-3461-4ff4-8d18-2d7a660eb93&title=&width=817.7777994414912)
:::
### sar 查看网络统计
:::success
语法：**sar -n DEV num1 num2**<br />选项：-n，查看网络，DEV表示查看网络接口<br />num1：数字，刷新间隔（不填就一次）<br />num2：数字，查看次数（不填无限次）<br />![image.png](https://cdn.nlark.com/yuque/0/2023/png/34929664/1674469519602-204ad0d7-6c7c-443f-b887-3d624c7a4633.png#averageHue=%23b9b1a9&clientId=ud6a35c9b-55b4-4&from=paste&height=151&id=u7c54c94a&name=image.png&originHeight=136&originWidth=296&originalType=binary&ratio=1&rotation=0&showTitle=false&size=59412&status=done&style=none&taskId=ua49219dc-5698-4884-a782-8ebaf969cee&title=&width=328.8888976014693)
:::
## 4.3 环境变量
:::success
临时设置： **export 变量名=变量值**<br />永久设置：<br />针对用户，设置用户HOME目录内：**.bashrc文件**<br />针对全局，设置**/etc/profile**
:::
## 4.4 PATH变量
:::success
记录了执行程序的搜索路径 <br />可以将自定义路径加入PATH内，实现自定义命令在任意地方均可执行的效果  
:::
## 4.5 $ 符号 取出指定的环境变量的值
:::success
语法：**$变量名** <br />示例： echo $PATH，输出PATH环境变量的值 <br />           echo ${PATH}ABC，输出PATH环境变量的值以及ABC <br />如果变量名和其它内容混淆在一起，可以使用${}  
:::
## 4.6 压缩解压缩
Linux系统中常用压缩格式有：**.tar、.gzip、.zip **<br />.tar，常见为**.tar**，称之为tarball，归档文件，既简单的将文件组装到一个.tar的文件内，并没有太多文件体积的减少，仅仅是简单的封装<br />.gz，也常见为**.tar.gz**，gzip格式压缩文件，即使用gzip压缩算法将文件压缩到一个文件内，可以极大的减少压缩后的体积<br />针对以上两种格式，使用**tar**命令均可以进行压缩和解压缩的操作<br />zip格式则需要使用**zip**命令进行压缩和解压缩的操作
### 4.6.1 压缩
:::success
**.tar、.gzip的压缩**<br />tar [-c -v -x -f -z -C] 要压缩的文件1，要压缩的文件2……要压缩的文件N<br />选项：<br />**-c：**创建压缩文件，用于压缩模式<br />**-v：**显示压缩、解压过程，用于查看进度<br />**-x：**解压模式<br />**-f：**要创建的文件，或要解压的文件，-f必须在所有选项中位置处于最后一个<br />**-z：**gzip模式，不使用-z就是普通的tarball格式<br />**-C：**选择解压的目的地，用于解压模式<br />**tar的常用组合（压缩）**<br />tar -cvf test.tar 1.txt 2.txt 3.txt	将1.txt 2.txt 3.txt压缩到test.tar文件内<br />tar -zcvf test.tar.gz 1.txt 2.txt 3.txt	将1.txt 2.txt 3.txt压缩到test.tar.gz文件内，使用gzip模式<br />**注意：**-z如果使用，需处于选项位第一个。-f必须在选项位最后一个

**.zip的压缩**<br />**使用zip命令，压缩为.zip文件**<br />zip [-r] 参数1 参数2 ……参数N<br />**-r：**被压缩的包含文件夹时，需要用-r选项（和rm命令的-r效果一致）<br />例：<br />zip test.zip a.txt b.txt c.txt	将a.txt b.txt c.txt压缩到test.zip文件内<br />zip -r test.zip test itheima a.txt	将test itheima两个文件夹和 a.txt文件压缩到test.zip文件内
:::
### 4.6.2 解压缩
:::success
**.tar、.gzip的解压缩**<br />tar [-c -v -x -f -z -C] 要解压的文件<br />选项：<br />**-c：**创建压缩文件，用于压缩模式<br />**-v：**显示压缩、解压过程，用于查看进度<br />**-x：**解压模式<br />**-f：**要创建的文件，或要解压的文件，-f必须在所有选项中位置处于最后一个<br />**-z：**gzip模式，不使用-z就是普通的tarball格式<br />**-C：**选择解压的目的地，用于解压模式<br />**tar的常用组合（解压缩）**<br />tar -xvf test.tar	解压test.tar，解压到当前目录<br />tar -xvf test.tar -C .home.itheima	解压test.tar，解压到指定目录（.home.itheima）<br />tar -zxvf test.tar.gz -C .home.itheima	解压test.tar.gz，解压到指定目录（.home.itheima）<br />**注意：**-f必须在最后一位，-z必须在开头，-C必须单独使用和解压所需其他参数分开

**.zip的解压缩**<br />**使用unzip命令，解压.zip的文件**<br />unzip [-d] 参数<br />**-d：**指定解压去的位置（同tar的-C）<br />**参数：**被解压的zip压缩包文件<br />例：<br />unzip test.zip	将test.zip解压到当前目录<br />unzip test.zip -d .home.itheima	将test.zip解压到指定目录（.home.itheima）
:::
# 5、Linux安装软件
## 5.1 Linux安装MySQL
### 5.1.1 Linux安装MySQL5.7、8.0（CentOS）
#### 1、配置 yum 仓库
```bash
# MySQL5.7
# 更新密钥 
rpm --import https://repo.mysql.com/RPM-GPG-KEY-mysql-2022 
# 安装Mysql yum库 
rpm -Uvh http://repo.mysql.com//mysql57-community-release-el7-7.noarch.rpm

# MySQL8.0
# 更新密钥
rpm --import https://repo.mysql.com/RPM-GPG-KEY-mysql-2022
# 安装Mysql8.x版本 yum库
rpm -Uvh https://dev.mysql.com/get/mysql80-community-release-el7-2.noarch.rpm
```
![image.png](https://cdn.nlark.com/yuque/0/2023/png/34929664/1674478619187-c10e74cf-b737-41f5-8958-dcc6b309a08c.png#averageHue=%232f4c5f&clientId=u5f80e854-4e89-4&from=paste&height=125&id=u5600db19&name=image.png&originHeight=125&originWidth=700&originalType=binary&ratio=1&rotation=0&showTitle=false&size=136510&status=done&style=none&taskId=u62f0c6a6-c80e-4cfd-baa4-a8b6fddeb61&title=&width=700)
#### 2、使用yum安装MySQL  
```bash
# yum安装Mysql5.7
yum -y install mysql-community-server

# yum安装Mysql8.0
yum -y install mysql-community-server
```
![image.png](https://cdn.nlark.com/yuque/0/2023/png/34929664/1674478706398-17f50d6b-59e7-495e-a201-0a4526ee8f69.png#averageHue=%232e495b&clientId=u5f80e854-4e89-4&from=paste&height=357&id=u1e6c34d6&name=image.png&originHeight=357&originWidth=651&originalType=binary&ratio=1&rotation=0&showTitle=false&size=255250&status=done&style=none&taskId=ub06a05a5-c879-43c5-bcf0-6cea67f2450&title=&width=651)
#### 3、安装完成后，启动MySQL并配置开机自启
```bash
# 5.7   8.0   同
systemctl start mysqld # 启动
systemctl enable mysqld # 开机自启
```
#### 4、检查MySQL运行状态
```bash
# 5.7   8.0   同
systemctl status mysqld
```
![image.png](https://cdn.nlark.com/yuque/0/2023/png/34929664/1674478815186-7d73c7a2-b8aa-49bb-8ec8-d14ce8ab06c5.png#averageHue=%23233b4d&clientId=u5f80e854-4e89-4&from=paste&height=209&id=u7bf3ddc3&name=image.png&originHeight=209&originWidth=702&originalType=binary&ratio=1&rotation=0&showTitle=false&size=205297&status=done&style=none&taskId=u821c886d-ac25-4971-9eae-19da5e41485&title=&width=702)
#### 5、获取MySQL的初始密码
```bash
# 通过grep命令，在/var/log/mysqld.log文件中，过滤temporary password关键字，得到初始密码
# 5.7   8.0   同
grep 'temporary password' /var/log/mysqld.log
```
![image.png](https://cdn.nlark.com/yuque/0/2023/png/34929664/1674479058324-dd719c6a-4de0-47c9-adeb-ff002334174d.png#averageHue=%23253949&clientId=u5f80e854-4e89-4&from=paste&height=34&id=u2991c417&name=image.png&originHeight=34&originWidth=703&originalType=binary&ratio=1&rotation=0&showTitle=false&size=35546&status=done&style=none&taskId=u7db2fa2e-85ad-4aa8-a6ad-9591514df00&title=&width=703)
#### 6、登陆MySQL数据库系统
```bash
# 5.7   8.0   同
# 执行
mysql -uroot -p
# 解释
# -u，登陆的用户，MySQL数据库的管理员用户同Linux一样，是root
# -p，表示使用密码登陆
# 执行完毕后输入刚刚得到的初始密码，即可进入MySQL数据库
```
![image.png](https://cdn.nlark.com/yuque/0/2023/png/34929664/1674479140946-a78a517d-b5e8-4c9b-ad60-507fe5df89d5.png#averageHue=%232c4a5f&clientId=u5f80e854-4e89-4&from=paste&height=312&id=u9fcad85a&name=image.png&originHeight=312&originWidth=699&originalType=binary&ratio=1&rotation=0&showTitle=false&size=247997&status=done&style=none&taskId=uddba176c-b125-4450-b334-e5c580c1360&title=&width=699)
#### 7、修改root用户密码
```sql
-- 在MySQL控制台内执行
-- 5.7
ALTER USER 'root'@'localhost' IDENTIFIED BY '密码';
-- 密码需要符合：大于8位，有大写字母，有特殊符号，不能是连续的简单语句如123，abc

-- 配置root的简单密码
-- 如果你想设置简单密码，需要降低Mysql的密码安全级别
set global validate_password_policy=LOW; -- 密码安全级别低
set global validate_password_length=4; -- 密码长度最低4位即可
-- 然后就可以用简单密码了
ALTER USER 'root'@'localhost' IDENTIFIED BY '简单密码';

-- 8.0
ALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password BY '密码'; 
-- 密码需要符合：大于8位，有大写字母，有特殊符号，不能是连续的简单语句如123，abc

-- 配置root的简单密码
set global validate_password.policy=0; -- 密码安全级别低
set global validate_password.length=4; -- 密码长度最低4位即可
-- 然后就可以用简单密码了
ALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password BY '密码';
```
#### 8、配置root运行远程登录
```sql
-- 5.7
-- 授权root远程登录
grant all privileges on *.* to root@"IP地址" identified by '密码' with grant option;
-- IP地址即允许登陆的IP地址，也可以填写%，表示允许任何地址
-- 密码表示给远程登录独立设置密码，和本地登陆的密码可以不同

-- 刷新权限，生效
flush privileges;

-- 8.0
-- 第一次设置root远程登录，并配置远程密码使用如下SQL命令
create user 'root'@'%' IDENTIFIED WITH mysql_native_password BY '密码!'; 
-- 密码需要符合：大于8位，有大写字母，有特殊符号，不能是连续的简单语句如123，abc
-- 后续修改密码使用如下SQL命令
ALTER USER 'root'@'%' IDENTIFIED WITH mysql_native_password BY '密码';
```
#### 9、退出MySQL控制台页面  
```sql
-- 5.7   8.0   同
-- 退出命令 或 ctrl+d
exit
```
#### 10、检查端口
```sql
-- 5.7   8.0   同
-- MySQL默认绑定了3306端口，可以通过端口占用检查MySQL的网络状态
netstat -anp | grep 3306
```
![image.png](https://cdn.nlark.com/yuque/0/2023/png/34929664/1674479700054-b84d58cc-f9fd-4276-a0ab-258667b49278.png#averageHue=%23304e62&clientId=u5f80e854-4e89-4&from=paste&height=71&id=u475897cb&name=image.png&originHeight=71&originWidth=703&originalType=binary&ratio=1&rotation=0&showTitle=false&size=64968&status=done&style=none&taskId=uda609dfe-1b32-4946-8d8d-d8d7e14b3ac&title=&width=703)<br />![image.png](https://cdn.nlark.com/yuque/0/2023/png/34929664/1674480136814-67c9872d-9856-4076-a450-4d6547680982.png#averageHue=%232c495c&clientId=u5f80e854-4e89-4&from=paste&height=121&id=u100697c4&name=image.png&originHeight=121&originWidth=704&originalType=binary&ratio=1&rotation=0&showTitle=false&size=107257&status=done&style=none&taskId=u6a67f310-ce20-43ec-9e6f-fe8fd0b28c3&title=&width=704)
