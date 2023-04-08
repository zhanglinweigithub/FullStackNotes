# 目录

[[toc]]

## CentOS7安装Docker

Docker CE 支持 64 位版本 CentOS 7，并且要求内核版本不低于 3.10， CentOS 7 满足最低内核的要求，所以我们在CentOS 7安装Docker。
### 卸载（可选）

如果之前安装过旧版本的Docker，可以使用下面命令卸载：
```bash
yum remove docker \
                  docker-client \
                  docker-client-latest \
                  docker-common \
                  docker-latest \
                  docker-latest-logrotate \
                  docker-logrotate \
                  docker-selinux \
                  docker-engine-selinux \
                  docker-engine \
                  docker-ce
```
### 安装Docker
首先需要大家虚拟机联网，安装yum工具
```bash
yum install -y yum-utils \
           device-mapper-persistent-data \
           lvm2 --skip-broken
```
然后更新本地镜像源
```bash
# 设置docker镜像源
yum-config-manager \
    --add-repo \
    https://mirrors.aliyun.com/docker-ce/linux/centos/docker-ce.repo
    
sed -i 's/download.docker.com/mirrors.aliyun.com\/docker-ce/g' /etc/yum.repos.d/docker-ce.repo

yum makecache fast
```
安装Docker
```bash
yum install -y docker-ce
```
docker-ce为社区免费版本。稍等片刻，docker即可安装成功。
### 启动Docker
Docker应用需要用到各种端口，逐一去修改防火墙设置。非常麻烦，因此建议大家直接关闭防火墙！
```bash
# 关闭
systemctl stop firewalld
# 禁止开机启动防火墙
systemctl disable firewalld

# 开端口  6379为例
firewall-cmd --zone=public --add-port=6379/tcp --permanent
# 重启防火墙使配置生效
systemctl restart firewalld
```
通过命令启动docker
```bash
systemctl start docker  # 启动docker服务

systemctl stop docker  # 停止docker服务

systemctl restart docker  # 重启docker服务
```
可以查看docker版本
```bash
docker -v
```
### 配置镜像加速
docker官方镜像仓库网速较差，我们需要设置国内镜像服务：

参考阿里云的镜像加速文档：[https://cr.console.aliyun.com/cn-hangzhou/instances/mirrors](https://cr.console.aliyun.com/cn-hangzhou/instances/mirrors)

