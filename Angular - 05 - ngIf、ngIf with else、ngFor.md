# Angular - 5 - `ngIf`、`ngIf` with else、`ngFor`
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

當我們執行 `ng serve` 指令並點選 Add to Favorite 按鈕後，打開 F12 會發現 HTML 多了一行註解：
<img src="/img/ngif_html.png" width="350px">
這個是 Angular 自動去產生的註解。
<br/>

---

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
