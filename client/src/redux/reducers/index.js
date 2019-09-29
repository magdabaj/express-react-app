import users, {isSaving, usersError, deletingUser, savingUser} from './userReducer';
import images from './imageReducer';
import {combineReducers} from 'redux';
import newUser from './newUserReducer';

export default combineReducers({
    users,
    isSaving,
    usersError,
    deletingUser,
    newUser,
    savingUser,
    images
})