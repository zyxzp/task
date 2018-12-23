import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-task-header',
  templateUrl: './task-header.component.html',
  styleUrls: ['./task-header.component.scss']
})
export class TaskHeaderComponent implements OnInit {

  @Input() header: string;
  @Output() newTask = new EventEmitter<void>();
  @Output() moveAll = new EventEmitter<void>();
  constructor() { }

  ngOnInit() {
  }
  newTaskClick() {
    this.newTask.emit();
  }
  moveAllClick(){

    this.moveAll.emit();

  }

}
