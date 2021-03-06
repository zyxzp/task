import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { CoreModule } from './core/core.module';
import { SharedModule } from './shared/shared.module';
import { AppComponent } from './app.component';
import { LoginModule } from './login/login.module';
import { ProjectModule } from './project';
import { TaskModule } from './task';
import { AppStoreModule } from './reducers';
import { CounterComponent } from './counter/counter.component';
import { AppEffectsModule } from './effects';

@NgModule({
  declarations: [
    AppComponent,
    CounterComponent
  ],
  imports: [
    BrowserModule,
    CoreModule,
    SharedModule,
    LoginModule,
    AppStoreModule,
    AppEffectsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
