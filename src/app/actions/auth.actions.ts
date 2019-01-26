import { Action } from '@ngrx/store';
import { Auth, User } from '../domain';
//字典
export enum ActionTypes {
    LOGIN = '[Auth Component] Login',
    LOGIN_SUCCESS = '[Auth Component] Login success',
    LOGIN_SUCCESSDONE = '[Auth Component] Login success done',
    LOGIN_FAIL = '[Auth Component] Login fail',
    REGISTER = '[Auth Component] Register',
    REGISTER_SUCCESS = '[Auth Component] Register success',
    REGISTER_FAIL = '[Auth Component] Register fail',
    LOGOUT = '[Auth Component] Logout',
}
export class LoginAction implements Action {
    readonly type = ActionTypes.LOGIN;
    constructor(public payload: { email: string, password: string }) { }
}
export class LoginSuccessAction implements Action {
    readonly type = ActionTypes.LOGIN_SUCCESS;
    constructor(public payload: Auth) { }
}
export class LoginSuccessDoneAction implements Action {
    readonly type = ActionTypes.LOGIN_SUCCESSDONE;
}
export class LoginFailAction implements Action {
    readonly type = ActionTypes.LOGIN_FAIL;
    constructor(public payload: string) { }
}
export class RegisterAction implements Action {
    readonly type = ActionTypes.REGISTER;
    constructor(public payload: User) { }
}
export class RegisterSuccessAction implements Action {
    readonly type = ActionTypes.REGISTER_SUCCESS;
    constructor(public payload: Auth) { }
}
export class RegisterFailAction implements Action {
    readonly type = ActionTypes.REGISTER_FAIL;
    constructor(public payload: string) { }
}
export class LogoutAction implements Action {
    readonly type = ActionTypes.LOGOUT;
}

/**
 * Export a type alias of all actions in this action group
 * so that reducers can easily compose action types
 */
export type Actions
    = LoginAction
    | LoginSuccessAction
    | LoginFailAction
    | RegisterAction
    | RegisterSuccessAction
    | RegisterFailAction
    | LogoutAction;
