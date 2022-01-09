#### 实现数组[reduce](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/Reduce)方法

##### 什么是reduce方法

###### reduce方法：对数组中的每一个元素执行一个传入的回调函数，将其结果汇总为单个返回

reduce方法接受两个参数

1. 回调函数（作为参数传给另一个函数的函数）

   这个回调函数接收4个参数，

   1. 累计返回的值，第一次执行这个callback时，如果有传入初始值则为初始值
   2. 当前数组中被处理的值
   3. (2)的索引 （可选）
   4. 原数组 （可选）

2. 初始值

```
const array1 = [1, 2, 3, 4];
const reducer = (previousValue, currentValue) => previousValue + currentValue;

// 1 + 2 + 3 + 4
console.log(array1.reduce(reducer));

// 5 + 1 + 2 + 3 + 4
console.log(array1.reduce(reducer, 5));
```

##### 如何实现reduce方法(2021.12.30✓)

```
Array.propertype.myReduce = function(callback, initValue){
	if(!initValue && !this.length){
		throw new Error('empty array without init value');
	}
	
	let accumulator = initValue ? initValue : this[0];
	for(let i = initValue ? 0 : 1; i < this.length; i++){
		accumulator = callback(accumulator,this[i],i,this);
	}
	return accumulator;
}
```

#### [reduce方法的高级用法](https://www.jianshu.com/p/e375ba1cfc47)

##### 计算数组中每个元素出现的次数

###### in运算符

如果指定的属性在指定的对象或其原型链中，则in运算符返回true

```
const arr = ['Alice', 'Bob', 'Tiff', 'Bruce', 'Alice'];
const countArr = arr.reduce((pre, cur)=>{
	if(cur in pre){
		pre[cur]++;
	}else{
		pre[cur] = 1;
	}
	return pre
},{})
console.log(countArr);
```

##### 数组去重

```
const arr = [1,2,3,9,9,4,4,1,59,81,88,59]
const newArr = arr.reduce((pre,cur)=>{
	if(!pre.includes(cur)){
		pre.push(cur)
	}
	return pre
},[])
console.log(newArr)
```

#### 数组方法[map()](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/map)

map方法返回一个新数组，新数组是对数组中的每个元素执行一次回调函数得到的返回值。

如果不打算返回新数组或回调函数中没有返回值，不应该使用map方法。

map方法接受两个参数

1. 回调函数

   这个回调函数接受三个参数

   + 当前处理的元素

   + 当前处理元素的索引

   + 调用map方法的数组

2. thisArg

```
Array.prototype.mapFromScratch = function (callback,context) {
    let newArr = [];
    for (let a = 0; a < this.length; a++){
        newArr.push(callback(context,this[a],a,this));
    }
    return newArr;
}
```

#### 数组方法filter()

filter()返回一个新数组，包含了通过测试的元素。

filter()方法接受两个参数

1. 回调函数

   这个回调函数接受三个参数，并返回boolean值，返回true表示通过测试，返回false标识没有通过。

   + 当前处理的元素

   + 当前处理元素的索引

   + 调用filter方法的数组

2. thisArg

#### 数组方法[foreach()](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/forEach)

forEach()方法对数组中的每个元素执行一次给定的函数。

除了抛出异常外，没有办法终止或跳出循环。

#### 数组方法[from()](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/from)

from()方法对一个类似数组或可迭代对象创建一个新的，浅拷贝的数组实例。

```
function unique(arr){
	return Array.from(new Set(arr))
}
```

数组合并并去重

```
function combine(){
//由于不知道会有多少个arguments,所以使用apply?
    let arr = [].concat.apply([], arguments);  //没有去重复的新数组
    return Array.from(new Set(arr));
}

var m = [1, 2, 2], n = [2,3,3];
console.log(combine(m,n));                     // [1, 2, 3]
```

#### 控制input的字符数量

设置一个监听input事件，传入$event,执行此事件处理程序后再执行对该input的赋值操作的，所以应该修改e.target.value。

```
(input)="onCommentsChange($event)"
```



```
  onCommentsChange(e: any) {
    let value = e.target.value;
    if (value.length >= 1000) {
      value = value.slice(0, 1000);
      // if dont change complianceComments value, the textarea wont be reset. (there should be better way to solve this problem.)
      this.intermalRemarks = '';
    }
    // use setTimeout to make these two assignment in different update patch.
    setTimeout(() => {
      this.intermalRemarks = value;
    }, 0);
  }
```



```
  onCommentsChange(e: any) {
    let value = e.target.value
    if (value.length > 3) {
      value = value.slice(0, 3);
      e.target.value = value
      //this.intermalRemarks = value;
    }
  }
```

