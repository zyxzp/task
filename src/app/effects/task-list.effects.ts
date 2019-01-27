import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Action, Store } from '@ngrx/store';


import * as actions from '../actions/task-list.actions';
import * as prjActions from '../actions/project.actions';
import * as taskActions from '../actions/task.actions';
import * as fromRoot from '../reducers';
import { Task, TaskList } from '../domain';
import { Observable, of } from 'rxjs';
import { TaskListService } from '../services/task-list.service';
import { switchMap, map, catchError } from 'rxjs/operators';

@Injectable()
export class TaskListEffects {
    /**
     *
     */
    @Effect()
    loadTaskLists$: Observable<Action> = this.actions$.pipe(
        ofType<actions.LoadAction>(actions.ActionTypes.LOAD),
        switchMap(action => this.service$.get(action.payload).pipe(
            map(taskLists => new actions.LoadSuccessAction(taskLists)),
            catchError(err => of(new actions.LoadFailAction(JSON.stringify(err))))
        ))
    );

    @Effect()
    addTaskList$: Observable<Action> = this.actions$.pipe(
        ofType<actions.AddAction>(actions.ActionTypes.ADD),
        switchMap(action => this.service$.add(action.payload).pipe(
            map(taskList => new actions.AddSuccessAction(taskList)),
            catchError(err => of(new actions.AddFailAction(JSON.stringify(err))))
        ))
    );


    @Effect()
    updateTaskList$: Observable<Action> = this.actions$.pipe(
        ofType<actions.UpdateAction>(actions.ActionTypes.UPDATE),
        switchMap(action => this.service$.update(action.payload).pipe(
            map(taskList => new actions.UpdateSuccessAction(taskList)),
            catchError(err => of(new actions.UpdateFailAction(JSON.stringify(err))))
        ))
    );
    @Effect()
    deleteTaskList$: Observable<Action> = this.actions$.pipe(
        ofType<actions.DeleteAction>(actions.ActionTypes.DELETE),
        switchMap(action => this.service$.delete(action.payload).pipe(
            map(taskList => new actions.DeleteSuccessAction(taskList)),
            catchError(err => of(new actions.DeleteFailAction(JSON.stringify(err))))
        ))
    );
    //   @Effect()
    //   removeTaskList$: Observable<Action> = this.actions$
    //     .ofType(actions.ActionTypes.DELETE)
    //     .map(toPayload)
    //     .switchMap(taskList => this.service$
    //       .del(taskList)
    //       .map(tl => new actions.DeleteTaskListSuccessAction(tl))
    //       .catch(err => of(new actions.DeleteTaskListFailAction(JSON.stringify(err))))
    //     );

    //   @Effect()
    //   removeTasksInList$: Observable<Action> = this.actions$
    //     .ofType(actions.ActionTypes.DELETE_SUCCESS)
    //     .map(toPayload)
    //     .switchMap((taskList: TaskList) => {
    //       return this.store$.select(fromRoot.getTasks)
    //         .switchMap((tasks: Task[]) =>
    //           Observable.from(tasks.filter(t => t.taskListId === taskList.id)))
    //         .map(task => new taskActions.DeleteTaskAction(task));
    //     });

    //   @Effect()
    //   initializeTaskLists$: Observable<Action> = this.actions$
    //     .ofType(actions.ActionTypes.INITIALIZE)
    //     .map(toPayload)
    //     .switchMap(prj => {
    //       return this.service$.initializeTaskLists(prj)
    //         .map(project => new actions.InitTaskListsSuccessAction(project))
    //         .catch(err => of(new actions.InitTaskListsFailAction(JSON.stringify(err))));
    //     });

    //   @Effect()
    //   updateProjectRef$: Observable<Action> = this.actions$
    //     .ofType(actions.ActionTypes.INITIALIZE_SUCCESS)
    //     .map(toPayload)
    //     .map(prj => new prjActions.UpdateListsAction(prj));

    //   @Effect()
    //   swapOrder$: Observable<Action> = this.actions$
    //     .ofType(actions.ActionTypes.SWAP_ORDER)
    //     .map(toPayload)
    //     .switchMap(({src, target}) =>
    //       this.service$.swapOrder(src, target)
    //         .map(tls => new actions.SwapOrderSuccessAction(tls))
    //         .catch(err => of(new actions.SwapOrderFailAction(err)))
    //     );

      @Effect()
      loadTasksInList$: Observable<Action> = this.actions$.pipe(
        ofType<actions.LoadSuccessAction>(actions.ActionTypes.LOAD_SUCCESS),
        map(action => new taskActions.LoadAction(action.payload))
      );

    /**
     * 任务列表的 Effects
     * @param actions$ 注入 action 数据流
     * @param service 注入任务列表服务
     * @param store$ 注入 redux store
     */
    constructor(private actions$: Actions,
        private service$: TaskListService,
        private store$: Store<fromRoot.State>) {
    }
}
