import { Component, OnInit, Output, EventEmitter,ChangeDetectionStrategy } from '@angular/core';
import { Observable } from 'rxjs';
import { Auth } from 'src/app/domain';
import { Store, select } from '@ngrx/store';
import * as fromRoot from '../../reducers';
import * as actions from '../../actions/auth.actions';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  changeDetection:ChangeDetectionStrategy.OnPush
})
export class HeaderComponent implements OnInit {

  auth$:Observable<Auth>;
  @Output() toggle = new EventEmitter<void>();
  @Output() toggleDark = new EventEmitter<boolean>();
  constructor(private store:Store<fromRoot.State>) {
  }

  ngOnInit() {
    this.auth$=this.store.pipe(select(fromRoot.getAuthState));
  }
  openSideBar() {
    this.toggle.emit();
  }
  onChange(checked: boolean) {
    this.toggleDark.emit(checked);

  }
  logout(){
    this.store.dispatch(new actions.LogoutAction());
  }
}
