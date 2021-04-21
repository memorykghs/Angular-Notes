# Angular - 18 - ReactiveForm
## Reactive Form 響應式表單
Templage-driven Form 是驗證控制寫在 Template，而 Reactive Form 則是將驗證表單的部分放在邏輯層 TypeScript，我們會在元件的 ts 檔定義表單模型，以模型處理表單輸入。通常在建立較為複雜的表單會使用 Reactive Form 來進行驗證，原因是因為當邏輯複雜時，Template-driven Form 的功能很難去處理；另一個則是 Reactive Form 會將檢和邏輯全部放在邏輯層，不會參雜在 Template，因此相對也較好維護。

使用 Reactive Form 相關功能之前，要在 `app.modules.ts` 中 import `ReactiveFormsModule`。
```
import { ReactiveFormsModule } from '@angular/forms';
```

#### Reactive Form 架構與基礎類別
Reactive Form 中最常見的表單控制元件有4個：

元件名稱 | 說明 |
| --- | --- |
`AbstractControl` | 表單控制元件的抽象類別，定義共用的屬性與方法表單控制元件。( `FormControl`、`FormGroup` 及 `FormArray` 都繼承這個抽象類別 )。它提供了他們的通用行為以及屬性，例如observable。
`FormControl` | 管理單個表單元件的值與狀態驗證。
`FormGroup` | 管理一組表單控制元件，包含所有子控制項和子群組，欄位之間沒有順序性。例如一個 Form 表單就是一個 `FormGroup`，每一個欄位由一個 `FormControl` 物件驗證。
`FormArray` | 管理一組表單控制元件，包含所有子控制項和子群組，以**陣列**方式集合，欄位之間索引值為數值。

其中 `FormGroup` 及 `FormArray` 下都可以包含其他控制元件，可以是 `FormControl`、`FormGroup` 或兩者的實例，整體架構如下：
![](/images/18-1.png)

後面還會提到另外一個服務 `FormBuilder`，目的是用來快速建立表單控制元件。
<br/>

#### 建立表單控制元件
假設我們現在有一個使用者註冊的表單，表單中有 username、email 及 sex 欄位，其中 sex 欄位是 radio button，Template 架構如下：
```html
<div class="container">
  <div class="row">
    <div class="col-xs-12 col-sm-10 col-md-8 col-sm-offset-1 col-md-offset-2">
      <form [formGroup]="signupForm" (ngSubmit)="onSubmit()">
        <div class="form-group">
          <label for="username">Username</label>
          <input
            type="text"
            id="username"
            class="form-control">
        </div>
        <div class="form-group">
          <label for="email">email</label>
          <input
            type="text"
            id="email"
            class="form-control">
        </div>
        <div class="radio" *ngFor="let gender of genders">
          <label>
            <input
              type="radio"
              [value]="gender">{{ gender }}
          </label>
        </div>
        <button class="btn btn-primary" type="submit">Submit</button>
      </form>
    </div>
  </div>
</div>
```

接下來我們要在 TypeScripe 建立表單控制元件。要建立表單控制元件的話，需要使用 `new` 關鍵字建立 `FormGroup` 類別實體，並往裡面塞各種實作 `AbstractControl` 介面的類別 ( 包含 `FormGroup`、`FormArray` 或是 `FormControl` )，這裡使用的是一個 `FormGroup`，裡面包含3個控制元件 `FormControl`。

```ts
export class AppComponent implements OnInit{
  genders = ['male', 'female'];
  signupForm: FormGroup;

  ngOnInit(): void {
    this.signupForm = new FormGroup({
      username: new FormControl(),
      email: new FormControl(),
      gender: new FormControl()
    });
  }

  onSubmit() {
    console.log(this.signupForm)
  }
}
```
在元件初始化的時候就建立表單控制元件進行監測，`FormGroup()` 中傳入了一個物件，物件中初始化三個檢核欄位的控制元件 `FormControl`。前面有提到所有的驗證功能與檢核都撰寫在邏輯層，建立完表單控制元件之後要將他們綁定到相對應的 Template 元件上。目前的 ts 的架構像是下面這樣：
![](/images/18-2.png)

在 Template 中，由於 ts 是註冊 `FormControl`，所以要在被監控的 tag 上綁定 `formControlName`，等號後面的 `value` 要跟 ts 檔中的 `key` 值一樣。
```html
<div class="container">
  <div class="row">
    <div class="col-xs-12 col-sm-10 col-md-8 col-sm-offset-1 col-md-offset-2">
      <form [formGroup]="signupForm" (ngSubmit)="onSubmit()">
        <div class="form-group">
          <label for="username">Username</label>
          <input
            type="text"
            id="username"
            class="form-control"
            formControlName="username" /> <!-- 新增FormControlName -->
        </div>
        <div class="form-group">
          <label for="email">email</label>
          <input
            type="text"
            id="email"
            class="form-control"
            formControlName="email" /> <!-- 新增FormControlName -->
        </div>
        <div class="radio" *ngFor="let gender of genders">
          <label>
            <input
              type="radio"
              [value]="gender" 
              formControlName="gender"/>{{ gender }} <!-- 新增FormControlName -->
          </label>
        </div>
        <button class="btn btn-primary" type="submit">Submit</button>
      </form>
    </div>
  </div>
</div>
```
以上面的例子來說，架構會長的像下面這樣：
![](/images/18-3.png)

