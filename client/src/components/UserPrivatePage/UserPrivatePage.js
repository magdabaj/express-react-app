import Spinner from "../../components/common/Spinner";
import {MDBBtn} from "mdbreact";
import {loadUsers, setUser} from "../../redux/actions/userActions";
import React, {useEffect} from 'react';
import {connect} from "react-redux";
import Container from './Container';
import ArticlesPage from './ArticlesPage';
import {loadUserArticles} from "../../redux/actions/articlesActions";

const buttonStyle = {
    borderRadius: '50px'
};


const UserPrivatePage = ({
                             user,
                             users,
                             setUser,
                             loadUsers,
                             loadUserArticles,
                             articles,
                             ...props
}) => {
    console.log('user', user);

    useEffect(() => {
        if(users.length === 0) {
            loadUsers()
        }

        if(user.name === '') {
            setUser(user)
        }

    }, []);

    return (
        <Container>
            {user.name !== '' && user !== undefined ? (
                <>
                    <h1>Hello {user.name}</h1>
                    <MDBBtn
                        style={buttonStyle}
                        color={'indigo'}
                    >
                        Add article
                    </MDBBtn>
                    <ArticlesPage
                        user={user}
                        loadUserArticles={loadUserArticles}
                        articles={articles}
                    />
                </>
                ) : <Spinner/>
            }
        </Container>
    )
};

const getUserBySlug = (users, slug) => {
    return users.find(user => user.email === slug)
};

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
        savingUser: state.savingUser,
        articles: state.articles
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
        loadUserArticles: (user_id) => {
            dispatch(loadUserArticles(user_id))
        }
    }
};

export default connect (mapStateToProps, mapDispatchToProps)(UserPrivatePage);