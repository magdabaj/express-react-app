import {MDBBtn} from "mdbreact";
import React, {useEffect, useState} from 'react';
import {connect} from 'react-redux';
import {Redirect} from "react-router-dom";
import UsersList from './UsersList';
import {loadUsers, deleteUser} from "../redux/actions/userActions";
import styled from 'styled-components';
import {toast} from "react-toastify";

const Container = styled.div`
    padding: 2em;
  
`;

const buttonStyle = {
    borderRadius: 50,
    marginBottom: 20,
    textAlign: 'left'
}

const UsersPage = ({users, isSaving, loadUsers, deleteUser, ...props}) => {
    console.log(users);
    const [redirect, setRedirect] = useState(false);

    useEffect(() => {
        if(users.length === 0) {
            loadUsers();
        }
    }, []);

    const handleUserDelete = async(user) => {
        try{
            deleteUser(user)
        } catch (error) {
            toast.error('Delete failed. ' + error.message, {autoClose: false})
        }
    };
    if(props.deletingUser) {
        toast.success('User deleted');
    }


    return (
        <Container>
            {redirect && <Redirect to={'/user'}/>}
            <MDBBtn className={'wave-effect'} style={buttonStyle} color="indigo" onClick={() => setRedirect(true)}>Add user</MDBBtn>
            <UsersList users={users} onDelete={handleUserDelete}/>
        </Container>

    )
};

const mapStateToProps = state => {
    return {
        users: state.users,
        isSaving: state.isSaving,
        usersError: state.usersError,
        deletingUser: state.deletingUser
    }
}
const mapDispatchToProps = dispatch => {
    return {
        loadUsers: () => {
            dispatch(loadUsers());
        },
        deleteUser: user => {
            dispatch(deleteUser(user))
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps) (UsersPage);