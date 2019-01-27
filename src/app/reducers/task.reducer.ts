import { Action, createSelector } from '@ngrx/store';
import * as actions from '../actions/task.actions';
import * as prjActions from '../actions/project.actions';
import { Quote, Task } from '../domain';
import * as _ from 'lodash';

export interface State {
    ids: string[];
    entities: { [id: string]: Task };
}
export const initialState: State = {
    ids: [],
    entities: {}
};
const addTask = (state, action) => {
    const task = action.payload;
    if (state.entities[task.id]) {
        return false;
    }
    const newIds = [...state.ids, task.id];
    const newEntities = { ...state.entities, [task.id]: task };
    return { ...state, ids: newIds, entities: newEntities };
}
const updateTask = (state, action) => {
    const task = action.payload;
    const newEntities = { ...state.entities, [task.id]: task };
    return { ...state, entities: newEntities };
}
const deleteTask = (state, action) => {
    const task = action.payload;
    const newIds = state.ids.filter(id => id != task.id);
    const newEntities = newIds.reduce((entities, id) => ({ ...entities, [id]: state.entities[id] }), {});
    return {
        ids: newIds,
        entities: newEntities,
    };
}
const moveAllTask = (state, action) => {
    const tasks = <Task[]>action.payload;
    const updateEntities = tasks.reduce((entities, task) => ({ ...entities, [task.id]: task }), {});
    const newEntities = { ...state.entities, ...updateEntities };
    return {
        ...state,
        entities: newEntities
    };

}
const loadTask = (state, action) => {
    const tasks = action.payload;
    const incomingIds = tasks.map(p => p.id);

    const newIds = _.difference(incomingIds, state.ids);
    const incomingEntites = _.chain(tasks)
        .keyBy('id')
        .mapValues(o => o)
        .value();
    const newEntities = newIds.reduce((entities, id: string) => ({ ...entities, [id]: incomingEntites[id] }), {});
    return { ...state, ids: newIds, entities: newEntities };
}
export function reducer(state = initialState, action: actions.Actions) {
    switch (action.type) {
        case actions.ActionTypes.ADD_SUCCESS:
            { return addTask(state, action) }
        case actions.ActionTypes.MOVE_ALL_SUCCESS:
            { return moveAllTask(state, action) }
        case actions.ActionTypes.COMPLETE_SUCCESS:
        case actions.ActionTypes.MOVE_SUCCESS:
        case actions.ActionTypes.UPDATE_SUCCESS:
            { return updateTask(state, action) }
        case actions.ActionTypes.DELETE_SUCCESS:
            { return deleteTask(state, action) }
        case actions.ActionTypes.LOAD_SUCCESS:
            { return loadTask(state, action); }
        default:
            return state;
    }
}
export const getIds = (state: State) => state.ids;
export const getEntities = (state: State) => state.entities;
export const getTasks = createSelector(getIds, getEntities, (ids, entities) => {
    return ids.map(id => entities[id]);
})