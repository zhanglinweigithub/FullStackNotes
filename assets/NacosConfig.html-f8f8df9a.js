import{_ as p,a as o,b as c,c as i,d as l,e as r,f as u,g as d,h as k,i as m,j as v,k as g,l as b,m as h,n as f,o as _,p as y}from"./image-20210714174623557-ee3417fc.js";import{_ as w,M as x,p as q,q as C,R as n,N as e,V as t,t as a,a1 as U}from"./framework-5866ffd3.js";const P={},S=n("h1",{id:"目录",tabindex:"-1"},[n("a",{class:"header-anchor",href:"#目录","aria-hidden":"true"},"#"),a(" 目录")],-1),j={class:"table-of-contents"},N=U('<h2 id="nacos配置管理" tabindex="-1"><a class="header-anchor" href="#nacos配置管理" aria-hidden="true">#</a> Nacos配置管理</h2><p><code>Nacos</code>除了可以做注册中心，同样可以做配置管理来使用。</p><h2 id="统一配置管理" tabindex="-1"><a class="header-anchor" href="#统一配置管理" aria-hidden="true">#</a> 统一配置管理</h2><p>当微服务部署的实例越来越多，达到数十、数百时，逐个修改微服务配置就会让人抓狂，而且很容易出错。我们需要一种统一配置管理方案，可以集中管理所有实例的配置。</p><p><img src="'+p+'" alt="image-20210714164426792"></p><p><code>Nacos</code>一方面可以将配置集中管理，另一方可以在配置变更时，及时通知微服务，实现配置的热更新。</p><h3 id="在nacos中添加配置文件" tabindex="-1"><a class="header-anchor" href="#在nacos中添加配置文件" aria-hidden="true">#</a> 在nacos中添加配置文件</h3><p>如何在<code>nacos</code>中管理配置呢？</p><p><img src="'+o+'" alt="image-20210714164742924"></p><p>然后在弹出的表单中，填写配置信息：</p><p><img src="'+c+'" alt="image-20210714164856664"></p><blockquote><p>注意：项目的核心配置，需要热更新的配置才有放到<code>nacos</code>管理的必要。基本不会变更的一些配置还是保存在微服务本地比较好。</p></blockquote><h3 id="从微服务拉取配置" tabindex="-1"><a class="header-anchor" href="#从微服务拉取配置" aria-hidden="true">#</a> 从微服务拉取配置</h3><p>微服务要拉取<code>nacos</code>中管理的配置，并且与本地的<code>application.yml</code>配置合并，才能完成项目启动。</p><p>但如果尚未读取<code>application.yml</code>，又如何得知<code>nacos</code>地址呢？</p><p>因此<code>spring</code>引入了一种新的配置文件：<code>bootstrap.yaml</code>文件，会在<code>application.yml</code>之前被读取，流程如下：</p><p><img src="'+i+`" alt="img"></p><p>1）引入nacos-config依赖</p><p>首先，在user-service服务中，引入nacos-config的客户端依赖：</p><div class="language-xml line-numbers-mode" data-ext="xml"><pre class="language-xml"><code><span class="token comment">&lt;!--nacos配置管理依赖--&gt;</span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>dependency</span><span class="token punctuation">&gt;</span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>groupId</span><span class="token punctuation">&gt;</span></span>com.alibaba.cloud<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>groupId</span><span class="token punctuation">&gt;</span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>artifactId</span><span class="token punctuation">&gt;</span></span>spring-cloud-starter-alibaba-nacos-config<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>artifactId</span><span class="token punctuation">&gt;</span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>dependency</span><span class="token punctuation">&gt;</span></span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>2）添加bootstrap.yaml</p><p>然后，在user-service中添加一个<code>bootstrap.yaml</code>文件，内容如下：</p><div class="language-yaml line-numbers-mode" data-ext="yml"><pre class="language-yaml"><code><span class="token key atrule">spring</span><span class="token punctuation">:</span>
  <span class="token key atrule">application</span><span class="token punctuation">:</span>
    <span class="token key atrule">name</span><span class="token punctuation">:</span> userservice <span class="token comment"># 服务名称</span>
  <span class="token key atrule">profiles</span><span class="token punctuation">:</span>
    <span class="token key atrule">active</span><span class="token punctuation">:</span> dev <span class="token comment">#开发环境，这里是dev </span>
  <span class="token key atrule">cloud</span><span class="token punctuation">:</span>
    <span class="token key atrule">nacos</span><span class="token punctuation">:</span>
      <span class="token key atrule">server-addr</span><span class="token punctuation">:</span> localhost<span class="token punctuation">:</span><span class="token number">8848</span> <span class="token comment"># Nacos地址</span>
      <span class="token key atrule">config</span><span class="token punctuation">:</span>
        <span class="token key atrule">file-extension</span><span class="token punctuation">:</span> yaml <span class="token comment"># 文件后缀名</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>这里会根据<code>spring.cloud.nacos.server-addr</code>获取<code>nacos</code>地址，再根据</p><p><code>\${spring.application.name}-\${spring.profiles.active}.\${spring.cloud.nacos.config.file-extension}</code>作为文件<code>id</code>，来读取配置。</p><p>本例中，就是去读取<code>userservice-dev.yaml</code>：</p><p><img src="`+l+'" alt="image-20210714170845901"></p><p>3）读取nacos配置</p><p>在user-service中的UserController中添加业务逻辑，读取pattern.dateformat配置：</p><p><img src="'+r+`" alt="image-20210714170337448"></p><p>完整代码：</p><div class="language-java line-numbers-mode" data-ext="java"><pre class="language-java"><code><span class="token annotation punctuation">@Slf4j</span>
<span class="token annotation punctuation">@RestController</span>
<span class="token annotation punctuation">@RequestMapping</span><span class="token punctuation">(</span><span class="token string">&quot;/user&quot;</span><span class="token punctuation">)</span>
<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">UserController</span> <span class="token punctuation">{</span>

    <span class="token annotation punctuation">@Autowired</span>
    <span class="token keyword">private</span> <span class="token class-name">UserService</span> userService<span class="token punctuation">;</span>

    <span class="token annotation punctuation">@Value</span><span class="token punctuation">(</span><span class="token string">&quot;\${pattern.dateformat}&quot;</span><span class="token punctuation">)</span>
    <span class="token keyword">private</span> <span class="token class-name">String</span> dateformat<span class="token punctuation">;</span>
    
    <span class="token annotation punctuation">@GetMapping</span><span class="token punctuation">(</span><span class="token string">&quot;now&quot;</span><span class="token punctuation">)</span>
    <span class="token keyword">public</span> <span class="token class-name">String</span> <span class="token function">now</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
        <span class="token keyword">return</span> <span class="token class-name">LocalDateTime</span><span class="token punctuation">.</span><span class="token function">now</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">format</span><span class="token punctuation">(</span><span class="token class-name">DateTimeFormatter</span><span class="token punctuation">.</span><span class="token function">ofPattern</span><span class="token punctuation">(</span>dateformat<span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
    <span class="token comment">// ...略</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>在页面访问，可以看到效果：</p><p><img src="`+u+'" alt="image-20210714170449612"></p><h2 id="配置热更新" tabindex="-1"><a class="header-anchor" href="#配置热更新" aria-hidden="true">#</a> 配置热更新</h2><p>我们最终的目的，是修改<code>nacos</code>中的配置后，微服务中无需重启即可让配置生效，也就是<strong>配置热更新</strong>。</p><p>要实现配置热更新，可以使用两种方式：</p><h3 id="方式一" tabindex="-1"><a class="header-anchor" href="#方式一" aria-hidden="true">#</a> 方式一</h3><p>在<code>@Value</code>注入的变量所在类上添加注解<code>@RefreshScope</code></p><p><img src="'+d+`" alt="image-20210714171036335"></p><h3 id="方式二" tabindex="-1"><a class="header-anchor" href="#方式二" aria-hidden="true">#</a> 方式二</h3><p>使用<code>@ConfigurationProperties</code>注解代替<code>@Value</code>注解。</p><p>在user-service服务中，添加一个类，读取<code>patterrn.dateformat</code>属性：</p><div class="language-java line-numbers-mode" data-ext="java"><pre class="language-java"><code><span class="token keyword">package</span> <span class="token namespace">cn<span class="token punctuation">.</span>itcast<span class="token punctuation">.</span>user<span class="token punctuation">.</span>config</span><span class="token punctuation">;</span>

<span class="token keyword">import</span> <span class="token import"><span class="token namespace">lombok<span class="token punctuation">.</span></span><span class="token class-name">Data</span></span><span class="token punctuation">;</span>
<span class="token keyword">import</span> <span class="token import"><span class="token namespace">org<span class="token punctuation">.</span>springframework<span class="token punctuation">.</span>boot<span class="token punctuation">.</span>context<span class="token punctuation">.</span>properties<span class="token punctuation">.</span></span><span class="token class-name">ConfigurationProperties</span></span><span class="token punctuation">;</span>
<span class="token keyword">import</span> <span class="token import"><span class="token namespace">org<span class="token punctuation">.</span>springframework<span class="token punctuation">.</span>stereotype<span class="token punctuation">.</span></span><span class="token class-name">Component</span></span><span class="token punctuation">;</span>

<span class="token annotation punctuation">@Component</span>
<span class="token annotation punctuation">@Data</span>
<span class="token annotation punctuation">@ConfigurationProperties</span><span class="token punctuation">(</span>prefix <span class="token operator">=</span> <span class="token string">&quot;pattern&quot;</span><span class="token punctuation">)</span>
<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">PatternProperties</span> <span class="token punctuation">{</span>
    <span class="token keyword">private</span> <span class="token class-name">String</span> dateformat<span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>在UserController中使用这个类代替<code>@Value</code>：</p><p><img src="`+k+`" alt="image-20210714171316124"></p><p>完整代码：</p><div class="language-java line-numbers-mode" data-ext="java"><pre class="language-java"><code><span class="token annotation punctuation">@Slf4j</span>
<span class="token annotation punctuation">@RestController</span>
<span class="token annotation punctuation">@RequestMapping</span><span class="token punctuation">(</span><span class="token string">&quot;/user&quot;</span><span class="token punctuation">)</span>
<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">UserController</span> <span class="token punctuation">{</span>

    <span class="token annotation punctuation">@Autowired</span>
    <span class="token keyword">private</span> <span class="token class-name">UserService</span> userService<span class="token punctuation">;</span>

    <span class="token annotation punctuation">@Autowired</span>
    <span class="token keyword">private</span> <span class="token class-name">PatternProperties</span> patternProperties<span class="token punctuation">;</span>

    <span class="token annotation punctuation">@GetMapping</span><span class="token punctuation">(</span><span class="token string">&quot;now&quot;</span><span class="token punctuation">)</span>
    <span class="token keyword">public</span> <span class="token class-name">String</span> <span class="token function">now</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
        <span class="token keyword">return</span> <span class="token class-name">LocalDateTime</span><span class="token punctuation">.</span><span class="token function">now</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">format</span><span class="token punctuation">(</span><span class="token class-name">DateTimeFormatter</span><span class="token punctuation">.</span><span class="token function">ofPattern</span><span class="token punctuation">(</span>patternProperties<span class="token punctuation">.</span><span class="token function">getDateformat</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token comment">// 略</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="配置共享" tabindex="-1"><a class="header-anchor" href="#配置共享" aria-hidden="true">#</a> 配置共享</h2><p>其实微服务启动时，会去<code>nacos</code>读取多个配置文件，例如：</p><ul><li><p><code>[spring.application.name]-[spring.profiles.active].yaml</code>，例如：userservice-dev.yaml</p></li><li><p><code>[spring.application.name].yaml</code>，例如：userservice.yaml</p></li></ul><p>而<code>[spring.application.name].yaml</code>不包含环境，因此可以被多个环境共享。</p><p>下面我们通过案例来测试配置共享</p><h3 id="_1-添加一个环境共享配置" tabindex="-1"><a class="header-anchor" href="#_1-添加一个环境共享配置" aria-hidden="true">#</a> 1）添加一个环境共享配置</h3><p>我们在<code>nacos</code>中添加一个userservice.yaml文件：</p><p><img src="`+m+'" alt="image-20210714173233650"></p><h3 id="_2-在user-service中读取共享配置" tabindex="-1"><a class="header-anchor" href="#_2-在user-service中读取共享配置" aria-hidden="true">#</a> 2）在user-service中读取共享配置</h3><p>在user-service服务中，修改<code>PatternProperties</code>类，读取新添加的属性：</p><p><img src="'+v+'" alt="image-20210714173324231"></p><p>在user-service服务中，修改UserController，添加一个方法：</p><p><img src="'+g+'" alt="image-20210714173721309"></p><h3 id="_3-运行两个userapplication-使用不同的profile" tabindex="-1"><a class="header-anchor" href="#_3-运行两个userapplication-使用不同的profile" aria-hidden="true">#</a> 3）运行两个UserApplication，使用不同的profile</h3><p>修改UserApplication2这个启动项，改变其<code>profile</code>值：</p><p><img src="'+b+'" alt="image-20210714173538538"></p><p><img src="'+h+'" alt="image-20210714173519963"></p><p>这样，UserApplication(8081)使用的<code>profile</code>是<code>dev</code>，UserApplication2(8082)使用的<code>profile</code>是<code>test</code>。</p><p>启动UserApplication和UserApplication2</p><p>访问http://localhost:8081/user/prop，结果：</p><p><img src="'+f+'" alt="image-20210714174313344"></p><p>访问http://localhost:8082/user/prop，结果：</p><p><img src="'+_+'" alt="image-20210714174424818"></p><p>可以看出来，不管是<code>dev</code>，还是<code>test</code>环境，都读取到了<code>envSharedValue</code>这个属性的值。</p><h3 id="_4-配置共享的优先级" tabindex="-1"><a class="header-anchor" href="#_4-配置共享的优先级" aria-hidden="true">#</a> 4）配置共享的优先级</h3><p>当<code>nacos</code>、服务本地同时出现相同属性时，优先级有高低之分：</p><p><img src="'+y+'" alt="image-20210714174623557"></p>',75);function A(V,D){const s=x("router-link");return q(),C("div",null,[S,n("nav",j,[n("ul",null,[n("li",null,[e(s,{to:"#nacos配置管理"},{default:t(()=>[a("Nacos配置管理")]),_:1})]),n("li",null,[e(s,{to:"#统一配置管理"},{default:t(()=>[a("统一配置管理")]),_:1}),n("ul",null,[n("li",null,[e(s,{to:"#在nacos中添加配置文件"},{default:t(()=>[a("在nacos中添加配置文件")]),_:1})]),n("li",null,[e(s,{to:"#从微服务拉取配置"},{default:t(()=>[a("从微服务拉取配置")]),_:1})])])]),n("li",null,[e(s,{to:"#配置热更新"},{default:t(()=>[a("配置热更新")]),_:1}),n("ul",null,[n("li",null,[e(s,{to:"#方式一"},{default:t(()=>[a("方式一")]),_:1})]),n("li",null,[e(s,{to:"#方式二"},{default:t(()=>[a("方式二")]),_:1})])])]),n("li",null,[e(s,{to:"#配置共享"},{default:t(()=>[a("配置共享")]),_:1}),n("ul",null,[n("li",null,[e(s,{to:"#_1-添加一个环境共享配置"},{default:t(()=>[a("1）添加一个环境共享配置")]),_:1})]),n("li",null,[e(s,{to:"#_2-在user-service中读取共享配置"},{default:t(()=>[a("2）在user-service中读取共享配置")]),_:1})]),n("li",null,[e(s,{to:"#_3-运行两个userapplication-使用不同的profile"},{default:t(()=>[a("3）运行两个UserApplication，使用不同的profile")]),_:1})]),n("li",null,[e(s,{to:"#_4-配置共享的优先级"},{default:t(()=>[a("4）配置共享的优先级")]),_:1})])])])])]),N])}const T=w(P,[["render",A],["__file","NacosConfig.html.vue"]]);export{T as default};
