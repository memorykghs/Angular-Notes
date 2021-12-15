# Angular - 29
## Base Router
* app-routers.ts
可以設定網址路徑以及要載入的component

`**`：萬用路由(防止萬宜瀏覽器上的url是錯的話，可以統一導向某個頁面)

`app-routes.module.ts`
```ts
import { CreateStockComponent } from './stock/create-stock/create-stock.component';
import { StockListComponent } from './stock/stock-list/stock-list.component';
import { RegisterComponent } from './user/register/register.component';
import { LoginComponent } from './user/login/login.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {path: '', redirectTo: '/login', pathMatch: 'full'}, // 當沒有打url時自動重新導向至login畫面
  {path: 'login', component: LoginComponent},
  {path: 'register', component: RegisterComponent},
  {path: 'stocks/list', component: StockListComponent},
  {path: 'stocks/create', component: CreateStockComponent},
  {path: '**', redirectTo: '/register'} // 當url有錯時自動重新導向至註冊畫面
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
```

改動的檔案：
1. `stock-item.component.html`
```html
```
<br/>

2. `stock-item.component.ts`
```ts
...
...
export class StockItemComponent implements OnInit {

}
```
<br/>