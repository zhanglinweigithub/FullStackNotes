---
title: Vue2
---
# **vue 项目的运行流程**

在工程化的项目中，`vue` 要做的事情很单纯：

通过 `main.js` 把 `App.vue` 渲染到 `index.html` 的指定区域中。 

- ① `App.vue` 用来编写待渲染的模板结构 	
- ② `index.html` 中需要预留一个 `el` 区域 	
- ③ `main.js` 把 `App.vue` 渲染到了 `index.html` 所预留的区域中

# **Vue 项目结构**

 D:\2022.JS\代码\第3章\CLIENT\SRC

├─assets

├─components

├─router

├─store

└─views


- assets - 静态资源
- components - 可重用组件
- router - 路由
- store - 数据共享
- views - 视图组件

以后还会添加

- api - 跟后台交互，发送 fetch、xhr 请求，接收响应
- plugins - 插件

# **Vue组成**

`Vue` 的组件文件以 `.vue` 结尾，每个组件由三部分组成

```vue
<template></template>

<script></script>

<style></style>
```

- template 模板部分，由它生成 html 代码
- script 代码部分，控制模板的数据来源和行为
- style 样式部分，一般不咋关心

入口组件是 App.vue

来个 Hello, World 例子
```vue
<template>
  <h1>{{msg}}</h1>
</template>

<script>
export default {
  data() {
    return {
      msg: "Hello, Vue!"
    }
  }
}
</script>
```

- export default 导出组件对象，供 main.js 导入使用
- 这个对象有一个 data 方法，返回一个**对象**，给 template 提供数据
- `{{}}` 在 Vue 里称之为插值表达式，用来**绑定** data 方法返回的**对象**属性，**绑定**的含义是数据发生变化时，页面显示会同步变化

