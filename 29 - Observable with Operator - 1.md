# Angular - 29 - Observable with Operator - 1
通常我們對一個物件訂閱，都是想要拿到某些特定的資料，不過這些資料都是沒有經過處理過的 ( raw data )。大部的情況下我們都需要對這些資料進行資料處理，例如在顯示員工姓名時，要同時顯示員工行編之類的。這部分可以用 Rxjs 中的 Operator 來達到目的。

## Operator
![](/images/29-1.png)
在取得回傳資料物件 ( Subscription ) 之前，我們可以透過一系列的 Operator 改變資料、甚至資料結構，達到處理資料的目的。

#### map()
迭代資料集合中的每一筆資料，並回傳新的資料集合。跟 JavaScript 陣列方法不一樣的地方是，JavaSript 的 `map()` 迭代一個陣列，並產生新的陣列回傳；而 RxJS 雖然也會回傳新的 Observable，但資料型別不限於陣列。( p.s. Angular 6 之後所有的 Operator 都需要放在 `pipe()` 內 )
```
|--main
  |--main.component.html
  |--main.component.ts // 更改
```

1. `main.component.ts`
```ts
export class MainComponent implements OnInit {
  mainObservable: Subscription;

  constructor() { }

  ngOnInit(): void {
     const intervalSource = interval(1000);
     intervalSource.pipe(map(x => x + 2)).subscribe(console.log);
  }
}
```
<br/>

#### mapTo()
雖然名稱跟 `map()` 很像，但是可以把內容改成固定的值。裡面可以傳入任何型別的值，例如傳入一個 Function，則回傳的每一個值就都會是 Function。

```
|--main
  |--main.component.html
  |--main.component.ts // 更改
```

1. `main.component.ts`
```ts
export class MainComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
     const intervalSource = interval(1000);
     intervalSource.pipe(mapTo(2)).subscribe(console.log);
  }
}
```
原本的 `interval(1000)` 會在一秒印出一個數字，數字跟著秒數成長，但使用 `mapTo()` 之後會變成固定的值。
<br/>

#### filter()
可以傳入一個 callback function 過濾資料，`filter()` 會執行 callback function 並回傳一個 boolean 值來絕地定當前的資料要不要被留下。如果條件判斷結果回傳 `true`，則該筆資料被留下加到新集合中；若為 `false` 則跳過。以下面的例子來說，結果只會印出 3, 6, 9......。

```
|--main
  |--main.component.html
  |--main.component.ts // 更改
```

1. `main.component.ts`
```ts
export class MainComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
     const intervalSource = interval(1000);
     intervalSource.pipe(filter(x => x % 3 === 0)).subscribe(console.log);
  }
}
```

#### pipe()
`pipe()` 是 Observable 中提供的方法，可以讓我們簡化撰寫 Operator。( 其他功能待補 )

```
|--main
  |--main.component.html
  |--main.component.ts // 更改
```

1. `main.component.ts`
```ts
export class MainComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
     const intervalSource = interval(1000);
     customerMainObservable.filter(x => x % 3 === 0).map(x => x + 2).subscribe(console.log);
  }
}

```
原本在使用 Operator 上需要一個一個串接，較難以看出到底使用了那些 Operator，使用 `pipe()` 則可以簡化寫法，Operator 之間以逗號 `,` 隔開。( p.s. Angular 6 之後所有的 Operator 都需要放在 `pipe()` 內 )

```
|--main
  |--main.component.html
  |--main.component.ts // 更改
```

1. `main.component.ts`
```ts
export class MainComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
     const intervalSource = interval(1000);
     customerMainObservable.pipe(
        filter(x => x % 3 === 0),
        map(x => x + 2)
     ).subscribe(console.log);
  }
}
```
<br/>

#### take()
原本在 Observable 的 stream 上，資料會無窮的一直發送，如果使用 `take()` 的話，就只會拿設定的那幾筆，之後會呼叫 Observable 的 `complete()` 結束 Observable。

```
|--main
  |--main.component.html
  |--main.component.ts // 更改
```

1. `main.component.ts`
```ts
export class MainComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
     const intervalSource = interval(1000);
     intervalSource.pipe(take(3)).subscribe({
        next: console.log,
        complete: () => console.log("Complete!")
     });
  }
}
```

#### first()
跟 `take()` 的功能差不多，只是只拿第一筆。

```
|--main
  |--main.component.html
  |--main.component.ts // 更改
```

1. `main.component.ts`
```ts
export class MainComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
     const intervalSource = interval(1000);
     intervalSource.pipe(first()).subscribe({
        next: console.log,
        complete: () => console.log("Complete!")
     });
  }
}
```
<br/>

#### first()
跟 `take()` 的功能差不多，只是只拿第一筆。

```
|--main
  |--main.component.html
  |--main.component.ts // 更改
```

1. `main.component.ts`
```ts
export class MainComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
     const intervalSource = interval(1000);
     intervalSource.pipe(first()).subscribe({
        next: console.log,
        complete: () => console.log("Complete!")
     });
  }
}
```
<br/>

#### takeUntil()
可以指定當某個事件發生時，就讓 Observable 執行 `complete()`。

```
|--main
  |--main.component.html
  |--main.component.ts // 更改
```

1. `main.component.ts`
```ts
export class MainComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    const intervalSource = interval(1000);
    intervalSource.pipe(takeUntil(this.onClick)).subscribe({
      next: console.log,
      complete: () => console.log("Complete!")
    });
  }

  onClick(){}
}
```

## 小結
* map
* mapTo
* filter
* pipe
* take
* first
* takeUntil

> 參考
* https://www.udemy.com/course/the-complete-guide-to-angular-2/learn/lecture/14466302#notes

* https://ithelp.ithome.com.tw/articles/10209779

* https://indepth.dev/posts/1037/reading-the-rxjs-6-sources-map-and-pipe

* https://blog.jerry-hong.com/series/rxjs/thirty-days-RxJS-08/