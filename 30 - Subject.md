# Angular - 30 - Subject
Subject 是一個比較特殊的 Observable，一般的 Observable 只能由內部 ( 資料來源源頭 ) 去觸發 `next()` 更新 Observer 的資訊；但 Subject 物件可以由外部去觸發 `next()`，只要有訂閱的 Observer 就可以收到訊息。
![](/images/30-1.png)

也就是 Observer 本身也可以當作是 Observable 使用 `next()` 發送資料，像是通訊軟體的群組中，只要有人回復訊息，在群組的人都要同時更新內容，這種清況我們就可使用 Subject。相較於基本雙向溝通使用 `@Input()` 及 `EventEmitter`，Subject 提供了更便捷且有效率的方式。

Subject 通常較適合用在 Service 對多個注入相同服務的 Component 之間的溝通，如果是 Component 之間的溝通，還是用遠本的 `@Output()` 搭配 `EventEmitter` 較為合適。

使用前需要引入 Subject。
```
import { Subject } from 'rxjs';
```

而在 Component hook 結束前一樣需要在 `OnDestroy()` 時取消訂閱。

## 建立 Subject
```ts
new Subject<number>();
```