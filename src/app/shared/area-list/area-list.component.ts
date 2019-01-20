import { ChangeDetectionStrategy, OnInit, Component, EventEmitter, forwardRef, Input, Output, OnDestroy } from '@angular/core';
import { ControlValueAccessor, FormControl, NG_VALIDATORS, NG_VALUE_ACCESSOR, FormGroup, FormBuilder } from '@angular/forms';
import { Address } from 'src/app/domain';
import { Subject, Observable, combineLatest, Subscription, of } from 'rxjs';
import { getProvinces, getCitiesByProvince, getAreasByCity } from '../../utils/area.util';
import { mergeMap, startWith } from 'rxjs/operators';
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

  _address: Address = { province: null, city: null, district: null, street: null };
  _province = new Subject();
  _city = new Subject();
  _district = new Subject();
  _street = new Subject();

  provinces$: Observable<string[]>;
  cities$: Observable<string[]>;
  districts$: Observable<string[]>;

  sub: Subscription;
  constructor() { }

  ngOnInit() {
    const province$ = this._province.asObservable().pipe(startWith(''));
    const city$ = this._city.asObservable().pipe(startWith(''));
    const district$ = this._district.asObservable().pipe(startWith(''));
    const street$ = this._street.asObservable().pipe(startWith(''));
    const val$ = combineLatest([province$, city$, district$, street$], (p, c, d, s) => {
      return {
        province: p, city: c, district: d, street: s
      };
    })
    this.sub = val$.subscribe(v => this.propagateChange(v));
    this.provinces$ = of(getProvinces());
    // 根据省份的选择得到城市列表
    this.cities$ = province$.pipe(
      mergeMap((p:string )=> of(getCitiesByProvince(p)))
    );
    // 根据省份和城市的选择得到地区列表
    this.districts$ = combineLatest(province$, city$, (p, c) => ({ province: p, city: c }))
      .pipe(mergeMap((a:{province:string,city:string} )=> of(getAreasByCity(a.province, a.city))));

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
  public writeValue(obj: Address) {
    if (obj) {
      this._address = obj;
      if (this._address.province) {
        this._province.next(this._address.province);
      }
      if (this._address.city) {
        this._city.next(this._address.city);
      }
      if (this._address.district) {
        this._district.next(this._address.district);
      }
      if (this._address.street) {
        this._street.next(this._address.street);
      }
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
    if (val.province && val.city && val.district && val.street && val.street.length >= 4) {
      return null;
    }
    return {
      addressNotValid: true
    };
  }

  // 这里没有使用，用于注册 touched 状态
  public registerOnTouched() {
  }

  onProvinceChange() {
    this._province.next(this._address.province);
  }

  onCityChange() {
    this._city.next(this._address.city);
  }

  onDistrictChange() {
    this._district.next(this._address.district);
  }

  onStreetChange() {
    this._street.next(this._address.street);
  }

  
}
