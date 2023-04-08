# 目录

[[toc]]

# Vuex

vuex 可以在多个组件之间共享数据，并且共享的数据是【响应式】的，即数据的变更能及时渲染到模板

- 与之对比 localStorage 与 sessionStorage 也能共享数据，但缺点是数据并非【响应式】

首先需要定义 `state` 与 `mutations` 他们一个用来读取共享数据，一个用来修改共享数据
## 入门
**src/store/index.js**
```javascript
import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

/*
  读取数据，走 state, getters
  修改数据，走 mutations, actions
  */
export default new Vuex.Store({
  state: {
    name: '',
    age: 18
  },
  getters: {
  },
  mutations: {
    updateName(state, name) {
      state.name = name;
    }
  },
  actions: {
  },
  modules: {
  }
})
```
**修改共享数据**
```vue
<template>
  <div class="p">
    <el-input placeholder="请修改用户姓名" 
      size="mini" v-model="name"></el-input>
    <el-button type="primary" size="mini" @click="update()">修改</el-button>
  </div>
</template>
<script>
  const options = {
    methods: {
      update(){
        this.$store.commit('updateName', this.name);
      }
    },
    data () {
      return {
        name:''
      }
    }
  }
  export default options;
</script>
```

- mutations 方法不能直接调用，只能通过 store.commit(mutation方法名, 参数) 来间接调用

**读取共享数据**
```vue
<template>
  <div class="container">
    <el-container>
      <el-header>
        <div class="t">
          欢迎您：{{ $store.state.name }}, {{ $store.state.age }}
        </div>
      </el-header>
      <el-container>
        <el-aside width="200px">
        </el-aside>
        <el-main>
          <router-view></router-view>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>
```
## mapState
每次去写 `$store.state.name` 这样的代码显得非常繁琐，可以用 `vuex` 帮我们生成计算属性
```vue
<template>
  <div class="container">
    <el-container>
      <el-header>
        <div class="t">欢迎您：{{ name }}, {{ age }}</div>
      </el-header>
      <el-container>
        <el-aside width="200px">
        </el-aside>
        <el-main>
          <router-view></router-view>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>
<script>
  // 引入 mapState
  import { mapState } from 'vuex'
  const options = {
    computed: {
      ...mapState(['name', 'age'])
    }
  }
  export default options;
</script>
```

- `mapState` 返回的是一个对象，对象内包含了 name() 和 age() 的这两个方法作为计算属性
- 此对象配合 ... 展开运算符，填充入 computed 即可使用
## mapMutations
```vue
<template>
    <div class="p">
        <el-input placeholder="请修改用户姓名" 
            size="mini" v-model="name"></el-input>
        <el-button type="primary" size="mini" @click="updateName(name)">修改</el-button>
    </div>
</template>
<script>
import {mapMutations} from 'vuex'
const options = {
    methods: {
        ...mapMutations(['updateName']),
        testMapMutations () {
            this.updateName(this.name)
        }
    },
    data () {
        return {
            name:''
        }
    }
}
export default options;
</script>
```

- 类似的，调用 `mutation` 修改共享数据也可以简化
- mapMutations 返回的对象中包含的方法，就会调用 `store.commit()` 来执行 `mutation` 方法
- 注意参数传递略有不同
## actions
`mutations` 方法内不能包括修改不能立刻生效的代码，否则会造成 `Vuex` 调试工具工作不准确，必须把这些代码写在 `actions` 方法中

```javascript
import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

/*
  读取数据，走 state, getters
  修改数据，走 mutations, actions
  */
import axios from '@/util/myaxios'
export default new Vuex.Store({
  state: {
    name: '',
    age: 18
  },
  getters: {
  },
  mutations: {
    updateName(state, name) {
      state.name = name;
    },
    // 错误的用法，如果在mutations方法中包含了异步操作，会造成开发工具不准确
    /* async updateServerName(state) {
  const resp = await axios.get('/api/user');
  const {name, age} = resp.data.data;
  state.name = name;
  state.age = age;
  } */
    updateServerName(state, user) {
      const { name, age } = user;
      state.name = name;
      state.age = age;
    }
  },
  actions: {
    async updateServerName(context) {
      const resp = await axios.get('/api/user');
      context.commit('updateServerName', resp.data.data)
    }
  },
  modules: {
  }
})
```

- 首先应当调用 `actions` 的 `updateServerName` 获取数据
- 然后再由它间接调用 `mutations` 的 `updateServerName` 更新共享数据

页面使用 actions 的方法可以这么写
```vue
<template>
  <div class="p">
    <el-button type="primary" size="mini"
      @click="updateServerName()">从服务器获取数据,存入store</el-button>
  </div>
</template>
<script>
  import { mapActions } from 'vuex'
  const options = {
    methods: {
      ...mapActions(['updateServerName'])
    }
  }
  export default options;
</script>

```

- `mapActions` 会生成调用 `actions` 中方法的代码
- 调用 `actions` 的代码内部等价于，它返回的是 `Promise` 对象，可以用同步或异步方式接收结果
```vue
this.$store.dispatch('action名称', 参数)
```
