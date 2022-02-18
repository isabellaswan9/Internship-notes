http module

```js
// synchronous mode
// will block execution of the next line of code until this file is done
fs.writeFileSync("message.txt", message);

//change to (will not block operation)
fs.writeFile("message.txt", message,err=>{
	//do something when the file is done
})
```



module exports

```
module.exports = requestHandler;

module.exports = {
	handler: requrestHandler,
	someText: 'Some hard coded text',
}

module.exports.handler = requestHandler;
module.exports.someText = 'Some Text';

exports.handler = requestHandler;
exports.someText = 'Some Text';
```



