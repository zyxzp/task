import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';
import { NewTaskComponent } from '../new-task/new-task.component';
import { CopyTaskComponent } from '../copy-task/copy-task.component';

@Component({
  selector: 'app-task-home',
  templateUrl: './task-home.component.html',
  styleUrls: ['./task-home.component.scss']
})
export class TaskHomeComponent implements OnInit {

  lists = [{
    id: 1,
    name: '待办',
    tasks: [{
      id: 1,
      desc: '任务一',
      completed: true,
      priority: 3,
      owner: {
        id: 1,
        name: 'zhangsan',
        avatar: 'avatar:svg-1'
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
        avatar: 'avatar:svg-2'
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
        avatar: 'avatar:svg-3'
      },
      dueDate: new Date()
    }]
  }, {
    id: 2,
    name: '正在进行',
    tasks: [{
      id: 2,
      desc: '任务2',
      priority: 1,
      completed: false,
      owner: {
        id: 2,
        name: 'lisi',
        avatar: 'avatar:svg-2'
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
        avatar: 'avatar:svg-3'
      },
      dueDate: new Date()
    }]
  }, {
    id: 3,
    name: '已完成',
    tasks: [{
      id: 1,
      completed: false,
      desc: '任务一',
      priority: 3,
      owner: {
        id: 1,
        name: 'zhangsan',
        avatar: 'avatar:svg-1'
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
        avatar: 'avatar:svg-2'
      },
      dueDate: new Date()
    }]
  }];
  constructor(private dialog: MatDialog) { }

  ngOnInit() {
  }
  launchNewTaskDialog() {
    this.dialog.open(NewTaskComponent);
  }
  launchCopyAllTaskDialog() {
    this.dialog.open(CopyTaskComponent,{data:{lists:this.lists}});
  }

}
