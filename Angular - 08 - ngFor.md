## ngFor
```html
<div class="stock-container" *ngFor="let stock of stocks; index as i">
```
`let`之後的`stock`代表每一圈迭代的物件，使用上與`<c:forEach>`有點相似。
其中以`i`代替`index`在template中被印出，也可以寫成`let i = index;`，但如果`index`被覆蓋掉，例如：`let index = i;`，就沒有辦法在使用該屬性。

* 可針對component中的物件進行迭代。
* 有4種屬性可以被使用：
  1. `index`：(number)代表可迭代物件索引
  2. `count`：(number)代表可迭代物件的長度
  3. `first`、`last`：(boolean)
  4. `even`、`odd`：(boolean)

改動的檔案：
1. `stock-item.component.html`
```html
<div class="stock-container" *ngFor="let stock of stocks; index as i"> <!-- 改動的行數 let i = index也可以 -->
  <div class="name">index是{{i}}</div>
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
```ts
...
...
export class StockItemComponent implements OnInit {
  // 將所有對stock的操作抽成一個model
  public stock: Stock;
  public stocks: Stock[];
  public stockClasses;
  public testClass = 'testClass';
  public testClass2 = 'testClass2';

  constructor() { }

  ngOnInit(): void {
    // 建立Stock物件陣列
    // 改動的行數
    this.stocks = [
      new Stock('Test Stock Company', 'TSC', 85, 80),
      new Stock('Second Stock Company', 'SSC', 10, 20),
      new Stock('Last Stock Company', 'LSC', 876, 765)
    ];
  }

  toggleFavorite() {
    console.log('toggle Event');
    this.stock.favorite = !this.stock.favorite;
  }
}
```
<br/>
