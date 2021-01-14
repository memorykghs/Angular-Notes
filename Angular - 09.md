# Angular - 9
## @ngInput()

* 在`parent.component.html(父元件)`中使用**屬性繫結**傳遞值。

* 將其理解為可以自訂一個html tag，而tag中的屬性也可以去客製化。產生的這個自訂tag只要有import到component中，任何template都可以去引用這個tag，tag的自訂屬性要吃到外部父元素的值就必須使用`@Input()`。

* 是Angular原生的一個decorator，所以需要import：`import { Input } from '@angular/core';`。

* 使用時在`child.component.ts(子元件)`必須宣告`@Input()`物件接值：
  ```ts
  @Input() public stock: Stock;
  ```
* 似Java中的Annotation一樣，可以在小括弧中放入資訊(別名)，並利用getter、setter的方式來控制。(p.88)
   ```ts
    private selectedStock: Stock;
    @Input('selectedStock')

    setSelectedStock(value: any){
        this.selectedStock = any.value;
    }

    getSelectedStock(){
        return this.selectedStock;
    }
   ```
* 要監視`@Input()`屬性的更改，也可觀察`OnChanges`生命週期。
<br/>
改動的檔案：
1. `stock-item.component.html`
```html
<div class="stock-container"> <!-- 改動的行數 -->
  <div class="name">{{stock.name + ' (' + stock.code + ')'}}</div>
  <div class="price"
      [class]="stock.isPositiveChange() ? 'positive':'negative'">
      $ {{stock.price}}
  </div>
  <button (click)="toggleFavorite()"
          *ngIf="!stock.favorite">Add to Favorite</button>
</div>
```
<br/>

2. `stock-item.component.ts`
   * 因為使用decorator，所以需要import：`import { Input } from '@angular/core';`。
   * 使用Angular自訂的`tag`如`<ng-conatiner>`等，在template使用沒有載入的限制，只要有export該元件就可以使用。
```ts
import { Component, OnInit, Input } from '@angular/core'; // 改動的行數
...
...
export class StockItemComponent implements OnInit {
  // 使用@Input() (記得import)
  @Input() public stock: Stock;

  constructor() { }

  ngOnInit(): void { }

  toggleFavorite() {
    console.log('toggle Event');
    this.stock.favorite = !this.stock.favorite;
  } 
}
```
<br/>

3. `app.component.html`
```html
<div style="text-align:center">
  <h1>
    Welcome to {{ title }}!
  </h1>
  <!-- 改動的行數 -->
  <ng-container *ngFor = "let stockObj of stockObjs";>
    <app-stock-item [stock] = "stockObj"></app-stock-item>
  </ng-container>

</div>
```
此處父元件是`app.component`，在這個template中引入了`<app-stock-item>`這個自訂元件tag，在`<app-stock-item>`tag中可以自訂一些屬性如`[stock]`，這時候可以把父元件的屬性值`stockObj`當作屬性的值傳給子元件`<app-stock-item>`。

&rArr; 也就是說，子元件屬性的值來源是父元件的屬性。
<br/>

4. `app.component.ts`
```ts
...
...
export class AppComponent {
  title = 'stockMarket';

  public stockObj: Stock; // 改動的行數
  public stockObjs: Stock[]; // 改動的行數

  ngOnInit() {
    // 改動的行數
    this.stockObjs = [
      new Stock('Test Stock Company', 'TSC', 85, 80),
      new Stock('Second Stock Company', 'SSC', 10, 20),
      new Stock('Last Stock Company', 'LSC', 876, 765)
    ];
  }
}
```