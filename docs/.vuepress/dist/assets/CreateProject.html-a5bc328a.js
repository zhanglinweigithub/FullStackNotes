import{_ as d,M as l,p as r,q as o,R as e,N as s,V as a,t as n,a1 as t}from"./framework-5866ffd3.js";const v={},u=e("h1",{id:"目录",tabindex:"-1"},[e("a",{class:"header-anchor",href:"#目录","aria-hidden":"true"},"#"),n(" 目录")],-1),m={class:"table-of-contents"},p=t(`<h1 id="创建项目" tabindex="-1"><a class="header-anchor" href="#创建项目" aria-hidden="true">#</a> 创建项目</h1><h2 id="vite创建" tabindex="-1"><a class="header-anchor" href="#vite创建" aria-hidden="true">#</a> Vite创建</h2><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token function">npm</span> init vite@latest 项目名

<span class="token builtin class-name">cd</span> 项目目录
<span class="token function">npm</span> <span class="token function">install</span>
<span class="token function">npm</span> run dev
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="配置vite" tabindex="-1"><a class="header-anchor" href="#配置vite" aria-hidden="true">#</a> 配置Vite</h3>`,4),h={href:"https://vitejs.cn/config/#server-port",target:"_blank",rel:"noopener noreferrer"},b=t(`<h2 id="vue-cli创建" tabindex="-1"><a class="header-anchor" href="#vue-cli创建" aria-hidden="true">#</a> Vue-cli创建</h2><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token comment">## 查看@vue/cli版本，确保@vue/cli版本在4.5.0以上</span>
vue <span class="token parameter variable">--version</span>
<span class="token comment">## 安装或者升级你的@vue/cli</span>
<span class="token function">npm</span> <span class="token function">install</span> <span class="token parameter variable">-g</span> @vue/cli
<span class="token comment">## 创建</span>
vue create vue_test
<span class="token comment">## 启动</span>
<span class="token builtin class-name">cd</span> vue_test
<span class="token function">npm</span> run serve
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="项目结构" tabindex="-1"><a class="header-anchor" href="#项目结构" aria-hidden="true">#</a> 项目结构</h2><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>index.html
package.json
tsconfig.json
vite.config.ts
├─public
└─src
    ├─assets
    ├─components
    ├─model
    ├─router
    ├─store
    └─views
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ul><li>index.html 为主页面</li><li>package.json npm 配置文件</li><li>tsconfig.json typescript 配置文件</li><li>vite.config.ts vite 配置文件</li><li>public 静态资源</li><li>src/components 可重用组件</li><li>src/model 模型定义</li><li>src/router 路由</li><li>src/store 共享存储</li><li>src/views 视图组件</li></ul>`,5);function _(f,k){const i=l("router-link"),c=l("ExternalLinkIcon");return r(),o("div",null,[u,e("nav",m,[e("ul",null,[e("li",null,[s(i,{to:"#vite创建"},{default:a(()=>[n("Vite创建")]),_:1}),e("ul",null,[e("li",null,[s(i,{to:"#配置vite"},{default:a(()=>[n("配置Vite")]),_:1})])])]),e("li",null,[s(i,{to:"#vue-cli创建"},{default:a(()=>[n("Vue-cli创建")]),_:1})]),e("li",null,[s(i,{to:"#项目结构"},{default:a(()=>[n("项目结构")]),_:1})])])]),p,e("p",null,[n("文档地址："),e("a",h,[n("配置 Vite {#configuring-vite} | Vite中文网 (vitejs.cn)"),s(c)])]),b])}const x=d(v,[["render",_],["__file","CreateProject.html.vue"]]);export{x as default};
