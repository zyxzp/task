import { trigger, state, transition, style, animate, group } from '@angular/animations';

export const slideToRight = trigger('routeAnim', [
    state('void', style({'width': '100%', 'height': '100%'})),
    state('*', style({'width': '100%', 'height': '100%'})),
    transition(':enter', [//void=>* 进场动画
      style({transform: 'translateX(-100%)', opacity: 0}),
      group([
        animate('.5s ease-in-out', style({transform: 'translateX(0)'})),
        animate('.3s ease-in', style({opacity: 1})),
      ])
    ]),
    transition(':leave', [//*=>void 离场动画 简写 :leave
      style({transform: 'translateX(0)', opacity: 1}),
      group([
        animate('.5s ease-in-out', style({transform: 'translateX(100%)'})),
        animate('.3s ease-in', style({opacity: 0})),
      ])
    ]),
  ]);
  export const defaultRouteAnim = slideToRight;
  