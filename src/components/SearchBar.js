import "./SearchBar.css";

import { useState, useRef, useEffect } from "react";
import { LoadingSpinner } from "./LoadingSpinner";
import { fetchSearchResults } from "../api";

export const SearchBar = (props) => {
    const [active, setActive] = useState(false);
    const [query, setQuery] = useState("");
    const [results, setResults] = useState([]);
    const [loading, setLoading] = useState(false);
    
    const searchRef = useRef(null);
    const inputRef = useRef(null);
    
    /** Whether the search results box is visible */
    const isOpen = active && query.length > 0;
    
    const performSearch = (q) => {
        setLoading(true);
        
        fetchSearchResults(props.mapID, q, (data) => {
            setResults(data)
            setLoading(false);
        });
    };
    
    const clearInput = () => {
        setQuery("");
        setResults([]);
    };
    
    const handleInput = (e) => {
        const input = e.target.value;
        setQuery(input);
        setActive(true);
        
        if (input && input.trim()) {
            performSearch(encodeURIComponent(input.trim()));
        } else {
            setResults([]);
        }
    };
    
    /**
    Selects the room from a search result. Called when the user clicks on a
    search result.
    */
    const handleResultSelect = (result) => {
        props.onSelect(result.room_id);
        setActive(false);
    };
    
    /**
    Blurs the search bar and hides the search results container when the
    user clicks outside of the search bar or results.
    */
    const handleOutsideClick = (e) => {
        if (searchRef.current && !searchRef.current.contains(e.target)) {
            setActive(false);
        }
    };
    
    useEffect(() => {
        document.addEventListener("click", handleOutsideClick);
        
        return () => document.removeEventListener("click", handleOutsideClick);
    }, [handleOutsideClick]);
    
    return (
        <div className="search-wrapper"
            ref={searchRef}>
            <div className={"searchbar-wrapper" + (isOpen ? " open" : "")}
                onClick={(e) => {
                    e.stopPropagation();
                    inputRef.current.focus();
                    setActive(true);
                }}>
                <input className="searchbar"
                    ref={inputRef}
                    placeholder="Find a room"
                    value={query}
                    onInput={handleInput}
                    onFocus={() => setActive(true)} />
                {
                    (query.length > 0 && active) ?
                        <DeleteIcon size={20} onClick={clearInput} />
                        : <SearchIcon size={20} />
                }
            </div>
            { isOpen &&
                <SearchResults results={results}
                    loading={loading}
                    onSelect={handleResultSelect} /> }
        </div>
    );
};

const SearchResults = (props) => {
    return (
        <div className="search-results-wrapper">
            <ul className="search-results">
            { props.loading && <LoadingSpinner size={20} /> }
            {
                (!props.loading && props.results.length == 0) &&
                    <div>No results found.</div>
            }
            {
                props.results.map(r => {
                    return (
                        <li key={"result-" + r._id}
                            onClick={() => props.onSelect(r)}>
                            <span>{r.properties.name}</span>
                            { r.properties.name != r.room_id &&
                                <span>{r.room_id}</span> }
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
    <svg className="icon delete-icon"
        width={props.size} height={props.size}
        onClick={props.onClick}>
        <circle cx={props.size/2} cy={props.size/2} r={props.size*.4}
            strokeWidth="1.5" fill="none" />
        <path strokeWidth="1.5"
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
    <svg className="icon"
        width={props.size} height={props.size}>
        <circle cx={props.size*.4} cy={props.size*.4} r={props.size*.3}
            strokeWidth="1.5" fill="none" />
        <path strokeWidth="1.5"
            d={
                `M ${props.size*.4 + Math.cos(Math.PI/4)*props.size*.3}` +
                ` ${props.size*.4 + Math.cos(Math.PI/4)*props.size*.3}` +
                `L ${props.size*.9} ${props.size*.9}`
            } />
    </svg>
);