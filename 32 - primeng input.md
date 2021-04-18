# Angular - 32 - primeng input
## 前置作業
需要在 `app.module.ts` import `InputTextModule`。
```
import {InputTextModule} from 'primeng/inputtext';
```


## 套用 InputText 樣式
撰寫 Template 部分在要套用 `InputTextModule` 的 tag 上加上 `pInputText`。
```html
<input type="text" pInputText />
```