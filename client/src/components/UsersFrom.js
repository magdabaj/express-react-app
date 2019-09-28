import {MDBBtn} from "mdbreact";
import TextInput from "./common/TextInput";
import React from 'react';
import styled from 'styled-components';

const buttonStyle = {
    borderRadius: '50px'
};

const Header = styled.div`
    text-align: center;
      margin: 0 1em;
  padding: 0.25em 1em;
`;



const UsersForm = ({user, onChange, onSave}) => {
    return (
        <form onSubmit={onSave}>
            <Header className={'h1 indigo-text'}>User</Header>
            <TextInput
                label={'Name'}
                name={'name'}
                value={user.name}
                onChange={onChange}
            />
            <TextInput
                label={'Surname'}
                name={'surname'}
                value={user.surname}
                onChange={onChange}
            />
            <TextInput
                label={'Email'}
                name={'email'}
                value={user.email}
                onChange={onChange}
            />
            <MDBBtn
                style={buttonStyle}
                type={'submit'}
                onSubmit={onSave}
                color={'indigo'}
            >
                Save
            </MDBBtn>
        </form>
    )
};

export default UsersForm;