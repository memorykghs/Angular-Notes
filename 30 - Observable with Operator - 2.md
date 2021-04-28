# Angular - 29 - Observable with Operator - 1
## Operator (續)
#### concat() / concatWith()
可以將多個 Observable 實例合併成一個。第8版之後的 Rxjs 已經將 `concat()` 方法移除，改用 `concatWith()`。兩者方法使用上的差異如下：
```
concat(source1, source2, source3) ===等同於===> source1.pipe(concatWith(source2, source3))
```

`concatWith()` 內可以傳入一個陣列，陣列內的型別是 `any`，API 資訊如下。
```ts
concat<T, R>(...args: any[]): OperatorFunction<T, R>
```

使用 `concat()` 或 `concatWith()` 他就會幫我們把所有元素合併起來。下面的例子中有兩個 data source，第一個 data source 稍微複雜了一點，是一個陣列裡面含有物件或純值。接下來用 `interval` 搭配 `take(3)` 來測試，表示拿到3筆之後就要合併另外兩個 data source 的資料。
```
|--main
  |--main.component.html
  |--main.component.ts // 更改
```

1. `main.component.ts`
```ts
export class AppComponent implements OnInit {
  observavle: any;

  ngOnInit(): void {
    console.clear();

    let source1 = of([
      {
        map1: "map1"
      },
      "map2",
      ["map3", "map4"]
    ]);

    let source2 = of(4, 5, 6);

    this.observavle = interval(1000)
      .pipe(
        take(3),
        concat(source1, source2)
      )
      .subscribe(console.log);
  }

  ngOnDestroy() {
    this.observavle.unsubscribe();
  }
}
```
傳入的兩個 data source 的資料要等第一個 Observable 完成  ( complete ) 才會被執行，結果如下：
![](/images/30-4.png)
<br/>

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
        ['cat', 'dog', 'bird', 'turtle'],
        ['elephant', 'hippo', 'zebra']
     ];

    from(dataSource)
      .pipe(concatAll())
      .subscribe(console.log);
  }
}
```
上面這個例子我們設計了一個二維陣列，當我們使用 `concatAll()` 後把結果印出來會發現他已經將陣列內的所有值拆開，並放在同一個陣列內，所以 console 印出來的結果會是一個一個的字串內容。
<br/>
![](/images/30-1.png)

如果改為使用 `map()` 的話結果就會不一樣，經過 `map()` 拿到的會是裡面內層的陣列。要注意的是，`concatAll()` 會處理 source 先發出來的 Observable，必須等到這個 Observable 結束，才會再處理下一個 source 發出來的 Observable。
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
        ['cat', 'dog', 'bird', 'turtle'],
        ['elephant', 'hippo', 'zebra']
     ];

    from(dataSource)
       .pipe(map(x => x))
       .subscribe(console.log);
  }
}
```

![](/images/30-2.png)

整體來說感覺會像是這樣的結構：
![](/images/30-3.png)
<br/>

#### merge()
雖然 `merge()` 跟 `concat()` 都是用來合併，但行為上有很大的不同。首先先看 `merge()` 內也是要傳入一個陣列，API 資訊如下：
```ts
merge<T>(...args: unknown[]): OperatorFunction<T, unknown>
```
再來我們將 source1 跟 source2 改為有順序的數字，看印出來的順序。

```
|--main
  |--main.component.html
  |--main.component.ts // 更改
```

1. `main.component.ts`

```ts
export class AppComponent {
  observavle: any;

  ngOnInit(): void {
    let source1 = interval(1000).pipe(take(4));
    let source2 = interval(500).pipe(
      skip(4),
      take(3)
    );

    this.observavle = interval(1000)
      .pipe(
        take(3),
        merge(source2)
      )
      .subscribe(
        data => console.log(data),
        error => console.log(error),
        () => console.log("Complete")
      );
  }
}
```
從 console 可以看的出來，`merge()` 是把多個 Observable 同時處理 ( 並行處理 ) 跟前面提到的 `concat()` / `concatWith()` 一次只處理一個 Observable 完全不一樣。而當所有資料都被處理結束後，Observable 才會真正地完成。
(圖)
<br/>

#### skip()
可以略過前幾個指定數量的元素。不過要記得如果想要略過前3個元素取第4個，仍需要花3秒的時間。

```
|--main
  |--main.component.html
  |--main.component.ts // 更改
```

1. `main.component.ts`
```ts
export class AppComponent implements OnInit {

  ngOnInit(): void {
    console.clear();

    interval(1000)
      .pipe(skip(3))
      .subscribe(data => console.log(data));
  }
}
```

---

接下來的三個 Operators 則像是 AND ( && ) 邏輯，多個元素送進來，最後只會輸出一個元素，但各自行為上仍有些差異。

#### combineLatest()
```
|--main
  |--main.component.html
  |--main.component.ts // 更改
```

1. `main.component.ts`
```ts
export class AppComponent implements OnInit {

  ngOnInit(): void {
    console.clear();

    let source1 = interval(500).pipe(take(5));
    let source2 = interval(300).pipe(
       take(10),
       skip(5)
    );

    combineLatest(source1, source2).subscribe(console.log);
  }
}
```



## 小結
* concat / concatWith
* concatAll
* merge
* skip

> 參考
* https://blog.jerry-hong.com/series/rxjs/thirty-days-RxJS-09/
* https://rxjs-dev.firebaseapp.com/api
