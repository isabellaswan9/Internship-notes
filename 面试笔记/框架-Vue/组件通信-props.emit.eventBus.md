## [父子组件通信](https://blog.csdn.net/lhb215215/article/details/82966300)



### $emit

定义一个组件可以向其父组件触发的事件。

```html
//父组件
<template>
  <div>
    <p>{{ text }}</p>
    <button :text="textValue" @accepted="handleAccepted">OK</button>
  </div>
</template>
```

##### 

```js
//子组件
<template>
  <div>
    <p>{{ text }}</p>
    <button v-on:click="$emit('accepted')">OK</button>
  </div>
</template>
<script>
  export default {
    props: ['text'],
    emits: ['accepted']
  }
</script>
```

## 兄弟组件通信

### event bus

[Vue兄弟组件之间通信 eventBus](https://www.cnblogs.com/wjw1014/p/13492342.html)

```js
//eventBus.js
import Vue from 'vue';  
export default new Vue(); 
```

发布消息

```js
//引入eventBus后 使用emit发送
Bus.$emit('getTarget', event.target);  
```

接受消息

```js
//使用on接收
Bus.$on('getTarget', target => {  
    console.log(target);  
}); 
```

