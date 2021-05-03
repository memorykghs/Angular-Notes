# Angular - 33 - 深入理解 Observable
前面使用 Operator 的感覺其實很像在操作 JavaScript 原生的陣列方法，但實際上 Observable 的 Operator 跟陣列方法有很大的差異，主要有以下2點：
1. 延遲運算
2. 漸進式取值

## 延遲運算
延遲運算講的是，這些我們寫的 Operator 在 Observable 被訂閱後才開始對元素做運算，沒有訂閱的話就不會有運算的行為，而陣列方法則是會馬上執行完並回傳執行的結果。可以嘗試把下面這段程式碼丟到 [Stackblitz](https://stackblitz.com/) 跑跑看結果。

```ts
// Observable
const source1 = from([1, 2, 3, 4, 5]);
var observable = source1.pipe(map(x => x));
console.log(`observable ---> ${observable}`);

// 陣列方法
var source2 = [1, 2, 3, 4, 5];
var arrayMethod = source2.map(x => x);
console.log(`arrayMethod ---> ${arrayMethod}`);
```
Console 只會印出陣列的物件，Observable 則不會。
![](/images/33-1.png)

延遲運算的優勢：

## 漸進式取值
陣列的 Operator 會在所有元素丟進去運算完後，回傳一個結果陣列，在將這個陣列丟到下一個 Operator 運算，就是每一次的操作都會回傳一個完整的結果。
```ts
var source = [1,2,3];
var example = source
    .filter(x => x % 2 === 0) // 運算並返回結果陣列
    .map(x => x + 1) // 運算並返回結果陣列
```


Observable 的 Operator 的運算方式跟陣列的是完全的不同，雖然 Observable 的 Operator 也都會回傳一個新的 Observable，但因為元素是漸進式取得的關係，所以每次的運算是一個元素運算到底，而不是運算完全部的元素再返回。

```ts
var source = from([1,2,3]);
var example = source
    .filter(x => x % 2 === 0)
    .map(x => x + 1)
```

漸進式取值的觀念在 Observable 中其實非常的重要，這個特性也使得 Observable 相較於 Array 的 Operator 在做運算時來的高效很多，尤其是在處理大量資料的時候會有明顯的差異。

本篇只做筆記用，詳細內容參考這位大大的 [深入 Observable](https://blog.jerry-hong.com/series/rxjs/thirty-days-RxJS-21/)。

> 參考
* https://blog.jerry-hong.com/series/rxjs/thirty-days-RxJS-21/