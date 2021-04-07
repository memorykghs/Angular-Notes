# Angular - 5 - NgIf、NgIf with else、NgFor
## NgIf ( 結構型 )
在 Template 上使用 `*ngIf` 來決定要不要顯示某區塊的範本 ( HTML )。
```
|--app
    |--app.component.html
    |--app.module.ts 
    |--servers
        |--servers.component.css
        |--servers.component.html // 更改
        |--servers.component.ts // 更改
```

1. `servers.component.html`
```html
<label>Server Name</label>
<input
    type="text"
    class="form-control"
    [(ngModel)]="serverName">
<button class="btn btn-primary"
        [disabled]="!allowServer"
        (click)="onCreateServer()">Add Server</button>
<p *ngIf="serverCreated">Server was created, server name is {{serverName}}</p>
<app-server></app-server>
<app-server></app-server>
```
在 Template 主要多了 `<p>` 標籤內的 `*ngIf`，`*ngIf` 前面帶有星號，代表它是結構型指令。等號右邊會放 boolean 值 ( 非 boolean 則強轉為 boolean )，決定是否呈現此元素。當結果為 true 時，Angular 會重新渲染 Template。

如果打開開發人員工具，會發現 `*ngIf` 所做的事情是把元素移除掉而不是把元素隱藏，移除掉的位置可以看到 Angular 有留下註解，原因是移除元素會讓 Angular 需要監聽的元素變得比較少，也就較沒有負擔。
![](/images/ngif_html.png)

> _✭參考：見底下連結_

<br/>

2. `servers.component.ts`
```ts
export class ServersComponent implements OnInit {
    allowServer = false;
    serverCreationStatus = 'No server was created!';
    serverName = '';
    serverCreated = false;

    constructor() {
        setTimeout(() => { // 20秒過後改變按鈕狀態
            this.allowServer = true;
        }, 2000);
    }

    ngOnInit(): void {
    }

    onCreateServer() {
        this.serverCreated = true;
        this.serverCreationStatus = 'Server was created! Name is ' + this.serverName;
    }

    onUpdateServerName(event: Event) {
        this.serverName = (event.target as HTMLInputElement).value;
    }
}
```
TypeScript 的部分則在 `onCreateServer()` 函式被呼叫後改變 serverCreated 的狀態，按下按鍵後 `<p>` 元素會被顯示。


--- 

## NgIf with else
```
|--app
    |--app.component.html
    |--app.module.ts 
    |--servers
        |--servers.component.css
        |--servers.component.html // 更改
        |--servers.component.ts
```

1. `servers.component.html`
```html
<label>Server Name</label>
<input
    type="text"
    class="form-control"
    [(ngModel)]="serverName">
<button class="btn btn-primary"
        [disabled]="!allowServer"
        (click)="onCreateServer()">Add Server</button>
<p *ngIf="serverCreated; else noServer">Server was created, server name is {{serverName}}</p>
<ng-template #noServer>
    <p>No server was created!</p>
</ng-template>

<app-server></app-server>
<app-server></app-server>
```
若想要類似 else 的功能，加上 `<ng-template>` 並在後面補上 `#noServer`，當 `*ngIf` 判斷為 false 時，就會執行 `else` 後面的述句，將畫面抽換成被 `<ng-template>` 包住的範本內容，不寫 `else` 的話預設是空白範本。
![](/images/4-2.png)

> 稱呼上 # 會稱作 Template Reference Variable。

---

## ngFor

```
|--app
    |--app.component.html
    |--app.module.ts 
    |--servers
        |--servers.component.css
        |--servers.component.html
        |--servers.component.ts
    |--server
        |--server.component.css
        |--server.component.html // 更改
        |--server.component.ts // 更改
```

1. `server.component.html`
```html
<label>Server Name</label>
<input
    type="text"
    class="form-control"
    [(ngModel)]="serverName">
<button class="btn btn-primary"
        [disabled]="!allowServer"
        (click)="onCreateServer()">Add Server</button>
<p *ngIf="serverCreated; else noServer">Server was created, server name is {{serverName}}</p>
<ng-template #noServer>
    <p>No server was created!</p>
</ng-template>

<app-server *ngFor="let server of servers"></app-server>
```
這邊在 `<app-server>` 上使用 `*ngFor`，來迭代並長出多個 app-server Component。servers 是 TypeScript 的陣列，`let` 之後的 server 則是代表每一圈迭代的物件，使用上與 Java 的 `<c:forEach>` 有點相似。

`*ngFor` 中有4種預設屬性可以被使用：
  1. `index: number`：代表可迭代物件索引
  2. `count: number`：代表可迭代物件的長度
  3. `first: boolean`、`last: boolean`
  4. `even: boolean`、`odd: boolean`

如果想要使用陣列索引來迭代，可以這樣寫：
```html
<app-server *ngFor="let i of servers; let i=index"></app-server>
```
但如果`index`被覆蓋掉，例如：`let index = i;`，就沒有辦法再使用該屬性。
<br/>

2. `server.component.ts`
```ts
export class ServersComponent implements OnInit {
  allowServer = false;
  serverCreationStatus = 'No server was created!';
  serverName = '';
  serverCreated = false;
  servers = ['Testserver', 'Testserver 2']

  constructor() {
    setTimeout(() => {
      this.allowServer = true;
    }, 2000);
  }

  ngOnInit(): void {
  }

  onCreateServer() {
    this.serverCreated = true;
    this.servers.push(this.serverName);
    this.serverCreationStatus = 'Server was created! Name is ' + this.serverName;
  }

  onUpdateServerName(event: Event) {
    this.serverName = (event.target as HTMLInputElement).value;
  }
}
```
<br/>

> 參考
* ✭：參考連結
[神的 github](https://github.com/we-jia/Angular-LearningNote/blob/main/6.%20Directive.md)

* [NgIf](https://angular.tw/api/common/NgIf)