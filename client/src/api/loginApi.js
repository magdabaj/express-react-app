import {handleError, handleResponse} from "./apiUtils";

let api = 'http://localhost:9000/testAPI/login';

export function loginUserApi(user) {
    return fetch(api, {
        method: 'POST',
        headers: {'content-type': 'application/json'},
        body: JSON.stringify(user)
    })
        .then(handleResponse)
        .catch(handleError)
}
