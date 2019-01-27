import { Action } from '@ngrx/store';
import { TaskList } from '../domain';


export enum ActionTypes {
    LOAD = '[TaskList Component] Load',
    LOAD_SUCCESS = '[TaskList Component] Load success',
    LOAD_FAIL = '[TaskList Component] Load fail',

    ADD = '[TaskList Component] Add',
    ADD_SUCCESS = '[TaskList Component] Add success',
    ADD_FAIL = '[TaskList Component] Add fail',

    UPDATE = '[TaskList Component] Update',
    UPDATE_SUCCESS = '[TaskList Component] Update success',
    UPDATE_FAIL = '[TaskList Component] Update fail',

    DELETE = '[TaskList Component] Delete',
    DELETE_SUCCESS = '[TaskList Component] Delete success',
    DELETE_FAIL = '[TaskList Component] Delete fail',

    SWAP = '[TaskList Component] Swap',
    SWAP_SUCCESS = '[TaskList Component] SwapSwap success',
    SWAP_FAIL = '[TaskList Component] Swap fail',
}

export class LoadAction implements Action {
    readonly type = ActionTypes.LOAD;
    constructor(public payload: string) { }
}

export class LoadSuccessAction implements Action {
    readonly type = ActionTypes.LOAD_SUCCESS;
    constructor(public payload: TaskList[]) { }
}

export class LoadFailAction implements Action {
    readonly type = ActionTypes.LOAD_FAIL;
    constructor(public payload: string) { }
}

export class AddAction implements Action {
    readonly type = ActionTypes.ADD;
    constructor(public payload: TaskList) { }
}

export class AddSuccessAction implements Action {
    readonly type = ActionTypes.ADD_SUCCESS;
    constructor(public payload: TaskList) { }
}

export class AddFailAction implements Action {
    readonly type = ActionTypes.ADD_FAIL;
    constructor(public payload: string) { }
}

export class UpdateAction implements Action {
    readonly type = ActionTypes.UPDATE;
    constructor(public payload: TaskList) { }
}

export class UpdateSuccessAction implements Action {
    readonly type = ActionTypes.UPDATE_SUCCESS;
    constructor(public payload: TaskList) { }
}

export class UpdateFailAction implements Action {
    readonly type = ActionTypes.UPDATE_FAIL;
    constructor(public payload: string) { }
}


export class DeleteAction implements Action {
    readonly type = ActionTypes.DELETE;
    constructor(public payload: TaskList) { }
}

export class DeleteSuccessAction implements Action {
    readonly type = ActionTypes.DELETE_SUCCESS;
    constructor(public payload: TaskList) { }
}

export class DeleteFailAction implements Action {
    readonly type = ActionTypes.DELETE_FAIL;
    constructor(public payload: string) { }
}

export class SwapAction implements Action {
    readonly type = ActionTypes.SWAP;
    constructor(public payload: { src: TaskList; target: TaskList }) { }
}

export class SwapSuccessAction implements Action {
    readonly type = ActionTypes.SWAP_SUCCESS;
    constructor(public payload: TaskList[]) { }
}

export class SwapFailAction implements Action {
    readonly type = ActionTypes.SWAP_FAIL;
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
    | SwapAction
    | SwapSuccessAction
    | SwapFailAction;
