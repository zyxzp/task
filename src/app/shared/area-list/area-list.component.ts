import { ChangeDetectionStrategy, OnInit, Component, EventEmitter, forwardRef, Input, Output, OnDestroy } from '@angular/core';
import { ControlValueAccessor, FormControl, NG_VALIDATORS, NG_VALUE_ACCESSOR, FormGroup, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-area-list',
  templateUrl: './area-list.component.html',
  styleUrls: ['./area-list.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => AreaListComponent),
      multi: true,
    },
    {
      provide: NG_VALIDATORS,
      useExisting: forwardRef(() => AreaListComponent),
      multi: true,
    }
  ],
})
export class AreaListComponent implements OnInit, OnDestroy, ControlValueAccessor {

  constructor() { }

  ngOnInit() {
  }
  
  ngOnDestroy() {

  }
  // 这里是做一个空函数体，真正使用的方法在 registerOnChange 中
  // 由框架注册，然后我们使用它把变化发回表单
  // 注意，和 EventEmitter 尽管很像，但发送回的对象不同
  private propagateChange = (_: any) => { };

  // 写入控件值
  public writeValue(obj: any) {
    if (obj) {

    }
  }

  // 当表单控件值改变时，函数 fn 会被调用
  // 这也是我们把变化 emit 回表单的机制
  public registerOnChange(fn: any) {
    this.propagateChange = fn;
  }

  // 验证表单，验证结果正确返回 null 否则返回一个验证结果对象
  public validate(c: FormControl): { [key: string]: any } {
    const val = c.value;
    if (!val) {
      return null;
    }
    // return this.items ? null : {
    //   chipListInValid: true
    // };
  }

  // 这里没有使用，用于注册 touched 状态
  public registerOnTouched() {
  }

}
