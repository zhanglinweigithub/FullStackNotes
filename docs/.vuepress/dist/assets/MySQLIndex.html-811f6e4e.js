import{_ as l,M as d,p as r,q as p,R as e,N as a,V as o,t as s,a1 as t}from"./framework-5866ffd3.js";const i="/FullStackNotes/assets/1674184073732-46a65b0c-b5e4-4aef-b3c3-af4a263b49c0-964123f1.png",u="/FullStackNotes/assets/1674184090051-20a93057-488d-47f4-9d60-62b39441bdac-18815a9e.png",h="/FullStackNotes/assets/1674184161963-314a7de4-f944-4d2a-a683-cdaa37503b34-c4ce9d4d.png",g="/FullStackNotes/assets/1674184242982-fdecc80d-690e-4750-af5d-72c5158b5c6e-0104c406.png",k="/FullStackNotes/assets/1674184344040-f20de80d-fa6b-4a43-81a0-04ddf7553d84-03f883eb.png",b="/FullStackNotes/assets/1674184488682-680c9dc4-2c99-4ef1-80e8-259d87462376-01255282.png",m="/FullStackNotes/assets/1674184565001-2109922e-12a5-44c1-a435-352f38727efb-983c449f.png",f="/FullStackNotes/assets/1674184581759-1873e651-1d8f-4c99-9dd7-9eb23884e0c8-240ed289.png",_="/FullStackNotes/assets/1674185018645-e7765916-2182-4156-a422-c8c22ec39ed5-6c5ba55b.png",v="/FullStackNotes/assets/1674185044583-199fd892-3554-4be8-9cd2-adf7796eb2fe-7c87ec67.png",y="/FullStackNotes/assets/1674190551191-cbae2140-c093-454c-a49e-a440563d69e9-89801870.png",x="/FullStackNotes/assets/1674190739675-4601fcb9-2821-414a-96fd-375554a08cc1-ce6af213.png",w="/FullStackNotes/assets/1674187624294-ffbece53-a072-428f-8ff1-f9156ef0b1f7-1ebe1383.png",N="/FullStackNotes/assets/1674187665226-05966820-6d19-49e2-bd40-9203ec22caa8-274372e5.png",S="/FullStackNotes/assets/1674187592975-f88c4b2f-2de0-445b-bd41-808c3c13e4de-cf1ba6c2.png",E="/FullStackNotes/assets/1674187746600-4132d3fb-02bc-45ff-a962-4607cdc10c50-3d41d311.png",L="/FullStackNotes/assets/1674187775485-7049e1bf-cce3-4318-838c-dcb92d52f22d-738123e0.png",I="/FullStackNotes/assets/1674187869678-1a375e18-36f7-40be-8ad7-9741c120904f-89282bff.png",U="/FullStackNotes/assets/1674187971815-f5a70073-aa39-48c2-b198-c4e20e16ac9e-b304e0cd.png",q="/FullStackNotes/assets/image-20230409155341219-dbc01a71.png",B={},Q=e("h1",{id:"目录",tabindex:"-1"},[e("a",{class:"header-anchor",href:"#目录","aria-hidden":"true"},"#"),s(" 目录")],-1),T={class:"table-of-contents"},M=t(`<h2 id="索引" tabindex="-1"><a class="header-anchor" href="#索引" aria-hidden="true">#</a> 索引</h2><p>索引（index）是帮助<code>MySQL</code>高效获取数据的数据结构 (有序)</p><p><strong>为什么使用索引快？</strong></p><p>索引就相当于一本书的目录</p><p>试想一本书如果没有目录的话，你想找一篇文章是不是就只能从头到尾一页页找了？（全表扫描）</p><p>而有索引的话，想找什么内容就可以通过目录定位文章所在页数</p><p><strong>索引特点</strong></p><ul><li><strong>优点</strong><ul><li><strong>提高数据检索的效率，降低数据库 的IO成本</strong></li><li><strong>通过索引列对数据进行排序，降低 数据排序的成本，降低CPU的消 耗</strong></li></ul></li><li><strong>缺点</strong><ul><li><strong>索引列也是要占用空间的</strong></li><li><strong>索引大大提高了查询效率，同时却也降低更新表的速度， 如对表进行INSERT、UPDATE、DELETE时，效率降低。 因为需要维护索引</strong></li></ul></li></ul><div class="language-SQL line-numbers-mode" data-ext="SQL"><pre class="language-SQL"><code>--  创建索引
CREATE [ UNIQUE | FULLTEXT ] INDEX 索引名 ON 表名 (列名,... ) ;

CREATE INDEX idx_user_name ON tb_user(name);

CREATE UNIQUE INDEX idx_user_phone ON tb_user(phone);

CREATE INDEX idx_user_pro_age_sta ON tb_user(profession,age,status);

-- 查看索引
SHOW INDEX FROM 表名 ;

-- 删除索引
DROP INDEX 索引名 ON 表名;

-- 前缀索引
create index 索引名 on 表名(列名(长度)) ;

create index idx_email_5 on tb_user(email(5));
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="索引结构" tabindex="-1"><a class="header-anchor" href="#索引结构" aria-hidden="true">#</a> 索引结构</h2><p><code>MySQL</code>的索引是在存储引擎层实现的，不同的存储引擎有不同的索引结构</p><table><thead><tr><th><strong>索引结构</strong></th><th><strong>描述</strong></th><th><strong>InnoDB</strong></th><th><strong>MyISAM</strong></th><th><strong>Memory</strong></th></tr></thead><tbody><tr><td><code>B+Tree</code>索引</td><td>最常见的索引类型，大部分引擎都支持 <code>B+</code> 树索引</td><td>支持</td><td>支持</td><td>支持</td></tr><tr><td><code>Hash</code>索引</td><td>底层数据结构是用哈希表实现的, 只有精确匹配索引列的查询才有效, 不 支持范围查询</td><td>不支持</td><td>不支持</td><td>支持</td></tr><tr><td><code>R-tree</code>(空间索 引）</td><td>空间索引是<code>MyISAM</code>引擎的一个特殊索引类型，主要用于地理空间数据类 型，通常使用较少</td><td>不支持</td><td>支持</td><td>不支持</td></tr><tr><td><code>Full-text</code>(全文 索引)</td><td>是一种通过建立倒排索引,快速匹配文档的方式。类似于 Lucene,Solr,ES</td><td>5.6后支持</td><td>支持</td><td>不支持</td></tr></tbody></table><blockquote><p>注意： 我们平常所说的索引，如果没有特别指明，都是指<code>B+</code>树结构组织的索引。</p></blockquote><h3 id="二叉树" tabindex="-1"><a class="header-anchor" href="#二叉树" aria-hidden="true">#</a> 二叉树</h3><p>假如说<code>MySQL</code>的索引结构采用二叉树的数据结构，比较理想的结构如下： <img src="`+i+'" alt="image.png"></p><p>如果主键是顺序插入的，则会形成一个单向链表，结构如下： <img src="'+u+'" alt="image.png"></p><p><strong>所以，如果选择二叉树作为索引结构，会存在以下缺点</strong></p><ul><li><strong>顺序插入时，会形成一个链表，查询性能大大降低</strong></li><li><strong>大数据量情况下，层级较深，检索速度慢</strong></li></ul><h3 id="红黑树" tabindex="-1"><a class="header-anchor" href="#红黑树" aria-hidden="true">#</a> 红黑树</h3><p>此时可能会想到，可以选择红黑树，红黑树是一颗自平衡二叉树，那这样即使是顺序插入数 据，最终形成的数据结构也是一颗平衡的二叉树</p><p><img src="'+h+'" alt="image.png"></p><p><strong>但是，即使如此，由于红黑树也是一颗二叉树，所以也会存在一个缺点</strong></p><ul><li><strong>大数据量情况下，层级较深，检索速度慢</strong></li></ul><p><strong>所以，在<code>MySQL</code>的索引结构中，并没有选择二叉树或者红黑树，而选择的是<code>B+Tree</code></strong></p><h3 id="b-tree" tabindex="-1"><a class="header-anchor" href="#b-tree" aria-hidden="true">#</a> B-Tree</h3><p><code>B-Tree</code>，B树是一种多叉路衡查找树，相对于二叉树，B树每个节点可以有多个分支，即多叉。 以一颗最大度数（max-degree）为5(5阶)的<code>b-tree</code>为例，那这个B树每个节点最多存储4个<code>key</code>，5 个指针 <img src="'+g+'" alt="image.png"><strong>特点</strong></p><ul><li><strong>5阶的B树，每一个节点最多存储4个key，对应5个指针</strong></li><li><strong>一旦节点存储的key数量到达5，就会裂变，中间元素向上分裂</strong></li><li><strong>在B树中，非叶子节点和叶子节点都会存放数据</strong></li></ul><p>我们可以通过一个数据结构可视化的网站来简单演示一下</p>',28),D={href:"https://www.cs.usfca.edu/~galles/visualization/BPlusTree.html",target:"_blank",rel:"noopener noreferrer"},R=t('<h3 id="b-tree-1" tabindex="-1"><a class="header-anchor" href="#b-tree-1" aria-hidden="true">#</a> B+Tree</h3><p><code>B+Tree</code>是<code>B-Tree</code>的变种，我们以一颗最大度数（max-degree）为4（4阶）的b+tree为例</p><p><img src="'+k+'" alt="image.png"></p><p>我们可以看到，两部分：</p><ul><li>绿色框框起来的部分，是索引部分，仅仅起到索引数据的作用，不存储数据。</li><li>红色框框起来的部分，是数据存储部分，在其叶子节点中要存储具体的数据。</li></ul><p><strong>最终我们看到，B+Tree 与 B-Tree相比，主要有以下三点区别：</strong></p><ul><li><strong>所有的数据都会出现在叶子节点。</strong></li><li><strong>叶子节点形成一个单向链表。</strong></li><li><strong>非叶子节点仅仅起到索引数据作用，具体的数据都是在叶子节点存放的。</strong></li></ul><hr><p><code>MySQL</code>索引数据结构对经典的<code>B+Tree</code>进行了优化。</p><p>在原<code>B+Tree</code>的基础上，增加一个指向相邻叶子节点 的链表指针，就形成了带有顺序指针的<code>B+Tree</code>，<strong>提高区间访问的性能，利于排序</strong><img src="'+b+'" alt="image.png"></p><h3 id="hash索引" tabindex="-1"><a class="header-anchor" href="#hash索引" aria-hidden="true">#</a> Hash索引</h3><p><code>MySQL</code>中除了支持<code>B+Tree</code>索引，还支持一种索引类型---<code>Hash</code>索引。</p><p>哈希索引就是采用一定的<code>hash</code>算法，将键值换算成新的<code>hash</code>值，映射到对应的槽位上，然后存储在 <code>hash</code>表中</p><p><img src="'+m+'" alt="image.png"></p><p>如果两个(或多个)键值，映射到一个相同的槽位上，他们就产生了<code>hash</code>冲突（也称为<code>hash</code>碰撞），可 以通过链表来解决。</p><p><img src="'+f+'" alt="image.png"></p><p><strong>特点</strong></p><ul><li><strong>Hash索引只能用于对等比较(=，in)，不支持范围查询（between，&gt;，&lt; ，...）</strong><strong>无法利用索引完成排序操作</strong></li><li><strong>查询效率高，通常(不存在hash冲突的情况)只需要一次检索就可以了，效率通常要高于<code>B+tree</code>索 引</strong></li><li><strong>在<code>MySQL</code>中，支持<code>hash</code>索引的是<code>Memory</code>存储引擎。 而<code>InnoDB</code>中具有自适应<code>hash</code>功能，<code>hash</code>索引是 <code>InnoDB</code>存储引擎根据<code>B+Tree</code>索引在指定条件下自动构建的。</strong></li></ul><h2 id="索引分类" tabindex="-1"><a class="header-anchor" href="#索引分类" aria-hidden="true">#</a> 索引分类</h2><p>在<code>MySQL</code>数据库，将索引的具体类型主要分为以下几类</p><ul><li>主键索引</li><li>唯一索引</li><li>常规索引</li><li>全文索引</li></ul><table><thead><tr><th><strong>分类</strong></th><th><strong>含义</strong></th><th><strong>特点</strong></th><th><strong>关键字</strong></th></tr></thead><tbody><tr><td>主键索引</td><td>针对于表中主键创建的索引</td><td>默认自动创建, 只能 有一个</td><td><code>PRIMARY</code></td></tr><tr><td>唯一索引</td><td>避免同一个表中某数据列中的值重复</td><td>可以有多个</td><td><code>UNIQUE</code></td></tr><tr><td>常规索引</td><td>快速定位特定数据</td><td>可以有多个</td><td></td></tr><tr><td>全文索引</td><td>全文索引查找的是文本中的关键词，而不是比 较索引中的值</td><td>可以有多个</td><td><code>FULLTEXT</code></td></tr></tbody></table><p>而在在<code>InnoDB</code>存储引擎中，根据索引的存储形式，又可以分为以下两种</p><table><thead><tr><th><strong>分类</strong></th><th><strong>含义</strong></th><th><strong>特点</strong></th></tr></thead><tbody><tr><td>聚集索引(Clustered Index)</td><td>将数据存储与索引放到了一块，索引结构的叶子 节点保存了行数据</td><td>必须有,而且只 有一个</td></tr><tr><td>二级索引(Secondary Index)</td><td>将数据与索引分开存储，索引结构的叶子节点关 联的是对应的主键</td><td>可以存在多个</td></tr></tbody></table><p><strong>聚集索引选取规则</strong></p><ul><li><strong>如果存在主键，主键索引就是聚集索引</strong></li><li><strong>如果不存在主键，将使用第一个唯一（UNIQUE）索引作为聚集索引</strong></li><li><strong>如果表没有主键，或没有合适的唯一索引，则<code>InnoDB</code>会自动生成一个<code>rowid</code>作为隐藏的聚集索引</strong></li></ul><p>聚集索引和二级索引的具体结构 <img src="'+_+'" alt="image.png"></p><h2 id="回表查询" tabindex="-1"><a class="header-anchor" href="#回表查询" aria-hidden="true">#</a> <strong>回表查询</strong></h2><p>这种先到二级索引中查找数据，找到主键值，然后再到聚集索引中根据主键值，获取 数据的方式，就称之为回表查询。 <img src="'+v+`" alt="image.png"><strong>具体过程如下:</strong></p><p><strong>①. 由于是根据name字段进行查询，所以先根据name=&#39;Arm&#39;到name字段的二级索引中进行匹配查 找。但是在二级索引中只能查找到 Arm 对应的主键值 10</strong></p><p><strong>②. 由于查询返回的数据是，所以此时，还需要根据主键值10，到聚集索引中查找10对应的记录，最终找到10对应的行row</strong></p><p><strong>③. 最终拿到这一行的数据，直接返回即可</strong></p><h2 id="前缀索引" tabindex="-1"><a class="header-anchor" href="#前缀索引" aria-hidden="true">#</a> 前缀索引</h2><p>当字段类型为字符串（<code>varchar</code>，<code>text</code>，<code>longtext</code>等）时，有时候需要索引很长的字符串，这会让 索引变得很大，查询时，浪费大量的磁盘IO， 影响查询效率。</p><p>此时可以只将字符串的一部分前缀，建 立索引，这样可以大大节约索引空间，从而提高索引效率。</p><p>1）语法</p><div class="language-SQL line-numbers-mode" data-ext="SQL"><pre class="language-SQL"><code>create index idx_xxxx on table_name(column(n)) ;    
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>2）前缀长度</p><p>可以根据索引的选择性来决定，而选择性是指<strong>不重复的索引值（基数）和数据表的记录总数的比值</strong>， 索引选择性越高则查询效率越高， 唯一索引的选择性是1，这是最好的索引选择性，性能也是最好的。</p><div class="language-SQL line-numbers-mode" data-ext="SQL"><pre class="language-SQL"><code>select count(distinct email) / count(*) from tb_user ; 

select count(distinct substring(email,1,5)) / count(*) from tb_user ;  
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><img src="`+y+'" alt="image.png"></p><h2 id="单列索引与联合索引" tabindex="-1"><a class="header-anchor" href="#单列索引与联合索引" aria-hidden="true">#</a> 单列索引与联合索引</h2><p>单列索引：即一个索引只包含单个列。</p><p>联合索引：即一个索引包含了多个列。</p><p>若在<code>and</code>连接的两个字段 <code>phone</code>、<code>name</code>上都是有单列索引的，但是最终<code>mysql</code>只会选择一个索引，也就是说，只能走一个字段的索引，此时是会回表查询的。</p><p>若有联合索引则会走联合索引，不会回表查询 <img src="'+x+`" alt="image.png"></p><h2 id="索引失效情况" tabindex="-1"><a class="header-anchor" href="#索引失效情况" aria-hidden="true">#</a> 索引失效情况</h2><h3 id="最左前缀法则" tabindex="-1"><a class="header-anchor" href="#最左前缀法则" aria-hidden="true">#</a> 最左前缀法则</h3><p>如果索引了多列（联合索引），要遵守最左前缀法则。</p><ul><li>最左前缀法则指的是查询从索引的最左列开始，<strong>最左列必须存在</strong>，否则索引<strong>全部失效</strong></li><li>并且不能跳过索引中的列。如果跳跃某一列，索引将会<strong>部分失效</strong>(后面的字段索引失效)</li></ul><blockquote><p><strong>注意 ： 最左前缀法则中指的最左边的列，是指在查询时，联合索引的最左边的字段(即是 第一个字段)必须存在，与我们编写SQL时，条件编写的先后顺序无关。</strong></p></blockquote><h3 id="范围查询" tabindex="-1"><a class="header-anchor" href="#范围查询" aria-hidden="true">#</a> 范围查询</h3><p>联合索引中，出现范围查询(<code>&gt;,&lt;</code>)，范围查询右侧的列索引失效。</p><div class="language-sql line-numbers-mode" data-ext="sql"><pre class="language-sql"><code> <span class="token keyword">explain</span> <span class="token keyword">select</span> <span class="token operator">*</span> <span class="token keyword">from</span> tb_user <span class="token keyword">where</span> profession <span class="token operator">=</span> <span class="token string">&#39;软件工程&#39;</span> <span class="token operator">and</span> age <span class="token operator">&gt;</span> <span class="token number">30</span> <span class="token operator">and</span> <span class="token keyword">status</span> <span class="token operator">=</span> <span class="token string">&#39;0&#39;</span><span class="token punctuation">;</span> 
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p><img src="`+w+`" alt="image.png"> 当范围查询使用<code>&gt;=</code> 或 <code>&lt;=</code> 时， 所有的字段都是走索引 的</p><div class="language-sql line-numbers-mode" data-ext="sql"><pre class="language-sql"><code><span class="token keyword">explain</span> <span class="token keyword">select</span> <span class="token operator">*</span> <span class="token keyword">from</span> tb_user <span class="token keyword">where</span> profession <span class="token operator">=</span> <span class="token string">&#39;软件工程&#39;</span> <span class="token operator">and</span> age <span class="token operator">&gt;=</span> <span class="token number">30</span> <span class="token operator">and</span> <span class="token keyword">status</span> <span class="token operator">=</span> <span class="token string">&#39;0&#39;</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p><img src="`+N+`" alt="image.png"></p><h3 id="索引列运算" tabindex="-1"><a class="header-anchor" href="#索引列运算" aria-hidden="true">#</a> 索引列运算</h3><p>不要在索引列上进行运算操作， 索引将失效</p><div class="language-sql line-numbers-mode" data-ext="sql"><pre class="language-sql"><code> <span class="token keyword">explain</span> <span class="token keyword">select</span> <span class="token operator">*</span> <span class="token keyword">from</span> tb_user <span class="token keyword">where</span> substring<span class="token punctuation">(</span>phone<span class="token punctuation">,</span><span class="token number">10</span><span class="token punctuation">,</span><span class="token number">2</span><span class="token punctuation">)</span> <span class="token operator">=</span> <span class="token string">&#39;15&#39;</span><span class="token punctuation">;</span> 
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p><img src="`+S+`" alt="image.png"></p><h3 id="字符串不加引号" tabindex="-1"><a class="header-anchor" href="#字符串不加引号" aria-hidden="true">#</a> 字符串不加引号</h3><p>字符串类型字段使用时，不加引号，索引将失效</p><blockquote><p>如果字符串不加单引号，对于查询结果，没什么影响，但是数 据库存在隐式类型转换，索引将失效</p></blockquote><div class="language-sql line-numbers-mode" data-ext="sql"><pre class="language-sql"><code><span class="token keyword">explain</span> <span class="token keyword">select</span> <span class="token operator">*</span> <span class="token keyword">from</span> tb_user <span class="token keyword">where</span> profession <span class="token operator">=</span> <span class="token string">&#39;软件工程&#39;</span> <span class="token operator">and</span> age <span class="token operator">=</span> <span class="token number">31</span> <span class="token operator">and</span> <span class="token keyword">status</span> <span class="token operator">=</span> <span class="token string">&#39;0&#39;</span><span class="token punctuation">;</span> 

<span class="token keyword">explain</span> <span class="token keyword">select</span> <span class="token operator">*</span> <span class="token keyword">from</span> tb_user <span class="token keyword">where</span> profession <span class="token operator">=</span> <span class="token string">&#39;软件工程&#39;</span> <span class="token operator">and</span> age <span class="token operator">=</span> <span class="token number">31</span> <span class="token operator">and</span> <span class="token keyword">status</span> <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span> 
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><img src="`+E+`" alt="image.png"></p><div class="language-sql line-numbers-mode" data-ext="sql"><pre class="language-sql"><code><span class="token keyword">explain</span> <span class="token keyword">select</span> <span class="token operator">*</span> <span class="token keyword">from</span> tb_user <span class="token keyword">where</span> phone <span class="token operator">=</span> <span class="token string">&#39;17799990015&#39;</span><span class="token punctuation">;</span> 

<span class="token keyword">explain</span> <span class="token keyword">select</span> <span class="token operator">*</span> <span class="token keyword">from</span> tb_user <span class="token keyword">where</span> phone <span class="token operator">=</span> <span class="token number">17799990015</span><span class="token punctuation">;</span> 
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><img src="`+L+`" alt="image.png"></p><h3 id="头部模糊查询" tabindex="-1"><a class="header-anchor" href="#头部模糊查询" aria-hidden="true">#</a> 头部模糊查询</h3><p>如果仅仅是尾部模糊匹配，索引不会失效。</p><p>如果是头部模糊匹配，索引失效</p><div class="language-sql line-numbers-mode" data-ext="sql"><pre class="language-sql"><code><span class="token keyword">explain</span> <span class="token keyword">select</span> <span class="token operator">*</span> <span class="token keyword">from</span> tb_user <span class="token keyword">where</span> profession <span class="token operator">like</span> <span class="token string">&#39;软件%&#39;</span><span class="token punctuation">;</span> 

<span class="token keyword">explain</span> <span class="token keyword">select</span> <span class="token operator">*</span> <span class="token keyword">from</span> tb_user <span class="token keyword">where</span> profession <span class="token operator">like</span> <span class="token string">&#39;%工程&#39;</span><span class="token punctuation">;</span> 

<span class="token keyword">explain</span> <span class="token keyword">select</span> <span class="token operator">*</span> <span class="token keyword">from</span> tb_user <span class="token keyword">where</span> profession <span class="token operator">like</span> <span class="token string">&#39;%工%&#39;</span><span class="token punctuation">;</span> 
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><img src="`+I+`" alt="image.png"></p><h3 id="or-连接条件" tabindex="-1"><a class="header-anchor" href="#or-连接条件" aria-hidden="true">#</a> or 连接条件</h3><p>用<code>or</code>分割开的条件， 如果<code>or</code>前的条件中的列有索引，而后面的列中没有索引，那么涉及的索引都不会被用到</p><div class="language-sql line-numbers-mode" data-ext="sql"><pre class="language-sql"><code><span class="token keyword">explain</span> <span class="token keyword">select</span> <span class="token operator">*</span> <span class="token keyword">from</span> tb_user <span class="token keyword">where</span> id <span class="token operator">=</span> <span class="token number">10</span> <span class="token operator">or</span> age <span class="token operator">=</span> <span class="token number">23</span><span class="token punctuation">;</span> 

<span class="token keyword">explain</span> <span class="token keyword">select</span> <span class="token operator">*</span> <span class="token keyword">from</span> tb_user <span class="token keyword">where</span> phone <span class="token operator">=</span> <span class="token string">&#39;17799990017&#39;</span> <span class="token operator">or</span> age <span class="token operator">=</span> <span class="token number">23</span><span class="token punctuation">;</span> 
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><img src="`+U+`" alt="image.png"></p><p>由于<code>age</code>没有索引，所以即使<code>id</code>、<code>phone</code>有索引，索引也会失效。</p><p>所以需要针对于<code>age</code>也要建立索引。</p><blockquote><p>当<code>or</code>连接的条件，左右两侧字段都有索引时，索引才会生效。</p></blockquote><h3 id="空值判断" tabindex="-1"><a class="header-anchor" href="#空值判断" aria-hidden="true">#</a> 空值判断</h3><p>判断<code>null</code>的情况不会走索引</p><div class="language-sql line-numbers-mode" data-ext="sql"><pre class="language-sql"><code><span class="token keyword">select</span> <span class="token operator">*</span> <span class="token keyword">from</span> xxx <span class="token keyword">where</span> yyy <span class="token operator">is</span> <span class="token boolean">null</span><span class="token punctuation">;</span>
<span class="token keyword">select</span> <span class="token operator">*</span> <span class="token keyword">from</span> xxx <span class="token keyword">where</span> yyy <span class="token operator">not</span> <span class="token operator">is</span> <span class="token boolean">null</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>都不会走索引</p><h3 id="数据分布影响" tabindex="-1"><a class="header-anchor" href="#数据分布影响" aria-hidden="true">#</a> 数据分布影响</h3><p>如果<code>MySQL</code>评估使用索引比全表更慢，则不使用索引</p><ul><li>如果符合条件的记录数超过总记录数的一半，就不会走索引</li><li>如果符合条件的记录数未到总记录数的一半，就会走索引</li></ul><p>如： 表中10条记录，6条为<code>null</code>， <code>is null</code> 查询，就不会走索引，<code>is not null</code> 就会走索引</p><h2 id="索引设计原则" tabindex="-1"><a class="header-anchor" href="#索引设计原则" aria-hidden="true">#</a> 索引设计原则</h2><h3 id="建立索引" tabindex="-1"><a class="header-anchor" href="#建立索引" aria-hidden="true">#</a> 建立索引</h3><p>①经常频繁用作查询条件的字段应酌情考虑为其创建索引。</p><p>②表的主外键或连表字段，必须建立索引，因为能很大程度提升连表查询的性能。</p><p>③建立索引的字段，一般值的区分性要足够高，这样才能提高索引的检索效率。</p><p>④建立索引的字段，值不应该过长，如果较长的字段要建立索引，可以选择前缀索引。</p><p>⑤建立联合索引，应当遵循最左前缀原则，将多个字段之间按优先级顺序组合。</p><p>⑥经常根据范围取值、排序、分组的字段应建立索引，因为索引有序，能加快排序时间。</p><p>⑦对于唯一索引，如果确认不会利用该字段排序，那可以将结构改为<code>Hash</code>结构。</p><p>⑧尽量使用联合索引代替单值索引，联合索引比多个单值索引查询效率要高。</p><h3 id="不适合建立索引" tabindex="-1"><a class="header-anchor" href="#不适合建立索引" aria-hidden="true">#</a> 不适合建立索引</h3><p>❶值经常会增删改的字段，不合适建立索引，因为每次改变后需维护索引结构。</p><p>❷一个字段存在大量的重复值时，不适合建立索引，比如之前举例的性别字段。</p><p>❸索引不能参与计算，因此经常带函数查询的字段，并不适合建立索引。</p><p>❹一张表中的索引数量并不是越多越好，一般控制在<code>3</code>，最多不能超过<code>5</code>。</p><p>❺建立联合索引时，一定要考虑优先级，查询频率最高的字段应当放首位。</p><p>❻当表的数据较少，不应当建立索引，因为数据量不大时，维护索引反而开销更大。</p><p>❼索引的字段值无序时，不推荐建立索引，因为会造成页分裂，尤其是主键索引。</p><h2 id="索引优化" tabindex="-1"><a class="header-anchor" href="#索引优化" aria-hidden="true">#</a> 索引优化</h2><p>如何判断一条<code>SQL</code>会不会走索引呢？这里需要使用一个工具：<code>explain</code></p><p>是<code>MySQL</code>自带的一个执行分析工具，可使用于<code>select、insert、update、delete、repleace</code>等语句上，需要使用时只需在<code>SQL</code>语句前加上一个<code>explain</code>关键字即可，然后<code>MySQL</code>会对应语句的执行计划列出</p><p><img src="`+q+'" alt="image-20230409155341219"></p><div class="custom-container tip"><p class="custom-container-title">TIP</p><p>重点关注以下几个字段</p><ul><li><code>key</code>：如果该值为空，则表示未使用索引查询，此时需要调整<code>SQL</code>或建立索引。</li><li><code>type</code>：这个字段决定了查询的类型，如果为<code>index、all</code>就需要进行优化。</li><li><code>rows</code>：这个字段代表着查询时可能会扫描的数据行数，较大时也需要进行优化。</li><li><code>filtered</code>：这个字段代表着查询时，表中不会扫描的数据行占比，较小时需要进行优化。</li><li><code>Extra</code>：这个字段代表着查询时的具体情况，在某些情况下需要根据对应信息进行优化。</li></ul></div><h3 id="id字段" tabindex="-1"><a class="header-anchor" href="#id字段" aria-hidden="true">#</a> id字段</h3><p>一条<code>SQL</code>语句可能会出现多步执行计划，所以会出现多个<code>ID</code>值，这个值越大，表示执行的优先级越高，同时还会出现四种情况</p><ul><li><code>ID</code>相同：当出现多个<code>ID</code>相同的执行计划时，从上往下挨个执行。</li><li><code>ID</code>不同时：按照<code>ID</code>值从大到小依次执行。</li><li><code>ID</code>有相同又有不同：先从到到小依次执行，碰到相同<code>ID</code>时从上往下执行。</li><li><code>ID</code>为空：<code>ID=null</code>时，会放在最后执行。</li></ul><h3 id="select-type字段" tabindex="-1"><a class="header-anchor" href="#select-type字段" aria-hidden="true">#</a> select_type字段</h3><p>这个字段主要是说明当前查询语句所属的类型，以及在整条大的查询语句中，当前这个查询语句所属的位置</p><p>取值如下：</p><p><code>SIMPLE</code>：简单的<code>select</code>查询语句，不包含<code>union</code>、子查询语句。</p><p><code>PRIMARY</code>：<code>union</code>或子查询语句中，最外层的主<code>select</code>语句。</p><p><code>SUBQUEPY</code>：包含在主<code>select</code>语句中的第一个子查询，如<code>select ... xx = (select ...)</code>。</p><p><code>DERIVED</code>：派生表，指包含在<code>from</code>中的子查询语句，如<code>select ... from (select ...)</code>。</p><p><code>DEPENDENT SUBQUEPY</code>：复杂<code>SQL</code>中的第一个<code>select</code>子查询（依赖于外部查询的结果集）。</p><p><code>UNCACHEABLE SUBQUERY</code>：不缓存结果集的子查询语句。</p><p><code>UNION</code>：多条语句通过<code>union</code>组成的查询中，第二个以及更后面的<code>select</code>语句。</p><p><code>UNION RESULT</code>：<code>union</code>的结果集。</p><p><code>DEPENDENT UNION</code>：含义同上，但是基于外部查询的结果集来查询的。</p><p><code>UNCACHEABLE UNION</code>：含义同上，但查询出的结果集不会加入缓存。</p><p><code>MATERIALIZED</code>：采用物化的方式执行的包含派生表的查询语句。</p><h3 id="table字段" tabindex="-1"><a class="header-anchor" href="#table字段" aria-hidden="true">#</a> table字段</h3><p>表示当前这个执行计划是基于哪张表执行的，这里会写出表名</p><p><code>&lt;derivenN&gt;</code>：基于<code>id=N</code>的查询结果集，进一步检索数据。</p><p><code>&lt;unionM,N&gt;</code>：会出现在查询类型为<code>UNION RESULT</code>的计划中，表示结果由<code>id=M,N...</code>的查询组成。</p><p><code>&lt;subqueryN&gt;</code>：基于<code>id=N</code>的子查询结果，进一步进行数据检索。</p><p><code>&lt;tableName&gt;</code>：基于磁盘中已创建的某张表查询。</p><h3 id="partitions字段" tabindex="-1"><a class="header-anchor" href="#partitions字段" aria-hidden="true">#</a> partitions字段</h3><p>该列的值表示检索数据的分区</p><h3 id="type字段" tabindex="-1"><a class="header-anchor" href="#type字段" aria-hidden="true">#</a> type字段</h3><p>表示当前语句执行的类型，可能出现的值如下</p><p><code>all</code>：全表扫描，基于表中所有的数据，逐行扫描并过滤符合条件的数据。</p><p><code>index</code>：全索引扫描，和全表扫描类似，但这个是把索引树遍历一次，会比全表扫描要快。</p><p><code>range</code>：基于索引字段进行范围查询，如<code>between、&lt;、&gt;、in....</code>等操作时出现的情况。</p><p><code>index_subquery</code>：和上面含义相同，区别：这个是基于非主键、唯一索引字段进行<code>in</code>操作。</p><p><code>unique_subquery</code>：执行基于主键索引字段，进行<code>in</code>操作的子查询语句会出现的情况。</p><p><code>index_merge</code>：多条件查询时，组合使用多个索引来检索数据的情况。</p><p><code>ref_or_null</code>：基于次级(非主键)索引做条件查询时，该索引字段允许为<code>null</code>出现的情况。</p><p><code>fulltext</code>：基于全文索引字段，进行查询时出现的情况。</p><p><code>ref</code>：基于非主键或唯一索引字段查找数据时，会出现的情况。</p><p><code>eq_ref</code>：连表查询时，基于主键、唯一索引字段匹配数据的情况，会出现多次索引查找。</p><p><code>const</code>：通过索引一趟查找后就能获取到数据，基于唯一、主键索引字段查询数据时的情况。</p><p><code>system</code>：表中只有一行数据，这是<code>const</code>的一种特例。</p><p><code>null</code>：表中没有数据，无需经过任何数据检索，直接返回结果</p><div class="custom-container tip"><p class="custom-container-title">重要</p><p>这个字段的值很重要，它决定了<code>MySQL</code>在执行一条<code>SQL</code>时，访问数据的方式，性能从好到坏依次为</p><p>完整：<code>null</code> → <code>system</code> → <code>const</code> → <code>eq_ref</code> → <code>ref</code> → <code>fulltext</code> → <code>ref_or_null</code> → <code>index_merge</code> → <code>unique_subquery</code> → <code>index_subquery</code> → <code>range</code> → <code>index</code> → <code>all</code></p><p>常见：<code>system</code> → <code>const</code> → <code>eq_ref</code> → <code>ref</code> → <code>fulltext</code> → <code>range</code> → <code>index</code> → <code>all</code></p><blockquote><p>一般都会要求最好优化到<code>ref</code>级别，至少也要到<code>range</code>级别</p></blockquote></div><h3 id="possible-keys字段" tabindex="-1"><a class="header-anchor" href="#possible-keys字段" aria-hidden="true">#</a> possible_keys字段</h3><p>可能会用到哪些索引</p><div class="custom-container warning"><p class="custom-container-title">WARNING</p><p>可能会用到并不代表一定会用</p></div><h3 id="key字段" tabindex="-1"><a class="header-anchor" href="#key字段" aria-hidden="true">#</a> key字段</h3><p>具体使用的索引</p><h3 id="key-len字段" tabindex="-1"><a class="header-anchor" href="#key-len字段" aria-hidden="true">#</a> key_len字段</h3><p>索引字段长度</p><ul><li>如果索引是前缀索引，这里则只会使用创建前缀索引时，声明的前<code>N</code>个字节来检索数据。</li><li>如果是联合索引，这里只会显示当前<code>SQL</code>会用到的索引字段长度，可能不是全匹配的情况。</li><li>如果一个索引字段的值允许为空，<code>key_len</code>的长度会为：索引字段长度<code>+1</code></li></ul><h3 id="ref字段" tabindex="-1"><a class="header-anchor" href="#ref字段" aria-hidden="true">#</a> ref字段</h3><p>显示索引查找过程中，查询时会用到的常量或字段</p><p><code>const</code>：如果显示这个，则代表目前是在基于主键字段值或数据库已有的常量（如<code>null</code>）查询数据。</p><ul><li><code>select ... where 主键字段 = 主键值;</code></li><li><code>select ... where 索引字段 is null;</code></li></ul><p>显示具体的字段名：表示目前会基于该字段查询数据。</p><p><code>func</code>：如果显示这个，则代表当与索引字段匹配的值是一个函数，如：</p><ul><li><code>select ... where 索引字段 = 函数(值);</code></li></ul><h3 id="rows字段" tabindex="-1"><a class="header-anchor" href="#rows字段" aria-hidden="true">#</a> rows字段</h3><p>预计会扫描的行数，该值越小越好</p><div class="custom-container tip"><p class="custom-container-title">TIP</p><p>对于<code>InnoDB</code>表来说，其实有时并不够准确</p></div><h3 id="filtered字段" tabindex="-1"><a class="header-anchor" href="#filtered字段" aria-hidden="true">#</a> filtered字段</h3><p>该值越小则表示执行时会扫描的数据量越大，取值范围是<code>0.00~100.00</code></p><h3 id="extra字段" tabindex="-1"><a class="header-anchor" href="#extra字段" aria-hidden="true">#</a> extra字段</h3><p>包含<code>MySQL</code>执行查询语句时的一些其他信息，这个信息对索引调优而言比较重要</p><p><code>Using index</code>：表示目前的查询语句，使用了索引覆盖机制拿到了数据。</p><p><code>Using where</code>：表示目前的查询语句无法从索引中获取数据，需要进一步做回表去拿表数据。</p><p><code>Using temporary</code>：表示<code>MySQL</code>在执行查询时，会创建一张临时表来处理数据。</p><p><code>Using filesort</code>：表示会以磁盘+内存完成排序工作，而完全加载数据到内存来完成排序。</p><p><code>Select tables optimized away</code>：表示查询过程中，对于索引字段使用了聚合函数。</p><p><code>Using where;Using index</code>：表示要返回的数据在索引中包含，但并不是索引的前导列，需要做回表获取数据。</p><p><code>NULL</code>：表示查询的数据未被索引覆盖，但<code>where</code>条件中用到了主键，可以直接读取表数据。</p><p><code>Using index condition</code>：和<code>Using where</code>类似，要返回的列未完全被索引覆盖，需要回表。</p><p><code>Using join buffer (Block Nested Loop)</code>：连接查询时驱动表不能有效的通过索引加快访问速度时，会使用<code>join-buffer</code>来加快访问速度，在内存中完成<code>Loop</code>匹配。</p><p><code>Impossible WHERE</code>：<code>where</code>后的条件永远不可能成立时提示的信息，如<code>where 1!=1</code>。</p><p><code>Impossible WHERE noticed after reading const tables</code>：基于唯一索引查询不存在的值时出现的提示。</p><p><code>const row not found</code>：表中不存在数据时会返回的提示。</p><p><code>distinct</code>：去重查询时，找到某个值的第一个值时，会将查找该值的工作从去重操作中移除。</p><p><code>Start temporary, End temporary</code>：表示临时表用于<code>DuplicateWeedout</code>半连接策略，也就是用来进行<code>semi-join</code>去重。</p><p><code>Using MRR</code>：表示执行查询时，使用了<code>MRR</code>机制读取数据。</p><p><code>Using index for skip scan</code>：表示执行查询语句时，使用了索引跳跃扫描机制读取数据。</p><p><code>Using index for group-by</code>：表示执行分组或去重工作时，可以基于某个索引处理。</p><p><code>FirstMatch</code>：表示对子查询语句进行<code>Semi-join</code>优化策略。</p><p><code>No tables used</code>：查询语句中不存在<code>from</code>子句时提示的信息，如<code>desc table_name;</code>。</p><div class="custom-container tip"><p class="custom-container-title">性能排序</p><p><code>Using index → NULL → Using index condition → Using where → Using where;Using index → Using join buffer → Using filesort → Using MRR → Using index for skip scan → Using temporary → Strart temporary,End temporary → FirstMatch</code></p></div>',194);function F(A,O){const n=d("router-link"),c=d("ExternalLinkIcon");return r(),p("div",null,[Q,e("nav",T,[e("ul",null,[e("li",null,[a(n,{to:"#索引"},{default:o(()=>[s("索引")]),_:1})]),e("li",null,[a(n,{to:"#索引结构"},{default:o(()=>[s("索引结构")]),_:1}),e("ul",null,[e("li",null,[a(n,{to:"#二叉树"},{default:o(()=>[s("二叉树")]),_:1})]),e("li",null,[a(n,{to:"#红黑树"},{default:o(()=>[s("红黑树")]),_:1})]),e("li",null,[a(n,{to:"#b-tree"},{default:o(()=>[s("B-Tree")]),_:1})]),e("li",null,[a(n,{to:"#b-tree-1"},{default:o(()=>[s("B+Tree")]),_:1})]),e("li",null,[a(n,{to:"#hash索引"},{default:o(()=>[s("Hash索引")]),_:1})])])]),e("li",null,[a(n,{to:"#索引分类"},{default:o(()=>[s("索引分类")]),_:1})]),e("li",null,[a(n,{to:"#回表查询"},{default:o(()=>[s("回表查询")]),_:1})]),e("li",null,[a(n,{to:"#前缀索引"},{default:o(()=>[s("前缀索引")]),_:1})]),e("li",null,[a(n,{to:"#单列索引与联合索引"},{default:o(()=>[s("单列索引与联合索引")]),_:1})]),e("li",null,[a(n,{to:"#索引失效情况"},{default:o(()=>[s("索引失效情况")]),_:1}),e("ul",null,[e("li",null,[a(n,{to:"#最左前缀法则"},{default:o(()=>[s("最左前缀法则")]),_:1})]),e("li",null,[a(n,{to:"#范围查询"},{default:o(()=>[s("范围查询")]),_:1})]),e("li",null,[a(n,{to:"#索引列运算"},{default:o(()=>[s("索引列运算")]),_:1})]),e("li",null,[a(n,{to:"#字符串不加引号"},{default:o(()=>[s("字符串不加引号")]),_:1})]),e("li",null,[a(n,{to:"#头部模糊查询"},{default:o(()=>[s("头部模糊查询")]),_:1})]),e("li",null,[a(n,{to:"#or-连接条件"},{default:o(()=>[s("or 连接条件")]),_:1})]),e("li",null,[a(n,{to:"#空值判断"},{default:o(()=>[s("空值判断")]),_:1})]),e("li",null,[a(n,{to:"#数据分布影响"},{default:o(()=>[s("数据分布影响")]),_:1})])])]),e("li",null,[a(n,{to:"#索引设计原则"},{default:o(()=>[s("索引设计原则")]),_:1}),e("ul",null,[e("li",null,[a(n,{to:"#建立索引"},{default:o(()=>[s("建立索引")]),_:1})]),e("li",null,[a(n,{to:"#不适合建立索引"},{default:o(()=>[s("不适合建立索引")]),_:1})])])]),e("li",null,[a(n,{to:"#索引优化"},{default:o(()=>[s("索引优化")]),_:1}),e("ul",null,[e("li",null,[a(n,{to:"#id字段"},{default:o(()=>[s("id字段")]),_:1})]),e("li",null,[a(n,{to:"#select-type字段"},{default:o(()=>[s("select_type字段")]),_:1})]),e("li",null,[a(n,{to:"#table字段"},{default:o(()=>[s("table字段")]),_:1})]),e("li",null,[a(n,{to:"#partitions字段"},{default:o(()=>[s("partitions字段")]),_:1})]),e("li",null,[a(n,{to:"#type字段"},{default:o(()=>[s("type字段")]),_:1})]),e("li",null,[a(n,{to:"#possible-keys字段"},{default:o(()=>[s("possible_keys字段")]),_:1})]),e("li",null,[a(n,{to:"#key字段"},{default:o(()=>[s("key字段")]),_:1})]),e("li",null,[a(n,{to:"#key-len字段"},{default:o(()=>[s("key_len字段")]),_:1})]),e("li",null,[a(n,{to:"#ref字段"},{default:o(()=>[s("ref字段")]),_:1})]),e("li",null,[a(n,{to:"#rows字段"},{default:o(()=>[s("rows字段")]),_:1})]),e("li",null,[a(n,{to:"#filtered字段"},{default:o(()=>[s("filtered字段")]),_:1})]),e("li",null,[a(n,{to:"#extra字段"},{default:o(()=>[s("extra字段")]),_:1})])])])])]),M,e("p",null,[e("a",D,[s("https://www.cs.usfca.edu/~galles/visualization/BPlusTree.html"),a(c)])]),R])}const C=l(B,[["render",F],["__file","MySQLIndex.html.vue"]]);export{C as default};
