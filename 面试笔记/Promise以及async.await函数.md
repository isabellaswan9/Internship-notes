[async函数](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Statements/async_function)可能包含0个或多个await表达式。

await表达式会暂停整个async函数的执行进程，并等待基于promise的异步操作被执行后才会恢复进程，promise的解决值会被当做该await表达式的返回值。

async和await关键字是实现**基于Promise**的异步行为的**更简洁**的方式，无需刻意地链式调用promise。



## Promise对象(异步编程的一种解决方案)

### Promise出现的原因: 解决回调地狱

#### 回调地狱的缺点:

1. 代码臃肿 易出bug
2. 可读性差
3. 耦合度过高 可维护性差
4. 代码复用性差
5. 只能在回调函数里处理异常

### Promise的状态有哪些？

- *待定（pending）*: 初始状态，既没有被兑现，也没有被拒绝。
- *已兑现（fulfilled）*: 意味着操作成功完成。
- *已拒绝（rejected）*: 意味着操作失败。

### Promise的使用:

1. 初始化一个Promise对象
2. 调用该Promise对象的then方法,注册回调函数
3. 注册catch(异常处理)函数

#### 关于Promise

```
console.log('Hello World!');

function test () {
//定义一个函数，函数提升
  return new Promise((resolve, reject) => {

    console.log(2)

    resolve(true)

    console.log(3)

  })

  console.log(4)

}

 

setTimeout(function() {
//setTimeout不会立刻执行，属于第二轮宏任务
  test().then(res => {

   console.log(7)
//then的回调函数需要在resolve执行之后触发
  })

  console.log(5);

}, 0)

console.log(6)

 

//Hello World,6,2,3,5,7
//执行第一轮Hello World,6,没有微任务
//第二轮,2,3,5,微任务 7
```

原型链攻击

使用promise实现一个sleep函数

## Promise.all()

## Promise.race()

## [练习题](https://www.jianshu.com/p/82521b7814b6)

```js
const promise = new Promise((resolve, reject) => {
  console.log(1)
  resolve()
  console.log(2)
})
promise.then(() => {
  console.log(3)
})
console.log(4)

//1 2 4 3
//promise.then中的代码就是异步执行，需要同步任务执行结束之后才输出。
//如果去掉resolve()函数则then的回调函数不会执行
```

`Promise.resolve()`是将当前的Promise的状态更改为成功，并且传递值，所以下一个then中可以接收到这个值，并且输出。
 之后then中的return相当于返回了一个新的Promise，并且携带需要 传递的参数，实现链式调用

```js
Promise.resolve()
  .then(() => {
    return new Error('error!!!')
  })
  .then((res) => {
    console.log('then: ', res)
  })
  .catch((err) => {
    console.log('catch: ', err)
  })
  
  //once
  //success 1005
  //success 1006
```

then中就算抛出一个error对象也不会影响Promise的状态，返回任意一个非 promise 的值都会被包裹成 promise 对象，即 return new Error('error!!!') 等价于 `return Promise.resolve(new Error('error!!!'))

```js
Promise.resolve(1)
  .then(2)
  .then(Promise.resolve(3))
  .then(console.log())
```

这里**then内部期望传入函数**，如果 不是函数，就发生**值穿透**，最后`console.log`是输出的1

```js
const first = () => (new Promise((resolve, reject) => {
    console.log(3);
    let p = new Promise((resolve, reject) => {
        console.log(7);
        setTimeout(() => {
            console.log(5);
            resolve(6);
        }, 0)
        resolve(1);
    });
    resolve(2);
    p.then((arg) => {
        console.log(arg);
    });

}));

first().then((arg) => {
    console.log(arg);
});
console.log(4);
```

第一轮事件循环，先执行宏任务，主script，new Promise立即执行，输出 3，执行p这个new Promise操作，输出 7，发现setTimeout，将回调函数放入下一轮任务队列（Event Quene），p的then，暂且命名为then1，放入微任务队列，且first也有then，命名为then2，放入微任务队列。执行console.log(4),输出 4，宏任务执行结束。

再执行微任务，执行then1,输出 1，执行then2,输出 3.

第一轮事件循环结束，开始执行第二轮。第二轮事件循环先执行宏任务里面的，也就是setTimeout的回调，输出 5.resolve(6)不会生效，因为p的Promise状态一旦改变就不会再变化了。



以下代码输出：

```js
setImmediate(() => {
  console.log(1);
  Promise.resolve().then(() => {
    console.log(2);
  });
}, 0);
new Promise((resolve) => {
  console.log(3);
  resolve();
}).then(() => {
  console.log(4);
  process.nextTick(() => {
    console.log(5)
  });
  setTimeout(() => {
    console.log(6);
  }, 0);
}).then(() => {
  console.log(7);
});
console.log(8);

//3,8,4,7,5,1,2,6
```

注：process.nextTick