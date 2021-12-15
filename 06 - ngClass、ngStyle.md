# Angular - 6 - NgClass、NgStyle
## NgClass ( 屬性型 )
可以同時新增或刪除一個或多組 CSS 類別，在 TypeScript 會以 `true` 或 `false` 作為是否使用該 Class 的開關。

```
|--app
    |--app.component.html
    |--app.module.ts 
    |--servers
        |--server.component.css
        |--server.component.html // 更改
        |--server.component.ts // 更改
```

1. `server.component.html`
```html
<p [ngStyle]="{backgroundColor: getColor()}"
    [ngClass]="{online: serverStatus === 'online'}">{{'server'}} with ID {{serverId}} is {{getServerStatus()}}</p>
```
Tempalte 的部分會用 `[ngClass]` 來綁定，等號後面接的會是一個物件，物件內的 `key` 值都是一個 CSS Class 名稱，`value` 會是一個 boolean 值，用來決定要不要套用 CSS Class。想設定多組的話就在物件中新增新的鍵值對即可。最終要呈現的結果是 `"{online: true}"` 或是 `"{online: false}"`，true 的話就會套用 online 這個 CSS Class。。
<br/>

2. `server.component.ts`
```ts
@Component({
    selector: 'app-server',
    templateUrl: './server.component.html',
    styles: [`
        .online {
            color: white
        }
    `]
})

export class ServerComponent {
  serverId = 10;
  serverStatus = 'offline';

  constructor() {
    this.serverStatus = Math.random() > 0.5 ? 'online' : 'offline';
  }

  getServerStatus() {
    return this.serverStatus;
  }
}
```
CSS Class 的部分設定在 TypeScript 的 `@Component`，將原本的 stylesUrl 替換成 styles 就可用模板語法直接寫樣式。再進階一點，可以把原本寫在 Template 的物件內容抽到 `server.component.ts` 檔內做設定。

```
|--app
    |--app.component.html
    |--app.module.ts 
    |--servers
        |--server.component.css
        |--server.component.html // 更改
        |--server.component.ts // 更改
```

1. `server.component.html`
```html
<p [ngStyle]="{backgroundColor: getColor()}"
    [ngClass]="serverClasses">{{'server'}} with ID {{serverId}} is {{getServerStatus()}}</p>
```
<br/>

2. `server.component.ts`
```ts
@Component({
    selector: 'app-server',
    templateUrl: './server.component.html',
    styles: [`
        .online {
            color: white
        }
    `]
})

export class ServerComponent {
  serverId = 10;
  serverStatus = 'offline';
  serverClasses = {
    online: this.serverStatus === 'online'
  }

  constructor() {
    this.serverStatus = Math.random() > 0.5 ? 'online' : 'offline';
  }

  getServerStatus() {
    return this.serverStatus;
  }
}
```

---

## NgStyle ( 屬性型 )
可以根據元件的狀態同時動態設定多個內聯樣式 ( inline styles )。

```
|--app
    |--app.component.html
    |--app.module.ts 
    |--servers
        |--server.component.css
        |--server.component.html // 更改
        |--server.component.ts // 更改
```

1. `server.component.html`
```html
<p [ngStyle]="{backgroundColor: getColor()}">{{'server'}} with ID {{serverId}} is {{getServerStatus()}}</p>
```
<br/>

2. `server.component.ts`
```ts
export class ServerComponent {
  serverId = 10;
  serverStatus = 'offline';
  serverClasses = {
    online: this.serverStatus === 'online'
  }

  constructor() {
      this.serverStatus = Math.random() > 0.5 ? 'online' : 'offline';
  }

  getServerStatus() {
      return this.serverStatus;
  }

  getColor() {
      return this.serverStatus === 'online' ? 'green' : 'red';
  }
}    
```
這邊將狀態改變時要抽換的邏輯包裝成方法放在 TypeScript 的 `getColor()` 方法內。如果有多組樣式要設定，可以把放在 Template 的東西抽換成物件，將邏輯寫在 TypeScript 內。

```
|--app
    |--app.component.html
    |--app.module.ts 
    |--servers
        |--server.component.css
        |--server.component.html // 更改
        |--server.component.ts // 更改
```

1. `server.component.html`
```html
<p [ngStyle]="serverStyles">{{'server'}} with ID {{serverId}} is {{getServerStatus()}}</p>
```
<br/>

2. `server.component.ts`
```ts
export class ServerComponent {
  serverId = 10;
  serverStatus = 'offline';
  serverClasses = {
    online: this.serverStatus === 'online'
  }

  serverStyles = { // 更改
    backgroundColor: getColor(),
    border: '2px'
  }

  constructor() {
      this.serverStatus = Math.random() > 0.5 ? 'online' : 'offline';
  }

  getServerStatus() {
      return this.serverStatus;
  }

  getColor() {
      return this.serverStatus === 'online' ? 'green' : 'red';
  }
}    
```
<br/>

> 參考
* [ngClass API](https://angular.tw/api/common/NgClass)

* [ngStyle API](https://angular.tw/api/common/NgStyle)

* [NgStyle & NgClass](https://medium.com/allen%E7%9A%84%E6%8A%80%E8%A1%93%E7%AD%86%E8%A8%98/angular-ngstyle-ngclass-2560019a2c6c)
