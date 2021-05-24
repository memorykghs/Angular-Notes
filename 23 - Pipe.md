# Angular - 23 - Pipe
在 Angular 中，想要改變成現在畫面上的資料而不動到 ts 的原始資料時，可以在 Template 綁定 Interpolation Binding 同時透過管線操作 ( Pipe ) 來進行，像是將英文轉全部都大寫。<br/>
![](/images/35-1.png)

```
|--main
  |--main.component.html
  |--main.component.ts // 更改
```

1. `main.component.ts`
```ts
<div class="container">
  <div class="row">
    <div class="col-xs-12 col-sm-10 col-md-8 col-sm-offset-1 col-md-offset-2">
      <ul class="list-group">
        <li
          class="list-group-item"
          *ngFor="let server of servers"
          [ngClass]="getStatusClasses(server)">
          <span
            class="badge">
            {{ server.status }}
          </span>
          <strong>{{ server.name }}</strong> |
          {{ server.instanceType | uppercase }} |
          {{ server.started | date}}
        </li>
      </ul>
    </div>
  </div>
</div>
```

在 `{{}}` 中間出現 `|` ( OR運算子的其中一半 ) 代表我們要透過 Pipe 來改變資料格式，`|` 後面接的則是 Pipe 的運算符。除了將英文變成大小寫，也可以格式化日期，格式化的部分我們使用原本就定義好的 DatePipe 物件提供的操作符 `date` 來進行。

## 在 Pipe 中加入參數
像是日期的部分，我們也可以傳入參數定義想呈現的日期格式，傳入參數的方式就是在 Pipe 操作後以冒號 `:` 連接傳入參數，例如：`{{ place | date: 'yyyy-MM-dd' }}`。詳細內容可以參考官網 [DatePipe](https://angular.tw/api/common/DatePipe)。
```
|--main
  |--main.component.html
  |--main.component.ts // 更改
```

1. `main.component.ts`
```ts
<div class="container">
  <div class="row">
    <div class="col-xs-12 col-sm-10 col-md-8 col-sm-offset-1 col-md-offset-2">
      <ul class="list-group">
        <li
          class="list-group-item"
          *ngFor="let server of servers"
          [ngClass]="getStatusClasses(server)">
          <span
            class="badge">
            {{ server.status }}
          </span>
          <strong>{{ server.name }}</strong> |
          {{ server.instanceType | uppercase }} |
          {{ server.started | date: 'fullDate'}}
        </li>
      </ul>
    </div>
  </div>
</div>
```

## Multiple Pipe
在 Template 中我們也可以透過一系列的 Pipe 對資料進行格式化，多個 Pipe 的情況下，Angular 會由左而右進行解析，不過 Pipe 之間的順序極為重要，有時候可能因為 Pipe 的結果不同而出錯，例如下面這個例子將 `date` 及 `uppercase` 兩個 Pipe 的順序顛倒就會報錯，因為經過 `uppercase` 之後的結果型別是 String，但要輸入進 `date` Pipe 的型別必須是 Date。 
```
|--main
  |--main.component.html
  |--main.component.ts // 更改
```

1. `main.component.ts`
```ts
<div class="container">
  <div class="row">
    <div class="col-xs-12 col-sm-10 col-md-8 col-sm-offset-1 col-md-offset-2">
      <ul class="list-group">
        <li
          class="list-group-item"
          *ngFor="let server of servers"
          [ngClass]="getStatusClasses(server)">
          <span
            class="badge">
            {{ server.status }}
          </span>
          <strong>{{ server.name }}</strong> |
          {{ server.instanceType | uppercase }} |
          {{ server.started | date: 'fullDate' | uppercase}}
        </li>
      </ul>
    </div>
  </div>
</div>
```

## 客製化 Pipe
使用指令 `ng g p pipe/shorten --spec false` 產生客製化 Pipe 的檔案。
```
|--main
  |--main.component.html // 更改
  |--main.component.ts
|--pipe
  |--shorten.pipe.ts  // 更改
|--app.module.ts // 更改
```

1. `shorten.pipe.ts`
```ts
@Pipe({
  name: 'shorten'
})
export class ShortenPipe implements PipeTransform {
  transform(value: any) {
    if(value.length > 10) {
      return value.substr(0, 10) + '...';
    }
    return value;
  }
}
```
自定義的 Pipe 首先需要時做 PipeTransform 介面，Angular 預設會呼叫它的 `transform()` 方法，所以在建立自定義的 Pipe 時需要覆寫這個方法，寫下自訂的邏輯並返回結果即可。第一個傳入參數是要繫結的值，後面的參數則是依要不要做參數畫決定是否傳入。上面的 `@Pipe` 裡面是設定這個 Pipe 的名稱，在其他地方要使用時就必須依這個名稱呼叫。詳細可參考 [PipeTransform API](https://angular.tw/api/core/PipeTransform)。
<br/>

2. `main.component.ts`
```html
<div class="container">
  <div class="row">
    <div class="col-xs-12 col-sm-10 col-md-8 col-sm-offset-1 col-md-offset-2">
      <ul class="list-group">
        <li
          class="list-group-item"
          *ngFor="let server of servers"
          [ngClass]="getStatusClasses(server)">
          <span
            class="badge">
            {{ server.status }}
          </span>
          <strong>{{ server.name | shorten}}</strong> |
          {{ server.instanceType | uppercase }} |
          {{ server.started | date: 'fullDate' | uppercase}}
        </li>
      </ul>
    </div>
  </div>
</div>
```

3. `app.module.ts`
最後記得要 import ShortenPipe 即可。
```ts
@NgModule({
  declarations: [
    AppComponent,
    ShortenPipe
  ],
  imports: [],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
```

## 參數化客製 Pipe
想要像使用 DatePipe 一樣傳入參數指定日期格式的話也是可以的，接下來我們在自定義的 ShortenPipe 中多傳入一個參數 `limit` 來決定最多要顯示多少個字元。

```
|--main
  |--main.component.html // 更改
  |--main.component.ts
  |--pipe
        |--shorten.pipe.ts  // 更改
```

1. `shorten.pipe.ts`
```ts
@Pipe({
  name: 'shorten'
})
export class ShortenPipe implements PipeTransform {
  transform(value: any, limit: number) {
    if(value.length > limit) {
      return value.substr(0, limit) + '...';
    }
    return value;
  }
}
```
<br/>

2. `main.component.ts`
```html
<div class="container">
  <div class="row">
    <div class="col-xs-12 col-sm-10 col-md-8 col-sm-offset-1 col-md-offset-2">
      <ul class="list-group">
        <li
          class="list-group-item"
          *ngFor="let server of servers"
          [ngClass]="getStatusClasses(server)">
          <span
            class="badge">
            {{ server.status }}
          </span>
          <strong>{{ server.name | shorten: 5}}</strong> |
          {{ server.instanceType | uppercase }} |
          {{ server.started | date: 'fullDate' | uppercase}}
        </li>
      </ul>
    </div>
  </div>
</div>
```


## 在 ts 中使用 Pipe 格式化
有些時候也許並不是透過 Interpolation Binding 將資料呈現在畫面上的，那麼就必須在 ts 將資料處理完。假設現在我們需要在

> 參考
* [神的 github](https://github.com/we-jia/Angular-LearningNote/blob/main/12.%20Pipe.md)