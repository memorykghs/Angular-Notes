# Angular - 25 - Simple Service
## Service
* Service 建立時機：
  * 與特定檢視 View 無關
  * 希望跨元件共享的資料或邏輯
  * Component 負責處理畫面、資料綁定；Service 負責取得資料、表單驗證等邏輯處理
<br/>


* 稱為一種**服務**，常用來抽出父元件與子元件溝通重複的邏輯
* 只在想用的時候把東西拿出來
* 控制反轉(依賴注入)
<br/>

#### 自訂 Service
**Service 註冊**：
  <table style="border: 0px;">
  <tr>
    <td style="text-align: center; font-weight: bold">◈ Component Provider</td>
    <td style="text-align: center; font-weight: bold">◈ Module Provider</td>
  </tr>
  <tr>
    <td><img src="/img/component_provider.png" width="300px"></td>
    <td><img src="/img/module_provider.png" width="400px"></td>
  </tr>
  </table>
<br/>

1. 在CLI下 `ng g service services/stock` 或 `ng g s services/stock` 新增一個自訂服務(其中 `services` 是資料夾名稱，`stock` 才是服務名稱)。
<img src="/img/ng_g_service.png">
<br/>

2. 下完指令後，CLI會自動建立 `stock.service.ts` 以及 `stock.service.spec.ts` 檔。
<img src="/img/service_injectable.png" width="350px">
<br/>

3. Angular使用 `@Injectable()` 裝飾器把類別定義為服務
    * 可讓服務作為依賴被注入到元件中
    * 服務也可以依賴於其他服務

    在下一章我們會提到更詳細的 Dependency Injection。
<br/>

4. 在 component 注入需要用到的服務元件
<img src="/img/service_injection.png" width="450px">
    * 注入 `StockSercvice` 給 `StockListComponent`
    * 注入後可使用服務提供的方法
<br/>

---

#### 改動的檔案：
從分支編號 `17_ngModelControlValidity` 切出去(local 為 `15_ngControlValidity`)。
另外這次只做單純的將重複邏輯抽出到 Service 的動作，不在 component 中做注入的動作。

* 先下指令 `ng g service services/stock` 建立 Service
* 使用時需要在`app.modules.ts`的`provider`import
設定的部分???
<br/>

1. `app.component.html`
```html
<!-- 改動的區塊 -->
<h1>
  {{title}}
</h1>
<app-stock-list></app-stock-list>
<app-create-stock></app-create-stock>
```
<br/>

2. `stock-item.component.ts`
```ts
...
...
export class CreateStockComponent implements OnInit {

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
}
```
<br/>

3. 新增`stock-list`component：`ng g component stock/stock-list`
  * `stock-list.component.html`
  ```html
  <app-stock-item *ngFor="let stock of stocks" [stock]="stock"
                  (toggleFavorite)="onToggleFavorite($event)">
  </app-stock-item>
  ```
  <br/>

  * `stock-list.component.html`
  ```ts
  import { Component, OnInit } from '@angular/core';
  import { Stock } from 'src/app/model/stock';
  import { StockService } from 'src/app/services/stock.service';

  @Component({
    selector: 'app-stock-list',
    templateUrl: './stock-list.component.html',
    styleUrls: ['./stock-list.component.css']
  })
  export class StockListComponent implements OnInit {

    public stocks: Stock[];
    constructor(private stockService: StockService) { }

    ngOnInit() {
      this.stocks = this.stockService.getStocks();
    }

    onToggleFavorite(stock: Stock) {
      console.log('Favorite for stock ', stock, ' was triggered');
      this.stockService.toggleFavorite(stock);
    }
  }
  ```

4. 新增service：`ng g service services/stock`
  * `stock.service.ts` 
  ```ts
  import { Injectable } from '@angular/core';
  import { Stock } from '../model/stock';

  @Injectable({
    providedIn: 'root'
  })

  // 抽出重複的邏輯
  export class StockService {

    private stocks: Stock[];
    constructor() {
      this.stocks = [
        new Stock('Test Stock Company', 'TSC', 85, 80, 'NASDAQ'),
        new Stock('Second Stock Company', 'SSC', 10, 20, 'NSE'),
        new Stock('Last Stock Company', 'LSC', 876, 765, 'NYSE')
      ];
    }

    getStocks() : Stock[] {
      return this.stocks;
    }

    createStock(stock: Stock) {
      const foundStock = this.stocks.find(each => each.code === stock.code);
      if (foundStock) {
        return false;
      }
      this.stocks.push(stock);
      return true;
    }

    toggleFavorite(stock: Stock) {
      const foundStock = this.stocks.find(each => each.code === stock.code);
      foundStock.favorite = !foundStock.favorite;
    }
  }
  ```