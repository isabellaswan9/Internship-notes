### [this](https://www.cnblogs.com/pssp/p/5216085.html) 最终指向调用它的对象

1. 没有被上一级对象调用时 指向windows
2. 又被上一级对象调用时 指向上一级对象 包含多层对象时取最近
3. new 可改变this的指向 函数内的this 指向当前对象 否则指向Window
4. call()方法提供新的this值给当前调用的函数/方法。

```
var o = {
    a:10,
    b:{
        a:12,
        fn:function(){
            console.log(this.a); //12
        }
    }
}
o.b.fn();
```

特殊情况:

```
var o = {
    a:10,
    b:{
        a:12,
        fn:function(){
            console.log(this.a); //undefined
            console.log(this); //window
        }
    }
}
var j = o.b.fn;
j();
```

这里this指向的是window,因为**this永远指向的是最后调用它的对象**.

上例将fn赋值给变量j,指向window,并非直接执行

#### 当this遇到new 和 return 时

由于,当使用new关键字创建一个对象实例时,函数若返回的是对象,则实例对象的返回值是一个对象实例,若没有返回值或者不是对象,则返回值是this

```
function Fn()  
{  
    this.user = '追梦子';  
    return undefined;
}
var a = new Fn;  
console.log(a); //fn {user: "追梦子"}
```

函数的返回值是对象时,得到的实例对象是这个对象

```
function Fn()  
{  
    this.user = '追梦子';  
    return function(){};
}
var a = new Fn;  
console.log(a.user); //undefined
```



### [new运算符](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Operators/new)

#### new关键字操作如下:

1. 创建一个空的JS对象即{};
2. 为新对象添加属性`__proto__`,将该属性链接至构造函数的原型对象
3. 将新对象作为this的上下文(自动调用apply()方法)
4. 如果该函数没有**返回对象**,则返回this

#### 创建一个用户自定义的对象需要两步:

1. 通过编写函数来定义对象类型
2. 通过new来创建对象实例

```
//定义一个对象类型
function Car(make,modek,year){
	this.make = make;
	this.model = model;
	this.year = year;
}
//创建一个对象实例
var mycar = new Car("Eagle", "Talon TSi", 1993);
//output: Car {make: 'Eagle', model: 'Talon TSi', year: 1993}
```



注:严格模式下的函数调用,this指向undefined



#### [箭头函数](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Functions/Arrow_functions)与函数表达式的区别

1. **更简洁**,**且没有自己的this**,arguments,super或new.target

```
function Person() {
  // Person() 构造函数定义 `this`作为它自己的实例.
  this.age = 0;

  setInterval(function growUp() {
    // 在非严格模式, growUp()函数定义 `this`作为全局对象,
    // 与在 Person()构造函数中定义的 `this`并不相同.
    this.age++;
  }, 1000);
}

var p = new Person();
```

通过将`this`值分配给封闭的变量，可以解决`this`问题。

```js
function Person() {
  var that = this;
  that.age = 0;

  setInterval(function growUp() {
    // 回调引用的是`that`变量, 其值是预期的对象.
    that.age++;
  }, 1000);
}
```

或者使用绑定函数,

箭头函数不会创建自己的this,它只会从自己的作用域链的上一层继承this

```js
function Person(){
  this.age = 0;

  setInterval(() => {
    this.age++; // |this| 正确地指向 p 实例
  }, 1000);
}

var p = new Person();
```

