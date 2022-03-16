#### 发送异步请求除了ajax还用什么？

fetch

axios

##### 如何同步发出多个异步请求？

```js
function getUserAccount() {
  return axios.get('/user/12345');
}

function getUserPermissions() {
  return axios.get('/user/12345/permissions');
}

Promise.all([getUserAccount(), getUserPermissions()])
  .then(function (results) {
    const acct = results[0];
    const perm = results[1];
  });
```

vue3中发起请求的方法

[使用axios和qs](https://www.jianshu.com/p/03ac4e4b0e83)

[vue2中发起请求的方法](https://www.cnblogs.com/mrszhou/p/7859012.html)

vue2中可以使用vue-resource，vue3中无法使用这个插件

[vue请求数据的三种方式_vue.js_脚本之家 (jb51.net)](https://www.jb51.net/article/181876.htm)

## Ajax

##### ajax中readyState的5个状态及其含义

##### 以下是XMLHttpRequest对象的三个重要属性：

| 属性               | 描述                                                         |
| ------------------ | ------------------------------------------------------------ |
| onreadystatechange | 存储函数，每当readyState属性改变时，就会调用该函数           |
| readyState         | 存有XMLHttpRequest的状态。0：请求未初始化 1：服务器连接已建立 2：请求已接收 3：请求处理中 4：请求已完成，且响应已就绪。 |

## 