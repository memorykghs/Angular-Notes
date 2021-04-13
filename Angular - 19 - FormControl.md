# Angular - 19 - FormControl
## FormControl
* 用於追蹤單個表單控制元件的值與驗證狀態。
* 在元件建立`FormControl`實例來監聽狀態。
* 使用時須import：`import { FormControl, FormGroup, Validators } from '@angular/forms'`。
  ```ts
  import { FormControl, FormGroup, Validators } from '@angular/forms';
  ...
  ...
  export class CreateStockComponent implements OnInit {

    public nameControl = new FormControl();
    ...
    ...
  }
  ```
<br/>

* `FormControl`可以傳入**初始值**、**想要檢核的rule**
  ```ts
  public nameControl = new FormControl({value: '88888', disabled: true}, Validators.required); 
  // 查 API 是否可以設定初始值狀態
  ```
  初始值可以日是 `null`，後面檢核是傳一個檢核的 function，自訂檢核可以用陣列包起來傳入多個檢核 function。
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
第一個 `username` 的 FormControl 物件內有2個參數，第一個是用來設定這個欄位的**初始值**，第二個則是檢核的邏輯。跟 Template-driven Form 不一樣的是，檢核欄位為必填，只要將 `required` 檢核邏輯定義在 FromControl 物件中，就不需要在 Template 中加上 `required` 了。再來，如果想要有多組的檢核邏輯，要用 `[]` 將檢核邏輯包起來，除了 Validator 預設的一些檢核狀態，也可以自行定義。而最後一個 `gender` 因為是 radio button，不需要檢核而是預設值，就只有設定 `female` 這個值進去。
  
回頭看到 FormControl 物件的部分，到底可以傳什麼東西進去呢?我們來看一下 [`FormControl`](https://angular.tw/api/forms/FormControl) 的建構式：
```ts
constructor(formState?: any, validatorOrOpts?: ValidatorFn | ValidatorFn[] | AbstractControlOptions | null, asyncValidator?: AsyncValidatorFn | AsyncValidatorFn[] | null);
```
可以看到建構式 `constructor` 中第一個是 any，代表初始值可以傳入任何型別的值。第二個參數 `validatorOrOpts?` 後面有問號，代表這個參數可寫可不寫，不需要檢核可以不傳參數進去。最後一個 `asyncValidator?` 下面會再提到，這個主要是用來設定檢核是不是要同步被觸發，`true` 的話就會等資料都回來了才進行檢核。
<br/>

* 可用方法：
1. `value`：在template使用可獲得當前值
  ```html
  <div>{{ name.value }}</div>
  ```
2. `setValue`：可在ts檔設定表單控制元件的值
<br/>

#### 改動的檔案：
1. `create-stock.component.html`
要讓`FormControl`在後端ts檔接值，在template中就須要在要檢核的tag上定義`[formControl]`屬性。
```html
<h2>Create Stock Form</h2>

<div class="form-group">

    <div class="stock-name">
        <!-- [formControl]屬性是ReactiveForm的 -->
        <input type="text"
             placeholder="Stock Name"
             name="stockName"
             [formControl]="nameControl"> 
    </div>
    <button (click)="onSubmit()">Submit</button>
</div>

<p>Form Control value: {{ nameControl.value | json }}</p>
<p>Form Control status: {{ nameControl.status | json }}</p>
```
<br/>

2. `create-stock.component.ts`
```ts
import { FormControl } from '@angular/forms'; // 改動的行數
...
...
export class CreateStockComponent implements OnInit {

  public nameControl = new FormControl(); // 改動的行數
  constructor() {} // 改動的行數

  onSubmit() {
    console.log('Name Control Value', this.nameControl.value);
  }
}
```
<br/>

<img src="/img/ng_formControl_1.png">
<img src="/img/ng_formControl_2.png">
這樣在畫面上輸入字串，在ts中就可以拿到template傳過來的值。
```ts
this.nameControl.value
```

`this`代表的是`CreateStockComponent`自己本身這個物件，所以`this.nameControl`會拿到`FormControl`物件。

那`this.nameControl`會拿到什麼呢?
還記得在template寫了什麼嗎?
```html
<input type="text"
             placeholder="Stock Name"
             name="stockName"
             [formControl]="nameControl">
```
所以`this.nameControl`得到的是一個`FormControl`物件，這個物件裡面有`value`屬性，代表這個tag的`value`值。
<br/>

> 小結
* 因為Reactive Form，所以所有的控制基本上會寫在ts檔中，template中也就不再需要使用`ngModel`、`ngModelGroup`，而是透過`ReativeForm`物件的property控制。
<br/>

* 對應的方式是在template的tag上註冊`formControl`屬性
相較於原本最一開始用的form submit中，所有要被接到的欄位都需要有name屬性。
使用`FormControl`時，由於傳給`ngForm`這個module的物件直接是在ts檔定義好的屬性`public stockForm: FormControl`，所以不用傳統的name屬性也可以取到值。
