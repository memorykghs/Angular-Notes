# Angular - 2 - Directive



## 雙向繫結 Two-way Data Binding
雙向繫結比較像是前一張提到的3種方法的結合，也可以說是 Angular 提供的一種語法糖。

後面會詳細提到雙向繫結的方法，這裡先有個概念就好。


## 指令 Directive
* 多功能的標籤或屬性
* 使用內建或自訂 Directive，定義 html 元素、操作 DOM 物件
* Angular 有3種 Directive：
    1. 元件 ( Component )
    2. 屬性行指令 ( Attribute Directive )
    3. 結構型指令 ( Structural Directive )

#### 元件 Component
* 「元件」就是一個包含範本( template )的指令
* 在任意元件範本中可以使用 Directive 語法載入此元件
切換到 Angular 專案內，並在 cmd 輸入`ng g component stock/stock-item`產生元件。
<img src="/img/ng_g_component.png">
<br/>
建立完成之後可以在專案的資料夾下找到剛剛新增的component，以及Angular自動幫我們一起建立的`.html`、`.ts`及`.css`檔案，至於`.spec.ts`檔案是測試用的，目前可以不用理會。
<img src="/img/ng_new_after.png" width="300px">

#### 屬性型指令 Attribute Directive
* 用來改變元素、元件或其他指令的外觀或行為
* 常用內建指令：
    * `ngClass`：從 HTML 元素上新增和移除 CSS 類別
    * `ngStyle`：改變 HTML 元素的樣式
<br/>

#### 結構型指令 Structural Directive
* 透過新增和移除 DOM 元素改變 DOM 佈局
* 常用內建指令：
    * `ngIf`、`ngFor`、`ngSwitchDefult`、`ngSwitchCase` ( 前面<font color="red">要</font>加 * 星號 )
    * `ngSwitch` ( 前面<font color="red">不要</font>加 * 星號 )
* 一個 tag 中只能有一個型指令，不能同時存在兩個