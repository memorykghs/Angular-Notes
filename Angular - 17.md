# Angular - 17 -n gModelGroup
## ngModelGroup
* 管理一組表單控制元件，包含所有子控制項和子群組
* 可以取代原本寫的雙向繫結(大部分的表單驗證不需要雙項細節)，只要留有`ngModel`屬性就好，Angular會知道這個欄位要送到後端。
  ```html
  <form (ngSubmit)="createStock(stockForm)" #stockForm="ngForm" >
    <div ngModelGroup="stock">
        <div class="stock-name">
          <input type="text"
                placeholder="Stock Name"
                required
                name="name"
                ngModel> <!-- 只留ngModel屬性 -->
        </div>
        <div class="stock-code">
          <input type="text"
                placeholder="Stock Code"
                required
                minlength="2"
                name="code"
                ngModel>
        </div>
      </div>
    <button type="submit">Create</button>
  </form>
  ```
#### ngForm與ngModelGroup的運作
先來看看html改動的部分：
* 要丟到後端的tag上一定要有`ngModel`才能被`ngForm`偵測到。
* `ngFormGroup`不能綁在`form`tag上。

改動的檔案：
1. `create-stock.component.html`
```html
<h2>Create Stock Form</h2>

<div class="form-group">
  <form (ngSubmit)="createStock(stockForm)" #stockForm="ngForm"> <!-- 改動的行數 -->
    <div ngModelGroup="stock"> 改動的行數
        <div class="stock-name">
            <!-- 改動的區塊，將原本的範本參考變數直接改為mgModel -->
            <!-- 並新增name屬性 -->
            <input type="text"
                placeholder="Stock Name"
                required
                name="name"
                ngModel>
        </div>
        <div class="stock-code">
            <input type="text"
                placeholder="Stock Code"
                required
                minlength="2"
                name="code"
                ngModel>
        </div>
        <div class="stock-price">
            <input type="number"
                placeholder="Stock Price"
                name="price"
                required
                ngModel>
        </div>
        <div class="stock-exchange">
            <div>
                <select name="exchange" ngModel>
                    <option *ngFor="let exchange of exchanges" [ngValue]="exchange">{{exchange}}</option>
                </select>
            </div>
        </div>
    </div>
    <button type="submit">Create</button>
  </form>
</div>

<h4>Stock Name is {{stock | json}}</h4>
<h4>Data has been confirmed: {{confirmed}}</h4>
```
<br/>

接下來更新ts檔。
2. `create-stock.component.ts`
```ts
public stock: Stock;
  public confirmed = false;
  public exchanges = ['NYSE', 'NASDAQ', 'OTHER'];
  
  ngOnInit(): void { }

  constructor() {
    this.stock =  new Stock('', '', 0, 0, 'NASDAQ');
  }

  setStockPrice(price) {
    this.stock.price = price;
    this.stock.previousPrice = price;
  }

  createStock(stockForm) {
    console.log('Stock form', stockForm.value);
    if (stockForm.valid) {
      this.stock = stockForm.value.stock; // 改動的行數
      console.log('Creating stock ', this.stock);
    } else {
      console.error('Stock form is in an invalid state');
    }
  }
```
其中`createStock`方法中的`stockForm.value.stock`代表什麼呢?
首先我們知道stockForm代表template傳進來的物件，也就是`ngForm`物件，再來把這個物件印出來看看：
<img src="/img/ng_form_1.png">

可以發現`ngForm`中有許多屬性及方法可以調用，而其中有一個`value`物件，這個物件會將template中被包在有`ngModelGroup`屬性下的所有含有`value`值屬性的tag包成一個物件。
<img src="/img/ng_formGroup.png">
<img src="/img/ng_form_2.png">

而在`ngModelGroup`物件中的`key`、`value`，則是跟tag中的`name`屬性作對應。
所以`stockForm.value.stock`代表是去拿`ngForm`中`value`物件裡面叫做`stock`的東西。
<br/>

> 小結
* `ngForm`下可以包`ngFormGroup`或是`ngModel`，但前提是要抓值的tag一定要綁`ngModel`。
架構如下：
<img src="/img/ng_form_structure.png">
<br/>

* `stockForm.value.stock`的`stockForm`拿到的是`ngForm`物件，`ngForm`物件包含了在下面的所有含有`ngModel`物件的tag。
* `name`屬性會對應到接收到的屬性名稱跟值。
<img src="/img/ng_formGroup_value.png">
* 欄位之間沒有順序性

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
