import {MDBContainer, MDBIcon} from "mdbreact";
import React, {useEffect, useState} from 'react';
import bcImg from '../../images/bridge-1385938_960_720.jpg';
import msgIcon from '../../images/baseline_grade_black_48dp.png';
import styled from 'styled-components';
import fallowIcon from '../../images/baseline_reply_black_48dp.png';

const Img = styled.img`
    width: 100%;
    max-width: 300px;
    height: auto;
    border-radius: 50%;
    padding: 2em
`;

const MsgFallowContainer = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-around;
`;

const ProfileOptions = styled.div`
    height: 50px;
    width: 50%;
    cursor: pointer;
`;

const Msg = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-around; 
    vertical-align: middle;
    border: 2px 3px 2px 3px solid #3f51b5;
    // box-shadow: 0 0 1em #3f51b5;
    border-radius: 40px
`;

const IconText = styled.div`
    color: grey;
    font-size: 1em;
`;

const UserProfile = ({images, user}) => {
    const [userSrc, setUserSrc] = useState(bcImg);
    // console.log(user);
    let user_img = images.find(img => (img.user_id === user.user_id && img.is_profile_img === true)) || null;

    useEffect(() => {
        if(user_img) {
            setUserSrc(user_img.url);
        }
    },[]);

    console.log(userSrc);
    return (
        <div>
            <div>
                <Img src={userSrc} alt={'profile photo'}/>
                <MsgFallowContainer >
                    <div style={{width: '20%'}}/>
                    <ProfileOptions onClick={() => {
                        // todo display messages
                    }}>
                        <Msg>
                            <div style={{width: '20%'}}/>
                            <MDBIcon far icon="envelope" size={'2x'}  className="indigo-text pr-2" />
                            <IconText className={'indigo-text font-weight-bold'}>Message</IconText>
                            <div style={{width: '20%'}}/>
                        </Msg>
                    </ProfileOptions>
                    <div style={{width: '5%'}}/>
                    <ProfileOptions>
                        <Msg>
                            <div style={{width: '20%'}}/>
                            <MDBIcon icon="user-plus" lgs size={'2x'}  className="indigo-text pr-2" />
                            <IconText className={'indigo-text font-weight-bold'}>Fallow</IconText>
                            <div style={{width: '20%'}}/>
                        </Msg>
                    </ProfileOptions>
                    <div style={{width: '20%'}}/>
                </MsgFallowContainer>
            </div>
        </div>
    )
};

export default UserProfile;