应用由三个部分组成：

- **状态**，驱动应用的数据源；
- **视图**，以声明方式将**状态**映射到视图；
- **操作**，响应在**视图**上的用户输入导致的状态变化。

变量生命周期

# Vuex

Vue.js的**状态管理库**，利用Vue的细粒度数据响应机制进行**高效的状态更新**

当应用需要多个组件共享状态时，会遇到两个问题

- 多个视图依赖于同一状态
- 来自不同视图的行为需要变更同一状态

**把组件的共享状态抽取出来**，任何组件都能获取状态或触发行为。

维持视图和状态间的**独立性**，使代码更**结构化且易维护**。

![vuex](../../notes-images/vuex.png)

1. vuex的状态存储是**响应式**的，store中的状态发生变化，读取了该状态的组件也会得到高效更新
2. **改变state**唯一途径是commit mutation，方便跟踪状态变化，便于调试

vuex使用**单一状态树**，一个对象包含全部的应用层级状态。

## 如何使用 及 核心概念

### 创建一个store()

```js
// index.js
import { createStore } from 'vuex'

export default createStore({
  state: {
  	isDrawerVisible: true,
  },
  mutations: {
    changeDrawerVisible: (state, payload) => {
      state.isDrawerVisible = payload;
    },
  },
  actions: {},
  modules: {},
});
```

在Vue组件中通过`this.$store`访问store实例。

### state

```js
//访问state
this.$store.state.isDrawerVisible
//声明为计算属性
computed:{
  isDrawerVisible(){
    return this.$store.state.isDrawerVisible
  }
}
//简写
//1. 同名时
computed: mapState([
  // 映射 this.isDrawerVisible 为 store.state.isDrawerVisible
  'isDrawerVisible'
])
//2.不同名时
computed: mapState({
    // 箭头函数
    isDrawer: state => state.isDrawerVisible,
    //  'isDrawerVisible' 等同于 'state => state.isDrawerVisible'
    isVisible: 'isDrawerVisible',
    // 要使用 `this` 获取局部状态，必须使用常规函数
})
```

### Mutations和payload

每个mutation有一个回调函数，接受state为第一个参数，同时可以传入payload

**mutations中只有同步事务，处理异步操作使用action**

```
  mutations: {
    changeDrawerVisible: (state, payload) => {
      state.isDrawerVisible = payload;
    },
  },
```

要触发mutation处理函数，需要调用commit。

```js
//提交变更
this.$store.commit("changeDrawerVisible", true);

//使用mapMutations 支持载荷
methods: {
    ...mapMutations([
      'increment', // 将 `this.increment()` 映射为 `this.$store.commit('increment')`

      // `mapMutations` 也支持载荷：
      'incrementBy' // 将 `this.incrementBy(amount)` 映射为 `this.$store.commit('incrementBy', amount)`
    ]),
    ...mapMutations({
      add: 'increment' // 将 `this.add()` 映射为 `this.$store.commit('increment')`
    })
  }
```

注：多人协作时可以[使用常量代替事件类型](https://vuex.vuejs.org/zh/guide/mutations.html#%E4%BD%BF%E7%94%A8%E5%B8%B8%E9%87%8F%E6%9B%BF%E4%BB%A3-mutation-%E4%BA%8B%E4%BB%B6%E7%B1%BB%E5%9E%8B)（即事件名）

### 使用组合式API

在setup中没有this，可以使用useStore

```js
import { useStore } from "vuex";

//访问state
setup() {
    const store = useStore();
    return { visible: store.state.isDrawerVisible
  };
},

//提交变更
setup() {
    const store = useStore();
    return {
      showDrawer: () => store.commit("changeDrawerVisible"),
    };
},
```

### [表单处理](https://vuex.vuejs.org/zh/guide/forms.html)等问题

当使用v-model绑定vuex的state时 或 且用户输入或操作会直接修改state时，因为**不是通过提交mutation执行**的，会抛出错误。

方法1 使用带有setter的双向绑定计算属性

```js
<input v-model="message">
//js
computed: {
  message: {
    get () {
      return this.$store.state.obj.message
    },
    set (value) {
      this.$store.commit('updateMessage', value)
    }
  }
}
```

注：使用watch是不可行的，因为watch是在state变化完成之后触发的

### [Action](https://vuex.vuejs.org/zh/guide/actions.html#%E7%BB%84%E5%90%88-action)

Action 类似于 mutation，不同在于：

- Action **提交的是 mutation，而不是直接变更状态**。
- Action **可以包含任意异步操作**。

通过dispatch方法触发

```
store.dispatch('increment')
```

### getter

要从 store 中的 state 中派生出一些状态时，类似于计算属性

## 为什么Angular没有状态管理？

[Angular 真的需要状态管理么？ ](https://zhuanlan.zhihu.com/p/45121775)

