import { Component, OnInit, Inject, ChangeDetectionStrategy } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-new-project',
  templateUrl: './new-project.component.html',
  styleUrls: ['./new-project.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NewProjectComponent implements OnInit {
  form: FormGroup;
  title: string = "";
  coverImgs = [];
  constructor(@Inject(MAT_DIALOG_DATA) private data,
    private dialogRef: MatDialogRef<NewProjectComponent>,
    private fb: FormBuilder) { }

  ngOnInit() {
    this.coverImgs=this.data.thumbnails;
    if (this.data.project) {//修改
      this.form = this.fb.group({
        name: [this.data.project.name, Validators.required],
        desc: [this.data.project.desc],
        coverImg: [this.data.project.coverImg]
      });
      this.title = "修改项目";
    } else {
      this.form = this.fb.group({
        name: ['', Validators.required],
        desc: [],
        coverImg: [this.data.coverImg]
      });
      this.title = "创建项目";
    }
  }
  onSubmit({ value, valid }, ev: Event) {
    ev.preventDefault();
    if (!valid) {
      return;
    }
    this.dialogRef.close(value);

  }
}
