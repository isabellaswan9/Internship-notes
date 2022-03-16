## 计算属性computed

模板内表达式过于复杂时可以使用computed属性

使用场景：某个属性的值需要来自多个属性的简单计算或者复杂的逻辑计算得出的值时

计算属性是基于它们的响应依赖关系缓存的，只在相关响应式依赖发生改变时他们才会重新求值。

不支持异步，当内部有异步操作时无效

```html
<div id="computed-basics">
  <p>Has published books:</p>
  <span>{{ publishedBooksMessage }}</span>
</div>
<!-- Vue 知道 vm.publishedBookMessage 依赖于 vm.author.books，因此当 vm.author.books 发生改变时，所有依赖 vm.publishedBookMessage 的绑定也会更新。
-->
```



```js
  data() {
    return {
      author: {
        name: 'John Doe',
        books: [
          'Vue 2 - Advanced Guide',
          'Vue 3 - Basic Guide',
          'Vue 4 - The Mystery'
        ]
      }
    }
  },
  computed: {
    // 计算属性的 getter
    publishedBooksMessage() {
      // `this` 指向 vm 实例
      return this.author.books.length > 0 ? 'Yes' : 'No'
    }
  }
```

### 问：computed和method的区别？

可以达到相同效果，但**计算属性将基于它们的响应依赖关系缓存**

1. computed是属性调用，不需要`()`,只会在**相关响应式依赖**改变时重新求值，多次访问会从缓存中读取数据

   method是函数调用，无缓存，每次重新渲染都会再次执行

缓存的好处：**减少性能开销**

注：计算属性是响应式的，可以将state声明为计算属性

## [侦听器](https://v3.cn.vuejs.org/guide/computed.html#%E4%BE%A6%E5%90%AC%E5%99%A8)

一个自定义侦听器，用于响应数据变化

当需要在数据变化时**执行异步或开销较大**的操作时，这个方法最有用。

没有缓存,每次监听的值发生变化时都会执行回调

```html
<input v-model="question" />
```



```js
    data() {
      return {
        question: '',
        answer: 'Questions usually contain a question mark. ;-)'
      }
    },
    watch: {
      // 每当 question 发生变化时，该函数将会执行
      question(newQuestion, oldQuestion) {
        if (newQuestion.indexOf('?') > -1) {
          this.getAnswer()
        }
      }
    },
```

类似于ngModelChange

### 使用immediate

使用场景：需要在第一次初始化之后立即执行

```js
//比如我在组件created时要立刻执行一次getInstrument,同时需要监听id变动时并执行
  created() {
    this.getInstrumentById();
  },
  watch: {
    instrumentId() {
      this.getInstrumentById();
    },
  },
```

可使用immediate属性解决

```js
watch: {
    instrumentId: {
    //该回调会在侦听开始之后立即被调用
      handler() {
        this.getInstrumentById();
      },
      immediate: true,
    },
  },
```

watch和created的顺序，若使用immediate则是在created之前。

## [vue中watch和computed的区别](https://blog.csdn.net/weixin_45743636/article/details/118100951)

|                    | computed                                         | watch                                       |
| ------------------ | ------------------------------------------------ | ------------------------------------------- |
| 功能差异           | 计算属性                                         | 监听一个值的变化，然后执行相应回调          |
| 是否有缓存         | 有缓存，相关响应式依赖发生改变时他们才会重新求值 | 没有缓存,每次监听的值发生变化时都会执行回调 |
| 是否需要return     | 必须要return                                     | 不必要                                      |
| 第一次加载是否监听 | 是                                               | 否，若要监听需要使用immediate               |
| 使用场景           | 当一个属性依赖与多个属性时（被影响）             | 当一个数据影响多条数据时                    |
| 是否支持异步       | 不支持异步，当内部有异步操作时无效               |                                             |



wacth和computed都是vue的内置方法，和props、data、methods是一样的，他们之间的**生成顺序**是：

props=>methods=>data=>computed=>watch;

## 命令式vm.$watch API

$watch(expOrFn,callback,[options])是一个实例方法，侦听组件实例上的响应式 property 或函数计算结果的变化。回调函数得到的参数为新值和旧值。

只能将顶层的data/props/computedproperty名作为字符串传递，对于更复杂的表达式，用一个函数取代。

当侦听的值是一个对象或者数组时，对其属性或元素的任何更改都不会触发侦听器，因为它们引用相同的对象/数组。

`$watch` 返回一个取消侦听函数，用来停止触发回调

选项：deep和immediate

# 双向绑定的原理

[深入响应性原理 | Vue.js](https://v3.cn.vuejs.org/guide/reactivity.html#什么是响应性)

当我们从一个组件的 `data` 函数中返回一个普通的 JavaScript 对象时，Vue 会将该对象包裹在一个带有 `get` 和 `set` 处理程序的 [Proxy](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Proxy) 中。

**Proxy 是一个对象，它包装了另一个对象，并允许你拦截对该对象的任何交互。**

## 什么是响应性？如何使用Proxy实现的？

1. **当一个值被读取时进行追踪**：proxy 的 `get` 处理函数中 `track` 函数记录了该 property 和当前副作用。
2. **当某个值改变时进行检测**：在 proxy 上调用 `set` 处理函数。
3. **重新运行代码来读取原始值**：`trigger` 函数查找哪些副作用依赖于该 property 并执行它们。

### [如何让渲染响应变化](https://v3.cn.vuejs.org/guide/reactivity.html#%E5%A6%82%E4%BD%95%E8%AE%A9%E6%B8%B2%E6%9F%93%E5%93%8D%E5%BA%94%E5%8F%98%E5%8C%96)

一个组件的模板被编译成一个 [`render`](https://v3.cn.vuejs.org/guide/render-function.html) 函数。它知道在函数运行的某个时间点上使用了这些依赖关系。任何一个随后发生了变化，它将再次运行。

### [effect](https://v3.cn.vuejs.org/guide/reactivity.html#vue-%E5%A6%82%E4%BD%95%E7%9F%A5%E9%81%93%E5%93%AA%E4%BA%9B%E4%BB%A3%E7%A0%81%E5%9C%A8%E6%89%A7%E8%A1%8C)：Vue 如何知道哪些代码在执行

Vue 通过一个*副作用 (effect)* 来跟踪当前正在运行的函数。副作用是一个函数的包裹器，在函数被调用之前就启动跟踪。Vue 知道哪个副作用在何时运行，并能在需要时再次执行它。

## 手写发布订阅者模式
