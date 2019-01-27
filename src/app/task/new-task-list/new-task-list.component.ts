import { Component, OnInit, Inject, ChangeDetectionStrategy } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-new-task-list',
  templateUrl: './new-task-list.component.html',
  styleUrls: ['./new-task-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NewTaskListComponent implements OnInit {

  form: FormGroup;
  title = '';
  constructor(@Inject(MAT_DIALOG_DATA) private data,
    private dialogRef: MatDialogRef<NewTaskListComponent>,
    private fb: FormBuilder) { }

  ngOnInit() {
    this.form = this.fb.group({
      name: [this.data.taskList ? this.data.taskList.name : '', Validators.required]
    });
    this.title = this.data.title;
  }
  onClick({value,valid},ev:Event){
    if(!valid){
      return ;
    }
    this.dialogRef.close(value);
  }

}
