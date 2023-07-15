import{_ as n,p as s,q as a,a1 as e}from"./framework-5866ffd3.js";const i={},l=e(`<h1 id="shell脚本" tabindex="-1"><a class="header-anchor" href="#shell脚本" aria-hidden="true">#</a> Shell脚本</h1><p><code>Linux</code>提供的 <code>Shell</code>解析器：</p><p><code>cat /etc/shells</code> 查看</p><ul><li><code>/bin/sh</code></li><li><code>/bin/bash</code> 默认</li><li><code>/usr/bin/sh</code></li><li><code>/usr/bin/bash</code></li><li><code>/bin/tcsh</code></li><li><code>/bin/csh</code></li></ul><p><code>sh</code>指向<code>bash</code></p><h2 id="脚本格式" tabindex="-1"><a class="header-anchor" href="#脚本格式" aria-hidden="true">#</a> 脚本格式</h2><p>脚本以 <code>#!/bin/bash</code> 开头，指定解析器</p><p><code>echo</code> 打印</p><p><code>echo</code> “hello word” 输出 hello word</p><p><code>sh</code> 脚本文件，运行脚本</p><p><code>bash</code> 脚本文件，运行脚本</p><p><code>./</code>脚本文件，运行脚本（需要执行权限 777）</p><h2 id="常用系统变量" tabindex="-1"><a class="header-anchor" href="#常用系统变量" aria-hidden="true">#</a> 常用系统变量</h2><p><strong>显示当前 Shell 中所有变量：<code>set</code></strong></p><p><code>$HOME</code> : 返回当前角色的home路径</p><p><code>$PWD</code> : 返回当前所在目录</p><p><code>$SHELL</code> ：返回默认解析器是哪一个</p><p><code>$USER</code> ：返回当前用户名</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>echo $HOME    》》/home/zhang
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h2 id="自定义变量" tabindex="-1"><a class="header-anchor" href="#自定义变量" aria-hidden="true">#</a> 自定义变量</h2><ul><li>等号两侧不能有空格</li><li>在 <code>bash</code> 中，变量默认类型都是字符串类型，无法直接进行数值运算</li><li>变量的值如果有空格，需要使用双引号或单引号括起来</li></ul><h3 id="定义变量" tabindex="-1"><a class="header-anchor" href="#定义变量" aria-hidden="true">#</a> <strong>定义变量</strong></h3><p>变量<code>=</code>值</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token assign-left variable">A</span><span class="token operator">=</span><span class="token number">1</span>
<span class="token builtin class-name">echo</span> <span class="token variable">$A</span>  //1
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><div class="custom-container warning"><p class="custom-container-title">注意</p><p><code>=</code>两边不能有空格</p></div><h3 id="撤销变量" tabindex="-1"><a class="header-anchor" href="#撤销变量" aria-hidden="true">#</a> <strong>撤销变量</strong></h3><p><code>unset</code> 变量</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token builtin class-name">unset</span> A
<span class="token builtin class-name">echo</span> <span class="token variable">$A</span>  //报错
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="声明静态变量" tabindex="-1"><a class="header-anchor" href="#声明静态变量" aria-hidden="true">#</a> <strong>声明静态变量</strong></h3><p><code>readonly</code> <code>B=3</code></p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token builtin class-name">readonly</span>  <span class="token assign-left variable">B</span><span class="token operator">=</span><span class="token number">3</span>
<span class="token builtin class-name">echo</span> <span class="token variable">$B</span>  //3
<span class="token builtin class-name">unset</span> B  //报错
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="custom-container warning"><p class="custom-container-title">注意</p><p><code>readonly</code>声明的变量不能 <code>unset</code></p></div><h3 id="变量提升为全局环境变量" tabindex="-1"><a class="header-anchor" href="#变量提升为全局环境变量" aria-hidden="true">#</a> <strong>变量提升为全局环境变量</strong></h3><p><code>export</code> 变量名</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token shebang important">#!/bin/bash</span>
<span class="token builtin class-name">echo</span> <span class="token string">&quot;helloworld&quot;</span>
<span class="token builtin class-name">echo</span> <span class="token variable">$B</span>
//helloworld  B没输出

<span class="token builtin class-name">export</span> B
//helloworld
//3
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="特殊变量" tabindex="-1"><a class="header-anchor" href="#特殊变量" aria-hidden="true">#</a> 特殊变量</h2><h3 id="n" tabindex="-1"><a class="header-anchor" href="#n" aria-hidden="true">#</a> <strong>$n</strong></h3><p><code>n</code> 为数字，<code>$0</code> 代表该脚本名称，<code>$1-$9</code> 代表第一到第九个参数，十以上的参数，十以上的参数需要用大括号包含，如<code>\${10}</code></p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token function">touch</span>  parameter.sh
<span class="token function">vim</span> parameter.sh

<span class="token comment">#!/bin/bash</span>
<span class="token builtin class-name">echo</span> <span class="token string">&#39;========$n========&#39;</span>
<span class="token builtin class-name">echo</span> <span class="token variable">$0</span>
<span class="token builtin class-name">echo</span> <span class="token variable">$1</span>
<span class="token builtin class-name">echo</span> <span class="token variable">$2</span>

<span class="token function">bash</span> parameter.sh  cs1  cs2

//<span class="token operator">==</span><span class="token operator">==</span><span class="token operator">==</span><span class="token operator">==</span><span class="token variable">$n</span><span class="token operator">==</span><span class="token operator">==</span><span class="token operator">==</span><span class="token operator">==</span>
//parameter.sh
//cs1
//cs2
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="" tabindex="-1"><a class="header-anchor" href="#" aria-hidden="true">#</a> <strong>$#</strong></h3><p>获取所有<strong>输入参数个数</strong>，常用于循环,判断参数的个数是否正确以及加强脚本的健壮性</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token shebang important">#!/bin/bash</span>
<span class="token builtin class-name">echo</span> <span class="token string">&#39;========$n========&#39;</span>
<span class="token builtin class-name">echo</span> <span class="token variable">$0</span>
<span class="token builtin class-name">echo</span> <span class="token variable">$1</span>
<span class="token builtin class-name">echo</span> <span class="token variable">$2</span>
<span class="token builtin class-name">echo</span> <span class="token string">&#39;========$#========&#39;</span>
<span class="token builtin class-name">echo</span> <span class="token variable">$#</span>

<span class="token function">bash</span> parameter.sh  cs1  cs2

//<span class="token operator">==</span><span class="token operator">==</span><span class="token operator">==</span><span class="token operator">==</span><span class="token variable">$n</span><span class="token operator">==</span><span class="token operator">==</span><span class="token operator">==</span><span class="token operator">==</span>
//parameter.sh
//cs1
//cs2
//<span class="token operator">==</span><span class="token operator">==</span><span class="token operator">==</span><span class="token operator">==</span><span class="token variable">$#</span><span class="token operator">==</span><span class="token operator">==</span><span class="token operator">==</span><span class="token operator">==</span>
//2
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="、" tabindex="-1"><a class="header-anchor" href="#、" aria-hidden="true">#</a> <strong>$*、 $@</strong></h3><p><code>$*</code> （这个变量代表命令行中所有的参数，<code>$*</code>把所有的参数看成一个<strong>整体</strong>）</p><p><code>$@</code> （这个变量也代表命令行中所有的参数，不过<code>$@</code>把每个参数<strong>区分对待</strong>）</p><p>注：具体区别请看 <code>for</code> 循环部分</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token shebang important">#!/bin/bash</span>
<span class="token builtin class-name">echo</span> <span class="token string">&#39;========$n========&#39;</span>
<span class="token builtin class-name">echo</span> <span class="token variable">$0</span>
<span class="token builtin class-name">echo</span> <span class="token variable">$1</span>
<span class="token builtin class-name">echo</span> <span class="token variable">$2</span>
<span class="token builtin class-name">echo</span> <span class="token string">&#39;========$#========&#39;</span>
<span class="token builtin class-name">echo</span> <span class="token variable">$#</span>
<span class="token builtin class-name">echo</span> <span class="token string">&#39;========$*========&#39;</span>
<span class="token builtin class-name">echo</span> <span class="token variable">$*</span>
<span class="token builtin class-name">echo</span> <span class="token string">&#39;========$@========&#39;</span>
<span class="token builtin class-name">echo</span> <span class="token variable">$@</span>

<span class="token function">bash</span> parameter.sh  a b c d e f g

//<span class="token operator">==</span><span class="token operator">==</span><span class="token operator">==</span><span class="token operator">==</span><span class="token variable">$n</span><span class="token operator">==</span><span class="token operator">==</span><span class="token operator">==</span><span class="token operator">==</span>
//parameter.sh
//a
//b
//<span class="token operator">==</span><span class="token operator">==</span><span class="token operator">==</span><span class="token operator">==</span><span class="token variable">$#</span><span class="token operator">==</span><span class="token operator">==</span><span class="token operator">==</span><span class="token operator">==</span>
//7
//<span class="token operator">==</span><span class="token operator">==</span><span class="token operator">==</span><span class="token operator">==</span><span class="token variable">$*</span><span class="token operator">==</span><span class="token operator">==</span><span class="token operator">==</span><span class="token operator">==</span>
//a b c d e f g
//<span class="token operator">==</span><span class="token operator">==</span><span class="token operator">==</span><span class="token operator">==</span><span class="token variable">$@</span><span class="token operator">==</span><span class="token operator">==</span><span class="token operator">==</span><span class="token operator">==</span>
//a b c d e f g
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="-1" tabindex="-1"><a class="header-anchor" href="#-1" aria-hidden="true">#</a> <strong>$?</strong></h3><p>最后一次执行的命令的返回状态。如果这个变量的值为 0，证明上一 个命令正确执行；如果这个变量的值为非 0（具体是哪个数，由命令自己来决定），则证明 上一个命令执行不正确了</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>//判断 helloworld.sh 脚本是否正确执行

<span class="token function">bash</span> helloworld.sh	//hello word
<span class="token builtin class-name">echo</span> <span class="token variable">$?</span>		//0
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="运算符" tabindex="-1"><a class="header-anchor" href="#运算符" aria-hidden="true">#</a> 运算符</h2><p><code>$((运算式))</code> 或 <code>$[运算式]</code></p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>//计算（2+3）* <span class="token number">4</span> 的值

<span class="token assign-left variable">S</span><span class="token operator">=</span>$<span class="token punctuation">[</span><span class="token punctuation">(</span><span class="token number">2</span>+3<span class="token punctuation">)</span>*4<span class="token punctuation">]</span>
<span class="token builtin class-name">echo</span> <span class="token variable">$S</span>	//20
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="条件判断" tabindex="-1"><a class="header-anchor" href="#条件判断" aria-hidden="true">#</a> 条件判断</h2><p><strong>基本语法</strong></p><p><code>test condition</code></p><p>[ <code>condition</code> ]</p><p><code>condition</code>非空即为 <code>true</code> ， <code>[ zhang]</code>返回 <code>true</code> <code>[ ]</code> 返回 <code>false</code></p><div class="custom-container warning"><p class="custom-container-title">注意</p><p><code>condition</code> 前后要有空格</p></div><h3 id="_1-两个整数之间比较" tabindex="-1"><a class="header-anchor" href="#_1-两个整数之间比较" aria-hidden="true">#</a> （1）两个整数之间比较</h3><p><code>-eq</code> 等于（equal）</p><p><code>-ne</code> 不等于（not equal）</p><p><code>-lt</code> 小于（less than）</p><p><code>-le</code> 小于等于（less equal）</p><p><code>-gt</code> 大于（greater than）</p><p><code>-ge</code> 大于等于（greater equal）</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>//23 是否大于等于 <span class="token number">22</span>
<span class="token punctuation">[</span> <span class="token number">23</span> <span class="token parameter variable">-ge</span> <span class="token number">22</span> <span class="token punctuation">]</span>
<span class="token builtin class-name">echo</span> <span class="token variable">$?</span>  //0
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="custom-container warning"><p class="custom-container-title">注意</p><p>如果是字符串之间的比较 ，用等号“<code>=</code>”判断相等；</p><p>用“<code>!=</code>”判断不等。</p></div><h3 id="_2-按照文件权限进行判断" tabindex="-1"><a class="header-anchor" href="#_2-按照文件权限进行判断" aria-hidden="true">#</a> （2）按照文件权限进行判断</h3><p><code>-r</code> 有读的权限（read）</p><p><code>-w</code> 有写的权限（write）</p><p><code>-x</code> 有执行的权限（execute）</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>//helloworld.sh 是否具有写权限
<span class="token punctuation">[</span> <span class="token parameter variable">-w</span> helloworld.sh <span class="token punctuation">]</span>
<span class="token builtin class-name">echo</span> <span class="token variable">$?</span>  //0
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_3-按照文件类型进行判断" tabindex="-1"><a class="header-anchor" href="#_3-按照文件类型进行判断" aria-hidden="true">#</a> （3）按照文件类型进行判断</h3><p><code>-e</code> 文件存在（existence）</p><p><code>-f</code> 文件存在并且是一个常规的文件（file）</p><p><code>-d</code> 文件存在并且是一个目录（directory）</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>//  /home/zhang/cls.txt 目录中的文件是否存在
<span class="token punctuation">[</span> <span class="token parameter variable">-e</span> /home/zhang/cls.txt <span class="token punctuation">]</span>
<span class="token builtin class-name">echo</span> <span class="token variable">$?</span>  //1
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_4-多条件判断" tabindex="-1"><a class="header-anchor" href="#_4-多条件判断" aria-hidden="true">#</a> （4）多条件判断</h3><p><code>&amp;&amp;</code> 表示前一条命令执行成功时，才执行后一条命令</p><p><code>||</code> 表示上一 条命令执行失败后，才执行下一条命令</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token punctuation">[</span> zhang <span class="token punctuation">]</span> <span class="token operator">&amp;&amp;</span> <span class="token builtin class-name">echo</span> OK <span class="token operator">||</span> <span class="token builtin class-name">echo</span> noOK  //OK
<span class="token punctuation">[</span>   <span class="token punctuation">]</span> <span class="token operator">&amp;&amp;</span> <span class="token builtin class-name">echo</span> OK <span class="token operator">||</span> <span class="token builtin class-name">echo</span> noOK  //noOK
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="流程控制" tabindex="-1"><a class="header-anchor" href="#流程控制" aria-hidden="true">#</a> 流程控制</h2><ul><li><code>[ 条件判断式 ]</code>，中括号和条件判断式之间必须有空格</li><li><code>if</code> 后要有空格</li></ul><h3 id="if判断" tabindex="-1"><a class="header-anchor" href="#if判断" aria-hidden="true">#</a> if判断</h3><h4 id="单分支" tabindex="-1"><a class="header-anchor" href="#单分支" aria-hidden="true">#</a> <strong>单分支</strong></h4><p>基本语法</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token keyword">if</span> <span class="token punctuation">[</span> 条件判断表达式 <span class="token punctuation">]</span><span class="token punctuation">;</span><span class="token keyword">then</span>
	程序
<span class="token keyword">fi</span>

或

<span class="token keyword">if</span> <span class="token punctuation">[</span> 条件判断表达式 <span class="token punctuation">]</span>
<span class="token keyword">then</span>
	程序
<span class="token keyword">fi</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="多分支" tabindex="-1"><a class="header-anchor" href="#多分支" aria-hidden="true">#</a> <strong>多分支</strong></h4><p>基本语法</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token keyword">if</span> <span class="token punctuation">[</span> 条件判断表达式 <span class="token punctuation">]</span>
<span class="token keyword">then</span>
	程序
<span class="token keyword">elif</span> <span class="token punctuation">[</span> 条件判断表达式 <span class="token punctuation">]</span>
<span class="token keyword">then</span>
	程序
<span class="token keyword">else</span>
	程序
<span class="token keyword">fi</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>例</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>// 输入一个数字，如果是 <span class="token number">1</span>，则输出 banzhang zhen shuai，如果是 <span class="token number">2</span>，则输出 cls zhen mei，如果是其它，什么也不输出

<span class="token function">touch</span> if.sh
<span class="token function">vim</span> if.sh

<span class="token comment">#!/bin/bash</span>

<span class="token keyword">if</span> <span class="token punctuation">[</span> <span class="token variable">$1</span> <span class="token parameter variable">-eq</span> <span class="token number">1</span> <span class="token punctuation">]</span>
<span class="token keyword">then</span>
	<span class="token builtin class-name">echo</span> <span class="token string">&quot;banzhang zhen shuai&quot;</span>
<span class="token keyword">elif</span> <span class="token punctuation">[</span> <span class="token variable">$1</span> <span class="token parameter variable">-eq</span> <span class="token number">2</span> <span class="token punctuation">]</span>
<span class="token keyword">then</span>
	<span class="token builtin class-name">echo</span> <span class="token string">&quot;cls zhenmei&quot;</span>
<span class="token keyword">fi</span>

<span class="token function">bash</span> if.sh <span class="token number">1</span>  //banzhang zhen shuai
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="case-语句" tabindex="-1"><a class="header-anchor" href="#case-语句" aria-hidden="true">#</a> case 语句</h3><ul><li><code>case</code> 行尾必须为单词<code>in</code>，每一个模式匹配必须以右括号 <code>)</code> 结束</li><li>双分号<code>;;</code>表示命令序列结束，相当于 <code>java</code> 中的 <code>break</code></li><li>最后的<code>*)</code>表示默认模式，相当于 <code>java</code> 中的 <code>default</code></li></ul><p>基本语法</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token keyword">case</span> $变量名 <span class="token keyword">in</span>
<span class="token string">&quot;值 1&quot;</span><span class="token punctuation">)</span>
	如果变量的值等于值1，则执行程序1
<span class="token punctuation">;</span><span class="token punctuation">;</span>
<span class="token string">&quot;值 2&quot;</span><span class="token punctuation">)</span>
	如果变量的值等于值2，则执行程序2
<span class="token punctuation">;</span><span class="token punctuation">;</span>
	<span class="token punctuation">..</span>.
*<span class="token punctuation">)</span>
	如果变量的值不是以上的值，则执行此程序
<span class="token punctuation">;</span><span class="token punctuation">;</span>
<span class="token keyword">esac</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>例</p><p>输入一个数字，如果是 1，则输出 <code>banzhang</code>，如果是 2，则输出 <code>cls</code>，如果是其它，输出 <code>renyao</code></p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token function">touch</span> case.sh
<span class="token function">vim</span> case.sh

<span class="token comment">#!/bin/bash</span>

<span class="token keyword">case</span> <span class="token variable">$1</span> <span class="token keyword">in</span>
<span class="token string">&quot;1&quot;</span><span class="token punctuation">)</span>
	<span class="token builtin class-name">echo</span> <span class="token string">&quot;banzhang&quot;</span>
<span class="token punctuation">;</span><span class="token punctuation">;</span>
<span class="token string">&quot;2&quot;</span><span class="token punctuation">)</span>
	<span class="token builtin class-name">echo</span> <span class="token string">&quot;cls&quot;</span>
<span class="token punctuation">;</span><span class="token punctuation">;</span>
*<span class="token punctuation">)</span>
	<span class="token builtin class-name">echo</span> <span class="token string">&quot;renyao&quot;</span>
<span class="token punctuation">;</span><span class="token punctuation">;</span>
<span class="token keyword">esac</span>

<span class="token function">bash</span> case.sh <span class="token number">1</span>  // banzhang
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="for-循环" tabindex="-1"><a class="header-anchor" href="#for-循环" aria-hidden="true">#</a> for 循环</h3><p>基本语法1</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token keyword">for</span> <span class="token variable"><span class="token punctuation">((</span> 初始值<span class="token punctuation">;</span>循环控制条件<span class="token punctuation">;</span>变量变化 <span class="token punctuation">))</span></span>
<span class="token keyword">do</span>
	程序
<span class="token keyword">done</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>例</p><p>​ 从1加到100</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token function">touch</span> for1.sh
<span class="token function">vim</span> for1.sh

<span class="token comment">#!/bin/bash</span>

<span class="token assign-left variable">sum</span><span class="token operator">=</span><span class="token number">0</span>

<span class="token keyword">for</span> <span class="token variable"><span class="token punctuation">((</span> i<span class="token operator">=</span><span class="token number">0</span><span class="token punctuation">;</span>[ i<span class="token operator">&lt;=</span><span class="token number">100</span><span class="token punctuation">;</span>i<span class="token operator">++</span> ] <span class="token punctuation">))</span></span>
<span class="token keyword">do</span>
	<span class="token assign-left variable">sum</span><span class="token operator">=</span>$<span class="token punctuation">[</span> <span class="token variable">$sum</span>+<span class="token variable">$i</span> <span class="token punctuation">]</span>
<span class="token keyword">done</span>

<span class="token builtin class-name">echo</span> <span class="token variable">$sum</span>
<span class="token function">bash</span> for1.sh  // <span class="token number">5050</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>基本语法2</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token keyword">for</span> 变量 <span class="token keyword">in</span> 值 <span class="token number">1</span> 值 <span class="token number">2</span> 值 <span class="token number">3</span>…
<span class="token keyword">do</span>
	程序
<span class="token keyword">done</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>例</p><p>​ 打印所有输入参数</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token function">touch</span> for2.sh
<span class="token function">vim</span> for2.sh

<span class="token comment">#!/bin/bash</span>
<span class="token comment">#打印数字</span>
<span class="token keyword">for</span> <span class="token for-or-select variable">i</span> <span class="token keyword">in</span> cls mly wls
<span class="token keyword">do</span>
	<span class="token builtin class-name">echo</span> <span class="token string">&quot;ban zhang love <span class="token variable">$i</span>&quot;</span>
<span class="token keyword">done</span>

<span class="token function">bash</span> for2.sh
ban zhang love cls
ban zhang love mly
ban zhang love wls
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>比较<code>$*</code>和<code>$@</code>区别</p><p><code>$*</code>和<code>$@</code>都表示传递给函数或脚本的所有参数，不被双引号“”包含时，都以<code>$1 $2 …$n</code> 的形式输出所有参数</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token function">touch</span> for3.sh
<span class="token function">vim</span> for3.sh

<span class="token comment">#!/bin/bash</span>
<span class="token builtin class-name">echo</span> <span class="token string">&#39;=============$*=============&#39;</span>
<span class="token keyword">for</span> <span class="token for-or-select variable">i</span> <span class="token keyword">in</span> <span class="token variable">$*</span>
<span class="token keyword">do</span>
	<span class="token builtin class-name">echo</span> <span class="token string">&quot;ban zhang love <span class="token variable">$i</span>&quot;</span>
<span class="token keyword">done</span>
<span class="token builtin class-name">echo</span> <span class="token string">&#39;=============$@=============&#39;</span>

<span class="token keyword">for</span> <span class="token for-or-select variable">j</span> <span class="token keyword">in</span> <span class="token variable">$@</span>
<span class="token keyword">do</span>
	<span class="token builtin class-name">echo</span> <span class="token string">&quot;ban zhang love <span class="token variable">$j</span>&quot;</span>
<span class="token keyword">done</span>
<span class="token function">bash</span> for3.sh cls mly wls

<span class="token operator">==</span><span class="token operator">==</span><span class="token operator">==</span><span class="token operator">==</span><span class="token operator">==</span><span class="token operator">==</span><span class="token operator">=</span><span class="token variable">$*</span><span class="token operator">==</span><span class="token operator">==</span><span class="token operator">==</span><span class="token operator">==</span><span class="token operator">==</span><span class="token operator">==</span><span class="token operator">=</span>
banzhang love cls
banzhang love mly
banzhang love wls
<span class="token operator">==</span><span class="token operator">==</span><span class="token operator">==</span><span class="token operator">==</span><span class="token operator">==</span><span class="token operator">==</span><span class="token operator">=</span><span class="token variable">$@</span><span class="token operator">==</span><span class="token operator">==</span><span class="token operator">==</span><span class="token operator">==</span><span class="token operator">==</span><span class="token operator">==</span><span class="token operator">=</span>
banzhang love cls
banzhang love mly
banzhang love wls
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>当它们被双引号<code>“”</code>包含时</p><p>​ <code>$*</code>会将所有的参数作为一个整体，以“<code>$1 $2 …$n</code>”的形式输 出所有参数；</p><p>​ <code>$@</code>会将各个参数分开，以<code>“$1” “$2”…“$n”</code>的形式输出所有参数</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token function">vim</span> for4.sh

<span class="token comment">#!/bin/bash</span>
<span class="token builtin class-name">echo</span> <span class="token string">&#39;=============$*=============&#39;</span>
<span class="token keyword">for</span> <span class="token for-or-select variable">i</span> <span class="token keyword">in</span> <span class="token string">&quot;<span class="token variable">$*</span>&quot;</span>
<span class="token comment">#$*中的所有参数看成是一个整体，所以这个 for 循环只会循环一次</span>
<span class="token keyword">do</span>
	<span class="token builtin class-name">echo</span> <span class="token string">&quot;ban zhang love <span class="token variable">$i</span>&quot;</span>
<span class="token keyword">done</span>
<span class="token builtin class-name">echo</span> <span class="token string">&#39;=============$@=============&#39;</span>

<span class="token keyword">for</span> <span class="token for-or-select variable">j</span> <span class="token keyword">in</span> <span class="token string">&quot;<span class="token variable">$@</span>&quot;</span>
<span class="token comment">#$@中的每个参数都看成是独立的，所以“$@”中有几个参数，就会循环几次</span>
<span class="token keyword">do</span>
	<span class="token builtin class-name">echo</span> <span class="token string">&quot;ban zhang love <span class="token variable">$j</span>&quot;</span>
<span class="token keyword">done</span>

<span class="token function">bash</span> for4.sh cls mly wls

<span class="token operator">==</span><span class="token operator">==</span><span class="token operator">==</span><span class="token operator">==</span><span class="token operator">==</span><span class="token operator">==</span><span class="token operator">=</span><span class="token variable">$*</span><span class="token operator">==</span><span class="token operator">==</span><span class="token operator">==</span><span class="token operator">==</span><span class="token operator">==</span><span class="token operator">==</span><span class="token operator">=</span>
banzhang love cls mly wls
<span class="token operator">==</span><span class="token operator">==</span><span class="token operator">==</span><span class="token operator">==</span><span class="token operator">==</span><span class="token operator">==</span><span class="token operator">=</span><span class="token variable">$@</span><span class="token operator">==</span><span class="token operator">==</span><span class="token operator">==</span><span class="token operator">==</span><span class="token operator">==</span><span class="token operator">==</span><span class="token operator">=</span>
banzhang love cls
banzhang love mly
banzhang love wls
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="while-循环" tabindex="-1"><a class="header-anchor" href="#while-循环" aria-hidden="true">#</a> while 循环</h3><p>基本语法</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token keyword">while</span> <span class="token punctuation">[</span> 条件判断式 <span class="token punctuation">]</span>
<span class="token keyword">do</span>
	程序
<span class="token keyword">done</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>例</p><p>​ 从1加到100</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token function">touch</span> while.sh
<span class="token function">vim</span> while.sh

<span class="token comment">#!/bin/bash</span>
<span class="token assign-left variable">sum</span><span class="token operator">=</span><span class="token number">0</span>
<span class="token assign-left variable">i</span><span class="token operator">=</span><span class="token number">1</span>

<span class="token keyword">while</span> <span class="token punctuation">[</span> <span class="token variable">$i</span> <span class="token parameter variable">-le</span> <span class="token number">100</span> <span class="token punctuation">]</span>
<span class="token keyword">do</span>
	<span class="token assign-left variable">sum</span><span class="token operator">=</span>$<span class="token punctuation">[</span><span class="token variable">$sum</span>+<span class="token variable">$i</span><span class="token punctuation">]</span>
	<span class="token assign-left variable">i</span><span class="token operator">=</span>$<span class="token punctuation">[</span><span class="token variable">$i</span>+1<span class="token punctuation">]</span>
<span class="token keyword">done</span>

<span class="token builtin class-name">echo</span> <span class="token variable">$sum</span>
<span class="token function">bash</span> while.sh
<span class="token number">5050</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="read-读取控制台输入" tabindex="-1"><a class="header-anchor" href="#read-读取控制台输入" aria-hidden="true">#</a> read 读取控制台输入</h2><p>基本语法</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>read  (选项)  (参数)
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>选项：</p><p>​ **<code>-p</code>：**指定读取值时的提示符</p><p>​ **<code>-t</code>：**指定读取值时等待的事件（秒）如果 <code>-t</code> 不加则表示一直等待</p><p>参数：</p><p>​ **变量：**指定读取值的变量名</p><p>例</p><p>​ 提示 7 秒内，读取控制台输入的名称</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token function">touch</span> read.sh
<span class="token function">vim</span> read.sh

<span class="token comment">#!/bin/bash</span>
<span class="token builtin class-name">read</span> <span class="token parameter variable">-t</span> <span class="token number">7</span> <span class="token parameter variable">-p</span> <span class="token string">&quot;Enter your name in 7 seconds :&quot;</span> NN
<span class="token builtin class-name">echo</span> <span class="token variable">$NN</span>

<span class="token function">bash</span> read.sh
Enter your name <span class="token keyword">in</span> <span class="token number">7</span> seconds <span class="token builtin class-name">:</span> zhang
zhang
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="函数" tabindex="-1"><a class="header-anchor" href="#函数" aria-hidden="true">#</a> 函数</h2><h3 id="系统函数" tabindex="-1"><a class="header-anchor" href="#系统函数" aria-hidden="true">#</a> 系统函数</h3><h4 id="basename" tabindex="-1"><a class="header-anchor" href="#basename" aria-hidden="true">#</a> <strong>basename</strong></h4><p>基本语法</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token function">basename</span>  <span class="token punctuation">[</span>string / pathname<span class="token punctuation">]</span>  <span class="token punctuation">[</span>suffix<span class="token punctuation">]</span>		
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>功能描述：<code>basename</code> 命令会删掉所有的前 缀包括最后一个（‘<code>/</code>’）字符，然后将字符串显示出来</p><p><code>basename</code> 可以理解为取路径里的文件名称</p><p><code>suffix</code> 为后缀，如果 <code>suffix</code> 被指定了，<code>basename</code> 会将 <code>pathname</code> 或 <code>string</code> 中的 <code>suffix</code> 去掉</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>截取该/home/zhang/banzhang.txt 路径的文件名称

<span class="token function">basename</span> /home/zhang/banzhang.txt
banzhang.txt
<span class="token function">basename</span> /home/zhang/banzhang.txt .txt
banzhang
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="dirname" tabindex="-1"><a class="header-anchor" href="#dirname" aria-hidden="true">#</a> <strong>dirname</strong></h4><p>基本语法</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token function">dirname</span>  文件绝对路径 
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>功能描述：从给定的包含绝对路径的文件名中去除文件名 （非目录的部分），然后返回剩下的路径（目录的部分）</p><p><code>dirname</code> 可以理解为取文件路径的绝对路径名称</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>获取 banzhang.txt 文件的路径。

<span class="token function">dirname</span> /home/zhang/banzhang.txt
/home/zhang
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="自定义函数" tabindex="-1"><a class="header-anchor" href="#自定义函数" aria-hidden="true">#</a> 自定义函数</h3><ul><li>必须在调用函数地方之前，先声明函数，<code>shell</code> 脚本是逐行运行。不会像其它语言一 样先编译</li><li>函数返回值，只能通过$?系统变量获得，可以显示加：<code>return</code> 返回，如果不加，将 以最后一条命令运行结果，作为返回值。<code>return</code> 后跟数值 n(0-255)</li></ul><p>基本语法</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token punctuation">[</span>  <span class="token keyword">function</span> <span class="token punctuation">]</span>  funname<span class="token punctuation">[</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">]</span>

<span class="token punctuation">{</span>
		Action<span class="token punctuation">;</span>
		<span class="token punctuation">[</span>return int<span class="token punctuation">;</span><span class="token punctuation">]</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>计算两个输入参数的和

<span class="token function">touch</span> fun.sh
<span class="token function">vim</span> fun.sh

<span class="token comment">#!/bin/bash</span>
<span class="token keyword">function</span> <span class="token function-name function">sum</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
<span class="token punctuation">{</span>
<span class="token assign-left variable">s</span><span class="token operator">=</span><span class="token number">0</span>
<span class="token assign-left variable">s</span><span class="token operator">=</span>$<span class="token punctuation">[</span><span class="token variable">$1</span>+<span class="token variable">$2</span><span class="token punctuation">]</span>
<span class="token builtin class-name">echo</span> <span class="token string">&quot;<span class="token variable">$s</span>&quot;</span>
<span class="token punctuation">}</span>
<span class="token builtin class-name">read</span> <span class="token parameter variable">-p</span> <span class="token string">&quot;Please input the number1: &quot;</span> n1<span class="token punctuation">;</span>
<span class="token builtin class-name">read</span> <span class="token parameter variable">-p</span> <span class="token string">&quot;Please input the number2: &quot;</span> n2<span class="token punctuation">;</span>
<span class="token function">sum</span> <span class="token variable">$n1</span> <span class="token variable">$n2</span><span class="token punctuation">;</span>

<span class="token function">bash</span> /fun.sh
Please input the number1: <span class="token number">2</span>
Please input the number2: <span class="token number">5</span>
<span class="token number">7</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="正则表达式" tabindex="-1"><a class="header-anchor" href="#正则表达式" aria-hidden="true">#</a> 正则表达式</h2><p>正则表达式使用单个字符串来描述、匹配一系列符合某个语法规则的字符串。</p><p>在很多文 本编辑器里，正则表达式通常被用来检索、替换那些符合某个模式的文本。</p><p>在 <code>Linux</code> 中，<code>grep</code>， <code>sed</code>，<code>awk</code> 等文本处理工具都支持通过正则表达式进行模式匹配</p><h3 id="常规匹配" tabindex="-1"><a class="header-anchor" href="#常规匹配" aria-hidden="true">#</a> <strong>常规匹配</strong></h3><p>一串不包含特殊字符的正则表达式匹配它自己</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token function">cat</span>  /etc/passwd <span class="token operator">|</span> <span class="token function">grep</span> zhang
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>会匹配所有包含 zhang的行</p><h3 id="常用特殊字符" tabindex="-1"><a class="header-anchor" href="#常用特殊字符" aria-hidden="true">#</a> <strong>常用特殊字符</strong></h3><p>**<code>^</code>：**匹配一行的开头</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token function">cat</span>  /etc/passwd <span class="token operator">|</span> <span class="token function">grep</span> ^a
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>会匹配所有 a 开头的行</p><p>**<code>$</code>：**匹配一行的结束</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token function">cat</span> /etc/passwd <span class="token operator">|</span> <span class="token function">grep</span> t$
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>会匹配出所有以 <code>t</code> 结尾的行</p><p>**<code>.</code>：**匹配一个任意字符</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token function">cat</span> /etc/passwd <span class="token operator">|</span> <span class="token function">grep</span> r<span class="token punctuation">..</span>t
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>会匹配包含 <code>rabt</code>,<code>rbbt</code>,<code>rxdt</code>,<code>root</code> 等的所有行</p><p><code>*</code>：不单独使用，他和上一个字符连用，表示匹配上一个字符 0 次或多次，</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token function">cat</span> /etc/passwd <span class="token operator">|</span> <span class="token function">grep</span> ro*t 
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>会匹配 rt, rot, root, rooot, roooot 等所有行</p><p>**<code>\\</code>：**表示转义，并不会单独使用</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token function">cat</span> /etc/passwd <span class="token operator">|</span> <span class="token function">grep</span> ‘a<span class="token punctuation">\\</span><span class="token variable">$b</span>‘
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>就会匹配所有包含 <code>a$b</code> 的行。注意需要使用单引号将表达式引起来。</p><p><strong>字符区间 [ ]：</strong><code>[ ]</code> 表示匹配某个范围内的一个字符</p><p><code>[6,8]</code>------匹配 6 或者 8</p><p><code>[0-9]</code>------匹配一个 0-9 的数字</p><p><code>[0-9]*</code>------匹配任意长度的数字字符串</p><p><code>[a-z]</code>------匹配一个 a-z 之间的字符</p><p><code>[a-z]*</code> ------匹配任意长度的字母字符串</p><p><code>[a-c, e-f]</code>-匹配 a-c 或者 e-f 之间的任意字符</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token function">cat</span> /etc/passwd <span class="token operator">|</span> <span class="token function">grep</span> r<span class="token punctuation">[</span>a,b,c<span class="token punctuation">]</span>*t
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>会匹配 rt,rat, rbt, rabt, rbact,rabccbaaacbt 等等所有行</p><h2 id="文本处理工具" tabindex="-1"><a class="header-anchor" href="#文本处理工具" aria-hidden="true">#</a> 文本处理工具</h2><h3 id="cut" tabindex="-1"><a class="header-anchor" href="#cut" aria-hidden="true">#</a> <strong>cut</strong></h3><p><code>cut</code> 的工作就是“剪”，具体的说就是在文件中负责剪切数据用的。</p><p><code>cut</code> 命令从文件的每 一行剪切字节、字符和字段并将这些字节、字符和字段输出</p><p>基本用法</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token function">cut</span>  <span class="token punctuation">[</span>选项参数<span class="token punctuation">]</span>  filename
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>​ 说明：默认分隔符时制表符</p><p>选项参数说明</p><table><thead><tr><th>选项参数</th><th>功能</th></tr></thead><tbody><tr><td>-f</td><td>列号，提取第几列</td></tr><tr><td>-d</td><td>分隔符，按照指定分隔符分割列，默认是制表符 \\t</td></tr><tr><td>-c</td><td>按字符进行切割后，加 n 表示取第几列 如 -c 1</td></tr></tbody></table><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>（1）数据准备
<span class="token punctuation">[</span>zhang@hadoop101 shells<span class="token punctuation">]</span>$ <span class="token function">touch</span> cut.txt
<span class="token punctuation">[</span>zhang@hadoop101 shells<span class="token punctuation">]</span>$ <span class="token function">vim</span> cut.txt
dong shen
guan zhen
wo wo
lai lai
le le

（2）切割 cut.txt 第一列
<span class="token punctuation">[</span>zhang@hadoop101 shells<span class="token punctuation">]</span>$ <span class="token function">cut</span> <span class="token parameter variable">-d</span> <span class="token string">&quot; &quot;</span> <span class="token parameter variable">-f</span> <span class="token number">1</span> cut.txt
dong
guan
wo
lai
le 

（3）切割 cut.txt 第二、三列
<span class="token punctuation">[</span>zhang@hadoop101 shells<span class="token punctuation">]</span>$ <span class="token function">cut</span> <span class="token parameter variable">-d</span> <span class="token string">&quot; &quot;</span> <span class="token parameter variable">-f</span> <span class="token number">2,3</span> cut.txt
shen
zhen
wo
lai
le
（4）在 cut.txt 文件中切割出 guan
<span class="token punctuation">[</span>zhang@hadoop101 shells<span class="token punctuation">]</span>$ <span class="token function">cat</span> cut.txt <span class="token operator">|</span><span class="token function">grep</span> guan <span class="token operator">|</span> <span class="token function">cut</span> <span class="token parameter variable">-d</span> <span class="token string">&quot; &quot;</span> <span class="token parameter variable">-f</span> <span class="token number">1</span>
guan

（5）选取系统 <span class="token environment constant">PATH</span> 变量值，第 <span class="token number">2</span> 个“：”开始后的所有路径：
<span class="token punctuation">[</span>zhang@hadoop101 shells<span class="token punctuation">]</span>$ <span class="token builtin class-name">echo</span> <span class="token environment constant">$PATH</span>
/usr/local/bin:/usr/bin:/usr/local/sbin:/usr/sbin:/home/zhang/.local/bin:/
home/zhang/bin
<span class="token punctuation">[</span>zhang@hadoop101 shells<span class="token punctuation">]</span>$ <span class="token builtin class-name">echo</span> <span class="token environment constant">$PATH</span> <span class="token operator">|</span> <span class="token function">cut</span> <span class="token parameter variable">-d</span> <span class="token string">&quot;:&quot;</span> <span class="token parameter variable">-f</span> <span class="token number">3</span>-
/usr/local/sbin:/usr/sbin:/home/zhang/.local/bin:/home/zhang/bin 

（6）切割 <span class="token function">ifconfig</span> 后打印的 IP 地址
<span class="token punctuation">[</span>zhang@hadoop101 shells<span class="token punctuation">]</span>$ <span class="token function">ifconfig</span> ens33 <span class="token operator">|</span> <span class="token function">grep</span> netmask <span class="token operator">|</span> <span class="token function">cut</span> <span class="token parameter variable">-d</span> <span class="token string">&quot; &quot;</span> <span class="token parameter variable">-f</span> <span class="token number">10</span>
<span class="token number">192.168</span>.111.101
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="awk" tabindex="-1"><a class="header-anchor" href="#awk" aria-hidden="true">#</a> <strong>awk</strong></h3><p>一个强大的文本分析工具，把文件逐行的读入，以空格为默认分隔符将每行切片，切开 的部分再进行分析处理。</p><p>基本用法</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token function">awk</span>  <span class="token punctuation">[</span>选项参数<span class="token punctuation">]</span>  ‘/pattern1/<span class="token punctuation">{</span>action1<span class="token punctuation">}</span>  /pattern2/<span class="token punctuation">{</span>action2<span class="token punctuation">}</span><span class="token punctuation">..</span>.’  filename 
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>​ <code>pattern</code>：表示 <code>awk</code> 在数据中查找的内容，就是匹配模式</p><p>​ <code>action</code>：在找到匹配内容时所执行的一系列命令</p><p>选项参数说明</p><table><thead><tr><th>选项参数</th><th>功能</th></tr></thead><tbody><tr><td>-F</td><td>指定输入文件分隔符</td></tr><tr><td>-v</td><td>赋值一个用户定义变量</td></tr></tbody></table><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>（1）数据准备
<span class="token punctuation">[</span>zhang@hadoop101 shells<span class="token punctuation">]</span>$ <span class="token function">sudo</span> <span class="token function">cp</span> /etc/passwd ./
<span class="token function">passwd</span> 数据的含义
用户名:密码<span class="token punctuation">(</span>加密过后的<span class="token punctuation">)</span>:用户 id:组 id:注释:用户家目录:shell 解析器

（2）搜索 <span class="token function">passwd</span> 文件以 root 关键字开头的所有行，并输出该行的第 <span class="token number">7</span> 列。
<span class="token punctuation">[</span>zhang@hadoop101 shells<span class="token punctuation">]</span>$ <span class="token function">awk</span> <span class="token parameter variable">-F</span> <span class="token builtin class-name">:</span> <span class="token string">&#39;/^root/{print $7}&#39;</span> <span class="token function">passwd</span>
/bin/bash

（3）搜索 <span class="token function">passwd</span> 文件以 root 关键字开头的所有行，并输出该行的第 <span class="token number">1</span> 列和第 <span class="token number">7</span> 列，
中间以“，”号分割。
<span class="token punctuation">[</span>zhang@hadoop101 shells<span class="token punctuation">]</span>$ <span class="token function">awk</span> <span class="token parameter variable">-F</span> <span class="token builtin class-name">:</span> <span class="token string">&#39;/^root/{print $1&quot;,&quot;$7}&#39;</span> <span class="token function">passwd</span>
root,/bin/bash
注意：只有匹配了 pattern 的行才会执行 action。

（4）只显示/etc/passwd 的第一列和第七列，以逗号分割，且在所有行前面添加列名 user，
shell 在最后一行添加<span class="token string">&quot;dahaige，/bin/zuishuai&quot;</span>。
<span class="token punctuation">[</span>zhang@hadoop101 shells<span class="token punctuation">]</span>$ <span class="token function">awk</span> <span class="token parameter variable">-F</span> <span class="token builtin class-name">:</span> <span class="token string">&#39;BEGIN{print &quot;user, shell&quot;} {print $1&quot;,&quot;$7}
END{print &quot;dahaige,/bin/zuishuai&quot;}&#39;</span> <span class="token function">passwd</span>
user, shell
root,/bin/bash
bin,/sbin/nologin 。。。
zhang,/bin/bash
dahaige,/bin/zuishuai
注意：BEGIN 在所有数据读取行之前执行；END 在所有数据执行之后执

（5）将 <span class="token function">passwd</span> 文件中的用户 <span class="token function">id</span> 增加数值 <span class="token number">1</span> 并输出
<span class="token punctuation">[</span>zhang@hadoop101 shells<span class="token punctuation">]</span>$ <span class="token function">awk</span> <span class="token parameter variable">-v</span> <span class="token assign-left variable">i</span><span class="token operator">=</span><span class="token number">1</span> <span class="token parameter variable">-F</span> <span class="token builtin class-name">:</span> <span class="token string">&#39;{print $3+i}&#39;</span> <span class="token function">passwd</span>
<span class="token number">1</span>
<span class="token number">2</span>
<span class="token number">3</span>
<span class="token number">4</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>awk 的内置变量</strong></p><table><thead><tr><th>变量</th><th>说明</th></tr></thead><tbody><tr><td>FILENAME</td><td>文件名</td></tr><tr><td>NR</td><td>已读的记录号（行号）</td></tr><tr><td>NF</td><td>浏览记录的域的个数（切割后，列的个数）</td></tr></tbody></table><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token number">1</span>）统计 <span class="token function">passwd</span> 文件名，每行的行号，每行的列数 
<span class="token punctuation">[</span>zhang@hadoop101 shells<span class="token punctuation">]</span>$ <span class="token function">awk</span> <span class="token parameter variable">-F</span> <span class="token builtin class-name">:</span> <span class="token string">&#39;{print &quot;filename:&quot; FILENAME &quot;,linenum:&quot; NR &quot;,col:&quot;NF}&#39;</span> <span class="token function">passwd</span> filename:passwd,linenum:1,col:7 
filename:passwd,linenum:2,col:7 
filename:passwd,linenum:3,col:7 
<span class="token punctuation">..</span>. 

（2）查询 <span class="token function">ifconfig</span> 命令输出结果中的空行所在的行号 
<span class="token punctuation">[</span>zhang@hadoop101 shells<span class="token punctuation">]</span>$ <span class="token function">ifconfig</span> <span class="token operator">|</span> <span class="token function">awk</span> <span class="token string">&#39;/^$/{print NR}&#39;</span> 
<span class="token number">9</span> 
<span class="token number">18</span> 
<span class="token number">26</span>

（3）切割 IP 
<span class="token punctuation">[</span>zhang@hadoop101 shells<span class="token punctuation">]</span>$ <span class="token function">ifconfig</span> ens33 <span class="token operator">|</span> <span class="token function">awk</span> <span class="token string">&#39;/netmask/ {print $2}&#39;</span> 
<span class="token number">192.168</span>.6.101
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,210),c=[l];function o(p,t){return s(),a("div",null,c)}const r=n(i,[["render",o],["__file","ShellScript.html.vue"]]);export{r as default};
