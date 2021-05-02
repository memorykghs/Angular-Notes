# Angular - 20 - 自定義檢核
## 自定義同步檢核
除了 Validators 提供的原生的基本檢核，我們也可以在表單控制元件中加入自訂的檢核。自訂檢核說白了就是一組自帶有自己檢核邏輯的 function，這個 function 最終會被 Angular 執行。
```
|--app
    |--app.component.html // 更改
    |--app.component.ts // 更改
    |--app.component.css
```

1. `app.component.html`
```html
<div class="container">
  <div class="row">
    <div class="col-xs-12 col-sm-10 col-md-8 col-sm-offset-1 col-md-offset-2">
      <form [formGroup]="signupForm" (ngSubmit)="onSubmit()">
        <div formGroupName="userdata">
          <div class="form-group">
            <label for="username">Username</label>
            <input
              type="text"
              id="username"
              class="form-control"
              formControlName="username">
            <span
              *ngIf="signupForm.get('userdata.username').invalid && signupForm.get('userdata.username').touched"
              class="help-block">
              <span *ngIf="signupForm.get('userdata.username').errors['nameIsForbidden']">This name is invalid!</span><!-- 自定義檢核前端驗證 -->
              <span *ngIf="signupForm.get('userdata.username').errors['required']">This field is required!</span>
            </span>
          </div>
          <div class="form-group">
            <label for="email">email</label>
            <input
              type="text"
              id="email"
              class="form-control"
              formControlName="email">
            <span
              *ngIf="signupForm.get('userdata.email').invalid && signupForm.get('userdata.email').touched"
              class="help-block">Please enter a valid email!</span>
          </div>
        </div>
        <div class="radio" *ngFor="let gender of genders">
          <label>
            <input
              type="radio"
              [value]="gender"
              formControlName="gender">{{ gender }}
          </label>
        </div>
        <div formArrayName="hobbies">
          <h4>Your hobbies</h4>
          <button type="button"
                  class="btn btn-default"
                  (click)="onAddHobby()">Add hobby</button>
          <div class="form-group"
                *ngFor="let hobbyControl of hobbies; let i = index">
            <input type="text" class="form-control" [formControlName]="i">
          </div>
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
  forbiddenUserNames = ['Chris', 'Anna'];

  ngOnInit(): void {
    this.signupForm = new FormGroup({
      userdata: new FormGroup({
        username: new FormControl(null, [Validators.required, this.forbiddenNames.bind(this)]),
        email: new FormControl(null, [Validators.required, Validators.email])
      }),
      gender: new FormControl('female'),
      hobbies: new FormArray([])
    });
  }

  get hobbies() {
    return (this.signupForm.get('hobbies') as FormArray).controls;
  }

  onSubmit() {
    console.log(this.signupForm)
  }

  onAddHobby() {
    const control = new FormControl(null, Validators.required);
    (this.signupForm.get('hobbies') as FormArray).push(control);
  }

  forbiddenNames(control: FormControl): {[s: string]: boolean} {
    if(this.forbiddenUserNames.indexOf(control.value) !== -1){
      return {
        nameIsForbidden: true
      };
    }
    return null;
  }
}
```
我們在 ts 檔中定義了一個新的方法，該方法會傳入一組 FormControl 物件，這個物件就是我們想要驗證的欄位的表單控制元件。

在 TypeScript 中定義了一個新 method，參數上放入 FormControl 物件，代表想要進行驗證的物件，回傳則定義了一組物件，key 定義為 string、value 定義為 boolean，如果驗證失敗就回傳此物件，成功時則回傳 null ( 不是把 true 更改成 false，這個物件是驗證失敗時傳遞給外部的訊息，null 才是驗證成功， )。接著在上方的 signupForm 補上自己定義好的方法，並且使用 bind(..) 明確綁定當下的 this 為何。在 Template 中則是新增幾個 <span> 來代表驗證失敗時應該要呈現的訊息。

## FormGroup
* 用於追蹤一個表單控制元件組的值和狀態。
* 相較於

* 需要在 `create-stock.component.ts` 檔 import 要使用的類別：
  ```ts
  import { FormControl, FormGroup } from '@angular/forms';
  ```
<br/>

