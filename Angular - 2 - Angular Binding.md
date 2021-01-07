# Angular - 3 - Angular Binding
## Angular Binding
Angular 中會用到4種 binding 技巧：
1. 資料繫結 ( Interpolation )
2. 屬性繫結 ( Property Binding )
3. 事件繫結 ( Event Binding )
4. 雙向繫結 ( Two-way Data Binding )

再來我們會一一介紹在 Angular 中怎麼去取到 component 的值，以及其他的 binding 方法。
<br/>

---

## 資料繫結 Interpolation
首先更改 `app.component.html` 這支檔案的 HTML ( template )，將我們剛剛看到的預設畫面改掉：
```html
<div style="text-align:center">
  <h1>
    Welcome to {{ title }}!
  </h1>
  <app-stock-item></app-stock-item>
</div>
```
中間出現了 `{{ }}` 還有 `<app-stock-item></app-stock-item>` 這個沒有看過的東西!

我們先打開 `app.component.ts` 這支檔案的內容，會看到裡面有自動產生的一些東西：

<img src="/img/app_component_ts.png" width="350px">

其中 `{{ }}` 語法是用來取 component 中的屬性，也就是 `app.component.ts` 中的 `title` 的值。而要讓 template 取到 component 中的值，就必須在 component 中給定初始值。

而 `<app-stock-item></app-stock-item>` 則代表要在 HTML 中取用相對應 component 的 tag，tag 的名稱可以在 `app.component.ts` 檔中的 `@Component` 裝飾器中 `selector` 屬性設定。

也就是說，如果有人要取用 app 這個 component，就必須使用  `<app-root></app-root>` 這個 tag。
<br/>

除了一般的變數綁定之外，基本上 `{{}}` 內的內容會被當作的內容會被當作一般的 JS 來處理，所以也可以使用 `+` 做字串串接：
```html
<div>{{ name + age }}</div>
```
```ts
...
...
export class StockItemComponent implements OnInit {

  public name = 'Amy';
  public age = '20 years old';

  constructor() { }

  ngOnInit(): void { }
}
```

#### 改動的檔案
更改 `stock/stock-item` 下的檔案：
1. `stock-item.component.html`( template )
```html
<div class="stock-container">
    <div class="name">
        <h3>practice 1 - Interpolation</h3>
        <h3>{{name}}</h3> - <h4>({{code}})</h4>
    </div>
    <div class="price">$ {{price}}</div>
</div>
```
剛剛提到的 `{{ }}` 可以取得 `StockItemComponent` 這個 class 中的 `name` 等屬性。
<br/>

2. `stock-item.component.ts`
```ts
...
...
export class StockItemComponent implements OnInit {

  public name: string;
  public code: string;
  public price: number;
  public previousPrice: number;

  constructor() { }

  ngOnInit(): void {
    this.name = 'Test Stock Market';
    this.code = 'TSC';
    this.price = 85;
    this.previousPrice = 80;
  }
}
```
<br/>

3. `stock-item.component.css`
```css
.stock-container {
    border: 1px solid black;
    border-radius: 5px;
    display: inline-block;
    padding: 10px;
    margin-right: 10px;
  }
  
  .stock-container .name h3, .stock-container .name h4 {
    display: inline-block;
  }
```
完成後在終端機執行 `ng serve` 指令f啟動 Angualr 服務，完成畫面如下：

<img src="/img/interpolation.png" width="350px">
<br/>

---

## 屬性繫結 Property Binding
要對 HTML 中 tag 的 attribute 如 `class`、`value` 等屬性，或是 `disabled` 等 `property`，就必須使用 Property Binding：
```ts
<div class="price"
      [class]="positiveChange ? 'positive' : 'negative'">$ {{price}}</div>
</div>
```
用中括弧包住要綁定的屬性名稱 ( 以 `[class]` 為例 )，等號後面的雙引號中可以寫JS code，上面的例子就是如果 `positiveChange` 值為 `true`，則套用 `.positive` 的 css。

