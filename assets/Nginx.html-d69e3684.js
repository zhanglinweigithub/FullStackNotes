import{_ as o,M as t,p as d,q as p,R as s,t as n,N as e,V as i,a1 as c}from"./framework-5866ffd3.js";const r="/FullStackNotes/assets/image-20230421184407625-dea14e19.png",u="/FullStackNotes/assets/image-20230421184613003-35aad0cd.png",v="/FullStackNotes/assets/image-20230421201710126-961ae74f.png",m="/FullStackNotes/assets/image-20230421202553823-e628d4ac.png",k="/FullStackNotes/assets/image-20230421205035547-b9d24a44.png",b="/FullStackNotes/assets/image-20230421222921610-23b5a372.png",g="/FullStackNotes/assets/image-20230421223314543-2a26867a.png",h="/FullStackNotes/assets/image-20230421223543668-da4f9cf1.png",x="/FullStackNotes/assets/image-20230421223741487-4424cb22.png",_="/FullStackNotes/assets/image-20230421225049093-6472205e.png",y="/FullStackNotes/assets/image-20230421225322556-5199ed25.png",w="/FullStackNotes/assets/image-20230422125129617-9ffe22a7.png",f="/FullStackNotes/assets/1676615032968-3277c0f5-4ddc-4fd8-93db-bf89628ce4c8-e4056409.png",N="/FullStackNotes/assets/image-20230422125344713-19ccd23b.png",q="/FullStackNotes/assets/image-20230422125422165-64728d8e.png",E={},$=c('<h1 id="nginx" tabindex="-1"><a class="header-anchor" href="#nginx" aria-hidden="true">#</a> Nginx</h1><p>Nginx 擅长于底层服务器端资源的处理（静态资源处理转发、反向代理，负载均衡等）， <code>Node.js</code> 更擅长上层具体业务逻辑的处理，两者可以完美组合。</p><p>Nginx 是开源、高性能、高可靠的 Web 和反向代理服务器，而且支持热部署，几乎可以做到 <code>7 * 24</code> 小时不间断运行，即使运行几个月也不需要重新启动，还能在不间断服务的情况下对软件版本进行热更新。</p><p><strong>优点：</strong></p><ol><li><strong>占用内存少</strong></li><li><strong>并发能力强，性能高</strong></li><li><strong>能支持高达 5w 个并发连接数</strong></li><li><strong>最重要的是， Nginx 是免费的并可以商业化</strong></li><li><strong>配置使用较简单</strong></li><li><strong>热部署</strong></li></ol><p><strong>作用：</strong></p><p>Nginx 的最重要的几个使用场景：</p><ol><li>静态资源服务，通过本地文件系统提供服务；</li><li>反向代理服务，延伸出包括缓存、负载均衡等；</li><li>API 服务， OpenResty ；</li></ol><p><img src="'+r+`" alt="image-20230421184407625"></p><h2 id="一、概述" tabindex="-1"><a class="header-anchor" href="#一、概述" aria-hidden="true">#</a> 一、概述</h2><h3 id="安装" tabindex="-1"><a class="header-anchor" href="#安装" aria-hidden="true">#</a> 安装</h3><p>基于 <code>Linux centOS 7.x</code></p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>yum <span class="token function">install</span> nginx <span class="token parameter variable">-y</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p><strong>查看安装信息</strong></p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token comment"># 查看安装信息</span>
<span class="token function">rpm</span> <span class="token parameter variable">-ql</span> nginx

<span class="token comment"># Nginx配置文件</span>
/etc/nginx/nginx.conf <span class="token comment"># nginx 主配置文件</span>
/etc/nginx/nginx.conf.default

<span class="token comment"># 可执行程序文件</span>
/usr/bin/nginx-upgrade
/usr/sbin/nginx

<span class="token comment"># nginx库文件</span>
/usr/lib/systemd/system/nginx.service <span class="token comment"># 用于配置系统守护进程</span>
/usr/lib64/nginx/modules <span class="token comment"># Nginx模块目录</span>

<span class="token comment"># 帮助文档</span>
/usr/share/doc/nginx-1.16.1
/usr/share/doc/nginx-1.16.1/CHANGES
/usr/share/doc/nginx-1.16.1/README
/usr/share/doc/nginx-1.16.1/README.dynamic
/usr/share/doc/nginx-1.16.1/UPGRADE-NOTES-1.6-to-1.10

<span class="token comment"># 静态资源目录</span>
/usr/share/nginx/html/404.html
/usr/share/nginx/html/50x.html
/usr/share/nginx/html/index.html

<span class="token comment"># 存放Nginx日志文件</span>
/var/log/nginx
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="反向代理" tabindex="-1"><a class="header-anchor" href="#反向代理" aria-hidden="true">#</a> 反向代理</h3><p>反向代理（Reverse Proxy）方式是指以代理服务器来接受 Internet 上的连接请求，然后将请求转发给内部网络上的服务器，并将从服务器上得到的结果返回给 Internet 上请求连接的客户端，此时代理服务器对外就表现为一个反向代理服务器。</p><p><img src="`+u+`" alt="image-20230421184613003"></p><h2 id="二、常用命令" tabindex="-1"><a class="header-anchor" href="#二、常用命令" aria-hidden="true">#</a> 二、常用命令</h2><h3 id="systemctl系统命令" tabindex="-1"><a class="header-anchor" href="#systemctl系统命令" aria-hidden="true">#</a> systemctl系统命令</h3><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token comment"># 开机配置</span>
systemctl <span class="token builtin class-name">enable</span> nginx <span class="token comment"># 开机自动启动</span>
systemctl disable nginx <span class="token comment"># 关闭开机自动启动</span>

<span class="token comment"># 启动Nginx</span>
systemctl start nginx <span class="token comment"># 启动Nginx成功后，可以直接访问主机IP，此时会展示Nginx默认页面</span>

<span class="token comment"># 停止Nginx</span>
systemctl stop nginx

<span class="token comment"># 重启Nginx</span>
systemctl restart nginx

<span class="token comment"># 重新加载Nginx</span>
systemctl reload nginx

<span class="token comment"># 查看 Nginx 运行状态</span>
systemctl status nginx

<span class="token comment"># 查看Nginx进程</span>
<span class="token function">ps</span> <span class="token parameter variable">-ef</span> <span class="token operator">|</span> <span class="token function">grep</span> nginx

<span class="token comment"># 杀死Nginx进程</span>
<span class="token function">kill</span> <span class="token parameter variable">-9</span> pid <span class="token comment"># 根据上面查看到的Nginx进程号，杀死Nginx进程，-9 表示强制结束进程</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="nginx-应用程序命令" tabindex="-1"><a class="header-anchor" href="#nginx-应用程序命令" aria-hidden="true">#</a> Nginx 应用程序命令</h3><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>nginx <span class="token parameter variable">-s</span> stop       <span class="token comment"># 快速关闭Nginx，可能不保存相关信息，并迅速终止web服务。</span>
nginx <span class="token parameter variable">-s</span> quit       <span class="token comment"># 平稳关闭Nginx，保存相关信息，有安排的结束web服务。</span>
nginx <span class="token parameter variable">-s</span> reload     <span class="token comment"># 重新加载配置文件</span>
nginx <span class="token parameter variable">-s</span> reopen     <span class="token comment"># 重新打开日志文件。</span>
nginx <span class="token parameter variable">-c</span> filename   <span class="token comment"># 为 Nginx 指定一个配置文件，来代替缺省的。</span>
nginx <span class="token parameter variable">-t</span>            <span class="token comment"># 不运行，仅仅测试配置文件。nginx 将检查配置文件的语法的正确性，并尝试打开配置文件中所引用到的文件。</span>
nginx <span class="token parameter variable">-v</span>            <span class="token comment"># 显示 nginx 的版本。</span>
nginx <span class="token parameter variable">-V</span>            <span class="token comment"># 显示 nginx 的版本，编译器版本和配置参数。</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="三、配置" tabindex="-1"><a class="header-anchor" href="#三、配置" aria-hidden="true">#</a> 三、配置</h2>`,24),z={href:"https://blog.redis.com.cn/doc/",target:"_blank",rel:"noopener noreferrer"},R=c(`<h3 id="经典配置示例" tabindex="-1"><a class="header-anchor" href="#经典配置示例" aria-hidden="true">#</a> 经典配置示例</h3><div class="language-nginx line-numbers-mode" data-ext="nginx"><pre class="language-nginx"><code><span class="token comment"># main段配置信息</span>
<span class="token comment"># 运行用户，默认即是nginx，可以不进行设置</span>
<span class="token comment"># user nginx;</span>

<span class="token comment"># Nginx 进程数，一般设置为和 CPU 核数一样</span>
<span class="token directive"><span class="token keyword">worker_processes</span>  <span class="token number">1</span></span><span class="token punctuation">;</span>

<span class="token comment"># 全局错误日志 Nginx 的错误日志存放目录</span>
<span class="token comment"># debug--调试消息、info--信息性消息、notice--公告、warn--警告、error--处理请求时出错</span>
<span class="token comment"># crit--关键问题，需要立即采取行动、alert--警报，必须立即采取行动、emerg--紧急情况，系统处于无法使用的状态</span>
<span class="token directive"><span class="token keyword">error_log</span>  /var/log/nginx/error.log warn</span><span class="token punctuation">;</span>   
<span class="token directive"><span class="token keyword">error_log</span>  /var/log/nginx/error.log info</span><span class="token punctuation">;</span>  
<span class="token directive"><span class="token keyword">error_log</span>  /var/log/nginx/error.log notice</span><span class="token punctuation">;</span>  

<span class="token comment">#PID文件，Nginx 服务启动时的 pid 存放位置</span>
<span class="token directive"><span class="token keyword">pid</span>        /var/run/nginx.pid</span><span class="token punctuation">;</span>


<span class="token comment"># events段配置信息</span>
<span class="token directive"><span class="token keyword">events</span></span> <span class="token punctuation">{</span>
    <span class="token comment"># 使用epoll的I/O模型(如果你不知道Nginx该使用哪种轮询方法，会自动选择一个最适合你操作系统的)</span>
    <span class="token directive"><span class="token keyword">use</span> epoll</span><span class="token punctuation">;</span>     
    <span class="token directive"><span class="token keyword">worker_connections</span> <span class="token number">1024</span></span><span class="token punctuation">;</span>    <span class="token comment"># 每个进程允许最大并发数</span>
<span class="token punctuation">}</span>


<span class="token comment"># http段配置信息</span>
<span class="token comment"># 配置使用最频繁的部分，代理、缓存、日志定义等绝大多数功能和第三方模块的配置都在这里设置</span>
<span class="token directive"><span class="token keyword">http</span></span> <span class="token punctuation">{</span>
    <span class="token comment">#设定mime类型(邮件支持类型),类型由mime.types文件定义</span>
    <span class="token directive"><span class="token keyword">include</span>             /etc/nginx/mime.types</span><span class="token punctuation">;</span>      <span class="token comment"># 文件扩展名与类型映射表</span>
    <span class="token directive"><span class="token keyword">default_type</span>  application/octet-stream</span><span class="token punctuation">;</span> <span class="token comment"># 默认文件类型</span>

    <span class="token comment">#设定日志</span>
    <span class="token directive"><span class="token keyword">log_format</span>  main  <span class="token string">&#39;[<span class="token variable">$remote_addr]</span> - [<span class="token variable">$remote_user]</span> [<span class="token variable">$time_local]</span> &quot;<span class="token variable">$request</span>&quot; &#39;</span>
                      <span class="token string">&#39;<span class="token variable">$status</span> <span class="token variable">$body_bytes_sent</span> &quot;<span class="token variable">$http_referer</span>&quot; &#39;</span>
                      <span class="token string">&#39;&quot;<span class="token variable">$http_user_agent</span>&quot; &quot;<span class="token variable">$http_x_forwarded_for</span>&quot;&#39;</span></span><span class="token punctuation">;</span>

    <span class="token directive"><span class="token keyword">access_log</span>  /var/log/nginx/access.log  main</span><span class="token punctuation">;</span>   <span class="token comment"># Nginx访问日志存放位置</span>
    <span class="token directive"><span class="token keyword">rewrite_log</span>     <span class="token boolean">on</span></span><span class="token punctuation">;</span>

    <span class="token comment">#sendfile 指令指定 nginx 是否调用 sendfile 函数（zero copy 方式）来输出文件，对于普通应用，</span>
    <span class="token comment">#必须设为 on,如果用来进行下载等应用磁盘IO重负载应用，可设置为 off，以平衡磁盘与网络I/O处理速度，降低系统的uptime.</span>
    <span class="token directive"><span class="token keyword">sendfile</span>        <span class="token boolean">on</span></span><span class="token punctuation">;</span> <span class="token comment"># 开启高效传输模式</span>
    <span class="token directive"><span class="token keyword">tcp_nopush</span>     <span class="token boolean">on</span></span><span class="token punctuation">;</span> <span class="token comment"># 减少网络报文段的数量</span>

    <span class="token comment">#连接超时时间</span>
    <span class="token directive"><span class="token keyword">keepalive_timeout</span>  <span class="token number">120</span></span><span class="token punctuation">;</span>
    <span class="token directive"><span class="token keyword">tcp_nodelay</span>        <span class="token boolean">on</span></span><span class="token punctuation">;</span>
	<span class="token directive"><span class="token keyword">types_hash_max_size</span> <span class="token number">2048</span></span><span class="token punctuation">;</span>
    
    <span class="token comment"># include /etc/nginx/conf.d/*.conf;   # 加载子配置项</span>
        
    <span class="token comment">#gzip压缩开关</span>
    <span class="token comment">#gzip  on;</span>

    <span class="token comment">#设定实际的服务器列表 (后端地址)</span>
    <span class="token directive"><span class="token keyword">upstream</span> zp_server1</span><span class="token punctuation">{</span>
        <span class="token directive"><span class="token keyword">server</span> 127.0.0.1:8089</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token comment"># server段配置信息</span>
    <span class="token comment">#HTTP服务器</span>
    <span class="token directive"><span class="token keyword">server</span></span> <span class="token punctuation">{</span>
        <span class="token comment"># 配置监听的端口</span>
        <span class="token directive"><span class="token keyword">listen</span>       <span class="token number">80</span></span><span class="token punctuation">;</span>
        <span class="token comment"># 配置的域名</span>
        <span class="token directive"><span class="token keyword">server_name</span>  www.helloworld.com</span><span class="token punctuation">;</span>

        <span class="token comment"># 首页</span>
        <span class="token directive"><span class="token keyword">index</span> index.html

        <span class="token comment"># 指向webapp的目录</span>
        <span class="token comment"># root D:\\01_Workspace\\Project\\github\\zp\\SpringNotes\\spring-security\\spring-shiro\\src\\main\\webapp;</span>

        <span class="token comment"># 编码格式</span>
        charset utf-8</span><span class="token punctuation">;</span>

        <span class="token comment">#代理配置参数</span>
        <span class="token directive"><span class="token keyword">proxy_connect_timeout</span> <span class="token number">180</span></span><span class="token punctuation">;</span>
        <span class="token directive"><span class="token keyword">proxy_send_timeout</span> <span class="token number">180</span></span><span class="token punctuation">;</span>
        <span class="token directive"><span class="token keyword">proxy_read_timeout</span> <span class="token number">180</span></span><span class="token punctuation">;</span>
        <span class="token directive"><span class="token keyword">proxy_set_header</span> Host <span class="token variable">$host</span></span><span class="token punctuation">;</span>
        <span class="token directive"><span class="token keyword">proxy_set_header</span> X-Forwarder-For <span class="token variable">$remote_addr</span></span><span class="token punctuation">;</span>

        <span class="token comment">#反向代理的路径（和upstream绑定），location 后面设置映射的路径</span>
        <span class="token directive"><span class="token keyword">location</span> /</span> <span class="token punctuation">{</span>
            <span class="token directive"><span class="token keyword">proxy_pass</span> http://zp_server1</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>

        <span class="token comment">#静态文件，nginx自己处理</span>
        <span class="token directive"><span class="token keyword">location</span> ~ ^/(images|javascript|js|css|flash|media|static)/</span> <span class="token punctuation">{</span>
            <span class="token directive"><span class="token keyword">root</span> /usr/share/nginx/html</span><span class="token punctuation">;</span>  <span class="token comment"># 网站根目录</span>
            <span class="token directive"><span class="token keyword">index</span>  index.html index.htm</span><span class="token punctuation">;</span>   <span class="token comment"># 默认首页文件</span>
      		<span class="token directive"><span class="token keyword">deny</span> 172.168.22.11</span><span class="token punctuation">;</span>   <span class="token comment"># 禁止访问的ip地址，可以为all</span>
      		<span class="token directive"><span class="token keyword">allow</span> 172.168.33.44；# 允许访问的ip地址，可以为all
            <span class="token comment">#过期30天，静态文件不怎么更新，过期可以设大一点，如果频繁更新，则可以设置得小一点。</span>
            expires <span class="token number">30d</span></span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>

        <span class="token comment">#设定查看Nginx状态的地址</span>
        <span class="token directive"><span class="token keyword">location</span> /NginxStatus</span> <span class="token punctuation">{</span>
            <span class="token directive"><span class="token keyword">stub_status</span>           <span class="token boolean">on</span></span><span class="token punctuation">;</span>
            <span class="token directive"><span class="token keyword">access_log</span>            <span class="token boolean">on</span></span><span class="token punctuation">;</span>
            <span class="token directive"><span class="token keyword">auth_basic</span>            <span class="token string">&quot;NginxStatus&quot;</span></span><span class="token punctuation">;</span>
            <span class="token directive"><span class="token keyword">auth_basic_user_file</span>  conf/htpasswd</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>

        <span class="token comment">#禁止访问 .htxxx 文件</span>
        <span class="token directive"><span class="token keyword">location</span> ~ /\\.ht</span> <span class="token punctuation">{</span>
            <span class="token directive"><span class="token keyword">deny</span> all</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>

        <span class="token comment">#错误处理页面（可选择性配置）</span>
        <span class="token directive"><span class="token keyword">error_page</span>   <span class="token number">404</span> <span class="token number">400</span>          /404.html</span><span class="token punctuation">;</span> <span class="token comment"># 默认40x对应的访问页面</span>
        <span class="token directive"><span class="token keyword">error_page</span>   <span class="token number">500</span> <span class="token number">502</span> <span class="token number">503</span> <span class="token number">504</span>  /50x.html</span><span class="token punctuation">;</span> <span class="token comment"># 默认50x对应的访问页面</span>
        <span class="token directive"><span class="token keyword">location</span> = /50x.html</span> <span class="token punctuation">{</span>
            <span class="token directive"><span class="token keyword">root</span>   html</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ul><li><code>main </code>全局配置，对全局生效；</li><li><code>events </code>配置影响 <code>Nginx </code>服务器与用户的网络连接；</li><li><code>http </code>配置代理，缓存，日志定义等绝大多数功能和第三方模块的配置；</li><li><code>server </code>配置虚拟主机的相关参数，一个 <code>http </code>块中可以有多个 <code>server </code>块；</li><li><code>location </code>用于配置匹配的 <code>uri</code> ；</li><li><code>upstream </code>配置后端服务器具体地址，负载均衡配置不可或缺的部分；</li></ul><p><img src="`+v+'" alt="image-20230421201710126"></p><h3 id="main-段核心参数" tabindex="-1"><a class="header-anchor" href="#main-段核心参数" aria-hidden="true">#</a> main 段核心参数</h3><p>常用参数如下</p>',6),S=c(`<h4 id="user" tabindex="-1"><a class="header-anchor" href="#user" aria-hidden="true">#</a> user</h4><p>指定运行 <code>Nginx </code>的 <code>woker </code>子进程的属主和属组，其中组可以不指定。</p><div class="language-nginx line-numbers-mode" data-ext="nginx"><pre class="language-nginx"><code><span class="token directive"><span class="token keyword">user</span> USERNAME [GROUP]

user nginx lion</span><span class="token punctuation">;</span> <span class="token comment"># 用户是nginx;组是lion</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="pid" tabindex="-1"><a class="header-anchor" href="#pid" aria-hidden="true">#</a> pid</h4><p>指定运行 <code>Nginx master</code> 主进程的 <code>pid </code>文件存放路径。</p><div class="language-nginx line-numbers-mode" data-ext="nginx"><pre class="language-nginx"><code>pid /opt/nginx/logs/nginx.pid <span class="token comment"># master主进程的的pid存放在nginx.pid的文件</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h4 id="worker-rlimit-nofile-number" tabindex="-1"><a class="header-anchor" href="#worker-rlimit-nofile-number" aria-hidden="true">#</a> worker_rlimit_nofile_number</h4><p>指定 <code>worker </code>子进程可以打开的最大文件句柄数。</p><div class="language-nginx line-numbers-mode" data-ext="nginx"><pre class="language-nginx"><code><span class="token directive"><span class="token keyword">worker_rlimit_nofile</span> <span class="token number">20480</span></span><span class="token punctuation">;</span> <span class="token comment"># 可以理解成每个worker子进程的最大连接数量。</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h4 id="worker-rlimit-core" tabindex="-1"><a class="header-anchor" href="#worker-rlimit-core" aria-hidden="true">#</a> worker_rlimit_core</h4><p>指定 <code>worker </code>子进程异常终止后的 <code>core </code>文件，用于记录分析问题。</p><div class="language-nginx line-numbers-mode" data-ext="nginx"><pre class="language-nginx"><code><span class="token directive"><span class="token keyword">worker_rlimit_core</span> <span class="token number">50M</span></span><span class="token punctuation">;</span> <span class="token comment"># 存放大小限制</span>
<span class="token directive"><span class="token keyword">working_directory</span> /opt/nginx/tmp</span><span class="token punctuation">;</span> <span class="token comment"># 存放目录</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="worker-processes-number" tabindex="-1"><a class="header-anchor" href="#worker-processes-number" aria-hidden="true">#</a> worker_processes_number</h4><p>指定 <code>Nginx </code>启动的 <code>worker </code>子进程数量。</p><div class="language-nginx line-numbers-mode" data-ext="nginx"><pre class="language-nginx"><code><span class="token directive"><span class="token keyword">worker_processes</span> <span class="token number">4</span></span><span class="token punctuation">;</span> <span class="token comment"># 指定具体子进程数量</span>
<span class="token directive"><span class="token keyword">worker_processes</span> auto</span><span class="token punctuation">;</span> <span class="token comment"># 与当前cpu物理核心数一致</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="worker-cpu-affinity" tabindex="-1"><a class="header-anchor" href="#worker-cpu-affinity" aria-hidden="true">#</a> worker_cpu_affinity</h4><p>将每个 <code>worker </code>子进程与我们的 <code>cpu </code>物理核心绑定。</p><div class="language-nginx line-numbers-mode" data-ext="nginx"><pre class="language-nginx"><code><span class="token directive"><span class="token keyword">worker_cpu_affinity</span> <span class="token number">0001</span> <span class="token number">0010</span> <span class="token number">0100</span> <span class="token number">1000</span></span><span class="token punctuation">;</span> <span class="token comment"># 4个物理核心，4个worker子进程</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>将每个 <code>worker </code>子进程与特定 <code>CPU </code>物理核心绑定，优势在于，避免同一个 <code>worker </code>子进程在不同的 <code>CPU </code>核心上切换，缓存失效，降低性能。但其并不能真正的避免进程切换。</p><p><img src="`+m+`" alt="image-20230421202553823"></p><h4 id="worker-priority" tabindex="-1"><a class="header-anchor" href="#worker-priority" aria-hidden="true">#</a> worker_priority</h4><p>指定 <code>worker </code>子进程的 <code>nice </code>值，以调整运行 <code>Nginx </code>的优先级，通常设定为负值，以优先调用 <code>Nginx </code>。</p><div class="language-nginx line-numbers-mode" data-ext="nginx"><pre class="language-nginx"><code><span class="token directive"><span class="token keyword">worker_priority</span> -10</span><span class="token punctuation">;</span> <span class="token comment"># 120-10=110，110就是最终的优先级</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p><code>Linux </code>默认进程的优先级值是120，值越小越优先； <code>nice </code> 定范围为 <code>-20 </code>到 <code>+19</code> 。</p><div class="custom-container tip"><p class="custom-container-title">提示</p><p>应用的默认优先级值是120加上 <code>nice </code>值等于它最终的值，这个值越小，优先级越高。</p></div><h4 id="worker-shutdown-timeout" tabindex="-1"><a class="header-anchor" href="#worker-shutdown-timeout" aria-hidden="true">#</a> worker_shutdown_timeout</h4><p>指定 <code>worker </code>子进程优雅退出时的超时时间。</p><div class="language-nginx line-numbers-mode" data-ext="nginx"><pre class="language-nginx"><code><span class="token directive"><span class="token keyword">worker_shutdown_timeout</span> <span class="token number">5s</span></span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h4 id="timer-resolution" tabindex="-1"><a class="header-anchor" href="#timer-resolution" aria-hidden="true">#</a> timer_resolution</h4><p><code>worker </code>子进程内部使用的计时器精度，调整时间间隔越大，系统调用越少，有利于性能提升；反之，系统调用越多，性能下降。</p><div class="language-nginx line-numbers-mode" data-ext="nginx"><pre class="language-nginx"><code><span class="token directive"><span class="token keyword">timer_resolution</span> <span class="token number">100ms</span></span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>在 <code>Linux </code>系统中，用户需要获取计时器时需要向操作系统内核发送请求，有请求就必然会有开销，因此这个间隔越大开销就越小。</p><h4 id="daemon" tabindex="-1"><a class="header-anchor" href="#daemon" aria-hidden="true">#</a> daemon</h4><p>指定 <code>Nginx </code>的运行方式，前台还是后台，前台用于调试，后台用于生产。</p><div class="language-nginx line-numbers-mode" data-ext="nginx"><pre class="language-nginx"><code><span class="token directive"><span class="token keyword">daemon</span> <span class="token boolean">off</span></span><span class="token punctuation">;</span> <span class="token comment"># 默认是on，后台运行模式</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h3 id="events-段核心参数" tabindex="-1"><a class="header-anchor" href="#events-段核心参数" aria-hidden="true">#</a> events 段核心参数</h3>`,36),L=c(`<h4 id="use" tabindex="-1"><a class="header-anchor" href="#use" aria-hidden="true">#</a> use</h4><p><code>Nginx </code>使用何种事件驱动模型。</p><div class="language-nginx line-numbers-mode" data-ext="nginx"><pre class="language-nginx"><code><span class="token directive"><span class="token keyword">use</span> method</span><span class="token punctuation">;</span> <span class="token comment"># 不推荐配置它，让nginx自己选择</span>

method 可选值为：select、poll、kqueue、epoll、/dev/poll、eventport
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="worker-connections" tabindex="-1"><a class="header-anchor" href="#worker-connections" aria-hidden="true">#</a> worker_connections</h4><p><code>worker </code>子进程能够处理的最大并发连接数。</p><div class="language-nginx line-numbers-mode" data-ext="nginx"><pre class="language-nginx"><code>worker_connections 1024 <span class="token comment"># 每个子进程的最大连接数为1024</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h4 id="accept-mutex" tabindex="-1"><a class="header-anchor" href="#accept-mutex" aria-hidden="true">#</a> accept_mutex</h4><p>是否打开负载均衡互斥锁。</p><div class="language-nginx line-numbers-mode" data-ext="nginx"><pre class="language-nginx"><code>accept_mutex on <span class="token comment"># 默认是off关闭的，这里推荐打开</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h3 id="http-段核心参数" tabindex="-1"><a class="header-anchor" href="#http-段核心参数" aria-hidden="true">#</a> http 段核心参数</h3>`,10),U={class:"custom-container warning"},T=s("p",{class:"custom-container-title"},"注意",-1),P=s("p",null,"http 段包含较多，请仔细阅读每一参数的可编写的位置",-1),A=c(`<h4 id="server-name" tabindex="-1"><a class="header-anchor" href="#server-name" aria-hidden="true">#</a> server_name</h4><p>指定虚拟主机域名。</p><div class="language-nginx line-numbers-mode" data-ext="nginx"><pre class="language-nginx"><code><span class="token directive"><span class="token keyword">server_name</span> name1 name2 name3

<span class="token comment"># 示例：</span>
server_name www.nginx.com</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>域名匹配的四种写法：</p><ul><li>精确匹配： <code>server_name www.nginx.com</code> ;</li><li>左侧通配： <code>server_name *.nginx.com</code> ;</li><li>右侧统配： <code>server_name www.nginx.*</code> ;</li><li>正则匹配： <code>server_name ~^www\\.nginx\\.*$</code> ;</li></ul><p>匹配优先级：<strong>精确匹配 &gt; 左侧通配符匹配 &gt; 右侧通配符匹配 &gt; 正则表达式匹配</strong></p><h4 id="root" tabindex="-1"><a class="header-anchor" href="#root" aria-hidden="true">#</a> root</h4><p>指定静态资源目录位置，它可以写在 <code>http </code>、 <code>server </code>、 <code>location </code>等配置中。</p><div class="language-nginx line-numbers-mode" data-ext="nginx"><pre class="language-nginx"><code><span class="token directive"><span class="token keyword">root</span> path

<span class="token comment"># 例如：</span>
location /image</span> <span class="token punctuation">{</span>
 <span class="token directive"><span class="token keyword">root</span> /opt/nginx/static</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>

<span class="token comment"># 当用户访问 www.test.com/image/1.png 时，实际在服务器找的路径是 /opt/nginx/static/image/1.png</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="custom-container warning"><p class="custom-container-title">注意</p><p><code>root </code>会将定义路径与 <code>URI </code>叠加， <code>alias </code>则只取定义路径</p></div><h4 id="alias" tabindex="-1"><a class="header-anchor" href="#alias" aria-hidden="true">#</a> alias</h4><p>它也是指定静态资源目录位置，它只能写在 <code>location </code>中。</p><div class="language-nginx line-numbers-mode" data-ext="nginx"><pre class="language-nginx"><code><span class="token directive"><span class="token keyword">location</span> /image</span> <span class="token punctuation">{</span>
 <span class="token directive"><span class="token keyword">alias</span> /opt/nginx/static/image/</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>

<span class="token comment"># 当用户访问 www.test.com/image/1.png 时，实际在服务器找的路径是 /opt/nginx/static/image/1.png</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="custom-container warning"><p class="custom-container-title">注意</p><p>使用 alias 末尾一定要添加 / ，并且它只能位于 <code>location </code>中。</p></div><h4 id="location" tabindex="-1"><a class="header-anchor" href="#location" aria-hidden="true">#</a> location</h4><p>配置路径。</p><div class="language-nginx line-numbers-mode" data-ext="nginx"><pre class="language-nginx"><code><span class="token directive"><span class="token keyword">location</span> [ = | ~ | ~* | ^~ ] uri</span> <span class="token punctuation">{</span>
 ...
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>匹配规则：</p><ul><li><code>= </code>精确匹配；</li><li><code>~ </code>正则匹配，区分大小写；</li><li><code>~*</code> 正则匹配，不区分大小写；</li><li><code>^~</code> 匹配到即停止搜索；</li></ul><p>匹配优先级： <code>= &gt; ^~ &gt; ~ &gt; ~* &gt;</code> 不带任何字符。</p><p><strong>例：</strong></p><div class="language-nginx line-numbers-mode" data-ext="nginx"><pre class="language-nginx"><code><span class="token directive"><span class="token keyword">server</span></span> <span class="token punctuation">{</span>
  <span class="token directive"><span class="token keyword">listen</span> <span class="token number">80</span></span><span class="token punctuation">;</span>
  <span class="token directive"><span class="token keyword">server_name</span> www.nginx-test.com</span><span class="token punctuation">;</span>
  
  <span class="token comment"># 只有当访问 www.nginx-test.com/match_all/ 时才会匹配到/usr/share/nginx/html/match_all/index.html</span>
  <span class="token directive"><span class="token keyword">location</span> = /match_all/</span> <span class="token punctuation">{</span>
      root /usr/share/nginx/html
      index index.html
  <span class="token punctuation">}</span>
  
  <span class="token comment"># 当访问 www.nginx-test.com/1.jpg 等路径时会去 /usr/share/nginx/images/1.jpg 找对应的资源</span>
  <span class="token directive"><span class="token keyword">location</span> ~ \\.(jpeg|jpg|png|svg)$</span> <span class="token punctuation">{</span>
   <span class="token directive"><span class="token keyword">root</span> /usr/share/nginx/images</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span>
  
  <span class="token comment"># 当访问 www.nginx-test.com/bbs/ 时会匹配上 /usr/share/nginx/html/bbs/index.html</span>
  <span class="token directive"><span class="token keyword">location</span> ^~ /bbs/</span> <span class="token punctuation">{</span>
   <span class="token directive"><span class="token keyword">root</span> /usr/share/nginx/html</span><span class="token punctuation">;</span>
    <span class="token directive"><span class="token keyword">index</span> index.html index.htm</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="location-中的反斜线" tabindex="-1"><a class="header-anchor" href="#location-中的反斜线" aria-hidden="true">#</a> location 中的反斜线</h4><div class="language-nginx line-numbers-mode" data-ext="nginx"><pre class="language-nginx"><code><span class="token directive"><span class="token keyword">location</span> /test</span> <span class="token punctuation">{</span>
 ...
<span class="token punctuation">}</span>

<span class="token directive"><span class="token keyword">location</span> /test/</span> <span class="token punctuation">{</span>
 ...
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ul><li>不带 <code>/ </code>当访问 <code>www.nginx-test.com/test</code> 时， <code>Nginx </code>先找是否有 <code>test </code>目录，如果有则找 <code>test </code>目录下的 <code>index.html</code> ；如果没有 <code>test </code>目录， <code>nginx </code> 则会找是否有 <code>test </code>文件。</li><li>带 <code>/ </code>当访问 <code>www.nginx-test.com/test</code> 时， <code>Nginx </code>先找是否有 <code>test </code>目录，如果有则找 <code>test </code>目录下的 <code>index.html </code>，如果没有它也不会去找是否存在 <code>test </code>文件。</li></ul><h4 id="return" tabindex="-1"><a class="header-anchor" href="#return" aria-hidden="true">#</a> return</h4><p>写在 location 中</p><p>停止处理请求，直接返回响应码或重定向到其他 <code>URL </code>；</p><div class="custom-container warning"><p class="custom-container-title">注意</p><p>执行 <code>return </code>指令后， <code>location </code>中后续指令将不会被执行。</p></div><div class="language-nginx line-numbers-mode" data-ext="nginx"><pre class="language-nginx"><code><span class="token directive"><span class="token keyword">return</span> code [text]</span><span class="token punctuation">;</span>
<span class="token directive"><span class="token keyword">return</span> code URL</span><span class="token punctuation">;</span>
<span class="token directive"><span class="token keyword">return</span> URL</span><span class="token punctuation">;</span>

<span class="token comment"># 例如：</span>
<span class="token directive"><span class="token keyword">location</span> /</span> <span class="token punctuation">{</span>
 <span class="token directive"><span class="token keyword">return</span> <span class="token number">404</span></span><span class="token punctuation">;</span> <span class="token comment"># 直接返回状态码</span>
<span class="token punctuation">}</span>

<span class="token directive"><span class="token keyword">location</span> /</span> <span class="token punctuation">{</span>
 <span class="token directive"><span class="token keyword">return</span> <span class="token number">404</span> <span class="token string">&quot;pages not found&quot;</span></span><span class="token punctuation">;</span> <span class="token comment"># 返回状态码 + 一段文本</span>
<span class="token punctuation">}</span>

<span class="token directive"><span class="token keyword">location</span> /</span> <span class="token punctuation">{</span>
 <span class="token directive"><span class="token keyword">return</span> <span class="token number">302</span> /bbs</span> <span class="token punctuation">;</span> <span class="token comment"># 返回状态码 + 重定向地址</span>
<span class="token punctuation">}</span>

<span class="token directive"><span class="token keyword">location</span> /</span> <span class="token punctuation">{</span>
 <span class="token directive"><span class="token keyword">return</span> https://www.baidu.com</span> <span class="token punctuation">;</span> <span class="token comment"># 返回重定向地址</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="rewrite" tabindex="-1"><a class="header-anchor" href="#rewrite" aria-hidden="true">#</a> rewrite</h4><p>根据指定正则表达式匹配规则，重写 <code>URL </code>。</p><div class="language-nginx line-numbers-mode" data-ext="nginx"><pre class="language-nginx"><code><span class="token comment"># 语法：rewrite 正则表达式 要替换的内容 [flag];</span>

<span class="token comment"># 上下文：server、location、if</span>

<span class="token comment"># 示例：</span>
<span class="token directive"><span class="token keyword">rewirte</span> /images/(.*\\.jpg)$ /pic/<span class="token variable">$1</span></span><span class="token punctuation">;</span> <span class="token comment"># $1是前面括号(.*\\.jpg)的反向引用</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><code>flag </code>可选值的含义：</p><ul><li><code>last </code>重写后的 <code>URL </code>发起新请求，再次进入 <code>server </code>段，重试 <code>location </code>的中的匹配；</li><li><code>break </code>直接使用重写后的 <code>URL </code>，不再匹配其它 <code>location </code>中语句；</li><li><code>redirect </code>返回302临时重定向；</li><li><code>permanent 返回301永久重定向；</code></li></ul><div class="language-nginx line-numbers-mode" data-ext="nginx"><pre class="language-nginx"><code><span class="token directive"><span class="token keyword">server</span></span><span class="token punctuation">{</span>
  <span class="token directive"><span class="token keyword">listen</span> <span class="token number">80</span></span><span class="token punctuation">;</span>
  <span class="token directive"><span class="token keyword">server_name</span> fe.lion.club</span><span class="token punctuation">;</span> <span class="token comment"># 要在本地hosts文件进行配置</span>
  <span class="token directive"><span class="token keyword">root</span> html</span><span class="token punctuation">;</span>
  <span class="token directive"><span class="token keyword">location</span> /search</span> <span class="token punctuation">{</span>
   <span class="token directive"><span class="token keyword">rewrite</span> ^/(.*) https://www.baidu.com redirect</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span>
  
  <span class="token directive"><span class="token keyword">location</span> /images</span> <span class="token punctuation">{</span>
   <span class="token directive"><span class="token keyword">rewrite</span> /images/(.*) /pics/<span class="token variable">$1</span></span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span>
  
  <span class="token directive"><span class="token keyword">location</span> /pics</span> <span class="token punctuation">{</span>
   <span class="token directive"><span class="token keyword">rewrite</span> /pics/(.*) /photos/<span class="token variable">$1</span></span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span>
  
  <span class="token directive"><span class="token keyword">location</span> /photos</span> <span class="token punctuation">{</span>
  
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>按照这个配置我们来分析：</p><ul><li>当访问 <code>fe.lion.club/search</code> 时，会自动帮我们重定向到 <code>https://www.baidu.com</code>。</li><li>当访问 <code>fe.lion.club/images/1.jpg</code> 时，第一步重写 <code>URL </code>为 <code>fe.lion.club/pics/1.jpg</code> ，找到 <code>pics </code>的 <code>location </code>，继续重写 <code>URL </code>为 <code>fe.lion.club/photos/1.jpg</code> ，找到 <code>/photos</code> 的 <code>location </code>后，去<code> html/photos</code> 目录下寻找 <code>1.jpg</code> 静态资源。</li></ul><h4 id="if" tabindex="-1"><a class="header-anchor" href="#if" aria-hidden="true">#</a> if</h4><div class="language-nginx line-numbers-mode" data-ext="nginx"><pre class="language-nginx"><code><span class="token comment"># 语法：if (condition) {...}</span>

<span class="token comment"># 上下文：server、location</span>

<span class="token comment"># 示例：</span>
<span class="token directive"><span class="token keyword">if($http_user_agent</span> ~ Chrome)</span><span class="token punctuation">{</span>
  <span class="token directive"><span class="token keyword">rewrite</span> /(.*)/browser/<span class="token variable">$1</span> break</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><code>condition </code>判断条件：</p><ul><li><code>$variable</code> 仅为变量时，值为空或以0开头字符串都会被当做 <code>false </code>处理；</li><li><code>= </code>或 <code>!=</code> 相等或不等；</li><li><code>~ </code>正则匹配；</li><li><code>! ~</code> 非正则匹配；</li><li><code>~*</code> 正则匹配，不区分大小写；</li><li><code>-f</code> 或<code> ! -f</code> 检测文件存在或不存在；</li><li><code>-d</code> 或 <code>! -d</code> 检测目录存在或不存在；</li><li><code>-e</code> 或<code> ! -e</code> 检测文件、目录、符号链接等存在或不存在；</li><li><code>-x</code> 或<code> ! -x</code> 检测文件可以执行或不可执行；</li></ul><p><strong>例：</strong></p><div class="language-nginx line-numbers-mode" data-ext="nginx"><pre class="language-nginx"><code><span class="token directive"><span class="token keyword">server</span></span> <span class="token punctuation">{</span>
  <span class="token directive"><span class="token keyword">listen</span> <span class="token number">8080</span></span><span class="token punctuation">;</span>
  <span class="token directive"><span class="token keyword">server_name</span> localhost</span><span class="token punctuation">;</span>
  <span class="token directive"><span class="token keyword">root</span> html</span><span class="token punctuation">;</span>
  
  <span class="token directive"><span class="token keyword">location</span> /</span> <span class="token punctuation">{</span>
   <span class="token directive"><span class="token keyword">if</span> ( <span class="token variable">$uri</span> = <span class="token string">&quot;/images/&quot;</span> )</span><span class="token punctuation">{</span>
     <span class="token directive"><span class="token keyword">rewrite</span> (.*) /pics/ break</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>当访问 <code>localhost:8080/images/</code> 时，会进入 <code>if </code>判断里面执行 <code>rewrite </code>命令。</p><h4 id="autoindex" tabindex="-1"><a class="header-anchor" href="#autoindex" aria-hidden="true">#</a> autoindex</h4><p>用户请求以 <code>/ </code>结尾时，列出目录结构，可以用于快速搭建静态资源下载网站。</p><p><code>autoindex.conf</code> 配置信息：</p><div class="language-nginx line-numbers-mode" data-ext="nginx"><pre class="language-nginx"><code><span class="token directive"><span class="token keyword">server</span></span> <span class="token punctuation">{</span>
  <span class="token directive"><span class="token keyword">listen</span> <span class="token number">80</span></span><span class="token punctuation">;</span>
  <span class="token directive"><span class="token keyword">server_name</span> fe.lion-test.club</span><span class="token punctuation">;</span>
  
  <span class="token directive"><span class="token keyword">location</span> /download/</span> <span class="token punctuation">{</span>
    <span class="token directive"><span class="token keyword">root</span> /opt/source</span><span class="token punctuation">;</span>
    
    <span class="token comment"># 打开 autoindex，，可选参数有 on | off</span>
    <span class="token directive"><span class="token keyword">autoindex</span> <span class="token boolean">on</span></span><span class="token punctuation">;</span> 
    <span class="token comment"># 修改为off，以KB、MB、GB显示文件大小，默认为on，以bytes显示出⽂件的确切⼤⼩</span>
    <span class="token directive"><span class="token keyword">autoindex_exact_size</span> <span class="token boolean">on</span></span><span class="token punctuation">;</span> 
    <span class="token comment"># 以html的方式进行格式化，可选参数有 html | json | xml</span>
    <span class="token directive"><span class="token keyword">autoindex_format</span> html</span><span class="token punctuation">;</span>
    <span class="token comment"># 显示的⽂件时间为⽂件的服务器时间。默认为off，显示的⽂件时间为GMT时间</span>
    <span class="token directive"><span class="token keyword">autoindex_localtime</span> <span class="token boolean">off</span></span><span class="token punctuation">;</span> 
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>当访问 <code>fe.lion.com/download/ </code>时，会把服务器 <code>/opt/source/download/</code> 路径下的文件展示出来，如下图所示：</p><p><img src="`+k+`" alt="image-20230421205035547"></p><h4 id="变量" tabindex="-1"><a class="header-anchor" href="#变量" aria-hidden="true">#</a> 变量</h4><p><code>Nginx </code>提供给使用者的变量非常多，但是终究是一个完整的请求过程所产生数据， <code>Nginx </code>将这些数据以变量的形式提供给使用者。</p><p><strong>常用的变量：</strong></p><table><thead><tr><th>变量名</th><th>含义</th></tr></thead><tbody><tr><td>remote_addr</td><td>客户端 IP 地址</td></tr><tr><td>remote_port</td><td>客户端端口</td></tr><tr><td>server_addr</td><td>服务端 IP 地址</td></tr><tr><td>server_port</td><td>服务端端口</td></tr><tr><td>server_protocol</td><td>服务端协议</td></tr><tr><td>binary_remote_addr</td><td>二进制格式的客户端 IP 地址</td></tr><tr><td>connection</td><td>TCP 连接的序号，递增</td></tr><tr><td>connection_request</td><td>TCP 连接当前的请求数量</td></tr><tr><td>uri</td><td>请求的URL，不包含参数</td></tr><tr><td>request_uri</td><td>请求的URL，包含参数</td></tr><tr><td>scheme</td><td>协议名， http 或 https</td></tr><tr><td>request_method</td><td>请求方法</td></tr><tr><td>request_length</td><td>全部请求的长度，包含请求行、请求头、请求体</td></tr><tr><td>args</td><td>全部参数字符串</td></tr><tr><td>arg_参数名</td><td>获取特定参数值</td></tr><tr><td>is_args</td><td>URL 中是否有参数，有的话返回 ? ，否则返回空</td></tr><tr><td>query_string</td><td>与 args 相同</td></tr><tr><td>host</td><td>请求信息中的 Host ，如果请求中没有 Host 行，则在请求头中找，最后使用 nginx 中设置的 server_name 。</td></tr><tr><td>http_user_agent</td><td>用户浏览器</td></tr><tr><td>http_referer</td><td>从哪些链接过来的请求</td></tr><tr><td>http_via</td><td>每经过一层代理服务器，都会添加相应的信息</td></tr><tr><td>http_cookie</td><td>获取用户 cookie</td></tr><tr><td>request_time</td><td>处理请求已消耗的时间</td></tr><tr><td>https</td><td>是否开启了 https ，是则返回 on ，否则返回空</td></tr><tr><td>request_filename</td><td>磁盘文件系统待访问文件的完整路径</td></tr><tr><td>document_root</td><td>由 URI 和 root/alias 规则生成的文件夹路径</td></tr><tr><td>limit_rate</td><td>返回响应时的速度上限值</td></tr></tbody></table><p><strong>例var.conf：</strong></p><div class="language-nginx line-numbers-mode" data-ext="nginx"><pre class="language-nginx"><code><span class="token directive"><span class="token keyword">server</span></span><span class="token punctuation">{</span>
 <span class="token directive"><span class="token keyword">listen</span> <span class="token number">8081</span></span><span class="token punctuation">;</span>
 <span class="token directive"><span class="token keyword">server_name</span> var.lion-test.club</span><span class="token punctuation">;</span>
 <span class="token directive"><span class="token keyword">root</span> /usr/share/nginx/html</span><span class="token punctuation">;</span>
 <span class="token directive"><span class="token keyword">location</span> /</span> <span class="token punctuation">{</span>
  <span class="token directive"><span class="token keyword">return</span> <span class="token number">200</span> <span class="token string">&quot;
remote_addr: <span class="token variable">$remote_addr</span>
remote_port: <span class="token variable">$remote_port</span>
server_addr: <span class="token variable">$server_addr</span>
server_port: <span class="token variable">$server_port</span>
server_protocol: <span class="token variable">$server_protocol</span>
binary_remote_addr: <span class="token variable">$binary_remote_addr</span>
connection: <span class="token variable">$connection</span>
uri: <span class="token variable">$uri</span>
request_uri: <span class="token variable">$request_uri</span>
scheme: <span class="token variable">$scheme</span>
request_method: <span class="token variable">$request_method</span>
request_length: <span class="token variable">$request_length</span>
args: <span class="token variable">$args</span>
arg_pid: <span class="token variable">$arg_pid</span>
is_args: <span class="token variable">$is_args</span>
query_string: <span class="token variable">$query_string</span>
host: <span class="token variable">$host</span>
http_user_agent: <span class="token variable">$http_user_agent</span>
http_referer: <span class="token variable">$http_referer</span>
http_via: <span class="token variable">$http_via</span>
request_time: <span class="token variable">$request_time</span>
https: <span class="token variable">$https</span>
request_filename: <span class="token variable">$request_filename</span>
document_root: <span class="token variable">$document_root</span>
&quot;</span></span><span class="token punctuation">;</span>
 <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>当我们访问 <code>http://var.lion-test.club:8081/test?pid=121414&amp;cid=sadasd</code> 时，由于 <code>Nginx </code>中写了 <code>return </code>方法，因此 <code>chrome </code>浏览器会默认为我们下载一个文件，下面展示的就是下载的文件内容：</p><div class="language-nginx line-numbers-mode" data-ext="nginx"><pre class="language-nginx"><code><span class="token directive"><span class="token keyword">remote_addr:</span> 27.16.220.84
remote_port: <span class="token number">56838</span>
server_addr: 172.17.0.2
server_port: <span class="token number">8081</span>
server_protocol: HTTP/1.1
binary_remote_addr: 茉
connection: <span class="token number">126</span>
uri: /test/
request_uri: /test/?pid=121414&amp;cid=sadasd
scheme: http
request_method: GET
request_length: <span class="token number">518</span>
args: pid=121414&amp;cid=sadasd
arg_pid: <span class="token number">121414</span>
is_args: ?
query_string: pid=121414&amp;cid=sadasd
host: var.lion-test.club
http_user_agent: Mozilla/5.0 (Macintosh</span><span class="token punctuation">;</span> Intel Mac OS X 10_14_0) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/88.0.4324.182 Safari/537.36
http_referer: 
http_via: 
request_time: 0.000
https: 
request_filename: /usr/share/nginx/html/test/
document_root: /usr/share/nginx/html
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="四、nginx应用核心概念" tabindex="-1"><a class="header-anchor" href="#四、nginx应用核心概念" aria-hidden="true">#</a> 四、Nginx应用核心概念</h2><p>代理是在服务器和客户端之间假设的一层服务器，代理将接收客户端的请求并将它转发给服务器，然后将服务端的响应转发给客户端。</p><p>不管是正向代理还是反向代理，实现的都是上面的功能。</p><p><img src="`+b+'" alt="image-20230421222921610"></p><h3 id="正向代理" tabindex="-1"><a class="header-anchor" href="#正向代理" aria-hidden="true">#</a> 正向代理</h3><p>正向代理，意思是一个位于客户端和原始服务器(origin server)之间的服务器，为了从原始服务器取得内容，客户端向代理发送一个请求并指定目标(原始服务器)，然后代理向原始服务器转交请求并将获得的内容返回给客户端。</p><p>正向代理是为我们服务的，即为客户端服务的，客户端可以根据正向代理访问到它本身无法访问到的服务器资源。</p><p>正向代理对我们是透明的，对服务端是非透明的，即服务端并不知道自己收到的是来自代理的访问还是来自真实客户端的访问。</p><h3 id="反向代理-1" tabindex="-1"><a class="header-anchor" href="#反向代理-1" aria-hidden="true">#</a> 反向代理</h3><p>反向代理，是指以代理服务器来接受internet上的连接请求，然后将请求转发给内部网络上的服务器，并将从服务器上得到的结果返回给internet上请求连接的客户端，此时代理服务器对外就表现为一个反向代理服务器。</p><p>反向代理是为服务端服务的，反向代理可以帮助服务器接收来自客户端的请求，帮助服务器做请求转发，负载均衡等。</p><p>反向代理对服务端是透明的，对我们是非透明的，即我们并不知道自己访问的是代理服务器，而服务器知道反向代理在为他服务。</p><p><strong>反向代理的优势：</strong></p><ul><li>隐藏真实服务器；</li><li>负载均衡便于横向扩充后端动态服务；</li><li>动静分离，提升系统健壮性；</li></ul><h3 id="动静分离" tabindex="-1"><a class="header-anchor" href="#动静分离" aria-hidden="true">#</a> 动静分离</h3><p>动静分离，是指在 <code>web </code>服务器架构中，将静态页面与动态页面或者静态内容接口和动态内容接口分开不同系统访问的架构设计方法，进而提示整个服务的访问性和可维护性。</p><p><img src="'+g+'" alt="image-20230421223314543"></p><p>一般来说，都需要将动态资源和静态资源分开，由于 <code>Nginx </code>的高并发和静态资源缓存等特性，经常将静态资源部署在 <code>Nginx </code>上。如果请求的是静态资源，直接到静态资源目录获取资源，如果是动态资源的请求，则利用反向代理的原理，把请求转发给对应后台应用去处理，从而实现动静分离。</p><p>使用前后端分离后，可以很大程度提升静态资源的访问速度，即使动态服务不可用，静态资源的访问也不会受到影响。</p><h3 id="负载均衡" tabindex="-1"><a class="header-anchor" href="#负载均衡" aria-hidden="true">#</a> 负载均衡</h3><p>一般情况下，客户端发送多个请求到服务器，服务器处理请求，其中一部分可能要操作一些资源比如数据库、静态资源等，服务器处理完毕后，再将结果返回给客户端。</p><p>这种模式对于早期的系统来说，功能要求不复杂，且并发请求相对较少的情况下还能胜任，成本也低。随着信息数量不断增长，访问量和数据量飞速增长，以及系统业务复杂度持续增加，这种做法已无法满足要求，并发量特别大时，服务器容易崩。</p><p>很明显这是由于服务器性能的瓶颈造成的问题，除了堆机器之外，最重要的做法就是负载均衡。</p><p>请求爆发式增长的情况下，单个机器性能再强劲也无法满足要求了，这个时候集群的概念产生了，单个服务器解决不了的问题，可以使用多个服务器，然后将请求分发到各个服务器上，将负载分发到不同的服务器，这就是负载均衡，核心是「分摊压力」。 <code>Nginx </code>实现负载均衡，一般来说指的是将请求转发给服务器集群。</p><p>举个具体的例子，晚高峰乘坐地铁的时候，入站口经常会有地铁工作人员大喇叭“请走 <code>B </code>口， <code>B </code>口人少车空....”，这个工作人员的作用就是负载均衡。</p><p><img src="'+h+'" alt="image-20230421223543668"></p><p><code>Nginx </code>实现负载均衡的策略：</p><ul><li>轮询策略：默认情况下采用的策略，将所有客户端请求轮询分配给服务端。这种策略是可以正常工作的，但是如果其中某一台服务器压力太大，出现延迟，会影响所有分配在这台服务器下的用户。</li><li>最小连接数策略：将请求优先分配给压力较小的服务器，它可以平衡每个队列的长度，并避免向压力大的服务器添加更多的请求。</li><li>最快响应时间策略：优先分配给响应时间最短的服务器。</li><li>客户端 <code>ip </code>绑定策略：来自同一个 <code>ip </code>的请求永远只分配一台服务器，有效解决了动态网页存在的 <code>session </code>共享问题。</li></ul><h2 id="五、nginx实战配置" tabindex="-1"><a class="header-anchor" href="#五、nginx实战配置" aria-hidden="true">#</a> 五、Nginx实战配置</h2><p>在配置反向代理和负载均衡等等功能之前，有两个核心模块是我们必须要掌握的，这两个模块应该说是 <code>Nginx </code>应用配置中的核心，它们分别是： <code>upstream </code>、<code>proxy_pass</code></p><h3 id="upstream" tabindex="-1"><a class="header-anchor" href="#upstream" aria-hidden="true">#</a> upstream</h3><p>用于定义上游服务器（指的就是后台提供的应用服务器）的相关信息。通俗的讲就是后端</p><p><img src="'+x+`" alt="image-20230421223741487"></p><div class="language-nginx line-numbers-mode" data-ext="nginx"><pre class="language-nginx"><code><span class="token comment"># 语法：</span>
<span class="token directive"><span class="token keyword">upstream</span> name</span> <span class="token punctuation">{</span>
 ...
<span class="token punctuation">}</span>

<span class="token comment"># 上下文：http</span>

<span class="token comment"># 示例：</span>
<span class="token directive"><span class="token keyword">upstream</span> back_end_server</span><span class="token punctuation">{</span>
  server 192.168.100.33:8081
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>在 <code>upstream </code>内可使用的指令：</p><ul><li><code>server </code>定义上游服务器地址；</li><li><code>zone </code>定义共享内存，用于跨 <code>worker </code>子进程；</li><li><code>keepalive </code>对上游服务启用长连接；</li><li><code>keepalive_requests</code> 一个长连接最多请求 <code>HTTP </code>的个数；</li><li><code>keepalive_timeout</code> 空闲情形下，一个长连接的超时时长；</li><li><code>hash </code>哈希负载均衡算法；</li><li><code>ip_hash</code> 依据 <code>IP </code>进行哈希计算的负载均衡算法；</li><li><code>least_conn</code> 最少连接数负载均衡算法；</li><li><code>least_time</code> 最短响应时间负载均衡算法；</li><li><code>random </code>随机负载均衡算法；</li></ul><h4 id="server" tabindex="-1"><a class="header-anchor" href="#server" aria-hidden="true">#</a> server</h4><p>定义上游服务器地址。</p><div class="language-nginx line-numbers-mode" data-ext="nginx"><pre class="language-nginx"><code><span class="token comment"># 语法：</span>
server address [parameters]

<span class="token comment"># 上下文：upstream</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><code>parameters </code>可选值：</p><ul><li><code>weight=number</code> 权重值，默认为1；</li><li><code>max_conns=number</code> 上游服务器的最大并发连接数；</li><li><code>fail_timeout=time</code> 服务器不可用的判定时间；</li><li><code>max_fails=numer</code> 服务器不可用的检查次数；</li><li><code>backup </code>备份服务器，仅当其他服务器都不可用时才会启用；</li><li><code>down </code>标记服务器长期不可用，离线维护；</li></ul><h4 id="keepalive" tabindex="-1"><a class="header-anchor" href="#keepalive" aria-hidden="true">#</a> keepalive</h4><p>限制每个 <code>worker </code>子进程与上游服务器空闲长连接的最大数量。</p><div class="language-nginx line-numbers-mode" data-ext="nginx"><pre class="language-nginx"><code><span class="token comment"># 语法</span>
<span class="token directive"><span class="token keyword">keepalive</span> connections</span><span class="token punctuation">;</span>

<span class="token comment"># 上下文：upstream</span>

<span class="token comment"># 示例：</span>
<span class="token directive"><span class="token keyword">keepalive</span> <span class="token number">16</span></span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="keepalive-requests" tabindex="-1"><a class="header-anchor" href="#keepalive-requests" aria-hidden="true">#</a> keepalive_requests</h4><p>单个长连接可以处理的最多 <code>HTTP </code>请求个数。</p><div class="language-nginx line-numbers-mode" data-ext="nginx"><pre class="language-nginx"><code><span class="token comment"># 语法：</span>
<span class="token directive"><span class="token keyword">keepalive_requests</span> number</span><span class="token punctuation">;</span>

<span class="token comment"># 默认值：</span>
<span class="token directive"><span class="token keyword">keepalive_requests</span> <span class="token number">100</span></span><span class="token punctuation">;</span>

<span class="token comment"># 上下文：upstream</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="keepalive-timeout" tabindex="-1"><a class="header-anchor" href="#keepalive-timeout" aria-hidden="true">#</a> keepalive_timeout</h4><p>空闲长连接的最长保持时间。</p><div class="language-nginx line-numbers-mode" data-ext="nginx"><pre class="language-nginx"><code><span class="token comment"># 语法：</span>
<span class="token directive"><span class="token keyword">keepalive_timeout</span> time</span><span class="token punctuation">;</span>

<span class="token comment"># 默认值：</span>
<span class="token directive"><span class="token keyword">keepalive_timeout</span> <span class="token number">60s</span></span><span class="token punctuation">;</span>

<span class="token comment"># 上下文：upstream</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="配置实例" tabindex="-1"><a class="header-anchor" href="#配置实例" aria-hidden="true">#</a> 配置实例</h4><div class="language-nginx line-numbers-mode" data-ext="nginx"><pre class="language-nginx"><code><span class="token directive"><span class="token keyword">upstream</span> back_end</span><span class="token punctuation">{</span>
 <span class="token directive"><span class="token keyword">server</span> 127.0.0.1:8081 weight=3 max_conns=1000 fail_timeout=10s max_fails=2</span><span class="token punctuation">;</span>
  <span class="token directive"><span class="token keyword">keepalive</span> <span class="token number">32</span></span><span class="token punctuation">;</span>
  <span class="token directive"><span class="token keyword">keepalive_requests</span> <span class="token number">50</span></span><span class="token punctuation">;</span>
  <span class="token directive"><span class="token keyword">keepalive_timeout</span> <span class="token number">30s</span></span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="proxy-pass" tabindex="-1"><a class="header-anchor" href="#proxy-pass" aria-hidden="true">#</a> proxy_pass</h3><p>用于配置代理服务器。</p><div class="language-nginx line-numbers-mode" data-ext="nginx"><pre class="language-nginx"><code><span class="token comment"># 语法：</span>
<span class="token directive"><span class="token keyword">proxy_pass</span> URL</span><span class="token punctuation">;</span>

<span class="token comment"># 上下文：location、if、limit_except</span>

<span class="token comment"># 示例：</span>
proxy_pass http://127.0.0.1:8081
proxy_pass http://127.0.0.1:8081/proxy
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><code>URL </code>参数原则</p><ol><li><code>URL </code>必须以 <code>http </code>或 <code>https </code>开头；</li><li><code>URL </code>中可以携带变量；</li><li><code>URL </code>中是否带 <code>URI </code>，会直接影响发往上游请求的 <code>URL </code>；</li></ol><p>接下来让我们来看看两种常见的 <code>URL </code>用法：</p><ol><li>proxy_pass http://192.168.100.33:8081</li><li>proxy_pass http://192.168.100.33:8081/</li></ol><p>这两种用法的区别就是带 <code>/ </code>和不带 <code>/ </code>，在配置代理时它们的区别可大了：</p><ul><li>不带 <code>/ </code>意味着 <code>Nginx </code>不会修改用户 <code>URL </code>，而是直接透传给上游的应用服务器；</li><li>带 <code>/ </code>意味着 <code>Nginx </code>会修改用户 <code>URL </code>，修改方法是将 <code>location </code>后的 <code>URL </code>从用户 <code>URL </code>中删除；</li></ul><h4 id="不带-的用法" tabindex="-1"><a class="header-anchor" href="#不带-的用法" aria-hidden="true">#</a> 不带 <code>/ </code>的用法</h4><div class="language-nginx line-numbers-mode" data-ext="nginx"><pre class="language-nginx"><code><span class="token directive"><span class="token keyword">location</span> /bbs/</span><span class="token punctuation">{</span>
  <span class="token directive"><span class="token keyword">proxy_pass</span> http://127.0.0.1:8080/</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ol><li>用户请求 <code>URL </code>： <code>/bbs/abc/test.html</code></li><li>请求到达 <code>Nginx </code>的 <code>URL </code>： <code>/bbs/abc/test.html</code></li><li>请求到达上游应用服务器的 <code>URL </code>： <code>/bbs/abc/test.html</code></li></ol><h4 id="带-的用法" tabindex="-1"><a class="header-anchor" href="#带-的用法" aria-hidden="true">#</a> 带 <code>/ </code>的用法</h4><div class="language-nginx line-numbers-mode" data-ext="nginx"><pre class="language-nginx"><code><span class="token directive"><span class="token keyword">location</span> /bbs/</span><span class="token punctuation">{</span>
  <span class="token directive"><span class="token keyword">proxy_pass</span> http://127.0.0.1:8080/</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ol><li>用户请求 <code>URL </code>： <code>/bbs/abc/test.html</code></li><li>请求到达 <code>Nginx </code>的 <code>URL </code>： <code>/bbs/abc/test.html</code></li><li>请求到达上游应用服务器的 <code>URL </code>：<code> /abc/test.html</code></li></ol><p>并没有拼接上 <code>/bbs</code> ，这点和 <code>root </code>与 <code>alias </code>之间的区别是保持一致的。</p><h3 id="配置反向代理" tabindex="-1"><a class="header-anchor" href="#配置反向代理" aria-hidden="true">#</a> 配置反向代理</h3><p>这里准备了两台云服务器，它们的公网 <code>IP </code>分别是： 121.42.11.34 与 121.5.180.193 。</p><p><strong>我们把 121.42.11.34 服务器作为上游服务器，做如下配置：</strong></p><div class="language-nginx line-numbers-mode" data-ext="nginx"><pre class="language-nginx"><code><span class="token comment"># /etc/nginx/conf.d/proxy.conf</span>
<span class="token directive"><span class="token keyword">server</span></span><span class="token punctuation">{</span>
  <span class="token directive"><span class="token keyword">listen</span> <span class="token number">8080</span></span><span class="token punctuation">;</span>
  <span class="token directive"><span class="token keyword">server_name</span> localhost</span><span class="token punctuation">;</span>
  
  <span class="token directive"><span class="token keyword">location</span> /proxy/</span> <span class="token punctuation">{</span>
    <span class="token directive"><span class="token keyword">root</span> /usr/share/nginx/html/proxy</span><span class="token punctuation">;</span>
    <span class="token directive"><span class="token keyword">index</span> index.html</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>

<span class="token comment"># /usr/share/nginx/html/proxy/index.html</span>
&lt;h1&gt; 121.42.11.34 proxy html &lt;/h1&gt;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>配置完成后重启 <code>Nginx </code>服务器 <code>nginx -s reload</code> 。</p><p><strong>把 121.5.180.193 服务器作为代理服务器，做如下配置：</strong></p><div class="language-nginx line-numbers-mode" data-ext="nginx"><pre class="language-nginx"><code><span class="token comment"># /etc/nginx/conf.d/proxy.conf</span>
<span class="token directive"><span class="token keyword">upstream</span> back_end</span> <span class="token punctuation">{</span>
  <span class="token directive"><span class="token keyword">server</span> 121.42.11.34:8080 weight=2 max_conns=1000 fail_timeout=10s max_fails=3</span><span class="token punctuation">;</span>
  <span class="token directive"><span class="token keyword">keepalive</span> <span class="token number">32</span></span><span class="token punctuation">;</span>
  <span class="token directive"><span class="token keyword">keepalive_requests</span> <span class="token number">80</span></span><span class="token punctuation">;</span>
  <span class="token directive"><span class="token keyword">keepalive_timeout</span> <span class="token number">20s</span></span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>

<span class="token directive"><span class="token keyword">server</span></span> <span class="token punctuation">{</span>
  <span class="token directive"><span class="token keyword">listen</span> <span class="token number">80</span></span><span class="token punctuation">;</span>
  <span class="token directive"><span class="token keyword">server_name</span> proxy.lion.club</span><span class="token punctuation">;</span>
  <span class="token directive"><span class="token keyword">location</span> /proxy</span> <span class="token punctuation">{</span>
   <span class="token directive"><span class="token keyword">proxy_pass</span> http://back_end/proxy</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>本地机器要访问 <code>proxy.lion.club</code> 域名，因此需要配置本地 <code>hosts </code>，通过命令：<code>vim /etc/hosts</code> 进入配置文件，添加如下内容：</p><div class="language-nginx line-numbers-mode" data-ext="nginx"><pre class="language-nginx"><code>121.5.180.193 proxy.lion.club
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p><img src="`+_+'" alt="image-20230421225049093"></p><p><strong>分析：</strong></p><ol><li>当访问 <code>proxy.lion.club/proxy</code> 时通过 <code>upstream </code>的配置找到 <code>121.42.11.34:8080 </code>；</li><li>因此访问地址变为 <code>http://121.42.11.34:8080/proxy</code> ；</li><li>连接到 <code>121.42.11.34</code> 服务器，找到 <code>8080 </code>端口提供的 <code>server </code>；</li><li>通过 <code>server </code>找到 <code>/usr/share/nginx/html/proxy/index.html</code> 资源，最终展示出来。</li></ol><h3 id="配置负载均衡" tabindex="-1"><a class="header-anchor" href="#配置负载均衡" aria-hidden="true">#</a> 配置负载均衡</h3><p>配置负载均衡主要是要使用 <code>upstream </code>指令。</p><p>负载均衡方式：</p>',142),I=c(`<p>我们把 <code>121.42.11.34</code> 服务器作为上游服务器，做如下配置（ <code>/etc/nginx/conf.d/balance.conf </code>）</p><div class="language-nginx line-numbers-mode" data-ext="nginx"><pre class="language-nginx"><code><span class="token directive"><span class="token keyword">server</span></span><span class="token punctuation">{</span>
  <span class="token directive"><span class="token keyword">listen</span> <span class="token number">8020</span></span><span class="token punctuation">;</span>
  <span class="token directive"><span class="token keyword">location</span> /</span> <span class="token punctuation">{</span>
   <span class="token directive"><span class="token keyword">return</span> <span class="token number">200</span> <span class="token string">&#39;return 8020 <span class="token escape entity">\\n</span>&#39;</span></span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>

<span class="token directive"><span class="token keyword">server</span></span><span class="token punctuation">{</span>
  <span class="token directive"><span class="token keyword">listen</span> <span class="token number">8030</span></span><span class="token punctuation">;</span>
  <span class="token directive"><span class="token keyword">location</span> /</span> <span class="token punctuation">{</span>
   <span class="token directive"><span class="token keyword">return</span> <span class="token number">200</span> <span class="token string">&#39;return 8030 <span class="token escape entity">\\n</span>&#39;</span></span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>

<span class="token directive"><span class="token keyword">server</span></span><span class="token punctuation">{</span>
  <span class="token directive"><span class="token keyword">listen</span> <span class="token number">8040</span></span><span class="token punctuation">;</span>
  <span class="token directive"><span class="token keyword">location</span> /</span> <span class="token punctuation">{</span>
   <span class="token directive"><span class="token keyword">return</span> <span class="token number">200</span> <span class="token string">&#39;return 8040 <span class="token escape entity">\\n</span>&#39;</span></span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>配置完成后：</p><ol><li><code>nginx -t</code> 检测配置是否正确；</li><li><code>nginx -s reload</code> 重启 <code>Nginx </code>服务器；</li><li>执行 <code>ss -nlt</code> 命令查看端口是否被占用，从而判断 <code>Nginx </code>服务是否正确启动。</li></ol><hr><p>把 <code>121.5.180.193</code> 服务器作为代理服务器，做如下配置（ <code>/etc/nginx/conf.d/balance.conf</code> ）</p><div class="language-nginx line-numbers-mode" data-ext="nginx"><pre class="language-nginx"><code><span class="token comment"># 设定负载均衡的服务器列表</span>
<span class="token directive"><span class="token keyword">upstream</span> demo_server</span> <span class="token punctuation">{</span>
  <span class="token comment"># weigth参数表示权值，权值越高被分配到的几率越大</span>
  <span class="token directive"><span class="token keyword">server</span> 121.42.11.34:8020 weight=5</span><span class="token punctuation">;</span>
  <span class="token directive"><span class="token keyword">server</span> 121.42.11.34:8030 weight=1</span><span class="token punctuation">;</span>
  <span class="token directive"><span class="token keyword">server</span> 121.42.11.34:8040 weight=6</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>

<span class="token directive"><span class="token keyword">server</span></span> <span class="token punctuation">{</span>
  <span class="token directive"><span class="token keyword">listen</span> <span class="token number">80</span></span><span class="token punctuation">;</span>
  <span class="token directive"><span class="token keyword">server_name</span> balance.lion.club</span><span class="token punctuation">;</span>
  
  <span class="token directive"><span class="token keyword">location</span> /balance/</span> <span class="token punctuation">{</span>
   <span class="token directive"><span class="token keyword">proxy_pass</span> http://demo_server</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>配置完成后重启 <code>Nginx </code>服务器。并且在需要访问的客户端配置好 <code>ip </code>和域名的映射关系。</p><div class="language-nginx line-numbers-mode" data-ext="nginx"><pre class="language-nginx"><code>121.5.180.193 balance.lion.club
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>在客户端机器执行<code> curl http://balance.lion.club/balance/</code> 命令：</p><p><img src="`+y+`" alt="image-20230421225322556"></p><p><strong><code>Nginx </code>的其它分发策略</strong></p><h4 id="轮询" tabindex="-1"><a class="header-anchor" href="#轮询" aria-hidden="true">#</a> 轮询</h4><div class="language-nginx line-numbers-mode" data-ext="nginx"><pre class="language-nginx"><code><span class="token directive"><span class="token keyword">upstream</span> bck_testing_01</span> <span class="token punctuation">{</span>
  <span class="token comment"># 默认所有服务器权重为 1</span>
  server 192.168.250.220:8080
  server 192.168.250.221:8080
  server 192.168.250.222:8080
<span class="token punctuation">}</span>

<span class="token directive"><span class="token keyword">server</span></span> <span class="token punctuation">{</span>
  <span class="token directive"><span class="token keyword">listen</span> <span class="token number">80</span></span><span class="token punctuation">;</span>
  <span class="token directive"><span class="token keyword">server_name</span> balance.lion.club</span><span class="token punctuation">;</span>
  
  <span class="token directive"><span class="token keyword">location</span> /balance/</span> <span class="token punctuation">{</span>
   <span class="token directive"><span class="token keyword">proxy_pass</span> http://demo_server</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="加权轮询" tabindex="-1"><a class="header-anchor" href="#加权轮询" aria-hidden="true">#</a> 加权轮询</h4><div class="language-nginx line-numbers-mode" data-ext="nginx"><pre class="language-nginx"><code><span class="token directive"><span class="token keyword">upstream</span> bck_testing_01</span> <span class="token punctuation">{</span>
  server 192.168.250.220:8080   weight=3
  server 192.168.250.221:8080              <span class="token comment"># default weight=1</span>
  server 192.168.250.222:8080              <span class="token comment"># default weight=1</span>
<span class="token punctuation">}</span>

<span class="token directive"><span class="token keyword">server</span></span> <span class="token punctuation">{</span>
  <span class="token directive"><span class="token keyword">listen</span> <span class="token number">80</span></span><span class="token punctuation">;</span>
  <span class="token directive"><span class="token keyword">server_name</span> balance.lion.club</span><span class="token punctuation">;</span>
  
  <span class="token directive"><span class="token keyword">location</span> /balance/</span> <span class="token punctuation">{</span>
   <span class="token directive"><span class="token keyword">proxy_pass</span> http://demo_server</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="hash-算法" tabindex="-1"><a class="header-anchor" href="#hash-算法" aria-hidden="true">#</a> hash 算法</h4><p>通过制定关键字作为 <code>hash key</code> ，基于 <code>hash </code>算法映射到特定的上游服务器中。关键字可以包含有变量、字符串。</p><div class="language-nginx line-numbers-mode" data-ext="nginx"><pre class="language-nginx"><code><span class="token directive"><span class="token keyword">upstream</span> demo_server</span> <span class="token punctuation">{</span>
  <span class="token directive"><span class="token keyword">hash</span> <span class="token variable">$request_uri</span></span><span class="token punctuation">;</span>
  <span class="token directive"><span class="token keyword">server</span> 121.42.11.34:8020</span><span class="token punctuation">;</span>
  <span class="token directive"><span class="token keyword">server</span> 121.42.11.34:8030</span><span class="token punctuation">;</span>
  <span class="token directive"><span class="token keyword">server</span> 121.42.11.34:8040</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>

<span class="token directive"><span class="token keyword">server</span></span> <span class="token punctuation">{</span>
  <span class="token directive"><span class="token keyword">listen</span> <span class="token number">80</span></span><span class="token punctuation">;</span>
  <span class="token directive"><span class="token keyword">server_name</span> balance.lion.club</span><span class="token punctuation">;</span>
  
  <span class="token directive"><span class="token keyword">location</span> /balance/</span> <span class="token punctuation">{</span>
   <span class="token directive"><span class="token keyword">proxy_pass</span> http://demo_server</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><code>hash $request_uri</code> 表示使用 <code>request_uri </code>变量作为 <code>hash </code>的 <code>key </code>值，只要访问的 <code>URI </code>保持不变，就会一直分发给同一台服务器。</p><h4 id="ip-hash" tabindex="-1"><a class="header-anchor" href="#ip-hash" aria-hidden="true">#</a> ip_hash</h4><p>根据客户端的请求 <code>ip </code>进行判断，只要 <code>ip </code>地址不变就永远分配到同一台主机。它可以有效解决后台服务器 <code>session </code>保持的问题。</p><div class="language-nginx line-numbers-mode" data-ext="nginx"><pre class="language-nginx"><code><span class="token directive"><span class="token keyword">upstream</span> demo_server</span> <span class="token punctuation">{</span>
  <span class="token directive"><span class="token keyword">ip_hash</span></span><span class="token punctuation">;</span>
  <span class="token directive"><span class="token keyword">server</span> 121.42.11.34:8020</span><span class="token punctuation">;</span>
  <span class="token directive"><span class="token keyword">server</span> 121.42.11.34:8030</span><span class="token punctuation">;</span>
  <span class="token directive"><span class="token keyword">server</span> 121.42.11.34:8040</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>

<span class="token directive"><span class="token keyword">server</span></span> <span class="token punctuation">{</span>
  <span class="token directive"><span class="token keyword">listen</span> <span class="token number">80</span></span><span class="token punctuation">;</span>
  <span class="token directive"><span class="token keyword">server_name</span> balance.lion.club</span><span class="token punctuation">;</span>
  
  <span class="token directive"><span class="token keyword">location</span> /balance/</span> <span class="token punctuation">{</span>
   <span class="token directive"><span class="token keyword">proxy_pass</span> http://demo_server</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="最少连接数算法" tabindex="-1"><a class="header-anchor" href="#最少连接数算法" aria-hidden="true">#</a> 最少连接数算法</h4><p>各个 <code>worker </code>子进程通过读取共享内存的数据，来获取后端服务器的信息。来挑选一台当前已建立连接数最少的服务器进行分配请求。</p><div class="language-nginx line-numbers-mode" data-ext="nginx"><pre class="language-nginx"><code><span class="token comment"># 语法：</span>
<span class="token directive"><span class="token keyword">least_conn</span></span><span class="token punctuation">;</span>

<span class="token comment"># 上下文：upstream;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="language-nginx line-numbers-mode" data-ext="nginx"><pre class="language-nginx"><code><span class="token directive"><span class="token keyword">upstream</span> demo_server</span> <span class="token punctuation">{</span>
  <span class="token directive"><span class="token keyword">zone</span> test <span class="token number">10M</span></span><span class="token punctuation">;</span> <span class="token comment"># zone可以设置共享内存空间的名字和大小</span>
  <span class="token directive"><span class="token keyword">least_conn</span></span><span class="token punctuation">;</span>
  <span class="token directive"><span class="token keyword">server</span> 121.42.11.34:8020</span><span class="token punctuation">;</span>
  <span class="token directive"><span class="token keyword">server</span> 121.42.11.34:8030</span><span class="token punctuation">;</span>
  <span class="token directive"><span class="token keyword">server</span> 121.42.11.34:8040</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>

<span class="token directive"><span class="token keyword">server</span></span> <span class="token punctuation">{</span>
  <span class="token directive"><span class="token keyword">listen</span> <span class="token number">80</span></span><span class="token punctuation">;</span>
  <span class="token directive"><span class="token keyword">server_name</span> balance.lion.club</span><span class="token punctuation">;</span>
  
  <span class="token directive"><span class="token keyword">location</span> /balance/</span> <span class="token punctuation">{</span>
   <span class="token directive"><span class="token keyword">proxy_pass</span> http://demo_server</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="配置缓存" tabindex="-1"><a class="header-anchor" href="#配置缓存" aria-hidden="true">#</a> 配置缓存</h3><p>缓存可以非常有效的提升性能，因此不论是客户端（浏览器），还是代理服务器（ <code>Nginx </code>），乃至上游服务器都多少会涉及到缓存。</p>`,29),F=s("code",null,"key ",-1),M=c(`<h4 id="proxy-cache" tabindex="-1"><a class="header-anchor" href="#proxy-cache" aria-hidden="true">#</a> proxy_cache</h4><p>存储一些之前被访问过、而且可能将要被再次访问的资源，使用户可以直接从代理服务器获得，从而减少上游服务器的压力，加快整个访问速度。</p><div class="language-nginx line-numbers-mode" data-ext="nginx"><pre class="language-nginx"><code><span class="token comment"># 语法：</span>
<span class="token directive"><span class="token keyword">proxy_cache</span> zone | <span class="token boolean">off</span></span> <span class="token punctuation">;</span> <span class="token comment"># zone 是共享内存的名称</span>

<span class="token comment"># 默认值：proxy_cache off;</span>

<span class="token comment"># 上下文：http、server、location</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="proxy-cache-path" tabindex="-1"><a class="header-anchor" href="#proxy-cache-path" aria-hidden="true">#</a> proxy_cache_path</h4><p>设置缓存文件的存放路径。</p><div class="language-nginx line-numbers-mode" data-ext="nginx"><pre class="language-nginx"><code><span class="token comment"># 语法：</span>
proxy_cache_path path [level=levels] ... <span class="token comment"># 可选参数省略</span>

<span class="token comment"># 默认值：proxy_cache_path off</span>

<span class="token comment"># 上下文：http</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>参数含义：</p><ul><li><code>path </code>缓存文件的存放路径；</li><li><code>level path</code> 的目录层级；</li><li><code>keys_zone</code> 设置共享内存；</li><li><code>inactive </code>在指定时间内没有被访问，缓存会被清理，默认10分钟；</li></ul><h4 id="proxy-cache-key" tabindex="-1"><a class="header-anchor" href="#proxy-cache-key" aria-hidden="true">#</a> proxy_cache_key</h4><p>设置缓存文件的 <code>key </code>。</p><div class="language-nginx line-numbers-mode" data-ext="nginx"><pre class="language-nginx"><code><span class="token comment"># 语法：</span>
proxy_cache_key

<span class="token comment"># 默认值：proxy_cache_key $scheme$proxy_host$request_uri;</span>

<span class="token comment"># 上下文：http、server、location</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="proxy-cache-valid" tabindex="-1"><a class="header-anchor" href="#proxy-cache-valid" aria-hidden="true">#</a> proxy_cache_valid</h4><p>配置什么状态码可以被缓存，以及缓存时长。</p><div class="language-nginx line-numbers-mode" data-ext="nginx"><pre class="language-nginx"><code><span class="token comment"># 语法：</span>
<span class="token directive"><span class="token keyword">proxy_cache_valid</span> [code...] time</span><span class="token punctuation">;</span>

<span class="token comment"># 上下文：http、server、location</span>

<span class="token comment">#配置示例：</span>
<span class="token directive"><span class="token keyword">proxy_cache_valid</span> <span class="token number">200</span> <span class="token number">304</span> <span class="token number">2m</span></span><span class="token punctuation">;</span><span class="token punctuation">;</span> <span class="token comment"># 说明对于状态为200和304的缓存文件的缓存时间是2分钟</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="proxy-no-cache" tabindex="-1"><a class="header-anchor" href="#proxy-no-cache" aria-hidden="true">#</a> proxy_no_cache</h4><p>定义响应保存到缓存的条件，如果字符串参数的至少一个值不为空且不等于“ 0”，则将不保存该响应到缓存。</p><div class="language-nginx line-numbers-mode" data-ext="nginx"><pre class="language-nginx"><code><span class="token comment"># 语法：</span>
<span class="token directive"><span class="token keyword">proxy_no_cache</span> string</span><span class="token punctuation">;</span>

<span class="token comment"># 上下文：http、server、location</span>

<span class="token comment"># 示例：</span>
<span class="token directive"><span class="token keyword">proxy_no_cache</span> <span class="token variable">$http_pragma</span>    <span class="token variable">$http_authorization</span></span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="proxy-cache-bypass" tabindex="-1"><a class="header-anchor" href="#proxy-cache-bypass" aria-hidden="true">#</a> proxy_cache_bypass</h4><p>定义条件，在该条件下将不会从缓存中获取响应。</p><div class="language-nginx line-numbers-mode" data-ext="nginx"><pre class="language-nginx"><code><span class="token comment"># 语法：</span>
<span class="token directive"><span class="token keyword">proxy_cache_bypass</span> string</span><span class="token punctuation">;</span>

<span class="token comment"># 上下文：http、server、location</span>

<span class="token comment"># 示例：</span>
<span class="token directive"><span class="token keyword">proxy_cache_bypass</span> <span class="token variable">$http_pragma</span>    <span class="token variable">$http_authorization</span></span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="upstream-cache-status-变量" tabindex="-1"><a class="header-anchor" href="#upstream-cache-status-变量" aria-hidden="true">#</a> upstream_cache_status 变量</h4><p>它存储了缓存是否命中的信息，会设置在响应头信息中，在调试中非常有用。</p><div class="language-nginx line-numbers-mode" data-ext="nginx"><pre class="language-nginx"><code>MISS: 				<span class="token comment"># 未命中缓存</span>
HIT: 			    <span class="token comment"># 命中缓存</span>
EXPIRED: 			<span class="token comment"># 缓存过期</span>
STALE: 				<span class="token comment"># 命中了陈旧缓存</span>
REVALIDDATED: 		<span class="token comment"># Nginx验证陈旧缓存依然有效</span>
UPDATING: 			<span class="token comment"># 内容陈旧，但正在更新</span>
BYPASS: 			<span class="token comment"># X响应从原始服务器获取</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="配置实例-1" tabindex="-1"><a class="header-anchor" href="#配置实例-1" aria-hidden="true">#</a> 配置实例</h4><p>我们把 <code>121.42.11.34</code> 服务器作为上游服务器，做如下配置（ <code>/etc/nginx/conf.d/cache.conf</code> ）</p><div class="language-nginx line-numbers-mode" data-ext="nginx"><pre class="language-nginx"><code><span class="token directive"><span class="token keyword">server</span></span> <span class="token punctuation">{</span>
  <span class="token directive"><span class="token keyword">listen</span> <span class="token number">1010</span></span><span class="token punctuation">;</span>
  <span class="token directive"><span class="token keyword">root</span> /usr/share/nginx/html/1010</span><span class="token punctuation">;</span>
  <span class="token directive"><span class="token keyword">location</span> /</span> <span class="token punctuation">{</span>
   <span class="token directive"><span class="token keyword">index</span> index.html</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>

<span class="token directive"><span class="token keyword">server</span></span> <span class="token punctuation">{</span>
  <span class="token directive"><span class="token keyword">listen</span> <span class="token number">1020</span></span><span class="token punctuation">;</span>
  <span class="token directive"><span class="token keyword">root</span> /usr/share/nginx/html/1020</span><span class="token punctuation">;</span>
  <span class="token directive"><span class="token keyword">location</span> /</span> <span class="token punctuation">{</span>
   <span class="token directive"><span class="token keyword">index</span> index.html</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>把 <code>121.5.180.193</code> 服务器作为代理服务器，做如下配置（ <code>/etc/nginx/conf.d/cache.conf</code> ）</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>proxy_cache_path /etc/nginx/cache_temp <span class="token assign-left variable">levels</span><span class="token operator">=</span><span class="token number">2</span>:2 <span class="token assign-left variable">keys_zone</span><span class="token operator">=</span>cache_zone:30m <span class="token assign-left variable">max_size</span><span class="token operator">=</span>2g <span class="token assign-left variable">inactive</span><span class="token operator">=</span>60m <span class="token assign-left variable">use_temp_path</span><span class="token operator">=</span>off<span class="token punctuation">;</span>

upstream cache_server<span class="token punctuation">{</span>
  server <span class="token number">121.42</span>.11.34:1010<span class="token punctuation">;</span>
  server <span class="token number">121.42</span>.11.34:1020<span class="token punctuation">;</span>
<span class="token punctuation">}</span>

server <span class="token punctuation">{</span>
  listen <span class="token number">80</span><span class="token punctuation">;</span>
  server_name cache.lion.club<span class="token punctuation">;</span>
  location / <span class="token punctuation">{</span>
    proxy_cache cache_zone<span class="token punctuation">;</span> <span class="token comment"># 设置缓存内存，上面配置中已经定义好的</span>
    proxy_cache_valid <span class="token number">200</span> 5m<span class="token punctuation">;</span> <span class="token comment"># 缓存状态为200的请求，缓存时长为5分钟</span>
    proxy_cache_key <span class="token variable">$request_uri</span><span class="token punctuation">;</span> <span class="token comment"># 缓存文件的key为请求的URI</span>
    add_header Nginx-Cache-Status <span class="token variable">$upstream_cache_status</span> <span class="token comment"># 把缓存状态设置为头部信息，响应给客户端</span>
    proxy_pass http://cache_server<span class="token punctuation">;</span> <span class="token comment"># 代理转发</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>我们可以在 <code>/etc/nginx/cache_temp</code> 路径下找到相应的缓存文件</strong></p><p><strong>对于一些实时性要求非常高的页面或数据来说，就不应该去设置缓存</strong></p><div class="language-nginx line-numbers-mode" data-ext="nginx"><pre class="language-nginx"><code>...

<span class="token directive"><span class="token keyword">server</span></span> <span class="token punctuation">{</span>
  <span class="token directive"><span class="token keyword">listen</span> <span class="token number">80</span></span><span class="token punctuation">;</span>
  <span class="token directive"><span class="token keyword">server_name</span> cache.lion.club</span><span class="token punctuation">;</span>
  <span class="token comment"># URI 中后缀为 .txt 或 .text 的设置变量值为 &quot;no cache&quot;</span>
  <span class="token directive"><span class="token keyword">if</span> (<span class="token variable">$request_uri</span> ~ \\.(txt|text)$)</span> <span class="token punctuation">{</span>
   set $cache_name &quot;no cache&quot;
  <span class="token punctuation">}</span>
  
  <span class="token directive"><span class="token keyword">location</span> /</span> <span class="token punctuation">{</span>
    <span class="token directive"><span class="token keyword">proxy_no_cache</span> <span class="token variable">$cache_name</span></span><span class="token punctuation">;</span> <span class="token comment"># 判断该变量是否有值，如果有值则不进行缓存，如果没有值则进行缓存</span>
    <span class="token directive"><span class="token keyword">proxy_cache</span> cache_zone</span><span class="token punctuation">;</span> <span class="token comment"># 设置缓存内存</span>
    <span class="token directive"><span class="token keyword">proxy_cache_valid</span> <span class="token number">200</span> <span class="token number">5m</span></span><span class="token punctuation">;</span> <span class="token comment"># 缓存状态为200的请求，缓存时长为5分钟</span>
    <span class="token directive"><span class="token keyword">proxy_cache_key</span> <span class="token variable">$request_uri</span></span><span class="token punctuation">;</span> <span class="token comment"># 缓存文件的key为请求的URI</span>
    <span class="token directive"><span class="token keyword">add_header</span> Nginx-Cache-Status <span class="token variable">$upstream_cache_status</span> <span class="token comment"># 把缓存状态设置为头部信息，响应给客户端</span>
    proxy_pass http://cache_server</span><span class="token punctuation">;</span> <span class="token comment"># 代理转发</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="https" tabindex="-1"><a class="header-anchor" href="#https" aria-hidden="true">#</a> HTTPS</h3><h4 id="https-工作流程" tabindex="-1"><a class="header-anchor" href="#https-工作流程" aria-hidden="true">#</a> HTTPS 工作流程</h4><ol><li>客户端（浏览器）访问 <code>https://www.baidu.com</code> 百度网站；</li><li>百度服务器返回 <code>HTTPS </code>使用的 <code>CA </code>证书；</li><li>浏览器验证 <code>CA </code>证书是否为合法证书；</li><li>验证通过，证书合法，生成一串随机数并使用公钥（证书中提供的）进行加密；</li><li>发送公钥加密后的随机数给百度服务器；</li><li>百度服务器拿到密文，通过私钥进行解密，获取到随机数（公钥加密，私钥解密，反之也可以）；</li><li>百度服务器把要发送给浏览器的内容，使用随机数进行加密后传输给浏览器；</li><li>此时浏览器可以使用随机数进行解密，获取到服务器的真实传输内容；</li></ol><p>这就是 <code>HTTPS </code>的基本运作原理，使用<strong>对称加密和非对称机密配合使用</strong>，保证传输内容的安全性。</p><h3 id="配置证书" tabindex="-1"><a class="header-anchor" href="#配置证书" aria-hidden="true">#</a> 配置证书</h3><p>下载证书的压缩文件，里面有个 <code>Nginx </code> 文件夹，把 <code>xxx.crt</code> 和 <code>xxx.key</code> 文件拷贝到服务器目录，再进行如下配置：</p><div class="language-nginx line-numbers-mode" data-ext="nginx"><pre class="language-nginx"><code><span class="token directive"><span class="token keyword">server</span></span> <span class="token punctuation">{</span>
  <span class="token directive"><span class="token keyword">listen</span> <span class="token number">443</span> ssl http2 default_server</span><span class="token punctuation">;</span>   <span class="token comment"># SSL 访问端口号为 443</span>
  <span class="token directive"><span class="token keyword">server_name</span> lion.club</span><span class="token punctuation">;</span>         <span class="token comment"># 填写绑定证书的域名(我这里是随便写的)</span>
  <span class="token directive"><span class="token keyword">ssl_certificate</span> /etc/nginx/https/lion.club_bundle.crt</span><span class="token punctuation">;</span>   <span class="token comment"># 证书地址</span>
  <span class="token directive"><span class="token keyword">ssl_certificate_key</span> /etc/nginx/https/lion.club.key</span><span class="token punctuation">;</span>      <span class="token comment"># 私钥地址</span>
  <span class="token directive"><span class="token keyword">ssl_session_timeout</span> <span class="token number">10m</span></span><span class="token punctuation">;</span>
  <span class="token directive"><span class="token keyword">ssl_protocols</span> TLSv1 TLSv1.1 TLSv1.2</span><span class="token punctuation">;</span> <span class="token comment"># 支持ssl协议版本，默认为后三个，主流版本是[TLSv1.2]</span>
 
  <span class="token directive"><span class="token keyword">location</span> /</span> <span class="token punctuation">{</span>
    <span class="token directive"><span class="token keyword">root</span>         /usr/share/nginx/html</span><span class="token punctuation">;</span>
    <span class="token directive"><span class="token keyword">index</span>        index.html index.htm</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>如此配置后就能正常访问 <code>HTTPS </code>版的网站了。</p><h3 id="配置跨域cors" tabindex="-1"><a class="header-anchor" href="#配置跨域cors" aria-hidden="true">#</a> 配置跨域CORS</h3><h4 id="跨域的定义" tabindex="-1"><a class="header-anchor" href="#跨域的定义" aria-hidden="true">#</a> 跨域的定义</h4><p>同源策略限制了从同一个源加载的文档或脚本如何与来自另一个源的资源进行交互。这是一个用于隔离潜在恶意文件的重要安全机制。通常不允许不同源间的读操作</p><h4 id="同源的定义" tabindex="-1"><a class="header-anchor" href="#同源的定义" aria-hidden="true">#</a> 同源的定义</h4><p>如果两个页面的协议，端口（如果有指定）和域名都相同，则两个页面具有相同的源</p><p><strong>例：</strong></p><div class="language-nginx line-numbers-mode" data-ext="nginx"><pre class="language-nginx"><code><span class="token comment"># 基于 http://store.company.com/dir/page.html 源</span>
http://store.company.com/dir2/other.html <span class="token comment"># 同源</span>
https://store.company.com/secure.html <span class="token comment"># 不同源，协议不同</span>
http://store.company.com:81/dir/etc.html <span class="token comment"># 不同源，端口不同</span>
http://news.company.com/dir/other.html <span class="token comment"># 不同源，主机不同</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>不同源会有如下限制：</p><ul><li><code>Web </code>数据层面，同源策略限制了不同源的站点读取当前站点的 <code>Cookie </code>、 <code>IndexDB </code>、 <code>LocalStorage </code>等数据。</li><li><code>DOM </code>层面，同源策略限制了来自不同源的 <code>JavaScript </code>脚本对当前 <code>DOM </code>对象读和写的操作。</li><li>网络层面，同源策略限制了通过 <code>XMLHttpRequest </code>等方式将站点的数据发送给不同源的站点。</li></ul><h4 id="nginx-解决跨域的原理" tabindex="-1"><a class="header-anchor" href="#nginx-解决跨域的原理" aria-hidden="true">#</a> Nginx 解决跨域的原理</h4><p>例如：</p><ul><li>前端 <code>server </code>的域名为： <code>fe.server.com</code></li><li>后端服务的域名为： <code>dev.server.com</code></li></ul><p>现在我在 <code>fe.server.com</code> 对 <code>dev.server.com</code> 发起请求一定会出现跨域。</p><p>现在我们只需要启动一个 <code>Nginx</code> 服务器，将 <code>server_name</code> 设置为 <code>fe.server.com</code> 然后设置相应的 <code>location</code> 以拦截前端需要跨域的请求，最后将请求代理回 <code>dev.server.com</code> 。</p><p>如下面的配置：</p><div class="language-nginx line-numbers-mode" data-ext="nginx"><pre class="language-nginx"><code><span class="token directive"><span class="token keyword">server</span></span> <span class="token punctuation">{</span>
 <span class="token directive"><span class="token keyword">listen</span>      <span class="token number">80</span></span><span class="token punctuation">;</span>
 <span class="token directive"><span class="token keyword">server_name</span>  fe.server.com</span><span class="token punctuation">;</span>
 <span class="token directive"><span class="token keyword">location</span> /</span> <span class="token punctuation">{</span>
  <span class="token directive"><span class="token keyword">proxy_pass</span> dev.server.com</span><span class="token punctuation">;</span>
 <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>这样可以完美绕过浏览器的同源策略： <code>fe.server.com</code> 访问 <code>Nginx </code>的 <code>fe.server.com</code> 属于同源访问，而 <code>Nginx </code>对服务端转发的请求不会触发浏览器的同源策略。</p><h3 id="配置开启-gzip-压缩" tabindex="-1"><a class="header-anchor" href="#配置开启-gzip-压缩" aria-hidden="true">#</a> 配置开启 gzip 压缩</h3><p><code>GZIP </code>是规定的三种标准 <code>HTTP </code>压缩格式之一。目前绝大多数的网站都在使用 <code>GZIP </code>传输 <code>HTML </code>、<code>CSS</code> 、 <code>JavaScript </code>等资源文件。</p><p>对于文本文件， <code>GZiP </code>的效果非常明显，开启后传输所需流量大约会降至 <code>1/4~1/3</code> 。</p><p>并不是每个浏览器都支持 <code>gzip </code>的，如何知道客户端是否支持 <code>gzip </code>呢，请求头中的 <code>Accept-Encoding</code> 来标识对压缩的支持。</p><p><img src="`+w+'" alt="image-20230422125129617"></p><p>启用 <code>gzip </code>同时需要客户端和服务端的支持，如果客户端支持 <code>gzip </code>的解析，那么只要服务端能够返回 <code>gzip </code>的文件就可以启用 <code>gzip </code>了,我们可以通过 <code>Nginx </code>的配置来让服务端支持 <code>gzip </code>。下面的 <code>respone </code>中 <code>content-encoding:gzip</code> ，指服务端开启了 <code>gzip </code>的压缩方式。</p><p><img src="'+f+`" alt="img"></p><p>在 <code>/etc/nginx/conf.d/</code> 文件夹中新建配置文件 <code>gzip.conf</code></p><div class="language-nginx line-numbers-mode" data-ext="nginx"><pre class="language-nginx"><code><span class="token comment"># # 默认off，是否开启gzip</span>
<span class="token directive"><span class="token keyword">gzip</span> <span class="token boolean">on</span></span><span class="token punctuation">;</span> 
<span class="token comment"># 要采用 gzip 压缩的 MIME 文件类型，其中 text/html 被系统强制启用；</span>
<span class="token directive"><span class="token keyword">gzip_types</span> text/plain text/css application/json application/x-javascript text/xml application/xml application/xml+rss text/javascript</span><span class="token punctuation">;</span>

<span class="token comment"># ---- 以上两个参数开启就可以支持Gzip压缩了 ---- #</span>

<span class="token comment"># 默认 off，该模块启用后，Nginx 首先检查是否存在请求静态文件的 gz 结尾的文件，如果有则直接返回该 .gz 文件内容；</span>
<span class="token directive"><span class="token keyword">gzip_static</span> <span class="token boolean">on</span></span><span class="token punctuation">;</span>

<span class="token comment"># 默认 off，nginx做为反向代理时启用，用于设置启用或禁用从代理服务器上收到相应内容 gzip 压缩；</span>
<span class="token directive"><span class="token keyword">gzip_proxied</span> any</span><span class="token punctuation">;</span>

<span class="token comment"># 用于在响应消息头中添加 Vary：Accept-Encoding，使代理服务器根据请求头中的 Accept-Encoding 识别是否启用 gzip 压缩；</span>
<span class="token directive"><span class="token keyword">gzip_vary</span> <span class="token boolean">on</span></span><span class="token punctuation">;</span>

<span class="token comment"># gzip 压缩比，压缩级别是 1-9，1 压缩级别最低，9 最高，级别越高压缩率越大，压缩时间越长，建议 4-6；</span>
<span class="token directive"><span class="token keyword">gzip_comp_level</span> <span class="token number">6</span></span><span class="token punctuation">;</span>

<span class="token comment"># 获取多少内存用于缓存压缩结果，16 8k 表示以 8k*16 为单位获得；</span>
<span class="token directive"><span class="token keyword">gzip_buffers</span> <span class="token number">16</span> <span class="token number">8k</span></span><span class="token punctuation">;</span>

<span class="token comment"># 允许压缩的页面最小字节数，页面字节数从header头中的 Content-Length 中进行获取。默认值是 0，不管页面多大都压缩。建议设置成大于 1k 的字节数，小于 1k 可能会越压越大；</span>
<span class="token comment"># gzip_min_length 1k;</span>

<span class="token comment"># 默认 1.1，启用 gzip 所需的 HTTP 最低版本；</span>
<span class="token directive"><span class="token keyword">gzip_http_version</span> 1.1</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>其实也可以通过前端构建工具例如 <code>webpack </code>、<code>rollup </code>等在打生产包时就做好 <code>Gzip </code>压缩，然后放到 <code>Nginx </code>服务器中，这样可以减少服务器的开销，加快访问速度。</p><h2 id="六、nginx架构" tabindex="-1"><a class="header-anchor" href="#六、nginx架构" aria-hidden="true">#</a> 六、Nginx架构</h2><h3 id="进程结构" tabindex="-1"><a class="header-anchor" href="#进程结构" aria-hidden="true">#</a> 进程结构</h3><p>多进程结构 <code>Nginx </code>的进程模型图</p><p><img src="`+N+'" alt="image-20230422125344713"></p><p>多进程中的 <code>Nginx </code>进程架构如下图所示，会有一个父进程（ <code>Master Process </code>），它会有很多子进程（ <code>Child Processes</code> ）。</p><ul><li><code>Master Process</code> 用来管理子进程的，其本身并不真正处理用户请求。</li><li>某个子进程 <code>down </code>掉的话，它会向 <code>Master </code>进程发送一条消息，表明自己不可用了，此时 <code>Master </code>进程会去新起一个子进程。</li><li>某个配置文件被修改了 <code>Master </code>进程会去通知 <code>work </code>进程获取新的配置信息，这也就是我们所说的热部署。</li><li>子进程间是通过共享内存的方式进行通信的。</li></ul><h3 id="配置文件重载原理" tabindex="-1"><a class="header-anchor" href="#配置文件重载原理" aria-hidden="true">#</a> 配置文件重载原理</h3><p><code>reload </code>重载配置文件的流程：</p><ol><li>向 <code>master </code>进程发送 <code>HUP </code>信号（ <code>reload </code>命令）；</li><li><code>master </code>进程检查配置语法是否正确；</li><li><code>master </code>进程打开监听端口；</li><li><code>master </code>进程使用新的配置文件启动新的 <code>worker </code>子进程；</li><li><code>master </code>进程向老的 <code>worker </code>子进程发送 <code>QUIT </code>信号；</li><li>老的 <code>worker</code> 进程关闭监听句柄，处理完当前连接后关闭进程；</li><li>整个过程 <code>Nginx </code>始终处于平稳运行中，实现了平滑升级，用户无感知；</li></ol><h3 id="nginx-模块化管理机制" tabindex="-1"><a class="header-anchor" href="#nginx-模块化管理机制" aria-hidden="true">#</a> Nginx 模块化管理机制</h3><p><code>Nginx </code>的内部结构是由核心部分和一系列的功能模块所组成。这样划分是为了使得每个模块的功能相对简单，便于开发，同时也便于对系统进行功能扩展。Nginx 的模块是互相独立的,低耦合高内聚。</p><p><img src="'+q+'" alt="image-20230422125422165"></p>',78);function B(C,D){const l=t("ExternalLinkIcon"),a=t("RouterLink");return d(),p("div",null,[$,s("p",null,[n("Nginx中文文档："),s("a",z,[n("https://blog.redis.com.cn/doc/"),e(l)])]),R,s("ul",null,[s("li",null,[e(a,{to:"/guide/Nginx/Nginx.html#user"},{default:i(()=>[n("user")]),_:1})]),s("li",null,[e(a,{to:"/guide/Nginx/Nginx.html#pid"},{default:i(()=>[n("pid")]),_:1})]),s("li",null,[e(a,{to:"/guide/Nginx/Nginx.html#worker-rlimit-nofile-number"},{default:i(()=>[n("worker_rlimit_nofile_number")]),_:1})]),s("li",null,[e(a,{to:"/guide/Nginx/Nginx.html#worker-rlimit-core"},{default:i(()=>[n("worker_rlimit_core")]),_:1})]),s("li",null,[e(a,{to:"/guide/Nginx/Nginx.html#worker-processes-number"},{default:i(()=>[n("worker_processes_number")]),_:1})]),s("li",null,[e(a,{to:"/guide/Nginx/Nginx.html#worker-cpu-affinity"},{default:i(()=>[n("worker_cpu_affinity")]),_:1})]),s("li",null,[e(a,{to:"/guide/Nginx/Nginx.html#worker-priority"},{default:i(()=>[n("worker_priority")]),_:1})]),s("li",null,[e(a,{to:"/guide/Nginx/Nginx.html#worker-shutdown-timeout"},{default:i(()=>[n("worker_shutdown_timeout")]),_:1})]),s("li",null,[e(a,{to:"/guide/Nginx/Nginx.html#timer-resolution"},{default:i(()=>[n("timer_resolution")]),_:1})]),s("li",null,[e(a,{to:"/guide/Nginx/Nginx.html#daemon"},{default:i(()=>[n("daemon")]),_:1})])]),S,s("ul",null,[s("li",null,[e(a,{to:"/guide/Nginx/Nginx.html#use"},{default:i(()=>[n("use")]),_:1})]),s("li",null,[e(a,{to:"/guide/Nginx/Nginx.html#worker-connections"},{default:i(()=>[n("worker_connections")]),_:1})]),s("li",null,[e(a,{to:"/guide/Nginx/Nginx.html#accept-mutex"},{default:i(()=>[n("accept_mutex")]),_:1})])]),L,s("div",U,[T,P,s("p",null,[n("有关 upstream 和 proxy_pass 请看"),e(a,{to:"/guide/Nginx/Nginx.html#%E4%BA%94%E3%80%81nginx%E5%AE%9E%E6%88%98%E9%85%8D%E7%BD%AE"},{default:i(()=>[n("五、Nginx实战配置")]),_:1})])]),s("ul",null,[s("li",null,[e(a,{to:"/guide/Nginx/Nginx.html#server-name"},{default:i(()=>[n("server_name")]),_:1})]),s("li",null,[e(a,{to:"/guide/Nginx/Nginx.html#root"},{default:i(()=>[n("root")]),_:1})]),s("li",null,[e(a,{to:"/guide/Nginx/Nginx.html#alias"},{default:i(()=>[n("alias")]),_:1})]),s("li",null,[e(a,{to:"/guide/Nginx/Nginx.html#location"},{default:i(()=>[n("location")]),_:1})]),s("li",null,[e(a,{to:"/guide/Nginx/Nginx.html#return"},{default:i(()=>[n("return")]),_:1})]),s("li",null,[e(a,{to:"/guide/Nginx/Nginx.html#rewrite"},{default:i(()=>[n("rewrite")]),_:1})]),s("li",null,[e(a,{to:"/guide/Nginx/Nginx.html#if"},{default:i(()=>[n("if")]),_:1})]),s("li",null,[e(a,{to:"/guide/Nginx/Nginx.html#autoindex"},{default:i(()=>[n("autoindex")]),_:1})]),s("li",null,[e(a,{to:"/guide/Nginx/Nginx.html#%E5%8F%98%E9%87%8F"},{default:i(()=>[n("变量")]),_:1})])]),A,s("ul",null,[s("li",null,[e(a,{to:"/guide/Nginx/Nginx.html#%E8%BD%AE%E8%AF%A2"},{default:i(()=>[n("轮询")]),_:1})]),s("li",null,[e(a,{to:"/guide/Nginx/Nginx.html#%E5%8A%A0%E6%9D%83%E8%BD%AE%E8%AF%A2"},{default:i(()=>[n("加权轮询")]),_:1})]),s("li",null,[e(a,{to:"/guide/Nginx/Nginx.html#hash-%E7%AE%97%E6%B3%95"},{default:i(()=>[n("hash")]),_:1})]),s("li",null,[e(a,{to:"/guide/Nginx/Nginx.html#ip-hash"},{default:i(()=>[n("ip_hash")]),_:1})]),s("li",null,[e(a,{to:"/guide/Nginx/Nginx.html#%E6%9C%80%E5%B0%91%E8%BF%9E%E6%8E%A5%E6%95%B0%E7%AE%97%E6%B3%95"},{default:i(()=>[n("最少连接数")]),_:1})])]),I,s("ul",null,[s("li",null,[e(a,{to:"/guide/Nginx/Nginx.html#proxy-cache"},{default:i(()=>[n("proxy_cache")]),_:1}),n("：存储一些之前被访问过、而且可能将要被再次访问的资源")]),s("li",null,[e(a,{to:"/guide/Nginx/Nginx.html#proxy-cache-path"},{default:i(()=>[n("proxy_cache_path")]),_:1}),n("：设置缓存文件的存放路径。")]),s("li",null,[e(a,{to:"/guide/Nginx/Nginx.html#proxy-cache-key"},{default:i(()=>[n("proxy_cache_key")]),_:1}),n("：设置缓存文件的 "),F,n("。")]),s("li",null,[e(a,{to:"/guide/Nginx/Nginx.html#proxy-cache-valid"},{default:i(()=>[n("proxy_cache_valid")]),_:1}),n("：配置什么状态码可以被缓存，以及缓存时长。")]),s("li",null,[e(a,{to:"/guide/Nginx/Nginx.html#proxy-no-cache"},{default:i(()=>[n("proxy_no_cache")]),_:1}),n("：定义响应保存到缓存的条件")]),s("li",null,[e(a,{to:"/guide/Nginx/Nginx.html#proxy-cache-bypass"},{default:i(()=>[n("proxy_cache_bypass")]),_:1}),n("：定义条件，在该条件下将不会从缓存中获取响应。")]),s("li",null,[e(a,{to:"/guide/Nginx/Nginx.html#upstream-cache-status-%E5%8F%98%E9%87%8F"},{default:i(()=>[n("upstream_cache_status 变量")]),_:1}),n("：存储了缓存是否命中的信息，会设置在响应头信息中")]),s("li",null,[e(a,{to:"/guide/Nginx/Nginx.html#%E9%85%8D%E7%BD%AE%E5%AE%9E%E4%BE%8B-1"},{default:i(()=>[n("配置实例")]),_:1})])]),M])}const j=o(E,[["render",B],["__file","Nginx.html.vue"]]);export{j as default};
