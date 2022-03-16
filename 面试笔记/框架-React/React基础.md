## 元素渲染

元素是构成React应用的最小砖块，组件是由元素构成的，元素不可变

React DOM使用render函数将元素渲染到DOM根节点

```js
const element = <h1>Hello, world</h1>;
ReactDOM.render(element, document.getElementById('root'));
```

React只更新它需要更新的部分

