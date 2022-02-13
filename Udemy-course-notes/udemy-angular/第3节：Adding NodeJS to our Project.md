# Adding NodeJS to our Project

ng serve use a nodejs server but it is not a production ready server.

restful API:rest for representation state transfer



```shell
node server.js
```

we can execute any javascript file with node ,except for files that try to access something in the dom, because nodejs is a server side runtime there is no dom

```javascript
/*server.js*/

//require: the nodejs import syntax
const http = require('http');
const { Http2ServerRequest } = require('http2');

//create a new server
//request listener: a function it will execute for every incoming request
//no matter which path this request targets
//req and res will be passed in by nodejs
const server = http.createServer((req,res) => {
    res.end('hello')
});

server.listen(process.env.PORT || 3000);
```

##### res has a couple of methods

end()

send()

### express

a framework for nodejs to make nodejs development easier.

`npm install --save express`

```javascript
// ../backend/app.js

const express = require('express');

const app = express();

//add a middleware on app and the incoming request
app.use((req, res, next) => {
    console.log('First middleware');
    // next() made request continue traveling down that file and reaching other middlewares
    next();
})

app.use((req, res, next) => {
    //send back response
    //this res is different than in nodejs
    res.send('Hello from express');
})

//export app  
module.exports = app;
```

connect app to server.js

```javascript
const http = require('http');
const { Http2ServerRequest } = require('http2');
const app = require('./backend/app');

const port = process.env.PORT || 3000;
app.set('port', port);

const server = http.createServer(app);

server.listen(port);
```

#### add nodemon 

`yarn install --dev nodemon `

```json
//package.json
"scripts":{
	"start:server":"nodemon server.js"
}
```


```javascript
app.use('/api/posts',(req, res, next) => {
    console.log('First middleware');
    const posts = [{}, {}]
    //set a status code with status method
    return res.status(200).json(posts);
})
```

####  Using the Angular HTTP Client

```typescript
//app.module.ts
import { HttpClientModule } from "@angular/common/http";

imports:[HttpClientModule]
```

```typescript
//posts.service.ts

//add httpClient to service
import { HttpClientModule } from "@angular/common/http";

constructor(private http: HttpClient){

}

getPosts(){
    this.http.get<{message:string, posts:Post[]}>('http://localhost:3000/api/posts').subscribe();
}


```



Understanding CORS

To disable this default mechanism, this is done by setting the right headers on the server side response.

```javascript
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PATCH, DELETE, OPTIONS"
  );
  next();
});
```

