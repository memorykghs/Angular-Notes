# Angular - 28 - Observable
## Observable
```
import { Observable } from 'rxjs';
```

#### Observable.create ( *deprecated* )
可以用來建立一個 Observable 物件，使用 `next()` 方法將資料發送出去。
```ts
export class MainComponent implements OnInit {
  mainObservable: Subscription;

  constructor(private router: Router) { }

  ngOnInit(): void {
    // this.mainObservable = interval(1000).subscribe(x => console.log(x));
    const customerMainObservable = Observable.create(observer => {
      let count = 0;
      setInterval(() => {
        observer.next(count);
        count++;
      }, 1000);
    });

    this.mainObservable = customerMainObservable.subscribe( x => console.log(x));
  }
```

#### `from`
```
from(ish: ObservableInput, mapFn: function, thisArg: any, scheduler: Scheduler): Observable
```
`from` 可以接收一組 Array-like 型別的資料發送出去。
<!-- 資料的型別可以包含 String、Promise、Object等等。只是 Observable 會將其拆解，以 Array 的形式發送。 -->
```ts
export class MainComponent implements OnInit {
    
  arraySource = [1, 2, 3, 4, 5];

  constructor() { }

  ngOnInit(): void {
    from(this.arraySource).subscribe(x => console.log(x));
  }
}
```

## Handle Error in Observable
前面的幾個案例，Observerble 都是不會拋出錯誤的。如果是發送 Http Request 話，就很有可能發生作物導致 Console 出現紅紅的一片。接下來我們先設定一個簡單的檢核，如果數字大於 3 的話就要拋出錯誤。

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
    const customerMainObservable = Observable.create(observer => {
      let count = 0;
      setInterval(() => {
        observer.next(count);
        if(count > 3){
          observer.error(new Error('Count is greater than 3!'))
        }
        count++;
      }, 1000);
    });

    this.mainObservable = customerMainObservable.subscribe(
      data => console.log(data)
    );
  }
```

![](/images/28-1.png)

而 Observable 本來就有三個不同的函式可以被呼叫：
1. `next()`：正常情況下，用來發送新的資料
2. `error()`：當發生邏輯上的錯誤時，可以拋出錯誤物件 ( Error )
3. `complete()`：被呼叫時，Observable 狀態視為完成

回傳的 Subscription 物件也可以傳入多個參數來對應 Observable 的狀況，分別是：
1. `nextFunc`：當 Observable 有資料出現時執行，**必要**
2. `errorFunc?`：當 Observable 有錯誤發生時執行，非必要
3. `CompleteFunc?`：當 Observable 完成時執行，非必要

想要針對 Error 進行錯誤處理，在 subscribe 時傳入第二個 Function 專門用來 handle Error。

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
    const customerMainObservable = Observable.create(observer => {
      let count = 0;
      setInterval(() => {
        observer.next(count);
        if(count > 3){
          observer.error(new Error('Count is greater than 3!'))
        }
        count++;
      }, 1000);
    });

    this.mainObservable = customerMainObservable.subscribe(
      data => console.log(data),
      error => alert(error.message)
    );
  }
}
```
不過在跳出 alert 訊息之後，可以發現 handle Error 會導致 Observable 被停止並且不會再被訂閱。但是如果是發送 Http Request，我們可能會想知道什麼時候接收到回應並完成要做的事情，這時候我們就可以對第三個參數進行設定，在 Observable 完成 ( Complete ) 時執行。

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
    const customerMainObservable = Observable.create(observer => {
      let count = 0;
      setInterval(() => {
        observer.next(count);
        if(count === 2){
          observer.complete();
        }
        if(count > 3){
          observer.error(new Error('Count is greater than 3!'))
        }
        count++;
      }, 1000);
    });

    this.mainObservable = customerMainObservable.subscribe(
      data => console.log(data),
      error => alert(error.message),
      () => console.log('Complete')
    );
  }
}
```
要注意的是，一旦 Observable 狀態變更為完成，就不會有任何新的值會被發送。另外一件是在 Observable 中發生錯誤與完成是兩件不同的事情。雖然我們在 Observable 拋出錯誤後，他就會被停止，表面上看起來像是先呼叫 `error()` 再呼叫 `complete()`，然而並不是這麼一回事。我們把改變 Observable 狀態的時間延長到第5秒才執行，並打開開發者工具察看結果。

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
    const customerMainObservable = Observable.create(observer => {
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

    this.mainObservable = customerMainObservable.subscribe(
      data => console.log(data),
      error => alert(error.message),
      () => console.log('Complete')
    );
  }
}
```
在這邊可以看到雖然會跳出 alert 訊息，但 Console 並沒有印出狀態完成的那行訊息，由此可知 `error()` 跟 `complete()` 對 Observable 是完全不同的兩件事情。

> 參考
* https://rxjs-dev.firebaseapp.com/guide/observable
* https://www.learnrxjs.io/learn-rxjs/operators/creation/from