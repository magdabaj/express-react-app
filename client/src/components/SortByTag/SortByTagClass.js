import {Link} from "react-router-dom";
import { toast} from "react-toastify";
import './SortByTag.css'
import React, {Fragment, useEffect, useState} from 'react';
import {connect} from "react-redux";
import {addTag, addTagFinished, deleteTag} from "../../redux/actions/tagsActions";
import {loadUsers} from "../../redux/actions/userActions";


class SortByTag extends React.Component {
    state = {
        // The active selection's index
        activeSuggestion: 0,
        // The suggestions that match the user's input
        filteredSuggestions: [],
        // Whether or not the suggestion list is shown
        showSuggestions: false,
        // What the user has entered
        tag: this.props.newTag
    };

    componentDidMount() {
        if(this.props.users.length === 0) {
            this.props.loadUsers();
        }

        if(this.props.setTagSuccess) {
            this.props.addTagFinished();
        }
    }

    handleInputChange = (event) => {
        const {users} = this.props;
        const{ value, name} = event.target;
        this.setState({tag: {[name]: value}});
        this.setState({
            filteredSuggestions: users.filter(user => (
                user.name.includes(this.state.tag.text)
            ))
        });

        this.setState({
            activeSuggestion: 0,
            showSuggestions: true,
        })
    };

    onClick = e => {
        this.setState({
            activeSuggestion: 0,
            filteredSuggestions: [],
            showSuggestions: false,
            tag: {text: e.currentTarget.innerText}
        })
    };

    onKeyDown = e => {
        const {activeSuggestion, filteredSuggestions} = this.state;
        // user presses the enter key
        if(e.keyCode === 13 ){
            this.setState({
                activeSuggestions: 0,
                showSuggestions: false,
                tag: {text: filteredSuggestions[activeSuggestion]}
            })
        }
        // user pressed the up arrow, decrement the index
        else if (e.keyCode === 38) {
            if (activeSuggestion === 0) {
                return;
            }
            this.setState({activeSuggestion: activeSuggestion - 1})
        }
        // user pressed the down arrow, increment the index
        else if (e.keyCode === 40) {
            if (activeSuggestion - 1 === filteredSuggestions.length) {
                return;
            }
            this.setState({activeSuggestion: activeSuggestion + 1})
        }
    };

    handleSave = (event) => {
        event.preventDefault();
        // if(tags.map(tag => tag.text === _tag.text)){
        //     toast.info('Tag already exists')
        // } else {
        this.props.addTag(this.state.tag);
        // }
    };


    handleDeleteTag = async (tag) => {
        try {
            this.props.deleteTag(tag);
        } catch(error) {
            toast.error('Delete failed. ' + error.message, {autoClose: false})
        }
    };
    render() {
        const {tags, matchTags, users} = this.props;
        if(this.props.setTagSuccess){
            this.props.addTagFinished(this.state.tag, users)
        }

    console.log(this.state.tag, this.state.filteredSuggestions);
    return (
        <div className="input-tag">
            <ul className="input-tag__tags">
                { tags.length > 0 ?
                    tags.map((tag, i) => (
                        <li key={i}>
                            {tag.text}
                            <button type="button" onClick={() => this.handleDeleteTag(tag)}>+</button>
                        </li>
                    ))
                    : null
                }
            </ul>
            {/*<form onSubmit={this.handleSave}>*/}
            {/*    <TextInput name={'text'} label={''} placeholder={'Search for...'} onChange={this.handleInputChange} />*/}
            {/*    <button onSubmit={this.handleSave}>Save</button>*/}
            {/*</form>*/}
            <Fragment >
                <form onSubmit={this.handleSave}>
                <input
                    type={'text'}
                    onChange={this.handleInputChange}
                    onKeyDown={this.onKeyDown}
                    name={'text'}
                    value={this.state.tag.text}
                />
                <button onSubmit={this.handleSave}>Add tag</button>
                </form>

                {this.state.filteredSuggestions.length > 0 && this.state.showSuggestions && this.state.tag ?
                    this.state.filteredSuggestions.map((sug,i) => {
                        let className;
                        if(i === this.state.activeSuggestion) {
                            className = 'suggestion-active'
                        }
                        return (
                            <ul className={'suggestions'}>
                            <li
                                className={className}
                                key={i}
                                onClick={this.onClick}
                            >
                                {sug.name}
                            </li>
                        </ul>
                        )}) :
                    <div className="no-suggestions">
                        <em>No suggestions, you're on your own!</em>
                    </div>
                }

            </Fragment>
            {matchTags.map(tag => (
                <div><Link to={'profile/' + tag.email}>{tag.name} {tag.surname}</Link></div>
            ))}

        </div>

    )}
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