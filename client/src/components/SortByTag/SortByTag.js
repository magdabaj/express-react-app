import {Link} from "react-router-dom";
import { toast} from "react-toastify";
import TextInput from "../common/TextInput";
import React, {useEffect, useState} from 'react';
import {connect} from "react-redux";
import {addTag, addTagFinished, deleteTag} from "../../redux/actions/tagsActions";
import {loadUsers} from "../../redux/actions/userActions";


const SortByTag = ({users, tags, newTag, setTagSuccess, matchTags, ...props}) => {
    const [_tag, _setTag] = useState(newTag);
    const [suggestions, setSuggestions] = useState([]);
    const [activeSuggestions, setActiveSuggestions] = useState(0);
    const [showSuggestions, setShowSuggestions] = useState(false);
    console.log(_tag);
    console.log('tags', tags);
    console.log('matchTags', matchTags)

    useEffect(() => {
        if(users.length === 0) {
            props.loadUsers();
        }


        if(setTagSuccess) {
            props.addTagFinished();
        }

    }, []);

    // if(users.length > 0){
    //     const suggestions = users.map((user) => {
    //         return {
    //             id: user.user_id,
    //             name: user.name,
    //             surname: user.surname,
    //         }
    //     });
    //     console.log(suggestions)
    // }


    const handleInputChange = (event) => {
        const{ value, name} = event.target;
        _setTag({
                [name]: value
        });
        console.log(users.filter(user => (
            user.name.toString().includes(_tag.text.toString())
        )))

        try{
        const suggestion = users.filter(user => (
            user.name.toString().includes(_tag.text.toString())
        ));


        setSuggestions(users.filter(user => (
                    user.name.toString().includes(_tag.text.toString())
                )))
        } catch(e) {
            console.log(e.message)
        }
        setShowSuggestions(true);
    };

    console.log(_tag, suggestions);

    const onClick = e => {
        setSuggestions([]);
        setShowSuggestions(false);
        _setTag(e.currentTarget.innerText)
    };

    const onKeyDown = e => {
        // if(e.keyCode === 13 ){
        //     setShowSuggestions(false);
        //     _setTag(suggestions[activeSuggestions])
        // } else if (e.keyCode === 38) {
        //     if (activeSuggestions === 0) {
        //         return;
        //     }
        //     setActiveSuggestions(activeSuggestions-1)
        // } else if (e.keyCode === 40) {
        //     if (activeSuggestions - 1 === suggestions.length) {
        //         return;
        //     }
        //     setActiveSuggestions(activeSuggestions + 1)
        // }


    };

    const handleSave = (event) => {
        event.preventDefault();
        // if(tags.map(tag => tag.text === _tag.text)){
        //     toast.info('Tag already exists')
        // } else {
            props.addTag(_tag);
        // }
    };

    if(setTagSuccess){
        props.addTagFinished(_tag, users)
    }

    const handleDeleteTag = async (tag) => {
        try {
            props.deleteTag(tag);
        } catch(error) {
            toast.error('Delete failed. ' + error.message, {autoClose: false})
        }
    };

    let SuggestionsComponent;
    if(showSuggestions && _tag) {
        if(suggestions.length > 0) {
           SuggestionsComponent = (
                   <ul>
                        {suggestions.map((sug, i) => (
                        <li
                            key={i}
                            onClick={onClick}
                        >
                            {sug}
                        </li>
                        ))}
                   </ul>
               )
        }
    }


    return (
        <div className="input-tag">
            <ul className="input-tag__tags">
                { tags.length > 0 ?
                    tags.map((tag, i) => (
                        <li key={i}>
                            {tag.text}
                            <button type="button" onClick={() => handleDeleteTag(tag)}>+</button>
                        </li>
                    ))
                    : null
                }
            </ul>
            <form onSubmit={handleSave}>
                <TextInput name={'text'} label={''} placeholder={'Search for...'} onChange={handleInputChange} onKeyDown={onKeyDown}/>
                <button onSubmit={handleSave}>Save</button>
            </form>
            {SuggestionsComponent}
            {matchTags.map(tag => (
                <div><Link to={'profile/' + tag.email}>{tag.name} {tag.surname}</Link></div>
            ))}

        </div>
    );

    //
    // inputKeyDown = (e) => {
    //     const val = e.target.value;
    //     if (e.key === 'Enter' && val) {
    //         // if (this.state.tags.find(tag => tag.text.toLowerCase() === val.toLowerCase())) {
    //         //     return;
    //         // }
    //         this.setState(state => ({ tags: [...state.tags, {id: val, text: val}] }));
    //         if(this.props.users.length > 0) {
    //             this.diff(this.state.tags, this.props.users);
    //         }
    //         this.tagInput.value = null;
    //     } else if (e.key === 'Backspace' && !val) {
    //         this.removeTag(this.state.tags.length - 1);
    //     }
    // };
    //
    // const diff = (tags, users) => {
    //     console.log('diff ');
    //     console.log(users);
    //     let array = [];
    //     for(let i=0; i<tags.length; i+=1) {
    //         let newUser = users.find(user => user.name.toString() === tags[i].text.toString()) || null;
    //         if(newUser){
    //             array.push(newUser);
    //         }
    //         console.log(newUser)
    //        console.log(array)
    //     }
    //     // setAnswer(array);
    //     return array;
    // };
    // console.log(answer);



}

