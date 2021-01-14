# Angular - 24 - FormArray
## FormArray
簡單介紹一下 `FormArray`：
* 可以用來追蹤陣列內每個表單控制元件的值，管理任意數量的匿名控制元件。
<br/>

* 一個`FormArray`中可以放多組任意表單元件(`FormControl` / `FormGroup` / `FormArray`)。
<br/>

* 現階段都使用 `FormBuilder` 服務來新增 `FormArray` 物件實例。
<br/>

  回想一下，`FormBuilder`內可以用的方法只有3種：
    1. `.group()`：產生`FormGroup`物件
    2. `.array()`：產生`FormArray`物件
    3. `.control()`：產生`FormConrol`物件
  <br/>

  所以當我們使用`fb.array()`方法後就會產生一個新的`FormArray`物件。
<br/>

#### 使用方法
1. 匯入 `FormArray` 類別
    ```ts
    import { FormArray } from '@angular/forms';
    ```
  <br/>

2. 在form template(模型)新增 `FormArray` 元件
    ```ts
    constructor(private fb: FormBuilder) {
    this.createForm();
    }

    createForm() {
      this.stockForm = this.fb.array([]);
    }
    ```
  <br/>

3. 使用 `getter` 訪問 `FormArray` 元件
    ```ts
    get profileArray(){
      return this.profile.get('stockForm') as FormArray;
    }
    ```
    方法的get是JS Class原生的寫法，表示要將 `profile` 這個虛擬屬性附加到被實例化出來的物件上。(`getter` 可以用 `delete` 操作符移除。)

    而 `.get('stockForm')` 中的 `stockForm` 表示我們註冊的 `FormArray` 屬性名稱。

    <img src="/img/ng_formArray.png">

    還有因為 `.get()` 回傳的物件形式是`AbstractControl`，所以要再轉型為 `FormArray` 物件。
  <br/>

4. 使用 `push` 對 `FormArray` 動態新增匿名控制元件。
    ```ts
    createForm() {
        this.stockForm = this.fb.array([]);
    }

    get profileArray() {
        return this.profileArray.get('stockForm') as FormArray;
    }

    addAlias(){
        this.profileArray.push(this.fb.control(''));
    }
    ```
    由於 `profileArray()` 是用 `get` 宣告的，所以可以被當成這個component上的屬性被抓取。
    <br/>

    <img src="/img/ng_formArray_push.png">

    `FormArray`是一個類似Array[]型別的物件，所以可以用`push`的方式將`FormGroup`物件放進`FormArray`。
  <br/>

5. 在範本中套用表單陣列
  * `formArrayName` 屬性對應 Array
  * `formControlName` 屬性對應控制元件( `formControlName` 為**陣列索引值**)
    ```html
    <div formArrayName="notablePeople"> <!-- tag上要新增formArrayName -->
      <div *ngFor="let person of notablePeople.controls; let i = index"
           [formGroupName]="i"
           class="notable-people">
        <div>
          Person {{i + 1}}
        </div>
      </div>
    </div>
    ```
<br/>

#### 改動的檔案：
1. `stock-item.component.html`
首先，要用`FormArray`包住`FormGroup`：
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
    <!-- 改動的區塊 -->
    <div formArrayName="notablePeople"> <!-- tag上要新增formArrayName -->
      <div *ngFor="let person of notablePeople.controls; let i = index"
           [formGroupName]="i"
           class="notable-people">
        <div>
          Person {{i + 1}}
        </div>
        <div>
          <input type="text"
                 placeholder="Person Name"
                 formControlName="name">
        </div>
        <div>
          <input type="text"
                  placeholder="Person Title"
                  formControlName="title">
        </div>
        <button type="button" (click)="removeNotablePerson(i)">Remove Person</button>
      </div>
    </div>
    <button type="button" (click)="addNotablePerson()">Add Notable Person</button>
    <button type="submit">Submit</button>
    <button type="button"
            (click)="resetForm()">
      Reset
    </button>
  </form>
</div>

<p>Form Control value: {{ stockForm.value | json }}</p>
<p>Form Control status: {{ stockForm.status | json }}</p>
<p>Stock Value: {{stock | json}}</p> <!-- 改動的行數 -->
```
<br/>

2. `create-stock.component.ts`
```ts
public stock: Stock;
  public stockForm: FormGroup;
  constructor(private fb: FormBuilder) {
    this.createForm();
  }

  ngOnInit(): void {
    throw new Error('Method not implemented.');
  }

  createForm() {
    this.stockForm = this.fb.group({ // .group表示產生FormGroup物件
      name: [null, Validators.required],
      code: [null, [Validators.required, Validators.minLength(2)]],
      price: [0, [Validators.required, Validators.min(0)]],
      notablePeople: this.fb.array([])
    });
  }

  // 改動的區塊
  get notablePeople(): FormArray {
    return this.stockForm.get('notablePeople') as FormArray;
  }

  // 產生FormGroup物件並放入FormArray物件中
  addNotablePerson() {
    this.notablePeople.push(this.fb.group({
      name: ['', Validators.required],
      title: ['', Validators.required]
    }));
  }

  removeNotablePerson(index: number) {
    this.notablePeople.removeAt(index);
  }

  resetForm() {
    this.stockForm.reset();
  }

  onSubmit() {
    this.stock = Object.assign({}, this.stockForm.value);
    console.log('Saving stock', this.stock);
  }
```
<br/>

3. `stock.ts`
```ts
export class Stock {
    favorite = false;
     notablePeople: Person[];

    constructor(public name: string,
                public code: string,
                public price: number,
                public previousPrice: number) {
        this.notablePeople = []; // 改動的行數
    }

    isPositiveChange(): boolean {
        return this.price >= this.previousPrice;
    }
}

// 改動的區塊
export class Person {
    name: string;
    title: string;
}
```

> 小結
* `FormBuilder`跟`FormArray`屬於不同的module。
<br/>

> 補充
###### JS Class的get和set
有時候，物件的屬性可能需要回傳動態數值、或要在不使用明確的方法呼叫下，反映出內部變數的狀態。

在 JavaScript 可以用 `getter` 達到這個目的。

儘管可以用 `getter` 與 `setter` 的關聯建立虛擬屬性的類型，但 `getter` 無法被綁定到同時擁有實際數值的屬性。

JS Class中可用 `get` 或 `set` 在prototype方法前面修飾，表示想把要取出的目標當成一個 `property` 取出。

```ts
get notablePeople(): FormArray {
    return this.stockForm.get('notablePeople') as FormArray;
}
```

也就是綁定一個虛擬屬性為`notavlePeople`到這個實例化物件上。

* 語法：
  * `get prop() { ... }`
  * `set`
  * `delete`：移除使用 `get()` 附加的屬性