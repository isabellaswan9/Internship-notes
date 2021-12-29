Angular 路由 - 危机中心

绑定 `[routerLinkActiveOptions]="{ exact: true }"`， 这样就只有当用户导航到 `/admin` 这个 URL 时才会激活它，而不会在导航到它的某个子路由时



AdminComponent是一个无组件路由，子路由有一个 `path` 和一个 `children` 属性，但是它没有使用 `component`无*组件*路由可以更容易地[保护子路由](https://angular.cn/guide/router-tutorial-toh#can-activate-child-guard)。

