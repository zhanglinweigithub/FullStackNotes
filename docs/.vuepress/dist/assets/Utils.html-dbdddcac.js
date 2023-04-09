import{_ as d,M as l,p as t,q as r,R as e,N as n,V as a,t as s,a1 as o}from"./framework-5866ffd3.js";const c="/FullStackNotes/assets/image-20230409161232906-f509a94b.png",m="/FullStackNotes/assets/image-20230409161353928-86c981bd.png",u="/FullStackNotes/assets/image-20230409161456559-3df75560.png",v="/FullStackNotes/assets/image-20230409161605770-30d01515.png",p="/FullStackNotes/assets/image-20230409161628749-b5303c88.png",b="/FullStackNotes/assets/image-20230409161747508-c6f89eab.png",h="/FullStackNotes/assets/image-20230409161915908-0b5de1f1.png",g={},q=e("h1",{id:"目录",tabindex:"-1"},[e("a",{class:"header-anchor",href:"#目录","aria-hidden":"true"},"#"),s(" 目录")],-1),x={class:"table-of-contents"},y=o(`<h2 id="mysql常用工具" tabindex="-1"><a class="header-anchor" href="#mysql常用工具" aria-hidden="true">#</a> MySQL常用工具</h2><p>主要介绍几个开发过程中常用的<code>MySQL</code>工具</p><h2 id="mysql" tabindex="-1"><a class="header-anchor" href="#mysql" aria-hidden="true">#</a> mysql</h2><p>该<code>mysql</code>不是指<code>mysql</code>服务，而是指<code>mysql</code>的客户端工具。</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>语法 ：
	mysql [options] [database]
选项 ：
	-u, --user=name #指定用户名
	-p, --password[=name] #指定密码
	-h, --host=name #指定服务器IP或域名
	-P, --port=port #指定连接端口
	-e, --execute=name #执行SQL语句并退出
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><code>-e</code>选项可以在<code>Mysql</code>客户端执行<code>SQL</code>语句，而不用连接到<code>MySQL</code>数据库再执行，对于一些批处理脚本，这种方式尤其方便</p><p>示例：</p><div class="language-sql line-numbers-mode" data-ext="sql"><pre class="language-sql"><code>mysql <span class="token operator">-</span>uroot –p123456 db01 <span class="token operator">-</span>e <span class="token string">&quot;select * from stu&quot;</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p><img src="`+c+`" alt="image-20230409161232906"></p><h2 id="mysqladmin" tabindex="-1"><a class="header-anchor" href="#mysqladmin" aria-hidden="true">#</a> mysqladmin</h2><p><code>mysqladmin</code> 是一个执行管理操作的客户端程序。</p><p>可以用它来检查服务器的配置和当前状态、创建并删除数据库等</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>通过帮助文档查看选项：
	mysqladmin --help

语法:
	mysqladmin [options] command ...
选项:
	-u, --user=name #指定用户名
	-p, --password[=name] #指定密码
	-h, --host=name #指定服务器IP或域名
	-P, --port=port #指定连接端口
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>示例：</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>mysqladmin -uroot –p1234 drop &#39;test01&#39;;

mysqladmin -uroot –p1234 version;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><img src="`+m+`" alt="image-20230409161353928"></p><h2 id="mysqlbinlog" tabindex="-1"><a class="header-anchor" href="#mysqlbinlog" aria-hidden="true">#</a> mysqlbinlog</h2><p>由于服务器生成的二进制日志文件以二进制格式保存，所以如果想要检查这些文本的文本格式，就会使 用到<code>mysqlbinlog</code> 日志管理工具</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>语法 ：
	mysqlbinlog [options] log-files1 log-files2 ...
选项 ：
	-d, --database=name 指定数据库名称，只列出指定的数据库相关操作。
	-o, --offset=# 忽略掉日志中的前n行命令。
	-r,--result-file=name 将输出的文本格式日志输出到指定文件。
	-s, --short-form 显示简单格式， 省略掉一些信息。
	--start-datatime=date1 --stop-datetime=date2 指定日期间隔内的所有日志。
	--start-position=pos1 --stop-position=pos2 指定位置间隔内的所有日志。
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>示例：</p><p>查看 binlog.000008这个二进制文件中的数据信息</p><p><img src="`+u+`" alt="image-20230409161456559"></p><h2 id="mysqlshow" tabindex="-1"><a class="header-anchor" href="#mysqlshow" aria-hidden="true">#</a> mysqlshow</h2><p><code>mysqlshow</code> 客户端对象查找工具，用来很快地查找存在哪些数据库、数据库中的表、表中的列或者索引。</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>语法 ：
	mysqlshow [options] [db_name [table_name [col_name]]]
选项 ：
	--count 显示数据库及表的统计信息（数据库，表 均可以不指定）
	-i 显示指定数据库或者指定表的状态信息
	
示例：
#查询test库中每个表中的字段书，及行数
mysqlshow -uroot -p2143 test --count
#查询test库中book表的详细情况
mysqlshow -uroot -p2143 test book --count
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>示例：</p><p>查询每个数据库的表的数量及表中记录的数量</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>mysqlshow -uroot -p1234 --count
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p><img src="`+v+`" alt="image-20230409161605770"></p><p>查看数据库db01的统计信息</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>mysqlshow -uroot -p1234 db01 --count
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p><img src="`+p+`" alt="image-20230409161628749"></p><h2 id="mysqldump" tabindex="-1"><a class="header-anchor" href="#mysqldump" aria-hidden="true">#</a> mysqldump</h2><p><code>mysqldump</code> 客户端工具用来备份数据库或在不同数据库之间进行数据迁移。</p><p>备份内容包含创建表，及插入表的<code>SQL</code>语句。</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>语法 ：
	mysqldump [options] db_name [tables]
	mysqldump [options] --database/-B db1 [db2 db3...]
	mysqldump [options] --all-databases/-A
连接选项 ：
	-u, --user=name 指定用户名
	-p, --password[=name] 指定密码
	-h, --host=name 指定服务器ip或域名
	-P, --port=# 指定连接端口
输出选项：
	--add-drop-database 在每个数据库创建语句前加上 drop database 语句
	--add-drop-table 在每个表创建语句前加上 drop table 语句 , 默认开启 ; 不开启 (--skip-add-drop-table)
	-n, --no-create-db 不包含数据库的创建语句
	-t, --no-create-info 不包含数据表的创建语句
	-d --no-data 不包含数据
	-T, --tab=name 自动生成两个文件：一个.sql文件，创建表结构的语句；一个.txt文件，数据文件

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>示例：</p><p>备份db01数据库</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>mysqldump -uroot -p1234 db01 &gt; db01.sql
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p><img src="`+b+`" alt="image-20230409161747508"></p><p>备份出来的数据包含：</p><ul><li>删除表的语句</li><li>创建表的语句</li><li>数据插入语句</li></ul><h2 id="mysqlimport" tabindex="-1"><a class="header-anchor" href="#mysqlimport" aria-hidden="true">#</a> mysqlimport</h2><p><code>mysqlimport</code> 是客户端数据导入工具，用来导入<code>mysqldump</code> 加 <code>-T</code> 参数后导出的文本文件</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>语法 ：
	mysqlimport [options] db_name textfile1 [textfile2...]
示例 ：
	mysqlimport -uroot -p2143 test /tmp/city.txt
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><img src="`+h+`" alt="image-20230409161915908"></p><h2 id="source" tabindex="-1"><a class="header-anchor" href="#source" aria-hidden="true">#</a> source</h2><p>如果需要导入<code>sql</code>文件,可以使用<code>mysql</code>中的<code>source</code> 指令</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>语法 ：
source /root/xxxxx.sql
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div>`,49);function _(f,k){const i=l("router-link");return t(),r("div",null,[q,e("nav",x,[e("ul",null,[e("li",null,[n(i,{to:"#mysql常用工具"},{default:a(()=>[s("MySQL常用工具")]),_:1})]),e("li",null,[n(i,{to:"#mysql"},{default:a(()=>[s("mysql")]),_:1})]),e("li",null,[n(i,{to:"#mysqladmin"},{default:a(()=>[s("mysqladmin")]),_:1})]),e("li",null,[n(i,{to:"#mysqlbinlog"},{default:a(()=>[s("mysqlbinlog")]),_:1})]),e("li",null,[n(i,{to:"#mysqlshow"},{default:a(()=>[s("mysqlshow")]),_:1})]),e("li",null,[n(i,{to:"#mysqldump"},{default:a(()=>[s("mysqldump")]),_:1})]),e("li",null,[n(i,{to:"#mysqlimport"},{default:a(()=>[s("mysqlimport")]),_:1})]),e("li",null,[n(i,{to:"#source"},{default:a(()=>[s("source")]),_:1})])])]),y])}const S=d(g,[["render",_],["__file","Utils.html.vue"]]);export{S as default};
