import userSaga from './userSaga';
import deleteUserSaga from './deleteUserSaga';
import {all} from 'redux-saga/effects';

export default function* rootSaga() {
    yield all([
        userSaga(),
        deleteUserSaga()
    ])
}

