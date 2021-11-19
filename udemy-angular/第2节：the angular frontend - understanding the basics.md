##### Event binding （clicked）

 

##### String interpolation {{}}

 

`<textarea rows="6" value="'Test'"><textarea>`

don't have value

##### use Property binding:

`<textarea rows="6" [value]="'Test'"><textarea>`

 

Attribute and property:

 html elements in the dom and in javascript are just javascript objects with a couple of properties.

#### Naming rules:

1. Start with an 'on' at the beginning of your method name for methods that are triggered upon events.

 

Local reference:

`#postInput `

It creates a reference to that element which you can use 

```typescript
(click)="onAddPost()"
//to see the javascript object
onAddPost(){
    console.dir(postInput)
    this.newPost = postInput.value;
}
```

#### two-way binding

ngModel is a directive that will listen to user input and emit that data to us and also store new data in that text area or out put it there.

first import ngModel from formsModule

```
import FormsModule from '@angular/forms';

imports:[FormsModule]
```

it will automatically update enter value or entered value here with every keystroke

```
<textarea rows="6" [(ngModel)]="enteredValue"
```

angular material 

> a package created by parts of the angular team,which gives us a set of pre-built angular components.

[add angular material](https://www.udemy.com/course/angular-2-and-nodejs-the-practical-guide/learn/lecture/10416244#announcements)

```shell
npm install --save @angular/material
//or
ng add @angular/material
```

to use input, add input module into appModule(angular material version 8)

```
import {MatInputModule} from '@angular/material';

imports:[MatInputModule]
```

if use material v9 or higher, [the way](https://material.angular.io/components/input/api) you add this module differs a bit changed.

```
import {MatInputModule} from '@angular/material/input';
```

or find right import statement in material.angular.io/../api



#### EventEmitter

1. ##### emit our own events

   ```typescript
   //子组件
   import  {EventEmitter,Output} from "@angular/core";
   
   //@Output turn this into an event to which you can listen to from the outside(parent component)
   @Output() postCreated = new EventEmitter();
   
   onAddPost(){
   	//组建post
   	this.postCreated.emit(post);
   }
   ```

2. ##### send data into a component

   ```html
   //父组件.html
   <app-post-create (postCreated)="onPostAdded($event)"></app-post-create>
   <!--angular's change detection will automatically detect whenever a new post is created when that changes and when it needs to render this new post.-->
   <app-post-list [posts]="storedPosts"></app-post-list>
   ```
   
   ```typescript
   //父组件.ts
   storedPosts = [];
   onPostAdded(post){
   	this.storedPosts.push(post);
   }
   ```

#### Service

a service is a class which you add to your angular application,which you let inject by angular into components.



a reference type is a type where if you copy it you don't really copy it,the object in memory will stay the same, you just copied the address, so the pointer pointing at the object. to make a true copy, use the spread operator.



#### Creating a Post Model

create a model which define how a post looks like in our application.

```
//post.model.ts

export interface Post{
	title: string;
	content: string;
}
```

```typescript
import { Post } from './posts/post.model'

posts: Post[] = [];
```

event emitter is so-called generic type which simply means we can pass additional information about which type of data it works with.

```
@Output() postCreated = new EventEmitter<Post>();
```

#### Adding Forms

when it detects a form element and we get the forms module included which we do,it will automatically create a javascript object behind the scenes which represents this form.

##### add Validation by adding some default html 5 validators

```html
<!-- add a reference to the form-->
<form (submit)="onAddPost(postForm)" #postForm="ngForm">
    <!--angular needs to know how to name this input so we need to add name attribute-->
	<input type="text" name="title" ngModel required minlength="3"></input>
</form>
```

```typescript
import {NgForm} from "@angular/forms";
onAddPost(form:NgForm){
    if(form.invalid){
        return;
    }
	const post:Post={
        title: form.value.title,
    }
}
```

the observer is essentially the thing subscribing to an observable or the thing which establishes the subscription and manages it.
