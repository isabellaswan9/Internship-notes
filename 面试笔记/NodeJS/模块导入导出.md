## 使用exports从Node.js文件中公开功能

### 方法一：module.exports

#### 将对象赋值给module.exports，这会使文件只导出该对象

```js
const car = {
  brand: 'Ford',
  model: 'Fiesta'
}

module.exports = car

//在另一个文件中

const car = require('./car')
```



### 方法二：exports

#### 将对象添加为exports的属性，这样可以导出多个对象、函数或数据

```js
const car = {
  brand: 'Ford',
  model: 'Fiesta'
};
exports.car = car;

//or

exports.car = {
  brand: 'Ford',
  model: 'Fiesta'
};

/* 使用 */
const items = require('./items')
items.car

//or

const car = require('./items').car
```

两种方法的区别：module.exports导出了它指向的对象，exports导出了它指向对象的属性



