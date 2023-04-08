# 目录

[[toc]]

# 自定义指令

vue 官方提供了 `v-text`、`v-for`、`v-model`、`v-if` 等常用的指令。

除此之外 `vue` 还允许开发者自定义指令

vue 中的自定义指令分为两类，分别是： 

- 私有自定义指令 
- 全局自定义指令

可以在 directives 节点下声明私有自定义指令。

全局共享的自定义指令需要通过“Vue.directive()”进行声明

## 私有自定义指令
可以在 `directives` 节点下声明私有自定义指令。
```vue
//基本使用
<h1 v-color>App 组件</h1>

directives: {
	color: {
		//为绑定到的 HTML 元素设置红色的文字
        //bind 函数只调用 1 次：当指令第一次绑定到元素时调用，当 DOM 更新时 bind 函数不会被触发
		bind(el) {
			//形参中的 el 是绑定了此指令的、原生的 DOM 对象
			el.style.color = 'red'
		}
	}
}

//- - - - - - - - - - - - - - - - - - - - - - - - - - - - 
//为自定义指令动态绑定参数值
<h1 v-color="color">App 组件</h1>

data(){
    return {
        color: 'blue'
    }
},
directives: {
	color: {
		//在声明自定义指令时，可以通过形参中的第二个参数，来接收指令的参数值
		bind(el,binding) {
			//通过 binding 对象的 value 属性，获取动态的参数值
			el.style.color = binding.value
		}
	}
}    

//- - - - - - - - - - - - - - - - - - - - - - - - - - - - 
// bind 函数和 update 函数
directives: {
	color: {
		//bind 函数只调用 1 次：当指令第一次绑定到元素时调用，当 DOM 更新时 bind 函数不会被触发
		bind(el,binding) {
			//通过 binding 对象的 value 属性，获取动态的参数值
			el.style.color = binding.value
		},
        //update 函数会在每次 DOM 更新时被调用
        update(el,binding) {
			el.style.color = binding.value
		}
	}
}  

//- - - - - - - - - - - - - - - - - - - - - - - - - - - - 
// 函数简写
//如果 bind 和 update 函数中的逻辑完全相同，则对象格式的自定义指令可以简写成函数格式
directives: {
	color(el,binding) {
		el.style.color = binding.value
	}
}  
```

- 在使用自定义指令时，需要加上 v- 前缀
- 在声明自定义指令时，可以通过形参中的第二个参数，来接收指令的参数值
- bind 函数只调用 1 次：当指令第一次绑定到元素时调用，当 DOM 更新时 bind 函数不会被触发
- update 函 数会在每次 DOM 更新时被调用
## 全局自定义指令
全局共享的自定义指令需要通过“`Vue.directive()`”进行声明
```vue
//参数1：字符串，表示全局自定义指令的名字
//参数2：对象，用来接收指令的参数值
Vue.directive('color',function(el,binding){
	el.style.color = binding.value
})
```