而 `[class] = " ... "` 的雙引號內也是可以寫 JS 程式碼的。
<br/>

#### 改動的檔案：
1. `stock-item.component.html`
```html
<div class="stock-container">
  <div class="name">{{name + ' (' + code + ')'}}</div>
  <div class="price"
      [class]="positiveChange ? 'positive' : 'negative'">$ {{price}}</div>
</div>
```
<br/>

2. `stock-item.component.ts`
```ts
...
...
export class StockItemComponent implements OnInit {

  public name: string;
  public code: string;
  public price: number;
  public previousPrice: number;
  public positiveChange: boolean; // 改動的行數

  constructor() { }

  ngOnInit(): void {
    this.name = 'Test Stock Market';
    this.code = 'TSC';
    this.price = 85;
    this.previousPrice = 80;
    this.positiveChange = this.price >= this.previousPrice; // 改動的行數
  }

}
```
<br/>

3. `stock-item.component.css`：
```css
.positive {
    color: green;
  }
  
.negative {
    color: red;
  }
```
<br/>

完成畫面如下：

<img src="/img/propertyBinding.png">

而使用 Angular 綁定與沒有使用的差別為：
* `[class]`：一次只能設定一個
* `[ngclass]`：可以一次設定多個class
<br/>

## 事件繫結 Event Binding
如果要針對 DOM 物件綁定事件，就必須在 HTML 中加入以下語法：
```ts
<button (click)="toggleFavorite()"</button>
```
`()` 中括號內可以註冊不同事件，例如：click、change等等。

當發生指定 event 時 ( 以 click 事件為例 )，就會呼叫 `component.ts` 檔案中的 `toggleFavorite` 方法。

需要注意的是，雙引號內綁定的 function 需要加上小括號 `toggleFavorite()`。
<br/>

#### 改動的檔案：
1. `stock-item.component.html`
```html
<div class="stock-container">
  <div class="name">{{name + ' (' + code + ')'}}</div>
  <div class="price"
      [class]="positiveChange ? 'positive' : 'negative'">$ {{price}}</div>
  <button (click)="toggleFavorite()"
          [disabled]="favorite">Add to Favorite</button>
</div>
```
<br/>

2. `stock-item.component.ts`
```ts
...
...
export class StockItemComponent implements OnInit {
 public name: string;
  public code: string;
  public price: number;
  public previousPrice: number;
  public positiveChange: boolean;
  public favorite: boolean; // 改動的行數

  constructor() { }

  ngOnInit(): void {
    this.name = 'Test Stock Market';
    this.code = 'TSC';
    this.price = 85;
    this.previousPrice = 80;
    this.positiveChange = this.price >= this.previousPrice;
    this.favorite = false; // 改動的行數
  }

  // 改動的行數
  toggleFavorite() {
    console.log('toggle Event');
    this.favorite = !this.favorite;
  }
}
```
<br/>

完成畫面如下：

<img src="/img/eventBinding.png">
<br/>

## 雙向繫結 Two-way Data Binding
雙向繫結比較像是前一張提到的3種方法的結合，也可以說是 Angular 提供的一種語法糖。

後面會詳細提到雙向繫結的方法，這裡先有個概念就好。
<br/>

> 小結
* `Interpolation`、`Property Binding`內都可以寫 JS 程式碼。
<br/>

* **`Interpolation`**
  * 語法：`{{ }}`
  * 大括號內可以寫 JS 變數/字串串接 ( 類似 EL 語法 )
  * 若要在 template 中使用 `Interpolation` 綁定資料並顯示，必須在 component.ts 檔中給定該變數初始值。
<br/>

* **`Property Binding`**
  * 語法：`[class] = " ... "`
  * 等號後的雙引號內，可以寫 JS 程式碼
<br/>

* **`Event Binding`**
  * 語法：`(event) = functionName()`
  * 觸發指定 event 之後會執行對應到的 `functionName()` 方法
<br/>
