import {MDBContainer} from "mdbreact";
import Header from "./components/common/Header";
import React from 'react';
import './App.css';
import {Route, Switch} from 'react-router-dom';
import {store} from "./redux/store";
import {ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import HomePage from './components/HomePage';
import UsersPage from './components/UsersPage';
import AboutPage from './components/AboutPage';
import ManageUsersPage from './components/ManageUsersPage';
// import BurgerHeader from './components/common/BurgerHeader';

const App = () => {
   console.log(store.getState());


        return (
            <div>
                <Header/>
            <MDBContainer className={'App'} >
                <Switch>
                    <Route exact path={'/'} component={HomePage}/>
                    <Route path={'/users'} component={UsersPage}/>
                    <Route path={'/user/:slug'} component={ManageUsersPage}/>
                    <Route path={'/user'} component={ManageUsersPage}/>
                    <Route path={'/about'} component={AboutPage}/>
                </Switch>
                <ToastContainer autoClose={3000}/>
            </MDBContainer>
            </div>
        );
};

export default App;
