# Angular - 15 - ngModelValidity
## Template-driven Form
通常前端最重要的其中一環，就是針對表單欄位去做檢核，而Template-driven Form顧名思義就是將大部分檢核的邏輯寫在template上。
ts檔除了接前端雙向繫結丟過來的值之外，其實沒有檢核邏輯。

不過跟傳統的MVC檢核方法不同，舊的寫法必須按下某個按鈕才能觸發檢核事件，然而Angular會持續監聽DOM元素，只要內容有變化便會立即反應。

## ngModel與檢核

* 前面有提到`ngModel`並用來達成**雙向繫結**，這只是其中一種用法，而他的主要是用在表單驗證功能。
* 驗證時會使用`ngSubmit`而非原本的html submit事件。
  ```html
  <form [formGroup]="stockForm" (ngSubmit)="onSubmit()">
  ```
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

改動的檔案：
1. `create-stock.component.html`
```html
<h2>Create Stock Form</h2>

<div class="form-group">
  <form (ngSubmit)="createStock(stockForm)" #stockForm="ngForm">
    <div class="stock-name">
        <!-- 改動的行數，搭配範本參考變數(類似id的功能) -->
        <input type="text"
             placeholder="Stock Name"
             required
             name="stockName"
             #stockName="ngModel"
             [(ngModel)]="stock.name">
    </div>
    <div *ngIf="stockName.errors && stockName.errors.required">Stock Name is Mandatory</div>
    <div class="stock-code">
        <!-- 改動的行數 -->
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
        <!-- 改動的行數 -->
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
<br/>

2. `create-stock.component.ts`
```ts
 ...
 ...
export class CreateStockComponent implements OnInit {
  public stock: Stock;
  public confirmed = false;
  public exchanges = ['NYSE', 'NASDAQ', 'OTHER'];

  ngOnInit(): void {
  }

  constructor() {
    this.stock = new Stock('test', '', 0, 0, 'NASDAQ');
  }

  setStockPrice(price) {
    this.stock.price = price;
    this.stock.previousPrice = price;
  }

  // 改動的區塊
  createStock(stockForm) {
    console.log('Stock form', stockForm);
    if (stockForm.valid) {
      console.log('Creating stock ', this.stock);
    } else {
      console.error('Stock form is in an invalid state');
    }
  }
}
```
<br/>

3. `create-stock.component.css`
```css
/* 改動的區塊 */
.stock-name .ng-valid,
.stock-code .ng-pristine,
.stock-price .ng-untouched {
  background-color: green;
}

/* 改動的區塊 */
.stock-name .ng-invalid,
.stock-code .ng-dirty,
.stock-price .ng-touched {
  background-color: pink;
}
```
<br/>

## 範本參考變數
> 語法
1. `<div #自訂attribute></div>`
2. `<div #自訂attribute = "ngModel"></div>`
<br/>

* 類似html tag中的`id`的概念，一個template檔案中不能出現相同的範本參考變數(編譯器會報錯)

* 為了抓template上tag帶有的資訊而產生
  範例：
  ```html
  <input type="number" #inputValue="ngModel">
  <button (click)="print(inputValue)"></button>
  ```
  也就是說其他的tag或是event可以抓到`input`tag上的`ngModel`屬性，而為了抓這個屬性賦予他一個變數名稱`#inputValue`。
<br/>

* 當範本參考變數沒有賦值(沒有等號)時，取到的會是自己本身這個html tag
* 有賦值才會是取到等號後面的元件屬性，例如`ngModel`：
  ```html
  <input type="number"
              placeholder="Stock Price"
              name="stockPrice"
              required
              #stockPrice="ngModel"
              [ngModel]="stock.price"
              (ngModelChange)="setStockPrice($event)">
  ```
  其中`#stockPrice="ngModel"`的`#stockPrice`就是一個範本參考變數
---

## 補充 - ngModel class
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