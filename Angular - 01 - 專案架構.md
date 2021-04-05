# Angular - 0 - 專案架構
首先，下載node.js及Angular CLI後，移動到要建立專案的資料夾，執行 `ng new my-first-app` 這個指令新增 Angular 專案。<br/>
![](/images/1-1.png)

看到 `√ Packages installed successfully.` 表示新增專案成功。等專案下載完畢後執行 `ng serve` 指令啟動 Angular 專案。<br/>
![](/images/1-2.png)

Angular compile成功後在網址列輸入[http://localhost:4200/](http://localhost:4200/)後可以開啟預設的Angular畫面。<br/>
![](/images/1-3.png)

我們回頭來看 Angular 專案下的架構，點開左邊的 src 資料夾，可以看到如下結構：<br/>
![](/images/1-4.png)

## `index.html`
Angular 是 SPA ( Single Side Application ) 的前端框架，一開始啟動專案後看到的畫面是由 `index.html` 呈現的。
```html
<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <title>MyFirstApp</title>
  <base href="/">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <link rel="icon" type="image/x-icon" href="favicon.ico">
</head>
<body>
  <app-root></app-root>
</body>
</html>
```

不過打開畫面檢視原始碼會發現並沒有出現畫面上的那些元素，取而代之的是一個沒看過的 tag `<app-root></app-root>`，接下來我們來看一下 `<app-root></app-root>` 是什麼。

## App Component 根元素
`<app-root></app-root>` 不是標準 html 裡面會有的 tag，而是 Angular 預設的 component，它代表了另外3個檔案：
```
|--app
   |--app.component.css
   |--app.component.html
   |--app.component.ts
   |--app.component.spec.ts
```

在 Angular 專案中，一個 Component 主要由動態的 `.ts` 、靜態的 `.html` 、編寫樣式的 `.css` 組成。所以在啟動專案後，**Angular 底層會把將 `<app-root>` 替換掉**，換成 `app.component.html` 裡面所有的內容。

也就是說，Angular-Project 裡的畫面呈現其實都在 `app.component.html` 裡 ( 可以自行按下F12觀察瀏覽器的 HTML 結構，是否跟 `app.component.html` 相同 )。
<br/>

#### `app.component.ts`
打開 `app.component.ts`，會看到下面內容：
```ts
import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'my-first-app';
}
```

在 `app.component.ts` 檔案裡有個 Decorator `@Component`，並且有3個屬性 ( Decorator 後面會在提到，通常稱有 `@` 的一些標註為裝飾器 )：

1. **`selector`**：
    用來設定元件的 tag 名稱，其他 template 要使用這個元件，都必須引入 `<app-root></app-root>` 這個 tag。
    <br/>
    
    `index.html` 的 `<app-root></app-root>` 可以對應到 app 這個 Component，並讓 `index.html` 渲染出相對應的畫面。
    <br/>

2. **`templateUrl`**：
    設定這段 `<app-root></app-root>`要替換的 html檔路徑，把 `templateUrl` 後面的 Url 去掉，就可以塞入字串讓它解析。
    ```ts
    template: '<p>write something...</p>'
    ```
<br/>

3. **`styleUrls`**：
    設定 css 檔路徑，跟 `templateUrl` 一樣，如果把 `styleUrls` 的 Urls 拿掉，也可以直接寫 CSS。
    ```ts
    style: 'p{}'
    ```
<br/>

另外兩個檔案 `app.component.css` 及 `app.component.html` 分別是用來設定 CSS 樣式及前端 HTML，這裡就不再贅述功能。
<br/>

## `main.ts` 啟動整個 Angular 專案
`main.ts` 這個檔案中有一段程式碼：
```ts
platformBrowserDynamic().bootstrapModule(AppModule)
  .catch(err => console.error(err));
```

這段程式碼是整個專案最先執行的程式碼，並且由 `.bootstrapModule(AppModule)` 來負責啟動整個 Angular 專案。跟 SpringBoot 有點像，`bootstrapModule(AppModule)` 這個方法後面傳入了 `AppModule`，它對應的是 `app.module.ts` 檔案的內容：
```ts
@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { 
```

重點在於 `bootstrap: [AppComponent]` 這段程式碼，它會將 AppComopnent 視為必須優先讀取的 Component，這樣 `index.html` 就可以解析 `<app-root></app-root>` 這段 tag 並將 AppComponent 渲染到畫面上。

如果有其他想在 `index.html` 使用的 Component，也必須加在這個 Array 中，接著就會連動到前面提到的根元件 ( 最一開始的 Component，所有的 Component 都會長在它之下 )。
<br/>

> 小結
* Angular 專案中幾個重要的角色：
    * `main.ts`：Angular 程式進入點
    會依照 AppModule 中的內容進行初始化
    <br/>

    * `app.module.ts`：
    `bootstrap: [AppComponent]` 定義了一開始要解析的 Component
    <br/>

    * `index .html`：根 HTML
    <br/>

    * AppComponent：根元件
    包含3個檔案：`app.component.ts`、`app.component.css` 及 `app.component.css`。
<br/>

> 補充
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

> 參考資料
* [關於Angular](https://www.fetchs.cn/web/angular/)
* [關裝飾器decorator](https://www.twblogs.net/a/5c1dcb79bd9eee5e4184d535)