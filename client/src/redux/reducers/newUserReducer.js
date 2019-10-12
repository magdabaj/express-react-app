import * as types from '../actionTypes';

const newUser = {
    email: '',
    name: '',
    user_id: '',
    surname: '',
    password: '',
    login: '',
};

export default (state = newUser, action) => {
    switch (action.type) {
        case types.SET_USER:
            return action.user;
        case types.LOGIN_USER_SUCCESS:
            return action.user;
        default:
            return state;
    }
}

export const logging = (state = false, action) => {
    switch (action.type) {
        case types.LOGIN_USER:
            return false;
        case types.LOGIN_USER_SUCCESS:
            return true;
        case types.LOGIN_USER_FINISHED:
            return false;
        case types.LOGIN_USER_ERROR:
            return false;
        default:
            return state;
    }
};

export const loginStatus = (state = false, action) => {
    switch (action.type) {
        case types.LOGIN_USER:
            return false;
        case types.LOGIN_USER_SUCCESS:
            return true;
        case types.LOGIN_USER_FINISHED:
            return true;
        case types.LOGIN_USER_ERROR:
            return false;
        default:
            return state;
    }
};

export const redirectToPrivateProfile = (state = false, action) => {
    switch (action.type) {
        case types.LOGIN_USER:
            return false;
        case types.LOGIN_USER_SUCCESS:
            return true;
        case types.LOGIN_USER_FINISHED:
            return false;
        case types.LOGIN_USER_ERROR:
            return false;
        default:
            return state;
    }
}


