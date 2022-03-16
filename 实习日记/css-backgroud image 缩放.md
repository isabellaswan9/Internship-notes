关于控制css图片的缩放比例

```
<div class="logo"></div>
```

使用background-image,并不能达到缩放效果

```
  .logo {
    width: 100px;
    height: 100px;
    background-image: url(~src/assets/images/logo2.jpg);
  }
```

要控制background image的大小，应该使用background-size属性，注意使用width height属性定义盒子的大小

```
  .logo {
    width: 100px;
    height: 100px;
    background-image: url(~src/assets/images/logo2.jpg);
    background-size: 100px 100px;
  }
```

