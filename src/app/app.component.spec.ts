import { TestBed, async } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AppComponent } from './app.component';
import { CoreModule } from './core/core.module';
import { RouterModule } from '@angular/router';
import { MatSidenavModule } from '@angular/material';
import { APP_BASE_HREF } from '@angular/common';
import { AppStoreModule } from './reducers';
import { CounterComponent } from './counter/counter.component';
import { AppEffectsModule } from './effects';
describe('AppComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        MatSidenavModule,
        RouterModule.forRoot([]),
        CoreModule,
        AppStoreModule,
        AppEffectsModule,
        RouterTestingModule
      ],
      declarations: [
        AppComponent,
        CounterComponent
      ],
      providers:[{
        provide:APP_BASE_HREF,
        useValue:'/'
      }]
    }).compileComponents();
  }));

  it('应该创建用例', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  });



  it('应该包含一个 .site 的元素', () => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('.site')).toBeTruthy();
  });
});
