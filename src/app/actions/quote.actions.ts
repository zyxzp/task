import { Action } from '@ngrx/store';
import { Quote } from '../domain';


export enum ActionTypes {
    LOAD = '[Quote Component] Load',
    LOAD_SUCCESS = '[Quote Component] Load success',
    LOAD_FAIL = '[Quote Component] Load fail',
}

export class LoadAction implements Action {
    readonly type = ActionTypes.LOAD;
}

export class LoadSuccessAction implements Action {
    readonly type = ActionTypes.LOAD_SUCCESS;
    constructor(private payload: Quote) { }
}

export class LoadFailAction implements Action {
    readonly type = ActionTypes.LOAD_FAIL;
    constructor(private payload: string) { }
}
export type Actions
    = LoadAction
    | LoadSuccessAction
    | LoadFailAction;
