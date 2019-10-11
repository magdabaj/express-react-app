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
        case types.DELETE_TAG_SUCCESS:
            return state.filter(tag => tag.text !== action.text);
        default:
            return state;
    }
}

export const matchTags = (state = [] , action) => {
    switch (action.type) {
        case types.MATCH_TAG:
            const array = [...state];
            array.concat(action.newTags);
            Array.prototype.push.apply(array,action.newTags);
            console.log(array);
            // return (action.newTags);
            return array;
            // let newUser = action.users.filter(user => user.name.toString() === action.tag.text.toString()) || null;
            // if(newUser){
            //     return newUser;
            // }
            // return state;
        case types.DELETE_TAG_SUCCESS:
            return state.filter(user => user.name !== action.text)
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