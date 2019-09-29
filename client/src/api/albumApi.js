import {handleError, handleResponse} from "./apiUtils";

let api = 'http://localhost:9000/albums';

export const fetchAlbums = async () => {
    const response = await fetch(api);
    const data = await response.json();
    if(response.status >= 400) {
        throw new Error(data.errors);
    }
    return data;
};

export function saveAlbumApi(user) {
    return fetch(api, {
        method: user.user_id ? 'PUT' : 'POST',
        headers: {'content-type': 'application/json'},
        body: JSON.stringify(user)
    })
        .then(handleResponse)
        .catch(handleError)
}


export function deleteAlbumApi(album_id) {
    return fetch( `http://localhost:9000/albums/${album_id}`, {method: 'DELETE'})
        .then(handleResponse)
        .catch(handleError)
}

