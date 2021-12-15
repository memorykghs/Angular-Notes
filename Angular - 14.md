# Angular - 14
## ngModelWithInput


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

## ngModelWithSelect