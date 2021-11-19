TypeScript面向对象编程

```typescript
class Site {
    name():void {
        console.log("Runoob")
    }
}
//new 关键字创建类的对象
var obj = new Site();
obj.name();
```

编译后生成的JavaScript代码：

```
var Site = /** @class */(function () {
	function Site() {
	}
	Site.prototype.name = function () {
		console.log("Runoob");
	}
	return Site;
}());
var obj = new Site();
obj.name;
```



数据类型-Void

Similar to languages like Java, void is used where there is no data. For example, if a function does not return any value then you can specify void as return type.

There is no meaning to assign void to a variable, as only null or undefined is assignable to void.

##### 变量！：类型

应对严格模式的检验

![类型检验符号](C:\Users\taylor.luo\Desktop\类型检验符号.png)



*Static types systems*



### Typescript 函数

## 剩余参数

有一种情况，我们不知道要向函数传入多少个参数，这时候我们就可以使用剩余参数来定义。

剩余参数语法允许我们将一个不确定数量的参数作为一个数组传入。

```typescript
function buildName(firstName: string, ...restOfName: string[]) {
    return firstName + " " + restOfName.join(" ");
}
  
let employeeName = buildName("Joseph", "Samuel", "Lucas", "MacKinzie");
```

