# Angular - 20 - FormGroup
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

> #### 補充
* [FormGroup API](https://angular.tw/api/forms/FormGroup#description)
* [FormControlName如何對應到FormControl實體](https://medium.com/@yingpinglin/ag-how-to-know-formcontrol-503ff0798e80)