* `FormGroup`可以傳入子`FormControl`並包裝成一個物件。
也就是說當實例化 `FormGroup` 時，必須在第一個引數中傳入一組子控制元件，這裡以傳入 `FormControl` 物件為主，所以 `FormControl` 類別也需要import。
  <br/>

  * `FormGroup` 的建構式：
  
    ```ts
    constructor(controls: { [key: string]: AbstractControl; }, validatorOrOpts?: ValidatorFn | AbstractControlOptions | ValidatorFn[], asyncValidator?: AsyncValidatorFn | AsyncValidatorFn[])
    ```
    名稱  | 型別  | 說明
    :---  |:---  |:---
    `control`|object |可以傳入任何一種繼承`AbstractControl`實例物件，這邊傳入`FormControl`。<br/> ▶ `key`：是每個控制元件的名字，也就是在template中被包在`[FormGroup]`內的子結點的`formControlName`屬性。
    `validatorOrOpts`|ValidatorFn<br/>AbstractControlOptions<br/>ValidatorFn[ ] |一個驗證函式或其陣列，通常傳入驗證規則的function。<br/>可以不傳(預設值是 undefined)。
  其他的傳入參數在這邊暫時不講。
<br/>

* 如果組中的任何一個控制元件是無效的，那麼整個組就是無效的。
<br/>

#### 方法(部分)
1. `setValue()`：設定此 `FormGroup` 的值。
2. `patchValue()`：修補此 `FormGroup` 的值。它接受一個以控制元件名為 key 的物件，並儘量把它們的值匹配到組中正確的控制元件上。
3. `reset()`：重置這個 `FormGroup`，把它的各級子控制元件都標記為 `pristine` 和 `untouched`，並把它們的值都設定為 `null`。

#### 改動的檔案：
1. `create-stock.component.html`
要讓`FormControl`在後端ts檔接值，在template中就須要在要檢核的tag上定義 `[formControlnnName]` 屬性。
```html
<h2>Create Stock Form</h2>

<div class="form-group">
    <form [formGroup]="stockForm" (ngSubmit)="onSubmit()"> <!-- 改動的行數 -->
    <!-- 改動的區塊 -->
    <div class="stock-name">
        <input type="text"
             placeholder="Stock Name"
             name="stockName"
             formControlName="name">
    </div>
    <!-- 改動的區塊 -->
    <div class="stock-code">
        <input type="text"
               placeholder="Stock Code"
               formControlName="code">
    </div>
    <!-- 改動的區塊 -->
    <div class="stock-price">
        <input type="number"
               placeholder="Stock Price"
               formControlName="price">
    </div>
    <button type="submit">Submit</button>
  </form>
</div>

<p>Form Control value: {{ stockForm.value | json }}</p>
<p>Form Control status: {{ stockForm.status | json }}</p>
```
<br/>

2. `create-stock.component.ts`
```ts
...
...
export class CreateStockComponent implements OnInit {

  // 改動的區塊
  public stockForm: FormGroup = new FormGroup({
    name: new FormControl(null, Validators.required), // 初始值、檢核rule
    code: new FormControl(null, [Validators.required, Validators.minLength(2)]),
    price: new FormControl(0, [Validators.required, Validators.min(0)])
  }); 

  constructor() {}

  ngOnInit(): void { }

  onSubmit() {
    console.log('Name Control Value', this.stockForm.value); 
  }
}
```
<br/>

> #### 小結
* 使用 `FormControl` 時需要在 template 加入 `[formControl]` 屬性；使用 `FormGroup` 則需要在 template 中加入 `[formContorlName]` (因為可以將多組`FormControl` 傳入 `FormGroup`，合理推斷每一個tag都需要相對應的 `[formContorlName]`)。
<br/>

## 非同步自訂檢核
```ts
ngOnInit(): void {
  this.signupForm = new FormGroup({
    userdata: new FormGroup({
      username: new FormControl(null, [Validators.required, this.forbiddenNames.bind(this)]),
      email: new FormControl(null, [Validators.required, Validators.email], this.forbiddenEmails)
    }), // 第三個參數是非同步的檢核
    gender: new FormControl('female'),
    hobbies: new FormArray([])
  });
}
```

> #### 補充
* [FormGroup API](https://angular.tw/api/forms/FormGroup#description)
* [FormControlName如何對應到FormControl實體](https://medium.com/@yingpinglin/ag-how-to-know-formcontrol-503ff0798e80)