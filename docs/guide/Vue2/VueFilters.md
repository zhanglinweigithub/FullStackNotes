---
title: Vue过滤器
---
# 目录

[[toc]]

# Vue过滤器

过滤器仅在 vue 2.x 和 1.x 中受支持，在 vue 3.x 的版本中剔除了过滤器相关的功能。 

在企业级项目开发中： 

- 如果使用的是 2.x 版本的 vue，则依然可以使用过滤器相关的功能 
- 如果项目已经升级到了 3.x 版本的 vue，官方建议使用计算属性或方法代替被剔除的过滤器功能

具体的迁移指南，请参考 vue 3.x 的官方文档给出的说明： [https://v3.vuejs.org/guide/migration/filters.html#migration-strategy](https://v3.vuejs.org/guide/migration/filters.html#migration-strategy)

## 使用

过滤器（Filters）是 `vue` 为开发者提供的功能，常用于文本的格式化。

过滤器可以用在两个地方：

- 插值表达式
- v-bind 属性绑定

过滤器应该被添加在 `JavaScript` 表达式的尾部，由“管道符”进行调用

```vue
<!-- 通过 “管道符” 调用 capitalize 过滤器，对 message 的值进行格式化 -->
<p>{{ message | capitalize }}</p>

<!-- 通过 “管道符” 调用 formatId 过滤器，对 rawId 的值进行格式化 -->
<div v-bind:id="rawId | formatId"></div>

<!-- 串联调用过滤器 -->
<!-- 把 message 交给 filterA 进行处理，将处理结果交给 filterB继续处理 -->
{{ message | filterA | filterB }}

<!-- 过滤器传参 -->
<p>{{ message | filterA(arg1,arg2) }}</p>
<!-- 第一个参数永远是 “管道符” 前面待处理的值，从第二个参数开始，才是调用过滤器是传递过来的 arg1 和 arg2 参数 -->
Vue.filter('filterA',(msg,arg1,arg2) => {
	//过滤器代码逻辑
})
 
```
## 定义过滤器
在创建 `vue` 实例期间，可以在 `filters` 节点中定义过滤器，示例代码如下：
```javascript
//私有过滤器
const vm = new Vue({
  el: '#app',
  data: {
    message: 'hello vue.js',
    info: 'title info'
  },
  filters: {
    capitalize(str){ //str字符串转换成大写的过滤器
      return str.toUpperCase()
    }
  }
})
```
在 filters 节点下定义的过滤器，称为“私有过滤器”，因为它只能在当前 vm 实例所控制的 el 区域内使用
```javascript
//全局过滤器
//第一个参数：全局过滤器的名字
//第二个参数：全局过滤器要处理的参数
Vue.filter('capitalize',(str) => {
    return str.toUpperCase()
})
```
