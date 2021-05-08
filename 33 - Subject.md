# Angular - 33 - Subject
Subject 是一個比較特殊的 Observable，一般的 Observable 只能由內部 ( 資料來源源頭 ) 去觸發 `next()` 更新 Observer 的資訊；但 Subject 物件可以由外部去觸發 `next()`，只要有訂閱的 Observer 就可以收到訊息。因為 Subject 實際上就是 Observer Pattern 的實作，他會在內部管理一份 Observer 的清單，並在接收到值時遍歷這份清單並送出值，進行組播 ( multicast )。

也就是 Subject 本身也可以當作是 Observable 使用 `next()` 發送資料，像是通訊軟體的群組中，只要有人回復訊息，在群組的人都要同時更新內容，這種清況我們就可使用 Subject。相較於基本雙向溝通使用 `@Input()` 及 `EventEmitter`，Subject 提供了更便捷且有效率的方式。

Subject 通常較適合用在 Service 對多個注入相同服務的 Component 之間的溝通，如果是 Component 之間的溝通，還是用遠本的 `@Output()` 搭配 `EventEmitter` 較為合適。

使用前需要引入 Subject，而在 Component hook 結束前一樣需要在 `OnDestroy()` 時取消訂閱。
```
import { Subject } from 'rxjs';
```

## 建立 Subject
```
|--main
  |--main.component.html
  |--main.component.ts // 更改
```

1. `main.component.ts`
```ts
export class AppComponent implements OnInit {
  ngOnInit(): void {
    let subject = new Subject();

    var observerA = {
      next: data => console.log(`A：${data}`),
      error: err => console.log(`A error：${err}`),
      complete: () => console.log(`A complete`)
    };

    var observerB = {
      next: data => console.log(`B：${data}`),
      error: err => console.log(`B error：${err}`),
      complete: () => console.log(`B complete`)
    };

    // 被訂閱
    subject.subscribe(observerA); 
    subject.subscribe(observerB);

    // 送值 
    subject.next(4); 
    subject.next(5);
    subject.next(6);
  }
}
```
上面的例子可以看到，Subject 可以被訂閱，也可以主動將資料發送出去。而 Observer A 跟 B 之間不會互相影響，都可以拿到 4、5、6 三個值。我們再用一個更明顯一點的例子，來觀察 Subject 既是 Observable 也是 Observer 這件事。

```
|--main
  |--main.component.html
  |--main.component.ts // 更改
```

1. `main.component.ts`
```ts
export class AppComponent implements OnInit {
  ngOnInit(): void {
    let subject = new Subject();

    var observerA = {
      next: data => console.log(`A：${data}`),
      error: err => console.log(`A error：${err}`),
      complete: () => console.log(`A complete`)
    };

    var observerB = {
      next: data => console.log(`B：${data}`),
      error: err => console.log(`B error：${err}`),
      complete: () => console.log(`B complete`)
    };

    // 被訂閱
    subject.subscribe(observerA); 
    subject.subscribe(observerB);

    // 先訂閱 interval 再將值送出 
    interval(1000).subscribe(data => subject.next(data));
  }
}
```
可以看到上面我們先由 Subject 訂閱 `interval` 物件，然後再由 Subject 將接收到的值分別送給 Observer A 跟 B。

Subject 底下還有3個子類：
* `BehaviorSubject`
* `ReplaySubject`
* `AsyncSubject`

接下來我們會這3個不同的 subClass 可以做到什麼事。

## BehaviorSubject
很多時候我們會希望 Subject 能保留當下的值，後續有 Observer 訂閱時能夠立即給出最新的值或是告訴 Observer 訂閱成功了，而不是沒有回應，等有新的值被送出才做出反應。BehaviorSubject 會 keep 住最新一次的值，在後面有訂閱者訂閱時，將這個值送出。
```
|--main
  |--main.component.html
  |--main.component.ts // 更改
```

1. `main.component.ts`

```ts
export class AppComponent implements OnInit {
  ngOnInit(): void {
    let behaviorsubject = new BehaviorSubject<any>('init value');

    var observerA = {
      next: data => console.log(`A：${data}`),
      error: err => console.log(`A error：${err}`),
      complete: () => console.log(`A complete`)
    };

    var observerB = {
      next: data => console.log(`B：${data}`),
      error: err => console.log(`B error：${err}`),
      complete: () => console.log(`B complete`)
    };

    // 被訂閱 A
    behaviorsubject.subscribe(observerA);

    // 送值
    behaviorsubject.next(1);
    behaviorsubject.next(2);

    // 被訂閱 B
    behaviorsubject.subscribe(observerB);

    behaviorsubject.next(3);
  }
}
```
在 `new BehaviorSubject(initValue)` 需要給定出始值 `initValue`，如果在 Subject 後面不加上資料的型別，會以一開始的 `initValue` 參數的行別為主，所以想要傳入不同型別的話要加上 `<any>`。從結果可以看出，雖然 Observer B 在 Subject 發送數字2後才訂閱，但一樣可以接收到2這個數值。<br>
![](/images/33-2.png)

