import "./SearchBar.css";

import { useState } from "react";
import { fetchSearchResults } from "../api";

export const SearchBar = (props) => {
    const [query, setQuery] = useState("");
    const [results, setResults] = useState([]);
    
    const performSearch = (q) => {
        fetchSearchResults(props.mapID, q, (data) => {
            setResults(data)
            console.log(data);
        });
    };
    
    const clearInput = () => {
        setQuery("");
        setResults([]);
    };
    
    const handleInput = (e) => {
        const input = e.target.value;
        setQuery(input);
        
        if (input && input.trim()) {
            performSearch(encodeURIComponent(input.trim()));
        }
    };
    
    return (
        <div className="search-wrapper">
            <div className="searchbar-wrapper">
                <input className="searchbar"
                    placeholder="Find a room"
                    value={query}
                    onInput={handleInput} />
                { query.length > 0 &&
                    <DeleteIcon size={20} onClick={clearInput} /> }
                { query.length == 0 &&
                    <SearchIcon size={20} /> }
            </div>
            { results &&
                <SearchResults results={results} /> }
        </div>
    );
};

const SearchResults = (props) => {
    return (
        <div className="search-results-wrapper">
            <ul className="search-results">
            {
                props.results.map(r => {
                    return (
                        <li key={"result-" + r._id}>
                            <span>{r.properties.name}</span>
                        </li>
                    )
                })
            }
            </ul>
        </div>
    );
}

/**
Circle with an X.
Has a onClick handler to function as the erase all button for the searchbar.
*/
const DeleteIcon = (props) => (
    <svg className="icon close-icon"
        width={props.size} height={props.size}
        onClick={props.onClick}>
        <circle cx={props.size/2} cy={props.size/2} r={props.size*.4}
            stroke="gray" strokeWidth="1.5" fill="none" />
        <path stroke="gray" strokeWidth="1.5"
            d={
                `M ${props.size*.3} ${props.size*.3}` +
                `L ${props.size*.7} ${props.size*.7}` +
                `M ${props.size*.7} ${props.size*.3}` +
                `L ${props.size*.3} ${props.size*.7}`
            } />
    </svg>
);

/**
Magnifying glass icon.
I currently don't have internet access so I had to make it from scratch. Thank
god for trigonometry. Please don't judge the mess.
*/
const SearchIcon = (props) => (
    <svg width={props.size} height={props.size}>
        <circle cx={props.size*.4} cy={props.size*.4} r={props.size*.3}
            stroke="gray" strokeWidth="1.5" fill="none" />
        <path stroke="gray" strokeWidth="1.5"
            d={
                `M ${props.size*.4 + Math.cos(Math.PI/4)*props.size*.3}` +
                ` ${props.size*.4 + Math.cos(Math.PI/4)*props.size*.3}` +
                `L ${props.size*.9} ${props.size*.9}`
            } />
    </svg>
);