import users, {isSaving, usersError, deletingUser, savingUser} from './userReducer';
import images from './imageReducer';
import {combineReducers} from 'redux';
import newUser, {logging} from './newUserReducer';
import tags, {newTag, setTagSuccess, matchTags} from './tagsReducers';


export default combineReducers({
    users,
    isSaving,
    usersError,
    deletingUser,
    newUser,
    savingUser,
    images,
    tags,
    newTag,
    setTagSuccess,
    matchTags,
    logging
})