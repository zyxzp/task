import { Component, OnInit, HostBinding, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { MatDialog } from '@angular/material';
import { NewProjectComponent } from '../new-project/new-project.component';
import { InviteComponent } from '../invite/invite.component';
import { ConfirmDialogComponent } from 'src/app/shared/confirm-dialog/confirm-dialog.component';
import { slideToRight } from '../../anims/router.anim';
import { listAnimation } from '../../anims/list.anim';
import { ProjectService } from 'src/app/services/project.service';
import { Project } from 'src/app/domain';
@Component({
  selector: 'app-project-list',
  templateUrl: './project-list.component.html',
  styleUrls: ['./project-list.component.scss'],
  animations: [slideToRight, listAnimation],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProjectListComponent implements OnInit {

  projects: Project[] = [];
  @HostBinding('@routeAnim') state;
  constructor(private dialog: MatDialog,
    private cd: ChangeDetectorRef,
    private projectService: ProjectService) { }

  ngOnInit() {
    this.projectService.getProject("1")
      .subscribe(res => { 
        this.projects = res; 
        this.cd.markForCheck();
      });
  }
  openNewProjectDiaglog() {
    const dialogRef = this.dialog.open(NewProjectComponent, { data: { title: '新建项目' } });
    dialogRef.afterClosed().subscribe(res => {
      console.log(res);
      this.projects = [...this.projects, { id: '3', name: 'a new project', desc: 'new one', coverImg: '/assets/img/covers/2.jpg' }];
      this.cd.markForCheck();
    })
  }
  handleEditProject(project) {
    const dialogRef = this.dialog.open(NewProjectComponent, { data: { title: '编辑项目', project: project } });
    dialogRef.afterClosed().subscribe(res => {
      console.log(res);
    });
  }
  handleInvite() {
    this.dialog.open(InviteComponent);
  }
  handleDelete(project) {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, { data: { title: '删除项目', content: '确认删除选中项目吗?' } });
    dialogRef.afterClosed().subscribe(res => {
      console.log(res);
      this.projects = this.projects.filter(p => p.id != project.id);
      this.cd.markForCheck();
    });
  }
}
