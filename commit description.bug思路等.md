commit c8b2bd1e6ae8e8f09d7e53dd95a37ec8c47741fc:

620 (4) display a fixed number of marks with zoom changed

update recommended list when searching by text and delete point info

support 627



620 (1)  enter map for the first time to locate the user's location



628

2.最上方勾选金币或asset只有选中的item会被赋值？



1.获取userdepartments下的region，注意去重
2.在perfrences下加一个entity，item为region
3.用户选中region后，存到localstorage,无储存则默认第一个



bug思路

2021.08.30

MIM-614

需要在asset为‘’时表单也有效。修改point-info.component的52行。assetId的判断

但是没有标记也不行，如果asset为空，则assetid设为金币

或者同一修改表单验证

关于formControl

如果直接删除验证，就会报错

![image-20210830164221399](C:\Users\taylor.luo\AppData\Roaming\Typora\typora-user-images\image-20210830164221399.png)

所以需要清楚一下formControl怎么传入验证信息的。

解决：直接删去Validator:true和模板的required，就可以了

MIM-613

让地图添加信息后不回到初始点，一开始想的是url传参，经过tammy姐的点拨，可以直接提取info，将currentPosition改为上一个点。

addBatch那里则是定位到数组中的最后一个点，

如果需要定位到原来的点可以通过传参进行（修改了getnearby函数）

2021.08.31

关于优化的问题

每一次更新都要重新加载地图

不使用getPlaces则无法更新地图添加的点

2021.09.01

MIM-619：

1.删除了[disabled]="!selectAll"

或者将selectall和addall分开来。。因为如果一致selectall在只选定了两三个marker时没法用

顺带解决了，选择两三个之后addall会加上所有的coin的问题，修改了addBatchPoint，过滤了markersArray.

获取是否select的方法：item.controls['checked'].value

2.head添加一个select，该值改变时给所有赋值

3.添加edit？

4.不填入参数不支持add all ，asset可以为空，那么就只有coin不能为0啦

2021.9.6

关于图片缓存



Update以后不会自动刷新表单
