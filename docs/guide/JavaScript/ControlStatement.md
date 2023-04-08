# 目录

[[toc]]

## 控制语句

* `if ... else`
* `switch`
* `while`
* `do ... while`
* `for` 
* `for ... in` 
* `for ... of` 
* `try ... catch` 

前5个应该都很熟悉把，想必不会有人不会

### for in

主要用来遍历对象

```js
let father = {name:'张三', age:18, study:function(){}};

for(const n in father) {
    console.log(n);
}
```

* 其中 const n 代表遍历出来的属性名
* 注意1：方法名也能被遍历出来（它其实也算一种特殊属性）
* 注意2：遍历子对象时，父对象的属性会跟着遍历出来

```js
let son = Object.create(father);
son.sex = "男";

for(const n in son) {
    console.log(n);
}
```

* 注意3：在 for in 内获取属性值，要使用 [] 语法，而不能用 . 语法

```js
for(const n in son) {
    console.log(n, son[n]);
}
```



### for of

主要用来遍历数组，也可以是其它可迭代对象，如 Map，Set 等

```js
let a1 = [1,2,3];

for(const i of a1) {
    console.log(i);
}

let a2 = [
    {name:'张三', age:18},
    {name:'李四', age:20},
    {name:'王五', age:22}
];

for(const obj of a2) {
    console.log(obj.name, obj.age);
}

for(const {name,age} of a2) {
    console.log(name, age);
}
```



### try catch

```js
let stu1 = {name:'张三', age:18, address: {city:'北京'}};
let stu2 = {name:'张三', age:18};

function test(stu) {
    try {
        console.log(stu.address.city)   
    } catch(e) {
        console.log('出现了异常', e.message)
    } finally {
        console.log('finally');
    }
}
```


