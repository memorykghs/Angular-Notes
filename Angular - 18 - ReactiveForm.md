# Angular - 18 - ReactiveForm
## Reactive Form 響應式表單
將驗證表單的部分放在 TypeScript。
* 在元件(component)定義表單模型，以模型處理表單輸入。
* 管理表單在特定實踐點上的狀態。
* 圍繞Observable流建構，表單的輸入和值都是透過這些輸入值組成的流來提供。
* 使用時要在`app.modules.ts`的`@NgModule`中import要使用的`ReactiveFormsModule`。
  ```ts
  import { ReactiveFormsModule } from '@angular/forms'; // 改動的行數
  
  NgModule({
    declarations: [
      AppComponent,
      StockItemComponent,
      CreateStockComponent
    ],
    imports: [
      BrowserModule,
      AppRoutingModule,
      FormsModule, // 改動的行數
      ReactiveFormsModule  // 改動的行數
    ],
    providers: [],
    bootstrap: [AppComponent]
  })
  ```
<br/>

#### 使用說明
* 使用 Reactive Forms 的基本步驟，是先在 TypeScript 檔案內透過 `FormBuilder` 或是使用 `new` 關鍵字建立 `FormGroup` 類別實體，並往裡面塞各種實作 `AbstractControl` 介面的類別（包含 `FormGroup`、`FormArray` 或是 `FormControl`）。

## 表單基礎類別
通常一個表單會有多個欄位，所以我們會用一個群組來管理表單內的欄位。
只有單一表單的話可以使用`FormControl`即可。
* **`AbstactControl`**：表單控制元件的抽象類別，定義共用的屬性與方法表單控制元件。(`FormControl`、`FormGroup`及`FormArray`都繼承這個抽象類別)
<br/>

* **`FormControl`**：管理單個表單元件的值與狀態驗證。
<br/>

* **`FormGroup`**：管理一組表單控制元件，包含所有子控制項和子群組，欄位之間沒有順序性。
<br/>

* **`FormArray`**：管理一組表單控制元件，包含所有子控制項和子群組，以**陣列**方式集合，欄位之間索引值為數值。
<br/>

整體架構如下：
1. 一個`FormArray`下可以且只能包含`FormGroup`物件。
2. `FormGroup`下則可以包含任意`FormArray`、`FormGroup`或是`FormControl`物件。

![](/images/reactiveForm_structure.png)
> 小結
* Reactive Form要使用時須要在`app.modules.ts`的`@NgModule`中import要使用的`ReactiveFormsModule`。
* Template-drive Form使用時須要在`app.module.ts`匯入`FormsModule`

* 繼承 `AbstractControl` 的只有：
  1. `FormControl`
  2. `FormGroup`
  3. `FormArray`

動作 | Template-driven Form | Reactive Form
--- | --- | --- |
建立表單模型 | 由指令建立 | 在元件類別中建立 
資料模型 | 非結構化、可變 | 結構化、不可變
可預測性 | 非同步 | 同步
表單驗證 | 指令 | 函式

> 補充 - ngModel class

響應式表單和範本驅動表單都建立在下列基礎類別之上。

FormControl 實例用於追蹤單個表單控制元件的值和驗證狀態。

FormGroup 用於追蹤一個表單控制元件組的值和狀態。

FormArray 用於追蹤表單控制元件陣列的值和狀態。

ControlValueAccessor 用於在 Angular 的 FormControl 實例和原生 DOM 元素之間建立一個橋樑。