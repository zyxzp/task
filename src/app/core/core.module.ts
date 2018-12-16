import { NgModule, SkipSelf, Optional } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatToolbarModule ,MatIconModule,MatButtonModule} from '@angular/material';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { SiderbarComponent } from './siderbar/siderbar.component';

@NgModule({
  imports: [
    CommonModule,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
  ],
  declarations: [
    HeaderComponent,
    FooterComponent,
    SiderbarComponent,
  ],
  exports: [HeaderComponent,
    FooterComponent,
    SiderbarComponent,
  ]
})
export class CoreModule {
  //core模块只加载一次，再次加载时抛出异常SSSSSS
  constructor(@Optional() @SkipSelf() parent: CoreModule) {
    if (parent) {
      throw new Error("模块已存在，不能再次加载");
    }
  }

}
