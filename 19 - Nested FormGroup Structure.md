# Angular - 19 - Nested FormGroup & Use FormArray
## Nested FormGroup Structure
在比較複雜的表單中，可能出現多層的結構，也就是 FormGroup 或 FormArray 中再包含自己或是其他控制元件。來看一下如果 FormGroup 中再包一個 FormGroup 要怎麼做。
```
|--app
    |--app.component.html // 更改
    |--app.component.ts // 更改
    |--app.component.css
```

1. `app.component.html`
```html
<div class="container">
  <div class="row">
    <div class="col-xs-12 col-sm-10 col-md-8 col-sm-offset-1 col-md-offset-2">
      <form [formGroup]="signupForm" (ngSubmit)="onSubmit()">
        <div formGroupName="userdata"><!-- 新增內層 FormGrouop -->
          <div class="form-group">
            <label for="username">Username</label>
            <input
              type="text"
              id="username"
              class="form-control"
              formControlName="username">
            <span
              *ngIf="signupForm.get('userdata.username').invalid && signupForm.get('userdata.username').touched"
              class="help-block">Please enter a valid username!</span>
          </div>
          <div class="form-group">
            <label for="email">email</label>
            <input
              type="text"
              id="email"
              class="form-control"
              formControlName="email">
            <span
              *ngIf="signupForm.get('userdata.mail').invalid && signupForm.get('userdata.email').touched"
              class="help-block">Please enter a valid email!</span>
          </div>
          <div class="radio" *ngFor="let gender of genders">
            <label>
              <input
                type="radio"
                [value]="gender"
                formControlName="gender">{{ gender }}
            </label>
          </div>
          <span 
            *ngIf="signupForm.invalid && signupForm.touched"
            class="help-block">Please enter a valid data!</span>
        </div>
        <button class="btn btn-primary" type="submit">Submit</button>
      </form>
    </div>
  </div>
</div>
```
在 Template 上，最外層的 FormGroup 是一開始就建立的 `signupForm`，對應的 tag 是 `<form>`，我們使用 `[formGroup]="signupForm"` 將其綁定。在這個 Form 表單內還要在新增一層的話，不能再包一個 `<form>` ( 會導致 Form 表單失效 )，所以我們另外建了一個 `<div>` tag，加上 `formGroupName="userdata"` 綁定。不一樣的地方在於通常最外層一定是 `<form>` 元素，用的是 Property Binding；內層的則是要像冊 FormControl 一樣使用 FormGroupName 綁定 ( FormArray 就綁定 FormArrayName )。

| 表單控制元件 | 最外層 | 非最外層
| :---: | :---: | :---: |
| FormControl | 無 | formControlName
| FormGroup | [formGroup] | formGroupName
| FormArray | [formArray] | formArrayName
<br/>

2. `app.component.ts`
```ts
export class AppComponent implements OnInit{
  genders = ['male', 'female'];
  signupForm: FormGroup;

  ngOnInit(): void {
    this.signupForm = new FormGroup({
      userdata: new FormGroup({
        username: new FormControl(null, Validators.required),
        email: new FormControl(null, [Validators.required, Validators.email]),
        gender: new FormControl('female')
      })
    });
  }

  onSubmit() {
    console.log(this.signupForm)
  }
}
```
現在我們將所有跟 User 相關的資訊包在了 userdata 這個 FormGroup 中，等於現在是有兩層的結構，第一層是 signupFor，第二層是 userdata。更改過後，Template 的結構與檢核邏輯也要跟著更改，原本使用 `signupForm.get('username').invalid` 已經不能使用，要替換成 `signupForm.get('userdata.username').invalid`，使用點運算子可以拿到內層的結構。
<br/>

## Use FormArray
```
|--app
    |--app.component.html // 更改
    |--app.component.ts // 更改
    |--app.component.css
```

1. `app.component.html`
```html
<div class="container">
  <div class="row">
    <div class="col-xs-12 col-sm-10 col-md-8 col-sm-offset-1 col-md-offset-2">
      <form [formGroup]="signupForm" (ngSubmit)="onSubmit()">
        <div formGroupName="userdata">
          <div class="form-group">
            <label for="username">Username</label>
            <input
              type="text"
              id="username"
              class="form-control"
              formControlName="username">
            <span
              *ngIf="signupForm.get('userdata.username').invalid && signupForm.get('userdata.username').touched"
              class="help-block">Please enter a valid username!</span>
          </div>
          <div class="form-group">
            <label for="email">email</label>
            <input
              type="text"
              id="email"
              class="form-control"
              formControlName="email">
            <span
              *ngIf="signupForm.get('userdata.email').invalid && signupForm.get('userdata.email').touched"
              class="help-block">Please enter a valid email!</span>
          </div>
        </div>
        <div class="radio" *ngFor="let gender of genders">
          <label>
            <input
              type="radio"
              [value]="gender"
              formControlName="gender">{{ gender }}
          </label>
        </div>
        <div formArrayName="hobbies">
          <h4>Your hobbies</h4>
          <button type="button"
                  class="btn btn-default"
                  (click)="onAddHobby()">Add hobby</button>
          <div class="form-group"
                *ngFor="let hobbyControl of hobbies; let i = index">
            <input type="text" class="form-control" [formControlName]="i"><!-- 新增hobbies -->
          </div>
        </div>
        <span *ngIf="signupForm.invalid && signupForm.touched"
              class="help-block">Please enter a valid data!</span>
        <button class="btn btn-primary" type="submit">Submit</button>
      </form>
    </div>
  </div>
</div>
```
<br/>

2. `app.component.ts`
```ts
export class AppComponent implements OnInit{
  genders = ['male', 'female'];
  signupForm: FormGroup;

  ngOnInit(): void {
    this.signupForm = new FormGroup({
      userdata: new FormGroup({
        username: new FormControl(null, Validators.required),
        email: new FormControl(null, [Validators.required, Validators.email])
      }),
      gender: new FormControl('female'),
      hobbies: new FormArray([])
    });
  }

  onSubmit() {
    console.log(this.signupForm)
  }

  onAddHobby(){
    const control = new FormControl(null, Validators.required);
    (<FormArray>this.signupForm.get('hobbies')).push(control);
  }

  get hobbies() {
    return (this.signupForm.get('hobbies') as FormArray).controls;
  }
}
```
其中 `(<FormArray>this.signupForm.get('hobbies'))` 這段是在對拿出來的表單元件做轉型，是 FormArray 才能使用 `push()` 將新增的控制元件加入管理，寫成像下面這也是可以的：
```ts
onAddHobby(){
  const control = new FormControl(null, Validators.required);
  (this.signupForm.get('hobbies') as FormArray).push(control);
}
```

按下按鈕我們就可以對 FormArray 新增 FormControl 元件，可以打開開發者工具看 FormArray 下的 `controls` 屬性內元件是否有增加。

> 補充
* [FormGroup API](https://angular.tw/api/forms/FormGroup#description)
* [FormControlName如何對應到FormControl實體](https://medium.com/@yingpinglin/ag-how-to-know-formcontrol-503ff0798e80)