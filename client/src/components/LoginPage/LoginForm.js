import {MDBBtn} from "mdbreact";
import TextInput from "../common/TextInput";
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



const LoginForm = ({user, onChange, onSave}) => {
    return (
        <form onSubmit={onSave}>
            <Header className={'h1 indigo-text'}>Log in</Header>
            <TextInput
                label={'Email'}
                name={'email'}
                value={user.email}
                onChange={onChange}
            />
            <TextInput
                label={'Password'}
                name={'password'}
                value={user.password}
                onChange={onChange}
            />
            <MDBBtn
                style={buttonStyle}
                type={'submit'}
                onSubmit={onSave}
                color={'indigo'}
                disabled={!user.email || !user.password }
            >
                Save
            </MDBBtn>
        </form>
    )
};

export default LoginForm;