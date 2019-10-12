import {Link, Redirect} from "react-router-dom";
import Spinner from "../common/Spinner";
import LoginForm from './LoginForm';
import React, {useEffect, useState} from 'react';
import {loadUsers, setUser} from "../../redux/actions/userActions";
import {loginUser} from "../../redux/actions/loginActions";
import {connect} from 'react-redux';
import {toast} from "react-toastify";

const LoginPage = ({user, users, loadUsers, setUser, isSaving, loginUser, ...props}) => {
    console.log('user', user);
    const [_user, _setUser] = useState({...user});

    useEffect(() => {
        if(users.length === 0 ) {
            loadUsers();
        }

        if(_user.name === '') {
            setUser({...user});
            _setUser({...user})
        }

    }, []);

    const handleChange = (event) => {
        const {name, value} = event.target;

        _setUser(prevUser => ({
            ...prevUser,
            [name]: value
        }))
    };
    console.log(_user);

    const handleSave = event => {
        event.preventDefault();
        loginUser(_user);
    };

    if(props.logging) {
        toast.success('You logged in successfully!');
    }

    console.log(_user)

    return (
        users.length === 0 || user.name === undefined ? (
            <Spinner/>
        ) : (
            <div>
                {props.redirectToPrivateProfile && <Redirect to={'/private-profile/' + user.email}/>}
                <LoginForm
                    user={_user}
                    onChange={handleChange}
                    onSave={handleSave}
                />
            </div>
        )
    )
};

const getUserBySlug = (users, slug) => {
    return users.find(user => user.email === slug)
}

const mapStateToProps = (state, ownProps) => {
    const slug = ownProps.match.params.slug;
    const user =
        slug && state.users.length > 0
            ? getUserBySlug(state.users, slug)
            : state.newUser;

    return {
        user,
        users: state.users,
        isSaving: state.isSaving,
        logging: state.logging,
        redirectToPrivateProfile: state.redirectToPrivateProfile
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
        loginUser: (user) => {
            dispatch(loginUser(user))
        }
    }
}

export default connect (mapStateToProps, mapDispatchToProps)(LoginPage);