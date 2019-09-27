import users, {isSaving, usersError, deletingUser} from './userReducer';
import {combineReducers} from 'redux';

export default combineReducers({
    users,
    isSaving,
    usersError,
    deletingUser
})