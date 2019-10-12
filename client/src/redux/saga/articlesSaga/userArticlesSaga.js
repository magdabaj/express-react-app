import * as types from '../../actionTypes';
import {put, call, takeEvery} from 'redux-saga/effects';
import {fetchUserArticles} from  "../../../api/articlesApi";
import {loadUserArticlesSuccess, loadUserArticlesFinished, loadUserArticlesError} from "../../actions/articlesActions";

export function* handleUserArticlesLoad(action) {
    let user_id = action.user_id;
    try {
        const articles = yield call(fetchUserArticles, user_id);
        yield put(loadUserArticlesSuccess(articles));
        yield put(loadUserArticlesFinished());
    } catch (e) {
        yield put(loadUserArticlesError(e.message));
    }
}

export default function* watchUserArticlesLoad() {
    yield takeEvery(types.LOAD_USER_ARTICLES, handleUserArticlesLoad)
}