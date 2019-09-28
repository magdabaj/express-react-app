import * as types from '../actionTypes';

const newUser = {
    email: '',
    name: '',
    user_id: '',
    surname: ''
};

export default (state = newUser, action) => {
    switch (action.type) {
        case types.SET_USER:
            return action.user;
        default:
            return state;
    }
}