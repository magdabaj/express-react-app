import userSaga from './userSaga';
import deleteUserSaga from './deleteUserSaga';
import saveUserSaga from './saveUserSaga';
import imageSaga from './imagesSaga/imageSaga';
import tagsSaga,{watchTagsSort, watchTagDelete} from './tagsSaga/tagsSaga';
import loginSaga from './loginSaga/loginSaga';
import {all} from 'redux-saga/effects';

export default function* rootSaga() {
    yield all([
        userSaga(),
        deleteUserSaga(),
        saveUserSaga(),
        imageSaga(),
        tagsSaga(),
        watchTagsSort(),
        watchTagDelete(),
        loginSaga()
    ])
}

