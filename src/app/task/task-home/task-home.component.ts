import { Component, OnInit, HostBinding, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { MatDialog } from '@angular/material';
import { NewTaskComponent } from '../new-task/new-task.component';
import { CopyTaskComponent } from '../copy-task/copy-task.component';
import { ConfirmDialogComponent } from 'src/app/shared/confirm-dialog/confirm-dialog.component';
import { NewTaskListComponent } from '../new-task-list/new-task-list.component';
import { slideToRight } from '../../anims/router.anim';
@Component({
  selector: 'app-task-home',
  templateUrl: './task-home.component.html',
  styleUrls: ['./task-home.component.scss'],
  animations: [slideToRight],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TaskHomeComponent implements OnInit {

  @HostBinding('@routeAnim') state;
  lists = [{
    id: 1,
    name: '待办',
    order:1,
    tasks: [{
      id: 1,
      desc: '任务一',
      completed: true,
      priority: 3,
      owner: {
        id: 1,
        name: 'zhangsan',
        avatar: 'avatars:svg-1'
      },
      dueDate: new Date()
    }, {
      id: 2,
      desc: '任务2',
      completed: false,
      priority: 2,
      owner: {
        id: 2,
        name: 'lisi',
        avatar: 'avatars:svg-2'
      },
      dueDate: new Date()
    }, {
      id: 3,
      priority: 1,
      desc: '任务3',
      completed: false,
      reminder: new Date(),
      owner: {
        id: 2,
        name: 'wangwu',
        avatar: 'avatars:svg-3'
      },
      dueDate: new Date()
    }]
  }, {
    id: 2,
    name: '正在进行',
    order:2,
    tasks: [{
      id: 2,
      desc: '任务2',
      priority: 1,
      completed: false,
      owner: {
        id: 2,
        name: 'lisi',
        avatar: 'avatars:svg-2'
      },
      dueDate: new Date()
    }, {
      id: 3,
      priority: 1,
      desc: '任务3',
      completed: false,
      owner: {
        id: 2,
        name: 'wangwu',
        avatar: 'avatars:svg-3'
      },
      dueDate: new Date()
    }]
  }, {
    id: 3,
    name: '已完成',
    order:3,
    tasks: [{
      id: 1,
      completed: false,
      desc: '任务一',
      priority: 3,
      owner: {
        id: 1,
        name: 'zhangsan',
        avatar: 'avatars:svg-1'
      },
      dueDate: new Date()
    }, {
      id: 2,
      desc: '任务2',
      completed: false,
      priority: 1,
      owner: {
        id: 2,
        name: 'lisi',
        avatar: 'avatars:svg-2'
      },
      dueDate: new Date()
    }]
  }];
  constructor(private dialog: MatDialog,
    private cd: ChangeDetectorRef) { }

  ngOnInit() {
  }
  launchNewTaskDialog() {
    this.dialog.open(NewTaskComponent, { data: { title: '新建任务' } });
  }
  launchCopyAllTaskDialog() {
    this.dialog.open(CopyTaskComponent, { data: { lists: this.lists } });
  }
  launchUpdateTaskDialog(task) {
    this.dialog.open(NewTaskComponent, { data: { title: '修改任务', task: task } });
  }
  launchDeleteList(list) {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, { data: { title: '删除列表', content: '确认删除选中列表吗?' } });
    dialogRef.afterClosed().subscribe(res => console.log(res));
  }


  openNewListDialog() {
    const dialogRef = this.dialog.open(NewTaskListComponent, { data: { title: '新建列表' } });
    dialogRef.afterClosed().subscribe(res => console.log(res));
  }
  launchEditList(list) {
    const dialogRef = this.dialog.open(NewTaskListComponent, { data: { title: '修改列表', list: list } });
    dialogRef.afterClosed().subscribe(res => console.log(res));
  }
  handleMove(srcData, taskList: TaskList) {
    switch (srcData.tag) {
      case 'task-item': {
        break;
      }
      case 'task-list': {
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
