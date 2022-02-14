## [类](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Classes)class

**类是用于创建对象的模板**。

```js
class Rectangle {
  constructor(height, width) {
    this.height = height;
    this.width = width;
  }
}
```

**函数声明与类声明的一个区别**是,函数声明会提升,类声明不会,需要先声明再访问,否则会报错

### 使用`extends`扩展子类（继承）

#### 使用super调用超类

`super`关键字用于调用对象的父对象上的函数

如果子类中定义了构造函数，那么必须先调用`super()`才能使用`this`

```js
class Cat {
  constructor(name) {
    this.name = name;
  }

  speak() {
    console.log(this.name + ' makes a noise.');
  }
}

class Lion extends Cat {
  speak() {
    super.speak();
    console.log(this.name + ' roars.');
  }
}
```

#### 可以继承传统的基于函数的类

```js
function Animal (name) {
  this.name = name;
}
Animal.prototype.speak = function () {
  console.log(this.name + ' makes a noise.');
}

class Dog extends Animal {
  speak() {
    super.speak();
    console.log(this.name + ' barks.');
  }
}

var d = new Dog('Mitzie');
d.speak();//Mitzie makes a noise.  Mitzie barks.
```

### [TS中的类](https://www.tslang.cn/docs/handbook/classes.html)

> ES6开始,JS有了基于类的面向对象的方式,使用TS,编译后的JavaScript可以在所有主流浏览器和平台上运行，而不需要等到下个JavaScript版本。

```typescript
class Greeter {
    greeting: string;
    constructor(message: string) {
        this.greeting = message;
    }
    greet() {
        return "Hello, " + this.greeting;
    }
}

let greeter = new Greeter("world");
```

## [TS中的接口](https://www.tslang.cn/docs/handbook/interfaces.html)

TS的核心原则之一：对值所具有的结构进行**类型检查**

**接口的作用就是为这些类型命名**，接口能够描述JS中对象拥有的各种各样的外形。

### 描述带有属性的普通对象

#### 可选属性

在属性名后加`?`

```
interface SquareConfig {
  color?: string;
  width?: number;
}
```

#### 只读属性

属性名前面加`readonly`

#### 额外属性检查  

当一个对象存在目标类型不包含的属性时，会报错

```typescript
interface SquareConfig {
    color?: string;
    width?: number;
}

function createSquare(config: SquareConfig): { color: string; area: number } {
    // ...
}

let mySquare = createSquare({ colour: "red", width: 100 });
// let mySquare = createSquare({ width: 100, opacity: 0.5 } as SquareConfig);
```

##### 绕开检查的方法

1. 使用类型断言

   ```typescript
   let mySquare = createSquare({ width: 100, opacity: 0.5 } as SquareConfig);
   ```

2. 添加一个字符串索引签名,让这个接口可以有任意数量的属性

   ```typescript
   interface SquareConfig {
       color?: string;
       width?: number;
       [propName: string]: any;
   }
   ```

### 描述函数类型

类似一个只有参数列表和返回值类型的函数定义。

```typescript
interface SearchFunc{
	(source: string, subString: string): boolean;
}
```

