import * as types from '../actionTypes';

const initialState = {
    images: [],
    loadingImages: false,
    imagesError: null
};

export default (state = initialState.images, action) => {
    switch (action.type) {
        case types.LOAD_IMAGES_SUCCESS:
            return action.images;
        default:
            return state;
    }
}