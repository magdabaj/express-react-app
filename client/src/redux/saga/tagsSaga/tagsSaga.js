import * as types from "../../actionTypes";
import {put, delay, takeEvery} from 'redux-saga/effects';
import {addTag, addTagSuccess, addTagFinished, matchTags} from "../../actions/tagsActions";


export function* handleAddTag(action) {

    try{
        const tag = action.tag;
        yield put(addTagSuccess(tag));
        // yield put(addTagFinished())
    } catch (error) {

    }

}

export default function* watchAddTag() {
    yield takeEvery (types.ADD_TAG, handleAddTag);
}

export function* handleTagSort(action) {
    const {tag, users} = action;
    console.log('diff ');
    console.log(users);
    let newUser;
    // for(let i=0; i<users.length; i+=1) {
        newUser = users.filter(user => user.name.toString() === tag.text.toString()) || null;
        if(newUser.length > 0){
            yield put(matchTags(newUser))
        }
        console.log(newUser)
    // }
    // setAnswer(array);
    // return array

}

export function* watchTagsSort() {
    yield takeEvery(types.ADD_TAG_FINISHED, handleTagSort)
}