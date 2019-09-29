// import React from 'react';
// import {NavLink} from "react-router-dom";
//
// const Header = () => {
//     const activeStyle = {
//         color: 'lightblue'
//     };
//
//
//     return (
//         <nav>
//             <NavLink to={'/'} activeStyle={activeStyle} exact>Home</NavLink>
//             <NavLink to={'/users'} activeStyle={activeStyle}>Leaves</NavLink>
//             <NavLink to={'/about'}>About</NavLink>
//         </nav>
//     )
// };
// export default Header;

import React from 'react';
import { MDBNavbar, MDBNavbarBrand, MDBNavbarNav, MDBNavbarToggler, MDBCollapse, MDBNavItem, MDBNavLink, MDBIcon, MDBContainer } from 'mdbreact';
import { BrowserRouter as Router } from 'react-router-dom';

class Header extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            collapse: false,
        };
        this.onClick = this.onClick.bind(this);
    }

    onClick() {
        this.setState({
            collapse: !this.state.collapse,
        });
    }

    render() {
        const container = { height: 1300 }
        return (
            <div style={{width: '100%'}}>
                <Router>
                    <header>
                        <MDBNavbar color="indigo" dark expand="md">
                            <MDBNavbarBrand href="/">
                                <strong>Users</strong>
                            </MDBNavbarBrand>
                            <MDBNavbarToggler onClick={this.onClick} />
                            <MDBCollapse isOpen={this.state.collapse} navbar>
                                <MDBNavbarNav left>
                                    <MDBNavItem active>
                                        <MDBNavLink to="/">Home</MDBNavLink>
                                    </MDBNavItem>
                                    <MDBNavItem>
                                        <MDBNavLink to="/users">Users</MDBNavLink>
                                    </MDBNavItem>
                                    <MDBNavItem>
                                        <MDBNavLink to="/profile">Profiles</MDBNavLink>
                                    </MDBNavItem>
                                    <MDBNavItem>
                                        <MDBNavLink to="#">Opinions</MDBNavLink>
                                    </MDBNavItem>
                                </MDBNavbarNav>
                                <MDBNavbarNav right>
                                    <MDBNavItem>
                                        <MDBNavLink to="#"><MDBIcon fab icon="facebook-f" /></MDBNavLink>
                                    </MDBNavItem>
                                    <MDBNavItem>
                                        <MDBNavLink to="#"><MDBIcon fab icon="twitter" /></MDBNavLink>
                                    </MDBNavItem>
                                    <MDBNavItem>
                                        <MDBNavLink to="#"><MDBIcon fab icon="instagram" /></MDBNavLink>
                                    </MDBNavItem>
                                </MDBNavbarNav>
                            </MDBCollapse>
                        </MDBNavbar>
                    </header>
                </Router>
            </div>
        );
    }
}

export default Header;