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



方法二：exports

