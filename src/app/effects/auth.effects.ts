import { Injectable } from '@angular/core';
import { of, Observable } from 'rxjs';
import { Action } from '@ngrx/store';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { map, catchError, switchMap, filter, mergeMap, tap } from 'rxjs/operators';
import * as actions from '../actions/auth.actions';
import { Auth, User } from '../domain';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

@Injectable()
export class AuthEffects {


    constructor(
        private actions$: Actions<Action>,
        private authService: AuthService,
        private router: Router
    ) { }

    @Effect()
    login$ = this.actions$
        .pipe(
            ofType<actions.LoginAction>(actions.ActionTypes.LOGIN),
            mergeMap(action => this.authService.login(action.payload.email, action.payload.password)
                .pipe(
                    map(auth => new actions.LoginSuccessAction(auth)),
                    catchError((err) => of(new actions.LoginFailAction(JSON.stringify(err))))
                )
            )
        );
    @Effect()
    register$ = this.actions$
        .pipe(
            ofType<actions.RegisterAction>(actions.ActionTypes.REGISTER),
            switchMap(action => this.authService.register(action.payload)
                .pipe(
                    map(auth => { new actions.RegisterSuccessAction(auth) }),
                    catchError((err) => of(new actions.RegisterFailAction(JSON.stringify(err))))
                )
            )
        );
    @Effect()
    logout$ = this.actions$
        .pipe(
            ofType<actions.LogoutAction>(actions.ActionTypes.LOGOUT),
            tap(() => {
                debugger
                this.router.navigate(['/']);
            }
            )
        );
}
