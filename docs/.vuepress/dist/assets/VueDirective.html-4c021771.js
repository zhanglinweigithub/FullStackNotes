import{_ as a,M as d,p as t,q as c,R as n,N as s,V as l,t as e,a1 as v}from"./framework-5866ffd3.js";const r={},u=n("h1",{id:"目录",tabindex:"-1"},[n("a",{class:"header-anchor",href:"#目录","aria-hidden":"true"},"#"),e(" 目录")],-1),o={class:"table-of-contents"},b=v(`<h1 id="自定义指令" tabindex="-1"><a class="header-anchor" href="#自定义指令" aria-hidden="true">#</a> 自定义指令</h1><p>vue 官方提供了 <code>v-text</code>、<code>v-for</code>、<code>v-model</code>、<code>v-if</code> 等常用的指令。</p><p>除此之外 <code>vue</code> 还允许开发者自定义指令</p><p>vue 中的自定义指令分为两类，分别是：</p><ul><li>私有自定义指令</li><li>全局自定义指令</li></ul><p>可以在 directives 节点下声明私有自定义指令。</p><p>全局共享的自定义指令需要通过“Vue.directive()”进行声明</p><h2 id="私有自定义指令" tabindex="-1"><a class="header-anchor" href="#私有自定义指令" aria-hidden="true">#</a> 私有自定义指令</h2><p>可以在 <code>directives</code> 节点下声明私有自定义指令。</p><div class="language-vue line-numbers-mode" data-ext="vue"><pre class="language-vue"><code>//基本使用
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>h1</span> <span class="token attr-name">v-color</span><span class="token punctuation">&gt;</span></span>App 组件<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>h1</span><span class="token punctuation">&gt;</span></span>

directives: {
	color: {
		//为绑定到的 HTML 元素设置红色的文字
        //bind 函数只调用 1 次：当指令第一次绑定到元素时调用，当 DOM 更新时 bind 函数不会被触发
		bind(el) {
			//形参中的 el 是绑定了此指令的、原生的 DOM 对象
			el.style.color = &#39;red&#39;
		}
	}
}

//- - - - - - - - - - - - - - - - - - - - - - - - - - - - 
//为自定义指令动态绑定参数值
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>h1</span> <span class="token attr-name">v-color</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>color<span class="token punctuation">&quot;</span></span><span class="token punctuation">&gt;</span></span>App 组件<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>h1</span><span class="token punctuation">&gt;</span></span>

data(){
    return {
        color: &#39;blue&#39;
    }
},
directives: {
	color: {
		//在声明自定义指令时，可以通过形参中的第二个参数，来接收指令的参数值
		bind(el,binding) {
			//通过 binding 对象的 value 属性，获取动态的参数值
			el.style.color = binding.value
		}
	}
}    

//- - - - - - - - - - - - - - - - - - - - - - - - - - - - 
// bind 函数和 update 函数
directives: {
	color: {
		//bind 函数只调用 1 次：当指令第一次绑定到元素时调用，当 DOM 更新时 bind 函数不会被触发
		bind(el,binding) {
			//通过 binding 对象的 value 属性，获取动态的参数值
			el.style.color = binding.value
		},
        //update 函数会在每次 DOM 更新时被调用
        update(el,binding) {
			el.style.color = binding.value
		}
	}
}  

//- - - - - - - - - - - - - - - - - - - - - - - - - - - - 
// 函数简写
//如果 bind 和 update 函数中的逻辑完全相同，则对象格式的自定义指令可以简写成函数格式
directives: {
	color(el,binding) {
		el.style.color = binding.value
	}
}  
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ul><li>在使用自定义指令时，需要加上 v- 前缀</li><li>在声明自定义指令时，可以通过形参中的第二个参数，来接收指令的参数值</li><li>bind 函数只调用 1 次：当指令第一次绑定到元素时调用，当 DOM 更新时 bind 函数不会被触发</li><li>update 函 数会在每次 DOM 更新时被调用</li></ul><h2 id="全局自定义指令" tabindex="-1"><a class="header-anchor" href="#全局自定义指令" aria-hidden="true">#</a> 全局自定义指令</h2><p>全局共享的自定义指令需要通过“<code>Vue.directive()</code>”进行声明</p><div class="language-vue line-numbers-mode" data-ext="vue"><pre class="language-vue"><code>//参数1：字符串，表示全局自定义指令的名字
//参数2：对象，用来接收指令的参数值
Vue.directive(&#39;color&#39;,function(el,binding){
	el.style.color = binding.value
})
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,14);function p(m,h){const i=d("router-link");return t(),c("div",null,[u,n("nav",o,[n("ul",null,[n("li",null,[s(i,{to:"#私有自定义指令"},{default:l(()=>[e("私有自定义指令")]),_:1})]),n("li",null,[s(i,{to:"#全局自定义指令"},{default:l(()=>[e("全局自定义指令")]),_:1})])])]),b])}const k=a(r,[["render",p],["__file","VueDirective.html.vue"]]);export{k as default};
