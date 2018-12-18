import { MatIconRegistry } from '@angular/material';
import { DomSanitizer } from '@angular/platform-browser';
export const loadSvgResources = (matIconRegistry: MatIconRegistry, domSanitizer: DomSanitizer) => {
    const imgDir='assets/img';
    const sidebarDir=`${imgDir}/sidebar`;
    const daysDir=`${imgDir}/days`;
    matIconRegistry.addSvgIcon('time', domSanitizer.bypassSecurityTrustResourceUrl('assets/svg/time.svg'));
    matIconRegistry.addSvgIcon('day', domSanitizer.bypassSecurityTrustResourceUrl(`${sidebarDir}/day.svg`));
    matIconRegistry.addSvgIcon('month', domSanitizer.bypassSecurityTrustResourceUrl(`${sidebarDir}/month.svg`));
    matIconRegistry.addSvgIcon('project', domSanitizer.bypassSecurityTrustResourceUrl(`${sidebarDir}/project.svg`));
    matIconRegistry.addSvgIcon('projects', domSanitizer.bypassSecurityTrustResourceUrl(`${sidebarDir}/projects.svg`));
    matIconRegistry.addSvgIcon('week', domSanitizer.bypassSecurityTrustResourceUrl(`${sidebarDir}/week.svg`));
    const days=[
        1,2,3,4,5,6,7,8,9,10,
        11,12,13,14,15,16,17,18,19,20,
        21,22,23,24,25,26,27,28,29,30,31
    ];
    days.forEach(d=>matIconRegistry.addSvgIcon(`day${d}`, domSanitizer.bypassSecurityTrustResourceUrl(`${daysDir}/day${d}.svg`)));

}