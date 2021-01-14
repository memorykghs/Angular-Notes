# Angular - 23 - Nested Form Groups
## Nested Form Groups 巢狀表單組
* 將大型表單組織成易管理的分組
    1. 在component(元件)建立巢狀表單組實例
    2. 在template(範本)對這個巢狀表單分組
        * 以 `formGroupNmae` 屬性對應 `Group`
        * 以 `formControlName` 屬性對應控制元件
        <br/>

        也就是說當出現多組 `FormGroup` 時，必須以 `formGroupNmae` 屬性區分不同的群組，而群組間的欄位則以 `formControlName` 屬性對應 `key` 值。
    
        ```html
        <div [formGroup]="profile"> <!-- FormGroup本體 -->
            <label>Name：
                <input type="text" formControlName="name">
            </label>
            <div formControlName="address"> <!-- 地址區塊 -->
                <label label>Dist.：
                    <input type="text" formControlName="district"> <!-- 欄位 -->
                </label>
                <label>Villa.：
                    <input type="text" formControlName="village"> <!-- 欄位 -->
                </label>
            </div>
            <div formControlName="contact"> <!-- 聯絡資訊區塊 -->
            <label>Email：
                    <input type="text" formControlName="email"> <!-- 欄位 -->
                </label>
                <label>Phone：
                    <input type="text" formControlName="phone"> <!-- 欄位 -->
                </label>
            </div>
        </div>
        ```
        <img src="/img/nested_form_groups.png">

    3. 取得表單控制元件
        * `this.form.controls.control`
        * `this.form.get('group.control')`
    <br/>
    
    4. 設定表單控制元件的值
        * `setValue()`、`patchValue`、`reset()`
        * 針對表單模型的結構更新
        * 針對單個表單控制元件設值
        ```ts
        doUpdate(){
            this.profile.patchValue({
                name: '發大財',
                address: {
                    district: '台北市',
                    village: '內湖區'
                },
                contact: {
                    email: 'nt88888@cathaybk.com.tw',
                    phone: '0988-888-888'
                }
            });

            this.profile.controls.address.get('village').setValue('信義區');
        }
        ```
<br/>

## 表單控制元件設值
上面用到的 `patchValue`、`setValue`、`reset` 3個方法屬於 `FormGroup` 服務的方法：
1. `setValue(obj)`：設定此 `FormGroup` 的值。
    * 傳入的 `obj` 必須完全與 `FromGroup` 中的物件結構相同
    * 以控制元件名作為 key。
<br/>

2. `patchValue(obj)`：修補此 FormGroup 的值，並儘量把它們的值匹配到組中正確的控制元件上。
    * 傳入的 `obj` 如果對應不到屬性不會出現錯誤，會自動忽略。
<br/>

3. `reset`、`reset(obj)`：重置這個 `FormGroup`，把它的各級子控制元件都標記為 `pristine` 和 `untouched`，並把它們的值都設定為 `null`。
也就是說：
    * 表單狀態會被重置為 `pristine`
    * 傳入的 `obj` 如果比對不到屬性不會出現錯誤，會自動忽略
    * 所有欄位值變成 `null`
<br/>

#### 改動的檔案：
1. `create-stock.component.html`
```html
<h2>Create Stock Form</h2>

<div class="form-group">
  <form [formGroup]="stockForm" (ngSubmit)="onSubmit()">
    <div class="stock-name">
      <input type="text"
             placeholder="Stock Name"
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
    <!-- 改動的區塊，多了button -->
    <button type="submit">Submit</button>
    <button type="button"
            (click)="resetForm()">
      Reset
    </button>
    <button type="button"
            (click)="loadStockFromServer()">
      Simulate Stock Load from Server
    </button>
    <button type="button"
            (click)="patchStockForm()">
      Patch Stock Form
    </button>
  </form>
</div>

<p>Form Control value: {{ stockForm.value | json }}</p>
<p>Form Control status: {{ stockForm.status | json }}</p>
```
<br/>

2. `create-stock.component.ts`
```ts
import { Stock } from 'src/app/model/stock'; // 新增的行數

let counter = 1; // 新增的行數
...
...
export class CreateStockComponent implements OnInit {

  private stock: Stock;
  public stockForm: FormGroup;
  
  constructor(private fb: FormBuilder) {
    this.createForm();
    this.stock = new Stock('Test ' + counter++, 'TST', 20, 10);
  }
  
  ngOnInit(): void {
    throw new Error('Method not implemented.');
  }

  createForm() {
    this.stockForm = this.fb.group({
      name: [null, Validators.required],
      code: [null, [Validators.required, Validators.minLength(2)]],
      price: [0, [Validators.required, Validators.min(0)]]
    });
  }

  // 改動的區塊
  loadStockFromServer() {
    this.stock = new Stock('Test ' + counter++, 'TST', 20, 10);
    const stockFormModel = Object.assign({}, this.stock);
    delete stockFormModel.previousPrice;
    delete stockFormModel.favorite;
    this.stockForm.setValue(stockFormModel); // 任何的FormControl或是FormBuilder都有setValue方法
  }

  // 改動的區塊
  patchStockForm() {
    this.stock = new Stock(`Test ${counter++}`, 'TST', 20, 10);
    this.stockForm.patchValue(this.stock); // 任何的FormControl或是FormBuilder都有patchValue方法
  }

  // 改動的區塊
  resetForm() {
    this.stockForm.reset();
  }

  onSubmit() {
    this.stock = Object.assign({}, this.stockForm.value);
    console.log('Saving stock', this.stock);
  }
}
```
<br/>

3. `app.component.ts`
```ts
...
...
export class AppComponent {
  title = 'stockMarket';

  public stock: Stock;

  ngOnInit(): void {
    this.stock = new Stock('Test Stock Company', 'TSC', 85, 80); // 改動的行數
  }

  onToggleFavorite(stock: Stock) {
    console.log('Favorite for stock ', stock, ' was triggered');
    this.stock.favorite = !this.stock.favorite;
  }

}
```
<br/>

4. `stock.component.ts`
```ts
export class Stock {
    favorite = false;

    constructor(public name: string,
        public code: string,
        public price: number,
        public previousPrice: number){ } // 改動的行數

    isPositiveChange(): boolean {
        return this.price >= this.previousPrice;
    }
}
```
<br/>

> 補充
* [FormGroup方法API](https://angular.tw/api/forms/FormGroup#setvalue)