import * as types from '../actionTypes';

export const loadImages = () => ({
    type: types.LOAD_IMAGES
});

export const loadImagesSuccess = (images) => ({
    type: types.LOAD_IMAGES_SUCCESS,
    images
});

export const loadImagesFinished = () => ({
    type: types.LOAD_IMAGES_FINISHED
});

export const loadImagesError = error => ({
    type: types.LOAD_IMAGES_ERROR,
    error
})