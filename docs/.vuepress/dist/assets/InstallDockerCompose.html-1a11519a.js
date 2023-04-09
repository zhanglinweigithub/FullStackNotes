import{_ as t,M as c,p as l,q as r,R as a,N as n,V as o,t as e,a1 as i}from"./framework-5866ffd3.js";const d={},p=a("h1",{id:"目录",tabindex:"-1"},[a("a",{class:"header-anchor",href:"#目录","aria-hidden":"true"},"#"),e(" 目录")],-1),u={class:"table-of-contents"},m=i(`<h2 id="centos安装dockercompose" tabindex="-1"><a class="header-anchor" href="#centos安装dockercompose" aria-hidden="true">#</a> CentOS安装DockerCompose</h2><h3 id="下载" tabindex="-1"><a class="header-anchor" href="#下载" aria-hidden="true">#</a> 下载</h3><p>Linux下需要通过命令下载</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token comment"># 安装</span>
<span class="token function">curl</span> <span class="token parameter variable">-L</span> https://github.com/docker/compose/releases/download/1.23.1/docker-compose-<span class="token variable"><span class="token variable">\`</span><span class="token function">uname</span> <span class="token parameter variable">-s</span><span class="token variable">\`</span></span>-<span class="token variable"><span class="token variable">\`</span><span class="token function">uname</span> <span class="token parameter variable">-m</span><span class="token variable">\`</span></span> <span class="token operator">&gt;</span> /usr/local/bin/docker-compose
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>也可以手动上传到 /usr/local/bin/ 目录</p><h3 id="修改文件权限" tabindex="-1"><a class="header-anchor" href="#修改文件权限" aria-hidden="true">#</a> 修改文件权限</h3><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token comment"># 修改权限</span>
<span class="token function">chmod</span> +x /usr/local/bin/docker-compose
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="base自动补全命令" tabindex="-1"><a class="header-anchor" href="#base自动补全命令" aria-hidden="true">#</a> Base自动补全命令</h3><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token comment"># 补全命令</span>
<span class="token function">curl</span> <span class="token parameter variable">-L</span> https://raw.githubusercontent.com/docker/compose/1.29.1/contrib/completion/bash/docker-compose <span class="token operator">&gt;</span> /etc/bash_completion.d/docker-compose

<span class="token comment"># 如果这里出现错误，需要修改自己的hosts文件</span>
<span class="token builtin class-name">echo</span> <span class="token string">&quot;199.232.68.133 raw.githubusercontent.com&quot;</span> <span class="token operator">&gt;&gt;</span> /etc/hosts
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,9);function h(b,v){const s=c("router-link");return l(),r("div",null,[p,a("nav",u,[a("ul",null,[a("li",null,[n(s,{to:"#centos安装dockercompose"},{default:o(()=>[e("CentOS安装DockerCompose")]),_:1}),a("ul",null,[a("li",null,[n(s,{to:"#下载"},{default:o(()=>[e("下载")]),_:1})]),a("li",null,[n(s,{to:"#修改文件权限"},{default:o(()=>[e("修改文件权限")]),_:1})]),a("li",null,[n(s,{to:"#base自动补全命令"},{default:o(()=>[e("Base自动补全命令")]),_:1})])])])])]),m])}const _=t(d,[["render",h],["__file","InstallDockerCompose.html.vue"]]);export{_ as default};
