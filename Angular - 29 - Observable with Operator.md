# Angular - 29 - Observable with Operator
通常我們對一個物件訂閱，都是想要拿到某些特定的資料，不過這些資料都是沒有經過處理過的 ( raw data )。大部的情況下我們都需要對這些資料進行資料處理，例如在顯示員工姓名時，要同時顯示員工行編之類的。這部分可以用 Rxjs 中的 Operator 來達到目的。

## Operator
![](/images/29-1.png)
在取得回傳資料物件 ( Subscription ) 之前，我們可以透過一系列的 Operator 改變資料、甚至資料結構，達到處理資料的目的。

#### map()
迭代資料集合中的每一筆資料，並回傳新的資料集合。跟 JavaScript 陣列方法不一樣的地方是，JavaSript 的 `map()` 迭代一個陣列，並產生新的陣列回傳；而 RxJS 雖然也會產生新的物件，但型別不限於陣列。
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
    const customerMainObservable = of(observer => {
      let count = 0;
      setInterval(() => {
        observer.next(count);
        if(count === 5){
          observer.complete();
        }
        if(count > 3){
          observer.error(new Error('Count is greater than 3!'))
        }
        count++;
      }, 1000);
    });

    this.mainObservable = customerMainObservable.map((data: number) => 'Round ' + data).subscribe(
      data => console.log(data),
      error => alert(error.message),
      () => console.log('Complete')
    );
  }
}
```

#### filter()
可以設定條件過濾資料，並回傳新資料集合。如果條件判斷結果回傳 `true`，則該筆資料被留下加到新集合中；若為 `false` 則跳過。

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
    const customerMainObservable = of((observer: any) => {
      let count = 0;
      setInterval(() => {
        observer.next(count);
        if(count === 5){
          observer.complete();
        }
        if(count > 3){
          observer.error(new Error('Count is greater than 3!'))
        }
        count++;
      }, 1000);
    });

    this.mainObservable = customerMainObservable.filter((data: number) => {return data/3 === 0}).subscribe(
      (data: any) => console.log(data),
      (error: any) => alert(error.message),
      () => console.log('Complete')
    );
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
// 前面省略
this.mainObservable = customerMainObservable.filter((data: number) => {return data/3 === 0}).subscribe(
      (data: any) => console.log(data),
      (error: any) => alert(error.message),
      () => console.log('Complete')
    );
```
原本在使用 Operator 上需要一個一個串接，較難以看出到底使用了那些 Operator，使用 `pipe()` 則可以簡化寫法，Operator 之間以逗號 `,` 隔開。

```
|--main
  |--main.component.html
  |--main.component.ts // 更改
```

1. `main.component.ts`
```ts
// 前面省略
this.mainObservable = customerMainObservable.pipe(
    filter((data: number) => {return data/3 === 0}),
    map((data: number) => 'Round ' + data,
    tap())
    .subscribe(
      (data: any) => console.log(data),
      (error: any) => alert(error.message),
      () => console.log('Complete')
    );
```

<br/>

> 參考
* https://www.udemy.com/course/the-complete-guide-to-angular-2/learn/lecture/14466302#notes

* https://ithelp.ithome.com.tw/articles/10209779

* https://indepth.dev/posts/1037/reading-the-rxjs-6-sources-map-and-pipe