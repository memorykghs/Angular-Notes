# Angular - 26 - Dependency Injection
## Dependency Injection(DI)
* 用於在任何地方給元件提供服務或所需的其他東西
  * 元件是服務的消費者
<br/>

* Angular會在啟動過程建立根注入器(`Injector`)
* 注入器會建立依賴、維護一個容器來管理這些依賴，並盡可能重複使用
* Constructor Injection?????
<br/>

* 雖然Service是單例模式，但也可以透過其他方式做到不同實例使用不同物件
<br/>

#### 改動的檔案：
從分支編號`25_simpleService`切出去(local為`23_simpleService`)。

想要將所有要顯示訊息的部分藉由 message Service 處理，所以需要先輸入 `ng g service services/message` 指令新增要用到的 message Service。

1. 新增message servie：`ng g service services/message`
```ts
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MessageService {

  public message: string = null;

  constructor() { }
}
```
<br/>

2. `app.component.html`
```html
<h1>
  {{title}}
</h1>
<h3>App level: {{messageService.message}}</h3> <!-- 改動的行數 -->
<app-stock-list></app-stock-list>
<app-create-stock></app-create-stock>
```
<br/>

3. `app.component.ts`
```ts
import { MessageService } from './services/message.service';  // 改動的行數
...
...
export class AppComponent {
  title = 'Stock Market App';

  constructor(public messageService: MessageService) {} // 改動的行數，使用控制反轉的依賴注入

  ngOnInit(): void {
    this.messageService.message = 'Hello Message Service!';
  }
}
```
<br/>

4. `create-stock.component.html`
```html
<h2>Create Stock Form</h2>

<div>{{messageService.message}}</div>
<div class="form-group">
  <form (ngSubmit)="createStock(stockForm)" #stockForm="ngForm">
    <div class="stock-name">
      <input type="text"
             placeholder="Stock Name"
             required
             name="stockName"
             #stockName="ngModel"
             [(ngModel)]="stock.name">
    </div>
    <div *ngIf="stockName.errors && stockName.errors.required">Stock Name is Mandatory</div>
    <div class="stock-code">
      <input type="text"
             placeholder="Stock Code"
             required
             minlength="2"
             name="stockCode"
             #stockCode="ngModel"
             [(ngModel)]="stock.code">
    </div>
    <div *ngIf="stockCode.dirty && stockCode.invalid">
      <div *ngIf="stockCode.errors.required">Stock Code is Mandatory</div>
      <div *ngIf="stockCode.errors.minlength">Stock Code must be atleast of length 2</div>
    </div>
    <div class="stock-price">
      <input type="number"
             placeholder="Stock Price"
             name="stockPrice"
             required
             #stockPrice="ngModel"
             [ngModel]="stock.price"
             (ngModelChange)="setStockPrice($event)">
    </div>
    <div *ngIf="stockPrice.dirty && stockPrice.invalid">
      <div *ngIf="stockPrice.errors.required">Stock Price is Mandatory</div>
    </div>
    <div class="stock-exchange">
      <div>
        <select name="stockExchange" [(ngModel)]="stock.exchange">
          <option *ngFor="let exchange of exchanges" [ngValue]="exchange">{{exchange}}</option>
        </select>
      </div>
    </div>
    <!-- 改動的區塊 -->
    <div class="stock-confirm">
      <input type="checkbox"
             name="stockConfirm"
             required
             [(ngModel)]="confirmed">
      I confirm that the information provided above is accurate!
    </div>
    <button type="submit">Create</button>
  </form>
</div>

<h4>Stock Name is {{stock | json}}</h4>
<h4>Data has been confirmed: {{confirmed}}</h4>
```
<br/>

5. `stock-item.component.ts`
```ts
import { MessageService } from 'src/app/services/message.service'; // 改動的行數
import { StockService } from 'src/app/services/stock.service'; // 改動的行數
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
      // Rxjs訂閱事件
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