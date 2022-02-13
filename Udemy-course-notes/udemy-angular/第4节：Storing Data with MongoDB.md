## Storing Data with MongoDB

##### Comparing SQL & NoSQL



setting up [mongoDB](https://www.udemy.com/course/angular-2-and-nodejs-the-practical-guide/learn/lecture/10523070#announcements)



connect to mongoDB , the most important thing is setting a right ip address



[pipe and map operators](https://www.udemy.com/course/angular-2-and-nodejs-the-practical-guide/learn/lecture/10523116#notes) 

```typescript
 getPosts() {
    this.http
      .get<{ message: string; posts: any }>(
        "http://localhost:3000/api/posts"
    )
      //operators are functions we can apply to the observable streams 
      //(the data we get through these streams) before the data is 
      // ultimately handled in the subscription
      .pipe(map((postData) => {
        return postData.posts.map(post => {
          return {
            title: post.title,
            content: post.content,
            id: post._id
          };
        });
      }))
      .subscribe(transformedPosts => {
        this.posts = transformedPosts;
        this.postsUpdated.next([...this.posts]);
      });
  }
```

