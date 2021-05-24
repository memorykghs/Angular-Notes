# Angular - 26 - 設定動態路由 & 獲得路由參數
現在我們回頭看一下剛剛使用到的 Router 及 RouterActive 物件。在 `app-routing.module.ts` 設定的物件型別是 Route，而在 ts 進行導頁的服務則是 Router 及 ActivateRoute。

## Router
Router 是一個可以在任何地方注入並使用的服務，當網址發生改變，Angular 會從 Router 中找出相對應的 Route 物件。當然我們也可以從 Router 服務元件中取出 ActivateRoute ( 目前套用的路由 ) 或是 RouterState ( 路由狀態 ) 等物件的資訊。

## RouterActive

```ts
navigate(commands: any[], extras: NavigationExtras = { skipLocationChange: false }): Promise<boolean>
```