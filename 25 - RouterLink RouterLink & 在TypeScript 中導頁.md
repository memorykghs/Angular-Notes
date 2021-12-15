# Angular - 25 - RouterLink & 在TypeScript 中導頁
有時候我們會透過點選連結 ( `<a>` 標籤 ) 來切換到另一個畫面，不過 `<a>` 標籤是透過他本身的屬性 `href` 導，這種方式還是有發送請求到後端。但以 SPA 的角度來說，應該只用 JavaScript 就可以達到選染畫面的效果，所以實際上在 Angular 使用 `<a>` 標籤會透過 Angular 自己包裝過的 routerLink 功能來達到切換畫面的效果。

```
|--app
    |--app-routing.module.ts
    |--app.component.html // 更改
```

```html
<div class="container">
  <div class="row">
    <div class="col-xs-12 col-sm-10 col-md-8 col-sm-offset-1 col-md-offset-2">
      <ul class="nav nav-tabs">
        <li role="presentation"><a routerLink="/">Home</a></li>
        <li role="presentation"><a routerLink="/servers">Servers</a></li>
        <li role="presentation"><a [routerLink]="['/users']">Users</a></li>
      </ul>
    </div>
  </div>
  <div class="row">
    <div class="col-xs-12 col-sm-10 col-md-8 col-sm-offset-1 col-md-offset-2">
      <router-outlet></router-outlet>
    </div>
  </div>
</div>
```
由於前一章已經設定完路由的導向了，所以這裡我們只要在 `<a>` 綁定 `routerLink="/url"` 或是 `[routerLink]="['/url']"` 就可以了。使用 **`routerLink="/url"` ( 常量繫結 )** 的話就只能繫結字串，不能繫結變數；加上中括號 **`[routerLink]="['/url']"` ( 物件繫結 )** 的話就可以細節一個陣列物件。另外如果 URL 前面有家上斜線 `/` 的話，是採用絕對路徑；但沒有加斜線的話會用相對路徑，這時主控台就會報錯。

```
|--servers
    |--servers.component.html // 更改
```

```html
<div class="row">
  <div class="col-xs-12 col-sm-4">
    <div class="list-group">
      <a
        href="#"
        class="list-group-item"
        *ngFor="let server of servers">
        {{ server.name }}
      </a>
    </div>
  </div>
  <div class="col-xs-12 col-sm-4">
    <a routerLink="servers">Reload Page</a>
    <app-edit-server></app-edit-server>
    <hr>
    <app-server></app-server>
  </div>
</div>
```

## RouterLinkActive
RouterLinkActive 可以追蹤元素上的連結路由當前是否處於活動狀態，並允許指定一個或多個 CSS 類別來改變狀態。像是有時候我們會希望在停留在某個選單或是頁籤時，顏色或樣式會出現改變。所以我們可以在 `<a>` 標籤中加入 `routerLinkActive=="active"` 屬性，等號右邊是 CSS 樣式 class。RouterLinkActive 會比對當前頁面的網址路由是否跟綁在 `<a>` 標籤中的 `routerLink` 內容相同，比對成功則套用該樣式。

在 HomeComponent 上還增加了 `routerLinkActiveOptions`，主要是因為 HomeComponent 的 URL 是空的，而 Angular 在比對網址路由時，是由跟路由開始比對，所以偵測該路由是否被選取，只要前面路由路徑相同，就視為相同 ( `""` vs. `"servers"` & `"home"` vs. `"home/servers"` )，因此要補上 `{ exact: true }` 讓被偵測的 Component 的 URL 要完全 mapping 才會添加樣式。( 預設的 routerLinkActive 會套用到頁面的上層路徑，也就是預設會是 `{ exact: false }` )

```
|--app
    |--app.component.html // 更改
```

```html
<div class="container">
  <div class="row">
    <div class="col-xs-12 col-sm-10 col-md-8 col-sm-offset-1 col-md-offset-2">
      <ul class="nav nav-tabs">
        <li role="presentation" routerLinkActive="active" [routerLinkActiveOptions]="{exact: true}"><a routerLink="/">Home</a></li>
        <li role="presentation" routerLinkActive="active"><a routerLink="/servers">Servers</a></li>
        <li role="presentation" routerLinkActive="active"><a [routerLink]="['/users']">Users</a></li>
      </ul>
    </div>
  </div>
  <div class="row">
    <div class="col-xs-12 col-sm-10 col-md-8 col-sm-offset-1 col-md-offset-2">
      <router-outlet></router-outlet>
    </div>
  </div>
</div>
```

## 使用 TypeScript 進行導頁
除了在 Template 的元素上設定導頁，另一個設定導頁的方式是在 TypeScript 中，設定上只要注入 Router 物件，並使用它的 `navigate()` 或是 `navigateByUrl()` 就可以導頁。

```
|--home
    |--home.component.html // 更改
    |--home.component.ts // 更改
```

1. `home.component.html`
```html
<h4>Welcome to Server Manager 4.0</h4>
<p>Manage your Servers and Users.</p>
<button class="btn btn-primary" (click)="onLoadServers()">Load Servers</button>
```
<br/>

2. `home.component.ts`
要在 ts 中導向需要先注入 Router 服務，然後在要導向的動作中使用 Router 服務的方法即可。
```ts
export class HomeComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {
  }

  onLoadServers() {
    this.router.navigate(['/servers']); // 或 this.router.navigateByUrl('/servers');
  }
}
```
`navigate()` 與 `navigateByUrl()` 的差別在於前者第一個參數會傳入一個陣列，陣列中的第一個參數代表要導向的路由，後面的參數則是可以傳入動態的路由參數；後者 `navigateByUrl()` 只能設定路由，不能將參數帶道路由網址上，當沒有需要設定動態路由在網址後面接參數時，兩者的功能是一樣的。

## 在 TypeScript 中使用相對位置
若想在 TypeScript 中使用相對 URL，需要額外注入另一個物件 ActivatedRoute 服務，並在使用 `navigate()` 方法時使用它，告訴 TypeScript 當前的 URL 位置，這樣的設定完成後就可以使用相對路徑，打開 F12 也可以看到主控台上確實會報錯：

```
|--servers
    |--servers.component.ts
```

```ts
export class ServersComponent implements OnInit {
  private servers: {id: number, name: string, status: string}[] = [];

  constructor(private serversService: ServersService,
              private router: Router,
              private route: ActivatedRoute) { }

  ngOnInit() {
    this.servers = this.serversService.getServers();
  }

  onReload() {
    this.router.navigate(['servers'], {relativeTo: this.route});
  }
}
```

## 小結
一般透過露由導覽可以分為兩種：絕對位址導覽及相對位址導覽。
* 絕對位址導覽
  ```ts
  this.router.navigateByUrl('servers/1');
  this.router.navigate(['servers/1']);
  ```

* 相對位址導覽 ( 相對於目前路由的網址路徑 )
  ```ts
  this.router.navigate(['../'], { relativeTo: this.route });
  this.router.navigate(['../1'], { relativeTo: this.route });
  ```
<br/>

> 參考
* [神的github](https://github.com/we-jia/Angular-LearningNote/blob/main/14.%20Routing.md)
* https://angular.tw/api/router/Router