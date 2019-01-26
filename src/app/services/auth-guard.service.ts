import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { Store } from '@ngrx/store';
import * as fromRoot from '../reducers';
import { map, defaultIfEmpty } from 'rxjs/operators';

@Injectable()
export class AuthGuardService implements CanActivate {
    constructor(private store$: Store<fromRoot.State>,
        private router: Router) {

    }
    canActivate(
        route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot
    ): Observable<boolean> {
        // this.store$.pipe(select(fromRoot.getAuthState),
        //     map(auth => {
        //         const result = auth.token != null && auth.token != undefined;
        //         if (result) {
        //             this.router.navigate(['/login']);
        //         }
        //         return of(result);
        //     }),
        //     defaultIfEmpty(of(false))
        //     )
        return of(false);
    }
}

