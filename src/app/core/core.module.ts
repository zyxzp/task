import { NgModule, SkipSelf, Optional } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { SharedModule } from '../shared/shared.module';
import { MatIconRegistry } from '@angular/material';
import { DomSanitizer } from '@angular/platform-browser';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { SiderbarComponent } from './siderbar/siderbar.component';
import { loadSvgResources } from '../utils/svg.util';
@NgModule({
  imports: [
    BrowserAnimationsModule,
    HttpClientModule,
    SharedModule,
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
  constructor(
    @Optional() @SkipSelf() parent: CoreModule,
    matIconRegistry: MatIconRegistry,
    domSanitizer: DomSanitizer) {
    if (parent) {
      throw new Error("模块已存在，不能再次加载");
    }
    loadSvgResources(matIconRegistry, domSanitizer);
  }

}
