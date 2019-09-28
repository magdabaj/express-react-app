import React from 'react';
import {MDBBtn, MDBContainer, MDBTable, MDBTableBody, MDBTableHead} from 'mdbreact';
import {Link} from 'react-router-dom';

const buttonStyle = {
    borderRadius: 50
}

const UsersList = ({users, onDelete}) => {
    return (
        <div  style={{overflowY: 'auto', overflowX: 'auto' }}>
        <table className={'table'}>
            <thead className={'thead-indigo'} color="indigo" >
                <tr>
                    <th>Name</th>
                    <th>Surname</th>
                    <th>Email</th>
                    <th/>
                </tr>
            </thead>
            <tbody>
                {users.map(user => (
                    <tr key={user.id}>
                        <td>
                            <Link to={'/user/' + user.email}>{user.name}</Link>
                        </td>
                        <td>{user.surname}</td>
                        <td>{user.email}</td>
                        <td><MDBBtn style={buttonStyle} className={'btn-sm'} outline color="danger" onClick={() => onDelete(user)}>Delete</MDBBtn></td>
                    </tr>
                ))}
            </tbody>
        </table>
        </div>
    );
}

export default UsersList;