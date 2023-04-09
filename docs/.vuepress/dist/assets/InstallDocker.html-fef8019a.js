import{_ as r,M as i,p as d,q as t,R as e,N as s,V as c,t as n,a1 as o}from"./framework-5866ffd3.js";const p={},u=e("h1",{id:"目录",tabindex:"-1"},[e("a",{class:"header-anchor",href:"#目录","aria-hidden":"true"},"#"),n(" 目录")],-1),m={class:"table-of-contents"},v=o(`<h2 id="centos7安装docker" tabindex="-1"><a class="header-anchor" href="#centos7安装docker" aria-hidden="true">#</a> CentOS7安装Docker</h2><p>Docker CE 支持 64 位版本 CentOS 7，并且要求内核版本不低于 3.10， CentOS 7 满足最低内核的要求，所以我们在CentOS 7安装Docker。</p><h3 id="卸载-可选" tabindex="-1"><a class="header-anchor" href="#卸载-可选" aria-hidden="true">#</a> 卸载（可选）</h3><p>如果之前安装过旧版本的Docker，可以使用下面命令卸载：</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>yum remove <span class="token function">docker</span> <span class="token punctuation">\\</span>
                  docker-client <span class="token punctuation">\\</span>
                  docker-client-latest <span class="token punctuation">\\</span>
                  docker-common <span class="token punctuation">\\</span>
                  docker-latest <span class="token punctuation">\\</span>
                  docker-latest-logrotate <span class="token punctuation">\\</span>
                  docker-logrotate <span class="token punctuation">\\</span>
                  docker-selinux <span class="token punctuation">\\</span>
                  docker-engine-selinux <span class="token punctuation">\\</span>
                  docker-engine <span class="token punctuation">\\</span>
                  docker-ce
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="安装docker" tabindex="-1"><a class="header-anchor" href="#安装docker" aria-hidden="true">#</a> 安装Docker</h3><p>首先需要大家虚拟机联网，安装yum工具</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>yum <span class="token function">install</span> <span class="token parameter variable">-y</span> yum-utils <span class="token punctuation">\\</span>
           device-mapper-persistent-data <span class="token punctuation">\\</span>
           lvm2 --skip-broken
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>然后更新本地镜像源</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token comment"># 设置docker镜像源</span>
yum-config-manager <span class="token punctuation">\\</span>
    --add-repo <span class="token punctuation">\\</span>
    https://mirrors.aliyun.com/docker-ce/linux/centos/docker-ce.repo
    
<span class="token function">sed</span> <span class="token parameter variable">-i</span> <span class="token string">&#39;s/download.docker.com/mirrors.aliyun.com\\/docker-ce/g&#39;</span> /etc/yum.repos.d/docker-ce.repo

yum makecache fast
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>安装Docker</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>yum <span class="token function">install</span> <span class="token parameter variable">-y</span> docker-ce
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>docker-ce为社区免费版本。稍等片刻，docker即可安装成功。</p><h3 id="启动docker" tabindex="-1"><a class="header-anchor" href="#启动docker" aria-hidden="true">#</a> 启动Docker</h3><p>Docker应用需要用到各种端口，逐一去修改防火墙设置。非常麻烦，因此建议大家直接关闭防火墙！</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token comment"># 关闭</span>
systemctl stop firewalld
<span class="token comment"># 禁止开机启动防火墙</span>
systemctl disable firewalld

<span class="token comment"># 开端口  6379为例</span>
firewall-cmd <span class="token parameter variable">--zone</span><span class="token operator">=</span>public --add-port<span class="token operator">=</span><span class="token number">6379</span>/tcp <span class="token parameter variable">--permanent</span>
<span class="token comment"># 重启防火墙使配置生效</span>
systemctl restart firewalld
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>通过命令启动docker</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>systemctl start <span class="token function">docker</span>  <span class="token comment"># 启动docker服务</span>

systemctl stop <span class="token function">docker</span>  <span class="token comment"># 停止docker服务</span>

systemctl restart <span class="token function">docker</span>  <span class="token comment"># 重启docker服务</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>可以查看docker版本</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token function">docker</span> <span class="token parameter variable">-v</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h3 id="配置镜像加速" tabindex="-1"><a class="header-anchor" href="#配置镜像加速" aria-hidden="true">#</a> 配置镜像加速</h3><p>docker官方镜像仓库网速较差，我们需要设置国内镜像服务：</p>`,22),k={href:"https://cr.console.aliyun.com/cn-hangzhou/instances/mirrors",target:"_blank",rel:"noopener noreferrer"};function b(h,g){const a=i("router-link"),l=i("ExternalLinkIcon");return d(),t("div",null,[u,e("nav",m,[e("ul",null,[e("li",null,[s(a,{to:"#centos7安装docker"},{default:c(()=>[n("CentOS7安装Docker")]),_:1}),e("ul",null,[e("li",null,[s(a,{to:"#卸载-可选"},{default:c(()=>[n("卸载（可选）")]),_:1})]),e("li",null,[s(a,{to:"#安装docker"},{default:c(()=>[n("安装Docker")]),_:1})]),e("li",null,[s(a,{to:"#启动docker"},{default:c(()=>[n("启动Docker")]),_:1})]),e("li",null,[s(a,{to:"#配置镜像加速"},{default:c(()=>[n("配置镜像加速")]),_:1})])])])])]),v,e("p",null,[n("参考阿里云的镜像加速文档："),e("a",k,[n("https://cr.console.aliyun.com/cn-hangzhou/instances/mirrors"),s(l)])])])}const _=r(p,[["render",b],["__file","InstallDocker.html.vue"]]);export{_ as default};
