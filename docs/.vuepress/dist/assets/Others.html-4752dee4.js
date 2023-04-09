import{_ as c,M as t,p as i,q as p,R as e,N as s,V as o,t as n,a1 as l}from"./framework-5866ffd3.js";const d={},r=e("h1",{id:"目录",tabindex:"-1"},[e("a",{class:"header-anchor",href:"#目录","aria-hidden":"true"},"#"),n(" 目录")],-1),u={class:"table-of-contents"},k=l(`<h2 id="autowired-和-resource-的区别" tabindex="-1"><a class="header-anchor" href="#autowired-和-resource-的区别" aria-hidden="true">#</a> @Autowired 和 @Resource 的区别？</h2><p><strong>@Autowired</strong><code>@Autowired</code>为<code>Spring</code>提供的注解，是按照类型（byType）装配依赖对象，默认情况下它要求依赖对象必须存在，如果允许null值， 可以设置它的<code>required</code>属性为<code>false</code>。如果我们想使用按照名称（byName）来装配，可以结合<code>@Qualifier</code>注解一起使用</p><div class="language-java line-numbers-mode" data-ext="java"><pre class="language-java"><code><span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">TestServiceImpl</span> <span class="token punctuation">{</span>
	<span class="token comment">// 下面两种@Autowired只要使用一种即可</span>
	<span class="token annotation punctuation">@Autowired</span>
	<span class="token keyword">private</span> <span class="token class-name">UserDao</span> userDao<span class="token punctuation">;</span> <span class="token comment">// 用于字段上</span>
	<span class="token annotation punctuation">@Autowired</span>
	<span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">setUserDao</span><span class="token punctuation">(</span><span class="token class-name">UserDao</span> userDao<span class="token punctuation">)</span> <span class="token punctuation">{</span> <span class="token comment">// 用于属性的方法上</span>
		<span class="token keyword">this</span><span class="token punctuation">.</span>userDao <span class="token operator">=</span> userDao<span class="token punctuation">;</span>
	<span class="token punctuation">}</span>
<span class="token punctuation">}</span>

<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">TestServiceImpl</span> <span class="token punctuation">{</span>
	<span class="token annotation punctuation">@Autowired</span>
	<span class="token annotation punctuation">@Qualifier</span><span class="token punctuation">(</span><span class="token string">&quot;userDao&quot;</span><span class="token punctuation">)</span>
	<span class="token keyword">private</span> <span class="token class-name">UserDao</span> userDao<span class="token punctuation">;</span>
<span class="token punctuation">}</span>

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>@Resource</strong><code>@Resource</code> 是<code>Java</code>的注解，默认按照<code>ByName</code>自动注入，<code>@Resource</code>有两个重要的属性：<code>name</code>和<code>type</code>，而<code>Spring</code>将<code>@Resource</code>注解的<code>name</code>属性解析为<code>bean</code>的名字，而<code>type</code>属性则解析为<code>bean</code>的类型</p><div class="language-java line-numbers-mode" data-ext="java"><pre class="language-java"><code><span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">TestServiceImpl</span> <span class="token punctuation">{</span>
	<span class="token comment">// 下面两种@Resource只要使用一种即可</span>
	<span class="token comment">//name=&quot;userDao&quot;这里就是只定了name</span>
	<span class="token annotation punctuation">@Resource</span><span class="token punctuation">(</span>name<span class="token operator">=</span><span class="token string">&quot;userDao&quot;</span><span class="token punctuation">)</span>
	<span class="token keyword">private</span> <span class="token class-name">UserDao</span> userDao<span class="token punctuation">;</span> <span class="token comment">// 用于字段上</span>
    
	<span class="token annotation punctuation">@Resource</span><span class="token punctuation">(</span>name<span class="token operator">=</span><span class="token string">&quot;userDao&quot;</span><span class="token punctuation">)</span>
	<span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">setUserDao</span><span class="token punctuation">(</span><span class="token class-name">UserDao</span> userDao<span class="token punctuation">)</span> <span class="token punctuation">{</span> <span class="token comment">// 用于属性的setter方法上</span>
		<span class="token keyword">this</span><span class="token punctuation">.</span>userDao <span class="token operator">=</span> userDao<span class="token punctuation">;</span>
	<span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>注：最好是将 @Resource 放在setter方法上，因为这样更符合面向对象的思想，通过set、get去操作属性，而不是 直接去操作属性。</strong> @Resource 装配顺序：</p><ul><li>如果同时指定了<code>name</code>和<code>type</code>，则从<code>Spring</code>上下文中找到唯一匹配的<code>bean</code>进行装配，找不到则抛出异常。</li><li>如果指定了<code>name</code>，则从上下文中查找名称（id）匹配的<code>bean</code>进行装配，找不到则抛出异常。</li><li>如果指定了<code>type</code>，则从上下文中找到类似匹配的唯一<code>bean</code>进行装配，找不到或是找到多个，都会抛出异常。</li><li>如果既没有指定<code>name</code>，又没有指定<code>type</code>，则自动按照<code>byName</code>方式进行装配；如果没有匹配，则回退为一个 原始类型进行匹配，如果匹配则自动装配。</li></ul><h2 id="spring中bean的几种作用域" tabindex="-1"><a class="header-anchor" href="#spring中bean的几种作用域" aria-hidden="true">#</a> Spring中Bean的几种作用域</h2><p>（1）singleton：默认，每个容器中只有一个bean的实例，单例的模式由BeanFactory自身来维护。</p><p>（2）prototype：为每一个bean请求提供一个实例。</p><p>（3）request：为每一个网络请求创建一个实例，在请求完成以后，bean会失效并被垃圾回收器回收。</p><p>（4）session：与request范围类似，确保每个session中有一个bean的实例，在session过期后，bean会随之失 效。</p><p>（5）global-session：全局作用域，global-session和Portlet应用相关。当你的应用部署在Portlet容器中工作时， 它包含很多portlet。</p><p>如果你想要声明让所有的portlet共用全局的存储变量的话，那么这全局变量需要存储在 global-session中。</p><p>全局作用域与Servlet中的session作用域效果相同。</p><h2 id="spring事务的传播级别" tabindex="-1"><a class="header-anchor" href="#spring事务的传播级别" aria-hidden="true">#</a> Spring事务的传播级别</h2><p>事务的传播行为是指，多个声明了事务的方法，在互相调用时，事务应该如何传递 <code>Spring</code>事务定义了7种传播机制：</p><ol><li><code>PROPAGATION_REQUIRED</code>:默认的Spring事物传播级别，若当前存在事务，则加入该事务，若不存在事务， 则新建一个事务。</li><li><code>PAOPAGATION_REQUIRE_NEW</code>:若当前没有事务，则新建一个事务。若当前存在事务，则新建一个事务，新老事务相互独立。外部事务抛出异常回滚不会影响内部事务的正常提交。</li><li><code>PROPAGATION_NESTED</code>:如果当前存在事务，则嵌套在当前事务中执行。如果当前没有事务，则新建一个事 务，类似于<code>REQUIRE_NEW</code>。</li><li><code>PROPAGATION_SUPPORTS</code>:支持当前事务，若当前不存在事务，以非事务的方式执行。</li><li><code>PROPAGATION_NOT_SUPPORTED</code>:以非事务的方式执行，若当前存在事务，则把当前事务挂起。</li><li><code>PROPAGATION_MANDATORY</code>:强制事务执行，若当前不存在事务，则抛出异常.</li><li><code>PROPAGATION_NEVER</code>:以非事务的方式执行，如果当前存在事务，则抛出异常。</li></ol><h2 id="事务注解的本质是什么" tabindex="-1"><a class="header-anchor" href="#事务注解的本质是什么" aria-hidden="true">#</a> 事务注解的本质是什么？</h2><p>声明式事务主要是得益于<code>Spring AOP</code>。使用一个事务拦截器，在方法调用的前后/周围进行事务性增强 （advice），来驱动事务完成</p><p><code>@Transactional</code> 注解具有两方面功能，一是表明该方法要参与事务，二是配置相关属性来定制事务的参与方式和运行行为</p><p><code>@Transactional</code> 注解既可以标注在类上，也可以标注在方法上。</p><p>当在类上时，默认应用到类里的所有方法。</p><p>如果 此时方法上也标注了，则方法上的优先级高。</p><blockquote><p>另外注意方法一定要是<code>public</code>的</p></blockquote><h2 id="beanfactory和factorybean" tabindex="-1"><a class="header-anchor" href="#beanfactory和factorybean" aria-hidden="true">#</a> BeanFactory和FactoryBean</h2><p><code>BeanFactory</code> 是 <code>IOC</code>容器，是用来装载对象的</p><p><code>FactoryBean</code> 是一个接口类型的<code>Bean</code>，当我们容器中的<code>Bean</code>实现该接口时，通过<code>getBean(beanName)</code>获取<code>Bean</code>时，获取到的并不是接口的实现类对象，而是接口中<code>getObject</code>方法所返回的对象。</p><p>只有通过<code>getBean(&amp;beanName)</code>获取到的才是接口的实现类对象。</p><blockquote><p>是<code>Spring</code>对<code>Bean</code>的一种扩展</p></blockquote><h2 id="repository、-service、-compent、-controller它们有什么区别" tabindex="-1"><a class="header-anchor" href="#repository、-service、-compent、-controller它们有什么区别" aria-hidden="true">#</a> @Repository、@Service、@Compent、@Controller它们有什么区别</h2><p>这四个注解的本质都是一样的，都是将被该注解标识的对象放入 spring 容器当中，只是为了在使用上区分不同的应用分层</p><ul><li>@Repository: dao层</li><li>@Service: service层</li><li>@Controller: controller层</li><li>@Compent: 其他不属于以上三层的统一使用该注解</li></ul>`,33);function v(m,b){const a=t("router-link");return i(),p("div",null,[r,e("nav",u,[e("ul",null,[e("li",null,[s(a,{to:"#autowired-和-resource-的区别"},{default:o(()=>[n("@Autowired 和 @Resource 的区别？")]),_:1})]),e("li",null,[s(a,{to:"#spring中bean的几种作用域"},{default:o(()=>[n("Spring中Bean的几种作用域")]),_:1})]),e("li",null,[s(a,{to:"#spring事务的传播级别"},{default:o(()=>[n("Spring事务的传播级别")]),_:1})]),e("li",null,[s(a,{to:"#事务注解的本质是什么"},{default:o(()=>[n("事务注解的本质是什么？")]),_:1})]),e("li",null,[s(a,{to:"#beanfactory和factorybean"},{default:o(()=>[n("BeanFactory和FactoryBean")]),_:1})]),e("li",null,[s(a,{to:"#repository、-service、-compent、-controller它们有什么区别"},{default:o(()=>[n("@Repository、@Service、@Compent、@Controller它们有什么区别")]),_:1})])])]),k])}const y=c(d,[["render",v],["__file","Others.html.vue"]]);export{y as default};
