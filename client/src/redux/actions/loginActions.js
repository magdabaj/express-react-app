import * as actions from '../actionTypes';

export const loginUser = user => ({
    type: actions.LOGIN_USER,
        user
});

export const loginUserSuccess = user => ({
    type: actions.LOGIN_USER_SUCCESS,
    user
});

export const loginUserFinished = () => ({
    type: actions.LOGIN_USER_FINISHED,
});

export const loginUserError = (user, error) => ({
    type: actions.LOGIN_USER_ERROR,
    user,
    error: error.message
});