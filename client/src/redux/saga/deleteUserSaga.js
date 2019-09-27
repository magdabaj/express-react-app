import * as types from '../actionTypes';
import {put, call, takeEvery} from 'redux-saga/effects';
import {deleteUserFinished, deleteUserSuccess, deleteUserFailed} from '../actions/userActions';
import {deleteUserApi} from "../../api/userApi";

function* handleUserDelete(action) {
    console.log('user delete action', action);
    const user = action.user;
    const user_id = user.user_id;
    try {
        const deletedData = yield call(deleteUserApi, user_id);
        if(deletedData) {
            yield put(deleteUserSuccess(user_id));
            yield put(deleteUserFinished());
        }
    } catch (e) {
        yield put(deleteUserFailed(e, user))
    }
}

export default function* watchUserDelete() {
    yield takeEvery(types.DELETE_USER, handleUserDelete)
}