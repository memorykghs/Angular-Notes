# Angular - 6 - ngClass、ngStyle
# Angular - 6 - ngStyle
## 
* 屬於**屬性型指令**：用來改變元素、元件或其他指令的外觀或行為
* 用來改變 HTML 元素的樣式

#### 語法
```html
<div [ngStyle] = "{ key: value, key: value, ...}"></div>
```
其中 `key` 為樣式，`value` 為樣式值。

* 可以傳入**物件**或是含有 **CSS** 表達式語句，例如：
  ```html
  <div [ngStyle] = "{ 'font-style': styleExp }"></div>
  ```
  或是：
  ```html
  <div [ngStyle] = "styles"></div>
  ```
  ```ts
  this.styles = {
    color: isChange() ? 'red': 'green',
    border: '2px'
  }
  ```
  <br/>

#### 改動的檔案：
1. `stock-item.component.html`
```html
<div class="stock-container">
  <div class="name">{{stock.name + ' (' + stock.code + ')'}}</div>
  <div class="price"
      [ngStyle]="stockStyles">$ {{stock.price}}</div> <!-- 改動的行數 -->
  <button (click)="toggleFavorite()"
          [disabled]="stock.favorite">Add to Favorite</button>
</div>
```
<br/>

2. `stock-item.component.ts`
```ts
...
...
export class StockItemComponent implements OnInit {

  public stock: Stock;
  public stockStyles: any;

  constructor() { }

  ngOnInit(): void {
    this.stock = new Stock('Test Stock Market', 'TSC', 85, 80);
    const diff = (this.stock.price / this.stock.previousPrice) - 1;
    const largeChange = Math.abs(diff) > 0.01;
    this.stockStyles = { // 改動的行數
      color: this.stock.isPositiveChange() ? 'green' : 'red',
      'font-size': largeChange ? '1.2em' : '0.8em'
    };
  }

  toggleFavorite() {
    console.log('toggle Event');
    this.stock.favorite = !this.stock.favorite;
  }
}
```
<br/>

> 補充
* [ngStyle API](https://angular.tw/api/common/NgStyle)
* [NgStyle & NgClass](https://medium.com/allen%E7%9A%84%E6%8A%80%E8%A1%93%E7%AD%86%E8%A8%98/angular-ngstyle-ngclass-2560019a2c6c)
