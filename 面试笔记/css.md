### [行内元素/块级元素区别](https://segmentfault.com/a/1190000015202771)

行内元素:只能包含数据或其他行内元素,不会另起一行.

`<span><select><textarea>`

块级元素:会新起一行,可以包含行内元素和其他块元素

`<div><article><p><form><table><ul>`

### 几种定位方式和他们的区别

| 相对定位                                                     | 绝对定位                                                     | 固定定位                     |
| :----------------------------------------------------------- | ------------------------------------------------------------ | ---------------------------- |
| 相对于元素原来的位置偏移                                     | 相对于祖元素（<html>元素（父元素没有设置定位时）或其最近的定位祖先）偏移 | 相对于浏览器视口本身         |
| 它与静态定位非常相似，占据在正常的文档流中，除了你仍然可以修改它的最终位置，包括让它与页面上的其他元素重叠。 | 绝对定位的元素不再存在于正常文档布局流中。相反，它在它自己的层独立于一切。 | 工作方式与绝对定位完全相同。 |

### 使用相对定位实现头像的删除按钮固定



### height属性中的[inherit值和100%的区别](https://www.zhangxinxu.com/wordpress/2015/02/different-height-100-height-inherit/)

1. 浏览器兼容性不同

2. 大部分时候是相同的,在子元素是绝对定位元素而父元素为static时,height:100%会使得子元素相对于<html>偏移,**`inherit`** 关键字使得元素获取其父元素的[计算值](https://developer.mozilla.org/zh-CN/docs/Web/CSS/computed_value)。

##### vue中使用inherit自适应浏览器高度

```
<div id="app" style="height: inherit"></div>
```

#### 标准的盒模型和IE的有什么区别

标准的盒模型包括 margin、border、padding、content，并且 content 部分不包含其他部分。

![img](https://img-blog.csdn.net/20140124141001609?watermark/2/text/aHR0cDovL2Jsb2cuY3Nkbi5uZXQvenl1eml4aWFv/font/5a6L5L2T/fontsize/400/fill/I0JBQkFCMA==/dissolve/70/gravity/SouthEast)

IE盒模型的范围也包括 margin、border、padding、content，和标准 W3C 盒子模型不同的是：**IE 盒子模型的 content 部分包含了 border 和 padding**。

![img](https://img-blog.csdn.net/20140124141131218?watermark/2/text/aHR0cDovL2Jsb2cuY3Nkbi5uZXQvenl1eml4aWFv/font/5a6L5L2T/fontsize/400/fill/I0JBQkFCMA==/dissolve/70/gravity/SouthEast)

#### 伪元素有哪些

##### CSS伪元素用于向某些选择器设置特殊效果。

| 属性          | 描述                             |
| ------------- | -------------------------------- |
| :first-letter | 向文本的第一个字母添加特殊样式。 |
| :first-line   | 向文本的首行添加特殊样式。       |
| :before       | 在元素之前添加内容。             |
| :after        | 在元素之后添加内容。             |

##### CSS伪类

| 属性         | 描述                                   |
| ------------ | -------------------------------------- |
| :active      | 向被激活的元素添加样式                 |
| :focus       | 向拥有键盘输入焦点的元素添加样式       |
| :hover       | 当鼠标悬浮在元素上方时，向元素添加样式 |
| :link        | 向未被访问的链接添加样式               |
| :visited     | 向已被访问的链接添加样式               |
| :first-child | 向元素的第一个子元素添加样式           |
| :lang        | 向带有指定lang属性的元素添加样式       |

#### 使元素水平居中

`margin: 0 auto`

### 布局

#### 关于flexbox

flexbox是一种一维的布局模型，**一次只能处理一行或者一列的元素布局**。与之相对的是二维布局Grid，可以同时处理行和列上的布局。

##### 主轴和交叉轴

主轴使用`flex-direction`定义，交叉轴垂直于主轴:

设定为`row/row-reverse`，主轴沿着**inline**方向延伸，则交叉轴方向沿着列向下。

设定为`column/column-reverse`，主轴沿着**block排列的方向**延伸，交叉轴是水平方向。

##### 创建flex容器

使用`display:flex`或`display:inline-flex`来创建flex容器。flex容器中的所有flex元素会有下列行为：

元素排列为一行（`flex-direction`初始值为`row`），从主轴的起始线开始，不会在主维度方向上拉伸，但可以缩小。元素被拉伸来填充交叉轴大小。`flex-basis`属性为`auto`，`flex-wrap`属性为`nowrap`。

如果有太多元素超出容器，它们会溢出而不会换行。

##### 更改flex方向flex-direction

flex-direction改为column,主轴和交叉轴交换，改为column-reverse，起始线和终止线交换。

##### 使用flex-wrap实现多行Flex容器

设置`flex-wrap:wrap`

##### flex-direction和flex-wrap组合为简写属性flex-flow

用法：`flex-flow: row wrap;`

##### align-items和justify-content

###### align-items可以使元素在交叉轴方向对齐。

初始值为stretch，所以元素会被拉伸到最高元素的高度--即容器的高度。

flex-start，元素从容器的交叉轴的起始线排列对齐。

flex-end，元素从容器的交叉轴的终止排列对齐。

若元素方向为row,则交叉轴的起止点是从上到下。

相反，若元素方向为column,则交叉轴的起止点是从左到右。

center，居中对齐。

###### justify-content用来使元素在主轴方向上对齐。

space-between,平均分配空间，元素之间间隔相等。

space-around,每个元素的左右空间相等。

#### CSS GRID LAYOUT

css网格布局擅长于将一个页面划分为几个主要区域，以及定义他们的大小、位置、层次等关系。

适用于布局页面主要的区域布局或小型组件。

使用`display:grid`或`display:inline-grid`来创建一个网格容器。

### 镜像翻转如何实现？使用css能不能实现？

#### css缩放元素(scale比例)

#### [How to add a pressed effect on button click in CSS? - GeeksforGeeks](https://www.geeksforgeeks.org/how-to-add-a-pressed-effect-on-button-click-in-css/)

```css
.btn:active {
            transform: scale(0.98);
            /* Scaling button to 0.98 to its original size */
            box-shadow: 3px 2px 22px 1px rgba(0, 0, 0, 0.24);
            /* Lowering the shadow */
}
```

scale()

scaleX()

scaleY()

### `visiblity:hidden;` `display:none;` `opacity` 区别



|                  | 是否占用空间    | 是否引发回流重绘 | 设置transition属性 | 是否触发绑定的事件 |
| ---------------- | --------------- | ---------------- | ------------------ | ------------------ |
| display:none     | 不占,不会被渲染 | 引发回流,开销大  | 无效               | 否                 |
| visiblity:hidden | 占              | 引发重绘         | 无效               | 否                 |
| opacity:0        | 占              |                  | 有效               | 是                 |

### [transition](https://developer.mozilla.org/zh-CN/docs/Web/CSS/transition)属性相关(过渡)

为一个元素在不同状态之间切换时定义不同的过渡效果

#### transition-property

#### transition-duration

指定过渡动画所需时间

#### [transition-timing-function](https://developer.mozilla.org/zh-CN/docs/Web/CSS/transition-timing-function)

#### transition-delay

过渡动画开始之前需要等待的时间
