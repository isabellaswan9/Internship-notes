## Angular生命周期

|                           | 用途                                                         | 时机                                                         |
| ------------------------- | ------------------------------------------------------------ | ------------------------------------------------------------ |
| `ngOnChanges()`           | 检测到输入属性变更，调用此钩子。发生十分频繁，容易影响性能。 | 组件有绑定输入属性时，`ngOnInit()`前和输入属性值变化时调用。如果没绑定输入属性，不会调用该钩子。 |
| `ngOnInit()`              | 在 Angular 第一次显示数据绑定和设置组件的输入属性之后，**初始化组件**。 | 只调用一次。                                                 |
| `ngDoCheck()`             | 监控 `ngOnChanges()` 无法捕获的变更。需要注意用户体验，实现必须轻量化。 | `ngOnInit()`或`ngOnChanges()`之后                            |
| `ngAfterContentInit()`    | 当 Angular 把**外部内容投影进组件视图或指令所在的视图**之后调用。 | `ngOnInit()->ngDoCheck()->ngAfterContentInit`。只调用一次。  |
| `ngAfterContentChecked()` | 每当 Angular 检查完被投影到组件或指令中的内容之后调用。      | `ngAfterContentInit()` 和每次 `ngDoCheck()` 之后调用         |
| `ngAfterViewInit()`       | 当 Angular 初始化完**组件视图及其子视图**或包含该指令的视图之后调用。 | 第一次 `ngAfterContentChecked()` 之后调用，只调用一次。      |
| `ngAfterViewChecked()`    | 每当 Angular 做完**组件视图和子视图**或包含该指令的视图的变更检测之后调用。 | `ngAfterViewInit()` 和每次 `ngAfterContentChecked()` 之后调用。 |
| `ngOnDestory()`           | 每当 Angular 每次销毁指令/组件之前调用并清扫。               | 在 Angular 销毁指令或组件之前立即调用。                      |

*AfterContent* 钩子和 *AfterView* 相似。关键的不同点是子组件的类型不同。

- *AfterView* 钩子所关心的是 `ViewChildren`，这些子组件的元素标签会出现在该组件的模板*里面*。
- *AfterContent* 钩子所关心的是 `ContentChildren`，这些子组件被 Angular 投影进该组件中。

*内容投影*是从组件外部导入 HTML 内容，并把它插入在组件模板中指定位置上的一种途径。如`<ng-content>`