### global服务以及subscribe和next使用

```typescript
//.../app/_services/global.service.ts

import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class Global {
  public appEvent = new Subject();
  constructor() {}
}
```

注入服务

```typescript
import { Global } from 'src/app/_services/global.service';

constructor(
    private global: Global,
  ) {};
  
addBatch(infos) {
    //订阅服务有变化就发送给后台
    this.mapService.batchAddMarker(infos).subscribe(res => {
        //接收后台数据
      this.global.appEvent.next({ msg: 'update.recommended-list', para: res });
        //其他操作
    })
  }
```

子组件，订阅global服务

```typescript
import { Global } from "src/app/_services/global.service";

 constructor(
    private global: Global
  ) {
     //订阅global服务
    this.global.appEvent.subscribe((event: {msg: string, para: any}) => {
      const {msg , para} = event;
      switch (msg) {
        case 'update.recommended-list':
          this.updateMarkersArray(para);
          break;
      }
    });
  }

//updateMarkersArray(data);

updateMarkersArray(data){
    const updateMarkerItem = (item) => {
        //更新单个item
      const updateItem = this.markersArray.find(maker=>{
        return maker.value.googlePlaceId === item.googlePlaceId
      });
      !updateItem.get('id') && updateItem.addControl('id', new FormControl(item.id));
      updateItem.patchValue({ 
        assetId: item.assetId,
        googlePlaceId: item.googlePlaceId,
        googleName: item.googleName? item.googleName : item.name,
        latitude: item.latitude,
        longitude: item.longitude,
        coinNumber: item.coinNumber,
        checked: false,
        exist: true });
      updateItem.disable();
    }
    if(Array.isArray(data) && data.length>0){
      data.forEach(item=>{
        updateMarkerItem(item);
      })
    } else {
      updateMarkerItem(data);
    }
  }
```



