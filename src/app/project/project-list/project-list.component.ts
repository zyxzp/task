import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';
import { NewProjectComponent } from '../new-project/new-project.component';
import { InviteComponent } from '../invite/invite.component';

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
    const dialogRef = this.dialog.open(NewProjectComponent);
    dialogRef.afterClosed().subscribe(res => console.log(res));
  }
  handleInvite(){
    this.dialog.open(InviteComponent);
  }
}
