import {handleError, handleResponse} from "./apiUtils";

let api = 'http://localhost:9000/posts';

export const fetchPosts = async () => {
    const response = await fetch(api);
    const data = await response.json();
    if(response.status >= 400) {
        throw new Error(data.errors);
    }
    return data;
};

export function savePostApi(post) {
    return fetch(api, {
        method: post.post_id ? 'PUT' : 'POST',
        headers: {'content-type': 'application/json'},
        body: JSON.stringify(post)
    })
        .then(handleResponse)
        .catch(handleError)
}


export function deletePostApi(post_id) {
    return fetch( `http://localhost:9000/testAPI/${post_id}`, {method: 'DELETE'})
        .then(handleResponse)
        .catch(handleError)
}

