import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';
import { NewProjectComponent } from '../new-project/new-project.component';
import { InviteComponent } from '../invite/invite.component';
import { ConfirmDialogComponent } from 'src/app/shared/confirm-dialog/confirm-dialog.component';

@Component({
  selector: 'app-project-list',
  templateUrl: './project-list.component.html',
  styleUrls: ['./project-list.component.scss']
})
export class ProjectListComponent implements OnInit {

  projects = [
    {
      id: '1',
      name: '项目1',
      desc: '这是项目1',
      coverImg: '/assets/img/covers/1.jpg'
    }, {
      id: '2',
      name: '项目2',
      desc: '这是项目2',
      coverImg: '/assets/img/covers/2.jpg'
    }
  ];
  constructor(private dialog: MatDialog) { }

  ngOnInit() {
  }
  openNewProjectDiaglog() {
    const dialogRef = this.dialog.open(NewProjectComponent, { data: { title: '新建项目' } });
    dialogRef.afterClosed().subscribe(res => console.log(res));
  }
  handleEditProject(project) {
    const dialogRef = this.dialog.open(NewProjectComponent, { data: { title: '编辑项目', project: project } });
    dialogRef.afterClosed().subscribe(res => console.log(res));
  }
  handleInvite() {
    this.dialog.open(InviteComponent);
  }
  handleDelete(project) {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, { data: { title: '删除项目', content: '确认删除选中项目吗?' } });
    dialogRef.afterClosed().subscribe(res => console.log(res));
  }
}
