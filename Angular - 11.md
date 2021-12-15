# Angular - 9

## 雙向綁定???

```html
<input [value]="name" (input)="name = $event.target.value">
<input [ngModel]="name" (ngModelChange)="name = $event.trim()">
<input [(ngModel)]="name">
```