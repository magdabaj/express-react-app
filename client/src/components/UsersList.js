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
                    <th>Email</th>
                    <th>See profile</th>
                    <th/>
                </tr>
            </thead>
            <tbody>
                {users.map(user => (
                    <tr key={user.id}>
                        <td>
                            <Link to={'/user/' + user.email}>{user.name} {user.surname}</Link>
                        </td>
                        <td>{user.email}</td>
                        <td>
                            <Link to={'/profile/' + user.email}>Link</Link>
                        </td>
                        <td><MDBBtn style={buttonStyle} className={'btn-sm'} outline color="danger" onClick={() => onDelete(user)}>Delete</MDBBtn></td>
                    </tr>
                ))}
            </tbody>
        </table>
        </div>
    );
}

export default UsersList;