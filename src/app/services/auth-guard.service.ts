import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { Store, select } from '@ngrx/store';
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
        return this.checkAuth();
    }

    checkAuth(): Observable<boolean> {
        return this.store$.pipe(
            select(fromRoot.getAuth),
            map(auth => {
                const result = auth.token !== undefined && auth.token !== null;
                if (!result) {
                    this.router.navigate(['/login']);
                    //   this.store$.dispatch(go(['/login']));
                }
                return result;
            }),
            defaultIfEmpty(false)
        );

    }
}

