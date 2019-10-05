import * as types from '../actionTypes';

export const addTag = tag => ({
    type: types.ADD_TAG,
    tag
});

export const addTagSuccess = tag => ({
    type: types.ADD_TAG_SUCCESS,
    tag
});

export const addTagFinished = (tag, users) => ({
    type: types.ADD_TAG_FINISHED,
    tag,
    users
});

export const matchTags = (newTags) => ({
    type: types.MATCH_TAG,
    newTags
})