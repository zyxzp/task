
import { NgModule } from '@angular/core';
import { StoreModule, createFeatureSelector, createSelector } from '@ngrx/store';
import { StoreRouterConnectingModule } from '@ngrx/router-store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { environment } from 'src/environments/environment';
import { ActionReducerMap, ActionReducer, MetaReducer } from '@ngrx/store';

import * as fromRouter from '@ngrx/router-store';

import * as fromCounter from './counter.reducer';
import * as fromQuote from './quote.reducer';
import * as fromAuth from './auth.reducer';
import * as fromProject from './project.reducer';
import * as fromUser from './user.reducer';
import * as fromTaskList from './task-list.reducer';

import { Auth } from '../domain';
/**
 * storeFreeze prevents state from being mutated. When mutation occurs, an
 * exception will be thrown. This is useful during development mode to
 * ensure that none of the reducers accidentally mutates the state.
 */
import { storeFreeze } from 'ngrx-store-freeze';

/**
 * As mentioned, we treat each reducer like a table in a database. This means
 * our top level state interface is just a map of keys to inner state types.
 */
export interface State {
  count: number;
  auth: Auth;
  quote: fromQuote.State,
  router: fromRouter.RouterReducerState;
  projects: fromProject.State;
  users:fromUser.State;
  taskLists:fromTaskList.State
}

/**
 * Our state is composed of a map of action reducer functions.
 * These reducer functions are called with each dispatched action
 * and the current or initial state and return a new immutable state.
 */
export const reducers: ActionReducerMap<State> = {
  router: fromRouter.routerReducer,
  auth: fromAuth.reducer,
  count: fromCounter.counterReducer,
  quote: fromQuote.reducer,
  projects: fromProject.reducer,
  users:fromUser.reducer,
  taskLists:fromTaskList.reducer
};

// console.log all actions
export function logger(reducer: ActionReducer<State>): ActionReducer<State> {
  return function (state: State, action: any): State {
    console.log('state', state);
    console.log('action', action);

    return reducer(state, action);
  };
}

/**
 * By default, @ngrx/store uses combineReducers with the reducer map to compose
 * the root meta-reducer. To add more meta-reducers, provide an array of meta-reducers
 * that will be composed to form the root meta-reducer.
 */
export const metaReducers: MetaReducer<State>[] = !environment.production
  ? [logger, storeFreeze]
  : [];


//从全局获取quote state数据
export const selectQuoteState = createFeatureSelector<fromQuote.State>('quote');
export const getQuote = createSelector(
  selectQuoteState,
  fromQuote.getQuote
);
/**
 * Auth getAuthState
 */

export const getAuth = (state: State) => state.auth;
export const getProjectsState = (state: State) => state.projects;
export const getUserState = (state: State) => state.users;
export const getTaskListState = (state: State) => state.taskLists;

export const getUserEntities = createSelector(getUserState, fromUser.getEntities);
export const getTaskLists = createSelector(getTaskListState, fromTaskList.getSelected);
export const getProjects = createSelector(getProjectsState,  fromProject.getAll);

export const getProjectMembers=(projectId: string) => createSelector(getProjectsState, getUserEntities, (state, entities) => {
  return state.entities[projectId].members.map(id => entities[id]);
});
@NgModule({
  imports: [
    StoreModule.forRoot(reducers, { metaReducers }),

    /**
     * @ngrx/router-store keeps router state up-to-date in the store.
     */
    StoreRouterConnectingModule.forRoot(),

    /**
     * Store devtools instrument the store retaining past versions of state
     * and recalculating new states. This enables powerful time-travel
     * debugging.
     *
     * To use the debugger, install the Redux Devtools extension for either
     * Chrome or Firefox
     *
     * See: https://github.com/zalmoxisus/redux-devtools-extension
     */
    environment.production
      ? []
      : StoreDevtoolsModule.instrument({
        name: 'task ngrx start'
      }),
  ],
})
export class AppStoreModule { }
