import { NgModule } from '@angular/core';
import { TaskRoutingModule } from './task-routing.module';
import { TaskHomeComponent } from './task-home/task-home.component';
import { TaskHeaderComponent } from './task-header/task-header.component';
import { TaskItemComponent } from './task-item/task-item.component';
import { TaskListComponent } from './task-list/task-list.component';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [TaskHomeComponent, TaskHeaderComponent, TaskItemComponent, TaskListComponent],
  imports: [
    TaskRoutingModule,
    SharedModule
  ]
})
export class TaskModule { }
