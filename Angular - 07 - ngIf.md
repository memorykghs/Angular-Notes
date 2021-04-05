# Angular - 7 - `ngSwitch`
# Angular - 7 - ngIf
## ngIf
* 屬於**結構型指令**：透過新增和移除 DOM 元素改變 DOM 佈局
* 接收boolean值，並以此為依據決定一整塊DOM物件出現或消失 &rArr; **程式碼會被整段移除，並非隱藏**。
* 一個 HTML tag 中只能還有一個結構型指令，不可並存。
* 也可以在 `<ng-template>` 中使用，但語法稍微不同，下面會再提到`<ng-template>`的用法。

#### 語法
有兩種寫法，這邊採用第一種寫法練習：
1. `*ngIf = "stock.price"`
    ```html
    <button *ngIf="stock.price < 2">click!</button>
    ```
    <br/>

2. `[ngIf] = "stock.price"`
    ```html
    <ng-template [ngIf] = "stock.price">
      <div>中間有一百行</div>
    </ng-template>
    ```
雖然兩種寫法造成的效果都一樣，均可讓被包住的 HTML 元素在 `false` 的時候直接從 HTML 上消失，但第一種有 <font color="red">* ( 星號 )</font> 的寫法可視為 `[ngIf] = "..."` 的語法糖。( 詳情見下方 `<ng-template>` 說明 )
<br/>

#### 改動的檔案：
1. `stock-item.component.html`
```html
<div class="stock-container">
  <div class="name">{{stock.name + ' (' + stock.code + ')'}}</div>
  <div class="price"
      [class]="stock.isPositiveChange() ? 'positive':'negative'">
      $ {{stock.price}}
  </div>
  <button (click)="toggleFavorite()"
          *ngIf="!stock.favorite">Add to Favorite</button><!-- 改動的行數 -->
</div>
```
當我們執行 `ng serve` 指令並點選 Add to Favorite 按鈕後，打開 F12 會發現 HTML 多了一行註解：
<img src="/img/ngif_html.png" width="350px">
這個是 Angular 自動去產生的註解。
<br/>

## `<ng-template>`
* Angular 內自定義的 component，可視作一個等著被呼叫的區塊
* 同樣可以讓被包在這個區塊內的DOM物件程式碼消失
* 可加入**範本參考變數**：`<ng-template #自訂名稱>`
* 通常與`ngTemplateOutlet`搭配使用
```html
<ng-template #data1>
  <div>data1</div>
  <div>ng-template與ngTemplateOutlet範例</div>
</ng-template>
<ng-template #data2>
  <div>data2</div>
  <div>ng-template與ngTemplateOutlet範例</div>
</ng-template>
```

## ngTemplateOutlet
* 用來放置 `<ng-template>`
* 可以把重複的樣板抽出
* 在同一 HTML 檔案中的任一 tag 內放置，顯示 `<ng-template>` 的內容：`<div *ngTemplateOutlet="自訂名稱">`
```html
<div *ngTemplateOutlet="data1"></div>
<div>中間有一百行</div>
<div *ngTemplateOutlet="data2"></div>
```
<br/>

## `<ng-container>`
* 用來放置`<ng-template>`
* 可以把重複的樣板抽出
* 在同一html檔案中的任一tag內放

> 小結
* 一個 HTML tag 中不可並存兩個結構型指令
* 使用 `ngIf` 可以讓不要的程式碼直接消失在 HTML 上，而非被註解掉 ( 打開 F12 不會看到該程式碼)
