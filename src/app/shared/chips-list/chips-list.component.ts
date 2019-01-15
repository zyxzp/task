import { ChangeDetectionStrategy, OnInit, Component, EventEmitter, forwardRef, Input, Output } from '@angular/core';
import { ControlValueAccessor, FormControl, NG_VALIDATORS, NG_VALUE_ACCESSOR, FormGroup, FormBuilder } from '@angular/forms';
import { User } from 'src/app/domain';
import { Observable } from 'rxjs';
import { debounceTime, filter, distinctUntilChanged, switchMap } from 'rxjs/operators';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-chips-list',
  templateUrl: './chips-list.component.html',
  styleUrls: ['./chips-list.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => ChipsListComponent),
      multi: true,
    },
    {
      provide: NG_VALIDATORS,
      useExisting: forwardRef(() => ChipsListComponent),
      multi: true,
    }
  ],
})
export class ChipsListComponent implements OnInit, ControlValueAccessor {
  @Input() multiple = true;
  @Input() label = "添加/修改成员";
  @Input() placeholderText = "请输入成员 email";

  form: FormGroup;
  items: User[] = [];
  memberResult$: Observable<User[]>;
  constructor(private fb: FormBuilder,private userService:UserService) { }

  ngOnInit() {
    this.form = this.fb.group({
      memberSearch: ['']
    });
    this.memberResult$=this.form.get('memberSearch').valueChanges
    .pipe(
      debounceTime(300),
      distinctUntilChanged(),
      filter(s=>s&&s.length>1),
      switchMap(str=>this.userService.searchUsers(str))
    );
  }
  // 这里是做一个空函数体，真正使用的方法在 registerOnChange 中
  // 由框架注册，然后我们使用它把变化发回表单
  // 注意，和 EventEmitter 尽管很像，但发送回的对象不同
  private propagateChange = (_: any) => { };

  // 写入控件值
  public writeValue(obj: User[]) {
    if (obj && this.multiple) {
      const userEntities = obj.reduce((e, c) => ({ ...e, c }), {});
      if (this.items) {
        const remaing = this.items.filter(item => !userEntities[item.id]);
        this.items = [...remaing, ...obj];
      }
    } else if (obj && !this.multiple) {
      this.items = [...obj];
    }
  }

  // 当表单控件值改变时，函数 fn 会被调用
  // 这也是我们把变化 emit 回表单的机制
  public registerOnChange(fn: any) {
    this.propagateChange = fn;
  }

  // 验证表单，验证结果正确返回 null 否则返回一个验证结果对象
  public validate(c: FormControl): { [key: string]: any } {
    return this.items ? null : {
      chipListInValid: true
    };
  }

  // 这里没有使用，用于注册 touched 状态
  public registerOnTouched() {
  }


  removeMember(member: User) {
    const ids = this.items.map(item => item.id);
    const i = ids.indexOf(member.id);
    if (this.multiple) {
      this.items = [...this.items.slice(0, i), ...this.items.slice(i + 1)];
    } else {
      this.items = [];
    }
    this.form.patchValue({ memberSearch: '' });
    this.propagateChange(this.items);
  }

  handleMemberSelection(member: User) {
    const ids = this.items.map(item => item.id);
    const i = ids.indexOf(member.id);
    if (i > -1) {
      return;
    }
    this.items = this.multiple ? [...this.items, member] : [member];
    this.form.patchValue({ memberSearch: member.name });
    this.propagateChange(this.items);
  }
  displayUser(user: User): string {
    return user ? user.name : '';
  }
  get displayInput() {
    return this.multiple || this.items.length === 0;
  }
}
