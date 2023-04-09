import{_ as d,M as l,p as t,q as c,R as e,N as s,V as a,t as n,a1 as r}from"./framework-5866ffd3.js";const u="/FullStackNotes/assets/1674453481772-65ac3f24-6c88-4ed0-ad18-f9128d02c2e7-341aa459.png",v={},m=e("h1",{id:"目录",tabindex:"-1"},[e("a",{class:"header-anchor",href:"#目录","aria-hidden":"true"},"#"),n(" 目录")],-1),o=e("p",null,[e("strong",null,"命令比较多，建议使用 CTRL + F 进行搜索")],-1),g={class:"table-of-contents"},b=r('<h1 id="git常用命令" tabindex="-1"><a class="header-anchor" href="#git常用命令" aria-hidden="true">#</a> Git常用命令</h1><p><img src="'+u+`" alt="image.png"></p><blockquote><p>本地仓库：是在开发人员自己电脑上的Git仓库,存放我们的代码(.git 隐藏文件夹就是我们的本地仓库)</p><p>远程仓库：是在远程服务器上的Git仓库,存放代码(可以是github.com或者gitee.com 上的仓库,或者自己该公司的服务器)</p><p>工作区: 我们自己写代码(文档)的地方</p><p>暂存区: 在 本地仓库中的一个特殊的文件(index) 叫做暂存区,临时存储我们即将要提交的文件</p><hr><p>Clone：克隆，就是将远程仓库复制到本地仓库</p><p>Push：推送，就是将本地仓库代码上传到远程仓库</p><p>Pull：拉取，就是将远程仓库代码下载到本地仓库,并将代码 克隆到本地工作区</p></blockquote><h2 id="配置git" tabindex="-1"><a class="header-anchor" href="#配置git" aria-hidden="true">#</a> 配置Git</h2><div class="language-git line-numbers-mode" data-ext="git"><pre class="language-git"><code><span class="token comment"># 用户名</span>
git config --global user.name <span class="token string">&quot;Your Name&quot;</span>

<span class="token comment"># 邮箱</span>
git config --global user.email <span class="token string">&quot;email@example.com&quot;</span>

<span class="token comment"># 颜色</span>
git config --global color.ui true
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="初始化" tabindex="-1"><a class="header-anchor" href="#初始化" aria-hidden="true">#</a> 初始化</h2><div class="language-git line-numbers-mode" data-ext="git"><pre class="language-git"><code><span class="token comment"># 创建项目文件夹</span>
mkdir project

<span class="token comment"># 进入到文件夹里</span>
cd project

<span class="token comment"># 初始化Git</span>
git init
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="克隆代码" tabindex="-1"><a class="header-anchor" href="#克隆代码" aria-hidden="true">#</a> 克隆代码</h2><div class="language-git line-numbers-mode" data-ext="git"><pre class="language-git"><code>git clone https://github.com/username/xxxx.git
或
git clone git@github.com:username/xxxx.git
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="克隆指定分支代码" tabindex="-1"><a class="header-anchor" href="#克隆指定分支代码" aria-hidden="true">#</a> 克隆指定分支代码</h2><div class="language-git line-numbers-mode" data-ext="git"><pre class="language-git"><code>git clone -b 分支名 仓库地址
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h2 id="关联远程仓库" tabindex="-1"><a class="header-anchor" href="#关联远程仓库" aria-hidden="true">#</a> 关联远程仓库</h2><div class="language-git line-numbers-mode" data-ext="git"><pre class="language-git"><code>git remote add origin 仓库地址
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><blockquote><p>origin 可以自己起名</p></blockquote><h2 id="查看远程仓库连接信息-fetch抓取-push推送" tabindex="-1"><a class="header-anchor" href="#查看远程仓库连接信息-fetch抓取-push推送" aria-hidden="true">#</a> 查看远程仓库连接信息(fetch抓取，push推送)</h2><div class="language-git line-numbers-mode" data-ext="git"><pre class="language-git"><code><span class="token comment"># 查看远程仓库连接信息(fetch抓取，push推送)</span>
git remote -v
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="拉取代码" tabindex="-1"><a class="header-anchor" href="#拉取代码" aria-hidden="true">#</a> 拉取代码</h2><div class="language-git line-numbers-mode" data-ext="git"><pre class="language-git"><code>git pull
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h2 id="工作空间操作" tabindex="-1"><a class="header-anchor" href="#工作空间操作" aria-hidden="true">#</a> 工作空间操作</h2><div class="language-git line-numbers-mode" data-ext="git"><pre class="language-git"><code>git stash

<span class="token comment"># 查看保存的修改</span>
git stash list

<span class="token comment"># 从保存的修改恢复（不会删除）</span>
git stash apply 

<span class="token comment"># 若存在多个保存的工作空间(n为序号0开始，不会删除)</span>
git stash apply stash@{n} 

<span class="token comment"># 删除保存的修改</span>
git stash drop

<span class="token comment"># 若存在多个保存的工作空间(n为序号0开始)</span>
git stash drop stash@{n} 

<span class="token comment"># 从保存的修改恢复并删除保存的修改</span>
git stash pop

<span class="token comment"># 若存在多个保存的工作空间(n为序号0开始)</span>
git stash pop stash@{n} 
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="分支操作" tabindex="-1"><a class="header-anchor" href="#分支操作" aria-hidden="true">#</a> 分支操作</h2><div class="language-git line-numbers-mode" data-ext="git"><pre class="language-git"><code><span class="token comment"># 创建分支</span>
git branch 分支名

<span class="token comment"># 查看分支</span>
git branch

<span class="token comment"># 查看所有分支 本地+远程，远程分支会以红色标出，当前分支前面会标一个\`*\`号</span>
git branch -a

<span class="token comment"># 切换分支</span>
<span class="token comment"># 老版本</span>
git checkout 分支名
<span class="token comment"># 新版本</span>
git switch 分支名

<span class="token comment"># 创建分支并切换</span>
<span class="token comment"># 老版本</span>
git checkout -b 分支名
<span class="token comment"># 新版本</span>
git switch -c 分支名

<span class="token comment"># 删除分支</span>
git branch -d 分支名

<span class="token comment"># 强行删除分支</span>
git branch -D 分支名
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="撤销操作" tabindex="-1"><a class="header-anchor" href="#撤销操作" aria-hidden="true">#</a> 撤销操作</h2><div class="language-git line-numbers-mode" data-ext="git"><pre class="language-git"><code><span class="token comment"># 撤销到最近一次\`git add\`或\`git commit\`之前的状态</span>
git checkout -- 文件名

<span class="token comment"># 撤销暂存区的修改(\`git commit\`之前)</span>
git reset HEAD 文件名
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="标签操作" tabindex="-1"><a class="header-anchor" href="#标签操作" aria-hidden="true">#</a> 标签操作</h2><div class="language-git line-numbers-mode" data-ext="git"><pre class="language-git"><code><span class="token comment"># 打标签</span>
git tag v1.0 commit的id(不加则为之后的commit添加标签)
git tag -a v1.0 -m <span class="token string">&quot;提交备注&quot;</span> commit的id(不加则为之后的commit添加标签)

<span class="token comment"># 查看所有标签</span>
git tag

<span class="token comment"># 查看标签信息</span>
git show v1.0

<span class="token comment"># 推送某个标签到远程</span>
git push origin v1.0

<span class="token comment"># 推送全部尚未推送的标签</span>
git push origin --tags

<span class="token comment"># 删除本地标签</span>
git tag -d v0.1

<span class="token comment"># 删除远程标签</span>
git push origin :refs/tags/v1.0
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="将其他分支上的提交应用到当前分支" tabindex="-1"><a class="header-anchor" href="#将其他分支上的提交应用到当前分支" aria-hidden="true">#</a> 将其他分支上的提交应用到当前分支</h2><div class="language-git line-numbers-mode" data-ext="git"><pre class="language-git"><code>git cherry-pick commit的编号
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h2 id="将本地分支与远程分支关联" tabindex="-1"><a class="header-anchor" href="#将本地分支与远程分支关联" aria-hidden="true">#</a> 将本地分支与远程分支关联</h2><div class="language-git line-numbers-mode" data-ext="git"><pre class="language-git"><code>git branch --set-upstream-to 分支名 origin/分支名
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h2 id="将修改添加到暂存区" tabindex="-1"><a class="header-anchor" href="#将修改添加到暂存区" aria-hidden="true">#</a> 将修改添加到暂存区</h2><div class="language-git line-numbers-mode" data-ext="git"><pre class="language-git"><code><span class="token comment"># 将修改添加到暂存区</span>
git add 文件名

<span class="token comment"># -f 为强制添加，可提交.gitignore中配置的文件</span>
git add -f 文件名

<span class="token comment"># 将所有文件添加到暂存区</span>
git add .

<span class="token comment"># 提交暂存区内容</span>
<span class="token comment"># -m 添加提交备注</span>
<span class="token comment"># git commit 之前需先 git add .  , commit 只负责提交暂存区的内容</span>
git commit -m <span class="token string">&quot;提交备注&quot;</span>

<span class="token comment"># 查看刚才提交了什么</span>
git show		或		git log -n1 -p
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="提交暂存区内容" tabindex="-1"><a class="header-anchor" href="#提交暂存区内容" aria-hidden="true">#</a> 提交暂存区内容</h2><div class="language-git line-numbers-mode" data-ext="git"><pre class="language-git"><code><span class="token comment"># -m 添加提交备注</span>
<span class="token comment"># git commit 之前需先 git add，commit 只负责提交暂存区的内容</span>
git commit -m <span class="token string">&quot;提交备注&quot;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="查看当前仓库状态" tabindex="-1"><a class="header-anchor" href="#查看当前仓库状态" aria-hidden="true">#</a> 查看当前仓库状态</h2><div class="language-git line-numbers-mode" data-ext="git"><pre class="language-git"><code><span class="token comment"># 可以查看本地仓库与远程仓库内容不一样的文件</span>
git status
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="对比文件改动内容" tabindex="-1"><a class="header-anchor" href="#对比文件改动内容" aria-hidden="true">#</a> 对比文件改动内容</h2><div class="language-git line-numbers-mode" data-ext="git"><pre class="language-git"><code>git diff 文件名
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h2 id="查看git日志" tabindex="-1"><a class="header-anchor" href="#查看git日志" aria-hidden="true">#</a> 查看Git日志</h2><div class="language-git line-numbers-mode" data-ext="git"><pre class="language-git"><code><span class="token comment"># 如果想看到其它分支的提交记录需要先 git pull 一下</span>
git log
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="推送到远程库" tabindex="-1"><a class="header-anchor" href="#推送到远程库" aria-hidden="true">#</a> 推送到远程库</h2><div class="language-git line-numbers-mode" data-ext="git"><pre class="language-git"><code><span class="token comment"># 默认推送到当前所在分支</span>
git push origin 分支名
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="删除文件" tabindex="-1"><a class="header-anchor" href="#删除文件" aria-hidden="true">#</a> 删除文件</h2><div class="language-git line-numbers-mode" data-ext="git"><pre class="language-git"><code><span class="token comment"># 确定删除需要\`git commit\`，若误删可以使用\`git checkout -- 文件名\`</span>
git rm 文件名
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="版本回退到第n个版本前" tabindex="-1"><a class="header-anchor" href="#版本回退到第n个版本前" aria-hidden="true">#</a> 版本回退到第N个版本前</h2><div class="language-git line-numbers-mode" data-ext="git"><pre class="language-git"><code>git reset --hard HEAD~N
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h2 id="版本回退-切换-到指定版本" tabindex="-1"><a class="header-anchor" href="#版本回退-切换-到指定版本" aria-hidden="true">#</a> 版本回退(切换)到指定版本</h2><div class="language-git line-numbers-mode" data-ext="git"><pre class="language-git"><code><span class="token comment"># git每次提交的唯一十六进制的id，\`git log\`或者\`git reflog\`(记录每次一提交的信息)可以查看</span>
git reset --hard e475afc93c209a690c39c13a46716e8fa000c366(版本号，
这只是个例子，此值不必写全，只要能让git知道是哪个把那本就行，一般写5-6位即可)
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="合并某分支到当前分支" tabindex="-1"><a class="header-anchor" href="#合并某分支到当前分支" aria-hidden="true">#</a> 合并某分支到当前分支</h2><div class="language-git line-numbers-mode" data-ext="git"><pre class="language-git"><code><span class="token comment"># 若存在冲突会提示手动修改后再提交，\`git merge\`默认为\`fast forward\`模式</span>

<span class="token comment"># \`fast forward\`模式</span>
git merge 其他分支名

<span class="token comment"># 禁用\`Fast forward\`模式(\`--no-ff\`) **推荐**</span>
git merge --no-ff -m <span class="token string">&quot;提交备注&quot;</span> 其他分支名

<span class="token comment"># 用\`git log --graph --pretty=oneline --abbrev-commit\`命令可以看到分支合并图</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="把本地未push的分叉提交历史整理成直线" tabindex="-1"><a class="header-anchor" href="#把本地未push的分叉提交历史整理成直线" aria-hidden="true">#</a> 把本地未push的分叉提交历史整理成直线</h2><div class="language-git line-numbers-mode" data-ext="git"><pre class="language-git"><code>git rebase
<span class="token comment"># rebase的目的是使得我们在查看历史提交的变化时更容易，因为分叉的提交需要三方对比</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="同一套代码关联多个远程库-同时关联github和gitee为例" tabindex="-1"><a class="header-anchor" href="#同一套代码关联多个远程库-同时关联github和gitee为例" aria-hidden="true">#</a> 同一套代码关联多个远程库(同时关联github和gitee为例)</h2><div class="language-git line-numbers-mode" data-ext="git"><pre class="language-git"><code><span class="token comment"># 关联GitHub的远程库</span>
git remote add github git@github.com:username/xxxx.git

<span class="token comment"># 推送Github</span>
git push github 分支名

<span class="token comment"># 关联Gitee的远程库</span>
git remote add gitee git@gitee.com:username/xxxx.git

<span class="token comment"># 推送Gitee</span>
git push gitee 分支名
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="查看-gitignore文件中哪条规则写错了" tabindex="-1"><a class="header-anchor" href="#查看-gitignore文件中哪条规则写错了" aria-hidden="true">#</a> 查看.gitignore文件中哪条规则写错了</h2><div class="language-git line-numbers-mode" data-ext="git"><pre class="language-git"><code>git check-ignore -v 文件名
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h2 id="设置命令别名" tabindex="-1"><a class="header-anchor" href="#设置命令别名" aria-hidden="true">#</a> 设置命令别名</h2><div class="language-git line-numbers-mode" data-ext="git"><pre class="language-git"><code>git status\` =&gt; \`git st
git config --global alias.st status

git reset HEAD file\` =&gt; \`git unstage
git config --global alias.unstage <span class="token string">&#39;reset HEAD&#39;</span>

git log --color --graph --pretty=format:<span class="token string">&#39;%Cred%h%Creset -%C(yellow)%d%Creset %s %Cgreen(%cr) %C(bold blue)&lt;%an&gt;%Creset&#39;</span> --abbrev-commit\` =&gt; \`git lg
git config --global alias.lg <span class="token string">&quot;log --color --graph --pretty=format:&#39;%Cred%h%Creset -%C(yellow)%d%Creset %s %Cgreen(%cr) %C(bold blue)&lt;%an&gt;%Creset&#39; --abbrev-commit&quot;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h1 id="基本操作" tabindex="-1"><a class="header-anchor" href="#基本操作" aria-hidden="true">#</a> 基本操作</h1><div class="language-git line-numbers-mode" data-ext="git"><pre class="language-git"><code><span class="token comment"># 1、配置用户名和邮箱</span>
<span class="token comment"># 用户名</span>
git config --global user.name <span class="token string">&quot;Your Name&quot;</span>

<span class="token comment"># 邮箱</span>
git config --global user.email <span class="token string">&quot;email@example.com&quot;</span>

<span class="token comment"># 2、克隆代码</span>
git clone https://github.com/username/xxxx.git

<span class="token comment"># 3、拉取代码</span>
git pull

<span class="token comment"># 4、切换分支</span>
git checkout 分支名

<span class="token comment"># 5、开始编码</span>

<span class="token comment"># = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = =</span>
<span class="token comment"># 编码结束，提交代码</span>
<span class="token comment"># 1、拉取代码</span>
git pull

<span class="token comment"># 2、查看仓库状态</span>
git status

<span class="token comment"># 3、添加改动到暂存区</span>
git add 文件名

<span class="token comment"># 4、提交暂存区文件</span>
git commit -m <span class="token string">&quot;提交备注&quot;</span>

<span class="token comment"># 5、推送到远程仓库</span>
git push
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,60);function p(h,f){const i=l("router-link");return t(),c("div",null,[m,o,e("nav",g,[e("ul",null,[e("li",null,[s(i,{to:"#配置git"},{default:a(()=>[n("配置Git")]),_:1})]),e("li",null,[s(i,{to:"#初始化"},{default:a(()=>[n("初始化")]),_:1})]),e("li",null,[s(i,{to:"#克隆代码"},{default:a(()=>[n("克隆代码")]),_:1})]),e("li",null,[s(i,{to:"#克隆指定分支代码"},{default:a(()=>[n("克隆指定分支代码")]),_:1})]),e("li",null,[s(i,{to:"#关联远程仓库"},{default:a(()=>[n("关联远程仓库")]),_:1})]),e("li",null,[s(i,{to:"#查看远程仓库连接信息-fetch抓取-push推送"},{default:a(()=>[n("查看远程仓库连接信息(fetch抓取，push推送)")]),_:1})]),e("li",null,[s(i,{to:"#拉取代码"},{default:a(()=>[n("拉取代码")]),_:1})]),e("li",null,[s(i,{to:"#工作空间操作"},{default:a(()=>[n("工作空间操作")]),_:1})]),e("li",null,[s(i,{to:"#分支操作"},{default:a(()=>[n("分支操作")]),_:1})]),e("li",null,[s(i,{to:"#撤销操作"},{default:a(()=>[n("撤销操作")]),_:1})]),e("li",null,[s(i,{to:"#标签操作"},{default:a(()=>[n("标签操作")]),_:1})]),e("li",null,[s(i,{to:"#将其他分支上的提交应用到当前分支"},{default:a(()=>[n("将其他分支上的提交应用到当前分支")]),_:1})]),e("li",null,[s(i,{to:"#将本地分支与远程分支关联"},{default:a(()=>[n("将本地分支与远程分支关联")]),_:1})]),e("li",null,[s(i,{to:"#将修改添加到暂存区"},{default:a(()=>[n("将修改添加到暂存区")]),_:1})]),e("li",null,[s(i,{to:"#提交暂存区内容"},{default:a(()=>[n("提交暂存区内容")]),_:1})]),e("li",null,[s(i,{to:"#查看当前仓库状态"},{default:a(()=>[n("查看当前仓库状态")]),_:1})]),e("li",null,[s(i,{to:"#对比文件改动内容"},{default:a(()=>[n("对比文件改动内容")]),_:1})]),e("li",null,[s(i,{to:"#查看git日志"},{default:a(()=>[n("查看Git日志")]),_:1})]),e("li",null,[s(i,{to:"#推送到远程库"},{default:a(()=>[n("推送到远程库")]),_:1})]),e("li",null,[s(i,{to:"#删除文件"},{default:a(()=>[n("删除文件")]),_:1})]),e("li",null,[s(i,{to:"#版本回退到第n个版本前"},{default:a(()=>[n("版本回退到第N个版本前")]),_:1})]),e("li",null,[s(i,{to:"#版本回退-切换-到指定版本"},{default:a(()=>[n("版本回退(切换)到指定版本")]),_:1})]),e("li",null,[s(i,{to:"#合并某分支到当前分支"},{default:a(()=>[n("合并某分支到当前分支")]),_:1})]),e("li",null,[s(i,{to:"#把本地未push的分叉提交历史整理成直线"},{default:a(()=>[n("把本地未push的分叉提交历史整理成直线")]),_:1})]),e("li",null,[s(i,{to:"#同一套代码关联多个远程库-同时关联github和gitee为例"},{default:a(()=>[n("同一套代码关联多个远程库(同时关联github和gitee为例)")]),_:1})]),e("li",null,[s(i,{to:"#查看-gitignore文件中哪条规则写错了"},{default:a(()=>[n("查看.gitignore文件中哪条规则写错了")]),_:1})]),e("li",null,[s(i,{to:"#设置命令别名"},{default:a(()=>[n("设置命令别名")]),_:1})])])]),b])}const x=d(v,[["render",p],["__file","Git.html.vue"]]);export{x as default};
