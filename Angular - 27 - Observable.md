# Angular - 27 - Observable 概觀
## Observable
Observable 其實是由第三方套件實作的，也就是 Rxjs。什麼是 Observable 呢?在 Observable 的設計模式下會有兩個角色：**Observable ( 被觀察者 )** 及 **Observer ( 觀察者 )**。Observable 可以想像成是一個資料來源 ( Data Source )，像是事件、Http Request 發送回來的資料等等。在程式碼被執行的過程當中，有一個時間軸，在這條時間軸上面可以有多個事件被 Observable 發射 ( emit )。而另外一個角色 Observer，可以當成是自己寫的業務邏輯程式碼，當資料從 Observable 被發出來，Observer 監控到就會執行我們後續的業務邏輯。
![](/images/27-5.png)

在 Observable 的生命週期間，Observer 可以從 Observable 取得三種不同類型的資料：
1. 一般的資料 ( Normal Data )
2. 錯物資料物件 ( Errors )
3. Observable 是否處理完成的訊息 ( Completion )

我們可以針對這3種資料進行不同的處理。

所以簡單來說，Observable 模式就是為了讓我們方便觀察是否已經取的想要的資料，在要到資料之後進行處理，那麼我們什麼時候會知道資料已經被丟回來了呢?比較經典的例子就是發送 Ajax 請求，為了讓程式碼同步，以前的 JavaScript 做法會是利用 callback function 或是 Promise 來達到同步的目的；在 Angular 中則是引入了觀察者模式，由 Observer 去觀察來源物件 ( Observable )。

前面提到 Observable 可以當作是資料的串流或是資料來源，當有新資料時，Observable 會發送事件出去。Observer 則是要訂閱 ( subscribe ) 才能接收到 Observable 發出的事件。那麼他是怎麼達到這些目的的呢?Observable 底層包含了 Function、ES6 Promise 和 Iterator 等等。

> Observables are lazy Push collections of multiple values. They fill the missing spot in the following table:

| | SINGLE | MULTIPLE
|---|---|---|
Pull |	Function | Iterator
Push | Promise | Observable

## Interval
`Interval` 是一個最簡單的 Observable，可以設定發送的時間，不需要設定要觀察的資料 ( Data Source )，並自行撰寫 `subscribe` 後的內容。
```
import { Interval } from 'rxjs';
```

```
|--main.component.html // 更改
|--main.component.ts // 更改
```

```ts
export class MainComponent implements OnInit {
  constructor() { }

  ngOnInit(): void {
    interval(1000).subscribe(x => {console.log(x)});
  }
}
```

`Interval` 的時間單位為毫秒，所以上面設定的是一秒要在 Console 印出當前經過的秒數，打開開發者工具就會看到結果。
![](/images/27-1.png)

如果今天的頁面是會切換不同 Component，Observable 在切換 Component 的情況下還是會繼續運作。下面的範例搭配 Router 達到切換 Component 的目的，接下來一起看一下 Console 會發生什麼事。

現在有兩個 Component：
```
src
  |--app
    |--app.component.html // 更改
      |--main
        |--main.component.html // 更改
        |--main.component.ts // 更改
      |--page-one
        |--page-one.component.html // 更改
        |--page-one.component.ts // 更改
  |--app-routing.module.ts // 更改
```
1. `app-routing.module.ts`
```ts
const routes: Routes = [
  { path: '', component: MainComponent },
  { path: 'Page-One', component: PageOneComponent },
  { path: '**', component: MainComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
```
第一步先設定路由，預設停在 Main Component 畫面，最下面的則是萬用路由。
<br/>

2. `app.component.html`
```html
<div>
  <router-outlet></router-outlet>
</div>
```
<br/>

3. `main.component.html`
```html
<p-card header="Main">
  <h5>Go to page one.</h5>
  <button type="button" label="Page One"
    (click)="onClickPageOne()"
    pButton
    pRipple></button>
</p-card>
```
<br/>

4. `main.component.ts`
```ts
export class MainComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit(): void {
    interval(1000).subscribe(x => console.log(x));
  }

  onClickPageOne(){
    this.router.navigateByUrl('/Page-One');
  }
}
```

5. `page-one.component.html`
```html
<p-card header="Page One">
  <h5>Go back to main.</h5>
  <button type="button" label="Main"
    class="p-button-warning"
    (click)="onClickMain()"
    pButton
    pRipple></button>
</p-card>
```

6. `page-one.component.ts`
```ts
export class PageOneComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  onClickMain(){
    this.router.navigateByUrl('');
  }
}
```

我們在 Main Conponent 上實作 Observable，從 Main Component 切換到 PageOne Compoenent 再切回去，會發現開發者工具有兩個 Observable 在運作，因為在 Component 執行 `ngOnDestroy` 時沒有對 Observable 取消訂閱 ( unsubscribe )，導致 memory leak。所以在訂閱 Observable 都應該在不需要他的時候對他取消訂閱。
![](/images/27-4.png)

```
src
  |--app
    |--app.component.html
      |--main
        |--main.component.html
        |--main.component.ts // 更改
      |--page-one
        |--page-one.component.html 
        |--page-one.component.ts 
  |--app-routing.module.ts
```

1. `main.component.ts`
```ts
export class MainComponent implements OnInit {
  mainObservable: Subscription;

  constructor(private router: Router) { }

  ngOnInit(): void {
    // this.mainObservable = interval(1000).subscribe(x => console.log(x));
  }

  onClickPageOne(){
    this.router.navigateByUrl('/Page-One');
  }

  ngOnDestroy(): void {
    this.mainObservable.unsubscribe();
  }
}
```
每個 Observer 對 Observable 進行 subscribe，都可以取得一個回傳的物件 Subscription。現在要做的事情就是在 Component destroy 時對這個物件取消訂閱。
<br/>

> 參考
* https://rxjs-dev.firebaseapp.com/guide/observable