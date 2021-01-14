# Angular - 16
## ngForm
* <font color="red">ngForm提到的順序要調整</font>
* <font color="red">ngForm常見屬性</font>

  ```html
  <form (ngSubmit)="createStock(stockForm)" #stockForm="ngForm">
  ```

  * 使用時須要在`app.module.ts`匯入`FormsModule`

  ```ts
  import { FormsModule } from '@angular/forms'; // 改動的行數
  ...
  ...
  @NgModule({
  declarations: [
    AppComponent,
    StockItemComponent,
    CreateStockComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule // 改動的行數
  ],
  providers: [],
  bootstrap: [AppComponent]
})
```

有value屬性的才能用???????
需要匯入mdoule?

改動的檔案：

1. 
```html
<h2>Create Stock Form</h2>

<div class="form-group">
  <form (ngSubmit)="createStock(stockForm)" #stockForm="ngForm">
    <div class="stock-name">
      <!-- name="stockName" #stockName="ngModel" -->
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

<font color="red">模擬表單input值傳送(僅單一input欄位)。</font>

> 小結
## 補充 - ngModel class
屬性名稱          |型別                     |用途說明
  :---           |:---:                    |:---
  `value`        |any                      |群組內所有欄位值(以物件型態呈現) 
  `valid`        |boolean                  |群組內所有欄位是否皆為有效欄位
  `invalid`      |boolean                  |無效欄位(欄位驗證失敗) 
  `errors`       |{ [ key: string ] : any }|當出現無效欄位時，會出現的錯誤狀態
  `dirty`        |boolean                  |欄位值是否曾經更動過一次以上 
  `pristine`     |boolean                  |欄位值是否為原始值(未曾被修改過)
  `touched`      |boolean                  |欄位曾經經歷過focus事件
  `untouched`    |boolean                  |欄位從未經歷過focus事件 
  `disabled`     |boolean                  |欄位設定為disabled狀態
  `enabled`      |boolean                  |欄位設定為enabled狀態(預設啟用)
  `formDirective`|ngForm                   |取得目前欄位所屬的ngForm表單物件
  `valueChanges` |EventEmitter             |可用來訂閱欄位**值變更**的事件
  `statusChanges`|EventEmitter             |可用來訂閱欄位**狀態變更**的事件