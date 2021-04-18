# Angular - 21 - FormBuilder
## FormBuilder
#### 匯入 FormBuilder 類別
`FormBuilder` 是一個語法糖，用來簡化 `FormControl`、`FormGroup` 及 `FormArray` 實例的建立過程。如果 `app.module.ts` 沒有 import `ReactiveFormsModule` 的話要記得先加進去，再來在 ts 檔案中 import `FormBilder`。
```
import { FormBuilder } from '@angular/forms';
```
<br/>

####　注入 FormBuilder 服務
由於 `FormBuilder` 是一個 ReactiveFormModule 提供可用來產生 Form 表單控制元件的 Service，在 Component 中被使用前需要先注入。
```ts
constructor(private fb: FormBuilder) { }
```
<br/>

#### 使用 FormBuilder
`FormBuilder` 服務可以呼叫的方法只有3種：
  1. `.group()`：產生 `FormGroup` 實例
  2. `.array()`：產生 `FormArray` 實例
  3. `.control()`：產生 `FormConrol` 實例

以產生一個 `FormGroup` 物件為例，可以這樣寫：
```ts
export class InputareaComponent implements OnInit {
  carForm: FormGroup;
  radioForm: FormGroup;

  constructor( private fb: FormBuilder) {

  ngOnInit(): void {
    // 原本需要用 new 註冊 FromControl 檢核
    this.carForm = new FormGroup({
      manufacturer: new FormControl(null, Validators.required),
      type: new FormControl(null, Validators.required),
      minPrice: new FormControl(null, Validators.min(1)),
      price: new FormControl(null, Validators.min(1))
    });

    // 使用 FormBuilder 建立表單控制元件
    this.carForm = this.fb.group({
      manufacturer: [null, Validators.required],
      type: [null, Validators.required],
      minPrice: [null,  Validators.min(1)],
      price: [null,  Validators.min(1)],
    });
  }
  // 其他程式碼省略
}
```
下面使用 `FormBuilder` 建立表單控制元件的寫法明顯減少了很多 `new`，整體看起來也比較乾淨簡潔。
<br/>

## FormGroup.control()
下面是官網中 API 的定義：
```ts
control(formState: any, validatorOrOpts?: ValidatorFn | AbstractControlOptions | ValidatorFn[], asyncValidator?: AsyncValidatorFn | AsyncValidatorFn[]): FormControl
```
* `formState`：使用一個初始值或一個定義了初始值和禁用狀態的物件初始化該控制元件。
* `validatorOrOpts?`：一個同步驗證器函式或其陣列，預設值是 `undefined`.
* `asyncValidator?`：可傳入一個非同步驗證器函式或其陣列。
```ts
constructor(private fb: FormBuilder) {
  this.control = fb.control({value: 'default value', disabled: true});
}
```
`control()` 方法依照官方文件說明，可以傳入一個物件，用 `value` 屬性設定初始值，以及用狀態名稱作為 `key` 值設定初始狀態。
<br/>

## FormBuilder.group()
官網中定義 `.group()` 方法傳入參數型別如下：
```ts
group(controlsConfig: { [key: string]: any; }, options?: AbstractControlOptions): FormGroup
```
傳入參數可以有2個：
* `controlsConfig`：可以傳入一個物件，這個物件的內容包含控制元件的集合，而每個子控制元件的 `key` 值就是其註冊名稱。
* `options?`：可以傳入其他驗證器 ( Validators ) 或是非同步驗證。

以下面的程式碼來說，在 `Oninit` 中註冊一個 `FormGroup`，這個 `FormGroup` 中包含4個 `FormControl` 控制元件，名稱分別是 `manufacturer`、`type`、`minPrice` 及 `price`。
```ts
constructor(private fb: FormBuilder) {
  this.carForm = this.fb.group({
    manufacturer: [null, Validators.required],
    type: [null, Validators.required],
    minPrice: [null,  Validators.min(1)],
    price: [null,  Validators.min(1)],
  });
}
```
不過在 `FormGroup` 中建立控制元件 ( `FormControl` ) 只要定義好 `key` 值及 `value`，就等於是建立一個以 `key` 值為參數名稱的 `FormControl` 物件。每個 `value` 都是一個陣列，陣列中的第一個參數是控制元件的初始值；如果要加上其他同步驗證器或非同步驗證器，可以分別在陣列的第二、第三個參數傳入。
<br/>

## FormBuilder.array()
下面是官網上對於 `FormArray` API 的定義：
```ts
array(controlsConfig: any[], validatorOrOpts?: ValidatorFn | AbstractControlOptions | ValidatorFn[], asyncValidator?: AsyncValidatorFn | AsyncValidatorFn[]): FormArray
```
* `controlsConfig`：子控制元件陣列，每個子控制元件的 `key` 值是陣列中的索引。
* `validatorOrOpts?`：一個同步驗證器函式或其陣列，預設值是 `undefined`。
* `asyncValidator?`：一個非同步驗證器函式或其陣列，預設值是 `undefined`。

> 小結

最後比較 Template-driven Form 與 Reactive Form：

**Template-driven Form** | **Reactive Form**
:---|:---
以範本 ( Template ) 為主的表單開發模式 | 以模型 ( Module ) 為主的表單開發模式
要匯入`FormsModule`| 要匯入`ReactiveFormsModule`
以宣告的方式建立表單<br/>( Declarative Programming ) | 以指令的方式建立表單<br/>( Imperative Programming )
使用 `ngModel` 指令 | 使用 `formControlName` 等屬性
在範本 ( Template ) 中宣告驗證規則 | 在邏輯層 ( TypeScript ) 中宣告規則
**需要 `name` 屬性** | **不需要 `name` 屬性**

另外，使用 `FormBuilder` 建立出來的表單控制元件檢核方式跟直接 `new` 出物件是一樣的。

> 參考
* [FormBuilder](https://angular.tw/api/forms/FormBuilder)
* https://pvt5r486.github.io/f2e/20190618/751180778/