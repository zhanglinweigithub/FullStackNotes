import{_ as n,p as s,q as a,a1 as p}from"./framework-5866ffd3.js";const t="/FullStackNotes/assets/image-20230407132058732-6794479f.png",e={},o=p('<h1 id="希尔排序" tabindex="-1"><a class="header-anchor" href="#希尔排序" aria-hidden="true">#</a> 希尔排序</h1><p>希尔排序（Shell Sort）是插入排序的一种，又称“缩小增量排序”，是插入排序算法的一种更高效的改进版本。</p><blockquote><p>排序前：{9,1,2,5,7,4,8,6,3,5}</p><p>排序后：{1,2,3,4,5,5,6,7,8,9}</p></blockquote><p><strong>排序原理</strong>：</p><p>1.选定一个增长量h，按照增长量h作为数据分组的依据，对数据进行分组；</p><p>2.对分好组的每一组数据完成插入排序；</p><p>3.减小增长量，最小减为1，重复第二步操作。</p><p><img src="'+t+`" alt="image-20230407132058732"></p><div class="language-java line-numbers-mode" data-ext="java"><pre class="language-java"><code><span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">Shell</span> <span class="token punctuation">{</span>
    <span class="token comment">/*
    对数组a中的元素进行排序
    */</span>
    <span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token keyword">void</span> <span class="token function">sort</span><span class="token punctuation">(</span><span class="token class-name">Comparable</span><span class="token punctuation">[</span><span class="token punctuation">]</span> a<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">int</span> <span class="token class-name">N</span> <span class="token operator">=</span> a<span class="token punctuation">.</span>length<span class="token punctuation">;</span>
		<span class="token comment">//确定增长量h的最大值</span>
        <span class="token keyword">int</span> h <span class="token operator">=</span> <span class="token number">1</span><span class="token punctuation">;</span>
        <span class="token keyword">while</span> <span class="token punctuation">(</span>h <span class="token operator">&lt;</span> <span class="token class-name">N</span> <span class="token operator">/</span> <span class="token number">2</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
            h <span class="token operator">=</span> h <span class="token operator">*</span> <span class="token number">2</span> <span class="token operator">+</span> <span class="token number">1</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
		<span class="token comment">//当增长量h小于1，排序结束</span>
        <span class="token keyword">while</span> <span class="token punctuation">(</span>h <span class="token operator">&gt;=</span> <span class="token number">1</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
			<span class="token comment">//找到待插入的元素</span>
            <span class="token keyword">for</span> <span class="token punctuation">(</span><span class="token keyword">int</span> i <span class="token operator">=</span> h<span class="token punctuation">;</span> i <span class="token operator">&lt;</span> <span class="token class-name">N</span><span class="token punctuation">;</span> i<span class="token operator">++</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
				<span class="token comment">//a[i]就是待插入的元素</span>
				<span class="token comment">//把a[i]插入到a[i-h],a[i-2h],a[i-3h]...序列中</span>
                <span class="token keyword">for</span> <span class="token punctuation">(</span><span class="token keyword">int</span> j <span class="token operator">=</span> i<span class="token punctuation">;</span> j <span class="token operator">&gt;=</span> h<span class="token punctuation">;</span> j <span class="token operator">-=</span> h<span class="token punctuation">)</span> <span class="token punctuation">{</span>
					<span class="token comment">//a[j]就是待插入元素，依次和a[j-h],a[j-2h],a[j-3h]进行比较，如果a[j]小，那么</span>
                    <span class="token comment">//交换位置，如果不小于，a[j] 大，则插入完成。</span>
                    <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token function">greater</span><span class="token punctuation">(</span>a<span class="token punctuation">[</span>j <span class="token operator">-</span> h<span class="token punctuation">]</span><span class="token punctuation">,</span> a<span class="token punctuation">[</span>j<span class="token punctuation">]</span><span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
                        <span class="token function">exch</span><span class="token punctuation">(</span>a<span class="token punctuation">,</span> j<span class="token punctuation">,</span> j <span class="token operator">-</span> h<span class="token punctuation">)</span><span class="token punctuation">;</span>
                    <span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token punctuation">{</span>
                        <span class="token keyword">break</span><span class="token punctuation">;</span>
                    <span class="token punctuation">}</span>
                <span class="token punctuation">}</span>
            <span class="token punctuation">}</span>
            h <span class="token operator">/=</span> <span class="token number">2</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>

    <span class="token comment">/*
    比较v元素是否大于w元素
    */</span>
    <span class="token keyword">private</span> <span class="token keyword">static</span> <span class="token keyword">boolean</span> <span class="token function">greater</span><span class="token punctuation">(</span><span class="token class-name">Comparable</span> v<span class="token punctuation">,</span> <span class="token class-name">Comparable</span> w<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">return</span> v<span class="token punctuation">.</span><span class="token function">compareTo</span><span class="token punctuation">(</span>w<span class="token punctuation">)</span> <span class="token operator">&gt;</span> <span class="token number">0</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token comment">/*
    数组元素i和j交换位置
    */</span>
    <span class="token keyword">private</span> <span class="token keyword">static</span> <span class="token keyword">void</span> <span class="token function">exch</span><span class="token punctuation">(</span><span class="token class-name">Comparable</span><span class="token punctuation">[</span><span class="token punctuation">]</span> a<span class="token punctuation">,</span> <span class="token keyword">int</span> i<span class="token punctuation">,</span> <span class="token keyword">int</span> j<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token class-name">Comparable</span> t <span class="token operator">=</span> a<span class="token punctuation">[</span>i<span class="token punctuation">]</span><span class="token punctuation">;</span>
        a<span class="token punctuation">[</span>i<span class="token punctuation">]</span> <span class="token operator">=</span> a<span class="token punctuation">[</span>j<span class="token punctuation">]</span><span class="token punctuation">;</span>
        a<span class="token punctuation">[</span>j<span class="token punctuation">]</span> <span class="token operator">=</span> t<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,9),c=[o];function l(i,u){return s(),a("div",null,c)}const r=n(e,[["render",l],["__file","ShellSort.html.vue"]]);export{r as default};
