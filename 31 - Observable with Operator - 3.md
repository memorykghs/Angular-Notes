# Angular - 29 - Observable with Operator - 1
## Operator (續)

```
|--main
  |--main.component.html
  |--main.component.ts // 更改
```

1. `main.component.ts`
```ts
export class AppComponent implements OnInit {

  ngOnInit(): void {
    console.clear();

    interval(1000)
      .pipe(skip(3))
      .subscribe(data => console.log(data));
  }
}
```


## 小結


> 參考
* https://blog.jerry-hong.com/series/rxjs/thirty-days-RxJS-09/
* https://rxjs-dev.firebaseapp.com/api
