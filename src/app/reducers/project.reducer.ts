import { Action, createSelector } from '@ngrx/store';
import * as actions from '../actions/project.actions';
import { Quote, Project } from '../domain';
import * as _ from 'lodash';

export interface State {
    ids: string[];
    entities: { [id: string]: Project };
    selectedId: string | null
}
export const initialState: State = {
    ids: [],
    entities: {},
    selectedId: null
};
const addProject = (state, action) => {
    const project = action.payload;
    if (state.entities[project.id]) {
        return false;
    }
    const newIds = [...state.ids, project.id];
    const newEntities = { ...state.entities, [project.id]: project };
    return { ...state, ids: newIds, entities: newEntities };
}
const updateProject = (state, action) => {
    const project = action.payload;
    const newEntities = { ...state.entities, [project.id]: project };
    return { ...state, entities: newEntities };
}
const deleteProject = (state, action) => {
    const project = action.payload;
    const newIds = state.ids.filter(id => id != project.id);
    const newEntities = newIds.reduce((entities, id) => ({ ...entities, [id]: state.entities[id] }), {});
    return {
        ids: newIds,
        entities: newEntities,
        selectedId: project.id === state.selectedId ? null : state.selectedId
    };
}
const loadProject = (state, action) => {
    const projects = action.payload;
    const incomingIds = projects.map(p => p.id);

    const newIds = _.difference(incomingIds, state.ids);
    const incomingEntites = _.chain(projects)
        .keyBy('id')
        .mapValues(o => o)
        .value();
    const newEntities = newIds.reduce((entities, id: string) => ({ ...entities, [id]: incomingEntites[id] }), {});
    return {
        ...state,
        entities: newEntities,
        ids: newIds
    };
}
export function reducer(state = initialState, action: actions.Actions) {
    switch (action.type) {
        case actions.ActionTypes.ADD_SUCCESS:
            { return addProject(state, action) }
        case actions.ActionTypes.INVITE_SUCCESS:
        case actions.ActionTypes.UPDATE_SUCCESS:
            { return updateProject(state, action) }
        case actions.ActionTypes.DELETE_SUCCESS:
            { return deleteProject(state, action) }
        case actions.ActionTypes.LOAD_SUCCESS:
            return loadProject(state, action);
        case actions.ActionTypes.SELECT_PROJECT:
            { return { ...state, selectedId: (<Project>action.payload).id }; }
        default:
            return state;
    }
}
export const getIds = (state: State) => state.ids;
export const getEntities = (state: State) => state.entities;
export const getSelectedId = (state: State) => state.selectedId;
export const getAll = createSelector(getIds, getEntities, (ids, entities) => {
    return ids.map(id => entities[id]);
})