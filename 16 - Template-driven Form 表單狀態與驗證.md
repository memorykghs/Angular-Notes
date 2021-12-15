# Angular - 16 - Template-driven Form 表單狀態與驗證
前一章在特定欄位上加上 `ngModel` 進行監控、這些 `ngModel` 會被 `ngForm` 管理，然後送出表單之後使用 `console.log()` 將 `ngForm` 物件在開發者工具中印出，裡面帶有許多資訊：
![](/images/16-1.png)

`contorls` 屬性會返回此組中控制元件的對映表；`control` 則代表內部 FormGroup 實例。所以想要觀察 `ngForm` 內部管理的 `ngModel`，會點開 `ngForm` 的 `controls` 屬性觀察。

屬性 | 型別 | 說明
:---: | :---: | :---
`control` | FormGroup | 內部 FormGroup 實例 ( The internal FormGroup instance. )
`controls` | { [key: string]: AbstractControl } | 返回此組中控制元件的對映表 ( Returns a map of the controls in this group. )

除了打開來查看監控欄位資料的屬性 `controls`，
還有幾個狀態描述屬性，例如 `dirty`、`touched`、`valid` 等等。`ngForm` 本身就有一些代表狀態的屬性可以使用，而這些屬性是繼承自 `AbstractControlDirective` 這個類別的。
```
ngForm ---繼承---> ControlContainer ---繼承---> AbstractControlDirective
```
最常用到的狀態有3組：

控制狀態選項 | CSS類別 | 反向CSS類別 | 欄位狀態說明
:--- |:---: |:---: |:---
Visted | `ng-touched` | `ng-untouched` | 欄位是否曾經被碰過
Changed | `ng-dirty`  | `ng-pristine` | 欄位值是否有改變過
Valid | `ng-valid` | `ng-invalid` | 是否有通過欄位驗證

`touched` 代表 Form 表單的 `ngModel` 是否已經有被觸碰過，就算不輸入值，只在 `<input>` 等欄位按下滑鼠之後移開，就視為被碰過了。`dirty` 代表 Form 表單的 `ngModel` 是否有被更改過，跟 `touched` 不一樣的是，要真正有輸入值才會變為 `dirty`；而 `valid` 則是有沒有通過驗證，只要有任何一個被 `ngForm` 管理的 `ngModel` 被觸碰、被更改、或者是驗證沒有通過，就會分別是 `true`、`true`、`false`。

用開發人員工具點開這些設定 `ngModel` 的元素，會看到這幾個 Angular 額外加上去的類別，這些類別跟 `ngForm` 上面的 `dirty`、`touched`、`valid` 是完全對應到的，只是 `ngForm` 是對應到整個表單，而用開發人員工具看到的則是單一元素。

下面這個範例在點選 Username 欄位之前狀態是 `ng-pristine`、`ng-invalid`。
![](/images/16-2.png)

點選之後該欄位的狀態會被變更為 `ng-dirty`、`ng-valid`
![](/images/16-3.png)

如果是要針對必填欄位加上監控的話，只需要在元素上解上 `required` 即可。
```html
<input type="number" required/>
```

