## Angular脏值检查

生命周期一直伴随着变更检测，Angular 会检**查数据绑定属性何时发生变化，并按需更新视图和组件实例**。

Angular 各种视图的基础类，提供变更检测功能。 变更检测树会收集要检查的所有视图。 使用这些方法从树中添加或移除视图、初始化变更检测并显式地把这些视图标记为*脏的*，意思是它们变了、需要重新渲染。

## Angular ChangeDetectRef

#### 对变量进行赋值后没有立刻改变

###### 原因：

```typescript
@Component({
  selector: 'b3-invoice-detail-fee',
  templateUrl: './invoice-detail-fee.component.html',
  styleUrls: ['./invoice-detail-fee.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
```

将[检测更改策略](https://angular.cn/api/core/ChangeDetectionStrategy)设置为onPush,使用CheckOnce策略，将禁用自动变更检测，直到重新激活。一般是为了保证性能而设置的。

###### 解决方法

对变量进行赋值之后使用`detectChanges()`

```
this.cdr.detectChanges();
```

### [Angular ChangeDetectRef](https://angular.cn/api/core/ChangeDetectorRef#changedetectorref)

提供变更检测功能。

#### markForCheck()

当变更检测策略为OnPush时，该视图显示标记为已更改。

#### detectChanges()

检查该视图及其子视图。与 [detach](https://angular.cn/api/core/ChangeDetectorRef#detach) 结合使用可以实现局部变更检测。

## onChanges

一个生命周期钩子，当指令的任何一个可绑定属性发生变化时调用。 定义一个 `ngOnChanges()` 方法来处理这些变更。

