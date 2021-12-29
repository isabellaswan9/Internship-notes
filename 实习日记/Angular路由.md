### Angular路由

在一个独立的顶层模块中加载和配置路由器，它专注于路由功能，然后由根模块 `AppModule` 导入它。

生成一个路由模块类：`ng generate module app-routing --flat --module=app`

> `--flat` 把这个文件放进了 `src/app` 中，而不是单独的目录中。
> `--module=app` 告诉 CLI 把它注册到 `AppModule` 的 `imports` 数组中。

如果选择了add routing为yes，则不需要执行以上命令。

#### 路由配置

 *Routes* 告诉路由器，当用户单击链接或将 URL 粘贴进浏览器地址栏时要显示哪个视图。

典型的 Angular `Route` 具有两个属性：

- `path`: 用来匹配浏览器地址栏中 URL 的字符串。
- `component`: 导航到该路由时，路由器应该创建的组件。

`@NgModule` 元数据会初始化路由器，并开始监听浏览器地址的变化。

`forRoot()` 方法会提供路由所需的服务提供者和指令，还会基于浏览器的当前 URL 执行首次导航。

##### 添加路由出口`routerOutlet`

`<router-outlet>` 会告诉路由器要在哪里显示路由的视图。

路由出口扮演一个占位符的角色，表示路由组件将会渲染到哪里。

```html
<!--app.component.html-->
<h1>Angular Router</h1>
<nav>
  <a routerLink="/crisis-center" routerLinkActive="active">Crisis Center</a>
  <a routerLink="/heroes" routerLinkActive="active">Heroes</a>
</nav>
<router-outlet></router-outlet>
```

##### `routerLink`添加路由链接

`routerLink` 是 [`RouterLink` 指令](https://angular.cn/api/router/RouterLink)的选择器，它会把用户的点击转换为路由器的导航操作

`<a routerLink="/heroes" routerLinkActive="active-link">Heroes</a>`

`path` 中的冒号（`:`）表示 `:id` 是一个占位符

支持路由的组件：

- 获取创建本组件的路由
- 从这个路由中提取出 `id`
- 通过 `HeroService` 从服务器上获取具有这个 `id` 的英雄数据。

###### [`routerLinkActive`](https://angular.cn/api/router/RouterLinkActive)

跟踪元素上的链接路由当前是否处于活动状态，并允许你指定一个或多个 CSS 类，以便在链接路由处于活动状态时添加到该元素。

当浏览器的当前 url 是 '/heroes' 时，就会往 `a` 标签上添加 `active-link` 类； 如果 url 发生了变化，则移除它。

##### 从路由参数中提取id

`const id = Number(this.route.snapshot.paramMap.get('id'));`

`route.snapshot` 是一个路由信息的静态快照，抓取自组件刚刚创建完毕之后。

`paramMap` 是一个从 URL 中提取的路由参数值的字典。 `"id"` 对应的值就是要获取的英雄的 `id`。

##### 定义通配符路由

添加一个通配符路由来拦截所有无效的 URL，并优雅的处理它们。

```typescript
{ path: '**', component: PageNotFoundComponent }
```

创建 `PageNotFoundComponent`，以便在用户访问无效网址时显示它。

```shell
ng generate component page-not-found
```

```html
<!--page-not-found.component.html (404 component)-->
<h2>Page not found</h2>
```

##### 完整的appRoutes

```typescript
const appRoutes: Routes = [
  { path: 'crisis-center', component: CrisisListComponent },
  { path: 'heroes',        component: HeroListComponent },
    //pathMatch = 'full' 会导致 URL 中剩下的、未匹配的部分必须等于 ''
    //若设置为'prefix'，每个URL都会匹配''
  { path: '',   redirectTo: '/heroes', pathMatch: 'full' },
  { path: '**', component: PageNotFoundComponent }
];
```

### 使用ActivatedRoute 

[ParamMap API](https://angular.cn/guide/router-tutorial-toh#parammap-api)

```typescript
///hero-detail.component.ts
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { switchMap } from 'rxjs/operators';

constructor(
  private activatedRoute: ActivatedRoute,
  private router: Router,
  private heroService: HeroService
) {}

ngOnInit() {
    //使用 ActivatedRoute 服务来检索路由的参数
  this.hero$ = this.activatedRoute.paramMap.pipe(
      //switchMap 操作符
      //把 HeroService 返回的 Observable<Hero> 拍平 ?
      //并取消以前的未完成请求
    switchMap((params: ParamMap) =>
      this.heroService.getHero(params.get('id')!))
  );
}
```



使用`paramMap`，接收路由参数的可观察对象，可以在复用组件实例（即没有访问过其他组件就导航到同一个组件）时，更新这些参数，不必先从DOM中移除原来的组件重新渲染视图。如果确定组件不会被复用，可以使用snapshot。

#### 导航回到列表

使用`gotoHeros`函数回到列表，并向`HeroListComponent`传参以突出显示该英雄

```typescript
gotoHeroes(hero: Hero) {
  const heroId = hero ? hero.id : null;
  // Pass along the hero id if available
  // so that the HeroList component can select that hero.
  // Include a junk 'foo' property for fun.
  this.router.navigate(['/heroes', { id: heroId, foo: 'foo' }]);
}
```

#### [添加路由动画](https://angular.cn/guide/router-tutorial-toh#navigating-back-to-the-list-component)

如果在两个路由之间切换，导航进来时，`HeroDetailComponent` 和 `HeroListComponent` 会从左侧滑入；导航离开时将会从右侧划出。



