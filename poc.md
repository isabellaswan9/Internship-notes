```typescript
//add img detail

if (property == 'Condition') {

const monitorData: [] = details[property].details.LoseMonitorData ? details[property].details.LoseMonitorData : [];

this.basicInfo.resultImg.forEach(element => {

const imgData:any = monitorData.find((data:any) => {

return data.image_id == element.id;

})

element.temperatureF = imgData.temperature_F ? imgData.temperature_F : null;

element.temperatureC = imgData.temperature_F ? 5 / 9.0 * (imgData.temperature_F - 32) : null;     

element.humidity = imgData.humidity ? imgData.humidity : null;

element.time = imgData.image_time ? imgData.image_time : null;

});

}
```

