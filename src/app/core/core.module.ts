import { NgModule, SkipSelf, Optional } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { MatToolbarModule, MatIconModule, MatButtonModule, MatIconRegistry } from '@angular/material';
import { DomSanitizer } from '@angular/platform-browser';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { SiderbarComponent } from './siderbar/siderbar.component';
import { loadSvgResources } from '../utils/svg.util';
@NgModule({
  imports: [
    CommonModule,
    HttpClientModule,
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
