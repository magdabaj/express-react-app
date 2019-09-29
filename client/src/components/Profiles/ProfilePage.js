import Spinner from "../common/Spinner";
import React, {useEffect} from 'react';
import {connect} from "react-redux";
import {loadUsers, setUser} from "../../redux/actions/userActions";
import {loadImages} from "../../redux/actions/imageActions";
import UserProfile from './UserProfile';


const ProfilePage = ({users, loadUsers, setUser, user, images, loadImages, ...props}) => {
    console.log('props', props);
    console.log('users', users);
    console.log('user', user);
    console.log('images', images);

    useEffect(() => {
        if(users.length === 0){
            loadUsers()
        }

        if(user.name === ''){
            setUser(user)
        }

        if(images.length === 0) {
            loadImages()
        }

    }, []);

    return (
        users.length > 0 && images.length > 0 && user.name !== '' ? (
        <div>
            <UserProfile images={images} user={user}/>
        </div>
        ) : <Spinner/>
    )
};

const getUserBySlug = (users, slug) => {
    return users.find(user => user.email === slug) || null
}

const mapStateToProps = (state, ownProps) => {
    const slug = ownProps.match.params.slug;
    const user =
        state.users.length > 0 && slug
            ? getUserBySlug(state.users, slug)
            : state.newUser;
    return {
        user,
        users: state.users,
        images: state.images
    }
};

const mapDispatchToProps = dispatch => {
    return {
        loadUsers: () => {
            dispatch(loadUsers())
        },
        setUser: (user) => {
            dispatch(setUser(user))
        },
        loadImages: () => {
            dispatch(loadImages())
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps) (ProfilePage);