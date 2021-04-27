# Angular - 29 - Observable with Operator - 1
## 續 Operator
#### concatAll()
有時我們的 Observable 送出的元素又是一個 observable，就像是二維陣列，陣列裡面的元素是陣列，這時我們就可以用 concatAll 把它攤平成一維陣列，大家也可以直接把 concatAll 想成把所有元素 concat 起來

```
|--main
  |--main.component.html
  |--main.component.ts // 更改
```

1. `main.component.ts`
```ts
export class AppComponent implements OnInit {
  testSource1: object;
  testSource2: object;

  ngOnInit(): void {
    this.testSource1 = {
      name: "Orola",
      age: 29
    };

    this.testSource2 = {
      name: "Tony",
      age: 25
    };

    of(this.testSource1, this.testSource2)
      .pipe(concatAll())
      .subscribe(x => console.log(x));
  }
}
```

> 參考
* https://blog.jerry-hong.com/series/rxjs/thirty-days-RxJS-08/