## Form 表單驗證與錯誤訊息
除了前面提到的一些狀態，我們還可以在欄位上使用 HTML 原生的驗證功能如 `required` 跟 `email`：`<input type="email" ngModel required email>`。
```
|--app
    |--app.component.html // 更改
    |--app.module.ts
    |--servers
    |--server
```
```html
<div class="container">
  <div class="row">
    <div class="col-xs-12 col-sm-10 col-md-8 col-sm-offset-1 col-md-offset-2">
      <form (ngSubmit)="onSubmit()" #form="ngForm">
        <div id="user-data">
          <div class="form-group">
            <label for="username">Username</label>
            <input type="text"
                    id="username"
                    class="form-control"
                    name="username"
                    ngModel
                    required>
          </div>
          <button class="btn btn-default" type="button">Suggest an Username</button>
          <div class="form-group">
            <label for="email">Mail</label>
            <input type="email"
                    id="email"
                    class="form-control"
                    name="email"
                    ngModel
                    required
                    email>
          </div>
        </div>
        <div class="form-group">
          <label for="secret">Secret Questions</label>
          <select id="secret"
                  class="form-control"
                  name="secret"
                  ngModel>
            <option value="pet">Your first Pet?</option>
            <option value="teacher">Your first teacher?</option>
          </select>
        </div>
        <button class="btn btn-primary" type="submit">Submit</button>
      </form>
    </div>
  </div>
</div>
```
除了這些，還有[其他基本驗證功能](https://angular.tw/api/forms/Validators)可以使用。

接下來在前端要怎麼判斷檢核是不是通過以及顯示錯誤訊息呢?因為 Template-driven Form 所有的檢核控制項都是寫在 HTML，檢核結果的判斷自然也是放在 Template 中的。
```html
<div class="container">
  <div class="row">
    <div class="col-xs-12 col-sm-10 col-md-8 col-sm-offset-1 col-md-offset-2">
      <form (ngSubmit)="onSubmit()" #form="ngForm">
        <div id="user-data">
          <div class="form-group">
            <label for="username">Username</label>
            <input type="text"
                    id="username"
                    class="form-control"
                    name="username"
                    ngModel
                    required>
          </div>
          <button class="btn btn-default" type="button">Suggest an Username</button>
          <div class="form-group">
            <label for="email">Mail</label>
            <input type="email"
                    id="email"
                    class="form-control"
                    name="email"
                    ngModel
                    required
                    email
                    #email="ngModel">
            <span class="help-block" *ngIf="email.invalid && email.touched">Please enter a valid email!</span>
          </div>
        </div>
        <div class="form-group">
          <label for="secret">Secret Questions</label>
          <select id="secret"
                  class="form-control"
                  name="secret"
                  ngModel>
            <option value="pet">Your first Pet?</option>
            <option value="teacher">Your first teacher?</option>
          </select>
        </div>
        <button class="btn btn-primary" type="submit" [disabled]="form.invalid">Submit</button>
      </form>
    </div>
  </div>
</div>
```
這裡主要用範本參考變數綁定 整個 `ngForm` 物件，再來在 `button>` 上使用 `*ngIf` 以及 Property Binding `[disabled]` 來決定按鈕是不是 disabled。只要整個 Form 表單其中一項驗證沒有過，那麼 `ngForm` 狀態就會是 invalid，按鈕也就不能按。`<span>` 上的 `*ngIf` 則是綁定到 `ngModel` 上，只要 `ngModel` 為 invalid 就呈現錯誤訊息。

## 使用 `@ViewChild` 來監控 ngForm
Form 表單中，除了使用範本參考變數設定 Reference 進行監控，另外一種方法是在 TypeScript 使用 `@ViewChild` 來進行。

`@ViewChild` 是一個屬性裝飾器，變更檢測器會在監控的 DOM 中查詢能匹配上該選擇器的第一個元素或指令。 如果檢視的 DOM 發生了變化，出現了匹配該選擇器的新的子節點，該屬性就會被更新。

```
|--app
    |--app.component.html // 更改
    |--app.module.ts // 更改
    |--servers
    |--server
```

1. `app.component.html`
```html
<div class="container">
  <div class="row">
    <div class="col-xs-12 col-sm-10 col-md-8 col-sm-offset-1 col-md-offset-2">
      <form (ngSubmit)="onSubmit()" #form="ngForm">
        <div id="user-data">
          <div class="form-group">
            <label for="username">Username</label>
            <input type="text"
                    id="username"
                    class="form-control"
                    name="username"
                    ngModel
                    required>
          </div>
          <button class="btn btn-default" type="button">Suggest an Username</button>
          <div class="form-group">
            <label for="email">Mail</label>
            <input type="email"
                    id="email"
                    class="form-control"
                    name="email"
                    ngModel
                    required
                    email>
          </div>
        </div>
        <div class="form-group">
          <label for="secret">Secret Questions</label>
          <select id="secret"
                  class="form-control"
                  name="secret"
                  ngModel>
            <option value="pet">Your first Pet?</option>
            <option value="teacher">Your first teacher?</option>
          </select>
        </div>
        <button class="btn btn-primary" type="submit">Submit</button>
      </form>
    </div>
  </div>
</div>
```

2. `app.component.ts`
```ts
export class AppComponent {
  @ViewChild('form', {static: false}) signupForm: NgForm;

  suggestUserName() {
    const suggestedName = 'Superuser';
  }

  onSubmit() {
    console.log(this.signupForm);
  }
}
```
`@ViewChild` Directive 傳入兩個參數，第一個是指定 `selector`，也就是要觀察的元素，這邊在 `<form>` tag 上綁定模板語法，所以傳進來的是整個 Form 表單物件。`static` 則是設定要在元素變更前解析或是變更後解析，如果為 `true`，則在變更檢測執行之前解析查詢結果，如果為 `false`，則在變更檢測之後解析；預設為 `false`。

這邊列出了可以當成 `selector` 被傳入的選項，詳細可以參考官方網站：
1. 任何帶有 `@Component` 或 `@Directive` 裝飾器的類別。
2. 字串形式的範本參考變數（比如可以使用 @ViewChild('cmp') 來查詢 `<my-component #cmp></my-component>`。
3. 元件樹中任何當前元件的子元件所定義的提供者（ Ex： `@ViewChild(SomeService) someService: SomeService` ）
4. TemplateRef（ 比如可以用 `@ViewChild(TemplateRef) template;` 來查詢 `<ng-template></ng-template>`）
<br/>

> 補充
* ✭：參考連結
[神的 github](https://github.com/we-jia/Angular-LearningNote/blob/main/10.%20Template-Driven%20Form.md)
* https://angular.tw/api/forms/NgForm