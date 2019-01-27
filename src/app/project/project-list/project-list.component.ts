import { Component, OnInit, HostBinding, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { MatDialog } from '@angular/material';
import { NewProjectComponent } from '../new-project/new-project.component';
import { InviteComponent } from '../invite/invite.component';
import { ConfirmDialogComponent } from 'src/app/shared/confirm-dialog/confirm-dialog.component';
import { slideToRight } from '../../anims/router.anim';
import { listAnimation } from '../../anims/list.anim';
import { ProjectService } from 'src/app/services/project.service';
import { Project } from 'src/app/domain';
import * as _ from 'lodash';
import { switchMap, filter, map, take } from 'rxjs/operators';
import { Store, select } from '@ngrx/store';
import * as fromRoot from '../../reducers';
import * as projectActions from '../../actions/project.actions';
import { Observable } from 'rxjs';
@Component({
  selector: 'app-project-list',
  templateUrl: './project-list.component.html',
  styleUrls: ['./project-list.component.scss'],
  animations: [slideToRight, listAnimation],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProjectListComponent implements OnInit {

  projects$: Observable<Project[]>;
  listAnim$: Observable<number>;
  @HostBinding('@routeAnim') state;
  constructor(private dialog: MatDialog,
    private cd: ChangeDetectorRef,
    private store: Store<fromRoot.State>) { }

  ngOnInit() {
    this.store.dispatch(new projectActions.LoadAction());
    this.projects$ = this.store.pipe(select(fromRoot.getProjects));
    this.listAnim$ = this.projects$.pipe(map(p => p.length));
  }
  openNewProjectDiaglog() {
    const selectedImg = `/assets/img/covers/${Math.floor(Math.random() * 40)}_tn.jpg`;
    const dialogRef = this.dialog.open(NewProjectComponent, { data: { thumbnails: this.getThumbnails(), coverImg: selectedImg } });
    dialogRef.afterClosed().pipe(
      take(1),//减少取消订阅操作，只取一次，自动取消订阅
      filter(n => n),//判断是否为true,对话框关闭状态是否是提交状态
      map(val => ({ ...val, coverImg: this.buildImgSrc(val.coverImg) })),
    ).subscribe(project => {
      this.store.dispatch(new projectActions.AddAction(project));
    });
  }
  private getThumbnails() {
    return _.range(0, 40).map(i => `/assets/img/covers/${i}_tn.jpg`);
  }
  private buildImgSrc(img: string): string {
    return img.indexOf('_tn') > -1 ? img.split("_tn")[0] + '.jpg' : img;
  }
  handleEditProject(project: Project) {
    const dialogRef = this.dialog.open(NewProjectComponent, { data: { project: project, thumbnails: this.getThumbnails() } });
    dialogRef.afterClosed().pipe(
      take(1),
      filter(n => n),
      map(val => ({ ...val, id: project.id, coverImg: this.buildImgSrc(val.coverImg) })),
    ).subscribe(project => {
      this.store.dispatch(new projectActions.UpdateAction(project));
    });
  }
  handleInvite(project) {
    let members = [];
    this.store.pipe(select(fromRoot.getProjectMembers(project.id)),
      take(1))
      .subscribe(m => members = m);
    const dialogRef = this.dialog.open(InviteComponent, { data: { members: members } });
    dialogRef.afterClosed().pipe(
      take(1),
      filter(n => n),
    ).subscribe(users => {
      this.store.dispatch(new projectActions.InviteAction({projectId:project.id,members:users}));
    });
  }
  handleDelete(project) {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, { data: { title: '删除项目', content: '确认删除选中项目吗?' } });
    dialogRef.afterClosed().pipe(
      take(1),
      filter(n => n),
    ).subscribe(_ => {
      this.store.dispatch(new projectActions.DeleteAction(project));
    });
  }
}
