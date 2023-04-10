---
title: ref和slot
---
# 目录

[[toc]]

# ref引用

每个 `vue` 的组件实例上，都包含一个 `$refs` 对象，里面存储着对应的 `DOM` 元素或组件的引用

默认情况下， 组件的 `$refs` 指向一个空对象

## ref引用DOM元素
如果想要使用 `ref` 引用页面上的 `DOM` 元素，则可以按照如下的方式进行操作：
```vue
//使用 ref 属性，为对应的 DOM 添加引用名称
<h3 ref="myh3">MyRef组件</h3>
<button @click="getRef">获取 $refs 引用</button>

methods:{
    getRef(){
        //通过 this.$ref.引用的名称 可以获取到DOM元素的引用
        console.log(this.$ref.myh3)
        //操作 DOM 元素，把文本颜色改为红色
        this.$ref.myh3.style.color='red'
    }
}
```
## ref引用组件
如果想要使用 `ref` 引用页面上的组件实例（VC），则可以按照如下的方式进行操作
```vue
//使用 ref 属性，为对应的 "组件" 添加引用名称
<my-counter ref="counterRef"></my-counter>
<button @click="getRef">获取 $refs 引用</button>

methods:{
    getRef(){
        <!-- 通过 this.$ref.引用的名称 可以引用组件的实例 -->
        console.log(this.$ref.counterRef)
        <!--  引用到组件的实例之后，就可以调用组件上的 methods 方法 -->
        this.$ref.myh3.counterRef.add()
    }
}
```
## this.$nextTick(cb) 方法
组件的 `$nextTick(cb)` 方法，会把 `cb` 回调推迟到下一个 `DOM` 更新周期之后执行。

通俗的理解是：

- 等组件的 `DOM` 更新完成之后，再执行 `cb` 回调函数。
- 从而能保证 `cb` 回调函数可以操作到最新的 `DOM` 元素

```vue
<input v-if="inputVisible" type="text" ref="ipt">
<button v-else @click="showInput">展示input输入框</button>

methods:{
	showInput(){
		this.inputVisible = true
        <!-- 把对 input 文本框的操作，推迟到下次 DOM 更新之后。否则页面上根本不存在文本框元素 -->
		this.$nextTick(() => {
			this.$ref.ipt.focus()
		})
    }
}
```
# 插槽
插槽（Slot）是 `vue` 为组件的封装者提供的能力。

允许开发者在封装组件时，把不确定的、希望由用户指定的部分定义为插槽。

可以把插槽认为是组件封装期间，为用户预留的内容的占位符

## 基础用法
```vue
<template>
	<p>这是 MyCom1 组件的第一个 p 标签</p>
	<!-- 通过 slot 标签，为用户预留内容占位符（插槽） -->
	<slot></slot>
	<p>这是 MyCom1 组件的第二个 p 标签</p>
</template>

<!-- 使用组件时 -->
<my-com-1>
	<!-- 在使用 MyCom1 组件时，为插槽指定具体的内容 -->
    <p>~~~~~用户自定义的内容~~~~~</p>
</my-com-1>
```

- 如果在封装组件时没有预留任何 插槽，则用户提供的任何自定义内容都会被丢弃
```vue
<template>
	<p>这是 MyCom1 组件的第一个 p 标签</p>
	<p>这是 MyCom1 组件的第二个 p 标签</p>
</template>

<!-- 使用组件时 -->
<my-com-1>
	<!-- 自定义的内容会被丢弃 -->
    <p>~~~~~用户自定义的内容~~~~~</p>
</my-com-1>
```

- 封装组件时，可以为预留的插槽提供后备内容（默认内容）。
- 如果组件的使用者没有为插槽提供任何内容，则后备内容会生效
```vue
<template>
	<p>这是 MyCom1 组件的第一个 p 标签</p>
	<!-- 通过 slot 标签，为用户预留内容占位符（插槽） -->
	<slot>这是后背内容</slot>
	<p>这是 MyCom1 组件的第二个 p 标签</p>
</template>

<!-- 使用组件时 -->
<my-com-1>
	<!-- 没有为插槽提供任何 内容，则后备内容会生效 -->
</my-com-1>
```
## 具名插槽
如果在封装组件时需要预留多个插槽节点，则需要为每个 插槽指定具体的 `name` 名称。

这种带有具体 名称的插槽叫做“具名插槽”

```vue
<div class="container">
    <header>
        <!--我们希望把页头放在这里 -->
    	<slot name="header"></slot>
    </header>
    <main>
        <!--我们希望把主要内容放在这里 -->
    	<slot></slot>
    </main>
    <footer>
        <!--我们希望把页脚放在这里 -->
    	<slot name="footer"></slot>
    </footer>
</div>

<!-- 使用时 -->
<!-- 
	在向具名插槽提供内容的时候，我们可以在一个 <template> 元素上使用 v-slot 指令，并以 v-slot 的参数的
	形式提供其名称 
-->
<my-com-2>
	<template v-slot:header>
    	<h1>滕王阁</h1>
    </template>
    
    <template #default>
    	<h1>黄鹤楼</h1>
    </template>
    
    <template #footer>
    	<h1>铁浮图</h1>
    </template>
</my-com-2>
```

- 没有指定 `name` 名称的插槽， 会有隐含的名称叫做 “`default`”。
- v-slot:header 可简写为 #header
## 作用域插槽
在封装组件的过程中，可以为预留的 插槽绑定 `props` 数据，这种带有 `props` 数据的 叫做“作用 域插槽”
```vue
<tbody>
	<!-- 这是一个作用域插槽 -->
    <slot v-for="item in list" :user="item"></slot>
</tbody>

<!-- 使用时 -->
<my-com-3>
    <!-- 接收作用域插槽提供的数据 -->
	<template #default="scope">
		<!-- 使用作用域插槽的数据 -->
    	<p>{{ scope }}</p>
    </template>
</my-com-3>

<!-- 解构插槽 Prop -->
<!-- 作用域插槽对外提供的数据对象，可以使用解构赋值简化数据的接收过程 -->
<my-com-3>
    <!-- 接收作用域插槽提供的数据 -->
	<template #default="{user}">
		<p>{{ user.id }}</p>
    	<p>{{ user.name }}</p>
		<p>{{ user.age }}</p>
    </template>
</my-com-3>
```
