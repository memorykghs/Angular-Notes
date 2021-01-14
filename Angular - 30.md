# Angular - 30
## 
* `login.component.ts`
this.router.nevigate(導頁，可傳參數)
可帶參數至網址列

`app-routinf.module.ts`
```ts
const routes: Routes = [
  {path: '', redirectTo: '/login', pathMatch: 'full'},
  {path: 'login', component: LoginComponent},
  {path: 'register', component: RegisterComponent},
  {path: 'stocks/list', component: StockListComponent},
  {path: 'stocks/create', component: CreateStockComponent},
  {path: 'stock/:code', component: StockDetailsComponent}, // 可以取得另外頁面導頁過來夾帶的參數
  {path: '**', redirectTo: '/register'}
];
```
一切換頁面就會初始化`StockDetailsComponent`，`path`屬性上指定`:code`表示可以接收其他頁面丟過來的參數並顯示在url。


看一下`stock-details.component.ts`：
```ts
export class StockDetailsComponent implements OnInit {

  public stock: Stock;
  constructor(private stockService: StockService,
              private route: ActivatedRoute) { } // 注入

  ngOnInit() {
    const stockCode = this.route.snapshot.paramMap.get('code'); // 
    this.stockService.getStock(stockCode).subscribe(stock => this.stock = stock);
  }

}
```
`ActivatedRoute`物件可以取解析url上夾帶的參數或是其他功能
`this.route.snapshot.paramMap.get('code');`則是用`ActivatedRoute`物件產生快照，取得其他頁面夾帶在url上的資訊。
`code`代表在`app-routinf.module.ts`設定的`:code`
之後再藉由`getStock(stickCode)`方法拿到該物件，並用`subscirbe()`方法發送出去。

而在導頁前的那個component的html檔上，需要使用`routerLink`服務，指定要夾帶的參數。
```html
<div class="stock-container" routerLink="/stock/{{stock.code}}">
  <div class="name">{{stock.name + ' (' + stock.code + ')'}}</div>
  <div class="exchange">{{stock.exchange}}</div>
  <div class="price"
      [class.positive]="stock.price > stock.previousPrice"
      [class.negative]="stock.price <= stock.previousPrice">$ {{stock.price}}</div>
  <button (click)="onToggleFavorite($event)"
          *ngIf="!stock.favorite">Add to Favorite</button>
  <button (click)="onToggleFavorite($event)"
          *ngIf="stock.favorite">Remove from Favorite</button>
</div>
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