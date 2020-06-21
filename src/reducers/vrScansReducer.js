import { ADD_TYPE, REMOVE_TYPE, ADD_COLOR, REMOVE_COLOR, ADD_TAG, REMOVE_TAG, UPDATE_SEARCH_TERM } from '../actions/actionTypes';


export default function vrScansReducer(state, action) {
    switch (action.type) {
        case ADD_TYPE:
            const types = state.types.concat([action.payload]);
            return Object.assign({}, state, {
                types
            });
        case REMOVE_TYPE:
            return Object.assign({}, state, {
                types: state.types.filter(type => type !== action.payload)
            });
        case ADD_COLOR:
            const colors = state.colors.concat([action.payload]);
            return Object.assign({}, state, {
                colors
            });
        case REMOVE_COLOR:
            return Object.assign({}, state, {
                colors: state.colors.filter(color => color !== action.payload)
            });
        case ADD_TAG:
            const tags = state.tags.concat([action.payload]);
            return Object.assign({}, state, {
                tags
            });
        case REMOVE_TAG:
            return Object.assign({}, state, {
                tags: state.tags.filter(tag => tag !== action.payload)
            });
        case UPDATE_SEARCH_TERM:
            return Object.assign({}, state, {
                searchTerm: action.payload
            });
        default:
            return state;
    }
}