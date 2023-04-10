---
title: CentOS安装DockerCompose
---
# 目录

[[toc]]

## CentOS安装DockerCompose

### 下载

Linux下需要通过命令下载

```bash
# 安装
curl -L https://github.com/docker/compose/releases/download/1.23.1/docker-compose-`uname -s`-`uname -m` > /usr/local/bin/docker-compose
```

也可以手动上传到 /usr/local/bin/ 目录

### 修改文件权限

```bash
# 修改权限
chmod +x /usr/local/bin/docker-compose
```

### Base自动补全命令

```bash
# 补全命令
curl -L https://raw.githubusercontent.com/docker/compose/1.29.1/contrib/completion/bash/docker-compose > /etc/bash_completion.d/docker-compose

# 如果这里出现错误，需要修改自己的hosts文件
echo "199.232.68.133 raw.githubusercontent.com" >> /etc/hosts
```

