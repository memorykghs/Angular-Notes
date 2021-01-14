# Angular - 27 - Observable
## Observable
* 屬於 Rxjs 的物件( Angular 本身含有Rxjs的程式碼)
  * 用宣告式寫 &rArr; Functional Programming
  * 沒有副作用(例如：console.log()並非JS原生的方法)
<br/>

* 有任何元素或資源改變，結果應該自動偵測並跟著改變 &rArr; 建立 Observable 物件(可觀察物件)
  * 要執行建立的可觀察物件並開始接收通知，需呼叫其 `subscribe` 方法。
  * 當執行完成或取消訂閱時，訂閱者( subscriber )會收到通知。
    ```ts
    this.http.get('api/srticles.json').subscribe(nextFunc, errorFunc, CompleteFunc);
    ```
    1. `nextFunc`：當 Observable 有資料出現時執行，**必要**
    2. `errorFunc`：當 Observable 有錯誤發生時執行，非必要
    3. `CompleteFunc`：當 Observable 完成時執行，非必要
  
  * 使用 `subscribe` 方法需要在 `ongOnDestroy` 時取消訂閱，避免發生 memory leak。
<br/>

* 習慣上將可觀察變數命名後方加上 `$` 字號(代表 Observable 物件)
<img src="/img/service_injection_params.png" width="300px">
<br/>

#### 改動的檔案：
1. `stock.service.ts`
```ts
import { Observable, of } from 'rxjs'; // 改動的行數
...
...
export class StockService {

  private stocks: Stock[];
  constructor() {
    this.stocks = [
      new Stock('Test Stock Company', 'TSC', 85, 80, 'NASDAQ'),
      new Stock('Second Stock Company', 'SSC', 10, 20, 'NSE'),
      new Stock('Last Stock Company', 'LSC', 876, 765, 'NYSE')
    ];
   }

  getStocks(): Observable<Stock[]> { // 開始使用Rxjs的Observable觀念
    return of(this.stocks); // of：把可以被觀察的物件加入流中
  }

  createStock(stock: Stock): Observable<any> {
    const foundStock = this.stocks.find(each => each.code === stock.code);
    if (foundStock) {
      return of({msg: 'Stock with code ' + stock.code + ' already exists'});
    }
    this.stocks.push(stock);
    return of({msg: 'Stock with code ' + stock.code + ' successfully created'});
  }

  toggleFavorite(stock: Stock) {
    const foundStock = this.stocks.find(each => each.code === stock.code);
    foundStock.favorite = !foundStock.favorite;
    return of(foundStock);
  }
}
```
<br/>

2. `create-stock.component.ts`
```ts
...
...
export class CreateStockComponent {

  public stock: Stock;
  public confirmed = false;
  public message = null;
  public exchanges = ['NYSE', 'NASDAQ', 'OTHER'];

  constructor(private stockService: StockService) {
    this.stock =  new Stock('', '', 0, 0, 'NASDAQ');
  }

  setStockPrice(price) {
    this.stock.price = price;
    this.stock.previousPrice = price;
  }

  createStock(stockForm) {
    if (stockForm.valid) {
      // 訂閱事件
      this.stockService.createStock(this.stock)
          .subscribe((result) => {
            this.message = result.msg;
            this.stock = new Stock('', '', 0, 0, 'NASDAQ');
          }, (err) => {
            this.message = err.msg;
          });
    } else {
      console.error('Stock form is in an invalid state');
    }
  }
}
```
<br/>

3. `stock-list.component.html`
```html
<app-stock-item *ngFor="let stock of stocks" [stock]="stock"
                (toggleFavorite)="onToggleFavorite($event)">
</app-stock-item>
```
<br/>

4. `stock-list.component.ts`
習慣上將可觀察變數命名後方加上 `$` 字號。
```ts
export class StockListComponent implements OnInit {

  public stocks$: Observable<Stock[]>;
  constructor(private stockService: StockService) { }

  ngOnInit() {
    this.stocks$ = this.stockService.getStocks();
  }

  onToggleFavorite(stock: Stock) {
    this.stockService.toggleFavorite(stock);
  }
}
```