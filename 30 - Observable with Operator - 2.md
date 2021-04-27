# Angular - 29 - Observable with Operator - 1
## 續 Operator
#### concatAll()
可以將二維以上的陣列 ( 含二維陣列 ) 攤平成一維陣列，可以想像成把陣列內的所有元素 concat 起來，不管裡面有幾層。
```
|--main
  |--main.component.html
  |--main.component.ts // 更改
```

1. `main.component.ts`
```ts
export class AppComponent implements OnInit {

  ngOnInit(): void {
     let dataSource = [
        ["cat", "dog", "bird", "turtle"],
        ['elephant', 'hippo', 'zebra']
     ];

    from(dataSource)
      .pipe(concatAll())
      .subscribe(x);
  }
}
```
上面這個例子我們設計了一個二維陣列，當我們使用 `concatAll()` 後把結果印出來會發現他已經將陣列內的所有值拆開，並放在同一個陣列內。如果改為使用 `map()` 的話結果就會不一樣，經過 `map()` 拿到的會是裡面內層的陣列。要注意的是，`concatAll()` 會處理 source 先發出來的 Observable，必須等到這個 Observable 結束，才會再處理下一個 source 發出來的 Observable。
```
|--main
  |--main.component.html
  |--main.component.ts // 更改
```

1. `main.component.ts`
```ts
export class AppComponent implements OnInit {

  ngOnInit(): void {
     let dataSource = [
        ["cat", "dog", "bird", "turtle"],
        ['elephant', 'hippo', 'zebra']
     ];

    from(dataSource)
       .pipe(map(x => x))
       .subscribe(console.log);
  }
}
```

> 參考
* https://blog.jerry-hong.com/series/rxjs/thirty-days-RxJS-08/
