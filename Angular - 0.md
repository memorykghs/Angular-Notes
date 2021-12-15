# Angular - 1

> 一個Angular頁面會有三個檔案：TypeScript檔、Template檔以及css檔 &rArr; **separate of concern(關注點分離)**



而一般開發通常會使用TypeScript開發，因為通常在開發時會遇到一些型別上轉換的問題，例如：
```js
[] + {} // [object object]
{} + [] // 0
```
<br/>

##TypeScript
<font color = #FF0000>未補完</font>
TypeScript中的型別：
型別 | 說明
:-----:|:-----
`void` |
`any`  | 
<br/>
使用TypeScript宣告變數時可以用以下方法：
```ts
var a: string = 'Hello';
var b: number;
var c: boolean;

a = '123'; // 編譯器會報錯但實際上可以過
```

寫functiont時可以用：
```ts
function test(a: number, b: number){
    console.log(a + b);
}
```
<br/>

TypeScript檔案中會去做型別推斷，所以在宣告以及賦值須注意：
```ts
var b = 1;
b = 'Hi' // 因為型別推斷，所以b不能被更改為String型別的內容
```

* 型別為`void`的變數值只能是`undefined`跟`null`