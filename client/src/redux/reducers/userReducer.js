import * as types from '../actionTypes';

const initialState = {
    users: [],
    isSaving: false,
    isDeleting: false,
    usersError: null
};

export default (state = initialState.users, action) => {
    switch (action.type) {
        case types.LOAD_USERS_SUCCESS:
            return action.users;
        case types.DELETE_USER_SUCCESS:
            return state.filter(user => user.user_id !== action.user_id);
        default:
            return state;
    }
}

export const deletingUser = (state = initialState.isDeleting, action) => {
    switch (action.type) {
        case types.DELETE_USER:
            return false;
        case types.DELETE_USER_SUCCESS:
            return true;
        case types.DELETE_USER_FINISHED:
            return false;
        case types.DELETE_USER_ERROR:
            return false;
        default:
            return state
    }
};

export const isSaving = (state = initialState.isSaving, action) => {
    switch (action.type) {
        case types.LOAD_USERS:
            return false;
        case types.LOAD_USERS_SUCCESS:
            return true;
        case types.LOAD_USERS_FINISHED:
            return false;
        case types.LOAD_USERS_ERROR:
            return false;
        default:
            return state;
    }
};

export const usersError = (state = initialState.usersError, action) => {
    switch (action.type) {
        case types.LOAD_USERS_ERROR:
            return action.error;
        case types.LOAD_USERS_SUCCESS:
            return null;
        default:
            return state;
    }
};