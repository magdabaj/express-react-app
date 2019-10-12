import {MDBBtn} from "mdbreact";
import React, {useState} from 'react';
import {Link, Redirect} from "react-router-dom";
import styled from 'styled-components';

const Container = styled.div`
    padding: 2em
`;

const ButtonsContainer = styled.div`
    display: flex,
    justify-content: space-between
`;

const buttonStyle = {
    borderRadius: '50px'
};

const GoToUserPrivatePage = () => {
    const [toLoginPage, redirectToLoginPage] = useState(false);
    const [toRegisterPage, redirectToRegisterPage] = useState(false);

    const setLoginRedirect = () => redirectToLoginPage(!toLoginPage);
    const setRegisterPage = () => redirectToRegisterPage(!toRegisterPage);

    return(
        <Container>
            {toLoginPage && <Redirect to={'/login'}/>}
            {toRegisterPage && <Redirect to={'/register'}/>}
            <ButtonsContainer>
                <MDBBtn
                    style={buttonStyle}
                    color={'indigo'}
                    onClick={() => setLoginRedirect()}
                >
                    Login
                </MDBBtn>
                <MDBBtn
                    style={buttonStyle}
                    color={'indigo'}
                    onClick={() => setRegisterPage()}
                >
                    Register
                </MDBBtn>
            </ButtonsContainer>
        </Container>
    )
};

export default GoToUserPrivatePage;