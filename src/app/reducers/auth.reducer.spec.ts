import { reducer } from './auth.reducer';
import * as fromAuth from './auth.reducer';
import * as actions from '../actions/auth.actions';
import { async } from '@angular/core/testing';
describe('测试 AuthReducer', () => {

    describe('未定义Action', () => {
        it('应该返回一个默认状态', async(() => {
            const action = {} as any;
            const result = reducer(undefined, action);
            expect(result).toEqual(fromAuth.initialState);
        }))
    });

    describe('登录成功', () => {
        it('应该返回一个 Err 为undefined 而userId不为空的Auth对象', () => {
            const action = {
                type: actions.ActionTypes.LOGIN_SUCCESS,
                payload: {
                    token:'',
                    user:{id:'111',email:'test@163.com'}
                }
            } as any;
            const result = reducer(undefined, action);
            expect(result.user).toEqual(action.payload.user);
            expect(result.err).toBeUndefined;
        })
    });




})
