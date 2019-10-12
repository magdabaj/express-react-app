import * as types from "../../actionTypes";
import {put, takeEvery, call} from 'redux-saga/effects';
import {loginUserSuccess, loginUserFinished, loginUserError} from "../../actions/loginActions";
import {loginUserApi} from "../../../api/loginApi";


export function* handleUserLogin(action) {

    try{
        const loginData = action.user;
        const loggedUser = yield call(loginUserApi, loginData);
        if(loggedUser){
            yield put(loginUserSuccess(loggedUser));
            yield put(loginUserFinished())
        }
    } catch (error) {
        yield put(loginUserError(action.user, error))
    }

}

export default function* watchAddTag() {
    yield takeEvery (types.LOGIN_USER, handleUserLogin);
}