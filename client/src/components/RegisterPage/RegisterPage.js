import Spinner from "../common/Spinner";
import RegisterForm from './RegisterForm';
import React, {useEffect, useState} from 'react';
import {loadUsers, setUser, saveUser} from "../../redux/actions/userActions";
import {connect} from 'react-redux';
import {toast} from "react-toastify";

const RegisterPage = ({user, users, loadUsers, setUser, isSaving, saveUser, ...props}) => {
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
        saveUser(_user);
    };
    if(props.savingUser) {
        toast.success('You registered successfully!');
        props.history.push('/users');
    }

    return (
        users.length === 0 || user.name === undefined ? (
            <Spinner/>
        ) : (
            <div>
                <RegisterForm
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
        savingUser: state.savingUser
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
        saveUser: (user) => {
            dispatch(saveUser(user))
        }
    }
}

export default connect (mapStateToProps, mapDispatchToProps)(RegisterPage);