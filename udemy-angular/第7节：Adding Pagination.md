## Adding Pagination

### Section Resources

- Angular Material Paginator Docs: https://material.angular.io/components/paginator/overview
- Discussion on Pagination & Mongoose: https://stackoverflow.com/questions/5539955/how-to-paginate-with-mongoose-in-node-js

###### add paginator Module to app.module.ts

```html
<!--post-list.component.ts-->
<mat-paginator [length]="totalPosts" [pageSize]="postsPerPage" [pageSizeOptions]="pageSizeOptions" (page)="onChangePage($event)"  *ngIf="posts.length > 0 && !isLoading"></mat-paginator>
```

###### configure paginator

```typescript
 totalPosts = 0;
 postsPerPage = 2;
 currentPage = 1;
 pageSizeOptions = [1, 2, 5, 10];

onChangePage(pageData: PageEvent) {
    this.isLoading = true;
    this.currentPage = pageData.pageIndex + 1;
    this.postsPerPage = pageData.pageSize;
    this.postsService.getPosts(this.postsPerPage,this.currentPage)
  }
```

###### send req to backend

```typescript
getPosts(postsPerPage: number, currentPage: number) {
    const queryParams = `?pagesize=${postsPerPage}&page=${currentPage}`;
    this.http
      .get<{ message: string; posts: any; maxPosts: number }>(
        "http://localhost:3000/api/posts" + queryParams
      )
      .pipe(map((postData) => {
        return {
          posts: postData.posts.map(post => {
            return {
              title: post.title,
              content: post.content,
              id: post._id,
              imagePath: post.imagePath
            };
          }),
          maxPosts: postData.maxPosts
        };
      }))
      .subscribe(transformedPosts => {
        this.posts = transformedPosts.posts;
        this.postsUpdated.next({ posts: [...this.posts], postCount: transformedPosts.maxPosts });
      });
  }
```

###### respond

```javascript
router.get("", (req, res, next) => {
    const pageSize = +req.query.pagesize;
    const currentPage = +req.query.page;
    const postQuery = Post.find();
    //if the query has params limit postQuery field
    if (pageSize && currentPage) {
        postQuery.skip(pageSize * (currentPage - 1))
            .limit(pageSize);
    }
    let fetchedPosts;
    postQuery.then(documents => {
        fetchedPosts = documents;
        //then block will create a new promise and listen to its result automatically
        return Post.count();
    }).then(count => {
        res.status(200).json({
            message: "Posts fetched successfully!",
            posts: fetchedPosts,
            maxPosts: count,
        });
    });
});
```

remember modify response data structure

