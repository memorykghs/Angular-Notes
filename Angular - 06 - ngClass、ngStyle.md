# Angular - 6 - ngClass、ngStyle
## `ngClass`
* 屬於**屬性型指令**：用來改變元素、元件或其他指令的外觀或行為
* 用來設定 DOM 元素 CSS Class
* 可以一次設定單個或是多組 Class
* 以 `true` 或 `false` 作為是否使用該 Class 的開關

#### 語法
```html
<div [ngClass] = "..."></div>
```
等號後的雙引號內可以傳入想要改變的 CSS Class 或是含有 CSS Class 資訊的物件。

比較常用的有以下幾種方法：
1. **傳入String**： 會把列在字串中的 CSS 類別 ( 多個以空格分隔 ) 新增進來
    * 新增單一 CSS Class 
    ```html
    <div [ngClass] = "'firstClass'"></div>
    ```
    <br/>

    * 新增多個 CSS Class ( 以空格分隔 )
    ```html
    <div [ngClass] = "'firstClass secondClass'"></div>
    ```
    <br/>
  
2. **傳入物件**：使用物件實字 ( Object literal ) 設定 CSS Class，其中：
    * `key` 是 CSS 類別名稱
    * `value` 為 boolean 值，表示是否套用該CSS類別
    <br/>
    ```html
    <div [ngClass] = "{ bordered: isBordered }"></div>
    ```

    `isBordered` 為 boolean 形態的 Attribute，表示是否套用 `bordered` Class。
    <br/>

    當然也可以這樣寫：
    ```html
    <div [ngClass] = "{ firstClass: true, secondClass: false }"></div>
    ```
    <br/>

    再進階一點，可以把這個物件的內容抽到 `component.ts` 檔內做設定： 
    ```html
    <div [ngClass] = "classes"></div>
    ```
    ```ts
    this.classes = {
      firstClass: this.stock.isPositiveChange(),
      secondClass: false
    }
    ```

還有一些其他方法，但這邊只提比較常用且等一下會拿來作練習的方法，想要更進一步瞭解可以參考 `ngClass` 的 API。
<br/>

## `ngStyle`
* 屬於**屬性型指令**：用來改變元素、元件或其他指令的外觀或行為
* 用來改變 HTML 元素的樣式

#### 語法
```html
<div [ngStyle] = "{ key: value, key: value, ...}"></div>
```
其中 `key` 為樣式，`value` 為樣式值。

* 可以傳入**物件**或是含有 **CSS** 表達式語句，例如：
  ```html
  <div [ngStyle] = "{ 'font-style': styleExp }"></div>
  ```
  或是：
  ```html
  <div [ngStyle] = "styles"></div>
  ```
  ```ts
  this.styles = {
    color: isChange() ? 'red': 'green',
    border: '2px'
  }
  ```
  <br/>

> 補充
* [ngClass API](https://angular.tw/api/common/NgClass)

* [ngStyle API](https://angular.tw/api/common/NgStyle)

* [NgStyle & NgClass](https://medium.com/allen%E7%9A%84%E6%8A%80%E8%A1%93%E7%AD%86%E8%A8%98/angular-ngstyle-ngclass-2560019a2c6c)
