# sass和css的区别

## 混合器@mixin和@include

```scss
@mixin rounded-corners {
  -moz-border-radius: 5px;
  -webkit-border-radius: 5px;
  border-radius: 5px;
}
```

```scss
notice {
  background-color: green;
  border: 2px solid #00aa00;
  @include rounded-corners;
}
```

##### 使用规则

如果你发现自己在不停地重复一段样式，那就应该把这段样式构造成优良的混合器，尤其是这段样式本身就是一个逻辑单元，比如说是一组放在一起有意义的属性。

##### 给混合器传参

```scss
@mixin link-colors($normal, $hover, $visited) {
  color: $normal;
  &:hover { color: $hover; }
  &:visited { color: $visited; }
}
```

```scss
a {
  @include link-colors(blue, red, green);
}
```

## extends 选择器继承

```scss
//通过选择器继承继承样式
.error {
  border: 1px solid red;
  background-color: #fdd;
}
.seriousError {
  @extend .error;
  border-width: 3px;
}
```

### 混合器和extends的区别

[混合器](https://www.sass.hk/guide/)主要用于展示性样式的重用，而类名用于语义化样式的重用。

## 嵌套css

使用嵌套css，样式可读性更高

```scss
#content {
  article {
    h1 { color: #333 }
    p { margin-bottom: 1.4em }
  }
  aside { background-color: #EEE }
}
```

#### 父选择器的标识符&

```scss
article a {
  color: blue;
  &:hover { color: red }
}
```

当包含父选择器标识符的嵌套规则被打开时，它不会像后代选择器那样进行拼接，而是`&`被父选择器直接替换：

```css
article a { color: blue }
article a:hover { color: red }
```

#### 子组合选择器和同层组合选择器：>、+和~

子组合选择器>选择一个元素的直接子元素。

#### 嵌套属性

```css
nav {
  border-style: solid;
  border-width: 1px;
  border-color: #ccc;
}
```

可以这样写

```scss
nav {
  border: {
  style: solid;
  width: 1px;
  color: #ccc;
  }
}
```

同层相邻组合选择器`+`

同层全体组合选择器`~`

<img src="../../notes-images/截屏2022-03-15 下午5.29.31.png" alt="截屏2022-03-15 下午5.29.31" style="zoom:40%;float:left" />

## 使用变量

##### 变量声明及引用

```scss
$highlight-color: #F90;
$highlight-border: 1px solid $highlight-color;
.selected {
  border: $highlight-border;
}
```

