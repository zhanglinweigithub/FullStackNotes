# 目录

[[toc]]

# Docker镜像仓库

搭建镜像仓库可以基于`Docker`官方提供的`DockerRegistry`来实现。

官网地址：[https://hub.docker.com/_/registry](https://hub.docker.com/_/registry)

## 搭建私有镜像仓库

### 简化版镜像仓库
`Docker`官方的`Docker Registry`是一个基础版本的`Docker`镜像仓库，具备仓库管理的完整功能，但是没有图形化界面。

搭建方式比较简单，命令如下

```bash
docker run -d \
    --restart=always \
    --name registry	\
    -p 5000:5000 \
    -v registry-data:/var/lib/registry \
    registry
```
命令中挂载了一个数据卷`registry-data`到容器内的`/var/lib/registry` 目录，这是私有镜像库存放数据的目录。

访问[http://YourIp:5000/v2/_catalog](http://YourIp:5000/v2/_catalog) 可以查看当前私有镜像服务中包含的镜像

### 带有图形化界面版本
使用`DockerCompose`部署带有图象界面的`DockerRegistry`
```bash
version: '3.0'
services:
  registry:
    image: registry
    volumes:
      - ./registry-data:/var/lib/registry
  ui:
    image: joxit/docker-registry-ui:static
    ports:
      - 8080:80
    environment:
      - REGISTRY_TITLE=我的私有仓库
      - REGISTRY_URL=http://registry:5000
    depends_on:
      - registry
```
### 配置Docker信任地址

我们的私服采用的是`http`协议，默认不被`Docker`信任，所以需要做一个配置：
```bash
# 打开要修改的文件
vi /etc/docker/daemon.json
# 添加内容：
"insecure-registries":["http://192.168.150.101:8080"]
# 重加载
systemctl daemon-reload
# 重启docker
systemctl restart docker
```
## 推送、拉取镜像

推送镜像到私有镜像服务必须先`tag`

① 重新`tag`本地镜像，名称前缀为私有仓库的地址：192.168.150.101:8080/

```bash
docker tag nginx:latest 192.168.150.101:8080/nginx:1.0 
```

② 推送镜像

```bash
docker push 192.168.150.101:8080/nginx:1.0 
```

③ 拉取镜像

```bash
docker pull 192.168.150.101:8080/nginx:1.0 
```
