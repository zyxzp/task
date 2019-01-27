import { Action } from '@ngrx/store';
import { Quote, Project, User } from '../domain';


export enum ActionTypes {
    LOAD = '[Project Component] Load',
    LOAD_SUCCESS = '[Project Component] Load success',
    LOAD_FAIL = '[Project Component] Load fail',

    ADD = '[Project Component] Add',
    ADD_SUCCESS = '[Project Component] Add success',
    ADD_FAIL = '[Project Component] Add fail',

    UPDATE = '[Project Component] Update',
    UPDATE_SUCCESS = '[Project Component] Update success',
    UPDATE_FAIL = '[Project Component] Update fail',

    DELETE = '[Project Component] Delete',
    DELETE_SUCCESS = '[Project Component] Delete success',
    DELETE_FAIL = '[Project Component] Delete fail',

    INVITE = '[Project Component] Invite',
    INVITE_SUCCESS = '[Project Component] Invite success',
    INVITE_FAIL = '[Project Component] Invite fail',

    SELECT_PROJECT = '[Project Component] Select project',
}

export class LoadAction implements Action {
    readonly type = ActionTypes.LOAD;
}

export class LoadSuccessAction implements Action {
    readonly type = ActionTypes.LOAD_SUCCESS;
    constructor(public payload: Project[]) { }
}

export class LoadFailAction implements Action {
    readonly type = ActionTypes.LOAD_FAIL;
    constructor(public payload: string) { }
}

export class AddAction implements Action {
    readonly type = ActionTypes.ADD;
    constructor(public payload: Project) { }
}

export class AddSuccessAction implements Action {
    readonly type = ActionTypes.ADD_SUCCESS;
    constructor(public payload: Project) { }
}

export class AddFailAction implements Action {
    readonly type = ActionTypes.ADD_FAIL;
    constructor(public payload: string) { }
}

export class UpdateAction implements Action {
    readonly type = ActionTypes.UPDATE;
    constructor(public payload: Project) { }
}

export class UpdateSuccessAction implements Action {
    readonly type = ActionTypes.UPDATE_SUCCESS;
    constructor(public payload: Project) { }
}

export class UpdateFailAction implements Action {
    readonly type = ActionTypes.UPDATE_FAIL;
    constructor(public payload: string) { }
}


export class DeleteAction implements Action {
    readonly type = ActionTypes.DELETE;
    constructor(public payload: Project) { }
}

export class DeleteSuccessAction implements Action {
    readonly type = ActionTypes.DELETE_SUCCESS;
    constructor(public payload: Project) { }
}

export class DeleteFailAction implements Action {
    readonly type = ActionTypes.DELETE_FAIL;
    constructor(public payload: string) { }
}

export class InviteAction implements Action {
    readonly type = ActionTypes.INVITE;
    constructor(public payload: { projectId: string; members: User[] }) { }
}

export class InviteSuccessAction implements Action {
    readonly type = ActionTypes.INVITE_SUCCESS;
    constructor(public payload: Project) { }
}

export class InviteFailAction implements Action {
    readonly type = ActionTypes.INVITE_FAIL;
    constructor(public payload: string) { }
}
export class SelectProjectAction implements Action {
    readonly type = ActionTypes.SELECT_PROJECT;
    constructor(public payload: Project) { }
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
    | InviteAction
    | InviteSuccessAction
    | InviteFailAction
    | SelectProjectAction;
