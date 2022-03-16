### 模板语法

React中使用jsx，Vue中使用template，而angular中使用模板。

模板和html很像，但它包含模板语法，如 `*ngFor`，`{{hero.name}}`，`（click）`、`[hero]` 和 `<app-hero-detail>`。

# Angular表单

Angular 提供了两种不同的方法来通过表单处理用户输入：响应式表单和模板驱动表单。

## 响应式表单和模板驱动表单的比较

**响应式表单** 提供对底层表单对象模型直接、显式的访问。更加健壮，可扩展性、可复用性和可测试性都更高。

**模板驱动表单** 依赖**模板中的**指令来创建和操作底层的对象模型。很容易添加到应用中。适用于简单的只需要基本需求和逻辑的表单。

|                                                              | 响应式                 | 模板驱动           |
| :----------------------------------------------------------- | :--------------------- | :----------------- |
| [建立表单模型](https://angular.cn/guide/forms-overview#setup) | 显式的，在组件类中创建 | 隐式的，由指令创建 |
| [数据模型](https://angular.cn/guide/forms-overview#mutability-of-the-data-model) | 结构化和不可变的       | 非结构化和可变的   |
| [数据流](https://angular.cn/guide/forms-overview#data-flow-in-forms) | 同步                   | 异步               |
| [表单验证](https://angular.cn/guide/forms-overview#validation) | 函数                   | 指令               |

## 常用表单基础类

响应式表单和模板驱动表单都建立在下列基础类之上。

- `FormControl` 实例用于追踪单个表单控件的值和验证状态。
- `FormGroup` 用于追踪一个表单控件组的值和状态。
- `FormArray` 用于追踪表单控件数组的值和状态。
- `ControlValueAccessor` 用于在 Angular 的 `FormControl` 实例和内置 DOM 元素之间创建一个桥梁。

## [响应式表单](https://angular.cn/guide/reactive-forms)

### 使用FormGroup手动创建实例

```typescript
profileForm = new FormGroup({
  firstName: new FormControl(''),
  lastName: new FormControl(''),
  address: new FormGroup({
    street: new FormControl(''),
    city: new FormControl(''),
    state: new FormControl(''),
    zip: new FormControl('')
  })
});
```

### 使用表单构建器FormBuilder服务

```typescript
profileForm = this.fb.group({
  firstName: [''],
  lastName: [''],
  address: this.fb.group({
    street: [''],
    city: [''],
    state: [''],
    zip: ['']
  }),
});
```

