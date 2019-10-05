import React from 'react';
import {loadUsers} from "../../redux/actions/userActions";
import {loadImages} from "../../redux/actions/imageActions";
import {connect} from "react-redux";
import Suggestions from './Suggestions';
import SortByTag from '../SortByTag/SortByTag';


class RedirectToProfilePage extends React.Component {
    state = {
        query:'',
        results: []
    };

    componentDidMount() {
        const {users} = this.props;

        if(users.length === 0) {
            // this.props.loadUsers();
        }
    }


    handleInputChange = () => {
        console.log(this.props.users);
        this.setState({
            query: this.search.value
        }, () => {
            if(this.state.query && this.state.query.length > 1) {
                if(this.state.query.length % 2 === 0) {
                    this.props.loadUsers()
                }
            } else if(!this.state.query){
            }

        })
    }

    render() {
        return (
        <form>
            {/*<input*/}
            {/*    placeholder={'Search for...'}*/}
            {/*    ref={input => this.search = input}*/}
            {/*    onChange={this.handleInputChange}*/}
            {/*/>*/}
            {/*/!*<Suggestions users={this.props.users}/>*!/*/}
            {/*{console.log(this.state.query)}*/}

            <SortByTag/>
        </form>
        )
    }
}
const mapStateToProps = (state, ownProps) => {
    return {
        users: state.users,
        images: state.images
    }
};

const mapDispatchToProps = dispatch => {
    return {
        loadUsers: () => {
            dispatch(loadUsers())
        },
        loadImages: () => {
            dispatch(loadImages())
        }
    }
}



export default connect(mapStateToProps, mapDispatchToProps)(RedirectToProfilePage);


// import {Link} from "react-router-dom";
// import {loadImages} from "../../redux/actions/imageActions";
// import {loadUsers} from "../../redux/actions/userActions";
// import React, {useEffect, useState} from 'react';
// import {connect} from "react-redux";
// import RedirectForm from './RedirectForm';
//
// const RedirectToProfilePage = ({users, loadUsers}) => {
//
//     const [query, changeQuery] = useState('');
//     const [responseData, setResponseData] = useState([]);
//
//     useEffect(()=>{
//         if(users.length === 0) {
//             loadUsers();
//         }
//     }, []);
//
//     const handleChange = (event) => {
//         const {value} = event.target;
//         changeQuery(value);
//         let words = query.split(' ');
//         console.log(diff(users, words));
//     };
//     console.log(query);
//     console.log(responseData);
//     const diff = (users, words) => {
//         words.sort();
//         for(let i = 0; i < words.length; i += 1) {
//             // let newUser = users.find(user => user.name === words[i] || user.surname === words[i]);
//             let newUser = users.filter(user => user.name === words[i]);
//             setResponseData(prevData => ({
//                 ...prevData,
//                 ...newUser
//             }))
//         }
//     };
//
//     return (
//         <div>
//             <h2 className={'h2 indigo-text'}>Write name and surname</h2>
//             <RedirectForm handleChange={handleChange} query={query}/>
//             {responseData.length>0 ?
//             // responseData.map(user => (
//             <div><Link to={'profile/' + responseData.email}> {responseData.name} {responseData.surname}</Link></div>
//             : null}
//         </div>
//     )
// };
// const mapStateToProps = (state, ownProps) => {
//     return {
//         users: state.users,
//         images: state.images
//     }
// };
//
// const mapDispatchToProps = dispatch => {
//     return {
//         loadUsers: () => {
//             dispatch(loadUsers())
//         },
//         loadImages: () => {
//             dispatch(loadImages())
//         }
//     }
// }
//
//
//
// export default connect(mapStateToProps, mapDispatchToProps)(RedirectToProfilePage);
//
//
