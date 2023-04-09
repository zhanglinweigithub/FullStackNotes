import{_ as l,M as p,p as c,q as o,R as n,N as e,V as t,t as s,a1 as i}from"./framework-5866ffd3.js";const u={},r=n("h1",{id:"目录",tabindex:"-1"},[n("a",{class:"header-anchor",href:"#目录","aria-hidden":"true"},"#"),s(" 目录")],-1),d={class:"table-of-contents"},k=i(`<h2 id="yaml文件" tabindex="-1"><a class="header-anchor" href="#yaml文件" aria-hidden="true">#</a> YAML文件</h2><ol><li>大小写敏感</li><li>属性层级关系使用多行描述，<strong>每行结尾使用冒号结束</strong></li><li>使用缩进表示层级关系，同层级左侧对齐，只允许使用空格（不允许使用<code>Tab</code>键）</li><li>属性值前面添加空格（属性名与属性值之间使用冒号+空格作为分隔）</li><li><code>#</code>号 表示注释</li></ol><blockquote><p>IDEA 可以使用 Tab 索引， IDEA yyds</p></blockquote><h2 id="书写格式" tabindex="-1"><a class="header-anchor" href="#书写格式" aria-hidden="true">#</a> 书写格式</h2><h3 id="常见书写格式" tabindex="-1"><a class="header-anchor" href="#常见书写格式" aria-hidden="true">#</a> 常见书写格式</h3><div class="language-yaml line-numbers-mode" data-ext="yml"><pre class="language-yaml"><code><span class="token key atrule">boolean</span><span class="token punctuation">:</span> <span class="token boolean important">TRUE</span>  						<span class="token comment">#TRUE,true,True,FALSE,false，False均可</span>
<span class="token key atrule">float</span><span class="token punctuation">:</span> <span class="token number">3.14</span>    						<span class="token comment">#6.8523015e+5  #支持科学计数法</span>
<span class="token key atrule">int</span><span class="token punctuation">:</span> <span class="token number">123</span>       						<span class="token comment">#0b1010_0111_0100_1010_1110    #支持二进制、八进制、十六进制</span>
<span class="token key atrule">null</span><span class="token punctuation">:</span> <span class="token null important">~</span>        						<span class="token comment">#使用~表示null</span>
<span class="token key atrule">string</span><span class="token punctuation">:</span> HelloWorld      			<span class="token comment">#字符串可以直接书写</span>
<span class="token key atrule">string2</span><span class="token punctuation">:</span> <span class="token string">&quot;Hello World&quot;</span>  			<span class="token comment">#可以使用双引号包裹特殊字符</span>
<span class="token key atrule">date</span><span class="token punctuation">:</span> <span class="token datetime number">2018-02-17</span>        			<span class="token comment">#日期必须使用yyyy-MM-dd格式</span>
<span class="token key atrule">datetime</span><span class="token punctuation">:</span> <span class="token datetime number">2018-02-17T15:02:31+08:00</span>  <span class="token comment">#时间和日期之间使用T连接，最后使用+代表时区</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="数组书写格式" tabindex="-1"><a class="header-anchor" href="#数组书写格式" aria-hidden="true">#</a> 数组书写格式</h3><div class="language-yaml line-numbers-mode" data-ext="yml"><pre class="language-yaml"><code><span class="token key atrule">subject</span><span class="token punctuation">:</span>
	<span class="token punctuation">-</span> Java
	<span class="token punctuation">-</span> 前端
	<span class="token punctuation">-</span> 大数据
<span class="token key atrule">enterprise</span><span class="token punctuation">:</span>
	<span class="token key atrule">name</span><span class="token punctuation">:</span> itcast
  <span class="token key atrule">age</span><span class="token punctuation">:</span> <span class="token number">16</span>
  <span class="token key atrule">subject</span><span class="token punctuation">:</span>
  	<span class="token punctuation">-</span> Java
    <span class="token punctuation">-</span> 前端
    <span class="token punctuation">-</span> 大数据
<span class="token key atrule">likes</span><span class="token punctuation">:</span> <span class="token punctuation">[</span>王者荣耀<span class="token punctuation">,</span>刺激战场<span class="token punctuation">]</span>			<span class="token comment">#数组书写缩略格式</span>
<span class="token key atrule">users</span><span class="token punctuation">:</span>							 <span class="token comment">#对象数组格式一</span>
  <span class="token punctuation">-</span> <span class="token key atrule">name</span><span class="token punctuation">:</span> Tom
   	<span class="token key atrule">age</span><span class="token punctuation">:</span> <span class="token number">4</span>
  <span class="token punctuation">-</span> <span class="token key atrule">name</span><span class="token punctuation">:</span> Jerry
    <span class="token key atrule">age</span><span class="token punctuation">:</span> <span class="token number">5</span>
<span class="token key atrule">users</span><span class="token punctuation">:</span>							 <span class="token comment">#对象数组格式二</span>
  <span class="token punctuation">-</span>  
    <span class="token key atrule">name</span><span class="token punctuation">:</span> Tom
    <span class="token key atrule">age</span><span class="token punctuation">:</span> <span class="token number">4</span>
  <span class="token punctuation">-</span>   
    <span class="token key atrule">name</span><span class="token punctuation">:</span> Jerry
    <span class="token key atrule">age</span><span class="token punctuation">:</span> <span class="token number">5</span>			    
<span class="token key atrule">users2</span><span class="token punctuation">:</span> <span class="token punctuation">[</span> <span class="token punctuation">{</span> name<span class="token punctuation">:</span>Tom <span class="token punctuation">,</span> age<span class="token punctuation">:</span><span class="token number">4</span> <span class="token punctuation">}</span> <span class="token punctuation">,</span> <span class="token punctuation">{</span> name<span class="token punctuation">:</span>Jerry <span class="token punctuation">,</span> age<span class="token punctuation">:</span><span class="token number">5</span> <span class="token punctuation">}</span> <span class="token punctuation">]</span>	<span class="token comment">#对象数组缩略格式</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,8);function m(v,b){const a=p("router-link");return c(),o("div",null,[r,n("nav",d,[n("ul",null,[n("li",null,[e(a,{to:"#yaml文件"},{default:t(()=>[s("YAML文件")]),_:1})]),n("li",null,[e(a,{to:"#书写格式"},{default:t(()=>[s("书写格式")]),_:1}),n("ul",null,[n("li",null,[e(a,{to:"#常见书写格式"},{default:t(()=>[s("常见书写格式")]),_:1})]),n("li",null,[e(a,{to:"#数组书写格式"},{default:t(()=>[s("数组书写格式")]),_:1})])])])])]),k])}const h=l(u,[["render",m],["__file","YAML.html.vue"]]);export{h as default};
