#### 实现数组reduce方法

##### 什么是reduce方法

###### reduce方法：对数组中的每一个元素执行一个传入的回调函数，将其结果汇总为单个返回

reduce方法接受两个参数

1. 回调函数

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

##### 如何实现reduce方法

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



#### 事件循环机制

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

