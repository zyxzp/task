import { Action, createSelector } from '@ngrx/store';
import * as actions from '../actions/task-list.actions';
import * as prjActions from '../actions/project.actions';
import { Quote, TaskList } from '../domain';
import * as _ from 'lodash';

export interface State {
    ids: string[];
    entities: { [id: string]: TaskList };
    selectedIds: string[]
}
export const initialState: State = {
    ids: [],
    entities: {},
    selectedIds: []
};
const addTaskList = (state, action) => {
    const taskList = action.payload;
    if (state.entities[taskList.id]) {
        return false;
    }
    const newIds = [...state.ids, taskList.id];
    const newEntities = { ...state.entities, [taskList.id]: taskList };
    return { ...state, ids: newIds, entities: newEntities };
}
const updateTaskList = (state, action) => {
    const taskList = action.payload;
    const newEntities = { ...state.entities, [taskList.id]: taskList };
    return { ...state, entities: newEntities };
}
const deleteTaskList = (state, action) => {
    const taskList = action.payload;
    const newIds = state.ids.filter(id => id != taskList.id);
    const newEntities = newIds.reduce((entities, id) => ({ ...entities, [id]: state.entities[id] }), {});
    const newSelectedIds = state.selectedIds.filter(id => id != taskList.id);
    return {
        ids: newIds,
        entities: newEntities,
        selectedIds: newSelectedIds
    };
}
const swapTaskList = (state, action) => {
    const taskLists = <TaskList[]>action.payload;
    const updateEntities = _.chain(taskLists).keyBy('id').mapValues(o => o).value();
    const newEntities = { ...state.entities, ...updateEntities };
    return {
        ...state,
        entities: newEntities
    };

}
const loadTaskList = (state, action) => {
    const TaskLists = action.payload;
    const incomingIds = TaskLists.map(p => p.id);

    const newIds = _.difference(incomingIds, state.ids);
    const incomingEntites = _.chain(TaskLists)
        .keyBy('id')
        .mapValues(o => o)
        .value();
    const newEntities = newIds.reduce((entities, id: string) => ({ ...entities, [id]: incomingEntites[id] }), {});
    return { ...state, ids: newIds, entities: newEntities };
}
export function reducer(state = initialState, action: actions.Actions) {
    switch (action.type) {
        case actions.ActionTypes.ADD_SUCCESS:
            { return addTaskList(state, action) }
        case actions.ActionTypes.SWAP_SUCCESS:
            { return swapTaskList(state, action) }
        case actions.ActionTypes.UPDATE_SUCCESS:
            { return updateTaskList(state, action) }
        case actions.ActionTypes.DELETE_SUCCESS:
            { return deleteTaskList(state, action) }
        case actions.ActionTypes.LOAD_SUCCESS:
            { return loadTaskList(state, action); }
        default:
            return state;
    }
}
export const getIds = (state: State) => state.ids;
export const getEntities = (state: State) => state.entities;
export const getSelectedIds = (state: State) => state.selectedIds;
export const getSelected = createSelector(getIds, getEntities, (ids, entities) => {
    return ids.map(id => entities[id]);
})