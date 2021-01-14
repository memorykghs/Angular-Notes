# Angular - 
## 
* `ng g guard fuards/auth`選CanActivate 有4個：
1. `CanActivate`
2. `CanActivateChild`
3. `CanADeactivate`
4. `CanLoad`

改動的檔案：
1. `app-routing.module.ts`
```ts
import { AuthGuard } from './guards/auth.guard'; // 改動的行數
...
...
const routes: Routes = [
  {path: '', redirectTo: '/login', pathMatch: 'full'},
  {path: 'login', component: LoginComponent},
  {path: 'register', component: RegisterComponent},
  {path: 'stocks/list', component: StockListComponent, canActivate: [AuthGuard]}, // 改動的行數，表示需要檢核
  {path: 'stocks/create', component: CreateStockComponent, canActivate: [AuthGuard]}, // 改動的行數
  {path: 'stock/:code', component: StockDetailsComponent, canActivate: [AuthGuard]}, // 改動的行數
  {path: '**', redirectTo: '/register'}
];
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