# Angular - 21 - FormBuilder
## FormBuilder
* 是一個語法糖，以簡化 `FormControl`、`FormGroup` 或 `FormArray` 實例的建立過程。

* 簡化`formControl(表單控制元件)`方法：
   1. 在元件注入`FormBuilder`服務
   2. 產生表單控制元件

* `FormBuilder`服務內可以用的方法只有3種：
  1. `.group()`：產生 `FormGroup` 實例
  2. `.array()`：產生 `FormArray` 實例
  3. `.control()`：產生 `FormConrol` 實例
<br/>

#### 改動的檔案：
1. `create-stock.component.ts`
```ts
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms'; // 改動的行數
...
...
export class CreateStockComponent implements OnInit {

 public stockForm: FormGroup;

  constructor(private fb: FormBuilder) { // 此語法為注入，在Service會細講
    this.createForm();
  }
  
  ngOnInit(): void { }

  createForm() {
    // 使用FormBuilder的group寫法簡化FormControl(不需要一直new)
    this.stockForm = this.fb.group({ // 產生FormGroup元件
      name: [null, Validators.required],
      code: [null, [Validators.required, Validators.minLength(2)]],
      price: [0, [Validators.required, Validators.min(0)]]
    });
  }

  onSubmit() {
    console.log('Stock Form Value', this.stockForm.value);
  }
}
```
<br/>

> 小結

* 比較 Template-driven Form 與 Reactive Form：

**Template-driven Form** | **Reactive Form**
:---|:---
以範本(template)為主的表單開發模式 | 以模型(module)為主的表單開發模式
要匯入`FormsModule`| 要匯入`ReactiveFormsModule`
以宣告的方式建立表單<br/>(Declarative Programming) | 以指令的方式建立表單<br/>(Imperative Programming)
使用ngModel指令 | 使用formControlName屬性
在範本(template)中宣告驗證規則 | 在元件中宣告規則
<font color="red">非同步</font> | <font color="red">同步</font>
**需要 `name` 屬性** | **不需要 `name` 屬性**
