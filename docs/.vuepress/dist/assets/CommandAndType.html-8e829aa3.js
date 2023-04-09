import{_ as l,M as i,p as c,q as r,R as n,N as a,V as t,t as s,a1 as o}from"./framework-5866ffd3.js";const d="/FullStackNotes/assets/1674006029180-8c9426e1-c3c4-40cf-85bb-24921257e3db-b6a60a24.png",u="/FullStackNotes/assets/1674010736631-ba95d30a-749a-404d-a5c3-4c481727c32d-0a2b615b.png",m="/FullStackNotes/assets/1674013672669-28666604-01ae-4516-82fe-c72de78d02db-9c98a9e7.png",k="/FullStackNotes/assets/1674013696999-9eb18c3c-e2c3-42ae-ba27-95eeae282195-4d0c97b7.png",v="/FullStackNotes/assets/1674014195912-2fb9cf7f-df53-46bc-93b9-e7e95db10e80-f57b4428.png",b={},g=n("h1",{id:"目录",tabindex:"-1"},[n("a",{class:"header-anchor",href:"#目录","aria-hidden":"true"},"#"),s(" 目录")],-1),h={class:"table-of-contents"},f=o('<h2 id="redis常见命令-数据类型" tabindex="-1"><a class="header-anchor" href="#redis常见命令-数据类型" aria-hidden="true">#</a> Redis常见命令&amp;数据类型</h2><h3 id="redis数据结构" tabindex="-1"><a class="header-anchor" href="#redis数据结构" aria-hidden="true">#</a> Redis数据结构</h3><p>Redis是一个key-value的数据库，key一般是String类型，不过value的类型多种多样： <img src="'+d+'" alt="image.png"></p><h3 id="key的层级结构" tabindex="-1"><a class="header-anchor" href="#key的层级结构" aria-hidden="true">#</a> Key的层级结构</h3><p><code>Redis</code>的<code>key</code>允许有多个单词形成层级结构，多个单词之间用&#39;<code>:</code>&#39;隔开，格式如下： <img src="'+u+'" alt="image.png"></p><blockquote><p>这个格式并非固定，也可以根据自己的需求来删除或添加词条。</p></blockquote><h2 id="redis命令" tabindex="-1"><a class="header-anchor" href="#redis命令" aria-hidden="true">#</a> Redis命令</h2>',7),q={href:"https://redis.io/commands",target:"_blank",rel:"noopener noreferrer"},S=o(`<h3 id="redis通用命令" tabindex="-1"><a class="header-anchor" href="#redis通用命令" aria-hidden="true">#</a> Redis通用命令</h3><p>通用指令是部分数据类型的，都可以使用的指令，常见的有：</p><ul><li><strong>KEYS</strong>：查看符合模板的所有<code>key</code></li><li><strong>DEL</strong>：删除一个指定的<code>key</code></li><li><strong>EXISTS</strong>：判断<code>key</code>是否存在</li><li><strong>EXPIRE</strong>：给一个<code>key</code>设置有效期，有效期到期时该<code>key</code>会被自动删除</li><li><strong>TTL</strong>：查看一个<code>KEY</code>的剩余有效期</li></ul><p><strong>示例代码：</strong></p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token comment"># KEYS</span>
<span class="token number">127.0</span>.0.1:637<span class="token operator"><span class="token file-descriptor important">9</span>&gt;</span> keys *
<span class="token number">1</span><span class="token punctuation">)</span> <span class="token string">&quot;name&quot;</span>
<span class="token number">2</span><span class="token punctuation">)</span> <span class="token string">&quot;age&quot;</span>
<span class="token number">127.0</span>.0.1:637<span class="token operator"><span class="token file-descriptor important">9</span>&gt;</span>

<span class="token comment"># 查询以a开头的key</span>
<span class="token number">127.0</span>.0.1:637<span class="token operator"><span class="token file-descriptor important">9</span>&gt;</span> keys a*
<span class="token number">1</span><span class="token punctuation">)</span> <span class="token string">&quot;age&quot;</span>
<span class="token number">127.0</span>.0.1:637<span class="token operator"><span class="token file-descriptor important">9</span>&gt;</span>


<span class="token comment"># DEL</span>
<span class="token number">127.0</span>.0.1:637<span class="token operator"><span class="token file-descriptor important">9</span>&gt;</span> del name <span class="token comment">#删除单个</span>
<span class="token punctuation">(</span>integer<span class="token punctuation">)</span> <span class="token number">1</span>  <span class="token comment">#成功删除1个</span>

<span class="token number">127.0</span>.0.1:637<span class="token operator"><span class="token file-descriptor important">9</span>&gt;</span> keys *
<span class="token number">1</span><span class="token punctuation">)</span> <span class="token string">&quot;age&quot;</span>

<span class="token number">127.0</span>.0.1:637<span class="token operator"><span class="token file-descriptor important">9</span>&gt;</span> MSET k1 v1 k2 v2 k3 v3 <span class="token comment">#批量添加数据</span>
OK

<span class="token number">127.0</span>.0.1:637<span class="token operator"><span class="token file-descriptor important">9</span>&gt;</span> keys *
<span class="token number">1</span><span class="token punctuation">)</span> <span class="token string">&quot;k3&quot;</span>
<span class="token number">2</span><span class="token punctuation">)</span> <span class="token string">&quot;k2&quot;</span>
<span class="token number">3</span><span class="token punctuation">)</span> <span class="token string">&quot;k1&quot;</span>
<span class="token number">4</span><span class="token punctuation">)</span> <span class="token string">&quot;age&quot;</span>

<span class="token number">127.0</span>.0.1:637<span class="token operator"><span class="token file-descriptor important">9</span>&gt;</span> del k1 k2 k3 k4
<span class="token punctuation">(</span>integer<span class="token punctuation">)</span> <span class="token number">3</span>   <span class="token comment">#此处返回的是成功删除的key，由于redis中只有k1,k2,k3 所以只成功删除3个，最终返回</span>
<span class="token number">127.0</span>.0.1:637<span class="token operator"><span class="token file-descriptor important">9</span>&gt;</span>

<span class="token number">127.0</span>.0.1:637<span class="token operator"><span class="token file-descriptor important">9</span>&gt;</span> keys * <span class="token comment">#再查询全部的key</span>
<span class="token number">1</span><span class="token punctuation">)</span> <span class="token string">&quot;age&quot;</span>	<span class="token comment">#只剩下一个了</span>
<span class="token number">127.0</span>.0.1:637<span class="token operator"><span class="token file-descriptor important">9</span>&gt;</span>


<span class="token comment"># EXISTS</span>
<span class="token number">127.0</span>.0.1:637<span class="token operator"><span class="token file-descriptor important">9</span>&gt;</span> exists age
<span class="token punctuation">(</span>integer<span class="token punctuation">)</span> <span class="token number">1</span> <span class="token comment"># 存在</span>

<span class="token number">127.0</span>.0.1:637<span class="token operator"><span class="token file-descriptor important">9</span>&gt;</span> exists name
<span class="token punctuation">(</span>integer<span class="token punctuation">)</span> <span class="token number">0</span> <span class="token comment"># 不存在</span>


<span class="token comment"># EXPIRE</span>
<span class="token number">127.0</span>.0.1:637<span class="token operator"><span class="token file-descriptor important">9</span>&gt;</span> expire age <span class="token number">10</span>
<span class="token punctuation">(</span>integer<span class="token punctuation">)</span> <span class="token number">1</span>

<span class="token number">127.0</span>.0.1:637<span class="token operator"><span class="token file-descriptor important">9</span>&gt;</span> ttl age
<span class="token punctuation">(</span>integer<span class="token punctuation">)</span> <span class="token number">8</span>

<span class="token number">127.0</span>.0.1:637<span class="token operator"><span class="token file-descriptor important">9</span>&gt;</span> ttl age
<span class="token punctuation">(</span>integer<span class="token punctuation">)</span> <span class="token number">6</span>

<span class="token number">127.0</span>.0.1:637<span class="token operator"><span class="token file-descriptor important">9</span>&gt;</span> ttl age
<span class="token punctuation">(</span>integer<span class="token punctuation">)</span> <span class="token parameter variable">-2</span>

<span class="token number">127.0</span>.0.1:637<span class="token operator"><span class="token file-descriptor important">9</span>&gt;</span> ttl age
<span class="token punctuation">(</span>integer<span class="token punctuation">)</span> <span class="token parameter variable">-2</span>  <span class="token comment">#当这个key过期了，那么此时查询出来就是-2 </span>

<span class="token number">127.0</span>.0.1:637<span class="token operator"><span class="token file-descriptor important">9</span>&gt;</span> keys *
<span class="token punctuation">(</span>empty list or <span class="token builtin class-name">set</span><span class="token punctuation">)</span>

<span class="token number">127.0</span>.0.1:637<span class="token operator"><span class="token file-descriptor important">9</span>&gt;</span> <span class="token builtin class-name">set</span> age <span class="token number">10</span> <span class="token comment">#如果没有设置过期时间</span>
OK

<span class="token number">127.0</span>.0.1:637<span class="token operator"><span class="token file-descriptor important">9</span>&gt;</span> ttl age
<span class="token punctuation">(</span>integer<span class="token punctuation">)</span> <span class="token parameter variable">-1</span>  <span class="token comment"># ttl的返回值就是-1，表示永久存在</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="string类型命令" tabindex="-1"><a class="header-anchor" href="#string类型命令" aria-hidden="true">#</a> String类型命令</h3><p><code>String</code>类型，也就是字符串类型，是<code>Redis</code>中最简单的存储类型。 其<code>value</code>是字符串，不过根据字符串的格式不同，又可以分为3类：</p><ul><li><code>string</code>：普通字符串</li><li><code>int</code>：整数类型，可以做自增.自减操作</li><li><code>float</code>：浮点类型，可以做自增.自减操作</li></ul><p><img src="`+m+`" alt="image.png"></p><p><strong>String的常见命令有：</strong></p><ul><li><strong>SET</strong>：添加或者修改已经存在的一个<code>String</code>类型的键值对</li><li><strong>GET</strong>：根据<code>key</code>获取<code>String</code>类型的<code>value</code></li><li><strong>MSET</strong>：批量添加多个<code>String</code>类型的键值对</li><li><strong>MGET</strong>：根据多个<code>key</code>获取多个<code>String</code>类型的<code>value</code></li><li><strong>INCR</strong>：让一个整型的key自增1</li><li><strong>INCRBY:让一个整型的key自增并指定步长，例如：incrby num 2 让num值自增2</strong></li><li><strong>INCRBYFLOAT</strong>：让一个浮点类型的数字自增并指定步长</li><li><strong>SETNX</strong>：添加一个<code>String</code>类型的键值对，前提是这个<code>key</code>不存在，否则不执行</li><li><strong>SETEX</strong>：添加一个<code>String</code>类型的键值对，并且指定有效期</li></ul><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token comment"># SET 和 GET  不存在就是新增，存在就是修改</span>
<span class="token number">127.0</span>.0.1:637<span class="token operator"><span class="token file-descriptor important">9</span>&gt;</span> <span class="token builtin class-name">set</span> name Rose  //原来不存在
OK

<span class="token number">127.0</span>.0.1:637<span class="token operator"><span class="token file-descriptor important">9</span>&gt;</span> get name 
<span class="token string">&quot;Rose&quot;</span>

<span class="token number">127.0</span>.0.1:637<span class="token operator"><span class="token file-descriptor important">9</span>&gt;</span> <span class="token builtin class-name">set</span> name Jack //原来存在，就是修改
OK

<span class="token number">127.0</span>.0.1:637<span class="token operator"><span class="token file-descriptor important">9</span>&gt;</span> get name
<span class="token string">&quot;Jack&quot;</span>

<span class="token comment"># MSET 和 MGET</span>
<span class="token number">127.0</span>.0.1:637<span class="token operator"><span class="token file-descriptor important">9</span>&gt;</span> MSET k1 v1 k2 v2 k3 v3
OK

<span class="token number">127.0</span>.0.1:637<span class="token operator"><span class="token file-descriptor important">9</span>&gt;</span> MGET name age k1 k2 k3
<span class="token number">1</span><span class="token punctuation">)</span> <span class="token string">&quot;Jack&quot;</span> //之前存在的name
<span class="token number">2</span><span class="token punctuation">)</span> <span class="token string">&quot;10&quot;</span>   //之前存在的age
<span class="token number">3</span><span class="token punctuation">)</span> <span class="token string">&quot;v1&quot;</span>
<span class="token number">4</span><span class="token punctuation">)</span> <span class="token string">&quot;v2&quot;</span>
<span class="token number">5</span><span class="token punctuation">)</span> <span class="token string">&quot;v3&quot;</span>

<span class="token comment"># INCR 和 INCRBY 和 DECY</span>
<span class="token number">127.0</span>.0.1:637<span class="token operator"><span class="token file-descriptor important">9</span>&gt;</span> get age 
<span class="token string">&quot;10&quot;</span>

<span class="token number">127.0</span>.0.1:637<span class="token operator"><span class="token file-descriptor important">9</span>&gt;</span> incr age //增加1
<span class="token punctuation">(</span>integer<span class="token punctuation">)</span> <span class="token number">11</span>
    
<span class="token number">127.0</span>.0.1:637<span class="token operator"><span class="token file-descriptor important">9</span>&gt;</span> get age //获得age
<span class="token string">&quot;11&quot;</span>

<span class="token number">127.0</span>.0.1:637<span class="token operator"><span class="token file-descriptor important">9</span>&gt;</span> incrby age <span class="token number">2</span> //一次增加2
<span class="token punctuation">(</span>integer<span class="token punctuation">)</span> <span class="token number">13</span> //返回目前的age的值
    
<span class="token number">127.0</span>.0.1:637<span class="token operator"><span class="token file-descriptor important">9</span>&gt;</span> incrby age <span class="token number">2</span>
<span class="token punctuation">(</span>integer<span class="token punctuation">)</span> <span class="token number">15</span>
    
<span class="token number">127.0</span>.0.1:637<span class="token operator"><span class="token file-descriptor important">9</span>&gt;</span> incrby age <span class="token parameter variable">-1</span> //也可以增加负数，相当于减
<span class="token punctuation">(</span>integer<span class="token punctuation">)</span> <span class="token number">14</span>
    
<span class="token number">127.0</span>.0.1:637<span class="token operator"><span class="token file-descriptor important">9</span>&gt;</span> incrby age <span class="token parameter variable">-2</span> //一次减少2个
<span class="token punctuation">(</span>integer<span class="token punctuation">)</span> <span class="token number">12</span>
    
<span class="token number">127.0</span>.0.1:637<span class="token operator"><span class="token file-descriptor important">9</span>&gt;</span> DECR age //相当于 incr 负数，减少正常用法
<span class="token punctuation">(</span>integer<span class="token punctuation">)</span> <span class="token number">11</span>
    
<span class="token number">127.0</span>.0.1:637<span class="token operator"><span class="token file-descriptor important">9</span>&gt;</span> get age 
<span class="token string">&quot;11&quot;</span>

<span class="token comment"># SETNX</span>
<span class="token number">127.0</span>.0.1:637<span class="token operator"><span class="token file-descriptor important">9</span>&gt;</span> <span class="token builtin class-name">set</span> name Jack  //设置名称
OK

<span class="token number">127.0</span>.0.1:637<span class="token operator"><span class="token file-descriptor important">9</span>&gt;</span> setnx name lisi //如果key不存在，则添加成功
<span class="token punctuation">(</span>integer<span class="token punctuation">)</span> <span class="token number">0</span>

<span class="token number">127.0</span>.0.1:637<span class="token operator"><span class="token file-descriptor important">9</span>&gt;</span> get name //由于name已经存在，所以lisi的操作失败
<span class="token string">&quot;Jack&quot;</span>

<span class="token number">127.0</span>.0.1:637<span class="token operator"><span class="token file-descriptor important">9</span>&gt;</span> setnx name2 lisi //name2 不存在，所以操作成功
<span class="token punctuation">(</span>integer<span class="token punctuation">)</span> <span class="token number">1</span>

<span class="token number">127.0</span>.0.1:637<span class="token operator"><span class="token file-descriptor important">9</span>&gt;</span> get name2 
<span class="token string">&quot;lisi&quot;</span>

<span class="token comment"># SETEX</span>
<span class="token number">127.0</span>.0.1:637<span class="token operator"><span class="token file-descriptor important">9</span>&gt;</span> setex name <span class="token number">10</span> jack
OK

<span class="token number">127.0</span>.0.1:637<span class="token operator"><span class="token file-descriptor important">9</span>&gt;</span> ttl name
<span class="token punctuation">(</span>integer<span class="token punctuation">)</span> <span class="token number">8</span>

<span class="token number">127.0</span>.0.1:637<span class="token operator"><span class="token file-descriptor important">9</span>&gt;</span> ttl name
<span class="token punctuation">(</span>integer<span class="token punctuation">)</span> <span class="token number">7</span>

<span class="token number">127.0</span>.0.1:637<span class="token operator"><span class="token file-descriptor important">9</span>&gt;</span> ttl name
<span class="token punctuation">(</span>integer<span class="token punctuation">)</span> <span class="token number">5</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="hash类型命令" tabindex="-1"><a class="header-anchor" href="#hash类型命令" aria-hidden="true">#</a> Hash类型命令</h3><p><code>Hash</code>类型，也叫散列，其<code>value</code>是一个无序字典，类似于<code>Java</code>中的<code>HashMap</code>结构。 <code>String</code>结构是将对象序列化为<code>JSON</code>字符串后存储，当需要修改对象某个字段时很不方便 <code>Hash</code>结构可以将对象中的每个字段独立存储，可以针对单个字段做<code>CRUD</code><img src="`+k+`" alt="image.png"></p><p><strong>Hash类型的常见命令</strong></p><ul><li><strong>HSET key field value</strong>：添加或者修改<code>hash</code>类型<code>key</code>的<code>field</code>的值</li><li><strong>HGET key field</strong>：获取一个<code>hash</code>类型<code>key</code>的<code>field</code>的值</li><li><strong>HMSET</strong>：批量添加多个<code>hash</code>类型<code>key</code>的<code>field</code>的值</li><li><strong>HMGET</strong>：批量获取多个<code>hash</code>类型<code>key</code>的<code>field</code>的值</li><li><strong>HGETALL</strong>：获取一个<code>hash</code>类型的<code>key</code>中的所有的<code>field</code>和<code>value</code></li><li><strong>HKEYS：</strong> 获取一个<code>hash</code>类型的<code>key</code>中的所有的<code>field</code></li><li><strong>HVALS</strong>：获取一个<code>hash</code>类型的<code>key</code>中的所有的<code>value</code></li><li><strong>HINCRBY</strong>:让一个<code>hash</code>类型<code>key</code>的字段值自增并指定步长</li><li><strong>HSETNX</strong>：添加一个<code>hash</code>类型的<code>key</code>的field值，前提是这个<code>field</code>不存在，否则不执行</li></ul><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token comment"># HSET 和 HGET</span>
<span class="token number">127.0</span>.0.1:637<span class="token operator"><span class="token file-descriptor important">9</span>&gt;</span> HSET heima:user:3 name Lucy//大key是 heima:user:3 小key是name，小value是Lucy
<span class="token punctuation">(</span>integer<span class="token punctuation">)</span> <span class="token number">1</span>

<span class="token number">127.0</span>.0.1:637<span class="token operator"><span class="token file-descriptor important">9</span>&gt;</span> HSET heima:user:3 age <span class="token number">21</span>// 如果操作不存在的数据，则是新增
<span class="token punctuation">(</span>integer<span class="token punctuation">)</span> <span class="token number">1</span>

<span class="token number">127.0</span>.0.1:637<span class="token operator"><span class="token file-descriptor important">9</span>&gt;</span> HSET heima:user:3 age <span class="token number">17</span> //如果操作存在的数据，则是修改
<span class="token punctuation">(</span>integer<span class="token punctuation">)</span> <span class="token number">0</span>

<span class="token number">127.0</span>.0.1:637<span class="token operator"><span class="token file-descriptor important">9</span>&gt;</span> HGET heima:user:3 name 
<span class="token string">&quot;Lucy&quot;</span>

<span class="token number">127.0</span>.0.1:637<span class="token operator"><span class="token file-descriptor important">9</span>&gt;</span> HGET heima:user:3 age
<span class="token string">&quot;17&quot;</span>

<span class="token comment"># HMSET 和 HMGET</span>
<span class="token number">127.0</span>.0.1:637<span class="token operator"><span class="token file-descriptor important">9</span>&gt;</span> HMSET heima:user:4 name HanMeiMei
OK

<span class="token number">127.0</span>.0.1:637<span class="token operator"><span class="token file-descriptor important">9</span>&gt;</span> HMSET heima:user:4 name LiLei age <span class="token number">20</span> sex <span class="token function">man</span>
OK

<span class="token number">127.0</span>.0.1:637<span class="token operator"><span class="token file-descriptor important">9</span>&gt;</span> HMGET heima:user:4 name age sex
<span class="token number">1</span><span class="token punctuation">)</span> <span class="token string">&quot;LiLei&quot;</span>
<span class="token number">2</span><span class="token punctuation">)</span> <span class="token string">&quot;20&quot;</span>
<span class="token number">3</span><span class="token punctuation">)</span> <span class="token string">&quot;man&quot;</span>

<span class="token comment"># HGETALL</span>
<span class="token number">127.0</span>.0.1:637<span class="token operator"><span class="token file-descriptor important">9</span>&gt;</span> HGETALL heima:user:4
<span class="token number">1</span><span class="token punctuation">)</span> <span class="token string">&quot;name&quot;</span>
<span class="token number">2</span><span class="token punctuation">)</span> <span class="token string">&quot;LiLei&quot;</span>
<span class="token number">3</span><span class="token punctuation">)</span> <span class="token string">&quot;age&quot;</span>
<span class="token number">4</span><span class="token punctuation">)</span> <span class="token string">&quot;20&quot;</span>
<span class="token number">5</span><span class="token punctuation">)</span> <span class="token string">&quot;sex&quot;</span>
<span class="token number">6</span><span class="token punctuation">)</span> <span class="token string">&quot;man&quot;</span>

<span class="token comment"># HKEYS 和 HVALS</span>
<span class="token number">127.0</span>.0.1:637<span class="token operator"><span class="token file-descriptor important">9</span>&gt;</span> HKEYS heima:user:4
<span class="token number">1</span><span class="token punctuation">)</span> <span class="token string">&quot;name&quot;</span>
<span class="token number">2</span><span class="token punctuation">)</span> <span class="token string">&quot;age&quot;</span>
<span class="token number">3</span><span class="token punctuation">)</span> <span class="token string">&quot;sex&quot;</span>

<span class="token number">127.0</span>.0.1:637<span class="token operator"><span class="token file-descriptor important">9</span>&gt;</span> HVALS heima:user:4
<span class="token number">1</span><span class="token punctuation">)</span> <span class="token string">&quot;LiLei&quot;</span>
<span class="token number">2</span><span class="token punctuation">)</span> <span class="token string">&quot;20&quot;</span>
<span class="token number">3</span><span class="token punctuation">)</span> <span class="token string">&quot;man&quot;</span>

<span class="token comment"># HINCRBY</span>
<span class="token number">127.0</span>.0.1:637<span class="token operator"><span class="token file-descriptor important">9</span>&gt;</span> HINCRBY  heima:user:4 age <span class="token number">2</span>
<span class="token punctuation">(</span>integer<span class="token punctuation">)</span> <span class="token number">22</span>

<span class="token number">127.0</span>.0.1:637<span class="token operator"><span class="token file-descriptor important">9</span>&gt;</span> HVALS heima:user:4
<span class="token number">1</span><span class="token punctuation">)</span> <span class="token string">&quot;LiLei&quot;</span>
<span class="token number">2</span><span class="token punctuation">)</span> <span class="token string">&quot;22&quot;</span>
<span class="token number">3</span><span class="token punctuation">)</span> <span class="token string">&quot;man&quot;</span>

<span class="token number">127.0</span>.0.1:637<span class="token operator"><span class="token file-descriptor important">9</span>&gt;</span> HINCRBY  heima:user:4 age <span class="token parameter variable">-2</span>
<span class="token punctuation">(</span>integer<span class="token punctuation">)</span> <span class="token number">20</span>

<span class="token comment"># HSETNX</span>
<span class="token number">127.0</span>.0.1:637<span class="token operator"><span class="token file-descriptor important">9</span>&gt;</span> HSETNX heima:user4 sex woman
<span class="token punctuation">(</span>integer<span class="token punctuation">)</span> <span class="token number">1</span>

<span class="token number">127.0</span>.0.1:637<span class="token operator"><span class="token file-descriptor important">9</span>&gt;</span> HGETALL heima:user:3
<span class="token number">1</span><span class="token punctuation">)</span> <span class="token string">&quot;name&quot;</span>
<span class="token number">2</span><span class="token punctuation">)</span> <span class="token string">&quot;Lucy&quot;</span>
<span class="token number">3</span><span class="token punctuation">)</span> <span class="token string">&quot;age&quot;</span>
<span class="token number">4</span><span class="token punctuation">)</span> <span class="token string">&quot;17&quot;</span>

<span class="token number">127.0</span>.0.1:637<span class="token operator"><span class="token file-descriptor important">9</span>&gt;</span> HSETNX heima:user:3 sex woman
<span class="token punctuation">(</span>integer<span class="token punctuation">)</span> <span class="token number">1</span>

<span class="token number">127.0</span>.0.1:637<span class="token operator"><span class="token file-descriptor important">9</span>&gt;</span> HGETALL heima:user:3
<span class="token number">1</span><span class="token punctuation">)</span> <span class="token string">&quot;name&quot;</span>
<span class="token number">2</span><span class="token punctuation">)</span> <span class="token string">&quot;Lucy&quot;</span>
<span class="token number">3</span><span class="token punctuation">)</span> <span class="token string">&quot;age&quot;</span>
<span class="token number">4</span><span class="token punctuation">)</span> <span class="token string">&quot;17&quot;</span>
<span class="token number">5</span><span class="token punctuation">)</span> <span class="token string">&quot;sex&quot;</span>
<span class="token number">6</span><span class="token punctuation">)</span> <span class="token string">&quot;woman&quot;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="list类型命令" tabindex="-1"><a class="header-anchor" href="#list类型命令" aria-hidden="true">#</a> List类型命令</h3><p><code>Redis</code>中的<code>List</code>类型与<code>Java</code>中的<code>LinkedList</code>类似，可以看做是一个双向链表结构。既可以支持正向检索和也可以支持反向检索。 特征也与<code>LinkedList</code>类似：</p><ul><li>有序</li><li>元素可以重复</li><li>插入和删除快</li><li>查询速度一般</li></ul><p>常用来存储一个有序数据，例如：朋友圈点赞列表，评论列表等。</p><p><strong>List的常见命令有：</strong></p><ul><li><strong>LPUSH key element ...</strong>：向列表左侧插入一个或多个元素</li><li><strong>LPOP key</strong>：移除并返回列表左侧的第一个元素，没有则返回<code>nil</code></li><li><strong>RPUSH key element ...</strong>：向列表右侧插入一个或多个元素</li><li><strong>RPOP key</strong>：移除并返回列表右侧的第一个元素</li><li><strong>LRANGE key star end</strong>：返回一段角标范围内的所有元素</li><li><strong>BLPOP和BRPOP</strong>：与<code>LPOP</code>和<code>RPOP</code>类似，只不过在没有元素时等待指定时间，而不是直接返回nil</li></ul><p><img src="`+v+`" alt="image.png"></p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token comment"># LPUSH 和 RPUSH</span>
<span class="token number">127.0</span>.0.1:637<span class="token operator"><span class="token file-descriptor important">9</span>&gt;</span> LPUSH <span class="token function">users</span> <span class="token number">1</span> <span class="token number">2</span> <span class="token number">3</span>
<span class="token punctuation">(</span>integer<span class="token punctuation">)</span> <span class="token number">3</span>

<span class="token number">127.0</span>.0.1:637<span class="token operator"><span class="token file-descriptor important">9</span>&gt;</span> RPUSH <span class="token function">users</span> <span class="token number">4</span> <span class="token number">5</span> <span class="token number">6</span>
<span class="token punctuation">(</span>integer<span class="token punctuation">)</span> <span class="token number">6</span>

<span class="token comment"># LPOP 和 RPOP</span>
<span class="token number">127.0</span>.0.1:637<span class="token operator"><span class="token file-descriptor important">9</span>&gt;</span> LPOP <span class="token function">users</span>
<span class="token string">&quot;3&quot;</span>

<span class="token number">127.0</span>.0.1:637<span class="token operator"><span class="token file-descriptor important">9</span>&gt;</span> RPOP <span class="token function">users</span>
<span class="token string">&quot;6&quot;</span>

<span class="token comment"># LRANGE</span>
<span class="token number">127.0</span>.0.1:637<span class="token operator"><span class="token file-descriptor important">9</span>&gt;</span> LRANGE <span class="token function">users</span> <span class="token number">1</span> <span class="token number">2</span>
<span class="token number">1</span><span class="token punctuation">)</span> <span class="token string">&quot;1&quot;</span>
<span class="token number">2</span><span class="token punctuation">)</span> <span class="token string">&quot;4&quot;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="set类型命令" tabindex="-1"><a class="header-anchor" href="#set类型命令" aria-hidden="true">#</a> Set类型命令</h3><p><code>Redis</code>的<code>Set</code>结构与<code>Java</code>中的<code>HashSet</code>类似，可以看做是一个<code>value</code>为<code>null</code>的<code>HashMap</code>。</p><p>因为也是一个<code>hash</code>表，因此具备与<code>HashSet</code>类似的特征：</p><ul><li>无序</li><li>元素不可重复</li><li>查找快</li><li>支持交集.并集.差集等功能</li></ul><p><strong>Set类型的常见命令</strong></p><ul><li><strong>SADD key member ...</strong>：向<code>set</code>中添加一个或多个元素</li><li><strong>SREM key member ...</strong>: 移除<code>set</code>中的指定元素</li><li><strong>SCARD key</strong>： 返回<code>set</code>中元素的个数</li><li><strong>SISMEMBER key member</strong>：判断一个元素是否存在于<code>set</code>中</li><li><strong>SMEMBERS</strong>：获取<code>set</code>中的所有元素</li><li><strong>SINTER key1 key2 ...</strong>：求<code>key1</code>与<code>key2</code>的交集</li><li><strong>SDIFF key1 key2 ...</strong>：求<code>key1</code>与<code>key2</code>的差集</li><li><strong>SUNION key1 key2 ..</strong>：求<code>key1</code>和<code>key2</code>的并集</li></ul><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token number">127.0</span>.0.1:637<span class="token operator"><span class="token file-descriptor important">9</span>&gt;</span> sadd s1 a b c
<span class="token punctuation">(</span>integer<span class="token punctuation">)</span> <span class="token number">3</span>

<span class="token number">127.0</span>.0.1:637<span class="token operator"><span class="token file-descriptor important">9</span>&gt;</span> smembers s1
<span class="token number">1</span><span class="token punctuation">)</span> <span class="token string">&quot;c&quot;</span>
<span class="token number">2</span><span class="token punctuation">)</span> <span class="token string">&quot;b&quot;</span>
<span class="token number">3</span><span class="token punctuation">)</span> <span class="token string">&quot;a&quot;</span>

<span class="token number">127.0</span>.0.1:637<span class="token operator"><span class="token file-descriptor important">9</span>&gt;</span> srem s1 a
<span class="token punctuation">(</span>integer<span class="token punctuation">)</span> <span class="token number">1</span>
    
<span class="token number">127.0</span>.0.1:637<span class="token operator"><span class="token file-descriptor important">9</span>&gt;</span> SISMEMBER s1 a
<span class="token punctuation">(</span>integer<span class="token punctuation">)</span> <span class="token number">0</span>
    
<span class="token number">127.0</span>.0.1:637<span class="token operator"><span class="token file-descriptor important">9</span>&gt;</span> SISMEMBER s1 b
<span class="token punctuation">(</span>integer<span class="token punctuation">)</span> <span class="token number">1</span>
    
<span class="token number">127.0</span>.0.1:637<span class="token operator"><span class="token file-descriptor important">9</span>&gt;</span> SCARD s1
<span class="token punctuation">(</span>integer<span class="token punctuation">)</span> <span class="token number">2</span>

* 将下列数据用Redis的Set集合来存储：
* 张三的好友有：李四.王五.赵六
* 李四的好友有：王五.麻子.二狗
* 利用Set的命令实现下列功能：
* 计算张三的好友有几人
* 计算张三和李四有哪些共同好友
* 查询哪些人是张三的好友却不是李四的好友
* 查询张三和李四的好友总共有哪些人
* 判断李四是否是张三的好友
* 判断张三是否是李四的好友
* 将李四从张三的好友列表中移除
<span class="token number">127.0</span>.0.1:637<span class="token operator"><span class="token file-descriptor important">9</span>&gt;</span> SADD zs lisi wangwu zhaoliu
<span class="token punctuation">(</span>integer<span class="token punctuation">)</span> <span class="token number">3</span>
    
<span class="token number">127.0</span>.0.1:637<span class="token operator"><span class="token file-descriptor important">9</span>&gt;</span> SADD <span class="token function">ls</span> wangwu mazi ergou
<span class="token punctuation">(</span>integer<span class="token punctuation">)</span> <span class="token number">3</span>
    
<span class="token number">127.0</span>.0.1:637<span class="token operator"><span class="token file-descriptor important">9</span>&gt;</span> SCARD zs
<span class="token punctuation">(</span>integer<span class="token punctuation">)</span> <span class="token number">3</span>
    
<span class="token number">127.0</span>.0.1:637<span class="token operator"><span class="token file-descriptor important">9</span>&gt;</span> SINTER zs <span class="token function">ls</span>
<span class="token number">1</span><span class="token punctuation">)</span> <span class="token string">&quot;wangwu&quot;</span>
    
<span class="token number">127.0</span>.0.1:637<span class="token operator"><span class="token file-descriptor important">9</span>&gt;</span> SDIFF zs <span class="token function">ls</span>
<span class="token number">1</span><span class="token punctuation">)</span> <span class="token string">&quot;zhaoliu&quot;</span>
<span class="token number">2</span><span class="token punctuation">)</span> <span class="token string">&quot;lisi&quot;</span>
    
<span class="token number">127.0</span>.0.1:637<span class="token operator"><span class="token file-descriptor important">9</span>&gt;</span> SUNION zs <span class="token function">ls</span>
<span class="token number">1</span><span class="token punctuation">)</span> <span class="token string">&quot;wangwu&quot;</span>
<span class="token number">2</span><span class="token punctuation">)</span> <span class="token string">&quot;zhaoliu&quot;</span>
<span class="token number">3</span><span class="token punctuation">)</span> <span class="token string">&quot;lisi&quot;</span>
<span class="token number">4</span><span class="token punctuation">)</span> <span class="token string">&quot;mazi&quot;</span>
<span class="token number">5</span><span class="token punctuation">)</span> <span class="token string">&quot;ergou&quot;</span>
    
<span class="token number">127.0</span>.0.1:637<span class="token operator"><span class="token file-descriptor important">9</span>&gt;</span> SISMEMBER zs lisi
<span class="token punctuation">(</span>integer<span class="token punctuation">)</span> <span class="token number">1</span>
    
<span class="token number">127.0</span>.0.1:637<span class="token operator"><span class="token file-descriptor important">9</span>&gt;</span> SISMEMBER <span class="token function">ls</span> zhangsan
<span class="token punctuation">(</span>integer<span class="token punctuation">)</span> <span class="token number">0</span>
    
<span class="token number">127.0</span>.0.1:637<span class="token operator"><span class="token file-descriptor important">9</span>&gt;</span> SREM zs lisi
<span class="token punctuation">(</span>integer<span class="token punctuation">)</span> <span class="token number">1</span>
    
<span class="token number">127.0</span>.0.1:637<span class="token operator"><span class="token file-descriptor important">9</span>&gt;</span> SMEMBERS zs
<span class="token number">1</span><span class="token punctuation">)</span> <span class="token string">&quot;zhaoliu&quot;</span>
<span class="token number">2</span><span class="token punctuation">)</span> <span class="token string">&quot;wangwu&quot;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="sortedset类型命令" tabindex="-1"><a class="header-anchor" href="#sortedset类型命令" aria-hidden="true">#</a> SortedSet类型命令</h3><p><code>Redis</code>的<code>SortedSet</code>是一个可排序的<code>set</code>集合，与<code>Java</code>中的<code>TreeSet</code>有些类似，但底层数据结构却差别很大。<code>SortedSet</code>中的每一个元素都带有一个<code>score</code>属性，可以基于<code>score</code>属性对元素排序，底层的实现是一个跳表（SkipList）加 <code>hash</code>表。 <code>SortedSet</code>具备下列特性：</p><ul><li>可排序</li><li>元素不重复</li><li>查询速度快</li></ul><p>因为<code>SortedSet</code>的可排序特性，经常被用来实现排行榜这样的功能。</p><p><strong>SortedSet的常见命令有：</strong></p><ul><li><strong>ZADD key score member</strong>：添加一个或多个元素到<code>sorted set</code> ，如果已经存在则更新其<code>score</code>值</li><li><strong>ZREM key member</strong>：删除<code>sorted set</code>中的一个指定元素</li><li><strong>ZSCORE key member</strong> : 获取<code>sorted set</code>中的指定元素的<code>score</code>值</li><li><strong>ZRANK key member</strong>：获取<code>sorted set</code> 中的指定元素的排名</li><li><strong>ZCARD key</strong>：获取<code>sorted set</code>中的元素个数</li><li><strong>ZCOUNT key min max</strong>：统计<code>score</code>值在给定范围内的所有元素的个数</li><li><strong>ZINCRBY key increment member</strong>：让<code>sorted set</code>中的指定元素自增，步长为指定的<code>increment</code>值</li><li><strong>ZRANGE key min max</strong>：按照<code>score</code>排序后，获取指定排名范围内的元素</li><li><strong>ZRANGEBYSCORE key min max</strong>：按照<code>score</code>排序后，获取指定<code>score</code>范围内的元素</li><li><strong>ZDIFF.ZINTER.ZUNION</strong>：求差集.交集.并集</li></ul><p>注意：所有的排名默认都是升序，如果要降序则在命令的<code>Z</code>后面添加<code>REV</code>即可，例如：</p><ul><li><strong>升序</strong>获取<code>sorted set</code> 中的指定元素的排名：<code>ZRANK key member</code></li><li><strong>降序</strong>获取<code>sorted set</code> 中的指定元素的排名：<code>ZREVRANK key memeber</code></li></ul>`,40);function E(y,R){const e=i("router-link"),p=i("ExternalLinkIcon");return c(),r("div",null,[g,n("nav",h,[n("ul",null,[n("li",null,[a(e,{to:"#redis常见命令-数据类型"},{default:t(()=>[s("Redis常见命令&数据类型")]),_:1}),n("ul",null,[n("li",null,[a(e,{to:"#redis数据结构"},{default:t(()=>[s("Redis数据结构")]),_:1})]),n("li",null,[a(e,{to:"#key的层级结构"},{default:t(()=>[s("Key的层级结构")]),_:1})])])]),n("li",null,[a(e,{to:"#redis命令"},{default:t(()=>[s("Redis命令")]),_:1}),n("ul",null,[n("li",null,[a(e,{to:"#redis通用命令"},{default:t(()=>[s("Redis通用命令")]),_:1})]),n("li",null,[a(e,{to:"#string类型命令"},{default:t(()=>[s("String类型命令")]),_:1})]),n("li",null,[a(e,{to:"#hash类型命令"},{default:t(()=>[s("Hash类型命令")]),_:1})]),n("li",null,[a(e,{to:"#list类型命令"},{default:t(()=>[s("List类型命令")]),_:1})]),n("li",null,[a(e,{to:"#set类型命令"},{default:t(()=>[s("Set类型命令")]),_:1})]),n("li",null,[a(e,{to:"#sortedset类型命令"},{default:t(()=>[s("SortedSet类型命令")]),_:1})])])])])]),f,n("p",null,[s("在官网（ "),n("a",q,[s("https://redis.io/commands"),a(p)]),s(" ）可以查看到不同的命令")]),S])}const T=l(b,[["render",E],["__file","CommandAndType.html.vue"]]);export{T as default};
