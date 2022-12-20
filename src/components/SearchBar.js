import "./SearchBar.css";

import { useState } from "react";
import { fetchSearchResults } from "../api";

export const SearchBar = (props) => {
    const [query, setQuery] = useState("");
    const [results, setResults] = useState([]);
    
    const performSearch = (q) => {
        console.log("searching");
        fetchSearchResults(props.mapID, q, (data) => {
            setResults(data)
            console.log(data);
        });
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
            <input className="searchbar"
                placeholder="Find a room"
                value={query}
                onInput={handleInput} />
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