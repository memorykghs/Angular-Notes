# Angular - 9
## ngContent投射
可以將父元件的一些參數or html tag帶到子元件中，如：
```html
<app-stock-item >
    <button (click)="onFavorite($event)"></button>
</app-stock-item>
```
<br/>