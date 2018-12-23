import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-new-task',
  templateUrl: './new-task.component.html',
  styleUrls: ['./new-task.component.scss']
})
export class NewTaskComponent implements OnInit {

  priorities = [
    {
      value: 1,
      label: '紧急'
    }, {
      value: 2,
      label: '重要'
    }, {
      value: 3,
      label: '普通'
    }
  ];
  title: string = "";
  constructor(@Inject(MAT_DIALOG_DATA) private data) { }

  ngOnInit() {
    this.title = this.data.title;
    console.log(this.data.task);
  }


}
