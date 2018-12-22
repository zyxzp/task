import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-task-home',
  templateUrl: './task-home.component.html',
  styleUrls: ['./task-home.component.scss']
})
export class TaskHomeComponent implements OnInit {

  lists=[{
    id:1,
    name:'待办',
    tasks:[{
      id:1,
      desc:'任务一',
      owner:{
        id:1,
        name:'zhangsan',
        avatar:'avatar:svg-1'
      },
      dueDate:new Date()
    },{
      id:2,
      desc:'任务2',
      owner:{
        id:2,
        name:'lisi',
        avatar:'avatar:svg-2'
      },
      dueDate:new Date()
    },{
      id:3,
      desc:'任务3',
      owner:{
        id:2,
        name:'wangwu',
        avatar:'avatar:svg-3'
      },
      dueDate:new Date()
    }]
  },{
    id:2,
    name:'正在进行',
    tasks:[{
      id:2,
      desc:'任务2',
      owner:{
        id:2,
        name:'lisi',
        avatar:'avatar:svg-2'
      },
      dueDate:new Date()
    },{
      id:3,
      desc:'任务3',
      owner:{
        id:2,
        name:'wangwu',
        avatar:'avatar:svg-3'
      },
      dueDate:new Date()
    }]
  },{
    id:3,
    name:'已完成',
    tasks:[{
      id:1,
      desc:'任务一',
      owner:{
        id:1,
        name:'zhangsan',
        avatar:'avatar:svg-1'
      },
      dueDate:new Date()
    },{
      id:2,
      desc:'任务2',
      owner:{
        id:2,
        name:'lisi',
        avatar:'avatar:svg-2'
      },
      dueDate:new Date()
    }]
  }];
  constructor() { }

  ngOnInit() {
  }

}
