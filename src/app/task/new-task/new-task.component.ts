import { Component, OnInit, Inject, ChangeDetectionStrategy } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';


@Component({
  selector: 'app-new-task',
  templateUrl: './new-task.component.html',
  styleUrls: ['./new-task.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
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

  form: FormGroup;
  title: string = "";
  constructor(@Inject(MAT_DIALOG_DATA) private data,
    private dialogRef: MatDialogRef<NewTaskComponent>,
    private fb: FormBuilder
  ) { }

  ngOnInit() {
    this.title = this.data.title;
    this.form = this.fb.group({
      desc: [this.data.task?this.data.task.desc:'',Validators.required],
      priority: [this.data.task?this.data.task.priority:3,Validators.required],
      owner: [this.data.task?[this.data.task.owner]:[this.data.owner]],
      followers: [this.data.task?[this.data.task.participants]:[]],
      reminder: [this.data.task?this.data.task.reminder:''],
      dueDate: [this.data.task?this.data.task.dueDate:''],
      remark: [this.data.task?this.data.task.remark:''],
    });
  }

  onClick({ value, valid }, ev: Event) {
    if (!valid) { return false; }
    this.dialogRef.close({
      ...value,
      ownerId:value.owner.length>0?value.owner[0].id:null,
      participantIds:value.followers.map(f=>f.id)
    });
  }
}
