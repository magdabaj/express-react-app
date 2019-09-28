import userSaga from './userSaga';
import deleteUserSaga from './deleteUserSaga';
import saveUserSaga from './saveUserSaga';
import {all} from 'redux-saga/effects';

export default function* rootSaga() {
    yield all([
        userSaga(),
        deleteUserSaga(),
        saveUserSaga()
    ])
}

