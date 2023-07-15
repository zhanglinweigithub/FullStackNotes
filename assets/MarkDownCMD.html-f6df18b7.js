import{_ as o,M as i,p as c,q as d,R as n,t as s,N as a,V as p,a1 as e}from"./framework-5866ffd3.js";const r="/FullStackNotes/assets/image-20230411232310086-ac725da3.png",u="/FullStackNotes/assets/quantou-2e2ca53f.png",v="/FullStackNotes/assets/image-20230411234752717-f6d0796f.png",m="/FullStackNotes/assets/image-20230411235400168-5995509a.png",k={},g=e(`<h1 id="markdown常用语法" tabindex="-1"><a class="header-anchor" href="#markdown常用语法" aria-hidden="true">#</a> MarkDown常用语法</h1><h2 id="一、标题" tabindex="-1"><a class="header-anchor" href="#一、标题" aria-hidden="true">#</a> 一、标题</h2><div class="language-markdown line-numbers-mode" data-ext="md"><pre class="language-markdown"><code><span class="token title important"><span class="token punctuation">#</span> 这是一级标题</span>
<span class="token title important"><span class="token punctuation">##</span> 这是二级标题，二级标题底下有横线</span>
<span class="token title important"><span class="token punctuation">###</span> 这是三级标题</span>
<span class="token title important"><span class="token punctuation">####</span> 这是四级标题</span>
<span class="token title important"><span class="token punctuation">#####</span> 这是五级标题</span>
<span class="token title important"><span class="token punctuation">######</span> 这是六级标题</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>效果</strong></p><p><img src="`+r+`" alt="image-20230411232310086"></p><div class="custom-container warning"><p class="custom-container-title">注意</p><p><code>#</code>后面必须有个空格，然后再跟内容，否则<code>#</code>就是普通字符</p></div><h2 id="二、字体" tabindex="-1"><a class="header-anchor" href="#二、字体" aria-hidden="true">#</a> 二、字体</h2><div class="language-markdown line-numbers-mode" data-ext="md"><pre class="language-markdown"><code><span class="token bold"><span class="token punctuation">**</span><span class="token content">这是加粗的文字</span><span class="token punctuation">**</span></span>
<span class="token italic"><span class="token punctuation">*</span><span class="token content">这是倾斜的文字</span><span class="token punctuation">*</span></span>\`
<span class="token bold"><span class="token punctuation">**</span><span class="token content"><span class="token italic"><span class="token punctuation">*</span><span class="token content">这是斜体加粗的文字</span><span class="token punctuation">*</span></span></span><span class="token punctuation">**</span></span>
<span class="token strike"><span class="token punctuation">~~</span><span class="token content">这是加删除线的文字</span><span class="token punctuation">~~</span></span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>效果</strong></p><p><strong>这是加粗的文字</strong></p><p><em>这是倾斜的文字</em></p><p><em><strong>这是斜体加粗的文字</strong></em></p><p><s>这是加删除线的文字</s></p><h2 id="三、引用" tabindex="-1"><a class="header-anchor" href="#三、引用" aria-hidden="true">#</a> 三、引用</h2><div class="language-markdown line-numbers-mode" data-ext="md"><pre class="language-markdown"><code><span class="token blockquote punctuation">&gt;</span>这是1级引用的内容

<span class="token blockquote punctuation">&gt;&gt;</span>这是2级引用的内容

<span class="token blockquote punctuation">&gt;&gt;&gt;</span>这是3级引用的内容
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>效果</strong></p><blockquote><p>这是1级引用的内容</p></blockquote><blockquote><blockquote><p>这是2级引用的内容</p></blockquote></blockquote><blockquote><blockquote><blockquote><p>这是3级引用的内容</p></blockquote></blockquote></blockquote><h2 id="四、分割线" tabindex="-1"><a class="header-anchor" href="#四、分割线" aria-hidden="true">#</a> 四、分割线</h2><div class="language-markdown line-numbers-mode" data-ext="md"><pre class="language-markdown"><code>使用3个或者多个“<span class="token italic"><span class="token punctuation">*</span><span class="token content">”的分割线
</span><span class="token punctuation">*</span></span>**

使用3个或者多个“-”的分割线

<span class="token hr punctuation">---</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>效果</strong></p><p>使用3个或者多个<code>*</code>的分割线</p><hr><p>使用3个或者多个<code>-</code>的分割线</p><hr><div class="custom-container warning"><p class="custom-container-title">注意</p><p>在三个或者多个<code>-</code>的上面加文字的话会自动变成2级标题，所以要么空一行要么就使用<code>*</code></p></div><h2 id="五、图片" tabindex="-1"><a class="header-anchor" href="#五、图片" aria-hidden="true">#</a> 五、图片</h2><p><strong>格式：</strong><code>![图片alt] (图片地址 &quot;图片title&quot;)</code></p><ul><li><strong>图片alt</strong>：就是显示在图片下面的文字，相当于对图片内容的解释。</li><li><strong>图片地址</strong>:可以是本地路径的图片，也可以是网络上的图片</li><li><strong>图片title</strong>：是图片的标题，当鼠标移到图片上时显示的内容。<code>title</code>可加可不加</li></ul><div class="language-markdown line-numbers-mode" data-ext="md"><pre class="language-markdown"><code>本地图片
<span class="token url"><span class="token operator">!</span>[<span class="token content">拳头</span>](<span class="token url">/images/quantou.png</span> <span class="token string">&quot;拳头&quot;</span>)</span>
网络图片
<span class="token url"><span class="token operator">!</span>[<span class="token content">vue官网logo</span>](<span class="token url">https://cn.vuejs.org/images/logo.png</span> <span class="token string">&quot;vue官网logo&quot;</span>)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>效果</strong></p><p>本地图片 <img src="`+u+`" alt="拳头" title="拳头"></p><p>网络图片 <img src="https://cn.vuejs.org/images/logo.png" alt="vue官网logo" title="vue官网logo"></p><div class="custom-container warning"><p class="custom-container-title">注意</p><p>中括号与小括号之间是没有空格的</p></div><h2 id="六、超链接" tabindex="-1"><a class="header-anchor" href="#六、超链接" aria-hidden="true">#</a> 六、超链接</h2><p><strong>格式</strong>：[超链接名] (超链接地址 &quot;超链接title&quot;)</p><ul><li><code>title</code>可加可不加</li></ul><div class="language-markdown line-numbers-mode" data-ext="md"><pre class="language-markdown"><code><span class="token url">[<span class="token content">FullStackNotes</span>](<span class="token url">http://linwei-zhang.gitee.io/full-stack-notes/</span>)</span>
<span class="token url">[<span class="token content">百度</span>](<span class="token url">http://baidu.com</span>)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>效果</strong></p>`,40),b={href:"http://linwei-zhang.gitee.io/full-stack-notes/",target:"_blank",rel:"noopener noreferrer"},h={href:"http://baidu.com",target:"_blank",rel:"noopener noreferrer"},x=e(`<h2 id="七、内部链接" tabindex="-1"><a class="header-anchor" href="#七、内部链接" aria-hidden="true">#</a> 七、内部链接</h2><p>网站内部的链接，将会被转换成 <code>&lt;router-link&gt;</code>用于 <code>SPA</code> 导航。</p><p>同时，站内的每一个文件夹下的<code>README.md</code>或者 <code>index.md</code> 文件都会被自动编译为<code>index.html</code>，对应的链接将被视为<code>/</code>。</p><div class="language-markdown line-numbers-mode" data-ext="md"><pre class="language-markdown"><code>以如下的文件结构为例：
.
├─ README.md
├─ foo
│  ├─ README.md
│  ├─ HAHA.md
│  └─ HEIHEI.md
└─ bar
   ├─ README.md
   ├─ Hello.md
   └─ Hei.md
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>效果</strong></p><div class="language-markdown line-numbers-mode" data-ext="md"><pre class="language-markdown"><code>假设你现在在 foo/HAHA.md 中：
<span class="token url">[<span class="token content">Home</span>](<span class="token url">/</span>)</span> <span class="token comment">&lt;!-- 跳转到根部的 README.md --&gt;</span>
<span class="token url">[<span class="token content">foo</span>](<span class="token url">/foo/</span>)</span> <span class="token comment">&lt;!-- 跳转到 foo 文件夹的 index.html --&gt;</span>
<span class="token url">[<span class="token content">foo</span>](<span class="token url">./HEIHEI</span>)</span> <span class="token comment">&lt;!-- 跳转到 HEIHEI 文件 --&gt;</span>
<span class="token url">[<span class="token content">foo heading</span>](<span class="token url">./#heading</span>)</span> <span class="token comment">&lt;!-- 跳转到 foo/index.html 的特定标题位置 --&gt;</span>
<span class="token url">[<span class="token content">bar - Hello</span>](<span class="token url">../bar/Hello.md</span>)</span> <span class="token comment">&lt;!-- 具体文件可以使用 .md 结尾（推荐） --&gt;</span>
<span class="token url">[<span class="token content">bar - Hei</span>](<span class="token url">../bar/Hei.html</span>)</span> <span class="token comment">&lt;!-- 也可以用 .html --&gt;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="八、列表" tabindex="-1"><a class="header-anchor" href="#八、列表" aria-hidden="true">#</a> 八、列表</h2><div class="language-markdown line-numbers-mode" data-ext="md"><pre class="language-markdown"><code>无序列表
<span class="token list punctuation">-</span> 列表内容1
<span class="token list punctuation">+</span> 列表内容2
<span class="token list punctuation">*</span> 列表内容3
有序列表
<span class="token list punctuation">1.</span> 列表内容
<span class="token list punctuation">2.</span> 列表内容
<span class="token list punctuation">3.</span> 列表内容
列表嵌套
<span class="token list punctuation">+</span> 一级无序列表内容1
   <span class="token list punctuation">1.</span> 二级有序列表内容11
   <span class="token list punctuation">2.</span> 二级有序列表内容12
   <span class="token list punctuation">3.</span> 二级有序列表内容13
<span class="token list punctuation">+</span> 一级无序列表内容2
   <span class="token list punctuation">1.</span> 二级有序列表内容21
   <span class="token list punctuation">2.</span> 二级有序列表内容22
   <span class="token list punctuation">3.</span> 二级有序列表内容23
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>效果</strong></p><p>无序列表</p><ul><li>列表内容1</li></ul><ul><li>列表内容2</li></ul><ul><li>列表内容3 有序列表</li></ul><ol><li>列表内容</li><li>列表内容</li><li>列表内容 列表嵌套</li></ol><ul><li>一级无序列表内容1 <ol><li>二级有序列表内容11</li><li>二级有序列表内容12</li><li>二级有序列表内容13</li></ol></li><li>一级无序列表内容2 <ol><li>二级有序列表内容21</li><li>二级有序列表内容22</li><li>二级有序列表内容23</li></ol></li></ul><h2 id="九、表格" tabindex="-1"><a class="header-anchor" href="#九、表格" aria-hidden="true">#</a> 九、表格</h2><div class="language-markdown line-numbers-mode" data-ext="md"><pre class="language-markdown"><code>表头|表头|表头
---|:--:|---:
内容|内容|内容
内容|内容|内容

-第二行分割表头和内容。- 有一个就行，为了书写对齐，多加了几个，内容会自动撑开表格宽度
-文字默认居左
-在第二行“--”两边加“：”表示文字居中
-在第二行“--”右边加“：”表示文字居右
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>效果</strong></p><table><thead><tr><th>姓名</th><th style="text-align:center;">年龄</th><th style="text-align:right;">国家</th></tr></thead><tbody><tr><td>内容默认居左</td><td style="text-align:center;">内容居中</td><td style="text-align:right;">内容居右</td></tr><tr><td>张三</td><td style="text-align:center;">19</td><td style="text-align:right;">中华人民共和国</td></tr><tr><td>李四</td><td style="text-align:center;">29</td><td style="text-align:right;">中国</td></tr><tr><td>王麻子</td><td style="text-align:center;">18</td><td style="text-align:right;">中华人民共和国</td></tr></tbody></table><h2 id="十、代码块儿" tabindex="-1"><a class="header-anchor" href="#十、代码块儿" aria-hidden="true">#</a> 十、代码块儿</h2><div class="language-markdown line-numbers-mode" data-ext="md"><pre class="language-markdown"><code>单行代码：
<span class="token code-snippet code keyword">\`create database test;\`</span>
代码块：
<span class="token code"><span class="token punctuation">\`\`\`</span><span class="token code-language"> js {3-6}</span>
<span class="token code-block language-js language-js language-js">  <span class="token keyword">function</span> <span class="token function">show</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
           console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">&quot;这里是js代码&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
           console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">&quot;这一行是高亮的&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
           console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">&quot;这一行是高亮的&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
           console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">&quot;这一行是高亮的&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
      <span class="token punctuation">}</span></span>
<span class="token punctuation">\`\`\`</span></span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>效果</strong></p><p><img src="`+v+`" alt="image-20230411234752717"></p><h2 id="十一、文字位置" tabindex="-1"><a class="header-anchor" href="#十一、文字位置" aria-hidden="true">#</a> 十一、文字位置</h2><div class="language-markdown line-numbers-mode" data-ext="md"><pre class="language-markdown"><code>居中：
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>center</span><span class="token punctuation">&gt;</span></span>文字居中<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>center</span><span class="token punctuation">&gt;</span></span>
右对齐：
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>p</span> <span class="token attr-name">align</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>right<span class="token punctuation">&quot;</span></span><span class="token punctuation">&gt;</span></span>右对齐<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>p</span><span class="token punctuation">&gt;</span></span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>效果</strong></p><p><strong>居中：</strong></p>`,27),w=e(`<p><strong>右对齐：</strong></p><p align="right">右对齐</p><h2 id="十二、提示信息" tabindex="-1"><a class="header-anchor" href="#十二、提示信息" aria-hidden="true">#</a> 十二、提示信息</h2><div class="language-markdown line-numbers-mode" data-ext="md"><pre class="language-markdown"><code>::: tip 提示
这是一个tip，使用了别名“提示”
:::
::: warning
这是一个warning，没有使用别名
:::
::: danger
这是一个danger，没有使用别名
:::
::: details 请看详情
这是一个details，使用了别名“请看详情”
:::
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>效果</strong></p><div class="custom-container tip"><p class="custom-container-title">提示</p><p>这是一个tip，使用了别名“提示”</p></div><div class="custom-container warning"><p class="custom-container-title">注意</p><p>这是一个warning，没有使用别名</p></div><div class="custom-container danger"><p class="custom-container-title">警告</p><p>这是一个danger，没有使用别名</p></div><details class="custom-container details"><summary>请看详情</summary><p>这是一个details，使用了别名“请看详情”</p></details><h2 id="十三、emoji表情" tabindex="-1"><a class="header-anchor" href="#十三、emoji表情" aria-hidden="true">#</a> 十三、Emoji表情</h2><p>使用表情有两种方式</p><ul><li>使用代码</li><li>直接复制粘贴</li></ul><div class="language-markdown line-numbers-mode" data-ext="md"><pre class="language-markdown"><code>使用代码
  :tada: 
  :100: 
  :game_die:
复制粘贴
🐰 
🐺 
🐸
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>效果</strong></p><p>使用代码 🎉 💯 🎲</p><p>复制粘贴 🐰 🐺 🐸</p><h2 id="十四、显示目录" tabindex="-1"><a class="header-anchor" href="#十四、显示目录" aria-hidden="true">#</a> 十四、显示目录</h2><div class="language-markdown line-numbers-mode" data-ext="md"><pre class="language-markdown"><code>[[toc]]
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p><strong>效果</strong></p><p><img src="`+m+'" alt="image-20230411235400168"></p>',20);function f(_,q){const t=i("ExternalLinkIcon"),l=i("center");return c(),d("div",null,[g,n("p",null,[n("a",b,[s("FullStackNotes"),a(t)])]),n("p",null,[n("a",h,[s("百度"),a(t)])]),x,a(l,null,{default:p(()=>[s("文字居中")]),_:1}),w])}const H=o(k,[["render",f],["__file","MarkDownCMD.html.vue"]]);export{H as default};
