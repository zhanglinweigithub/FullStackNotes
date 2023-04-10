---
title: 模块化
---
# 目录

[[toc]]

# 模块化

## 导出export

### 单个导出

 const、let、function

```js
export const a = 10;
export let b = 20;
export function c() {
    console.log('c');
}
```

### 一齐导出

```js
const a = 10;
let b = 20;
function c() {
    console.log('c')
}

export {a,b,c}
```

### 导出 default

default 只能有一个

```js
export const a = 10;
export let b = 20;
export function c() {
    console.log('c')
}

export default b;
```

## 导入import 

```html
<script type="module">
	import 语句
</script>
```

* import 需要遵循同源策略

### 整个导入

```js
import * as module from '/1.js'
console.log(module.a)		// 输出10
console.log(module.b)		// 输出20
module.c()					// 输出c
```

### 单个导入

```js
import {a,c} from '/1.js'
console.log(a)				// 输出10
c()							// 输出c
```

### 导入默认

```js
import x from '/1.js'
console.log(x)				// 输出20
```

