import{_ as p,M as o,p as l,q as c,R as n,N as t,V as e,t as s,a1 as i}from"./framework-5866ffd3.js";const r="/FullStackNotes/assets/1674742093480-e53b9319-51f8-4721-94a0-8a8a9e877659-2af9b1e4.png",u="/FullStackNotes/assets/image-20230407102937665-b5f8f168.png",d="/FullStackNotes/assets/1674742381494-7fa2f485-d721-4cff-82b4-6514f4ef24bc-418a9812.png",k="/FullStackNotes/assets/1674742592237-8709e4fb-3ba2-482e-959b-3ebffd5653b4-157930ae.png",v={},m=n("h1",{id:"目录",tabindex:"-1"},[n("a",{class:"header-anchor",href:"#目录","aria-hidden":"true"},"#"),s(" 目录")],-1),b={class:"table-of-contents"},g=i(`<h1 id="vue组件" tabindex="-1"><a class="header-anchor" href="#vue组件" aria-hidden="true">#</a> Vue组件</h1><p><strong>私有子组件</strong></p><p>在组件 A 的 <code>components</code> 节点下，注册了组件 F。 则组件 F 只能用在组件 A 中；不能被用在组件 C 中。</p><p><strong>全局组件</strong></p><p>在 vue 项目的 main.js 入口文件中，通过 <code>Vue.component()</code> 方法，可以注册全局组件。</p><p>示例代码如下：</p><div class="language-vue line-numbers-mode" data-ext="vue"><pre class="language-vue"><code>//导入需要全局注册的组件
import Count from &#39;@/components/Count.vue&#39;

//参数1：字符串格式，表示组件的注册名称，参数2：需要被全局注册的组件
Vue.component(&#39;MyCount&#39;,Count)
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="使用vue组件" tabindex="-1"><a class="header-anchor" href="#使用vue组件" aria-hidden="true">#</a> 使用Vue组件</h2><ul><li>使用 import 语法导入需要的组件</li><li>使用 components 节点注册组件</li><li>以标签形式使用刚才注册的组件</li></ul><p><img src="`+r+`" alt="image.png"></p><h2 id="组件的props" tabindex="-1"><a class="header-anchor" href="#组件的props" aria-hidden="true">#</a> 组件的props</h2><p><code>props</code> 是组件的自定义属性，在封装通用组件的时候，合理地使用 <code>props</code> 可以极大的提高组件的复用性！</p><div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code><span class="token comment">//基本语法</span>
<span class="token keyword">export</span> <span class="token keyword">default</span> <span class="token punctuation">{</span>
  <span class="token comment">//组件的自定义属性</span>
  <span class="token literal-property property">props</span><span class="token operator">:</span><span class="token punctuation">[</span><span class="token string">&#39;自定义属性A&#39;</span><span class="token punctuation">,</span><span class="token string">&#39;自定义属性B&#39;</span><span class="token punctuation">,</span><span class="token string">&#39;自定义属性...&#39;</span><span class="token punctuation">]</span><span class="token punctuation">,</span>

  <span class="token comment">//组件的私有数据</span>
  <span class="token function">data</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">return</span> <span class="token punctuation">{</span>

    <span class="token punctuation">}</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>

<span class="token comment">//- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - </span>
<span class="token comment">//- 组件中封装的自定义属性是只读的，程序员不能直接修改 props 的值。否则会直接报错</span>
<span class="token comment">//- 要想修改 props 的值，可以把 props 的值转存到 data 中，因为 data 中的数据都是可读可写的</span>
<span class="token keyword">export</span> <span class="token keyword">default</span> <span class="token punctuation">{</span>
  <span class="token literal-property property">props</span><span class="token operator">:</span><span class="token punctuation">[</span><span class="token string">&#39;init&#39;</span><span class="token punctuation">]</span><span class="token punctuation">,</span>
  <span class="token function">data</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">return</span> <span class="token punctuation">{</span>
      <span class="token literal-property property">count</span><span class="token operator">:</span> <span class="token keyword">this</span><span class="token punctuation">.</span>init <span class="token comment">//把 init 的值转存到 count</span>
    <span class="token punctuation">}</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>

<span class="token comment">//- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - </span>
<span class="token comment">//- 在声明自定义属性时，可以通过 default 来定义属性的默认值。</span>
<span class="token keyword">export</span> <span class="token keyword">default</span> <span class="token punctuation">{</span>
  <span class="token literal-property property">props</span><span class="token operator">:</span><span class="token punctuation">{</span>
    <span class="token literal-property property">init</span><span class="token operator">:</span><span class="token punctuation">{</span>
      <span class="token keyword">default</span><span class="token operator">:</span><span class="token number">1</span> <span class="token comment">//默认值为 1</span>
    <span class="token punctuation">}</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>

<span class="token comment">//- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - </span>
<span class="token comment">//- 在声明自定义属性时，可以通过 type 来定义属性的值类型</span>
<span class="token keyword">export</span> <span class="token keyword">default</span> <span class="token punctuation">{</span>
  <span class="token literal-property property">props</span><span class="token operator">:</span><span class="token punctuation">{</span>
    <span class="token literal-property property">init</span><span class="token operator">:</span><span class="token punctuation">{</span>
      <span class="token keyword">default</span><span class="token operator">:</span><span class="token number">1</span><span class="token punctuation">,</span> <span class="token comment">//默认值为 1</span>
      <span class="token literal-property property">type</span><span class="token operator">:</span> Number <span class="token comment">//通过 type 来定义属性的值类型</span>
    <span class="token punctuation">}</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>

<span class="token comment">//- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - </span>
<span class="token comment">//- 在声明自定义属性时，可以通过 required 选项，将属性设置为必填项，强制用户必须传递属性的值</span>
<span class="token keyword">export</span> <span class="token keyword">default</span> <span class="token punctuation">{</span>
  <span class="token literal-property property">props</span><span class="token operator">:</span><span class="token punctuation">{</span>
    <span class="token literal-property property">init</span><span class="token operator">:</span><span class="token punctuation">{</span>
      <span class="token literal-property property">type</span><span class="token operator">:</span> Number<span class="token punctuation">,</span> <span class="token comment">//通过 type 来定义属性的值类型</span>
      <span class="token literal-property property">required</span><span class="token operator">:</span> <span class="token boolean">true</span>
    <span class="token punctuation">}</span>
  <span class="token punctuation">}</span><span class="token punctuation">,</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ul><li>组件中封装的自定义属性是只读的，程序员不能直接修改 props 的值。否则会直接报错</li><li>要想修改 props 的值，可以把 props 的值转存到 data 中，因为 data 中的数据都是可读可写的！</li><li>在声明自定义属性时，可以通过 default 来定义属性的默认值。</li><li>在声明自定义属性时，可以通过 type 来定义属性的值类型，如果传递过来的值不符合此类型，则会报错</li><li>在声明自定义属性时，可以通过 required 选项，将属性设置为必填项，强制用户必须传递属性的值</li></ul><h2 id="组件之间的数据共享" tabindex="-1"><a class="header-anchor" href="#组件之间的数据共享" aria-hidden="true">#</a> 组件之间的数据共享</h2><p>组件之间的关系：</p><ul><li>​ 父子关系</li><li>​ 兄弟关系</li></ul><p><img src="`+u+`" alt="image-20230407102937665"></p><ul><li>父组件向子组件共享数据使用自定义<code>props</code>属性</li><li>子组件向父组件共享数据使用自定义事件</li><li>兄弟组件之间共享数据使用 <code>EventBus</code>，或使用 <code>VueX</code> 全局共享</li></ul><h3 id="父-子共享数据" tabindex="-1"><a class="header-anchor" href="#父-子共享数据" aria-hidden="true">#</a> 父 ---&gt;子共享数据</h3><p>父组件向子组件共享数据需要使用自定义属性。</p><div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code><span class="token operator">&lt;</span><span class="token operator">!</span><span class="token operator">--</span>父组件<span class="token operator">--</span><span class="token operator">&gt;</span>
<span class="token operator">&lt;</span>Son <span class="token operator">:</span>msg<span class="token operator">=</span><span class="token string">&quot;message&quot;</span> <span class="token operator">:</span>user<span class="token operator">=</span><span class="token string">&quot;userinfo&quot;</span><span class="token operator">&gt;</span><span class="token operator">&lt;</span><span class="token operator">/</span>Son<span class="token operator">&gt;</span>

<span class="token function">data</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
	<span class="token keyword">return</span> <span class="token punctuation">{</span>
		<span class="token literal-property property">message</span><span class="token operator">:</span><span class="token string">&#39;hello vue&#39;</span><span class="token punctuation">,</span>
		<span class="token literal-property property">userinfo</span><span class="token operator">:</span><span class="token punctuation">{</span>
			<span class="token literal-property property">name</span><span class="token operator">:</span> <span class="token string">&#39;zs&#39;</span><span class="token punctuation">,</span>
			<span class="token literal-property property">age</span><span class="token operator">:</span> <span class="token number">20</span>
		<span class="token punctuation">}</span>
	<span class="token punctuation">}</span>
<span class="token punctuation">}</span>

<span class="token operator">&lt;</span><span class="token operator">!</span><span class="token operator">--</span>子组件<span class="token operator">--</span><span class="token operator">&gt;</span>
<span class="token operator">&lt;</span>template<span class="token operator">&gt;</span>
	<span class="token operator">&lt;</span>div<span class="token operator">&gt;</span>
        <span class="token operator">&lt;</span>h5<span class="token operator">&gt;</span>Son 组件<span class="token operator">&lt;</span><span class="token operator">/</span>h5<span class="token operator">&gt;</span>
        <span class="token operator">&lt;</span>p<span class="token operator">&gt;</span>父组件传递过来的msg：<span class="token punctuation">{</span><span class="token punctuation">{</span> msg <span class="token punctuation">}</span><span class="token punctuation">}</span><span class="token operator">&lt;</span><span class="token operator">/</span>p<span class="token operator">&gt;</span>
        <span class="token operator">&lt;</span>p<span class="token operator">&gt;</span>父组件传递过来的user：<span class="token punctuation">{</span><span class="token punctuation">{</span> user <span class="token punctuation">}</span><span class="token punctuation">}</span><span class="token operator">&lt;</span><span class="token operator">/</span>p<span class="token operator">&gt;</span>
    <span class="token operator">&lt;</span><span class="token operator">/</span>div<span class="token operator">&gt;</span>
<span class="token operator">&lt;</span><span class="token operator">/</span>template<span class="token operator">&gt;</span>

<span class="token literal-property property">props</span><span class="token operator">:</span><span class="token punctuation">[</span><span class="token string">&#39;msg&#39;</span><span class="token punctuation">,</span><span class="token string">&#39;user&#39;</span><span class="token punctuation">]</span>

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="子-父共享数据" tabindex="-1"><a class="header-anchor" href="#子-父共享数据" aria-hidden="true">#</a> 子 ---&gt;父共享数据</h3><p>子组件向父组件共享数据使用自定义事件。</p><div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code><span class="token operator">&lt;</span><span class="token operator">!</span><span class="token operator">--</span>父组件<span class="token operator">--</span><span class="token operator">&gt;</span>
<span class="token operator">&lt;</span>Son @numchange<span class="token operator">=</span><span class="token string">&quot;getNewCount&quot;</span><span class="token operator">&gt;</span><span class="token operator">&lt;</span><span class="token operator">/</span>Son<span class="token operator">&gt;</span>

<span class="token keyword">export</span> <span class="token keyword">default</span> <span class="token punctuation">{</span>
	<span class="token function">data</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
		<span class="token keyword">return</span><span class="token punctuation">{</span>
			<span class="token literal-property property">countFromSon</span><span class="token operator">:</span> <span class="token number">0</span>
		<span class="token punctuation">}</span>
	<span class="token punctuation">}</span><span class="token punctuation">,</span>
	<span class="token literal-property property">method</span><span class="token operator">:</span><span class="token punctuation">{</span>
		<span class="token function">getNewCount</span><span class="token punctuation">(</span><span class="token parameter">val</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
			<span class="token keyword">this</span><span class="token punctuation">.</span>countFromSon <span class="token operator">=</span> val
		<span class="token punctuation">}</span>
	<span class="token punctuation">}</span>
<span class="token punctuation">}</span>

<span class="token operator">&lt;</span><span class="token operator">!</span><span class="token operator">--</span>子组件<span class="token operator">--</span><span class="token operator">&gt;</span>
<span class="token operator">&lt;</span>button @click<span class="token operator">=</span><span class="token string">&quot;add()&quot;</span><span class="token operator">&gt;</span><span class="token operator">&lt;</span><span class="token operator">/</span>button<span class="token operator">&gt;</span>

<span class="token keyword">export</span> <span class="token keyword">default</span> <span class="token punctuation">{</span>
	<span class="token function">data</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
		<span class="token keyword">return</span><span class="token punctuation">{</span>
			<span class="token literal-property property">count</span><span class="token operator">:</span> <span class="token number">0</span>
		<span class="token punctuation">}</span>
	<span class="token punctuation">}</span><span class="token punctuation">,</span>
	<span class="token literal-property property">method</span><span class="token operator">:</span><span class="token punctuation">{</span>
		<span class="token function">add</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
			<span class="token keyword">this</span><span class="token punctuation">.</span>count <span class="token operator">+=</span> <span class="token number">7</span>
			<span class="token comment">//修改数据时，通过 $emit() 触发自定义事件</span>
			<span class="token keyword">this</span><span class="token punctuation">.</span><span class="token function">$emit</span><span class="token punctuation">(</span><span class="token string">&#39;numchange&#39;</span><span class="token punctuation">,</span><span class="token keyword">this</span><span class="token punctuation">.</span>count<span class="token punctuation">)</span>
		<span class="token punctuation">}</span>
	<span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="兄弟之间的数据共享" tabindex="-1"><a class="header-anchor" href="#兄弟之间的数据共享" aria-hidden="true">#</a> 兄弟之间的数据共享</h3><p><img src="`+d+`" alt="image.png"></p><ul><li>创建 eventBus.js 模块，并向外共享一个 Vue 的实例对象</li><li>在数据发送方，调用 bus.$emit(&#39;事件名称&#39;, 要发送的数据) 方法触发自定义事件</li><li>在数据接收方，调用 bus.$on(&#39;事件名称&#39;, 事件处理函数) 方法注册一个自定义事件</li></ul><h2 id="动态组件" tabindex="-1"><a class="header-anchor" href="#动态组件" aria-hidden="true">#</a> 动态组件</h2><p>动态组件指的是动态切换组件的显示与隐藏</p><p>vue 提供了一个内置的 组件，专门用来实现动态组件的渲染。</p><h3 id="动态组件渲染" tabindex="-1"><a class="header-anchor" href="#动态组件渲染" aria-hidden="true">#</a> 动态组件渲染</h3><div class="language-vue line-numbers-mode" data-ext="vue"><pre class="language-vue"><code><span class="token comment">&lt;!-- 通过 is 属性，动态指定要渲染的组件 --&gt;</span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>component</span> <span class="token attr-name">:is</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>comName<span class="token punctuation">&quot;</span></span><span class="token punctuation">&gt;</span></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>component</span><span class="token punctuation">&gt;</span></span>

<span class="token comment">&lt;!-- 点击按钮，动态切换组件的名称 --&gt;</span>
  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>button</span> <span class="token attr-name">@click</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>comName = &#39;Left&#39;<span class="token punctuation">&quot;</span></span><span class="token punctuation">&gt;</span></span>展示 Left 组件<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>button</span><span class="token punctuation">&gt;</span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>button</span> <span class="token attr-name">@click</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>comName = &#39;Right&#39;<span class="token punctuation">&quot;</span></span><span class="token punctuation">&gt;</span></span>展示 Right 组件<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>button</span><span class="token punctuation">&gt;</span></span>

    <span class="token comment">&lt;!--  --&gt;</span>
    data(){
    return{
      comName:&#39;Left&#39; //要渲染的组件名称
    }
  }
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="保持组件状态-keep-alive" tabindex="-1"><a class="header-anchor" href="#保持组件状态-keep-alive" aria-hidden="true">#</a> 保持组件状态 keep-alive</h3><p>默认情况下，切换动态组件时无法保持组件的状态。此时可以使用 vue 内置的 组件保持动态组 件的状态。</p><div class="language-vue line-numbers-mode" data-ext="vue"><pre class="language-vue"><code><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>keep-alive</span><span class="token punctuation">&gt;</span></span>
  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>component</span> <span class="token attr-name">:is</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>comName<span class="token punctuation">&quot;</span></span><span class="token punctuation">&gt;</span></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>component</span><span class="token punctuation">&gt;</span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>keep-alive</span><span class="token punctuation">&gt;</span></span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>keep-alive 对应的生命周期函数</strong></p><p><img src="`+k+`" alt="image.png"></p><p><strong>keep-alive 的 include 属性</strong></p><p><code>include</code> 属性用来指定：只有名称匹配的组件会被缓存。多个组件名之间使用英文的逗号分隔</p><div class="language-vue line-numbers-mode" data-ext="vue"><pre class="language-vue"><code><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>keep-alive</span> <span class="token attr-name">include</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>MyLeft,MyRight<span class="token punctuation">&quot;</span></span><span class="token punctuation">&gt;</span></span>
	<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>component</span> <span class="token attr-name">:is</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>comName<span class="token punctuation">&quot;</span></span><span class="token punctuation">&gt;</span></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>component</span><span class="token punctuation">&gt;</span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>keep-alive</span><span class="token punctuation">&gt;</span></span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,41);function h(y,f){const a=o("router-link");return l(),c("div",null,[m,n("nav",b,[n("ul",null,[n("li",null,[t(a,{to:"#使用vue组件"},{default:e(()=>[s("使用Vue组件")]),_:1})]),n("li",null,[t(a,{to:"#组件的props"},{default:e(()=>[s("组件的props")]),_:1})]),n("li",null,[t(a,{to:"#组件之间的数据共享"},{default:e(()=>[s("组件之间的数据共享")]),_:1}),n("ul",null,[n("li",null,[t(a,{to:"#父-子共享数据"},{default:e(()=>[s("父 --->子共享数据")]),_:1})]),n("li",null,[t(a,{to:"#子-父共享数据"},{default:e(()=>[s("子 --->父共享数据")]),_:1})]),n("li",null,[t(a,{to:"#兄弟之间的数据共享"},{default:e(()=>[s("兄弟之间的数据共享")]),_:1})])])]),n("li",null,[t(a,{to:"#动态组件"},{default:e(()=>[s("动态组件")]),_:1}),n("ul",null,[n("li",null,[t(a,{to:"#动态组件渲染"},{default:e(()=>[s("动态组件渲染")]),_:1})]),n("li",null,[t(a,{to:"#保持组件状态-keep-alive"},{default:e(()=>[s("保持组件状态 keep-alive")]),_:1})])])])])]),g])}const q=p(v,[["render",h],["__file","VueComponent.html.vue"]]);export{q as default};
