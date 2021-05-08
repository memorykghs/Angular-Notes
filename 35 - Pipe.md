# Angular - 35 - Pipe
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
  |--main.component.ts // 更改
  |--pipe
        |--shorten.pipe.ts  // 更改
```

1. `shorten.pipe.ts`
2. `main.component.ts`

## 在 ts 中使用 Pipe 格式化
有些時候也許並不是透過 Interpolation Binding 將資料呈現在畫面上的，那麼就必須在 ts 將資料處理完。假設現在我們需要在

> 參考
* [神的 github](https://github.com/we-jia/Angular-LearningNote/blob/main/12.%20Pipe.md)