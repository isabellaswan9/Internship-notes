### 框架部分

#### vue的生命周期

每个Vue实例在被创建时都要经过一系列的初始化过程，同时在这个过程中也会运行一些叫做生命周期钩子的函数，这给了用户在不同阶段添加自己的代码的机会。

生命周期钩子的this上下文指向调用它的实例函数。

注意：不要在选项或回调上使用箭头函数，比如`created: () => console.log(this.a)`或`vm.$watch('a',newValue => this.myMethod())`。因为箭头函数并没有this，经常导致一些错误。

![img](https://upload-images.jianshu.io/upload_images/13119812-5890a846b6efa045.png?imageMogr2/auto-orient/strip|imageView2/2/format/webp)

#### vue中watch和computed的区别

wacth和computed都是vue的内置方法，和props、data、methods是一样的，他们之间的生成顺序是：

props=>methods=>data=>computed=>watch;

###### watch选项

需要一个自定义侦听器，用于响应数据变化。

当需要在数据变化时执行异步或开销较大的操作时，这个方法最有用。

没有缓存,每次监听的值发生变化时都会执行回调

监听某一个值的变化

不是必须要return返回



###### computed选项

使用场景：某个属性的值需要来自多个属性的简单计算或者复杂的逻辑计算得出的值时

计算属性是基于它们的响应依赖关系缓存的，只在相关响应式依赖发生改变时他们才会重新求值。

使用方法也可以实现相同的效果，但相比之下，每当触发重新渲染时，调用方法将会再次执行函数。

必须要用return返回

函数内部的数据改变也会触发

不支持异步，当内部有异步操作时无效



###### 命令式vm.$watch API

$watch(expOrFn,callback,[options])是一个实例方法，侦听组件实例上的响应式 property 或函数计算结果的变化。回调函数得到的参数为新值和旧值。

只能将顶层的data/props/computedproperty名作为字符串传递，对于更复杂的表达式，用一个函数取代。

当侦听的值是一个对象或者数组时，对其属性或元素的任何更改都不会触发侦听器，因为它们引用相同的对象/数组。

`$watch` 返回一个取消侦听函数，用来停止触发回调

选项：deep和immediate



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