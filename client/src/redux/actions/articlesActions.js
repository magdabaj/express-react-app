import * as types from '../actionTypes';

export const loadArticles = () => ({
    type: types.LOAD_ARTICLES
});

export const loadArticlesSuccess = articles => ({
    type: types.LOAD_ARTICLES_SUCCESS,
    articles
});

export const loadArticlesFinished = () => ({
    type: types.LOAD_ARTICLES_FINISHED
});

export const loadArticlesError = error => ({
    type: types.LOAD_ARTICLES_ERROR,
    error
});


export const loadUserArticles = user_id => ({
    type: types.LOAD_USER_ARTICLES,
    user_id
});

export const loadUserArticlesSuccess = articles => ({
    type: types.LOAD_USER_ARTICLES_SUCCESS,
    articles
});

export const loadUserArticlesFinished = () => ({
    type: types.LOAD_USER_ARTICLES_FINISHED,
});

export const loadUserArticlesError = error => ({
    type: types.LOAD_USER_ARTICLES,
    error
});

