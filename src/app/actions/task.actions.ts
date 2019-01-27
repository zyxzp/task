import { Action } from '@ngrx/store';
import { Task } from '../domain';
import { TaskList } from '../task/task-home/task-home.component';


export enum ActionTypes {
    LOAD = '[Task Component] Load',
    LOAD_SUCCESS = '[Task Component] Load success',
    LOAD_FAIL = '[Task Component] Load fail',

    ADD = '[Task Component] Add',
    ADD_SUCCESS = '[Task Component] Add success',
    ADD_FAIL = '[Task Component] Add fail',

    UPDATE = '[Task Component] Update',
    UPDATE_SUCCESS = '[Task Component] Update success',
    UPDATE_FAIL = '[Task Component] Update fail',

    DELETE = '[Task Component] Delete',
    DELETE_SUCCESS = '[Task Component] Delete success',
    DELETE_FAIL = '[Task Component] Delete fail',

    MOVE = '[Task Component] Move',
    MOVE_SUCCESS = '[Task Component] Move success',
    MOVE_FAIL = '[Task Component] Move fail',


    MOVE_ALL = '[Task Component] Move all',
    MOVE_ALL_SUCCESS = '[Task Component] Move all success',
    MOVE_ALL_FAIL = '[Task Component] Move all fail',

    COMPLETE = '[Task Component] Complete ',
    COMPLETE_SUCCESS = '[Task Component] Complete  success',
    COMPLETE_FAIL = '[Task Component] Complete  fail',
}

export class LoadAction implements Action {
    readonly type = ActionTypes.LOAD;
    constructor(public payload: TaskList[]) { }
}

export class LoadSuccessAction implements Action {
    readonly type = ActionTypes.LOAD_SUCCESS;
    constructor(public payload: Task[]) { }
}

export class LoadFailAction implements Action {
    readonly type = ActionTypes.LOAD_FAIL;
    constructor(public payload: string) { }
}

export class AddAction implements Action {
    readonly type = ActionTypes.ADD;
    constructor(public payload: Task) { }
}

export class AddSuccessAction implements Action {
    readonly type = ActionTypes.ADD_SUCCESS;
    constructor(public payload: Task) { }
}

export class AddFailAction implements Action {
    readonly type = ActionTypes.ADD_FAIL;
    constructor(public payload: string) { }
}

export class UpdateAction implements Action {
    readonly type = ActionTypes.UPDATE;
    constructor(public payload: Task) { }
}

export class UpdateSuccessAction implements Action {
    readonly type = ActionTypes.UPDATE_SUCCESS;
    constructor(public payload: Task) { }
}

export class UpdateFailAction implements Action {
    readonly type = ActionTypes.UPDATE_FAIL;
    constructor(public payload: string) { }
}


export class DeleteAction implements Action {
    readonly type = ActionTypes.DELETE;
    constructor(public payload: Task) { }
}

export class DeleteSuccessAction implements Action {
    readonly type = ActionTypes.DELETE_SUCCESS;
    constructor(public payload: Task) { }
}

export class DeleteFailAction implements Action {
    readonly type = ActionTypes.DELETE_FAIL;
    constructor(public payload: string) { }
}

export class MoveAction implements Action {
    readonly type = ActionTypes.MOVE;
    constructor(public payload: { taskId: string; tasklistId: string }) { }
}

export class MoveSuccessAction implements Action {
    readonly type = ActionTypes.MOVE_SUCCESS;
    constructor(public payload: Task) { }
}

export class MoveFailAction implements Action {
    readonly type = ActionTypes.MOVE_FAIL;
    constructor(public payload: string) { }
}

export class MoveAllAction implements Action {
    readonly type = ActionTypes.MOVE_ALL;
    constructor(public payload: { srcListId: string; targetListId: string }) { }
}

export class MoveAllSuccessAction implements Action {
    readonly type = ActionTypes.MOVE_ALL_SUCCESS;
    constructor(public payload: Task[]) { }
}

export class MoveAllFailAction implements Action {
    readonly type = ActionTypes.MOVE_ALL_FAIL;
    constructor(public payload: string) { }
}
export class CompleteAction implements Action {
    readonly type = ActionTypes.COMPLETE;
    constructor(public payload: Task) { }
}

export class CompleteSuccessAction implements Action {
    readonly type = ActionTypes.COMPLETE_SUCCESS;
    constructor(public payload: Task) { }
}

export class CompleteFailAction implements Action {
    readonly type = ActionTypes.COMPLETE_FAIL;
    constructor(public payload: string) { }
}

export type Actions
    = LoadAction
    | LoadSuccessAction
    | LoadFailAction
    | AddAction
    | AddSuccessAction
    | AddFailAction
    | UpdateAction
    | UpdateSuccessAction
    | UpdateFailAction
    | DeleteAction
    | DeleteSuccessAction
    | DeleteFailAction
    | MoveAction
    | MoveSuccessAction
    | MoveFailAction
    | MoveAllAction
    | MoveAllSuccessAction
    | MoveAllFailAction
    | CompleteAction
    | CompleteSuccessAction
    | CompleteFailAction;