## ReplaySubject
ReplaySubject 跟 BehaviorSubject 有點相似，當有一個新的 Observer 訂閱時，可以重新回放最後幾個事件資料。ReplaySubject 內部有一個暫存的 buffer 區域，用來儲存已經被發送出去的事鍵資料，而保留個資料個數與時間可以由傳入 constructor 的參數設定；同樣的 ReplaySubject 也是使用 `next()` 方法來發送資料。所以當有新的訂閱者訂閱時，這些儲存的資料會遵守先進先出 ( FIFO ) 一一被推送。

在建立 ReplaySubject 時可以傳入參數：
* `bufferSize`：決定要儲存多少個已發送的資料在 buffer，預設沒有上限 ( infinite )。
* `windowTime`：設定這些被保留在 buffer 的資料的存活時間，以毫秒為單位。

當你想要保留最多三筆資料，且這些資料2秒後就要被清空的話，可以這樣寫：`new ReplaySubject(3, 2000)`。

#### ReplaySubject 與 BehaviorSubject 差異
當使用 `new ReplaySubject(1)` 時的功能跟 BehaviorSubject 是一樣的，都是保留最新的一個數值，不一樣的地方在於：
*  BehavioSubject 在建構時會有一個待發的初始值。
    > BehaviorSubject comes "primed" with a single value upon construction.

* ReplaySubject 在觀察到錯誤後 ( error ) 仍會繼續發送保存在 buffer 中的值，但 BehaviorSubject 不會。
    > ReplaySubject will replay values, even after observing an error, where BehaviorSubject will not.

```
|--main
  |--main.component.html
  |--main.component.ts // 更改
```

1. `main.component.ts`
```ts
export class AppComponent implements OnInit {
  ngOnInit(): void {
    let replaySubject = new ReplaySubject<any>(2, 1000);

    var observerA = {
      next: data => console.log(`A：${data}`),
      error: err => console.log(`A error：${err}`),
      complete: () => console.log(`A complete`)
    };

    var observerB = {
      next: data => console.log(`B：${data}`),
      error: err => console.log(`B error：${err}`),
      complete: () => console.log(`B complete`)
    };

    // 被訂閱 A
    replaySubject.subscribe(observerA);

    // 送值
    replaySubject.next(1);
    replaySubject.next(2);
    replaySubject.next(3);
    replaySubject.next(4);

    // 被訂閱 B
    replaySubject.subscribe(observerB);

    replaySubject.next(5);
  }
}
```
我們使用 ReplaySubject 將最新的兩個值保留下來，並設定存活時間為1秒，可以看到結果如下：<br/>
![](/images/33-3.png)

後面訂閱的Observer B 也可以接收到 3、4 兩個數值。詳細 API 可以參考官網的 [ReplaySubject](https://rxjs-dev.firebaseapp.com/api/index/class/ReplaySubject)。

## AsyncSubject
AsyncSubject 只會在 Subject 狀態變更為 complete 之後才會發送最新的值，無論前面 `next()` 幾次也沒用(欸)。讓我們來看看例子：
```
|--main
  |--main.component.html
  |--main.component.ts // 更改
```

1. `main.component.ts`
```ts
export class AppComponent implements OnInit {
  ngOnInit(): void {
    let asyncSubject = new AsyncSubject<any>();

    var observerA = {
      next: data => console.log(`A：${data}`),
      error: err => console.log(`A error：${err}`),
      complete: () => console.log(`A complete`)
    };

    var observerB = {
      next: data => console.log(`B：${data}`),
      error: err => console.log(`B error：${err}`),
      complete: () => console.log(`B complete`)
    };

    // 被訂閱 A
    asyncSubject.subscribe(observerA);

    // 送值
    asyncSubject.next(1);
    asyncSubject.next(2);
    asyncSubject.next(3);
    asyncSubject.complete();

    // 被訂閱 B
    asyncSubject.subscribe(observerB);
  }
}
```
結果就是不論在 Subject 完成前或完成後訂閱，都只會在狀態變更為 complete 後才拿到值。<br/>
![](/images/33-4.png)

## 小結
* Subject 概念：
    * Subject 同時是 Observable，也是 Observer
    * Subject 會對內部的 Observers ( 訂閱 Subject者 ) 清單進行組播 ( multicast )

* Subject subClass：
    * BehaviorSubject
    * ReplaySubject
    * AsyncSubject

> 參考
* https://rxjs-dev.firebaseapp.com/api/index/class/Subject
* https://blog.jerry-hong.com/series/rxjs/thirty-days-RxJS-23/
* https://medium.com/allen%E7%9A%84%E6%8A%80%E8%A1%93%E7%AD%86%E8%A8%98/rxjs-subject-replaysubject-behaviorsubject-%E7%AD%86%E8%A8%98-9557c651678f