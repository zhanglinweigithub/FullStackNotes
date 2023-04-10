---
title: 运算符与表达式
---
# 目录
[[toc]]
## 运算符与表达式

* `+ - * / % ** ` 	
* `+= -= *= /= %= **=`
* `++ --`
* 位运算、移位运算
* `== != > >= < <=`
* `=== !==` 
* `&& || !`
* `?? ?.` 
* `...` 
* 解构赋值 



**：表示乘方  

3 ** 2  求3的平方



### ===

严格相等运算符，用作逻辑判等

```js
1 == 1    	// 返回 true 
1 == '1'	// 返回 true，会先将右侧的字符串转为数字，再做比较
1 === '1'	// 返回 false，类型不等，直接返回 false
```

typeof 查看某个值的类型

```js
typeof 1	// 返回 'number'
typeof '1'	// 返回 'string'
```



### ||

需求，如果参数 n 没有传递，给它一个【男】

**推荐**做法

```js
function test(n = '男') {
    console.log(n);
}
```

你可能的做法

```js
function test(n) {
    if(n === undefined) {
        n = '男';
    }
    console.log(n);
}
```

还可能是这样

```js
function test(n) {
    n = (n === undefined) ? '男' : n;
    console.log(n);
}
```

一些老旧代码中可能的做法（不推荐）

```js
function test(n) {
    n = n || '男';
    console.log(n);
}
```

它的语法是

```js
值1 || 值2
```

如果值1 是 Truthy，返回值1，如果值1 是 Falsy 返回值 2



### ?? 与 ?.

#### ??

需求，如果参数 n 没有传递或是 null，给它一个【男】

如果用传统办法

```js
function test(n) {
    if(n === undefined || n === null) {
        n = '男';
    }
    console.log(n);
}
```

用 ??

```js
function test(n) {
    n = n ?? '男';
    console.log(n);
}
```

语法

```
值1 ?? 值2
```

* 值1 是 nullish，返回值2
* 值1 不是 nullish，返回值1



#### ?.

需求，函数参数是一个对象，可能包含有子属性

例如，参数可能是

```js
let stu1 = {
    name:"张三",
    address: {
        city: '北京'
    }
};

let stu2 = {
    name:"李四"
}

let stu3 = {
    name:"李四",
    address: null
}
```

现在要访问子属性（有问题）

```js
function test(stu) {
    console.log(stu.address.city)
}
```

现在希望当某个属性是 nullish 时，短路并返回 undefined，可以用 ?.

```js
function test(stu) {
    console.log(stu.address?.city)
}
```

用传统办法 

```js
function test(stu) {
    if(stu.address === undefined || stu.address === null) {
        console.log(undefined);
        return;
    }
    console.log(stu.address.city)
}
```



### ...

展开运算符

作用1：打散数组，把元素传递给多个参数

```js
let arr = [1,2,3];

function test(a,b,c) {
    console.log(a,b,c);
}
```

需求，把数组元素依次传递给函数参数

传统写法

```js
test(arr[0],arr[1],arr[2]);		// 输出 1,2,3
```

展开运算符写法

```js
test(...arr);					// 输出 1,2,3
```

* 打散可以理解为【去掉了】数组外侧的中括号，只剩下数组元素



作用2：复制数组或对象

数组

```js
let arr1 = [1,2,3];
let arr2 = [...arr1];		// 复制数组
```

对象

```js
let obj1 = {name:'张三', age: 18};

let obj2 = {...obj1};		// 复制对象
```

**注意**：展开运算符复制属于浅拷贝，例如

```js
let o1 = {name:'张三', address: {city: '北京'} }

let o2 = {...o1};
```



作用3：合并数组或对象

合并数组

```js
let a1 = [1,2];
let a2 = [3,4];

let b1 = [...a1,...a2];		// 结果 [1,2,3,4]
let b2 = [...a2,5,...a1]	// 结果 [3,4,5,1,2]
```

合并对象

```js
let o1 = {name:'张三'};
let o2 = {age:18};
let o3 = {name:'李四'};

let n1 = {...o1, ...o2};	// 结果 {name:'张三',age:18}

let n2 = {...o3, ...o2, ...o1}; // 结果{name:'李四',age:18}
```

* 复制对象时出现同名属性，后面的会覆盖前面的



### [] {}

解构赋值

#### []

用在声明变量时

```js
let arr = [1,2,3];

let [a, b, c] = arr;	// 结果 a=1, b=2, c=3
```

用在声明参数时

```js
let arr = [1,2,3];

function test([a,b,c]) {
    console.log(a,b,c) 	// 结果 a=1, b=2, c=3
}

test(arr);				
```



#### {}

用在声明变量时,变量名称要跟对象属性名一致才能赋值，否则就是undefined,顺序并不影响

```js
let obj = {name:"张三", age:18};

let {name,age} = obj;	// 结果 name=张三, age=18

//变量名称要跟对象属性名一致才能赋值，否则就是undefined
let {name,sex} = obj;	// 结果 name=张三, sex=undefined
```

用在声明参数时

```js
let obj = {name:"张三", age:18};

function test({name, age}) {
    console.log(name, age); // 结果 name=张三, age=18
}

test(obj)
```
