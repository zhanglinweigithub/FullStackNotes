import{_ as t,M as c,p,q as d,R as s,N as e,V as o,t as a,a1 as l}from"./framework-5866ffd3.js";const i="/FullStackNotes/assets/image-20230409152116633-7399962b.png",r="/FullStackNotes/assets/image-20230409152041766-59004a16.png",u="/FullStackNotes/assets/image-20230409152843218-dcc072fd.png",k="/FullStackNotes/assets/image-20230409153058114-0e03a0b3.png",m="/FullStackNotes/assets/image-20230409153251220-239c12c8.png",h="/FullStackNotes/assets/image-20230409153343680-cc146a49.png",g="/FullStackNotes/assets/image-20230409153403571-a9970621.png",b="/FullStackNotes/assets/image-20230409153421687-19ebb83b.png",_="/FullStackNotes/assets/image-20230409153438554-dce05f1e.png",v="/FullStackNotes/assets/image-20230409153517157-f17a00a1.png",y="/FullStackNotes/assets/image-20230409153600056-df7bb5cf.png",f="/FullStackNotes/assets/image-20230409153624567-baf7b6f7.png",w="/FullStackNotes/assets/image-20230409153709492-2190c4ee.png",x="/FullStackNotes/assets/image-20230409153720229-f346157f.png",S="/FullStackNotes/assets/image-20230409153802595-89c4fcfe.png",q="/FullStackNotes/assets/image-20230409153906402-57ae1e92.png",N="/FullStackNotes/assets/image-20230409153938057-168d95c6.png",L="/FullStackNotes/assets/image-20230409153954519-1cc7c2a9.png",F="/FullStackNotes/assets/image-20230409154023362-524dd631.png",Q="/FullStackNotes/assets/image-20230409154055112-fc642c73.png",I={},B=s("h1",{id:"目录",tabindex:"-1"},[s("a",{class:"header-anchor",href:"#目录","aria-hidden":"true"},"#"),a(" 目录")],-1),D={class:"table-of-contents"},T=l(`<h2 id="sql优化" tabindex="-1"><a class="header-anchor" href="#sql优化" aria-hidden="true">#</a> SQL优化</h2><p>所谓的<code>SQL</code>优化，就是指将一条<code>SQL</code>写的更加简洁，让<code>SQL</code>的执行速度更快，易读性与维护性更好</p><div class="custom-container warning"><p class="custom-container-title">注意</p><p>优化一定要建立在不违背业务需求的情况下进行</p></div><h2 id="select" tabindex="-1"><a class="header-anchor" href="#select" aria-hidden="true">#</a> select</h2><p>对于<code>select</code>的优化，核心就是要确保索引生效，尽量覆盖索引避免回表查询</p><h3 id="查询时尽量不要使用" tabindex="-1"><a class="header-anchor" href="#查询时尽量不要使用" aria-hidden="true">#</a> 查询时尽量不要使用<code>*</code></h3><h4 id="_1分析成本变高" tabindex="-1"><a class="header-anchor" href="#_1分析成本变高" aria-hidden="true">#</a> ①分析成本变高</h4><p>一条<code>SQL</code>在执行前都会经过分析器解析，当使用<code>*</code>时，解析器需要先去解析出当前要查询的表上<code>*</code>表示哪些字段，因此会额外增加解析成本。</p><p>但如果明确写出了查询字段，分析器则不会有这一步解析<code>*</code>的开销。</p><h4 id="_2网络开销变大" tabindex="-1"><a class="header-anchor" href="#_2网络开销变大" aria-hidden="true">#</a> ②网络开销变大</h4><p>当使用<code>*</code>时，查询时每条数据会返回所有字段值，然后这些查询出的数据会先被放到结果集中，最终查询完成后会统一返回给客户端</p><p>但线上<code>Java</code>程序和<code>MySQL</code>都是分机器部署的，所以返回数据时需要经过网络传输，而由于返回的是所有字段数据，因此网络数据包的体积就会变大，从而导致占用的网络带宽变高，影响数据传输的性能和资源开销。</p><p>但实际上可能仅需要用到其中的某几个字段值，所以写清楚字段后查询，能让网络数据包体积变小，从而减小资源消耗、提升响应速度</p><h4 id="_3内存占用变高" tabindex="-1"><a class="header-anchor" href="#_3内存占用变高" aria-hidden="true">#</a> ③内存占用变高</h4><p><code>InnoDB</code>引擎，当查询一条数据时都会将其结果集放入到<code>BufferPool</code>的数据缓冲页中，如果每次用<code>*</code>来查询数据，查到的结果集自然会更大，占用的内存也会越大，单个结果集的数据越大，整个内存缓冲池中能存下的数据也就越少，当其他<code>SQL</code>操作时，在内存中找不到数据，又会去触发磁盘<code>IO</code>，最终导致<code>MySQL</code>整体性能下降</p><h4 id="_4会回表查询" tabindex="-1"><a class="header-anchor" href="#_4会回表查询" aria-hidden="true">#</a> ④会回表查询</h4><h3 id="连表查询时尽量不要关联太多表" tabindex="-1"><a class="header-anchor" href="#连表查询时尽量不要关联太多表" aria-hidden="true">#</a> 连表查询时尽量不要关联太多表</h3><p>一旦关联太多的表，就会导致执行效率变慢，执行时间变长，原因如下</p><ul><li>数据量会随表数量呈直线性增长，数据量越大检索效率越低。</li><li>当关联的表数量过多时，无法控制好索引的匹配，涉及的表越多，索引不可控风险越大</li></ul><div class="custom-container tip"><p class="custom-container-title">TIP</p><p>一般来说，关联的表数量应当控制在<code>5</code>张表之内</p></div><h3 id="多表查询时一定要以小驱大" tabindex="-1"><a class="header-anchor" href="#多表查询时一定要以小驱大" aria-hidden="true">#</a> 多表查询时一定要以小驱大</h3><p>当执行多表联查时，<code>MySQL</code>的关联算法为<code>Nest Loop Join</code>，该算法会依照驱动表的结果集作为循环基础数据，然后通过该结果集中一条条数据，作为过滤条件去下一个表中查询数据，最后合并结果得到最终数据集</p><p>例：</p><p>假设<code>student</code>学生表中有<code>10000</code>条数据，<code>class</code>班级表中有<code>100</code>条数据，当需要关联这两张表查询数据时，<code>SQL</code></p><div class="language-sql line-numbers-mode" data-ext="sql"><pre class="language-sql"><code><span class="token comment">-- 大表在前，小表在后</span>
<span class="token keyword">select</span> <span class="token operator">*</span> <span class="token keyword">from</span> student <span class="token keyword">as</span> s <span class="token keyword">left</span> <span class="token keyword">join</span> class <span class="token keyword">as</span> c <span class="token keyword">on</span> s<span class="token punctuation">.</span>class_id <span class="token operator">=</span> c<span class="token punctuation">.</span>class_id<span class="token punctuation">;</span>
<span class="token comment">-- 小表在前，大表在后</span>
<span class="token keyword">select</span> <span class="token operator">*</span> <span class="token keyword">from</span> class <span class="token keyword">as</span> c <span class="token keyword">left</span> <span class="token keyword">join</span> student <span class="token keyword">as</span> s <span class="token keyword">on</span> c<span class="token punctuation">.</span>class_id <span class="token operator">=</span> s<span class="token punctuation">.</span>class_id<span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>如果学生表在前作为驱动表，根据<code>Nest Loop Join</code>算法会循环一万次查询数据</p><p>反之如果班级表在前，则只需要循环<code>100</code>次即可查询出数据</p><h3 id="覆盖索引" tabindex="-1"><a class="header-anchor" href="#覆盖索引" aria-hidden="true">#</a> 覆盖索引</h3><p>覆盖索引是指查询使用了索引，并且需要返回的列，在该索引中已经全部能够找到</p><p><img src="`+i+'" alt="image-20230409152116633"></p><p>根据<code>id</code>查询，直接走聚集索引查询，一次索引扫描，直接返回数据</p><p><img src="'+r+`" alt="image-20230409152041766"></p><p>虽然是根据<code>name</code>字段查询，查询二级索引，但是由于查询返回在字段为 <code>id</code>，<code>name</code>，在<code>name</code>的二级索引中，这两个值都是可以直接获取到的，因为覆盖索引，所以不需要回表查询</p><h3 id="sql提示" tabindex="-1"><a class="header-anchor" href="#sql提示" aria-hidden="true">#</a> SQL提示</h3><p>在<code>SQL</code>语句中加入一些人为的提示来达到优 化操作的目的</p><h5 id="use-index" tabindex="-1"><a class="header-anchor" href="#use-index" aria-hidden="true">#</a> use index</h5><p>建议<code>MySQL</code>使用哪一个索引完成此次查询（仅仅是建议，<code>mysql</code>内部还会再次进 行评估）</p><div class="language-sql line-numbers-mode" data-ext="sql"><pre class="language-sql"><code><span class="token keyword">select</span> <span class="token operator">*</span> <span class="token keyword">from</span> tb_user <span class="token keyword">use</span> <span class="token keyword">index</span><span class="token punctuation">(</span>idx_user_pro<span class="token punctuation">)</span> <span class="token keyword">where</span> profession <span class="token operator">=</span> <span class="token string">&#39;软件工程&#39;</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h5 id="ignore-index" tabindex="-1"><a class="header-anchor" href="#ignore-index" aria-hidden="true">#</a> ignore index</h5><p>忽略指定的索引</p><div class="language-sql line-numbers-mode" data-ext="sql"><pre class="language-sql"><code><span class="token keyword">select</span> <span class="token operator">*</span> <span class="token keyword">from</span> tb_user <span class="token keyword">ignore</span> <span class="token keyword">index</span><span class="token punctuation">(</span>idx_user_pro<span class="token punctuation">)</span> <span class="token keyword">where</span> profession <span class="token operator">=</span> <span class="token string">&#39;软件工程&#39;</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h5 id="force-index" tabindex="-1"><a class="header-anchor" href="#force-index" aria-hidden="true">#</a> force index</h5><p>强制使用索引</p><div class="language-sql line-numbers-mode" data-ext="sql"><pre class="language-sql"><code><span class="token keyword">select</span> <span class="token operator">*</span> <span class="token keyword">from</span> tb_user <span class="token keyword">force</span> <span class="token keyword">index</span><span class="token punctuation">(</span>idx_user_pro<span class="token punctuation">)</span> <span class="token keyword">where</span> profession <span class="token operator">=</span> <span class="token string">&#39;软件工程&#39;</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h2 id="insert" tabindex="-1"><a class="header-anchor" href="#insert" aria-hidden="true">#</a> insert</h2><p>如果我们需要一次性往数据库表中插入多条记录，可以从三个方面进行优化</p><ul><li><p>批量插入数据</p><div class="language-sql line-numbers-mode" data-ext="sql"><pre class="language-sql"><code><span class="token keyword">Insert</span> <span class="token keyword">into</span> tb_test <span class="token keyword">values</span><span class="token punctuation">(</span><span class="token number">1</span><span class="token punctuation">,</span><span class="token string">&#39;Tom&#39;</span><span class="token punctuation">)</span><span class="token punctuation">,</span><span class="token punctuation">(</span><span class="token number">2</span><span class="token punctuation">,</span><span class="token string">&#39;Cat&#39;</span><span class="token punctuation">)</span><span class="token punctuation">,</span><span class="token punctuation">(</span><span class="token number">3</span><span class="token punctuation">,</span><span class="token string">&#39;Jerry&#39;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div></li><li><p>手动控制事务</p><div class="language-sql line-numbers-mode" data-ext="sql"><pre class="language-sql"><code><span class="token keyword">start</span> <span class="token keyword">transaction</span><span class="token punctuation">;</span>

<span class="token keyword">insert</span> <span class="token keyword">into</span> tb_test <span class="token keyword">values</span><span class="token punctuation">(</span><span class="token number">1</span><span class="token punctuation">,</span><span class="token string">&#39;Tom&#39;</span><span class="token punctuation">)</span><span class="token punctuation">,</span><span class="token punctuation">(</span><span class="token number">2</span><span class="token punctuation">,</span><span class="token string">&#39;Cat&#39;</span><span class="token punctuation">)</span><span class="token punctuation">,</span><span class="token punctuation">(</span><span class="token number">3</span><span class="token punctuation">,</span><span class="token string">&#39;Jerry&#39;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token keyword">insert</span> <span class="token keyword">into</span> tb_test <span class="token keyword">values</span><span class="token punctuation">(</span><span class="token number">4</span><span class="token punctuation">,</span><span class="token string">&#39;Tom&#39;</span><span class="token punctuation">)</span><span class="token punctuation">,</span><span class="token punctuation">(</span><span class="token number">5</span><span class="token punctuation">,</span><span class="token string">&#39;Cat&#39;</span><span class="token punctuation">)</span><span class="token punctuation">,</span><span class="token punctuation">(</span><span class="token number">6</span><span class="token punctuation">,</span><span class="token string">&#39;Jerry&#39;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token keyword">insert</span> <span class="token keyword">into</span> tb_test <span class="token keyword">values</span><span class="token punctuation">(</span><span class="token number">7</span><span class="token punctuation">,</span><span class="token string">&#39;Tom&#39;</span><span class="token punctuation">)</span><span class="token punctuation">,</span><span class="token punctuation">(</span><span class="token number">8</span><span class="token punctuation">,</span><span class="token string">&#39;Cat&#39;</span><span class="token punctuation">)</span><span class="token punctuation">,</span><span class="token punctuation">(</span><span class="token number">9</span><span class="token punctuation">,</span><span class="token string">&#39;Jerry&#39;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token keyword">commit</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li><li><p>主键顺序插入，性能要高于乱序插入</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>主键乱序插入 : 8 1 9 21 88 2 4 15 89 5 7 3
主键顺序插入 : 1 2 3 4 5 7 8 9 15 21 88 89大批量插入数据
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div></li></ul><h3 id="大批量插入数据" tabindex="-1"><a class="header-anchor" href="#大批量插入数据" aria-hidden="true">#</a> 大批量插入数据</h3><p>如果一次性需要插入大批量数据(比如: 几百万的记录)，用<code>MySQL</code>数据库提供的<code>load</code>指令进行插入</p><p><img src="`+u+`" alt="image-20230409152843218"></p><div class="language-sql line-numbers-mode" data-ext="sql"><pre class="language-sql"><code><span class="token comment">-- 客户端连接服务端时，加上参数 -–local-infile</span>
mysql –<span class="token operator">-</span><span class="token keyword">local</span><span class="token operator">-</span><span class="token keyword">infile</span> <span class="token operator">-</span>u root <span class="token operator">-</span>p

<span class="token comment">-- 设置全局参数local_infile为1，开启从本地加载文件导入数据的开关</span>
<span class="token keyword">set</span> <span class="token keyword">global</span> local_infile <span class="token operator">=</span> <span class="token number">1</span><span class="token punctuation">;</span>

<span class="token comment">-- 执行load指令将准备好的数据，加载到表结构中</span>
<span class="token keyword">load</span> <span class="token keyword">data</span> <span class="token keyword">local</span> <span class="token keyword">infile</span> <span class="token string">&#39;/root/sql1.log&#39;</span> <span class="token keyword">into</span> <span class="token keyword">table</span> tb_user <span class="token keyword">fields</span>
<span class="token keyword">terminated</span> <span class="token keyword">by</span> <span class="token string">&#39;,&#39;</span> <span class="token keyword">lines</span> <span class="token keyword">terminated</span> <span class="token keyword">by</span> <span class="token string">&#39;\\n&#39;</span> <span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="update" tabindex="-1"><a class="header-anchor" href="#update" aria-hidden="true">#</a> update</h2><p><code>update</code>优化核心就是<strong>避免行锁升级为表锁</strong></p><h2 id="主键优化" tabindex="-1"><a class="header-anchor" href="#主键优化" aria-hidden="true">#</a> 主键优化</h2><p>前面提到，主键顺序插入的性能是要高于乱序插入的，这里介绍一下具体的原因</p><ul><li>页分裂</li><li>页合并</li></ul><h3 id="_1-数据组织方式" tabindex="-1"><a class="header-anchor" href="#_1-数据组织方式" aria-hidden="true">#</a> 1). 数据组织方式</h3><p>在<code>InnoDB</code>存储引擎中，表数据都是根据主键顺序组织存放的，这种存储方式的表称为索引组织表</p><p><img src="`+k+'" alt="image-20230409153058114"></p><p>行数据，都是存储在聚集索引的叶子节点上的</p><p>在<code>InnoDB</code>引擎中，数据行是记录在逻辑结构 <code>page</code> 页中的，而每一个页的大小是固定的，默认<code>16K</code>。</p><p>那也就意味着， 一个页中所存储的行也是有限的，如果插入的数据行<code>row</code>在该页存储不小，将会存储 到下一个页中，页与页之间会通过指针连接</p><p><img src="'+m+'" alt="image-20230409153251220"></p><h3 id="_2-页分裂" tabindex="-1"><a class="header-anchor" href="#_2-页分裂" aria-hidden="true">#</a> 2). 页分裂</h3><p>页可以为空，也可以填充一半，也可以填充100%。每个页包含了<code>2-N</code>行数据(如果一行数据过大，会行 溢出)，根据主键排列</p><h4 id="主键顺序插入效果" tabindex="-1"><a class="header-anchor" href="#主键顺序插入效果" aria-hidden="true">#</a> 主键顺序插入效果</h4><p>①. 从磁盘中申请页， 主键顺序插入</p><p><img src="'+h+'" alt="image-20230409153343680"></p><p>②. 第一个页没有满，继续往第一页插入</p><p><img src="'+g+'" alt="image-20230409153403571"></p><p>③. 当第一个也写满之后，再写入第二个页，页与页之间会通过指针连接</p><p><img src="'+b+'" alt="image-20230409153421687"></p><p>④. 当第二页写满了，再往第三页写</p><p><img src="'+_+'" alt="image-20230409153438554"></p><h4 id="主键乱序插入效果" tabindex="-1"><a class="header-anchor" href="#主键乱序插入效果" aria-hidden="true">#</a> 主键乱序插入效果</h4><p>①. 假如<code>1#</code>,<code>2#</code>页都已经写满了，存放了如图所示的数据</p><p><img src="'+v+'" alt="image-20230409153517157"></p><p>②. 此时再插入<code>id</code>为50的记录</p><p>此时不会再次开启一个页，写入新的页中，因为，索引结构的叶子节点是有顺序的。按照顺序，应该存储在47之后</p><p><img src="'+y+'" alt="image-20230409153600056"></p><p><img src="'+f+'" alt="image-20230409153624567"></p><p>但是47所在的<code>1#</code>页，已经写满了，存储不了50对应的数据了。 那么此时会开辟一个新的页 <code>3#</code></p><p><img src="'+w+'" alt="image-20230409153709492"></p><p>但是并不会直接将50存入<code>3#</code>页，而是会将<code>1#</code>页后一半的数据，移动到<code>3#</code>页，然后在<code>3#</code>页，插入50</p><p><img src="'+x+'" alt="image-20230409153720229"></p><p>移动数据，并插入id为50的数据之后，那么此时，这三个页之间的数据顺序是有问题的。</p><p><code>1#</code>的下一个 页，应该是<code>3#</code>， <code>3#</code>的下一个页是<code>2#</code>。</p><p>所以，此时，需要重新设置链表指针。</p><p><img src="'+S+'" alt="image-20230409153802595"></p><div class="custom-container tip"><p class="custom-container-title">TIP</p><p>这就是也分裂</p></div><h3 id="_3-页合并" tabindex="-1"><a class="header-anchor" href="#_3-页合并" aria-hidden="true">#</a> 3).页合并</h3><p>目前表中已有数据的索引结构(叶子节点)如下</p><p><img src="'+q+'" alt="image-20230409153906402"></p><p>当删除一行记录时，实际上记录并没有被物理删除，只是记录被标记（flaged）为删除并且它的空间 变得允许被其他记录声明使用</p><p><img src="'+N+'" alt="image-20230409153938057"></p><p>当我们继续删除<code>2#</code>的数据记录</p><p><img src="'+L+'" alt="image-20230409153954519"></p><p>当页中删除的记录达到 <code>MERGE_THRESHOLD</code>（默认为页的50%），<code>InnoDB</code>会开始寻找最靠近的页（前 或 后）看看是否可以将两个页合并以优化空间使用。</p><p><img src="'+F+'" alt="image-20230409154023362"></p><p>删除数据，并将页合并之后，再次插入新的数据21，则直接插入<code>3#</code>页</p><p><img src="'+Q+`" alt="image-20230409154055112"></p><div class="custom-container tip"><p class="custom-container-title">TIP</p><p>这就是页合并</p></div><h2 id="count" tabindex="-1"><a class="header-anchor" href="#count" aria-hidden="true">#</a> count</h2><p><code>count()</code> 是一个聚合函数，对于返回的结果集，一行行地判断，如果 <code>count</code> 函数的参数不是 <code>NULL</code>，累计值就加 1，否则不加，最后返回累计值。</p><p>用法：<code>count（*）</code>、<code>count（主键）</code>、<code>count（字段）</code>、<code>count（数字）</code></p><table><thead><tr><th>count用法</th><th>含义</th></tr></thead><tbody><tr><td>count（主键）</td><td><code>InnoDB</code> 引擎会遍历整张表，把每一行的 主键<code>id</code> 值都取出来，返回给服务层。 服务层拿到主键后，直接按行进行累加(因为主键不可能为<code>null</code>)</td></tr><tr><td>count（字段）</td><td>没有<code>not null</code> 约束 : <code>InnoDB</code> 引擎会遍历整张表把每一行的字段值都取出 来，返回给服务层，服务层判断是否为<code>null</code>，不为<code>null</code>，计数累加。 有<code>not null</code> 约束：<code>InnoDB</code> 引擎会遍历整张表把每一行的字段值都取出来，返 回给服务层，直接按行进行累加。</td></tr><tr><td>count（数字）</td><td><code>InnoDB</code> 引擎遍历整张表，但不取值。服务层对于返回的每一行，放一个数字“1” 进去，直接按行进行累加。</td></tr><tr><td>count（*）</td><td><code>InnoDB</code>引擎并不会把全部字段取出来，而是专门做了优化，不取值，服务层直接按行进行累加。</td></tr></tbody></table><div class="custom-container tip"><p class="custom-container-title">TIP</p><p>按照效率排序的话，<code>count(字段)</code> <code>&lt;</code> <code>count(主键 id)</code> <code>&lt;</code> <code>count(1)</code> <code>≈</code> <code>count(*)</code></p><p>所以尽量使用 <code>count(*)</code></p></div><h2 id="order-by" tabindex="-1"><a class="header-anchor" href="#order-by" aria-hidden="true">#</a> order by</h2><p>根据排序字段建立合适的索引，多字段排序时，也遵循最左前缀法则。</p><p>尽量使用覆盖索引。</p><p>多字段排序, 一个升序一个降序，此时需要注意联合索引在创建时的规则（ASC/DESC）。</p><div class="language-sql line-numbers-mode" data-ext="sql"><pre class="language-sql"><code><span class="token keyword">create</span> <span class="token keyword">index</span> idx_user_age_phone_ad <span class="token keyword">on</span> tb_user<span class="token punctuation">(</span>age <span class="token keyword">asc</span> <span class="token punctuation">,</span>phone <span class="token keyword">desc</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h2 id="group-by" tabindex="-1"><a class="header-anchor" href="#group-by" aria-hidden="true">#</a> group by</h2><p>在分组操作时，可以通过索引来提高效率。</p><p>分组操作时，索引的使用也是满足最左前缀法则的。</p>`,115);function C(J,M){const n=c("router-link");return p(),d("div",null,[B,s("nav",D,[s("ul",null,[s("li",null,[e(n,{to:"#sql优化"},{default:o(()=>[a("SQL优化")]),_:1})]),s("li",null,[e(n,{to:"#select"},{default:o(()=>[a("select")]),_:1}),s("ul",null,[s("li",null,[e(n,{to:"#查询时尽量不要使用"},{default:o(()=>[a("查询时尽量不要使用*")]),_:1})]),s("li",null,[e(n,{to:"#连表查询时尽量不要关联太多表"},{default:o(()=>[a("连表查询时尽量不要关联太多表")]),_:1})]),s("li",null,[e(n,{to:"#多表查询时一定要以小驱大"},{default:o(()=>[a("多表查询时一定要以小驱大")]),_:1})]),s("li",null,[e(n,{to:"#覆盖索引"},{default:o(()=>[a("覆盖索引")]),_:1})]),s("li",null,[e(n,{to:"#sql提示"},{default:o(()=>[a("SQL提示")]),_:1})])])]),s("li",null,[e(n,{to:"#insert"},{default:o(()=>[a("insert")]),_:1}),s("ul",null,[s("li",null,[e(n,{to:"#大批量插入数据"},{default:o(()=>[a("大批量插入数据")]),_:1})])])]),s("li",null,[e(n,{to:"#update"},{default:o(()=>[a("update")]),_:1})]),s("li",null,[e(n,{to:"#主键优化"},{default:o(()=>[a("主键优化")]),_:1}),s("ul",null,[s("li",null,[e(n,{to:"#_1-数据组织方式"},{default:o(()=>[a("1). 数据组织方式")]),_:1})]),s("li",null,[e(n,{to:"#_2-页分裂"},{default:o(()=>[a("2). 页分裂")]),_:1})]),s("li",null,[e(n,{to:"#_3-页合并"},{default:o(()=>[a("3).页合并")]),_:1})])])]),s("li",null,[e(n,{to:"#count"},{default:o(()=>[a("count")]),_:1})]),s("li",null,[e(n,{to:"#order-by"},{default:o(()=>[a("order by")]),_:1})]),s("li",null,[e(n,{to:"#group-by"},{default:o(()=>[a("group by")]),_:1})])])]),T])}const P=t(I,[["render",C],["__file","SQLOptimization.html.vue"]]);export{P as default};
