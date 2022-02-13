## Adding User Authentication



### create the User Model

#### Add validator for mongdb data

##### download unique validator

`npm install --save mongoose-unique-validator`

###### use uniqueValidator in data model

```javascript
const mongoose = require("mongoose");
const uniqueValidator = require('mongoose-unique-validator')

const userSchema = mongoose.Schema({
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true }
});

userSchema.plugin(uniqueValidator)
module.exports = mongoose.model("User", userSchema);
```



### creating a new User Upon Request

#### encrypt 

##### bcrypt : a package that offers encryption functionalities

`npm install --save bcrypt`

##### use bcrypt to encrypt

```javascript
const bcrypt = require("bcrypt");

// bcrpt.hash() receive a value high enough to yield a secure hash and not take infinitely
bcrypt.hash(req.body.password, 10)
```



201:created 已创建



### Understanding SPA Authentication and implement

token: can't be faked

[Angular & NodeJS - The MEAN Stack Guide [2021 Edition\] | Udemy](https://www.udemy.com/course/angular-2-and-nodejs-the-practical-guide/learn/lecture/10536930#announcements)



#### create a token

##### json web token

```
npm install --save jsonwebtoken
```



```javascript
const jwt = require("jsonwebtoken");
//generate token
const token = jwt.sign(
    { email: user.email, userId: user._id },
    "secret_this_should_be_longer",
    //expiresIn allows you to define how long this should last
    { expiresIn: "1h" }
);
```



Adding Middleware to Protect Routes

build a middleware to check authorization

```javascript
// backend/middeleware/check-auth.js

const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
    try {
        //"Bearer <token>"
        const token = req.headers.authorization.split(" ")[1];
        jwt.verify(token, "secret_this_should_be_longer");
        next();
    } catch (error) {
        //if don't have a token
        res.status(401).json({ message: "Auth failed! token expired or doesn't existed" });
    }
}
```

add to protect routes

```javascript
const checkAuth = require("../middleware/check-auth")

router.post("",
    checkAuth,
    multer({ storage: storage }).single("image"), (req, res, next) => {
    //...
    }
```



### Adding the Token to Authenticate Requests

add interceptor: that will run on any going HTTP request and we can then manipulate these outgoing requests like to attach our token 

#### create interceptor

```typescript
//auth-interceptor.js

import { HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { AuthService } from "./auth.service";

@Injectable()

export class AuthInterceptor implements HttpInterceptor{
    constructor(private authService: AuthService) { } 
    //angular will call this method for requests leaving your app
    //receive two arguments : 1. the req you intercept 
    intercept(req: HttpRequest<any>, next: HttpHandler) {
        const authToken = this.authService.getToken;
        const authRequest = req.clone({
            headers: req.headers.set("Authorization", "Bearer " + authToken)
        })
        //next allow us to leave the interceptor 
        return next.handle(authRequest);
    }
}
```

#### inject this as a service

```typescript
//app.module.ts

import { HTTP_INTERCEPTORS } from "@angular/common/http";
import { AuthInterceptor } from "./auth/auth-interceptor";

  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true }
  ],
```

add headers to cors configuration

```javascript
//app.js
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept,Authorization"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PATCH, PUT, DELETE, OPTIONS"
  );
  next();
});
```



### improving ui to reflect the authentication status

add a listener when login to send the login message

```typescript
private isAuthenticated = false;
private authStatusListener = new Subject<boolean>();
private authStatusListener = new Subject<boolean>();

getIsAuth() {
        return this.isAuthenticated;
}
getAuthStatusListener() {
        return this.authStatusListener.asObservable();
}
    
login(email: string, password: string) {
        const authData: AuthData = { email: email, password: password };
        this.http.post<{ token: string }>("http://localhost:3000/api/user/login", authData).subscribe(response => {
            console.log(response)
            const token = response.token;
            this.token = token;
            if (token) {
                this.isAuthenticated = true;
                this.authStatusListener.next(true);
            }
        })
    }
```

subscribe at the component

```typescript
userIsAuthenticated: boolean;
private authStatusSub;

ngOnInit() {
    this.userIsAuthenticated = this.authSevice.getIsAuth();
    this.authStatusSub = this.authSevice.getAuthStatusListener().subscribe(isAuthenticated => {
      this.userIsAuthenticated = isAuthenticated;
    })
  }
  
//unsubscribe when destroy
ngOnDestroy() {
    this.postsSub.unsubscribe();
    this.authStatusSub.unsubscribe();
}
```



### Adding Route Guards

create auth.guard.ts

get is auth from authService and if no auth return false

```typescript
//auth.guard.ts

import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from "@angular/router";
import { Observable } from "rxjs";
import { AuthService } from "./auth.service";
@Injectable()
export class AuthGuard implements CanActivate {
    constructor(private authService:AuthService, private router: Router){}
    canActivate(router: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | Observable<boolean> | Promise<boolean> {
        // if return true or a promise or an observable which eventually yields true the route which we were protecting is accessible
        const isAuth = this.authService.getIsAuth();
        if (!isAuth) {
            this.router.navigate(['/login'])
        }
        return isAuth;
    }
}
```

add to routing module

```typescript
const routes: Routes = [
    { path: '', component: PostListComponent },
    { path: 'create', component: PostCreateComponent, canActivate: [AuthGuard] },
    { path: 'edit/:id', component: PostCreateComponent, canActivate: [AuthGuard] },
    { path: 'login', component: LoginComponent },
    { path: 'signup', component: SignupComponent }
]
```

### Reflecting the Token Expiration in the UI

respond expiresIn at the backend

```
//
```



save auth data

```
{{'Once confirm, all information will be lost. Are you sure to proceed'|translate}}?
"Unsaved information":"未保存的信息",
    "Once confirm, all information will be lost. Are you sure to proceed":"一旦确认，所有信息将丢失。你确定要继续吗"

```

