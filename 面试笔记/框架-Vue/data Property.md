在data property中return的数据，即可以在created、method中通过this.[value]使用,也可以接入全局变量

Vue 会在创建新组件实例的过程中调用此函数，将data函数返回的对象以 `$data` 的形式存储在组件实例中。

这些实例property**仅在实例首次创建时添加**，不被包含在$data中的property不会被Vue响应性系统自动跟踪

```js
let tableData = [];
export default{
  data() {
    return {
      tableData: tableData,
    };
  },
  created() {
    getData().then((res) => {
      this.tableData = res.data.map((el) => {
        el.key = el.instrumentId;
        return el;
      });
      console.log(this.tableData);
    });
  },
}
```

