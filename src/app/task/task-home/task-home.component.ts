import { Component, OnInit, HostBinding, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { MatDialog } from '@angular/material';
import { NewTaskComponent } from '../new-task/new-task.component';
import { CopyTaskComponent } from '../copy-task/copy-task.component';
import { ConfirmDialogComponent } from 'src/app/shared/confirm-dialog/confirm-dialog.component';
import { NewTaskListComponent } from '../new-task-list/new-task-list.component';
import { slideToRight } from '../../anims/router.anim';
import { Store, select } from '@ngrx/store';
import * as fromRoot from '../../reducers';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { pluck, take, filter } from 'rxjs/operators';
import * as taskListActions from '../../actions/task-list.actions';
@Component({
  selector: 'app-task-home',
  templateUrl: './task-home.component.html',
  styleUrls: ['./task-home.component.scss'],
  animations: [slideToRight],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TaskHomeComponent implements OnInit {

  @HostBinding('@routeAnim') state;
  projectId$: Observable<string>;
  lists$: Observable<TaskList[]>;
  constructor(private dialog: MatDialog,
    private cd: ChangeDetectorRef,
    private store: Store<fromRoot.State>,
    private route: ActivatedRoute) {
    this.projectId$ = this.route.paramMap.pipe(pluck('id'));
    this.lists$ = this.store.pipe(select(fromRoot.getTaskLists))
  }

  ngOnInit() {
  }

  launchNewTaskDialog(ev: Event) {
    const dialogRef = this.dialog.open(NewTaskComponent, { data: { title: '新建任务' } });
    dialogRef.afterClosed().pipe(
      take(1),
      filter(n => n)
    ).subscribe(res => {
      this.store.dispatch(new taskListActions.AddAction(res));
    });
  }
  launchCopyAllTaskDialog() {
    // this.dialog.open(CopyTaskComponent, { data: { lists: this.lists } });
  }
  launchUpdateTaskDialog(task) {
    const dialogRef = this.dialog.open(NewTaskComponent, { data: { title: '修改任务', task: task } });
    dialogRef.afterClosed().pipe(
      take(1),
      filter(n => n)
    ).subscribe(res => {
      this.store.dispatch(new taskListActions.AddAction(res));
    });

  }
 
  //列表相关操作
  //新建任务列表
  openNewListDialog(ev:Event) {
    const dialogRef = this.dialog.open(NewTaskListComponent, { data: { title: '新建列表' } });
    dialogRef.afterClosed().pipe(
      take(1)
    ).subscribe(res => {
      this.store.dispatch(new taskListActions.AddAction(res));
    });
  }
  launchEditList(list: TaskList) {
    const dialogRef = this.dialog.open(NewTaskListComponent, { data: { title: '修改列表', taskList: list } });
    dialogRef.afterClosed().pipe(
      take(1)
    ).subscribe(res => {
      this.store.dispatch(new taskListActions.UpdateAction({ ...res, id: list.id }));
    });
  }
  
  launchDeleteList(list: TaskList) {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, { data: { title: '删除列表', content: '确认删除选中列表吗?' } });
    dialogRef.afterClosed().pipe(
      take(1),
      filter(n => n)
    ).subscribe(res => {
      this.store.dispatch(new taskListActions.DeleteAction(list));
    });
  }

  handleMove(srcData, list: TaskList) {
    switch (srcData.tag) {
      case 'task-item': {
        break;
      }
      case 'task-list': {
        const order = srcData.data.order;
        srcData.data.order = list.order;
        list.order = order;
        break;
      }
      default:
        break;
    }
  }
}
export interface TaskList {
  id?: string;
  name: string;
  projectId: string;
  order: number;
  taskIds?: string[];
}
