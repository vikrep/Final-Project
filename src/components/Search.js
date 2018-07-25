import React from 'react';
import Button from './Button'
import './Search.css'

const Search = props => {
    return (
        <div>
            <input className="inputStyle" type="text" placeholder="Artist Full Name" value={props.searchName} onChange={props.setSearchName} />
            <div>
                < Button name="Search Artist" clicked={props.searchByName} />
                < Button name="Clear Search" clicked={props.showAll} />
            </div>
        </div>
    )
};

export default Search;
