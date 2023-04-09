import{_ as p,M as c,p as o,q as l,R as n,N as e,V as t,t as a,a1 as i}from"./framework-5866ffd3.js";const u="/FullStackNotes/assets/image-20210714212312871-94f248c1.png",d="/FullStackNotes/assets/image-20210714214228409-ad88d6ae.png",r={},k=n("h1",{id:"目录",tabindex:"-1"},[n("a",{class:"header-anchor",href:"#目录","aria-hidden":"true"},"#"),a(" 目录")],-1),m={class:"table-of-contents"},v=i('<h2 id="过滤器工厂" tabindex="-1"><a class="header-anchor" href="#过滤器工厂" aria-hidden="true">#</a> 过滤器工厂</h2><p><code>GatewayFilter</code>是网关中提供的一种过滤器，可以对进入网关的请求和微服务返回的响应做处理：</p><p><img src="'+u+`" alt="image-20210714212312871"></p><h3 id="路由过滤器的种类" tabindex="-1"><a class="header-anchor" href="#路由过滤器的种类" aria-hidden="true">#</a> 路由过滤器的种类</h3><p><code>Spring</code>提供了31种不同的路由过滤器工厂。例如：</p><table><thead><tr><th><strong>名称</strong></th><th><strong>说明</strong></th></tr></thead><tbody><tr><td>AddRequestHeader</td><td>给当前请求添加一个请求头</td></tr><tr><td>RemoveRequestHeader</td><td>移除请求中的一个请求头</td></tr><tr><td>AddResponseHeader</td><td>给响应结果中添加一个响应头</td></tr><tr><td>RemoveResponseHeader</td><td>从响应结果中移除有一个响应头</td></tr><tr><td>RequestRateLimiter</td><td>限制请求的流量</td></tr></tbody></table><h3 id="请求头过滤器" tabindex="-1"><a class="header-anchor" href="#请求头过滤器" aria-hidden="true">#</a> 请求头过滤器</h3><p>下面我们以<code>AddRequestHeader</code> 为例来讲解。</p><blockquote><p><strong>需求</strong>：给所有进入userservice的请求添加一个请求头：Truth=itcast is freaking awesome!</p></blockquote><p>只需要修改<code>gateway</code>服务的<code>application.yml</code>文件，添加路由过滤即可</p><div class="language-yaml line-numbers-mode" data-ext="yml"><pre class="language-yaml"><code><span class="token key atrule">spring</span><span class="token punctuation">:</span>
  <span class="token key atrule">cloud</span><span class="token punctuation">:</span>
    <span class="token key atrule">gateway</span><span class="token punctuation">:</span>
      <span class="token key atrule">routes</span><span class="token punctuation">:</span>
      <span class="token punctuation">-</span> <span class="token key atrule">id</span><span class="token punctuation">:</span> user<span class="token punctuation">-</span>service 
        <span class="token key atrule">uri</span><span class="token punctuation">:</span> lb<span class="token punctuation">:</span>//userservice 
        <span class="token key atrule">predicates</span><span class="token punctuation">:</span> 
        <span class="token punctuation">-</span> Path=/user/<span class="token important">**</span> 
        <span class="token key atrule">filters</span><span class="token punctuation">:</span> <span class="token comment"># 过滤器</span>
        <span class="token punctuation">-</span> AddRequestHeader=Truth<span class="token punctuation">,</span> Itcast is freaking awesome<span class="token tag">!</span> <span class="token comment"># 添加请求头</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>当前过滤器写在<code>userservice</code>路由下，因此仅仅对访问<code>userservice</code>的请求有效。</p><h3 id="默认过滤器" tabindex="-1"><a class="header-anchor" href="#默认过滤器" aria-hidden="true">#</a> 默认过滤器</h3><p>如果要对所有的路由都生效，则可以将过滤器工厂写到<code>default</code>下。格式如下：</p><div class="language-yaml line-numbers-mode" data-ext="yml"><pre class="language-yaml"><code><span class="token key atrule">spring</span><span class="token punctuation">:</span>
  <span class="token key atrule">cloud</span><span class="token punctuation">:</span>
    <span class="token key atrule">gateway</span><span class="token punctuation">:</span>
      <span class="token key atrule">routes</span><span class="token punctuation">:</span>
      <span class="token punctuation">-</span> <span class="token key atrule">id</span><span class="token punctuation">:</span> user<span class="token punctuation">-</span>service 
        <span class="token key atrule">uri</span><span class="token punctuation">:</span> lb<span class="token punctuation">:</span>//userservice 
        <span class="token key atrule">predicates</span><span class="token punctuation">:</span> 
        <span class="token punctuation">-</span> Path=/user/<span class="token important">**</span>
      <span class="token key atrule">default-filters</span><span class="token punctuation">:</span> <span class="token comment"># 默认过滤项</span>
      <span class="token punctuation">-</span> AddRequestHeader=Truth<span class="token punctuation">,</span> Itcast is freaking awesome<span class="token tag">!</span> 
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="总结" tabindex="-1"><a class="header-anchor" href="#总结" aria-hidden="true">#</a> 总结</h3><p>过滤器的作用是什么？</p><p>① 对路由的请求或响应做加工处理，比如添加请求头</p><p>② 配置在路由下的过滤器只对当前路由的请求生效</p><p><code>defaultFilters</code>的作用是什么？</p><p>① 对所有路由都生效的过滤器</p><h2 id="全局过滤器" tabindex="-1"><a class="header-anchor" href="#全局过滤器" aria-hidden="true">#</a> 全局过滤器</h2><p>上面说道的过滤器，网关提供了31种，但每一种过滤器的作用都是固定的。</p><p>如果我们希望拦截请求，做自己的业务逻辑则没办法实现。</p><h3 id="全局过滤器作用" tabindex="-1"><a class="header-anchor" href="#全局过滤器作用" aria-hidden="true">#</a> 全局过滤器作用</h3><p>全局过滤器的作用也是处理一切进入网关的请求和微服务响应，与<code>GatewayFilter</code>的作用一样。区别在于<code>GatewayFilter</code>通过配置定义，处理逻辑是固定的；</p><p>而<code>GlobalFilter</code>的逻辑需要自己写代码实现。</p><p>定义方式是实现<code>GlobalFilter</code>接口。</p><div class="language-java line-numbers-mode" data-ext="java"><pre class="language-java"><code><span class="token keyword">public</span> <span class="token keyword">interface</span> <span class="token class-name">GlobalFilter</span> <span class="token punctuation">{</span>
    <span class="token doc-comment comment">/**
     *  处理当前请求，有必要的话通过<span class="token punctuation">{</span><span class="token keyword">@link</span> <span class="token reference"><span class="token class-name">GatewayFilterChain</span></span><span class="token punctuation">}</span>将请求交给下一个过滤器处理
     *
     * <span class="token keyword">@param</span> <span class="token parameter">exchange</span> 请求上下文，里面可以获取Request、Response等信息
     * <span class="token keyword">@param</span> <span class="token parameter">chain</span> 用来把请求委托给下一个过滤器 
     * <span class="token keyword">@return</span> <span class="token punctuation">{</span><span class="token keyword">@code</span> <span class="token code-section"><span class="token code language-java"><span class="token class-name">Mono</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">Void</span><span class="token punctuation">&gt;</span></span></span></span><span class="token punctuation">}</span> 返回标示当前过滤器业务结束
     */</span>
    <span class="token class-name">Mono</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">Void</span><span class="token punctuation">&gt;</span></span> <span class="token function">filter</span><span class="token punctuation">(</span><span class="token class-name">ServerWebExchange</span> exchange<span class="token punctuation">,</span> <span class="token class-name">GatewayFilterChain</span> chain<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>在<code>filter</code>中编写自定义逻辑，可以实现下列功能：</p><ul><li>登录状态判断</li><li>权限校验</li><li>请求限流等</li></ul><h3 id="自定义全局过滤器" tabindex="-1"><a class="header-anchor" href="#自定义全局过滤器" aria-hidden="true">#</a> 自定义全局过滤器</h3><p>需求：定义全局过滤器，拦截请求，判断请求的参数是否满足下面条件：</p><ul><li><p>参数中是否有<code>authorization</code>，</p></li><li><p><code>authorization</code>参数值是否为<code>admin</code></p></li></ul><p>如果同时满足则放行，否则拦截</p><p>实现：</p><p>在<code>gateway</code>中定义一个过滤器：</p><div class="language-java line-numbers-mode" data-ext="java"><pre class="language-java"><code><span class="token annotation punctuation">@Order</span><span class="token punctuation">(</span><span class="token operator">-</span><span class="token number">1</span><span class="token punctuation">)</span>
<span class="token annotation punctuation">@Component</span>
<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">AuthorizeFilter</span> <span class="token keyword">implements</span> <span class="token class-name">GlobalFilter</span> <span class="token punctuation">{</span>
    <span class="token annotation punctuation">@Override</span>
    <span class="token keyword">public</span> <span class="token class-name">Mono</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">Void</span><span class="token punctuation">&gt;</span></span> <span class="token function">filter</span><span class="token punctuation">(</span><span class="token class-name">ServerWebExchange</span> exchange<span class="token punctuation">,</span> <span class="token class-name">GatewayFilterChain</span> chain<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token comment">// 1.获取请求参数</span>
        <span class="token class-name">MultiValueMap</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">String</span><span class="token punctuation">,</span> <span class="token class-name">String</span><span class="token punctuation">&gt;</span></span> params <span class="token operator">=</span> exchange<span class="token punctuation">.</span><span class="token function">getRequest</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">getQueryParams</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token comment">// 2.获取authorization参数</span>
        <span class="token class-name">String</span> auth <span class="token operator">=</span> params<span class="token punctuation">.</span><span class="token function">getFirst</span><span class="token punctuation">(</span><span class="token string">&quot;authorization&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token comment">// 3.校验</span>
        <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token string">&quot;admin&quot;</span><span class="token punctuation">.</span><span class="token function">equals</span><span class="token punctuation">(</span>auth<span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
            <span class="token comment">// 放行</span>
            <span class="token keyword">return</span> chain<span class="token punctuation">.</span><span class="token function">filter</span><span class="token punctuation">(</span>exchange<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
        <span class="token comment">// 4.拦截</span>
        <span class="token comment">// 4.1.禁止访问，设置状态码</span>
        exchange<span class="token punctuation">.</span><span class="token function">getResponse</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">setStatusCode</span><span class="token punctuation">(</span><span class="token class-name">HttpStatus</span><span class="token punctuation">.</span><span class="token constant">FORBIDDEN</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token comment">// 4.2.结束处理</span>
        <span class="token keyword">return</span> exchange<span class="token punctuation">.</span><span class="token function">getResponse</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">setComplete</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="过滤器执行顺序" tabindex="-1"><a class="header-anchor" href="#过滤器执行顺序" aria-hidden="true">#</a> 过滤器执行顺序</h3><p>请求进入网关会碰到三类过滤器：当前路由的过滤器、<code>DefaultFilter</code>、<code>GlobalFilter</code></p><p>请求路由后，会将当前路由过滤器和<code>DefaultFilter</code>、<code>GlobalFilter</code>，合并到一个过滤器链（集合）中，排序后依次执行每个过滤器：</p><p><img src="`+d+'" alt="image-20210714214228409"></p><p>排序的规则是什么呢？</p><ul><li>每一个过滤器都必须指定一个<code>int</code>类型的<code>order</code>值，<strong><code>order</code>值越小，优先级越高，执行顺序越靠前</strong>。</li><li><code>GlobalFilter</code>通过实现<code>Ordered</code>接口，或者添加<code>@Order</code>注解来指定<code>order</code>值，由我们自己指定</li><li>路由过滤器和<code>defaultFilter</code>的<code>order</code>由<code>Spring</code>指定，默认是按照声明顺序从<code>1</code>递增。</li><li>当过滤器的<code>order</code>值一样时，会按照 <code>defaultFilter</code> &gt; 路由过滤器 &gt; <code>GlobalFilter</code>的顺序执行。</li></ul><p>详细内容，可以查看源码：</p><p><code>org.springframework.cloud.gateway.route.RouteDefinitionRouteLocator#getFilters()</code>方法是先加载defaultFilters，然后再加载某个<code>route</code>的<code>filters</code>，然后合并。</p><p><code>org.springframework.cloud.gateway.handler.FilteringWebHandler#handle()</code>方法会加载全局过滤器，与前面的过滤器合并后根据<code>order</code>排序，组织过滤器链</p>',47);function h(b,g){const s=c("router-link");return o(),l("div",null,[k,n("nav",m,[n("ul",null,[n("li",null,[e(s,{to:"#过滤器工厂"},{default:t(()=>[a("过滤器工厂")]),_:1}),n("ul",null,[n("li",null,[e(s,{to:"#路由过滤器的种类"},{default:t(()=>[a("路由过滤器的种类")]),_:1})]),n("li",null,[e(s,{to:"#请求头过滤器"},{default:t(()=>[a("请求头过滤器")]),_:1})]),n("li",null,[e(s,{to:"#默认过滤器"},{default:t(()=>[a("默认过滤器")]),_:1})]),n("li",null,[e(s,{to:"#总结"},{default:t(()=>[a("总结")]),_:1})])])]),n("li",null,[e(s,{to:"#全局过滤器"},{default:t(()=>[a("全局过滤器")]),_:1}),n("ul",null,[n("li",null,[e(s,{to:"#全局过滤器作用"},{default:t(()=>[a("全局过滤器作用")]),_:1})]),n("li",null,[e(s,{to:"#自定义全局过滤器"},{default:t(()=>[a("自定义全局过滤器")]),_:1})]),n("li",null,[e(s,{to:"#过滤器执行顺序"},{default:t(()=>[a("过滤器执行顺序")]),_:1})])])])])]),v])}const y=p(r,[["render",h],["__file","Filters.html.vue"]]);export{y as default};
