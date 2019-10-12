import * as types from '../actionTypes';
// import {saveUserApi} from '../../api/userApi';
import {saveUserApi} from '../../api/registerApi';
import {updateUserSuccess, createUserSuccess, saveUserFinished, saveUserError} from "../actions/userActions";
import {take, fork, put, call} from 'redux-saga/effects';

function* handleUserSave(user) {
    try {
        const newUser = yield call(saveUserApi, user);
        console.log('newUser', newUser)
        if(user.user_id) {
            yield put(updateUserSuccess(newUser));
            yield put(saveUserFinished());
        } else {
            yield put(createUserSuccess(newUser));
            yield put(saveUserFinished());
        }
    } catch (e) {
        saveUserError(user, e.message)
    }
}

export default function* watchUserSave() {
    while(true) {
        const {user} = yield take(types.SAVE_USER);
        console.log('user', user);
        yield fork(handleUserSave, user)
    }
}