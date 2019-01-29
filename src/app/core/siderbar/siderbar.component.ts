import { Component, OnInit, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';
import { getDate } from 'date-fns';
import { Project } from 'src/app/domain';
import { Observable } from 'rxjs';
import { Store, select } from '@ngrx/store';
import * as fromRoot from '../../reducers';
import * as actions from '../../actions/project.actions';
@Component({
  selector: 'app-siderbar',
  templateUrl: './siderbar.component.html',
  styleUrls: ['./siderbar.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SiderbarComponent implements OnInit {
  today = 'day';
  projects$: Observable<Project[]>;
  @Output() navClick = new EventEmitter<void>();
  constructor(private store$: Store<fromRoot.State>) { }

  ngOnInit() {
    this.projects$ = this.store$.pipe(select(fromRoot.getProjects))
    this.today = `day${getDate(new Date())}`;
  }
  onNavClick() {
    this.navClick.emit();

  }
  onPrjClick(project) {
    this.store$.dispatch(new actions.SelectProjectAction(project));
    this.navClick.emit();

  }
}
