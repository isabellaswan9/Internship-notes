### TS中的[基础类型](https://typescript.bootcss.com/basic-types.html)

boolean 

number

string

array

tuple元组

Null

Undefined

**enum枚举**

Any：在编程阶段还不清楚类型的变量指定一个any类型

Void：表示没有类型，当函数没有返回值时可以使用

Never：`never`类型表示的是那些永不存在的值的类型



## typescript有哪些常用的功能？

可以定义一个变量/函数的类型，然后会进行类型检查

使用interface或者type去自定义一个类型

不同于js中每个参数都是可选的，TS中使用？标记一个可选参数，且可选参数必须跟在必须参数后面

ts中可以为函数参数设置默认值，当用户调用函数没有传参时会使用这个值。默认参数在必须参数前面时，用户需要明确传入undefind获得默认值

```typescript
function buildName(firstName = "Will", lastName: string) {
    //code
}
//调用时
let result4 = buildName(undefined, "Adams");
```

ts中有枚举这个基础类型，使用枚举可以定义一些有名字的常量。 枚举通过`enum`关键字来定义。

类型推论：在没有明确指出的地方会帮助提供类型

## 和javascript的区别



## TS中的[泛型](https://typescript.bootcss.com/generics.html)

在像C#和Java这样的语言中，可以使用`泛型`来创建可重用的组件，一个组件可以支持多种类型的数据。 这样用户就可以以自己的数据类型来使用组件。

 组件不仅能够支持当前的数据类型，同时也能支持未来的数据类型，这在创建大型系统时为你提供了十分灵活的功能。

## TS的类型推论

在有些没有明确指出类型的地方，类型推论会帮助提供类型。

1. 发生在初始化变量和成员，设置默认参数值和决定函数返回值时。

2. 当需要从几个表达式中推断类型时候，会使用这些表达式的类型来推断出一个最合适的通用类型。
