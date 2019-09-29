import userSaga from './userSaga';
import deleteUserSaga from './deleteUserSaga';
import saveUserSaga from './saveUserSaga';
import imageSaga from './imagesSaga/imageSaga';
import {all} from 'redux-saga/effects';

export default function* rootSaga() {
    yield all([
        userSaga(),
        deleteUserSaga(),
        saveUserSaga(),
        imageSaga()
    ])
}

