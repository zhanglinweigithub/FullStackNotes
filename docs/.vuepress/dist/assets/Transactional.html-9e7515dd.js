import{_ as l,a as p,b as i,c as r}from"./image-20230405163041946-5b1b2637.js";import{_ as u,M as t,p as k,q as m,R as n,N as e,V as a,t as s,a1 as d}from"./framework-5866ffd3.js";const g={},h=n("h1",{id:"目录",tabindex:"-1"},[n("a",{class:"header-anchor",href:"#目录","aria-hidden":"true"},"#"),s(" 目录")],-1),v={class:"table-of-contents"},b=d(`<h2 id="mysql事务" tabindex="-1"><a class="header-anchor" href="#mysql事务" aria-hidden="true">#</a> MySQL事务</h2><p>事务通常是由一个或一组<code>SQL</code>组成的，组成一个事务的<code>SQL</code>一般都是一个业务操作</p><p>事务是一组操作的集合，它是一个不可分割的工作单位，事务会把所有的操作作为一个整体一起向系统提交或撤销操作请求，即这些操作要么同时成功，要么同时失败</p><ul><li><p><strong>事务是基于当前数据库连接而言的，连接<code>A</code>中开启事务，是不会影响连接<code>B</code>的</strong></p></li><li><p><strong>默认MySQL的事务是自动提交的，也就是说，当执行完一条DML语句时，MySQL会立即隐式的提交事务。</strong></p></li></ul><div class="language-sql line-numbers-mode" data-ext="sql"><pre class="language-sql"><code><span class="token comment">-- 查看/设置事务提交方式</span>
<span class="token keyword">SELECT</span> @<span class="token variable">@autocommit</span> <span class="token punctuation">;</span> <span class="token comment">-- 查看</span>

<span class="token keyword">SET</span> @<span class="token variable">@autocommit</span> <span class="token operator">=</span> <span class="token number">0</span> <span class="token punctuation">;</span> <span class="token comment">-- 0不自动提交</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="事务四大特性-acid" tabindex="-1"><a class="header-anchor" href="#事务四大特性-acid" aria-hidden="true">#</a> 事务四大特性 ACID</h2><ol><li><p><strong>原子性（Atomicity）</strong>：</p><p>​ 事务是不可分割的最小操作单元，要么全部成功，要么全部失败</p></li><li><p><strong>一致性（Consistency）</strong>：</p><p>​ 不管事务发生的前后，<code>MySQL</code>中原本的数据变化都是一致的，也就是<code>DB</code>中的数据只允许从一个一致性状态变化为另一个一致性状态。</p><p>​ 说人话：一个事务中的所有操作，要么一起改变数据库中的数据，要么都不改变，对于其他事务而言，数据的变化是一致的</p></li><li><p><strong>隔离性（Isolation）</strong>：</p><p>​ 指多个事务之间都是独立的，相当于每个事务都被装在一个箱子中，每个箱子之间都是隔开的，相互之间并不影响</p></li><li><p><strong>持久性（Durability）</strong>：</p><p>​ 事务一旦提交或回滚，它对数据库中的数据的改变就是永久的</p></li></ol><h2 id="手动控制事务" tabindex="-1"><a class="header-anchor" href="#手动控制事务" aria-hidden="true">#</a> 手动控制事务</h2><p><strong>手动开启事务后一定要做提交或回滚处理，否则不会生效</strong></p><p>在<code>MySQL</code>中，提供了一系列事务相关的命令</p><ul><li><code>start transaction | begin | begin work</code>：开启一个事务</li><li><code>commit</code>：提交一个事务</li><li><code>rollback</code>：回滚一个事务</li></ul><div class="language-sql line-numbers-mode" data-ext="sql"><pre class="language-sql"><code><span class="token comment">-- 开启一个事务</span>
<span class="token keyword">start</span> <span class="token keyword">transaction</span><span class="token punctuation">;</span>

<span class="token comment">-- 第一条SQL语句</span>
<span class="token comment">-- 第二条SQL语句</span>
<span class="token comment">-- 第三条SQL语句</span>

<span class="token comment">-- 提交或回滚事务</span>
<span class="token keyword">commit</span> <span class="token operator">||</span> <span class="token keyword">rollback</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="事务回滚点" tabindex="-1"><a class="header-anchor" href="#事务回滚点" aria-hidden="true">#</a> 事务回滚点</h2><p>当一个事务中的后续操作执行失败时，会回滚到指定的回滚点位置，而不是回滚整个事务中的所有操作</p><p>但假设目前有一个事务，由很多条<code>SQL</code>组成，但是我想让其中一部分执行成功后，就算后续<code>SQL</code>执行失败也照样提交，这时就可以使用<strong>事务回滚点</strong></p><p><code>MySQL</code>提供了两个关于事务回滚点的命令：</p><ul><li><code>savepoint point_name</code>：添加一个事务回滚点</li><li><code>rollback to point_name</code>：回滚到指定的事务回滚点</li></ul><div class="language-sql line-numbers-mode" data-ext="sql"><pre class="language-sql"><code><span class="token comment">-- 先查询一次用户表</span>
<span class="token keyword">SELECT</span> <span class="token operator">*</span> <span class="token keyword">FROM</span> <span class="token identifier"><span class="token punctuation">\`</span>zz_users<span class="token punctuation">\`</span></span><span class="token punctuation">;</span>
<span class="token comment">-- 开启事务</span>
<span class="token keyword">start</span> <span class="token keyword">transaction</span><span class="token punctuation">;</span>
<span class="token comment">-- 修改 ID=4 的姓名为：黑熊</span>
<span class="token keyword">update</span> <span class="token identifier"><span class="token punctuation">\`</span>zz_users<span class="token punctuation">\`</span></span> <span class="token keyword">set</span> <span class="token identifier"><span class="token punctuation">\`</span>user_name<span class="token punctuation">\`</span></span> <span class="token operator">=</span> <span class="token string">&quot;黑熊&quot;</span> <span class="token keyword">where</span> <span class="token identifier"><span class="token punctuation">\`</span>user_id<span class="token punctuation">\`</span></span> <span class="token operator">=</span> <span class="token number">4</span><span class="token punctuation">;</span>
<span class="token comment">-- 添加一个事务回滚点：update_name</span>
<span class="token keyword">savepoint</span> update_name<span class="token punctuation">;</span>
<span class="token comment">-- 删除 ID=1 的行数据</span>
<span class="token keyword">delete</span> <span class="token keyword">from</span> <span class="token identifier"><span class="token punctuation">\`</span>zz_users<span class="token punctuation">\`</span></span> <span class="token keyword">where</span> <span class="token identifier"><span class="token punctuation">\`</span>user_id<span class="token punctuation">\`</span></span> <span class="token operator">=</span> <span class="token number">1</span><span class="token punctuation">;</span>
<span class="token comment">-- 回滚到 update_name 这个事务点</span>
<span class="token keyword">rollback</span> <span class="token keyword">to</span> update_name<span class="token punctuation">;</span>
<span class="token comment">-- 再次查询一次数据</span>
<span class="token keyword">SELECT</span> <span class="token operator">*</span> <span class="token keyword">FROM</span> <span class="token identifier"><span class="token punctuation">\`</span>zz_users<span class="token punctuation">\`</span></span><span class="token punctuation">;</span>
<span class="token comment">-- 提交事务</span>
<span class="token keyword">COMMIT</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>上述代码中开启了一个事务，事务中总共修改和删除两条<code>SQL</code>组成，然后在修改语句后面添加了一个事务回滚点<code>update_name</code>，在删除语句后回滚到了前面添加的回滚点。</p>`,19),_=n("p",null,[s("回滚到事务点后不代表着事务结束了，只是事务内发生了一次回滚，如果要结束当前这个事务，还依旧需要通过"),n("code",null,"commit|rollback;"),s("命令处理")],-1),y=d(`<h2 id="事务隔离级别" tabindex="-1"><a class="header-anchor" href="#事务隔离级别" aria-hidden="true">#</a> 事务隔离级别</h2><table><thead><tr><th style="text-align:left;"><strong>隔离级别</strong></th><th><strong>脏读</strong></th><th><strong>不可重复的</strong></th><th><strong>幻读</strong></th></tr></thead><tbody><tr><td style="text-align:left;">读未提交 Read Uncommitted</td><td>√</td><td>√</td><td>√</td></tr><tr><td style="text-align:left;">读已提交 Read Committed</td><td>×</td><td>√</td><td>√</td></tr><tr><td style="text-align:left;">可重复读 Repeatable Read(默认)</td><td>×</td><td>×</td><td>√</td></tr><tr><td style="text-align:left;">串行化 Serializable</td><td>×</td><td>×</td><td>×</td></tr></tbody></table><blockquote><p>事务隔离级别越高，数据越安全，但是性能越低</p></blockquote><div class="language-sql line-numbers-mode" data-ext="sql"><pre class="language-sql"><code><span class="token comment">-- 查看事务隔离级别</span>
<span class="token keyword">SELECT</span> @<span class="token variable">@TRANSACTION_ISOLATION</span><span class="token punctuation">;</span>

<span class="token comment">-- 设置事务隔离级别</span>
<span class="token keyword">SET</span> <span class="token punctuation">[</span> <span class="token keyword">SESSION</span> <span class="token operator">|</span> <span class="token keyword">GLOBAL</span> <span class="token punctuation">]</span> <span class="token keyword">TRANSACTION</span> <span class="token keyword">ISOLATION</span> <span class="token keyword">LEVEL</span> { <span class="token keyword">READ</span> <span class="token keyword">UNCOMMITTED</span> <span class="token operator">|</span>
<span class="token keyword">READ</span> <span class="token keyword">COMMITTED</span> <span class="token operator">|</span> <span class="token keyword">REPEATABLE</span> <span class="token keyword">READ</span> <span class="token operator">|</span> <span class="token keyword">SERIALIZABLE</span> }
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>脏读</strong> :指一个事务读到了其他事务还未提交的数据</p><p><strong>不可重复读</strong> :指在一个事务中，多次读取同一数据，先后读取到的数据不一致</p><p><strong>幻读</strong> :一个事务按照条件查询数据时，没有对应的数据行，但是在插入数据时，又发现这行数据已经存在</p><p><strong>脏写</strong> :多个事务一起操作同一条数据，例如两个事务同时向表中添加一条<code>ID=888</code>的数据，此时就会造成数据覆盖，或者主键冲突的问题，这个问题也被称之为更新丢失问题。</p><p><strong>读未提交级别：</strong> 基于<strong>写互斥锁</strong>实现的，只有获取到锁的事务，才允许对数据进行写操作，解决了<strong>脏写</strong>问题</p><p><strong>读已提交级别：</strong> 对于写操作同样会使用<strong>写互斥锁</strong>，对于读操作则使用<code>MVCC</code></p><p><strong>可重复读级别：</strong> 在这个隔离级别中，主要就是解决上一个级别中遗留的不可重复读问题，但<code>MySQL</code>依旧是利用<code>MVCC</code>机制来解决这个问题的</p><p><strong>串行化级别：</strong> 所有的事务按序排队后串行化处理，也就是操作同一张表的事务只能一个一个执行，事务在执行前需要先获取表级别的锁资源，拿到锁资源的事务才能执行，其余事务则陷入阻塞，等待当前事务释放锁。</p><blockquote><p><em><code>RR</code>级别中也可以解决幻读问题，就是使用临键锁（间隙锁+行锁）这种方式来加锁</em></p></blockquote><h2 id="事务原理" tabindex="-1"><a class="header-anchor" href="#事务原理" aria-hidden="true">#</a> 事务原理</h2><p><code>MySQL</code>的事务机制是基于日志实现的</p><p>任意一条写<code>SQL</code>的执行都会记录三个日志：<code>undo-log、redo-log、bin-log</code></p><ul><li><code>undo-log</code>：主要记录<code>SQL</code>的撤销日志，比如目前是<code>insert</code>语句，就记录一条<code>delete</code>日志。</li><li><code>redo-log</code>：记录当前<code>SQL</code>归属事务的状态，以及记录修改内容和修改页的位置。</li><li><code>bin-log</code>：记录每条<code>SQL</code>操作日志，只要是用于数据的主从复制与数据恢复/备份。</li></ul><blockquote><p>重点是<code>undo-log、redo-log</code>这两个日志</p></blockquote><h3 id="redo-log" tabindex="-1"><a class="header-anchor" href="#redo-log" aria-hidden="true">#</a> redo-log</h3><p><code>redo-log</code>是一种<code>WAL(Write-ahead logging)</code>预写式日志，在数据发生更改之前会先记录日志，也就是在<code>SQL</code>执行前会先记录一条<code>prepare</code>状态的日志，然后再执行数据的写操作</p><blockquote><p>注意：<code>MySQL</code>是基于磁盘的，但磁盘的写入速度相较内存而言会较慢，因此<code>MySQL-InnoDB</code>引擎中不会直接将数据写入到磁盘文件中，而是会先写到<code>BufferPool</code>缓冲区中，当<code>SQL</code>被成功写入到缓冲区后，紧接着会将<code>redo-log</code>日志中相应的记录改为<code>commit</code>状态，然后再由<code>MySQL</code>刷盘机制去做具体的落盘操作</p></blockquote><div class="language-sql line-numbers-mode" data-ext="sql"><pre class="language-sql"><code><span class="token comment">-- 开启事务</span>
<span class="token keyword">start</span> <span class="token keyword">transaction</span><span class="token punctuation">;</span>
<span class="token comment">-- 修改 ID=4 的姓名为：黑熊（原本user_name = 1111）</span>
<span class="token keyword">update</span> <span class="token identifier"><span class="token punctuation">\`</span>zz_users<span class="token punctuation">\`</span></span> <span class="token keyword">set</span> <span class="token identifier"><span class="token punctuation">\`</span>user_name<span class="token punctuation">\`</span></span> <span class="token operator">=</span> <span class="token string">&quot;黑熊&quot;</span> <span class="token keyword">where</span> <span class="token identifier"><span class="token punctuation">\`</span>user_id<span class="token punctuation">\`</span></span> <span class="token operator">=</span> <span class="token number">4</span><span class="token punctuation">;</span>
<span class="token comment">-- 删除 ID=1 的行数据</span>
<span class="token keyword">delete</span> <span class="token keyword">from</span> <span class="token identifier"><span class="token punctuation">\`</span>zz_users<span class="token punctuation">\`</span></span> <span class="token keyword">where</span> <span class="token identifier"><span class="token punctuation">\`</span>user_id<span class="token punctuation">\`</span></span> <span class="token operator">=</span> <span class="token number">1</span><span class="token punctuation">;</span>
<span class="token comment">-- 提交事务</span>
<span class="token keyword">COMMIT</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>这段<code>SQL</code>代码执行的过程如下：</p><ol><li><p>当<code>MySQL</code>执行时，碰到<code>start transaction;</code>的命令时，会将后续所有写操作全部先关闭自动提交机制，也就是后续的所有写操作，不管有没有成功都不会将日志记录修改为<code>commit</code>状态</p></li><li><p>先在<code>redo-log</code>中为第一条<code>SQL</code>语句，记录一条<code>prepare</code>状态的日志，然后再生成对应的撤销日志并记录到<code>undo-log</code>中，然后执行<code>SQL</code>，将要写入的数据先更新到缓冲区</p></li><li><p>再对第二条<code>SQL</code>语句做相同处理，如果有更多条<code>SQL</code>则逐条依次做相同处理</p></li><li><p>直到碰到了<code>rollback、commit</code>命令时，再对前面的所有写<code>SQL</code>做相应处理</p><ul><li>commit：先将当前事务中，所有的<code>SQL</code>的<code>redo-log</code>日志改为<code>commit</code>状态，然后由<code>MySQL</code>后台线程做刷盘，将缓冲区中的数据落入磁盘存储</li><li>rollback：在<code>undo-log</code>日志中找到对应的撤销<code>SQL</code>执行，将缓冲区内更新过的数据全部还原，由于缓冲区的数据被还原了，因此后台线程在刷盘时，依旧不会改变磁盘文件中存储的数据</li></ul></li></ol><h2 id="事务的恢复机制" tabindex="-1"><a class="header-anchor" href="#事务的恢复机制" aria-hidden="true">#</a> 事务的恢复机制</h2><p>MySQL在运行期间会有几个问题</p><p>1、当<code>SQL</code>执行时，数据还没被刷写到磁盘中，结果数据库宕机了，那数据是不是就丢了啊？</p><blockquote><p>对于这个问题并不需要担心，因为前面提到过<code>redo-log</code>是一种预写式日志，会先记录日志再去更新缓冲区中的数据，所以就算缓冲区的数据未被刷写到磁盘，在<code>MySQL</code>重启时，依旧可以通过<code>redo-log</code>日志重新恢复未落盘的数据，从而确保数据的持久化特性</p></blockquote><p>2、那如果在记录<code>redo-log</code>日志时，<code>MySQL</code>芭比Q了咋整？</p><blockquote><p>前面说过数据被更新到缓冲区代表着<code>SQL</code>执行成功了，此时客户端会收到<code>MySQL</code>返回的写入成功提示，只是没有落盘而言，所以<code>MySQL</code>重启后只需要再次落盘即可</p><p>但如果在记录日志的时候<code>MySQL</code>宕机了，这代表着<code>SQL</code>都没执行成功，<code>SQL</code>没执行成功的话，<code>MySQL</code>也不会向客户端返回任何信息，因为<code>MySQL</code>一直没返回执行结果，因此会导致客户端连接超时，而一般客户端都会有超时补偿机制的，比如会超时后重试，如果<code>MySQL</code>做了热备/灾备，这个重试的时间足够<code>MySQL</code>重启完成了，因此用户的操作依旧不会丢失（对于超时补偿机制，在各大数据库连接池中是有实现的）</p></blockquote><h2 id="事务的acid实现" tabindex="-1"><a class="header-anchor" href="#事务的acid实现" aria-hidden="true">#</a> 事务的ACID实现</h2><ul><li>原子性由 <code>undo log</code> 保证</li><li>一致性由 <code>undo log + redo log</code> 保证</li><li>隔离性由 <code>锁 + MVCC</code> 保证</li><li>持久性由 <code>redo log</code> 保证</li></ul><p><strong>原子性：</strong> 当事务中的操作失败时，需要回滚，此时就需要用到 <code>undo log</code> 日志中记录的反向操作来进行回滚。</p><p><strong>一致性：</strong> 前面也有说过，当事务结束时，会有两种情况 1、提交 2、回滚</p><ul><li>提交：就需要用到 <code>redo log</code> 日志，将其中记录的所有本次事务操作改为 <code>commit</code> 状态，然后由<code>MySQL</code>后台线程做刷盘</li><li>回滚：就需要用到 <code>undo log</code> 日志，找到对应的撤销 <code>sq</code>l 执行，还原缓冲区数据</li></ul><p><strong>隔离性：</strong> 通过锁机制，将多个事务隔离开，通过 MVCC 机制，实现非阻塞都的功能。</p><p><strong>持久性：</strong> 对数据的所有操作都会记录在 <code>redo log</code> 中，避免 <code>MySQL</code> 宕机重启后丢失修改</p><h2 id="mvcc" tabindex="-1"><a class="header-anchor" href="#mvcc" aria-hidden="true">#</a> MVCC</h2><p>全称 Multi-Version Concurrency Control，多版本并发控制。</p><p>会维护一个数据的多个版本， 使得读写操作没有冲突，快照读为 <code>MySQ</code>L 实现 <code>MVCC</code> 提供了一个非阻塞读功能</p><p><code>MVCC</code> 的具体实现，还需要依赖于数据库记录中的<strong>三个隐式字段、undo log版本链、readView读视图</strong></p><h3 id="三个隐式字段" tabindex="-1"><a class="header-anchor" href="#三个隐式字段" aria-hidden="true">#</a> <strong>三个隐式字段</strong></h3><table><thead><tr><th><strong>隐藏字段</strong></th><th><strong>含义</strong></th></tr></thead><tbody><tr><td>DB_TRX_ID</td><td>最近修改事务ID，记录插入这条记录或最后一次修改该记录的事务ID。</td></tr><tr><td>DB_ROLL_PTR</td><td>回滚指针，指向这条记录的上一个版本，用于配合undo log，指向上一个版 本。</td></tr><tr><td>DB_ROW_ID</td><td>隐藏主键，如果表结构没有指定主键，将会生成该隐藏字段。</td></tr></tbody></table><h3 id="undo-log版本链" tabindex="-1"><a class="header-anchor" href="#undo-log版本链" aria-hidden="true">#</a> <strong>undo log版本链</strong></h3><p>不同事务或相同事务对同一条记录进行修改，会导致该记录的<code>undolog</code>生成一条记录版本链表，链表的头部是最新的旧记录，链表尾部是最早的旧记录</p><p>有一张表，原始数据为</p><p><img src="`+l+'" alt="image-20230405162745046"></p><p><strong>DB_TRX_ID :</strong> 代表最近修改事务ID，记录插入这条记录或最后一次修改该记录的事务ID，是 自增的。 <strong>DB_ROLL_PTR ：</strong> 由于这条数据是才插入的，没有被更新过，所以该字段值为null。</p><p>然后，有四个并发事务同时在访问这张表。</p><p><img src="'+p+'" alt="image-20230405162854905"></p><ul><li>当事务2执行第一条修改语句时，会记录undo log日志，记录数据变更之前的样子;</li><li>然后更新记录， 并且记录本次操作的事务ID，回滚指针，回滚指针用来指定如果发生回滚，回滚到哪一个版本。</li></ul><p><img src="'+i+'" alt="image-20230405162950184"></p><p>最终会形成如下的版本链</p><p><img src="'+r+'" alt="image-20230405163041946"></p><h3 id="readview-读视图" tabindex="-1"><a class="header-anchor" href="#readview-读视图" aria-hidden="true">#</a> readview 读视图</h3><p>是 快照读 <code>SQL</code>执行时<code>MVCC</code>提取数据的依据，记录并维护系统当前活跃的事务 （未提交的）id。</p><p><strong>ReadView</strong>中包含了四个核心字段：</p><table><thead><tr><th><strong>字段</strong></th><th><strong>含义</strong></th></tr></thead><tbody><tr><td>m_ids</td><td>当前活跃的事务ID集合</td></tr><tr><td>min_trx_id</td><td>最小活跃事务ID</td></tr><tr><td>max_trx_id</td><td>预分配事务ID，当前最大事务ID+1（因为事务ID是自增的）</td></tr><tr><td>creator_trx_id</td><td>ReadView创建者的事务ID</td></tr></tbody></table><p>而在<code>readview</code>中就规定了版本链数据的访问规则</p><ul><li>trx_id 代表当前undolog版本链对应事务ID</li></ul><table><thead><tr><th><strong>条件</strong></th><th><strong>是否可以访问</strong></th><th><strong>说明</strong></th></tr></thead><tbody><tr><td>trx_id == creator_trx_id</td><td>可以访问该版本</td><td>成立，说明数据是当前这个事 务更改的</td></tr><tr><td>trx_id &lt; min_trx_id</td><td>可以访问该版本</td><td>成立，说明数据已经提交了。</td></tr><tr><td>trx_id &gt; max_trx_id</td><td>不可以访问该版本</td><td>成立，说明该事务是在 ReadView生成后才开启。</td></tr><tr><td>min_trx_id &lt;= trx_id &lt;= max_trx_id</td><td>如果trx_id不在m_ids中， 是可以访问该版本的</td><td>成立，说明数据已经提交。</td></tr></tbody></table><p><strong>不同的隔离级别，生成ReadView的时机不同：</strong></p><ul><li><strong>READ COMMITTED ：在事务中每一次执行快照读时生成ReadView，保证读取到的是数据可见的最新版本。</strong></li><li><strong>REPEATABLE READ：仅在事务中第一次执行快照读时生成ReadView，后续复用该ReadView实现可重复读。</strong></li></ul>',63);function L(S,w){const o=t("router-link"),c=t("font");return k(),m("div",null,[h,n("nav",v,[n("ul",null,[n("li",null,[e(o,{to:"#mysql事务"},{default:a(()=>[s("MySQL事务")]),_:1})]),n("li",null,[e(o,{to:"#事务四大特性-acid"},{default:a(()=>[s("事务四大特性 ACID")]),_:1})]),n("li",null,[e(o,{to:"#手动控制事务"},{default:a(()=>[s("手动控制事务")]),_:1})]),n("li",null,[e(o,{to:"#事务回滚点"},{default:a(()=>[s("事务回滚点")]),_:1})]),n("li",null,[e(o,{to:"#事务隔离级别"},{default:a(()=>[s("事务隔离级别")]),_:1})]),n("li",null,[e(o,{to:"#事务原理"},{default:a(()=>[s("事务原理")]),_:1}),n("ul",null,[n("li",null,[e(o,{to:"#redo-log"},{default:a(()=>[s("redo-log")]),_:1})])])]),n("li",null,[e(o,{to:"#事务的恢复机制"},{default:a(()=>[s("事务的恢复机制")]),_:1})]),n("li",null,[e(o,{to:"#事务的acid实现"},{default:a(()=>[s("事务的ACID实现")]),_:1})]),n("li",null,[e(o,{to:"#mvcc"},{default:a(()=>[s("MVCC")]),_:1}),n("ul",null,[n("li",null,[e(o,{to:"#三个隐式字段"},{default:a(()=>[s("三个隐式字段")]),_:1})]),n("li",null,[e(o,{to:"#undo-log版本链"},{default:a(()=>[s("undo log版本链")]),_:1})]),n("li",null,[e(o,{to:"#readview-读视图"},{default:a(()=>[s("readview 读视图")]),_:1})])])])])]),b,n("blockquote",null,[n("p",null,[n("strong",null,[e(c,{color:"#FF0000"},{default:a(()=>[s("注意：")]),_:1})])]),_]),y])}const M=u(g,[["render",L],["__file","Transactional.html.vue"]]);export{M as default};
