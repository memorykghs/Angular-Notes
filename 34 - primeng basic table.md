# Angular - 34 - primeng basic table
## 前置作業
首先要執行下面指令下載相關套件。
```
npm install @angular/cdk --save
```
然後在 `app.module.ts` 中 import 要用的 Module。
```
import {TableModule} from 'primeng/table';
```

## Template 樣式
通常會使用 primeng 自定義的 Component `<p-table>` 來產生 table，標頭的部分會用 `<ng-template>` 包起來。
```html
<p-table>
    <ng-template pTemplate="header">
      <tr>
        <td>序號</td>
        <td>製造商</td>
        <td>類別</td>
        <td>底價</td>
        <td>售價</td>
        <td>操作</td>
      </tr>
    </ng-template>
  </p-table>
```