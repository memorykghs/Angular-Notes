# Angular - 31 - primeng 套版設定
每個版本不同，這邊以 `v11.3.2` 為練習的版本。

## Step 1 
在 terminal 下指令下載 primeng 套件。
```
npm install primeng --save
npm install primeng@x.x.x --save // 指定版本號，x.x.x為版號
npm install primeicons --save
npm install @angular/animations --save // 視情況下載動畫套件
```

如果有已經下載的可以執行 `npm uninstall primeng --save` 先卸載既有版本。有加 `--save` 參數表示要安裝 primeng 並將版號保存到 `package.json 中的 dependencies 下，所以會看到 dependency 下長出 primeng 相關的版本紀錄。

```json
"dependencies": {
    "@angular/animations": "~11.0.0",
    "@angular/common": "~11.0.0",
    "@angular/compiler": "~11.0.0",
    "@angular/core": "~11.0.0",
    "@angular/forms": "~11.0.0",
    "@angular/platform-browser": "~11.0.0",
    "@angular/platform-browser-dynamic": "~11.0.0",
    "@angular/router": "~11.0.0",
    "primeicons": "^4.1.0", // <- for primeng icon
    "primeng": "^11.3.2", // <- for primeng
    "rxjs": "~6.6.0",
    "tslib": "^2.0.0",
    "zone.js": "~0.10.2"
  }
```

## Step 2
在 `angular.json` 中的 `test > styles` 屬性下引入相關 css 檔案。
![](/images/31-1.png)

## Step 3
如果是使用較舊的版本，需要在 `tsconfig.json` 檔案中加入 `path` 屬性內容。
```ts
{
    "compilerOptions": {
        //...other options
        "paths": {
            "primeng/*": ["node_modules/primeng-lts/*"]
        }
    }
}
```

## Step 4
最後在 `app.module.ts` import 要使用的 Module。
```ts
import {AccordionModule} from 'primeng/accordion'; //accordion and accordion tab
import {MenuItem} from 'primeng/api'; //api
...
@NgModule({
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    AccordionModule,
    ...
  ]
})
```

> 參考
* [primeng官網](https://primefaces.org/primeng/showcase/#/setup)
* https://blog.csdn.net/weixin_41224687/article/details/81078457
* https://kknews.cc/code/6onkz3q.html