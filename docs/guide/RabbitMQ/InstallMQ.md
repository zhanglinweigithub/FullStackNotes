# 目录

[[toc]]



## 下载镜像

方式一：在线拉取

``` sh
docker pull rabbitmq:3.8-management
```



方式二：从本地加载

上传到虚拟机中后，使用命令加载镜像即可：

```sh
docker load -i mq.tar
```



## 安装MQ

执行下面的命令来运行MQ容器：

```sh
docker run \
 -e RABBITMQ_DEFAULT_USER=itcast \
 -e RABBITMQ_DEFAULT_PASS=123321 \
 -v mq-plugins:/plugins \
 --name mq \
 --hostname mq1 \
 -p 15672:15672 \
 -p 5672:5672 \
 -d \
 rabbitmq:3.8-management
```

