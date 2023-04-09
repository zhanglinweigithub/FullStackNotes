import{_ as t,M as o,p as c,q as l,R as n,N as p,V as e,t as s,a1 as i}from"./framework-5866ffd3.js";const u={},r=n("h1",{id:"目录",tabindex:"-1"},[n("a",{class:"header-anchor",href:"#目录","aria-hidden":"true"},"#"),s(" 目录")],-1),d={class:"table-of-contents"},k=i(`<h2 id="运算符与表达式" tabindex="-1"><a class="header-anchor" href="#运算符与表达式" aria-hidden="true">#</a> 运算符与表达式</h2><ul><li><code>+ - * / % ** </code></li><li><code>+= -= *= /= %= **=</code></li><li><code>++ --</code></li><li>位运算、移位运算</li><li><code>== != &gt; &gt;= &lt; &lt;=</code></li><li><code>=== !==</code></li><li><code>&amp;&amp; || !</code></li><li><code>?? ?.</code></li><li><code>...</code></li><li>解构赋值</li></ul><p>**：表示乘方</p><p>3 ** 2 求3的平方</p><h3 id="" tabindex="-1"><a class="header-anchor" href="#" aria-hidden="true">#</a> ===</h3><p>严格相等运算符，用作逻辑判等</p><div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code><span class="token number">1</span> <span class="token operator">==</span> <span class="token number">1</span>    	<span class="token comment">// 返回 true </span>
<span class="token number">1</span> <span class="token operator">==</span> <span class="token string">&#39;1&#39;</span>	<span class="token comment">// 返回 true，会先将右侧的字符串转为数字，再做比较</span>
<span class="token number">1</span> <span class="token operator">===</span> <span class="token string">&#39;1&#39;</span>	<span class="token comment">// 返回 false，类型不等，直接返回 false</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>typeof 查看某个值的类型</p><div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code><span class="token keyword">typeof</span> <span class="token number">1</span>	<span class="token comment">// 返回 &#39;number&#39;</span>
<span class="token keyword">typeof</span> <span class="token string">&#39;1&#39;</span>	<span class="token comment">// 返回 &#39;string&#39;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="-1" tabindex="-1"><a class="header-anchor" href="#-1" aria-hidden="true">#</a> ||</h3><p>需求，如果参数 n 没有传递，给它一个【男】</p><p><strong>推荐</strong>做法</p><div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code><span class="token keyword">function</span> <span class="token function">test</span><span class="token punctuation">(</span>n <span class="token operator">=</span> <span class="token string">&#39;男&#39;</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>n<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>你可能的做法</p><div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code><span class="token keyword">function</span> <span class="token function">test</span><span class="token punctuation">(</span><span class="token parameter">n</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">if</span><span class="token punctuation">(</span>n <span class="token operator">===</span> <span class="token keyword">undefined</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        n <span class="token operator">=</span> <span class="token string">&#39;男&#39;</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
    console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>n<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>还可能是这样</p><div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code><span class="token keyword">function</span> <span class="token function">test</span><span class="token punctuation">(</span><span class="token parameter">n</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    n <span class="token operator">=</span> <span class="token punctuation">(</span>n <span class="token operator">===</span> <span class="token keyword">undefined</span><span class="token punctuation">)</span> <span class="token operator">?</span> <span class="token string">&#39;男&#39;</span> <span class="token operator">:</span> n<span class="token punctuation">;</span>
    console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>n<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>一些老旧代码中可能的做法（不推荐）</p><div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code><span class="token keyword">function</span> <span class="token function">test</span><span class="token punctuation">(</span><span class="token parameter">n</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    n <span class="token operator">=</span> n <span class="token operator">||</span> <span class="token string">&#39;男&#39;</span><span class="token punctuation">;</span>
    console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>n<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>它的语法是</p><div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code>值<span class="token number">1</span> <span class="token operator">||</span> 值<span class="token number">2</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>如果值1 是 Truthy，返回值1，如果值1 是 Falsy 返回值 2</p><h3 id="与" tabindex="-1"><a class="header-anchor" href="#与" aria-hidden="true">#</a> ?? 与 ?.</h3><h4 id="-2" tabindex="-1"><a class="header-anchor" href="#-2" aria-hidden="true">#</a> ??</h4><p>需求，如果参数 n 没有传递或是 null，给它一个【男】</p><p>如果用传统办法</p><div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code><span class="token keyword">function</span> <span class="token function">test</span><span class="token punctuation">(</span><span class="token parameter">n</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">if</span><span class="token punctuation">(</span>n <span class="token operator">===</span> <span class="token keyword">undefined</span> <span class="token operator">||</span> n <span class="token operator">===</span> <span class="token keyword">null</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        n <span class="token operator">=</span> <span class="token string">&#39;男&#39;</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
    console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>n<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>用 ??</p><div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code><span class="token keyword">function</span> <span class="token function">test</span><span class="token punctuation">(</span><span class="token parameter">n</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    n <span class="token operator">=</span> n <span class="token operator">??</span> <span class="token string">&#39;男&#39;</span><span class="token punctuation">;</span>
    console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>n<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>语法</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>值1 ?? 值2
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><ul><li>值1 是 nullish，返回值2</li><li>值1 不是 nullish，返回值1</li></ul><h4 id="-3" tabindex="-1"><a class="header-anchor" href="#-3" aria-hidden="true">#</a> ?.</h4><p>需求，函数参数是一个对象，可能包含有子属性</p><p>例如，参数可能是</p><div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code><span class="token keyword">let</span> stu1 <span class="token operator">=</span> <span class="token punctuation">{</span>
    <span class="token literal-property property">name</span><span class="token operator">:</span><span class="token string">&quot;张三&quot;</span><span class="token punctuation">,</span>
    <span class="token literal-property property">address</span><span class="token operator">:</span> <span class="token punctuation">{</span>
        <span class="token literal-property property">city</span><span class="token operator">:</span> <span class="token string">&#39;北京&#39;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span><span class="token punctuation">;</span>

<span class="token keyword">let</span> stu2 <span class="token operator">=</span> <span class="token punctuation">{</span>
    <span class="token literal-property property">name</span><span class="token operator">:</span><span class="token string">&quot;李四&quot;</span>
<span class="token punctuation">}</span>

<span class="token keyword">let</span> stu3 <span class="token operator">=</span> <span class="token punctuation">{</span>
    <span class="token literal-property property">name</span><span class="token operator">:</span><span class="token string">&quot;李四&quot;</span><span class="token punctuation">,</span>
    <span class="token literal-property property">address</span><span class="token operator">:</span> <span class="token keyword">null</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>现在要访问子属性（有问题）</p><div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code><span class="token keyword">function</span> <span class="token function">test</span><span class="token punctuation">(</span><span class="token parameter">stu</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>stu<span class="token punctuation">.</span>address<span class="token punctuation">.</span>city<span class="token punctuation">)</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>现在希望当某个属性是 nullish 时，短路并返回 undefined，可以用 ?.</p><div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code><span class="token keyword">function</span> <span class="token function">test</span><span class="token punctuation">(</span><span class="token parameter">stu</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>stu<span class="token punctuation">.</span>address<span class="token operator">?.</span>city<span class="token punctuation">)</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>用传统办法</p><div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code><span class="token keyword">function</span> <span class="token function">test</span><span class="token punctuation">(</span><span class="token parameter">stu</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">if</span><span class="token punctuation">(</span>stu<span class="token punctuation">.</span>address <span class="token operator">===</span> <span class="token keyword">undefined</span> <span class="token operator">||</span> stu<span class="token punctuation">.</span>address <span class="token operator">===</span> <span class="token keyword">null</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token keyword">undefined</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token keyword">return</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
    console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>stu<span class="token punctuation">.</span>address<span class="token punctuation">.</span>city<span class="token punctuation">)</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="-4" tabindex="-1"><a class="header-anchor" href="#-4" aria-hidden="true">#</a> ...</h3><p>展开运算符</p><p>作用1：打散数组，把元素传递给多个参数</p><div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code><span class="token keyword">let</span> arr <span class="token operator">=</span> <span class="token punctuation">[</span><span class="token number">1</span><span class="token punctuation">,</span><span class="token number">2</span><span class="token punctuation">,</span><span class="token number">3</span><span class="token punctuation">]</span><span class="token punctuation">;</span>

<span class="token keyword">function</span> <span class="token function">test</span><span class="token punctuation">(</span><span class="token parameter">a<span class="token punctuation">,</span>b<span class="token punctuation">,</span>c</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>a<span class="token punctuation">,</span>b<span class="token punctuation">,</span>c<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>需求，把数组元素依次传递给函数参数</p><p>传统写法</p><div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code><span class="token function">test</span><span class="token punctuation">(</span>arr<span class="token punctuation">[</span><span class="token number">0</span><span class="token punctuation">]</span><span class="token punctuation">,</span>arr<span class="token punctuation">[</span><span class="token number">1</span><span class="token punctuation">]</span><span class="token punctuation">,</span>arr<span class="token punctuation">[</span><span class="token number">2</span><span class="token punctuation">]</span><span class="token punctuation">)</span><span class="token punctuation">;</span>		<span class="token comment">// 输出 1,2,3</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>展开运算符写法</p><div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code><span class="token function">test</span><span class="token punctuation">(</span><span class="token operator">...</span>arr<span class="token punctuation">)</span><span class="token punctuation">;</span>					<span class="token comment">// 输出 1,2,3</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><ul><li>打散可以理解为【去掉了】数组外侧的中括号，只剩下数组元素</li></ul><p>作用2：复制数组或对象</p><p>数组</p><div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code><span class="token keyword">let</span> arr1 <span class="token operator">=</span> <span class="token punctuation">[</span><span class="token number">1</span><span class="token punctuation">,</span><span class="token number">2</span><span class="token punctuation">,</span><span class="token number">3</span><span class="token punctuation">]</span><span class="token punctuation">;</span>
<span class="token keyword">let</span> arr2 <span class="token operator">=</span> <span class="token punctuation">[</span><span class="token operator">...</span>arr1<span class="token punctuation">]</span><span class="token punctuation">;</span>		<span class="token comment">// 复制数组</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>对象</p><div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code><span class="token keyword">let</span> obj1 <span class="token operator">=</span> <span class="token punctuation">{</span><span class="token literal-property property">name</span><span class="token operator">:</span><span class="token string">&#39;张三&#39;</span><span class="token punctuation">,</span> <span class="token literal-property property">age</span><span class="token operator">:</span> <span class="token number">18</span><span class="token punctuation">}</span><span class="token punctuation">;</span>

<span class="token keyword">let</span> obj2 <span class="token operator">=</span> <span class="token punctuation">{</span><span class="token operator">...</span>obj1<span class="token punctuation">}</span><span class="token punctuation">;</span>		<span class="token comment">// 复制对象</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>注意</strong>：展开运算符复制属于浅拷贝，例如</p><div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code><span class="token keyword">let</span> o1 <span class="token operator">=</span> <span class="token punctuation">{</span><span class="token literal-property property">name</span><span class="token operator">:</span><span class="token string">&#39;张三&#39;</span><span class="token punctuation">,</span> <span class="token literal-property property">address</span><span class="token operator">:</span> <span class="token punctuation">{</span><span class="token literal-property property">city</span><span class="token operator">:</span> <span class="token string">&#39;北京&#39;</span><span class="token punctuation">}</span> <span class="token punctuation">}</span>

<span class="token keyword">let</span> o2 <span class="token operator">=</span> <span class="token punctuation">{</span><span class="token operator">...</span>o1<span class="token punctuation">}</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>作用3：合并数组或对象</p><p>合并数组</p><div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code><span class="token keyword">let</span> a1 <span class="token operator">=</span> <span class="token punctuation">[</span><span class="token number">1</span><span class="token punctuation">,</span><span class="token number">2</span><span class="token punctuation">]</span><span class="token punctuation">;</span>
<span class="token keyword">let</span> a2 <span class="token operator">=</span> <span class="token punctuation">[</span><span class="token number">3</span><span class="token punctuation">,</span><span class="token number">4</span><span class="token punctuation">]</span><span class="token punctuation">;</span>

<span class="token keyword">let</span> b1 <span class="token operator">=</span> <span class="token punctuation">[</span><span class="token operator">...</span>a1<span class="token punctuation">,</span><span class="token operator">...</span>a2<span class="token punctuation">]</span><span class="token punctuation">;</span>		<span class="token comment">// 结果 [1,2,3,4]</span>
<span class="token keyword">let</span> b2 <span class="token operator">=</span> <span class="token punctuation">[</span><span class="token operator">...</span>a2<span class="token punctuation">,</span><span class="token number">5</span><span class="token punctuation">,</span><span class="token operator">...</span>a1<span class="token punctuation">]</span>	<span class="token comment">// 结果 [3,4,5,1,2]</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>合并对象</p><div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code><span class="token keyword">let</span> o1 <span class="token operator">=</span> <span class="token punctuation">{</span><span class="token literal-property property">name</span><span class="token operator">:</span><span class="token string">&#39;张三&#39;</span><span class="token punctuation">}</span><span class="token punctuation">;</span>
<span class="token keyword">let</span> o2 <span class="token operator">=</span> <span class="token punctuation">{</span><span class="token literal-property property">age</span><span class="token operator">:</span><span class="token number">18</span><span class="token punctuation">}</span><span class="token punctuation">;</span>
<span class="token keyword">let</span> o3 <span class="token operator">=</span> <span class="token punctuation">{</span><span class="token literal-property property">name</span><span class="token operator">:</span><span class="token string">&#39;李四&#39;</span><span class="token punctuation">}</span><span class="token punctuation">;</span>

<span class="token keyword">let</span> n1 <span class="token operator">=</span> <span class="token punctuation">{</span><span class="token operator">...</span>o1<span class="token punctuation">,</span> <span class="token operator">...</span>o2<span class="token punctuation">}</span><span class="token punctuation">;</span>	<span class="token comment">// 结果 {name:&#39;张三&#39;,age:18}</span>

<span class="token keyword">let</span> n2 <span class="token operator">=</span> <span class="token punctuation">{</span><span class="token operator">...</span>o3<span class="token punctuation">,</span> <span class="token operator">...</span>o2<span class="token punctuation">,</span> <span class="token operator">...</span>o1<span class="token punctuation">}</span><span class="token punctuation">;</span> <span class="token comment">// 结果{name:&#39;李四&#39;,age:18}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ul><li>复制对象时出现同名属性，后面的会覆盖前面的</li></ul><h3 id="-5" tabindex="-1"><a class="header-anchor" href="#-5" aria-hidden="true">#</a> [] {}</h3><p>解构赋值</p><h4 id="-6" tabindex="-1"><a class="header-anchor" href="#-6" aria-hidden="true">#</a> []</h4><p>用在声明变量时</p><div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code><span class="token keyword">let</span> arr <span class="token operator">=</span> <span class="token punctuation">[</span><span class="token number">1</span><span class="token punctuation">,</span><span class="token number">2</span><span class="token punctuation">,</span><span class="token number">3</span><span class="token punctuation">]</span><span class="token punctuation">;</span>

<span class="token keyword">let</span> <span class="token punctuation">[</span>a<span class="token punctuation">,</span> b<span class="token punctuation">,</span> c<span class="token punctuation">]</span> <span class="token operator">=</span> arr<span class="token punctuation">;</span>	<span class="token comment">// 结果 a=1, b=2, c=3</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>用在声明参数时</p><div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code><span class="token keyword">let</span> arr <span class="token operator">=</span> <span class="token punctuation">[</span><span class="token number">1</span><span class="token punctuation">,</span><span class="token number">2</span><span class="token punctuation">,</span><span class="token number">3</span><span class="token punctuation">]</span><span class="token punctuation">;</span>

<span class="token keyword">function</span> <span class="token function">test</span><span class="token punctuation">(</span><span class="token parameter"><span class="token punctuation">[</span>a<span class="token punctuation">,</span>b<span class="token punctuation">,</span>c<span class="token punctuation">]</span></span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>a<span class="token punctuation">,</span>b<span class="token punctuation">,</span>c<span class="token punctuation">)</span> 	<span class="token comment">// 结果 a=1, b=2, c=3</span>
<span class="token punctuation">}</span>

<span class="token function">test</span><span class="token punctuation">(</span>arr<span class="token punctuation">)</span><span class="token punctuation">;</span>				
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="-7" tabindex="-1"><a class="header-anchor" href="#-7" aria-hidden="true">#</a> {}</h4><p>用在声明变量时,变量名称要跟对象属性名一致才能赋值，否则就是undefined,顺序并不影响</p><div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code><span class="token keyword">let</span> obj <span class="token operator">=</span> <span class="token punctuation">{</span><span class="token literal-property property">name</span><span class="token operator">:</span><span class="token string">&quot;张三&quot;</span><span class="token punctuation">,</span> <span class="token literal-property property">age</span><span class="token operator">:</span><span class="token number">18</span><span class="token punctuation">}</span><span class="token punctuation">;</span>

<span class="token keyword">let</span> <span class="token punctuation">{</span>name<span class="token punctuation">,</span>age<span class="token punctuation">}</span> <span class="token operator">=</span> obj<span class="token punctuation">;</span>	<span class="token comment">// 结果 name=张三, age=18</span>

<span class="token comment">//变量名称要跟对象属性名一致才能赋值，否则就是undefined</span>
<span class="token keyword">let</span> <span class="token punctuation">{</span>name<span class="token punctuation">,</span>sex<span class="token punctuation">}</span> <span class="token operator">=</span> obj<span class="token punctuation">;</span>	<span class="token comment">// 结果 name=张三, sex=undefined</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>用在声明参数时</p><div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code><span class="token keyword">let</span> obj <span class="token operator">=</span> <span class="token punctuation">{</span><span class="token literal-property property">name</span><span class="token operator">:</span><span class="token string">&quot;张三&quot;</span><span class="token punctuation">,</span> <span class="token literal-property property">age</span><span class="token operator">:</span><span class="token number">18</span><span class="token punctuation">}</span><span class="token punctuation">;</span>

<span class="token keyword">function</span> <span class="token function">test</span><span class="token punctuation">(</span><span class="token parameter"><span class="token punctuation">{</span>name<span class="token punctuation">,</span> age<span class="token punctuation">}</span></span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>name<span class="token punctuation">,</span> age<span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// 结果 name=张三, age=18</span>
<span class="token punctuation">}</span>

<span class="token function">test</span><span class="token punctuation">(</span>obj<span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,77);function v(m,b){const a=o("router-link");return c(),l("div",null,[r,n("nav",d,[n("ul",null,[n("li",null,[p(a,{to:"#运算符与表达式"},{default:e(()=>[s("运算符与表达式")]),_:1}),n("ul",null,[n("li",null,[p(a,{to:"#"},{default:e(()=>[s("===")]),_:1})]),n("li",null,[p(a,{to:"#-1"},{default:e(()=>[s("||")]),_:1})]),n("li",null,[p(a,{to:"#与"},{default:e(()=>[s("?? 与 ?.")]),_:1})]),n("li",null,[p(a,{to:"#-4"},{default:e(()=>[s("...")]),_:1})]),n("li",null,[p(a,{to:"#-5"},{default:e(()=>[s("[] {}")]),_:1})])])])])]),k])}const h=t(u,[["render",v],["__file","OperatorsAndExpressions.html.vue"]]);export{h as default};
