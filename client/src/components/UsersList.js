import React from 'react';
import {MDBBtn, MDBContainer, MDBTable, MDBTableBody, MDBTableHead} from 'mdbreact';

const buttonStyle = {
    borderRadius: 50
}

const UsersList = ({users, onDelete}) => {
    return (
        <table className={'table'} style={{overflowX: 'auto' }}>
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
                        <td>{user.name}</td>
                        <td>{user.surname}</td>
                        <td>{user.email}</td>
                        <td><MDBBtn style={buttonStyle} className={'btn-sm'} outline color="danger" onClick={() => onDelete(user)}>Delete</MDBBtn></td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
}

export default UsersList;