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
import { pluck, take, filter, map, switchMap } from 'rxjs/operators';
import * as taskListActions from '../../actions/task-list.actions';
import * as taskActions from '../../actions/task.actions';
import { Task } from 'src/app/domain';
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
    this.lists$ = this.store.pipe(select(fromRoot.getTasksByLists))
  }

  ngOnInit() {
  }

  launchNewTaskDialog(list, ev: Event) {
    const user$ = this.store.pipe(select(fromRoot.getAuth), map(auth => auth.user));
    user$.pipe(
      take(1),
      map(user => this.dialog.open(NewTaskComponent, { data: { title: '新建任务', owner: user } })),
      switchMap(dialogRef => dialogRef.afterClosed().pipe(
        take(1),
        filter(n => n)
      ))
    ).subscribe((task) => {
      this.store.dispatch(new taskActions.AddAction(
        {
          ...task,
          completed: false,
          taskListId: list.id,
          createDate: new Date
        }));
    });
  }
  launchCopyAllTaskDialog(list) {
    this.lists$.pipe(
      map(l => l.filter(n => n.id != list.id)),
      map(li => this.dialog.open(CopyTaskComponent, { data: { lists: li } })),
      switchMap(dialogRef => dialogRef.afterClosed().pipe(
        take(1),
        filter(n => n)
      ))
    ).subscribe((val: string) => {
      this.store.dispatch(new taskActions.MoveAllAction({ srcListId: list.id, targetListId: val }))
  });

}
launchUpdateTaskDialog(task) {
  const dialogRef = this.dialog.open(NewTaskComponent, { data: { title: '修改任务', task: task } });
  dialogRef.afterClosed().pipe(
    take(1),
    filter(n => n)
  ).subscribe(val => {
    this.store.dispatch(new taskActions.UpdateAction({ ...task, ...val }));
  });

}

//列表相关操作
//新建任务列表
openNewListDialog(ev: Event) {
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
