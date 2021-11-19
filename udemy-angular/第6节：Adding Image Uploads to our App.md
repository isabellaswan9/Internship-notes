

FileReader

```typescript
const reader = new FileReader();
    reader.onload=() => {
      this.imagePreview = reader.result;
    }
    reader.readAsDataURL(file);
```



A normal synchronous validators would simply return a Javascript object where you have a key value pair with your own error code and then a value for that error coder or null. if a validator returns null, the value is treated to be valid.



a async validator

the javascript object to error code is wrapped by a promise or an observable





##### 70. Adding Server Side Upload

to extract files

```
npm install --save multer
```

