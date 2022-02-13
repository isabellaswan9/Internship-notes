# bamboo面试

## js部分

#### 觉得es6比较好的特性有哪些

#### Javascript模块化编程

node.js项目，将javascript语言用于服务器端编程，服务端需要模块与操作系统和其他应用程序互动，于是因此流行起了模块化编程。

##### es5模块导入的方法了解哪些

CommonJS的一个全局性方法，require，用于加载模块，但是CommonJS规范不适用于浏览器环境。require一个模块，就需要将其加载完毕，在服务器端这个不成问题，所有模块都在本地，但在浏览器，等待时间取决于网速快慢，不能同步加载，只能异步加载，AMD（Asychronous Module Definition）规范诞生。

```tsx
//不接收对象 
require:require('s.css'); //(es5)
improt  's.css' //(es6)
 
//接收对象
var o = require('s.js'); //es(5)
import o form s.js    //(es6)
```

```javascript
//导出一个模块对象（es5）:
module.exports={
    add:add,
    sub:sub
}
//导出一个模块对象（es6）:
module.exports={
    add,
    sub
}
//注意：上es6这种写法属性名和属性值变量是同一个，否则要分开写
module.exprots={
    addFn:add,
    sub
}  
```

##### AMD和CMD的区别

对依赖模块的执行时机处理不同，AMD依赖前置，js可以方便知道依赖模块是谁，立即加载；

CMD就近依赖，需要把模块变为字符串解析一遍才知道依赖了哪些模块。

##### es6的模块导入是否了解？

###### export导出和import导入

export导出分为命名式导出和默认导出。命名式导出每个模块可以不多，而默认到处每个模块仅一个。

```
export { myFunction }; // 导出一个已定义的函数
export const foo = Math.sqrt(2); // 导出一个常量

export default D;
export { D as default };
```

#### Promise有没有用过（有）

#### 提到事件循环机制

**先执行同步代码，遇到异步宏任务则将异步宏任务放入宏任务队列中，遇到异步微任务则将异步微任务放入微任务队列中，当所有同步代码执行完毕后，再将异步微任务从队列中调入主线程执行，若在执行过程中产生新的微任务则继续执行微任务，微任务执行完毕后再将异步宏任务从队列中调入主线程执行，一直循环直至所有任务执行完毕。**

##### 微任务有哪些?

Promises.then,Object.observe,MutationObserver,process.nextTick

new Promise在实例化的过程中所执行的代码都是同步进行的

setTimout，异步宏任务

参考链接：

[宏任务微任务](https://blog.csdn.net/weixin_42420703/article/details/82790942)



#### 发送异步请求除了ajax还用什么？

fetch

axios

##### 如何同步发出多个异步请求？

#### 数组去重

##### es9 set去重

Set对象允许存储任何类型的唯一值，类似于数组。

```
function unique(arr){

	return Array.from(new Set(arr))

}
```

##### 使用includes或者indexOf

```
function unique(arr){

	let res = [];

	for(let i = 0; i < arr.length; i++){

		if(!res.includes(arr[i])){

			res.push(arr[i]);

		}

	}

}
```

##### 使用filter函数

```
var arr = [1,2,1,1,'1'];

const unique = function(arr){
	//将数组进行排序
	//过滤数组：如果index==0或者当前元素的值不等于上一个元素的值，就将它返回到新数组中
	return arr.concat().sort.filter(function(item,index,arr){

		return !index || item !== arr[index - 1];

	})
}
```

## css部分

#### 镜像翻转如何实现？使用css能不能实现？

#### 样式优先级

##### div class id优先级，叠加了呢？

## 框架部分

#### vue和react的区别

#### Angularx有没有了解

## 其他

#### 为什么选择前端

#### .net有没有学？spring呢？

#### 觉得前端是做什么的

#### 最近有看什么书？

#### 希望在公司学到什么

#### 怎么学js的？web编程学了什么？