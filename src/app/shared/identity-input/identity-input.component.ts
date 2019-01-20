import { ChangeDetectionStrategy, OnInit, Component, EventEmitter, forwardRef, Input, Output, OnDestroy } from '@angular/core';
import { ControlValueAccessor, FormControl, NG_VALIDATORS, NG_VALUE_ACCESSOR, FormGroup, FormBuilder } from '@angular/forms';
import { Identity, IdentityType } from 'src/app/domain';
import { Subject, combineLatest, Subscription, Observable } from 'rxjs';

@Component({
  selector: 'app-identity-input',
  templateUrl: './identity-input.component.html',
  styleUrls: ['./identity-input.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => IdentityInputComponent),
      multi: true,
    },
    {
      provide: NG_VALIDATORS,
      useExisting: forwardRef(() => IdentityInputComponent),
      multi: true,
    }
  ],
})
export class IdentityInputComponent implements OnInit, OnDestroy, ControlValueAccessor {

  identityTypes: { value: IdentityType, label: string }[] = [{
    value: IdentityType.IdCard,
    label: '身份证'
  }, {
    value: IdentityType.Insurance,
    label: '医保'
  }, {
    value: IdentityType.Passport,
    label: '护照'
  }, {
    value: IdentityType.Military,
    label: '军官证'
  }, {
    value: IdentityType.Other,
    label: '其他'
  }];
  identity: Identity = { identityNo: null, identityType: null };
  private _idNo = new Subject<string>();
  private _idType = new Subject<IdentityType>();
  sub: Subscription;
  constructor() { }

  ngOnInit() {
    const idNo$ = this.idNo;
    const idType$ = this.idType;
    const val$ = combineLatest(idNo$, idType$, (no, type) => {
      return {
        identityNo: no,
        identityType: type
      };
    })
    this.sub = val$.subscribe(v =>{
       this.propagateChange(v)
    })
  }

  ngOnDestroy() {
    if (this.sub) {
      this.sub.unsubscribe();
    }
  }
  // 这里是做一个空函数体，真正使用的方法在 registerOnChange 中
  // 由框架注册，然后我们使用它把变化发回表单
  // 注意，和 EventEmitter 尽管很像，但发送回的对象不同
  private propagateChange = (_: any) => { };

  // 写入控件值
  public writeValue(obj: Identity) {
    if (obj) {
      this.identity = obj;
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
    switch (val.identityType) {
      case IdentityType.IdCard: this.validateIdCard(c);
      case IdentityType.Passport: this.validatePassport(c);
      case IdentityType.Military: this.validateMilitary(c);
      case IdentityType.Insurance:
      default: return null;
    }
  }
  public validateIdCard(c: FormControl): { [key: string]: any } {
    const val = c.value.identityNo;
    if (val.length != 18) {
      return { idNotValid: true };
    }
    const pattern = /^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}[x0-9]$/;
    return pattern.test(val) ? null : { idNotValid: true };
  }
  public validatePassport(c: FormControl): { [key: string]: any } {
    const val = c.value.identityNo;
    if (val.length != 9) {
      return { idNotValid: true };
    }
    const pattern = /^[GgEe]\d{8}$/;
    return pattern.test(val) ? null : { idNotValid: true };
  }
  public validateMilitary(c: FormControl): { [key: string]: any } {
    const val = c.value.identityNo;
    const pattern = /[\u4e00-\u9fa5](字第)(\d{4,8})(号?)$/;
    return pattern.test(val) ? null : { idNotValid: true };
  }
  // 这里没有使用，用于注册 touched 状态
  public registerOnTouched() {
  }

  onIdTypeChange(idType) {
    this._idType.next(idType);
  }
  onIdNoChange(idNo: string) {
    this._idNo.next(idNo);
  }
  get idNo():Observable<String> {
    return this._idNo.asObservable();
  }
  get idType():Observable<IdentityType> {
    return this._idType.asObservable();
  }
}
