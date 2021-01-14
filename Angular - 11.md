# Angular - 9
## EventEmitter
* 使用EventEmitter發射事件(事件發射器)?????
* 處理非同步
* node.js原生物件(node.js設計缺陷)
* `.emit()`：將事件丟出去
* 在template要接自訂事件丟出的物件，就必須使用`$event`參數接值。
```html
<button (click)="onToggleFavorite($event)">Add to Favorite</button>
```

`changeDetecotion`屬性：`onPush`、`onChange`
可以針對在哪一種改動的情況下，其他元件是否要連動
```ts
```

改動的檔案：
1. `stock-item.component.html`
```html

```
<br/>

2. `stock-item.component.ts`
```ts
...
...
export class StockItemComponent implements OnInit {

}
```
<br/>

## ngContent投射
可以將父元件的一些參數or html tag帶到子元件中，如：
```html
<app-stock-item >
    <button (click)="onFavorite($event)"></button>
</app-stock-item>
```
<br/>

改動的檔案：
1. `stock-item.component.html`
```html
```
<br/>

2. `stock-item.component.ts`
```ts
...
...
export class StockItemComponent implements OnInit {

}
```
<br/>

## 雙向綁定???

```html
<input [value]="name" (input)="name = $event.target.value">
<input [ngModel]="name" (ngModelChange)="name = $event.trim()">
<input [(ngModel)]="name">
```