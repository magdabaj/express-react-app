import {LOAD_USER_ARTICLES_SUCCESS} from "../actionTypes";
import * as types from '../actionTypes';

const initialState = {
    articles: []
};

export default (state = initialState.articles, action) => {
    switch (action.type) {
        case LOAD_USER_ARTICLES_SUCCESS:
            return action.articles;
        default:
            return state;
    }
}