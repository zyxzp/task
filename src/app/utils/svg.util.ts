import { MatIconRegistry } from '@angular/material';
import { DomSanitizer } from '@angular/platform-browser';
export const loadSvgResources = (matIconRegistry: MatIconRegistry, domSanitizer: DomSanitizer) => {
    matIconRegistry.addSvgIcon('time', domSanitizer.bypassSecurityTrustResourceUrl('assets/svg/time.svg'));
}