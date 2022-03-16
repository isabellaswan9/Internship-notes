在 `AppRoutingModule` `routes` 中使用 `loadChildren` 代替 `component` 进行配置

```typescript
const routes: Routes = [
  {
    path: 'items',
    loadChildren: () => import('./items/items.module').then(m => m.ItemsModule)
  }
];
```

