# 目录

[[toc]]

## 第一次提交到GitHub

### 1、登录`Github`

`github`的官方网址：https://github.com 

点击`Sign in`进入登录界面，输入账号和密码登入`github`

![image-20230409223205368](D:\FullStackNotes\docs\guide\Git\img\image-20230409223205368.png)

### 2、创建一个仓库

![image-20230409223329183](D:\FullStackNotes\docs\guide\Git\img\image-20230409223329183.png)

![image-20230409223352508](D:\FullStackNotes\docs\guide\Git\img\image-20230409223352508.png)

这里可以看到仓库地址

![image-20230409223455525](D:\FullStackNotes\docs\guide\Git\img\image-20230409223455525.png)

### 3、安装Git客户端

下载地址：https://git-scm.com/downloads

选择自己对应系统下载

![image-20230409223616489](D:\FullStackNotes\docs\guide\Git\img\image-20230409223616489.png)

傻瓜式安装，一直下一步

::: warning

安装路径，千万别选带中文的路径

:::

### 4、绑定用户

在你的项目文件夹所在的地址右键点击，弹出窗口

![image-20230409223801347](D:\FullStackNotes\docs\guide\Git\img\image-20230409223801347.png)

### 5、配置Git

~~~bash
git config --global user.name "你的用户名"

git config --global user.email "你的邮箱" 
~~~

### 6、生成SSH key

首先检查是否已生成密钥 

~~~bash
cd ~/.ssh
ls
~~~

如果有3个文件，则密钥已经生成，`id_rsa.pub`就是

![image-20230409224051124](D:\FullStackNotes\docs\guide\Git\img\image-20230409224051124.png)

如果没有

~~~bash
ssh-keygen -t rsa -C "你的邮箱"
~~~

一直按回车

![image-20230409224112678](D:\FullStackNotes\docs\guide\Git\img\image-20230409224112678.png)

### 7、复制SSH key

~~~bash
clip < ~/.ssh/id_rsa.pub
~~~

或者

`c/Users/Administrator/.ssh/id_rsa`文件找到直接复制

### 8、连接`github`

打开`GitHub` 进入`setting`找到`ssh key`并新建

![image-20230409224255533](D:\FullStackNotes\docs\guide\Git\img\image-20230409224255533.png)

![image-20230409224312529](D:\FullStackNotes\docs\guide\Git\img\image-20230409224312529.png)

![image-20230409224324587](D:\FullStackNotes\docs\guide\Git\img\image-20230409224324587.png)

### 9、测试连接

~~~bash
ssh -T git@github.com 
~~~

![image-20230409224357490](D:\FullStackNotes\docs\guide\Git\img\image-20230409224357490.png)

### 10、提交

进入本地要提交项目文件的的所在位置右键点击打开`Git Bash Here`

然后依次执行

~~~bash
git init   

git add .

git commit -m "提交描述"

git remote add origin 你的仓库地址

git push -u origin master    
~~~

最后我们就可以在`GitHub`的仓库上看到我们提交上去的代码了

![image-20230409224552642](D:\FullStackNotes\docs\guide\Git\img\image-20230409224552642.png)

::: tip

如果你弹出了对话框，请往后看

:::

如果弹出如下对话框，并提示`Logon failed, use ctrl+c to cancel basic credential prompt.`

![image-20230409224634451](D:\FullStackNotes\docs\guide\Git\img\image-20230409224634451.png)

![image-20230409224659369](D:\FullStackNotes\docs\guide\Git\img\image-20230409224659369.png)

![image-20230409224704960](D:\FullStackNotes\docs\guide\Git\img\image-20230409224704960.png)

先在网页端登录`GitHub`,点击右上角头像–> `setting` --> `Developer settings` --> `Personal access tokens`页面

![image-20230409224805170](D:\FullStackNotes\docs\guide\Git\img\image-20230409224805170.png)

点击新建 `genrate new token`

![image-20230409224825744](D:\FullStackNotes\docs\guide\Git\img\image-20230409224825744.png)

勾选 `gist` 、`user` 、`workflow`

![image-20230409224929951](D:\FullStackNotes\docs\guide\Git\img\image-20230409224929951.png)

新建完成,页面已经有一个新的`token`,复制这个`token`

::: warning

页面刷新后这个`token`就看不见了,一定要保存好

:::

回到`git bash` 继续提交,在`githup`登陆弹出框中输入账号密码,第一次输入的是你`githup`的账号密码

第二次弹出后输入`git`账号,密码换成刚刚生成的`token`.

即可推送成功
