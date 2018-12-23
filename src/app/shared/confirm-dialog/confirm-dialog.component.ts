import { Component, OnInit, Inject,ChangeDetectionStrategy } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-confirm-dialog',
  template: `
  <form>
  <h2 mat-dialog-title>{{title}}</h2>
  <div mat-dialog-content>
    {{content}}
  </div>
  <div mat-dialog-actions>
    <button type="button" mat-raised-button color="primary" (click)="onClick(true)">ok</button>
    <button type="button" mat-button mat-dialog-close (click)="onClick(false)">cancel</button>
  </div>
</form>
  `,
  styles: [``],
  changeDetection:ChangeDetectionStrategy.OnPush
})
export class ConfirmDialogComponent implements OnInit {

  title = "";
  content = "";
  constructor(@Inject(MAT_DIALOG_DATA) private data, private dialogRef: MatDialogRef<ConfirmDialogComponent>) { }

  ngOnInit() {
    this.title = this.data.title;
    this.content = this.data.content;
  }
  onClick(result: boolean) {
    this.dialogRef.close(result);
  }
}
