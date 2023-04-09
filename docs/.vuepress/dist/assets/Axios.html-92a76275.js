import{_ as p,M as o,p as i,q as c,R as n,N as t,V as e,t as s,a1 as l}from"./framework-5866ffd3.js";const r={},u=n("h1",{id:"目录",tabindex:"-1"},[n("a",{class:"header-anchor",href:"#目录","aria-hidden":"true"},"#"),s(" 目录")],-1),d={class:"table-of-contents"},k=l(`<h1 id="axios" tabindex="-1"><a class="header-anchor" href="#axios" aria-hidden="true">#</a> Axios</h1><p><code>axios</code> 它的底层是用了 XMLHttpRequest（xhr）方式发送请求和接收响应，<code>xhr</code> 相对于之前讲过的 fetch api 来说，功能更强大，但由于是比较老的 api，不支持 Promise，axios 对 xhr 进行了封装，使之支持 Promise，并提供了对请求、响应的统一拦截功能</p><p><strong>安装</strong></p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token function">npm</span> <span class="token function">install</span> axios <span class="token parameter variable">-S</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p><strong>导入</strong></p><div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code><span class="token keyword">import</span> axios <span class="token keyword">from</span> <span class="token string">&#39;axios&#39;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><ul><li>axios 默认导出一个对象，这里的 import 导入的就是它默认导出的对象</li></ul><p><strong>方法</strong></p><table><thead><tr><th><strong>请求</strong></th><th><strong>备注</strong></th></tr></thead><tbody><tr><td>axios.get(url[, config])</td><td>⭐️</td></tr><tr><td>axios.delete(url[, config])</td><td></td></tr><tr><td>axios.head(url[, config])</td><td></td></tr><tr><td>axios.options(url[, config])</td><td></td></tr><tr><td>axios.post(url[, data[, config]])</td><td>⭐️</td></tr><tr><td>axios.put(url[, data[, config]])</td><td></td></tr><tr><td>axios.patch(url[, data[, config]])</td><td></td></tr></tbody></table><ul><li>config - 选项对象、例如查询参数、请求头...</li><li>data - 请求体数据、最常见的是 json 格式数据</li><li>get、head 请求无法携带请求体，这应当是浏览器的限制所致（xhr、fetch api 均有限制）</li><li>options、delete 请求可以通过 config 中的 data 携带请求体</li></ul><div class="language-vue line-numbers-mode" data-ext="vue"><pre class="language-vue"><code><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>template</span><span class="token punctuation">&gt;</span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>div</span><span class="token punctuation">&gt;</span></span>
        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>input</span> <span class="token attr-name">type</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>button<span class="token punctuation">&quot;</span></span> <span class="token attr-name">value</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>获取远程数据<span class="token punctuation">&quot;</span></span> <span class="token attr-name">@click</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>sendReq()<span class="token punctuation">&quot;</span></span><span class="token punctuation">&gt;</span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>div</span><span class="token punctuation">&gt;</span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>template</span><span class="token punctuation">&gt;</span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>script</span><span class="token punctuation">&gt;</span></span><span class="token script"><span class="token language-javascript">
<span class="token keyword">import</span> axios <span class="token keyword">from</span> <span class="token string">&#39;axios&#39;</span>
<span class="token keyword">const</span> options <span class="token operator">=</span> <span class="token punctuation">{</span>
    <span class="token literal-property property">methods</span><span class="token operator">:</span> <span class="token punctuation">{</span>
        <span class="token keyword">async</span> <span class="token function">sendReq</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
            <span class="token comment">// 1. 演示 get, post</span>
            <span class="token comment">// const resp = await axios.post(&#39;/api/a2&#39;);</span>

            <span class="token comment">// 2. 发送请求头</span>
            <span class="token comment">// const resp = await axios.post(&#39;/api/a3&#39;,{},{</span>
            <span class="token comment">//     headers:{</span>
            <span class="token comment">//         Authorization:&#39;abc&#39;</span>
            <span class="token comment">//     }</span>
            <span class="token comment">// });</span>

            <span class="token comment">// 3. 发送请求时携带查询参数 ?name=xxx&amp;age=xxx</span>
            <span class="token comment">// const name = encodeURIComponent(&#39;&amp;&amp;&amp;&#39;);</span>
            <span class="token comment">// const age = 18;</span>
            <span class="token comment">// const resp = await axios.post(\`/api/a4?name=\${name}&amp;age=\${age}\`);</span>

            <span class="token comment">// 不想自己拼串、处理特殊字符、就用下面的办法</span>
            <span class="token comment">// const resp = await axios.post(&#39;/api/a4&#39;, {}, {</span>
            <span class="token comment">//     params: {</span>
            <span class="token comment">//         name:&#39;&amp;&amp;&amp;&amp;&#39;,</span>
            <span class="token comment">//         age: 20</span>
            <span class="token comment">//     }</span>
            <span class="token comment">// });</span>

            <span class="token comment">// 4. 用请求体发数据，格式为 urlencoded</span>
            <span class="token comment">// const params = new URLSearchParams();</span>
            <span class="token comment">// params.append(&quot;name&quot;, &quot;张三&quot;);</span>
            <span class="token comment">// params.append(&quot;age&quot;, 24)</span>

            <span class="token comment">// const resp = await axios.post(&#39;/api/a4&#39;, params);</span>

            <span class="token comment">// 5. 用请求体发数据，格式为 multipart</span>
            <span class="token comment">// const params = new FormData();</span>
            <span class="token comment">// params.append(&quot;name&quot;, &quot;李四&quot;);</span>
            <span class="token comment">// params.append(&quot;age&quot;, 30);</span>
            <span class="token comment">// const resp = await axios.post(&#39;/api/a5&#39;, params);</span>

            <span class="token comment">// 6. 用请求体发数据，格式为 json</span>
            <span class="token keyword">const</span> resp <span class="token operator">=</span> <span class="token keyword">await</span> axios<span class="token punctuation">.</span><span class="token function">post</span><span class="token punctuation">(</span><span class="token string">&#39;/api/a5json&#39;</span><span class="token punctuation">,</span> <span class="token punctuation">{</span>
                <span class="token literal-property property">name</span><span class="token operator">:</span> <span class="token string">&#39;王五&#39;</span><span class="token punctuation">,</span>
                <span class="token literal-property property">age</span><span class="token operator">:</span> <span class="token number">50</span>
            <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

            console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>resp<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span><span class="token punctuation">;</span>
<span class="token keyword">export</span> <span class="token keyword">default</span> options<span class="token punctuation">;</span>
</span></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>script</span><span class="token punctuation">&gt;</span></span>

 
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>创建实例</strong></p><div class="language-vue line-numbers-mode" data-ext="vue"><pre class="language-vue"><code>const _axios = axios.create(config);
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><ul><li>axios 对象可以直接使用，但使用的是默认的设置</li><li>用 axios.create 创建的对象，可以覆盖默认设置，config 见下面说明</li></ul><p><strong>常见的 config 项有</strong></p><table><thead><tr><th><strong>名称</strong></th><th><strong>含义</strong></th></tr></thead><tbody><tr><td>baseURL</td><td>将自动加在 url 前面</td></tr><tr><td>headers</td><td>请求头，类型为简单对象</td></tr><tr><td>params</td><td>跟在 URL 后的请求参数，类型为简单对象或 URLSearchParams</td></tr><tr><td>data</td><td>请求体，类型有简单对象、FormData、URLSearchParams、File 等</td></tr><tr><td>withCredentials</td><td>跨域时是否携带 Cookie 等凭证，默认为 false</td></tr><tr><td>responseType</td><td>响应类型，默认为 json</td></tr></tbody></table><div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code><span class="token keyword">const</span> _axios <span class="token operator">=</span> axios<span class="token punctuation">.</span><span class="token function">create</span><span class="token punctuation">(</span><span class="token punctuation">{</span>
    <span class="token literal-property property">baseURL</span><span class="token operator">:</span> <span class="token string">&#39;http://localhost:8080&#39;</span><span class="token punctuation">,</span>
    <span class="token literal-property property">withCredentials</span><span class="token operator">:</span> <span class="token boolean">true</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token keyword">await</span> _axios<span class="token punctuation">.</span><span class="token function">post</span><span class="token punctuation">(</span><span class="token string">&#39;/api/a6set&#39;</span><span class="token punctuation">)</span>
<span class="token keyword">await</span> _axios<span class="token punctuation">.</span><span class="token function">post</span><span class="token punctuation">(</span><span class="token string">&#39;/api/a6get&#39;</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ul><li>生产环境希望 xhr 请求不走代理，可以用 baseURL 统一修改</li><li>希望跨域请求携带 cookie，需要配置 withCredentials: true，服务器也要配置 allowCredentials = true，否则浏览器获取跨域返回的 cookie 时会报错</li></ul><p><strong>响应格式</strong></p><table><thead><tr><th><strong>名称</strong></th><th><strong>含义</strong></th></tr></thead><tbody><tr><td>data</td><td>响应体数据</td></tr><tr><td>status</td><td>状态码</td></tr><tr><td>headers</td><td>响应头</td></tr></tbody></table><ul><li>200 表示响应成功</li><li>400 请求数据不正确 age=abc</li><li>401 身份验证没通过</li><li>403 没有权限</li><li>404 资源不存在</li><li>405 不支持请求方式 post</li><li>500 服务器内部错误 出现异常没有捕获</li></ul><h2 id="请求拦截器" tabindex="-1"><a class="header-anchor" href="#请求拦截器" aria-hidden="true">#</a> 请求拦截器</h2><div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code>_axios<span class="token punctuation">.</span>interceptors<span class="token punctuation">.</span>request<span class="token punctuation">.</span><span class="token function">use</span><span class="token punctuation">(</span>
  <span class="token keyword">function</span><span class="token punctuation">(</span><span class="token parameter">config</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token comment">// 比如在这里添加统一的 headers</span>
    <span class="token keyword">return</span> config<span class="token punctuation">;</span>
  <span class="token punctuation">}</span><span class="token punctuation">,</span>
  <span class="token keyword">function</span><span class="token punctuation">(</span><span class="token parameter">error</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">return</span> Promise<span class="token punctuation">.</span><span class="token function">reject</span><span class="token punctuation">(</span>error<span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="响应拦截器" tabindex="-1"><a class="header-anchor" href="#响应拦截器" aria-hidden="true">#</a> 响应拦截器</h2><div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code>_axios<span class="token punctuation">.</span>interceptors<span class="token punctuation">.</span>response<span class="token punctuation">.</span><span class="token function">use</span><span class="token punctuation">(</span>
  <span class="token keyword">function</span><span class="token punctuation">(</span><span class="token parameter">response</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token comment">// 2xx 范围内走这里</span>
    <span class="token keyword">return</span> response<span class="token punctuation">;</span>
  <span class="token punctuation">}</span><span class="token punctuation">,</span>
  <span class="token keyword">function</span><span class="token punctuation">(</span><span class="token parameter">error</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token comment">// 超出 2xx, 比如 4xx, 5xx 走这里</span>
    <span class="token keyword">return</span> Promise<span class="token punctuation">.</span><span class="token function">reject</span><span class="token punctuation">(</span>error<span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,25);function m(v,b){const a=o("router-link");return i(),c("div",null,[u,n("nav",d,[n("ul",null,[n("li",null,[t(a,{to:"#请求拦截器"},{default:e(()=>[s("请求拦截器")]),_:1})]),n("li",null,[t(a,{to:"#响应拦截器"},{default:e(()=>[s("响应拦截器")]),_:1})])])]),k])}const h=p(r,[["render",m],["__file","Axios.html.vue"]]);export{h as default};