const mapStateToProps = state => {
    return {
        users: state.users,
        tags: state.tags,
        newTag: state.newTag,
        setTagSuccess: state.setTagSuccess,
        matchTags: state.matchTags
    }
};

const mapDispatchToProps = dispatch => {
    return {
        loadUsers: () => {
            dispatch(loadUsers());
        },
        addTag: (tag) => {
            dispatch(addTag(tag))
        },
        addTagFinished: (tag, users) => {
            dispatch(addTagFinished(tag, users))
        },
        deleteTag: tag => {
            dispatch(deleteTag(tag))
        }
    }
};

export default connect (mapStateToProps, mapDispatchToProps) (SortByTag);

// import {COUNTRIES} from './countries';
// import './SortByTag.css';
// import { WithContext as ReactTags } from 'react-tag-input';
//
// const suggestions = COUNTRIES.map((country) => {
//     return {
//         id: country,
//         text: country
//     }
// })
//
// const KeyCodes = {
//     comma: 188,
//     enter: 13,
// };
//
// const delimiters = [KeyCodes.comma, KeyCodes.enter];
//
//
// class SortByTag extends React.Component {
//     constructor(props) {
//         super(props);
//
//         this.state = {
//             tags: [{ id: 'Thailand', text: 'Thailand' }, { id: 'India', text: 'India' }],
//             suggestions: suggestions,
//             answer: []
//         };
//         this.handleDelete = this.handleDelete.bind(this);
//         this.handleAddition = this.handleAddition.bind(this);
//         this.handleDrag = this.handleDrag.bind(this);
//         this.handleTagClick = this.handleTagClick.bind(this);
//         this.diff = this.diff.bind(this);
//     }
//
//     handleDelete(i) {
//         const { tags } = this.state;
//         const {answer} = this.state;
//         this.setState({
//             tags: tags.filter((tag, index) => index !== i),
//             answer: answer.filter((ans, index) => index !== i)
//         });
//         console.log(answer)
//     }
//
//     handleAddition(tag) {
//         this.setState(state => ({ tags: [...state.tags, tag] }));
//         if(this.state.tags.length > 0) {
//             this.diff(this.state.tags, this.state.suggestions);
//         }
//     }
//
//     handleDrag(tag, currPos, newPos) {
//         const tags = [...this.state.tags];
//         const newTags = tags.slice();
//
//         newTags.splice(currPos, 1);
//         newTags.splice(newPos, 0, tag);
//
//         // re-render
//         this.setState({ tags: newTags });
//     }
//
//     handleTagClick(index) {
//         console.log('The tag at index ' + index + ' was clicked');
//     }
//
//     diff(tags, suggestions) {
//         let array = [];
//         for(let i=0; i<tags.length; i+=1) {
//             let newCountry = suggestions.find(sug => sug.text === tags[i].text) || null;
//             if(newCountry){
//                 array.push(newCountry);
//             }
//            console.log(array)
//         }
//
//         this.setState(state => ({answer: array}))
//     };
//
//
//     render() {
//         const { tags, suggestions, answer } = this.state;
//         console.log(tags);
//         console.log(answer);
//         return (
//             <div>
//                 <ReactTags
//                     tags={tags}
//                     suggestions={suggestions}
//                     delimiters={delimiters}
//                     handleDelete={this.handleDelete}
//                     handleAddition={this.handleAddition}
//                     handleDrag={this.handleDrag}
//                     handleTagClick={this.handleTagClick}
//                 />
//                 {this.state.answer.map(ans => (
//                     <div>{ans.text}</div>
//                 ))}
//             </div>
//         );
//     }
// }
//
// export default SortByTag;