import { Injectable } from '@angular/core';
import { of, Observable, from } from 'rxjs';
import { Action, Store, select } from '@ngrx/store';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { map, catchError, switchMap, mergeMap, tap, withLatestFrom } from 'rxjs/operators';
import * as actions from '../actions/project.actions';
import * as userActions from '../actions/user.actions';
import * as taskListActions from '../actions/task-list.actions';

import { Router } from '@angular/router';
import { ProjectService } from '../services/project.service';
import { Project } from '../domain';
import * as fromRoot from '../reducers';

@Injectable()
export class ProjectEffects {


    constructor(
        private actions$: Actions<Action>,
        private projectService: ProjectService,
        private router: Router,
        private store: Store<fromRoot.State>
    ) { }

    @Effect()
    load$: Observable<Action> = this.actions$
        .pipe(
            ofType<actions.LoadAction>(actions.ActionTypes.LOAD),
            withLatestFrom(this.store.pipe(select(fromRoot.getAuth))),
            switchMap(([_, auth]) => this.projectService.getProject(auth.user.id)
                .pipe(
                    map(projects => new actions.LoadSuccessAction(projects)),
                    catchError((err) => of(new actions.LoadFailAction(JSON.stringify(err)))))
            )
        );

    @Effect()
    loadSuccess$: Observable<Action> = this.actions$
        .pipe(
            ofType<actions.LoadSuccessAction>(actions.ActionTypes.LOAD_SUCCESS),
            switchMap((action) => from(action.payload).pipe(map(p => p.id))),
            map(projectId => new userActions.LoadUsersByPrjAction(projectId))
        );
    @Effect()
    addProject$: Observable<Action> = this.actions$
        .pipe(
            ofType<actions.AddAction>(actions.ActionTypes.ADD),
            withLatestFrom(this.store.pipe(select(fromRoot.getAuth))),
            switchMap(([action, auth]) => {
                const added = { ...action.payload, members: [`${auth.user.id}`] };
                return this.projectService.add(added).pipe(
                    map(project => new actions.AddSuccessAction(project)),
                    catchError((err) => of(new actions.AddFailAction(JSON.stringify(err))))
                )
            })
        );
    @Effect()
    updateProject$: Observable<Action> = this.actions$
        .pipe(
            ofType<actions.UpdateAction>(actions.ActionTypes.UPDATE),
            switchMap((action) => this.projectService.update(action.payload)
                .pipe(
                    map(project => new actions.UpdateSuccessAction(project)),
                    catchError((err) => of(new actions.UpdateFailAction(JSON.stringify(err))))
                )
            )
        );
    @Effect()
    deleteProject$: Observable<Action> = this.actions$
        .pipe(
            ofType<actions.DeleteAction>(actions.ActionTypes.DELETE),
            switchMap((action) => this.projectService.delete(action.payload)
                .pipe(
                    map(project => new actions.DeleteSuccessAction(project)),
                    catchError((err) => of(new actions.DeleteFailAction(JSON.stringify(err))))
                )
            )
        );
    @Effect()
    selectProject$: Observable<Action> = this.actions$
        .pipe(
            ofType<actions.SelectProjectAction>(actions.ActionTypes.SELECT_PROJECT),
            map((action) => {
                this.router.navigate([`/tasklists/${action.payload.id}`]);
                return new taskListActions.LoadAction(action.payload.id);
            })
        );
    @Effect()
    loadTaskLists$: Observable<Action> = this.actions$
        .pipe(
            ofType<actions.SelectProjectAction>(actions.ActionTypes.SELECT_PROJECT),
            map((action) => new taskListActions.LoadAction(action.payload.id))
        );
    @Effect()
    invite$: Observable<Action> = this.actions$
        .pipe(
            ofType<actions.InviteAction>(actions.ActionTypes.INVITE),
            switchMap((action) => {
                debugger
                return this.projectService.invite(action.payload.projectId, action.payload.members)
                    .pipe(
                        map(project => new actions.InviteSuccessAction(project)),
                        catchError((err) => of(new actions.InviteFailAction(JSON.stringify(err))))
                    )
            }
            )
        );
    @Effect()
    addUserProject$: Observable<Action> = this.actions$
        .pipe(
            ofType<actions.AddSuccessAction>(actions.ActionTypes.ADD_SUCCESS),
            map((action) => action.payload.id),
            withLatestFrom(this.store.pipe(
                select(fromRoot.getAuth),
                map(auth => auth.user)),
                (projectId, user) => {
                    return new userActions.AddUserProjectAction(
                        { user: user, projectId: projectId })
                },
            )
        );
    @Effect()
    updateUserProject$: Observable<Action> = this.actions$
        .pipe(
            ofType<actions.InviteSuccessAction>(actions.ActionTypes.INVITE_SUCCESS),
            map((action) => new userActions.BatchUpdateUserProjectAction(action.payload)),
        );
    @Effect()
    removeUserProject$: Observable<Action> = this.actions$
        .pipe(
            ofType<actions.DeleteSuccessAction>(actions.ActionTypes.DELETE_SUCCESS),
            map((action) => action.payload.id),
            withLatestFrom(this.store.pipe(
                select(fromRoot.getAuth),
                map(auth => auth.user)),
                (projectId, user) => {
                    return new userActions.RemoveUserProjectAction(
                        { user: user, projectId: projectId })
                },
            )
        );
}
