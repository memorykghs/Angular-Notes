# Angular - 24 - Routing
Angular 是一個 SPA 的設計，也就是在單一畫面上的所有操作與行為 ( 例如切換頁籤等 ) 都只是透過 JavaScript 的選染，Routing 就是用來處理指定要呈現哪個 Compoonent 的功能。 

## 定義路由
在一開始建立專案時，會看到
要使用 Routing 前先在 AppModule 中 import RouterModule ( 如果用 ng new 產生專案時有設定不需要額外 import，另外會多出 `app-routing.module.ts` 檔，設定在這個檔案下也可以。
```
|--app
    |--app-routing.module.ts // 更改
    |--app.component.html // 更改
```

1. `app-routing.module.ts`
```ts
const appRoutes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'users', component: UsersComponent},
  {path: 'servers', component: ServersComponent},
]

@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
```
首先建立一個 Routes 物件，用來設定各 Component 的 URL，當然也可以指定重導向的路由。Routes 物件中包含多組物件，每組物件通常會有 `path` 及 `component` 兩個 key 值，分別設定路由及指定要顯示的 Component。如果想把某個 Component 當作是首頁的話，可以將 `path` 設定為 `''`，在 URL 後面沒有任何東西的時候就導向這個元件。而路由其實也是一種樹狀結構，不同的路由下也可以再設定其子路由，結構如下：<br/>
![](/images/24-1.png)

再來需要將定義好的路由載入到 `@NgModule()`，在 `@NgModule()` 的 `imports` 陣列中加入 `RouterModule.forRoot(appRoutes)` 即可。在 `RouterModule.forRoot(appRoutes)` 也可以添加新的參數 `enableTracing` 來啟動路由的追蹤，打開 F12 就可以查看路由追蹤的資訊。

#### 定義萬用路由
```
|--app
    |--app-routing.module.ts // 更改
    |--app.component.html
```

1. `app-routing.module.ts`
```ts
const appRoutes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'users', component: UsersComponent},
  {path: 'servers', component: ServersComponent},
  {path: '**', component: ServersComponent, pathMatch: 'full'}
]

@NgModule({
  imports: [
    RouterModule.forRoot(appRoutes), 
    {
      enableTrancing: true // 啟用路由追蹤
    }
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
```
需要注意的地方是，在設定路由時順序是有相關性的，Angular 在解析這個路由定義物件時會由上往下解析，設定時需要特別注意。最下面通常也會定義一組完用路由 ( wildcard route )，讓沒有 mapping 地的 URL 都導向指定畫面。

#### 定義重導向路由 ( redirect )
```
|--app
    |--app-routing.module.ts // 更改
    |--app.component.html // 更改
```

1. `app-routing.module.ts`
```ts
const appRoutes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'test', redirectTo: '', pathMatch: 'full'},
  {path: 'users', component: UsersComponent},
  {path: 'servers', component: ServersComponent},
  {path: '**', component: ServersComponent, pathMatch: 'full'}
]

@NgModule({
  imports: [
    RouterModule.forRoot(appRoutes), 
    {
      enableTrancing: true // 啟用路由追蹤
    }
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
```
使用 `redirectTo` 時一定要加上 `pathMatch` 屬性。重導向路由最多只能轉向一次，沒有辦法連續的跳轉，例如從 `/` 轉到 `/users` 在跳轉到 `/servres`。
<br/>

2. `app.component.html`
```html
<div class="container">
  <div class="row">
    <div class="col-xs-12 col-sm-10 col-md-8 col-sm-offset-1 col-md-offset-2">
      <ul class="nav nav-tabs">
        <li role="presentation"><a href="#">Home</a></li>
        <li role="presentation"><a href="#">Servers</a></li>
        <li role="presentation"><a href="#">Users</a></li>
      </ul>
    </div>
  </div>
  <div class="row">
    <div class="col-xs-12 col-sm-10 col-md-8 col-sm-offset-1 col-md-offset-2">
      <router-outlet></router-outlet>
    </div>
  </div>
</div>
```
而在 Template 的部分會在父原件上定義路由插座 ( router-outlet )。在想要抽換 Component 的部分加上 `<router-outlet></router-outlet>`，觸發不同路由後 Router 會找出相對應的 Component 實例化，替換掉這個 tag 後呈現。

## 定義子路由 ( children )
```
|--app
    |--app-routing.module.ts // 更改
    |--app.component.html
```

1. `app-routing.module.ts`
```ts
const appRoutes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'test', redirectTo: '', pathMatch: 'full'},
  {path: 'users', component: UsersComponent},
  {path: 'servers', component: ServersComponent},
  {path: 'settings',
    children: [ // 放置路由設定 (無元件路由：僅包含子路由)
      {path: 'color', component: ColorComponent},
      {path: 'profile', component: ProfileComponent},
    ]
  }
  {path: '**', component: ServersComponent, pathMatch: 'full'}
]

@NgModule({
  imports: [
    RouterModule.forRoot(appRoutes), 
    {
      enableTrancing: true // 啟用路由追蹤
    }
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
```

## 設定 RouterGuard
當某些頁面的使用權限比較高時，我們不希望只擁有一般權限的使用者進到這個頁面，這種概念就稱為 RouterGuard。這裡會新增兩個 Service，`AuthService` 當作記錄使用者登錄情況的 Service，`AuthGuardService` 則是主要做成 RouterGuard 的 Service。

```
|--app
    |--app.module.ts // 更改
    |--auth-guard.service.ts // 更改
    |--auth.service.ts // 更改
```

AuthService 當作記錄使用者登錄情況的 Service，把 loggedIn 狀態放入其中，AuthGuardService 則是主要做成 RouterGuard 的 Service，這個 Service 需要實作 CanActivate，回傳可以是單純的 boolean 或是非同步物件內部包裝 boolean 值，這邊設定成回傳 Promise，最後回到 AppModule 中的 appRoutes，看想把 RouterGuard 設定於哪個 Component，就在上面新增 canActivate 屬性，並在內部放入有實作 CanActivate 的 AuthGuardService。

> 參考
* [神的 github](https://github.com/we-jia/Angular-LearningNote/blob/main/12.%20Pipe.md)
* 保哥講義