# Angular - 27 - HttpClient
## HttpClient
* 內建元件，使用 Http 與後端服務進行通訊
* `AppModule` 匯入 `HttpModule` 模駔(建議 import 於 `BrowserModule` 之後)
  ```ts
  import { HttpClientModule } from '@angular/common/http';
  ...
  ...
  @NgModule({
  declarations: [
    AppComponent,
    StockItemComponent,
    CreateStockComponent,
    StockListComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule, // 改動的行數
    AppRoutingModule
  ],
  ...
  ...
  ```

npm install
node index.js

* 將 Http 服務注入於要使用的原件
import HttpClientModule
* 同源政策的問題
app.module.ts下要新增proxy.conf.json

本專案起server：`ng serve --proxy-config proxy.conf.json`

stockMarcketserver起專案：`node index.js`

proxy.conf.json
```ts
{
  "/api": {
    "target": "http://localhost:3000",
    "secure": false
  }
}
```
<br/>

#### 改動的檔案：
1. `app.module.ts`
```ts
import { HttpClientModule } from '@angular/common/http'; // 改動的行數
...
...
@NgModule({
  declarations: [
    AppComponent,
    StockItemComponent,
    CreateStockComponent,
    StockListComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule, // 改動的行數
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
```
<br/>

2. `app.component.ts`
```ts
import { Stock } from './model/stock'; // 改動的行數
...
...
export class AppComponent {
  title = 'Stock Market App';

  public stock: Stock; // 改動的行數

  ngOnInit(): void { }
}
```
<br/>

3. `create-stock.component.ts`
```ts
import { Component, OnInit } from '@angular/core';
import { Stock } from 'src/app/model/stock';
import { StockService } from 'src/app/services/stock.service';

@Component({
  selector: 'app-create-stock',
  templateUrl: './create-stock.component.html',
  styleUrls: ['./create-stock.component.css']
})
export class CreateStockComponent {

  public stock: Stock;
  public confirmed = false;
  public message = null;
  public exchanges = ['NYSE', 'NASDAQ', 'OTHER'];
  
  constructor(private stockService: StockService) {
    this.initializeStock();
  }

  initializeStock() {
    this.stock = {
      name: '',
      code: '',
      price: 0,
      previousPrice: 0,
      exchange: 'NASDAQ',
      favorite: false
    };
  }

  setStockPrice(price) {
    this.stock.price = price;
    this.stock.previousPrice = price;
  }

  createStock(stockForm) {
    if (stockForm.valid) {
      this.stockService.createStock(this.stock)
          .subscribe((result) => {
            this.message = result.msg;
            this.initializeStock();
          }, (err) => {
            this.message = err.msg;
          });
    } else {
      console.error('Stock form is in an invalid state');
    }
  }
}
```

4. `stock-item.component.html`
```html
<div class="stock-container">
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

5. `stock-item.component.ts`
```ts
export class StockItemComponent {

  @Input() public stock: Stock;

  constructor(private stockService: StockService) {
   }

  onToggleFavorite(event) {
    this.stockService.toggleFavorite(this.stock).subscribe((stock) => { // 改動的行數
      this.stock.favorite = !this.stock.favorite;
    });
  }
}
```

6. `stock-list.component.html`
```html
<app-stock-item *ngFor="let stock of stocks$ | async" [stock]="stock">
</app-stock-item>
```
<br/>

7. `stock-list.component.ts`
```ts
import { Observable } from 'rxjs'; // 改動的行數
...
...
export class StockListComponent implements OnInit {

  public stocks$: Observable<Stock[]>; // 改動的行數
  constructor(private stockService: StockService) { }

  ngOnInit() {
    this.stocks$ = this.stockService.getStocks(); // 改動的行數
  }
}
```
<br/>

8. `stock.ts`
```ts
export interface Stock {
  name: string;
  code: string;
  price: number;
  previousPrice: number;
  exchange: string;
  favorite: boolean;
}
```