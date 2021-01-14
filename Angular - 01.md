# Angular - 0 - 專案架構
## 專案架構

首先，下載node.js及Angular CLI後，移動到要建立專案的資料夾，執行 `ng new stockMarket` 這個指令新增 Angular 專案。
<img src="/img/ng_new.png" width="500px"/>

看到 `√ Packages installed successfully.` 表示新增專案成功。

等專案下載完畢後執行 `ng serve` 指令啟動 Angular 專案。
<img src="/img/ng_serve.png" width="500px"/>

Angular compile成功後在網址列輸入[http://localhost:4200/](http://localhost:4200/)後可以開啟預設的Angular畫面。



<div>
    <div style="display:inline-block">
        <img src="/img/ng_new_structure.png" width="280px">
    </div>
    <div style="display:inline-block;padding-left: 50px;vertical-align: top">
        <div>建立 Angular專案後，打開專案資料夾會看到</div>
        <div>如左圖的架構，並且有以下4個檔案：</div>
        <p style="font-weight: bold">• app.component.ts：根元件</p>
        <p style="font-weight: bold">• app.module.ts：主要模組</p>
        <p style="font-weight: bold">• index.html：根html</p>
        <p style="font-weight: bold">• main.ts：Angular程式進入點</p>
        <div>接下來會對各個檔案進行簡短介紹。</div>
    </div>
</div>
<br/>

---

#### 1. `main.ts`
* 進入點跟 SpringBoot 有點像，其中 `bootstrapModule` 這行程式碼，表示他要藉由 `AppModule` 裡面的東西把 Angular專案的東西帶起來。
<img src="/img/main_ts.png">
<br/>

#### 2. `app.module.ts`
<img src="/img/app_module_ts.png" width="500px">

* **`@NgModel`**
    通常寫後端的例如 Spring Boot ，會稱有 `@(小老鼠)` 的東西為 Annotation，在 Angular 稱為 **`decorator(裝飾器)`**。
    <br/>

    藉由 **`decorator(裝飾器)`** 可以簡單的做好一些底層的設定，`@NgModel` 就是其中一種，**用來宣告應用程式中會用到的原件**。
    <br/>

    而`@NgModel` 中的：
    * `import`：匯入會用到的功能模組
    * `bootstrap`：啟動應用程式時的進入點元件
    
    基於這兩點，這就是大家會稱呼 AppComponent 為根元件的原因。
<br/>

#### 3. `index.html`
是 Angular起始畫面載入的 html。
<img src="/img/index_ts.png" width="500px">
其中有一個沒看過的 tag `<app-root></app-root>`，它不是標準 html 裡面會有的 tag，而是 **Angular 底層會把它替換掉**，換成 `app.component.html` 裡面所有的內容。

也就是說，Angular-Project 裡的畫面呈現其實都在 `app.component.html` 裡(可以自行按下F12觀察瀏覽器的 html 結構，是否跟 `app.component.html` 相同)。
<br/>

#### 4. `app.component.ts`
最後看到 `app.component`，類似命名的檔案有4個：
1. `app.component.html`
2. `app.component.ts`
3. `app.component.css`
4. `app.component.spec.ts`

目前最常碰到的是 `app.component.html` 和 `app.component.ts`。

畫面的部分就像上面提到的，`<app-root></app-root>` 會被替換成 `app.component.html`，邏輯的部分則會寫在 `app.component.ts` 中。
<br/>

在 `app.component.ts` 檔案裡有個 decorator `@Component`，並且有3個屬性：
<img src="/img/app_component_ts.png" width="350px">

1. `selector`：
    內容的 `'app-root'` 代表其他 template 要使用這個元件，都必須引入 `<app-root></app-root>` 這個 tag，也就是說**可以指定自訂標籤名稱**。
    <br/>

2. `templateUrl`：設定這段 `<app-root></app-root>`要替換的 html檔路徑。
<br/>

3. `styleUrls`：設定 css 檔路徑。
<br/>

> 小結
* 程式進入點是 `main.ts`，裡面會提到說要啟動整個專案並使用 AppModule 的設定。

* AppModule裡面會 import 或宣告 Angular 專案裡需要用到的元件或其他東西。

* `index.html` 裡面的 `<app-root></app-root>` 會把葉面上的東西，從 `app.component.html` 抓過來。

* 基本上所有畫面上的操作都在 `app.component.html` 跟 `app.component.ts`。

> 參考資料
* [關於Angular](https://www.fetchs.cn/web/angular/)
* [關裝飾器decorator](https://www.twblogs.net/a/5c1dcb79bd9eee5e4184d535)