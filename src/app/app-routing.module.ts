import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuardService } from './services/services.module';
const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  {
    path: 'projects',
    loadChildren: './project#ProjectModule',
    pathMatch: 'full',
    canActivate:[AuthGuardService]
  },
  {
    path: 'tasklists/:id',
    loadChildren: './task#TaskModule',
    pathMatch: 'full',
    canActivate:[AuthGuardService]
  },
  {
    path: 'mycal/:view',
    loadChildren: './my-calendar#MyCalendarModule',
    pathMatch: 'full',
    canActivate:[AuthGuardService]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
