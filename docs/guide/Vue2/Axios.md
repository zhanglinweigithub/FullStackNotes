---
title: Axios
---
# 目录

[[toc]]

# Axios
`axios` 它的底层是用了 XMLHttpRequest（xhr）方式发送请求和接收响应，`xhr` 相对于之前讲过的 fetch api 来说，功能更强大，但由于是比较老的 api，不支持 Promise，axios 对 xhr 进行了封装，使之支持 Promise，并提供了对请求、响应的统一拦截功能

**安装**
```bash
npm install axios -S
```
**导入**
```javascript
import axios from 'axios'
```

- axios 默认导出一个对象，这里的 import 导入的就是它默认导出的对象

**方法**

| **请求** | **备注** |
| --- | --- |
| axios.get(url[, config]) | ⭐️ |
| axios.delete(url[, config]) |  |
| axios.head(url[, config]) |  |
| axios.options(url[, config]) |  |
| axios.post(url[, data[, config]]) | ⭐️ |
| axios.put(url[, data[, config]]) |  |
| axios.patch(url[, data[, config]]) |  |

- config - 选项对象、例如查询参数、请求头...
- data - 请求体数据、最常见的是 json 格式数据
- get、head 请求无法携带请求体，这应当是浏览器的限制所致（xhr、fetch api 均有限制）
- options、delete 请求可以通过 config 中的 data 携带请求体
```vue
<template>
    <div>
        <input type="button" value="获取远程数据" @click="sendReq()">
    </div>
</template>
<script>
import axios from 'axios'
const options = {
    methods: {
        async sendReq() {
            // 1. 演示 get, post
            // const resp = await axios.post('/api/a2');

            // 2. 发送请求头
            // const resp = await axios.post('/api/a3',{},{
            //     headers:{
            //         Authorization:'abc'
            //     }
            // });

            // 3. 发送请求时携带查询参数 ?name=xxx&age=xxx
            // const name = encodeURIComponent('&&&');
            // const age = 18;
            // const resp = await axios.post(`/api/a4?name=${name}&age=${age}`);

            // 不想自己拼串、处理特殊字符、就用下面的办法
            // const resp = await axios.post('/api/a4', {}, {
            //     params: {
            //         name:'&&&&',
            //         age: 20
            //     }
            // });

            // 4. 用请求体发数据，格式为 urlencoded
            // const params = new URLSearchParams();
            // params.append("name", "张三");
            // params.append("age", 24)

            // const resp = await axios.post('/api/a4', params);

            // 5. 用请求体发数据，格式为 multipart
            // const params = new FormData();
            // params.append("name", "李四");
            // params.append("age", 30);
            // const resp = await axios.post('/api/a5', params);

            // 6. 用请求体发数据，格式为 json
            const resp = await axios.post('/api/a5json', {
                name: '王五',
                age: 50
            });

            console.log(resp);
        }
    }
};
export default options;
</script>

 
```
**创建实例**
```vue
const _axios = axios.create(config);
```

- axios 对象可以直接使用，但使用的是默认的设置
- 用 axios.create 创建的对象，可以覆盖默认设置，config 见下面说明

**常见的 config 项有** 

| **名称** | **含义** |
| --- | --- |
| baseURL | 将自动加在 url 前面 |
| headers | 请求头，类型为简单对象 |
| params | 跟在 URL 后的请求参数，类型为简单对象或 URLSearchParams |
| data | 请求体，类型有简单对象、FormData、URLSearchParams、File 等 |
| withCredentials | 跨域时是否携带 Cookie 等凭证，默认为 false |
| responseType | 响应类型，默认为 json |

```js
const _axios = axios.create({
    baseURL: 'http://localhost:8080',
    withCredentials: true
});
await _axios.post('/api/a6set')
await _axios.post('/api/a6get')
```

- 生产环境希望 xhr 请求不走代理，可以用 baseURL 统一修改
- 希望跨域请求携带 cookie，需要配置 withCredentials: true，服务器也要配置 allowCredentials = true，否则浏览器获取跨域返回的 cookie 时会报错

**响应格式**

| **名称** | **含义** |
| --- | --- |
| data | 响应体数据 |
| status | 状态码 |
| headers | 响应头 |

- 200 表示响应成功
- 400 请求数据不正确 age=abc
- 401 身份验证没通过
- 403 没有权限
- 404 资源不存在
- 405 不支持请求方式 post
- 500 服务器内部错误 出现异常没有捕获
## 请求拦截器
```js
_axios.interceptors.request.use(
  function(config) {
    // 比如在这里添加统一的 headers
    return config;
  },
  function(error) {
    return Promise.reject(error);
  }
);
```
## 响应拦截器
```js
_axios.interceptors.response.use(
  function(response) {
    // 2xx 范围内走这里
    return response;
  },
  function(error) {
    // 超出 2xx, 比如 4xx, 5xx 走这里
    return Promise.reject(error);
  }
);
```
