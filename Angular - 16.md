# Angular - 16
* `ngModel`本身就有一些代表狀態的class可以使用，最常用到的有三組：

  欄位狀態          |true     |false
  :---              |:---:       |:---: 
  欄位是否曾經被碰過 |`ng-touched`|`ng-untouched`
  欄位值是否有改變過 |`ng-dirty`  |`ng-pristine` 
  是否有通過欄位驗證 |`ng-valid`  |`ng-invalid` 
  使用時html tag上需要加上`required`：
  ```html
  <input type="number" required/>
  ```

* 可搭配**範本參考變數**使用：
使用`ngIf`判斷抓到的範本參考變數`#stockPrice`的**物件**來做檢核。
  ```html
  <input type="number"
              placeholder="Stock Price"
              name="stockPrice"
              required
              #stockPrice="ngModel"
              [ngModel]="stock.price"
              (ngModelChange)="setStockPrice($event)">

  <div *ngIf="stockPrice.dirty && stockPrice.invalid">
      <div *ngIf="stockPrice.errors.required">Stock Price is Mandatory</div>
  </div>
  ```
  
  由於在這裡定義的`#stockPrice`的值是`ngModel`，所以可以利用`ngModel`本身帶有的class做檢核。
  上面以`ngModel.dirty`、`ngModel.invalid`，藉由`*ngIf`判斷改變的**物件**切換不同的css樣式。
<img src="/img/ng_valid_html.png">
<font color="FF0000">p.s. Angular - 8</font>
<br/>


---

> 補充 - ngModel class

響應式表單和範本驅動表單都建立在下列基礎類別之上。

FormControl 實例用於追蹤單個表單控制元件的值和驗證狀態。

FormGroup 用於追蹤一個表單控制元件組的值和狀態。

FormArray 用於追蹤表單控制元件陣列的值和狀態。

ControlValueAccessor 用於在 Angular 的 FormControl 實例和原生 DOM 元素之間建立一個橋樑。

屬性名稱          |型別                     |用途說明
  :---           |:---:                    |:---
  `name`         |string                   |欄位名稱
  `value`        |any                      |欄位值 
  `valid`        |boolean                  |有效欄位(通過欄位驗證)
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
<br/>

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