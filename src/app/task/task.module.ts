import { NgModule } from '@angular/core';
import { TaskRoutingModule } from './task-routing.module';
import { TaskHomeComponent } from './task-home/task-home.component';
import { TaskHeaderComponent } from './task-header/task-header.component';
import { TaskItemComponent } from './task-item/task-item.component';
import { TaskListComponent } from './task-list/task-list.component';
import { SharedModule } from '../shared/shared.module';
import { NewTaskComponent } from './new-task/new-task.component';
import { CopyTaskComponent } from './copy-task/copy-task.component';

@NgModule({
  imports: [
    TaskRoutingModule,
    SharedModule
  ],
  declarations: [
    TaskHomeComponent,
    TaskHeaderComponent,
    TaskItemComponent,
    TaskListComponent,
    NewTaskComponent,
    CopyTaskComponent
  ],

  entryComponents: [NewTaskComponent, CopyTaskComponent]
})
export class TaskModule { }
