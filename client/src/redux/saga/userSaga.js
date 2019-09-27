import * as types from '../actionTypes';
import {fetchUser} from "../../api/userApi";
import {loadUsersError, loadUsersSuccess, loadUsersFinished} from "../actions/userActions";
import {call, put, takeEvery} from 'redux-saga/effects';

export function* handleUsersLoad() {
    try {
        const users = yield call(fetchUser);
        yield put(loadUsersSuccess(users));
        yield put(loadUsersFinished());
    } catch (error) {
        yield put (loadUsersError(error.toString()))
    }
}

export default function* watchUsersLoad() {
    yield takeEvery (types.LOAD_USERS, handleUsersLoad)
}