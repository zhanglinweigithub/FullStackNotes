import{_ as l,M as c,p as u,q as i,R as n,N as a,V as p,t as s,a1 as e}from"./framework-5866ffd3.js";const k="/FullStackNotes/assets/1674482142948-3a7f6d4d-9a2c-4d24-a61d-d763005a43bb-8fead7ff.png",r="/FullStackNotes/assets/1674482157472-efde99df-d0b1-4df9-9f3a-8c48122d6321-82402629.png",d={},g=n("h1",{id:"目录",tabindex:"-1"},[n("a",{class:"header-anchor",href:"#目录","aria-hidden":"true"},"#"),s(" 目录")],-1),v={class:"table-of-contents"},m=e('<h1 id="hook函数" tabindex="-1"><a class="header-anchor" href="#hook函数" aria-hidden="true">#</a> hook函数</h1><ul><li>什么是<code>hook</code>？—— 本质是一个函数，把<code>setup</code>函数中使用的<code>Composition API</code>进行了封装。</li><li>类似于<code>vue2.x</code>中的<code>mixin</code>。</li><li>自定义<code>hook</code>的优势: 复用代码, 让<code>setup</code>中的逻辑更清楚易懂</li><li>可以配合现有的组件库使用，如 <code>vueuse</code> 、<code>vueRequest</code> 等</li></ul><h1 id="vueuse组件库" tabindex="-1"><a class="header-anchor" href="#vueuse组件库" aria-hidden="true">#</a> vueuse组件库</h1>',3),h={href:"https://vueuse.org/guide/",target:"_blank",rel:"noopener noreferrer"},b=e(`<p>安装</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token function">npm</span> <span class="token function">install</span> @vueuse/core
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>一些函数的用法</p><div class="language-vue line-numbers-mode" data-ext="vue"><pre class="language-vue"><code><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>template</span><span class="token punctuation">&gt;</span></span>
  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>h3</span><span class="token punctuation">&gt;</span></span>X: {{x}}<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>h3</span><span class="token punctuation">&gt;</span></span>
  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>h3</span><span class="token punctuation">&gt;</span></span>Y: {{y}}<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>h3</span><span class="token punctuation">&gt;</span></span>

  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>h3</span><span class="token punctuation">&gt;</span></span>{{count}}<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>h3</span><span class="token punctuation">&gt;</span></span>
  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>input</span> <span class="token attr-name">type</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>button<span class="token punctuation">&quot;</span></span> <span class="token attr-name">@click</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>inc()<span class="token punctuation">&quot;</span></span> <span class="token attr-name">value</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>+<span class="token punctuation">&quot;</span></span><span class="token punctuation">&gt;</span></span>
  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>input</span> <span class="token attr-name">type</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>button<span class="token punctuation">&quot;</span></span> <span class="token attr-name">@click</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>dec()<span class="token punctuation">&quot;</span></span> <span class="token attr-name">value</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>-<span class="token punctuation">&quot;</span></span><span class="token punctuation">&gt;</span></span>

  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>input</span> <span class="token attr-name">type</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>text<span class="token punctuation">&quot;</span></span> <span class="token attr-name">v-model</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>name<span class="token punctuation">&quot;</span></span><span class="token punctuation">&gt;</span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>template</span><span class="token punctuation">&gt;</span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>script</span> <span class="token attr-name">setup</span> <span class="token attr-name">lang</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>ts<span class="token punctuation">&quot;</span></span><span class="token punctuation">&gt;</span></span><span class="token script"><span class="token language-javascript">
<span class="token keyword">import</span> <span class="token punctuation">{</span> useMouse<span class="token punctuation">,</span> useCounter<span class="token punctuation">,</span> useStorage <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">&#39;@vueuse/core&#39;</span>

<span class="token keyword">const</span> <span class="token punctuation">{</span>x<span class="token punctuation">,</span> y<span class="token punctuation">}</span> <span class="token operator">=</span> <span class="token function">useMouse</span><span class="token punctuation">(</span><span class="token punctuation">)</span>

<span class="token keyword">const</span> <span class="token punctuation">{</span>count<span class="token punctuation">,</span> inc<span class="token punctuation">,</span> dec<span class="token punctuation">}</span> <span class="token operator">=</span> <span class="token function">useCounter</span><span class="token punctuation">(</span><span class="token punctuation">)</span>

<span class="token keyword">const</span> name <span class="token operator">=</span> <span class="token function">useStorage</span><span class="token punctuation">(</span><span class="token string">&quot;name&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;&quot;</span><span class="token punctuation">)</span>
</span></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>script</span><span class="token punctuation">&gt;</span></span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h1 id="userequest请求库" tabindex="-1"><a class="header-anchor" href="#userequest请求库" aria-hidden="true">#</a> useRequest请求库</h1>`,5),q={href:"https://next.cn.attojs.org/",target:"_blank",rel:"noopener noreferrer"},f=e(`<p>安装</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token function">npm</span> <span class="token function">install</span> vue-request@next
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><div class="language-vue line-numbers-mode" data-ext="vue"><pre class="language-vue"><code><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>template</span><span class="token punctuation">&gt;</span></span>
  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>h3</span> <span class="token attr-name">v-if</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>students.length === 0<span class="token punctuation">&quot;</span></span><span class="token punctuation">&gt;</span></span>暂无数据<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>h3</span><span class="token punctuation">&gt;</span></span>
  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>ul</span> <span class="token attr-name">v-else</span><span class="token punctuation">&gt;</span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>li</span> <span class="token attr-name">v-for</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>s of students<span class="token punctuation">&quot;</span></span> <span class="token attr-name">:key</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>s.id<span class="token punctuation">&quot;</span></span><span class="token punctuation">&gt;</span></span>
      <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>span</span><span class="token punctuation">&gt;</span></span>{{s.name}}<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>span</span><span class="token punctuation">&gt;</span></span>
      <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>span</span><span class="token punctuation">&gt;</span></span>{{s.sex}}<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>span</span><span class="token punctuation">&gt;</span></span>
      <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>span</span><span class="token punctuation">&gt;</span></span>{{s.age}}<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>span</span><span class="token punctuation">&gt;</span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>li</span><span class="token punctuation">&gt;</span></span>
  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>ul</span><span class="token punctuation">&gt;</span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>template</span><span class="token punctuation">&gt;</span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>script</span> <span class="token attr-name">setup</span> <span class="token attr-name">lang</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>ts<span class="token punctuation">&quot;</span></span><span class="token punctuation">&gt;</span></span><span class="token script"><span class="token language-javascript">
<span class="token keyword">import</span> axios <span class="token keyword">from</span> <span class="token string">&quot;../api/request&quot;</span>
<span class="token keyword">import</span> <span class="token punctuation">{</span> useRequest <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">&#39;vue-request&#39;</span>
<span class="token keyword">import</span> <span class="token punctuation">{</span> computed <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">&#39;vue&#39;</span>
<span class="token keyword">import</span> <span class="token punctuation">{</span> AxiosRespList<span class="token punctuation">,</span> Student <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">&#39;../model/Model8080&#39;</span>

<span class="token comment">// data 代表就是 axios 的响应对象</span>
<span class="token keyword">const</span> <span class="token punctuation">{</span> data <span class="token punctuation">}</span> <span class="token operator">=</span> useRequest<span class="token operator">&lt;</span>AxiosRespList<span class="token operator">&lt;</span>Student<span class="token operator">&gt;&gt;</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> axios<span class="token punctuation">.</span><span class="token function">get</span><span class="token punctuation">(</span><span class="token string">&#39;/api/students&#39;</span><span class="token punctuation">)</span><span class="token punctuation">)</span>

<span class="token keyword">const</span> students <span class="token operator">=</span> <span class="token function">computed</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token operator">=&gt;</span><span class="token punctuation">{</span>
  <span class="token keyword">return</span> data<span class="token operator">?.</span>value<span class="token operator">?.</span>data<span class="token punctuation">.</span>data <span class="token operator">||</span> <span class="token punctuation">[</span><span class="token punctuation">]</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span>
</span></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>script</span><span class="token punctuation">&gt;</span></span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ul><li>data.value 的取值一开始是 undefined，随着响应返回变成 axios 的响应对象</li><li>用 computed 进行适配</li></ul><h1 id="composition-api-的优势-组合式api" tabindex="-1"><a class="header-anchor" href="#composition-api-的优势-组合式api" aria-hidden="true">#</a> Composition API 的优势（组合式API）</h1><p>想要让 Composition API 发挥优势，需要灵活的使用 hook 函数</p><h2 id="options-api-存在的问题" tabindex="-1"><a class="header-anchor" href="#options-api-存在的问题" aria-hidden="true">#</a> Options API 存在的问题</h2><p>使用传统OptionsAPI中，新增或者修改一个需求，就需要分别在data，methods，computed里修改</p><p><img src="`+k+'" alt="image.png"></p><h2 id="composition-api-的优势" tabindex="-1"><a class="header-anchor" href="#composition-api-的优势" aria-hidden="true">#</a> Composition API 的优势</h2><p>我们可以更加优雅的组织我们的代码，函数。让相关功能的代码更加有序的组织在一起</p><p><img src="'+r+`" alt="image.png"></p><h1 id="新的组件" tabindex="-1"><a class="header-anchor" href="#新的组件" aria-hidden="true">#</a> 新的组件</h1><h2 id="fragment" tabindex="-1"><a class="header-anchor" href="#fragment" aria-hidden="true">#</a> Fragment</h2><ul><li>在Vue2中: 组件必须有一个根标签</li><li>在Vue3中: 组件可以没有根标签, 内部会将多个标签包含在一个Fragment虚拟元素中</li><li>好处: 减少标签层级, 减小内存占用</li></ul><h2 id="teleport" tabindex="-1"><a class="header-anchor" href="#teleport" aria-hidden="true">#</a> Teleport</h2><ul><li>什么是Teleport？—— Teleport 是一种能够将我们的<strong>组件html结构</strong>移动到指定位置的技术。</li></ul><div class="language-vue line-numbers-mode" data-ext="vue"><pre class="language-vue"><code><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>teleport</span> <span class="token attr-name">to</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>移动位置<span class="token punctuation">&quot;</span></span><span class="token punctuation">&gt;</span></span> // to后面可以写 html 元素和 css 选择器 如：body、#zhang
	<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>div</span> <span class="token attr-name">v-if</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>isShow<span class="token punctuation">&quot;</span></span> <span class="token attr-name">class</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>mask<span class="token punctuation">&quot;</span></span><span class="token punctuation">&gt;</span></span>
		<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>div</span> <span class="token attr-name">class</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>dialog<span class="token punctuation">&quot;</span></span><span class="token punctuation">&gt;</span></span>
			<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>h3</span><span class="token punctuation">&gt;</span></span>我是一个弹窗<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>h3</span><span class="token punctuation">&gt;</span></span>
			<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>button</span> <span class="token attr-name">@click</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>isShow = false<span class="token punctuation">&quot;</span></span><span class="token punctuation">&gt;</span></span>关闭弹窗<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>button</span><span class="token punctuation">&gt;</span></span>
		<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>div</span><span class="token punctuation">&gt;</span></span>
	<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>div</span><span class="token punctuation">&gt;</span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>teleport</span><span class="token punctuation">&gt;</span></span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="suspense" tabindex="-1"><a class="header-anchor" href="#suspense" aria-hidden="true">#</a> Suspense</h2><p>静态引入：只要你引入的组件，有一个没有加载完毕，那么整个组件都不显示</p><p>动态引入：不管你引入的组件有没有加载完毕，都会显示（哪个加载完毕就显示哪个）</p><ul><li>等待异步组件时渲染一些额外内容，让应用有更好的用户体验</li><li>使用步骤： <ul><li>异步引入组件</li></ul></li></ul><div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code><span class="token keyword">import</span> Child <span class="token keyword">from</span> <span class="token string">&#39;./components/Child&#39;</span> <span class="token comment">//静态引入</span>

<span class="token keyword">import</span> <span class="token punctuation">{</span>defineAsyncComponent<span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">&#39;vue&#39;</span>
<span class="token keyword">const</span> Child <span class="token operator">=</span> <span class="token function">defineAsyncComponent</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token operator">=&gt;</span><span class="token keyword">import</span><span class="token punctuation">(</span><span class="token string">&#39;./components/Child.vue&#39;</span><span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token comment">//动态引入（异步引入）</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ul><li>使用Suspense包裹组件，并配置好default 与 fallback</li></ul><div class="language-vue line-numbers-mode" data-ext="vue"><pre class="language-vue"><code><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>template</span><span class="token punctuation">&gt;</span></span>
	<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>div</span> <span class="token attr-name">class</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>app<span class="token punctuation">&quot;</span></span><span class="token punctuation">&gt;</span></span>
		<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>h3</span><span class="token punctuation">&gt;</span></span>我是App组件<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>h3</span><span class="token punctuation">&gt;</span></span>
		<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>Suspense</span><span class="token punctuation">&gt;</span></span>
			<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>template</span> <span class="token attr-name"><span class="token namespace">v-slot:</span>default</span><span class="token punctuation">&gt;</span></span>
				<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>Child</span><span class="token punctuation">/&gt;</span></span>
			<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>template</span><span class="token punctuation">&gt;</span></span>
			<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>template</span> <span class="token attr-name"><span class="token namespace">v-slot:</span>fallback</span><span class="token punctuation">&gt;</span></span>
				<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>h3</span><span class="token punctuation">&gt;</span></span>加载中.....<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>h3</span><span class="token punctuation">&gt;</span></span>
			<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>template</span><span class="token punctuation">&gt;</span></span>
		<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>Suspense</span><span class="token punctuation">&gt;</span></span>
	<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>div</span><span class="token punctuation">&gt;</span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>template</span><span class="token punctuation">&gt;</span></span>
 
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,25);function _(x,y){const t=c("router-link"),o=c("ExternalLinkIcon");return u(),i("div",null,[g,n("nav",v,[n("ul",null,[n("li",null,[a(t,{to:"#options-api-存在的问题"},{default:p(()=>[s("Options API 存在的问题")]),_:1})]),n("li",null,[a(t,{to:"#composition-api-的优势"},{default:p(()=>[s("Composition API 的优势")]),_:1})]),n("li",null,[a(t,{to:"#fragment"},{default:p(()=>[s("Fragment")]),_:1})]),n("li",null,[a(t,{to:"#teleport"},{default:p(()=>[s("Teleport")]),_:1})]),n("li",null,[a(t,{to:"#suspense"},{default:p(()=>[s("Suspense")]),_:1})])])]),m,n("p",null,[s("官方文档："),n("a",h,[s("https://vueuse.org/guide/"),a(o)])]),b,n("p",null,[s("响应式的 axios 封装，官网地址 "),n("a",q,[s("一个 Vue 请求库 | VueRequest (attojs.org)"),a(o)])]),f])}const C=l(d,[["render",_],["__file","hookAndNewComponent.html.vue"]]);export{C as default};
