import {handleError, handleResponse} from "./apiUtils";

let api = 'http://localhost:9000/tags';

export const fetchTags = async () => {
    const response = await fetch(api);
    const data = await response.json();
    if(response.status >= 400) {
        throw new Error(data.errors);
    }
    return data;
};

export function saveTagApi(tag) {
    return fetch(api, {
        method: tag.tag_id ? 'PUT' : 'POST',
        headers: {'content-type': 'application/json'},
        body: JSON.stringify(tag)
    })
        .then(handleResponse)
        .catch(handleError)
}


export function deleteTagApi(tag_id) {
    return fetch( `http://localhost:9000/tags/${tag_id}`, {method: 'DELETE'})
        .then(handleResponse)
        .catch(handleError)
}

