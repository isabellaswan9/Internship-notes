$refs用来访问子组件的方法，调用时会导致数据的延迟滞后之后问题，出现bug。

解决方法：

采用异步回调，然后传参进去。如使用es6的promise：

`handleAsync(){`

​	`reutrn new Promise(resolve=>{`

​		`const res ="";`

​		`resolve(res)`

`})`

`}`

`async handleShow() {`

  `await this.handleAsync().then(res=>{`

  `this.$refs.child.show(res);`

`})`

`}`

#### Vue.nextTick()的原理和用法

在**下次 DOM 更新循环结束**之后执行**延迟回调**。在修改数据之后立即使用这个方法，获取更新后的 DOM。

### 对于Vuex的理解

一个公共状态库。

state:包含了store中存储的各个状态。

getter:类似于Vue中的计算属性，根据其他getter或state计算返回值。

mutation:一组方法，是改变store中状态的执行者，只能是同步操作。

action:一组方法，其中可以包含异步操作。

#### Vuex和Redux的区别

Redux 的核心概念

- action （同步action ，或借助 中间件 实现异步操作，action 不会改变 store，只是描述了怎么改变store）| mutation（用于同步操作） 、action（可用于异步操作，提交 mutation）
- reducer（纯函数，根据 action 和旧的 store 计算出新的 store
- store（单一数据源）存储了整个应用的state，并且提供了获取state的方法，即`store.getState()`。

redux没有提供直接修改数据的方法，改变state的唯一方法就是触发（**dispatch**） **action** 。