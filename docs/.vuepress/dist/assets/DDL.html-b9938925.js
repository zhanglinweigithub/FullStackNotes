import{_ as t,M as o,p as c,q as l,R as n,N as e,V as p,t as s,a1 as i}from"./framework-5866ffd3.js";const d={},k=n("h1",{id:"目录",tabindex:"-1"},[n("a",{class:"header-anchor",href:"#目录","aria-hidden":"true"},"#"),s(" 目录")],-1),u={class:"table-of-contents"},r=i(`<h1 id="ddl-data-definition-language" tabindex="-1"><a class="header-anchor" href="#ddl-data-definition-language" aria-hidden="true">#</a> DDL(Data Definition Language)</h1><p>数据定义语言，用来定义数据库对象(数据库，表，字段) 。</p><p>用于创建或修改数据库、表、表结构</p><h2 id="数据库操作" tabindex="-1"><a class="header-anchor" href="#数据库操作" aria-hidden="true">#</a> 数据库操作</h2><div class="language-sql line-numbers-mode" data-ext="sql"><pre class="language-sql"><code><span class="token comment">-- 查询所有数据库</span>
<span class="token keyword">show</span> <span class="token keyword">databases</span><span class="token punctuation">;</span>

<span class="token comment">-- 查询当前数据库</span>
<span class="token keyword">select</span> <span class="token keyword">database</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token comment">-- 创建数据库 方式一</span>
<span class="token keyword">create</span> <span class="token keyword">database</span> <span class="token punctuation">[</span> <span class="token keyword">if</span> <span class="token operator">not</span> <span class="token keyword">exists</span> <span class="token punctuation">]</span> 数据库名 <span class="token punctuation">[</span> <span class="token keyword">default</span> <span class="token keyword">charset</span> 字符集 <span class="token punctuation">]</span> <span class="token punctuation">[</span> <span class="token keyword">collate</span> 排序规则 <span class="token punctuation">]</span><span class="token punctuation">;</span>

<span class="token keyword">create</span> <span class="token keyword">database</span> ilovemysql<span class="token punctuation">;</span>

<span class="token keyword">create</span> <span class="token keyword">database</span> <span class="token keyword">if</span> <span class="token operator">not</span> <span class="token keyword">exists</span> ilovemysql<span class="token punctuation">;</span> <span class="token comment">-- ilovemysql不存在就创建，存在不创建</span>

<span class="token keyword">create</span> <span class="token keyword">database</span> ilikemysql <span class="token keyword">default</span> <span class="token keyword">charset</span> utf8mb4<span class="token punctuation">;</span> <span class="token comment">-- 指定字符集</span>

<span class="token comment">-- 创建数据库 方式二</span>
<span class="token keyword">create</span> <span class="token keyword">schema</span> 数据库名<span class="token punctuation">;</span>

<span class="token keyword">create</span> <span class="token keyword">schema</span> db01<span class="token punctuation">;</span>


<span class="token comment">-- 删除数据库</span>
<span class="token keyword">drop</span> <span class="token keyword">database</span> <span class="token punctuation">[</span> <span class="token keyword">if</span> <span class="token keyword">exists</span> <span class="token punctuation">]</span> 数据库名<span class="token punctuation">;</span>

<span class="token keyword">drop</span> <span class="token keyword">database</span> ilovemysql<span class="token punctuation">;</span>

<span class="token keyword">drop</span> <span class="token keyword">database</span> <span class="token keyword">if</span> <span class="token keyword">exists</span> ilovemysql<span class="token punctuation">;</span> <span class="token comment">-- 若存在 itcast 数据库，就删除</span>

<span class="token comment">-- 切换数据库</span>
<span class="token keyword">use</span> 数据库名<span class="token punctuation">;</span>

<span class="token keyword">use</span> ilikemysql<span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="表操作" tabindex="-1"><a class="header-anchor" href="#表操作" aria-hidden="true">#</a> 表操作</h2><div class="language-sql line-numbers-mode" data-ext="sql"><pre class="language-sql"><code><span class="token comment">-- 查询当前数据库所有表</span>
<span class="token keyword">show</span> <span class="token keyword">tables</span><span class="token punctuation">;</span>

<span class="token comment">-- 查看指定表结构</span>
<span class="token comment">-- 通过这条指令，我们可以查看到指定表的字段，字段的类型、是否可以为NULL，是否存在默认值等信息</span>
<span class="token keyword">desc</span> 表名<span class="token punctuation">;</span>

<span class="token comment">--  查询指定表的建表语句</span>
<span class="token keyword">show</span> <span class="token keyword">create</span> <span class="token keyword">table</span> 表名<span class="token punctuation">;</span>

<span class="token comment">-- 创建表结构</span>
<span class="token keyword">CREATE</span> <span class="token keyword">TABLE</span> 表名<span class="token punctuation">(</span>
	字段<span class="token number">1</span> 字段<span class="token number">1</span>类型 <span class="token punctuation">[</span> <span class="token keyword">COMMENT</span> 字段<span class="token number">1</span>注释 <span class="token punctuation">]</span><span class="token punctuation">,</span>
	字段<span class="token number">2</span> 字段<span class="token number">2</span>类型 <span class="token punctuation">[</span><span class="token keyword">COMMENT</span> 字段<span class="token number">2</span>注释 <span class="token punctuation">]</span><span class="token punctuation">,</span>
	字段<span class="token number">3</span> 字段<span class="token number">3</span>类型 <span class="token punctuation">[</span><span class="token keyword">COMMENT</span> 字段<span class="token number">3</span>注释 <span class="token punctuation">]</span><span class="token punctuation">,</span>
	<span class="token punctuation">.</span><span class="token punctuation">.</span><span class="token punctuation">.</span><span class="token punctuation">.</span><span class="token punctuation">.</span><span class="token punctuation">.</span>
	字段n 字段n类型 <span class="token punctuation">[</span><span class="token keyword">COMMENT</span> 字段n注释 <span class="token punctuation">]</span>
<span class="token punctuation">)</span> <span class="token punctuation">[</span> <span class="token keyword">COMMENT</span> 表注释 <span class="token punctuation">]</span><span class="token punctuation">;</span>

<span class="token comment">--  添加字段</span>
<span class="token keyword">ALTER</span> <span class="token keyword">TABLE</span> 表面 <span class="token keyword">ADD</span> 字段名 类型<span class="token punctuation">(</span>长度<span class="token punctuation">)</span> <span class="token punctuation">[</span> <span class="token keyword">COMMENT</span> 注释 <span class="token punctuation">]</span> <span class="token punctuation">[</span> 约束 <span class="token punctuation">]</span><span class="token punctuation">;</span>

<span class="token keyword">ALTER</span> <span class="token keyword">TABLE</span> emp <span class="token keyword">ADD</span> nickname <span class="token keyword">varchar</span><span class="token punctuation">(</span><span class="token number">20</span><span class="token punctuation">)</span> <span class="token keyword">COMMENT</span> <span class="token string">&#39;昵称&#39;</span><span class="token punctuation">;</span>

<span class="token comment">-- 修改数据类型</span>
<span class="token keyword">ALTER</span> <span class="token keyword">TABLE</span> 表名 <span class="token keyword">MODIFY</span> 字段名 新数据类型<span class="token punctuation">(</span>长度<span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token comment">-- 修改字段名和字段类型</span>
<span class="token keyword">ALTER</span> <span class="token keyword">TABLE</span> 表名 CHANGE 旧字段名 新字段名 类型<span class="token punctuation">(</span>长度<span class="token punctuation">)</span> <span class="token punctuation">[</span> <span class="token keyword">COMMENT</span> 注释 <span class="token punctuation">]</span> <span class="token punctuation">[</span> 约束 <span class="token punctuation">]</span><span class="token punctuation">;</span>

<span class="token keyword">ALTER</span> <span class="token keyword">TABLE</span> emp CHANGE nickname username <span class="token keyword">varchar</span><span class="token punctuation">(</span><span class="token number">30</span><span class="token punctuation">)</span> <span class="token keyword">COMMENT</span> <span class="token string">&#39;昵称&#39;</span><span class="token punctuation">;</span>

<span class="token comment">-- 删除字段</span>
<span class="token keyword">ALTER</span> <span class="token keyword">TABLE</span> 表名 <span class="token keyword">DROP</span> 字段名<span class="token punctuation">;</span>

<span class="token keyword">ALTER</span> <span class="token keyword">TABLE</span> emp <span class="token keyword">DROP</span> username<span class="token punctuation">;</span>

<span class="token comment">-- 修改表名</span>
<span class="token keyword">ALTER</span> <span class="token keyword">TABLE</span> 表名 <span class="token keyword">RENAME</span> <span class="token keyword">TO</span> 新表名<span class="token punctuation">;</span>

<span class="token keyword">ALTER</span> <span class="token keyword">TABLE</span> emp <span class="token keyword">RENAME</span> <span class="token keyword">TO</span> employee<span class="token punctuation">;</span>

<span class="token comment">-- 删除表</span>
<span class="token keyword">DROP</span> <span class="token keyword">TABLE</span> <span class="token punctuation">[</span> <span class="token keyword">IF</span> <span class="token keyword">EXISTS</span> <span class="token punctuation">]</span> 表名<span class="token punctuation">;</span>

<span class="token keyword">DROP</span> <span class="token keyword">TABLE</span> <span class="token keyword">IF</span> <span class="token keyword">EXISTS</span> tb_user<span class="token punctuation">;</span>

<span class="token comment">--  删除指定表, 并重新创建表 （在删除表时，数据也会被删除）</span>
<span class="token keyword">TRUNCATE</span> <span class="token keyword">TABLE</span> 表名<span class="token punctuation">;</span>

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,7);function v(m,b){const a=o("router-link");return c(),l("div",null,[k,n("nav",u,[n("ul",null,[n("li",null,[e(a,{to:"#数据库操作"},{default:p(()=>[s("数据库操作")]),_:1})]),n("li",null,[e(a,{to:"#表操作"},{default:p(()=>[s("表操作")]),_:1})])])]),r])}const w=t(d,[["render",v],["__file","DDL.html.vue"]]);export{w as default};
