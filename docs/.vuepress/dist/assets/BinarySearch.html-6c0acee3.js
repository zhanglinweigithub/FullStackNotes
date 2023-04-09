import{_ as n,p as s,q as a,a1 as p}from"./framework-5866ffd3.js";const e="/FullStackNotes/assets/image-20230407135510522-e00c3795.png",t={},o=p('<h1 id="二分查找" tabindex="-1"><a class="header-anchor" href="#二分查找" aria-hidden="true">#</a> 二分查找</h1><p>二分查找（Binary Search）算法，也叫折半查找算法</p><p>使用二分查找的前提，必须是一个有序的数据集合</p><p><strong>查找原理</strong>：每次都通过跟区间的中间元素对比，将待查找的区间缩小为之前的一半，直到找到要查找的元素，或者区间被缩小为 0</p><blockquote><p>若要查找的元素比中间元素大，则丢弃左侧元素，对右侧元素重复该步骤，反之亦然。</p></blockquote><blockquote><p>数组：1, 2, 4, 5, 6, 7, 9, 12, 15, 19, 23, 26, 29, 34, 39</p><p>查找：26</p></blockquote><p><img src="'+e+`" alt="image-20230407135510522"></p><p>如果中间值大于查找值，则往数组的左边继续查找，如果小于查找值这往右边继续查找</p><div class="language-java line-numbers-mode" data-ext="java"><pre class="language-java"><code><span class="token doc-comment comment">/**
     *
     * <span class="token keyword">@param</span> <span class="token parameter">nums</span>  数组
     * <span class="token keyword">@param</span> <span class="token parameter">n</span>     数组长度
     * <span class="token keyword">@param</span> <span class="token parameter">value</span> 要查找的值
     * <span class="token keyword">@return</span>
     */</span>
<span class="token keyword">private</span> <span class="token keyword">static</span> <span class="token keyword">int</span> <span class="token function">bserach</span><span class="token punctuation">(</span><span class="token keyword">int</span><span class="token punctuation">[</span><span class="token punctuation">]</span> nums<span class="token punctuation">,</span> <span class="token keyword">int</span> n<span class="token punctuation">,</span> <span class="token keyword">int</span> value<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">int</span> low <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span>
        <span class="token keyword">int</span> high <span class="token operator">=</span> n <span class="token operator">-</span> <span class="token number">1</span><span class="token punctuation">;</span>
        <span class="token keyword">while</span> <span class="token punctuation">(</span>low <span class="token operator">&lt;=</span> high<span class="token punctuation">)</span> <span class="token punctuation">{</span>
            <span class="token comment">// 找出中间下标 </span>
            <span class="token keyword">int</span> mid <span class="token operator">=</span> low <span class="token operator">+</span> <span class="token punctuation">(</span><span class="token punctuation">(</span>high <span class="token operator">-</span> low<span class="token punctuation">)</span> <span class="token operator">&gt;&gt;</span> <span class="token number">1</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token keyword">if</span> <span class="token punctuation">(</span>nums<span class="token punctuation">[</span>mid<span class="token punctuation">]</span> <span class="token operator">&gt;</span> value<span class="token punctuation">)</span> <span class="token punctuation">{</span>
                high <span class="token operator">=</span> mid <span class="token operator">-</span> <span class="token number">1</span><span class="token punctuation">;</span>
            <span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token keyword">if</span> <span class="token punctuation">(</span>nums<span class="token punctuation">[</span>mid<span class="token punctuation">]</span> <span class="token operator">&lt;</span> value<span class="token punctuation">)</span> <span class="token punctuation">{</span>
                low <span class="token operator">=</span> mid <span class="token operator">+</span> <span class="token number">1</span><span class="token punctuation">;</span>
            <span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token punctuation">{</span>
                <span class="token keyword">return</span> mid<span class="token punctuation">;</span>
            <span class="token punctuation">}</span>
        <span class="token punctuation">}</span>

        <span class="token keyword">return</span> <span class="token operator">-</span><span class="token number">1</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,9),c=[o];function l(i,u){return s(),a("div",null,c)}const k=n(t,[["render",l],["__file","BinarySearch.html.vue"]]);export{k as default};
