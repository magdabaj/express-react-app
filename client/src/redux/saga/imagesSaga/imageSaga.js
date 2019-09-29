import * as types from '../../actionTypes';
import * as actions from '../../actions/imageActions';
import {fetchImages} from "../../../api/imagesApi";
import {takeEvery, call, put} from 'redux-saga/effects';

function* handleImagesLoad() {
    try{
        const images = yield call(fetchImages);
        yield put(actions.loadImagesSuccess(images));
        yield put(actions.loadImagesFinished())
    } catch (error) {
        yield put(actions.loadImagesError(error.toString()))
    }

}

export default function* watchImagesLoad() {
    yield takeEvery(types.LOAD_IMAGES, handleImagesLoad)
}