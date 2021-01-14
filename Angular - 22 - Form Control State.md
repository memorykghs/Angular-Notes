# Angular - 22
## Form Control State - .get()

* `AbstractControl` 中有許多方法，而繼承這個**抽象類別**的子類別(`FromControl`、`FromGroup` 及`FromArray`)都可以使用其方法。
<br/>

#### 方法(部分)
1. `get()`：根據指定的控制元件名稱或路徑獲取子控制元件。回傳的物件形式是 `AbstractControl` 或是 `null`。
    ```html
    <div *ngIf="stockForm.get('name').invalid">Name is required</div>
    ```

2. `setValue()`：設定該控制元件的值。這是一個抽象方法(由子類別實現)。

3. `patchValue()`：修補（patch）該控制元件的值。這是一個抽象方法（由子類別實現）。

像是 `setValue()`、`patchValue()` 這類的方法會根據不同子類別而有不同的功能。
<br/>

#### 改動的檔案：
1.  `create-stock.component.html`
```html
<h2>Create Stock Form</h2>

<div class="form-group">
  <form [formGroup]="stockForm" (ngSubmit)="onSubmit()">
    <div class="stock-name">
      <input type="text"
             placeholder="Stock Name"
             name="stockName"
             formControlName="name">
      <div *ngIf="stockForm.get('name').invalid &&
                  ( stockForm.get('name').dirty ||
                    stockForm.get('name').touched )">
        Name is required
      </div>
    </div>
    <div class="stock-code">
      <input type="text"
              placeholder="Stock Code"
              formControlName="code">
      <div *ngIf="stockForm.get('code').invalid &&
                  ( stockForm.get('code').dirty ||
                    stockForm.get('code').touched )">
        <div *ngIf="stockForm.get('code').errors.required">
          Stock Code is required
        </div>
        <div *ngIf="stockForm.get('code').errors.minlength">
          Stock Code must be atleast 2 characters
        </div>
      </div>
    </div>
    <div class="stock-price">
      <input type="number"
              placeholder="Stock Price"
              formControlName="price">
      <div *ngIf="stockForm.get('price').invalid &&
                  ( stockForm.get('price').dirty ||
                    stockForm.get('price').touched )">
        <div *ngIf="stockForm.get('price').errors.required">
          Stock Price is required
        </div>
        <div *ngIf="stockForm.get('price').errors.min">
          Stock price must be positive
        </div>
      </div>
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

> 補充
* [AbstractControl API](https://angular.tw/api/forms/AbstractControl#patchvalue)