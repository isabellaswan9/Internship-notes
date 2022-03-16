## `ref`

创建一个响应式对象

如果将对象分配为 ref 值，则它将被 [reactive](https://v3.cn.vuejs.org/api/basic-reactivity.html#reactive) 函数处理为深层的响应式对象。

```
const count = ref(0)
console.log(count.value) // 0

```

