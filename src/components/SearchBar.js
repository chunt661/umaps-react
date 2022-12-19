import "./SearchBar.css";

export const SearchBar = (props) => {
    return (
        <div className="search-wrapper">
            <input className="searchbar"
                placeholder="Find a room" />
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
                        <li key={"result" + r}>
                            <span>r</span>
                        </li>
                    )
                })
            }
            </ul>
        </div>
    );
}