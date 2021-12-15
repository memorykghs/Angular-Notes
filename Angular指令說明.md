# 指令說明
ng 是 Angular 的縮寫，只要在專案中看到，就代表是 Angular 的指令 Angular 或功能。

* `npm install -g @angular/cli` 
安裝 Angular CLI，。 
    * `-g`：代表安裝的是全域環境 ( gloabal )
    * `npm install -g @angular/cli@8.3.29`：另外安裝時可以指定安裝版本，在要安裝的套件後面以 `@` 後面接指定版本即可。
<br/>

* `npm uninstall -g @angular/cli`
解除安裝。
<br/>

* `npm cache clean --force`
清空儲存在電腦的 cach。
<br/>

* `ng --version`
查看目前 Angular 相關套件版本。
![](/images/ng-version.png)
<br/>

* `ng new my-app`
這個指令是說「請幫我新增一個叫做 my-app 的應用程式」。my-app 是應用程式的名字，可以代換成你想取的任意名稱，只是限定使用英文。<br>
這個指令會在目前 Terminal 的執行位置新增一個 Angular APP 專案，也可以建好後再將整個專案移動到想放的位置。
<br/>

* `Would you like to add Angular routing? (y/N)`：
這是詢問是否需要自訂路由（網站 URL），也可以之後再行增加，選擇 `Y` 後會看到有 `app-routing.module.ts` 這個檔案。
<br/>

* `Which stylesheet format would you like to use? (Use arrow keys)`
要使用者挑選樣式表語言。看個人慣例可使用 SCSS、Sass 或 Less 等，如果都不需要（或者除了 CSS 都不認識的話）直接選預設的 CSS 就好。
<br/>

* `ng serve`
這是命令程式將用 Angular 寫出來的內容（比方說 Angular 專屬的 ng 指令、人稱升級版 JS 的 TypeScript 以及 Sass 等等），編譯成瀏覽器能夠讀懂的 HTML、CSS 和 JS，並模擬網頁實際運作情況。<br/>
要留意跑ng serve時 Terminal 執行位置必須來到專案資料夾，不然程式會不曉得到底該跑哪個專案，最後面的`-o`或`--open`則是指示編譯完後打開瀏覽器檢視完成後的網站。<br/>
`ng serve`本身具備了只要存檔就會自動重整網頁瀏覽更新結果的功能。當然，也可以改成跑`ng serve --liveReload=false`指定不要自動重整，以免浪費電腦資源。

---
* 安裝TypeScript：`npm install -g typescript`

* `tsc 檔案名稱.ts`：可以將TypeScript檔案編譯成.js檔