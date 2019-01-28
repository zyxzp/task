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
import { Observable, of } from 'rxjs';
import { pluck, take, filter, map, switchMap } from 'rxjs/operators';
import * as taskListActions from '../../actions/task-list.actions';
import * as taskActions from '../../actions/task.actions';
import { TaskList, Task } from 'src/app/domain';

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
    this.lists$ = this.store.pipe(select(fromRoot.getTasksByLists));
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
    ).subscribe((task: Task) => {
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
      take(1)
    ).subscribe(res => {
      this.store.dispatch(new taskActions.UpdateAction({ ...res, id: task.id }))
    });


  }
  getTaskByIds(taskIds) {
    return this.store.pipe(select(fromRoot.getTaskByIds(taskIds)));
  }
  //列表相关操作
  //新建任务列表
  openNewListDialog(ev: Event) {
    const dialogRef = this.dialog.open(NewTaskListComponent, { data: { title: '新建列表' } });
    dialogRef.afterClosed().pipe(
      take(1)
    ).subscribe(res => {
      this.store.dispatch(new taskListActions.AddAction({
        ...res,
        projectId: this.projectId$.pipe(map(val => val))
      }));
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
        this.store.dispatch(new taskActions.MoveAction(
          { taskId: srcData.data.id, tasklistId: list.id }
        ));
        break;
      }
      case 'task-list': {
        this.store.dispatch(new taskListActions.SwapAction({ src: srcData.data, target: list }));
        break;
      }
      default:
        break;
    }
  }
}
