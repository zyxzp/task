import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Action, Store } from '@ngrx/store';


import * as actions from '../actions/user.actions';
import * as prjActions from '../actions/project.actions';
// import * as taskActions from '../actions/task.actions';
import * as fromRoot from '../reducers';
import { Task, User } from '../domain';
import { Observable, of } from 'rxjs';
import { UserService } from '../services/user.service';
import { switchMap, map, catchError } from 'rxjs/operators';

@Injectable()
export class UserEffects {
    /**
     *
     */
    @Effect()
    loadUsers$: Observable<Action> = this.actions$.pipe(
        ofType<actions.LoadUsersByPrjAction>(actions.ActionTypes.LOAD_USERS_BY_PRJ),
        switchMap(action => this.service$.getUsersByProject(action.payload).pipe(
            map(users => new actions.LoadUsersByPrjSuccessAction(users)),
            catchError(err => of(new actions.LoadUsersByPrjFailAction(JSON.stringify(err))))
        ))
    );

    @Effect()
    addUserProjectRef$: Observable<Action> = this.actions$.pipe(
        ofType<actions.AddUserProjectAction>(actions.ActionTypes.ADD_USER_PROJECT),
        switchMap(action => this.service$.addProjectRef(action.payload.user,action.payload.projectId).pipe(
            map(user => new actions.AddUserProjectSuccessAction(user)),
            catchError(err => of(new actions.AddUserProjectFailAction(JSON.stringify(err))))
        ))
    );


    @Effect()
    updateUserProjectRef$: Observable<Action> = this.actions$.pipe(
        ofType<actions.BatchUpdateUserProjectAction>(actions.ActionTypes.BATCH_UPDATE_USER_PROJECT),
        switchMap(action => this.service$.batchUpdateProjectRef(action.payload).pipe(
            map(users => new actions.BatchUpdateUserProjectSuccessAction(users)),
            catchError(err => of(new actions.BatchUpdateUserProjectFailAction(JSON.stringify(err))))
        ))
    );
    @Effect()
    deleteUserProjectRef$: Observable<Action> = this.actions$.pipe(
        ofType<actions.RemoveUserProjectAction>(actions.ActionTypes.REMOVE_USER_PROJECT),
        switchMap(action => this.service$.removeProjectRef(action.payload.user,action.payload.projectId).pipe(
            map(user => new actions.RemoveUserProjectSuccessAction(user)),
            catchError(err => of(new actions.RemoveUserProjectFailAction(JSON.stringify(err))))
        ))
    );
    @Effect()
    search$: Observable<Action> = this.actions$.pipe(
        ofType<actions.SearchUsersAction>(actions.ActionTypes.SEARCH_USERS_SUCCESS),
        switchMap(action => this.service$.searchUsers(action.payload).pipe(
            map(users => new actions.SearchUsersSuccessAction(users)),
            catchError(err => of(new actions.SearchUsersFailAction(JSON.stringify(err))))
        ))
    );

    /**
     * 任务列表的 Effects
     * @param actions$ 注入 action 数据流
     * @param service 注入任务列表服务
     * @param store$ 注入 redux store
     */
    constructor(private actions$: Actions,
        private service$: UserService,
        private store$: Store<fromRoot.State>) {
    }
}
