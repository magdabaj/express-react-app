import * as types from '../actionTypes';

const initialState = {
    tags: [
        {
            text: 'test'
        }
    ],
    newTag: {
        text: ''
    },
    setTagSuccess: false,
};

export default (state = initialState.tags, action) => {
    switch (action.type) {
        case types.ADD_TAG_SUCCESS:
            return [...state, {...action.tag}];
        default:
            return state;
    }
}

export const matchTags = (state = [] , action) => {
    switch (action.type) {
        case types.MATCH_TAG:
            return (action.newTags);
            // let newUser = action.users.filter(user => user.name.toString() === action.tag.text.toString()) || null;
            // if(newUser){
            //     return newUser;
            // }
            // return state;
        default:
            return state;
    }
}

export const newTag = (state = initialState.newTag, action) => {
    switch (action.type) {
        default:
            return state;
    }
}

export const setTagSuccess = (state = initialState.setTagSuccess, action) => {
    switch (action.type) {
        case types.ADD_TAG:
            return false;
        case types.ADD_TAG_SUCCESS:
            return true;
        case types.ADD_TAG_FINISHED:
            return false;
        default:
            return state;
    }
}