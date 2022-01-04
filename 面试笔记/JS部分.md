#### for in 和 for of 的用法与区别

##### for in的用法

以任意顺序遍历一个对象的除Symbol以外的可枚举属性，用来循环带有字符串key的对象的方法。

**不推荐用来循环一个数组**，数组的index跟普通的对象属性不同，是重要的数字序列指标。

因为是遍历所有可枚举属性，这意味着如果你为数组原型添加任意属性，这些属性将会出现在循环之中。

**常用于调试，可以更方便地检查对象属性。**处理有key-value的数据。

```
var obj = {a:1,b:2,c:3};
for(var prop in obj)(
	console.log("obj." + prop + " = " + obj[prop]);
)
```

##### for of

在可迭代对象上创建一个迭代循环，调用自定义迭代钩子，并为每个不同属性的值执行语句

###### 优点：

比传统的for循环简洁，**同时弥补了forEach和for-in的循环短板**。

<u>可以在停止或者任意时刻中断循环。</u>(forEach不可以终止)

不需要提前固定指数。

```
const array1 = ['a','b','c'];

for(const element of array1){
	console.log(element);
}
//expected output: "a","b","c"

//迭代String
let iterable = "boo";

for(let value of iterable){
	console.log(value);
}
//"b","o","o"
```

##### for..of和for..in的区别

区别在于他们的迭代方式。

for...in语句以任意顺序**迭代对象的可枚举属性**。

它不记录数组元素，因为这些不是枚举属性，但他记录数组索引以及自身属性和继承的属性。



for...of语句**遍历可迭代对象定义要迭代的数据**。



#### 数组的foreach方法 和 Map方法 、filter方法以及 reduce方法的区别

foreach方法对数组的每个元素执行一次给定的函数。

map()方法创建一个新的数组，其结果是该数组中的每个元素是调用一次提供的函数后的返回值。

<u>如果你不打算使用返回的新数组，或/且没有从回调函数中返回值，则不该使用`map`</u>，可以使用foreach或for...in代替。

 除了抛出异常以外，没有办法中止或跳出 `forEach()` 循环。<u>如果你需要中止或跳出循环，`forEach()` 方法不是应当使用的工具。</u>

filter,和map数组一样返回一个新数组，这个新数组是过滤过的

##### 语法差异

foreach和map、语法相同，每次执行匿名函数都支持三个参数，item当前每一项，index索引值、arr原数组，还有thisArg。thisArg有值时this指向thisArg参数，如果省略，或其值为null或undefined，this指向全局对象。

reduce的语法不同，回调函数支持四个参数，accumulator是上次调用回调时返回的累积值，currentValue,index,array调用reduce()的源数组。

##### 返回值差异

foreach返回值是undefined，map的返回值是一个新数组，由原数组每个元素执行回调函数的结果组成，reduce返回函数累积处理的结果（即把数组缩减为一个值）

##### 速度差异

map()速度比forEach()快

#### let不会变量提升的原理

他们的作用域被限制在块级内，而不是函数内。var声明的变量不是函数作用域就是全局作用域的，而使用let或const声明的变量，会被困在暂时性死区内直到它的declare(声明)被执行。



#### 值相等和绝对相等

##### ==（相等运算符）

都是对象，仅当两个操作数都引用同一个对象才返回true。

null == undefind 返回true

不同类型会进行类型转换（null和undefined与其他类型比较，不进行类型转换）

- 数字与字符串，将字符串转为数字
- 有boolean值，boolean值转换为1或0
- 有一个是对象，另一个是数字或字符串，使用对象的valueOf()`和`toString()将对象转换为原始值。

相同类型直接比较值。

##### ===（全等运算符）

类型不同返回false

都是对象，仅当两个操作数都引用同一个对象时才返回true

两个都为null或两个都为undefined时才返回true

任意一个为NaN,返回false

**==和===最显著的区别，如果操作数类型不同，==会尝试类型转换。**

**例子：**

```
  var a = b = 1; a=== b //true

  var a = 1,b = 1; a=== b // true

  var a = b = {} ;a == b //true
  
  var a = b = {}; a=== b //true

  var a = {};b = {}; a == b // false

  var a = {};var b = {};a===b; //false

  [2]==[2] //false
  //相当于 var a = [2];var b = [2];a == b
  
  null == undefined //true

  null instanceof Object //false

  false == undefined //false

```

