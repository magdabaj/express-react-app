import {handleError, handleResponse} from "./apiUtils";

let api = 'http://localhost:9000/images';

export const fetchImages = async () => {
    const response = await fetch(api);
    const data = await response.json();
    if(response.status >= 400) {
        throw new Error(data.errors);
    }
    return data;
};

export function saveImageApi(image) {
    return fetch(api, {
        method: image.image_id ? 'PUT' : 'POST',
        headers: {'content-type': 'application/json'},
        body: JSON.stringify(image)
    })
        .then(handleResponse)
        .catch(handleError)
}


export function deleteImageApi(image_id) {
    return fetch( `http://localhost:9000/testAPI/${image_id}`, {method: 'DELETE'})
        .then(handleResponse)
        .catch(handleError)
}

