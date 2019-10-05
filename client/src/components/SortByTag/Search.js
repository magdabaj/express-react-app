
/* ###################### */
/* ##### Search bar ##### */
/* ###################### */

// need a component class here
// since we are using `refs`

import React from 'react';
import 'client/src/components/SortByTag/SortByTag.css';

class Search extends React.Component {
    render() {
        const { filterVal, filterUpdate, filterByMaleOrFemale, sortByName } = this.props;
        return (
            <>
            <form>
                    <input type = "text" ref = "filterInput" placeholder = "Search.."
                        // binding the input value to state
                           value = { filterVal }
                           onChange = { () => { filterUpdate(this.refs.filterInput.value);}} />

                    <strong > Sort by: </strong>
                    <div className = "filter-menu">
                        <span> No Change </span>
                        <ul className = "dropdown-menu" >
                            <li onClick = { () => {sortByName('nochange')}} > No Change </li>
                            <li onClick = { () => {sortByName('name')}} > Name </li>
                        </ul>
                    </div>

                    <div className = "repo-filter-menu">
                        <strong > Filter by: </strong>
                            <div className = "filter-menu">
                                < span > All </span>
                                <ul className = "dropdown-menu">
                                    <li onClick={ () => { filterByMaleOrFemale('All')}} > All </li>
                                    <li onClick={ () => { filterByMaleOrFemale('boy')}} > Male </li>
                                    <li onClick={ () => { filterByMaleOrFemale('girl')}} > Female </li>
                                </ul>
                            </div>
                    </div>
            </form>
                </>
    )}}

    export default Search;


