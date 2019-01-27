import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Action, Store } from '@ngrx/store';


import * as actions from '../actions/task.actions';
import * as prjActions from '../actions/project.actions';
// import * as taskActions from '../actions/task.actions';
import * as fromRoot from '../reducers';
import { Task } from '../domain';
import { Observable, of } from 'rxjs';
import { TaskService } from '../services/task.service';
import { switchMap, map, catchError } from 'rxjs/operators';

@Injectable()
export class TaskEffects {
    /**
     *
     */
    @Effect()
    loadTasks$: Observable<Action> = this.actions$.pipe(
        ofType<actions.LoadAction>(actions.ActionTypes.LOAD),
        switchMap(action => this.service$.getByLists(action.payload).pipe(
            map(tasks => new actions.LoadSuccessAction(tasks)),
            catchError(err => of(new actions.LoadFailAction(JSON.stringify(err))))
        ))
    );

    @Effect()
    addTask$: Observable<Action> = this.actions$.pipe(
        ofType<actions.AddAction>(actions.ActionTypes.ADD),
        switchMap(action => this.service$.add(action.payload).pipe(
            map(task => new actions.AddSuccessAction(task)),
            catchError(err => of(new actions.AddFailAction(JSON.stringify(err))))
        ))
    );


    @Effect()
    updateTask$: Observable<Action> = this.actions$.pipe(
        ofType<actions.UpdateAction>(actions.ActionTypes.UPDATE),
        switchMap(action => this.service$.update(action.payload).pipe(
            map(task => new actions.UpdateSuccessAction(task)),
            catchError(err => of(new actions.UpdateFailAction(JSON.stringify(err))))
        ))
    );
    @Effect()
    deleteTask$: Observable<Action> = this.actions$.pipe(
        ofType<actions.DeleteAction>(actions.ActionTypes.DELETE),
        switchMap(action => this.service$.delete(action.payload).pipe(
            map(task => new actions.DeleteSuccessAction(task)),
            catchError(err => of(new actions.DeleteFailAction(JSON.stringify(err))))
        ))
    );
    @Effect()
    complete$: Observable<Action> = this.actions$.pipe(
        ofType<actions.CompleteAction>(actions.ActionTypes.COMPLETE),
        switchMap(action => this.service$.complete(action.payload).pipe(
            map(task => new actions.CompleteSuccessAction(task)),
            catchError(err => of(new actions.CompleteFailAction(JSON.stringify(err))))
        ))
    );
    @Effect()
    move$: Observable<Action> = this.actions$.pipe(
         ofType<actions.MoveAction>(actions.ActionTypes.MOVE),
         switchMap(action => this.service$.move(action.payload.taskId,action.payload.tasklistId).pipe(
             map(task => new actions.MoveSuccessAction(task)),
             catchError(err => of(new actions.MoveFailAction(JSON.stringify(err))))
         ))
     );
     moveAll$: Observable<Action> = this.actions$.pipe(
        ofType<actions.MoveAllAction>(actions.ActionTypes.MOVE_ALL),
        switchMap(action => this.service$.moveAll(action.payload.srcListId,action.payload.targetListId).pipe(
            map(tasks => new actions.MoveAllSuccessAction(tasks)),
            catchError(err => of(new actions.MoveAllFailAction(JSON.stringify(err))))
        ))
    );

    /**
     * 任务列表的 Effects
     * @param actions$ 注入 action 数据流
     * @param service 注入任务列表服务
     * @param store$ 注入 redux store
     */
    constructor(private actions$: Actions,
        private service$: TaskService,
        private store$: Store<fromRoot.State>) {
    }
}