如果 ts 想綁定的表單控制元件不一樣，那麼 Template 要用的也不一樣。一個表單可以很複雜，可能有 `FormGroup` 包 `FormArray` 或反過來，只有 `FormControl` 底下不能再包其他的控制元件。
![](/images/18-4.png)

控制元件 | 為最外層控制元件 | 非最外層控制元件
--- | --- | --- |
`FormArray` | `[formArray]` | `FormArrayName`
`FormGroup` | `[formGroup]` | `FormGroupName`
`FormArray` | none | `FormControlName`

## 簡易表單驗證
上面的例子只是簡單地去建立表單控制元件，一個表單要怎麼去做到驗證或顯示表單整體狀態呢?Reactive Form 包含了一組內建的常用驗證器函式 `Validators`，這些函式可以被註冊在控制元件內，用以驗證並根據驗證結果回傳一個錯誤物件或是空值。在使用驗證器函式時，需要先 import `Validators`：
```
import { Validators } from '@angular/forms';
```

現在回頭來看 `FormControl` 這個物件的建構式，看看要怎麼去設定欄位的檢核邏輯。
```ts
  ngOnInit(): void {
    this.signupForm = new FormGroup({
      username: new FormControl(null, Validators.required),
      email: new FormControl(null, [Validators.required, Validators.email]),
      gender: new FormControl('female')
    });
  }
```

username 的 `FormControl` 傳入兩個參數，第一個是這個欄位的預設值，第二個則是檢核的邏輯；當欄位有多組檢核邏輯時，可以用陣列將所有驗證函式包起來，就像 email 這個 `FormControl` 內設定的一樣。其實還可以傳入第三個參數，第三個是非同步驗證器。同步與非同步的差異，目前只要先當作是觸發前就檢核該欄位是同步，非同步則是可以等事件觸發後再對欄位進行驗證。
```ts
class FormControl extends AbstractControl {
  constructor(formState: any = null, validatorOrOpts?: ValidatorFn | AbstractControlOptions | ValidatorFn[], asyncValidator?: AsyncValidatorFn | AsyncValidatorFn[])
```

我們來完整的將檢核建立起來並嘗試看看是否有用。
```
|--app
    |--app.component.html // 更改
    |--app.component.ts // 更改
    |--app.component.css // 更改
    |--app.module.ts
    |--servers
    |--server
```

1. `app.component.html`
```html
<div class="container">
  <div class="row">
    <div class="col-xs-12 col-sm-10 col-md-8 col-sm-offset-1 col-md-offset-2">
      <form [formGroup]="signupForm" (ngSubmit)="onSubmit()">
        <div class="form-group">
          <label for="username">Username</label>
          <input
            type="text"
            id="username"
            class="form-control"
            formControlName="username">
          <span
            *ngIf="signupForm.get('username').invalid && signupForm.get('username').touched"
            class="help-block">Please enter a valid username!</span>
        </div>
        <div class="form-group">
          <label for="email">email</label>
          <input
            type="text"
            id="email"
            class="form-control"
            formControlName="email">
          <span
            *ngIf="signupForm.get('email').invalid && signupForm.get('email').touched"
            class="help-block">Please enter a valid email!</span>
        </div>
        <div class="radio" *ngFor="let gender of genders">
          <label>
            <input
              type="radio"
              [value]="gender"
              formControlName="gender">{{ gender }}
          </label>
        </div>
        <span *ngIf="signupForm.invalid && signupForm.touched"
              class="help-block">Please enter a valid data!</span>
        <button class="btn btn-primary" type="submit">Submit</button>
      </form>
    </div>
  </div>
</div>
```
<br/>

2. `app.component.ts`
```ts
export class AppComponent implements OnInit{
  genders = ['male', 'female'];
  signupForm: FormGroup;

  ngOnInit(): void {
    this.signupForm = new FormGroup({
      username: new FormControl(null, Validators.required),
      email: new FormControl(null, [Validators.required, Validators.email]),
      gender: new FormControl('female')
    });
  }

  onSubmit() {
    console.log(this.signupForm)
  }
}
```
<br/>

3. `app.component.css`
```css
.container {
  margin-top: 30px;
}

input.ng-invalid.ng-touched {
  border: 1px solid red;
}
```

> 小結
* Template-driven Form 與 Reactive Form 比較

動作 | Template-driven Form | Reactive Form
--- | --- | --- |
`@NgModule` 匯入 | `FormsModule` | `ReactiveFormsModule`
建立表單模型 | 由指令建立 | 在元件類別中建立 
資料模型 | 非結構化、可變 | 結構化、不可變
可預測性(✭) | 非同步 | 同步
表單驗證 | 指令 | 函式

> ✭：Reactive forms 與 Template-driven forms 最大的差異，同步與非同步：

Reactive Form 是同步的而 Template-driven forms 為非同步處理。
對 Reactive Form 來說，所有表單的資料是在程式碼裡以樹狀的方式來呈現，所以在任一個節點可以取得其他表單的資料，並即時同步被更新的。

Template-driven Form 在每一個表單元件各自透過 Directive 委派檢查的功能，為了避免檢查後修改而造成檢查失效的問題，Directive 會在更多的時後去檢查輸入的值的正確性，因此並沒有辦法立即的得到回應，而需要一小段的時間才有辦法得到使用者輸入的值是否合法的回應。

* 繼承 `AbstractControl` 的只有：
  1. `FormControl`
  2. `FormGroup`
  3. `FormArray`