# Angular - 9
## ngModel
* 只能用在有`value`屬性的html tag上，所以像是`div`就不能使用`ngModel`
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