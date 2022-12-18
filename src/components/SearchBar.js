import "./SearchBar.css";

export const SearchBar = (props) => {
    return (
        <div className="search-wrapper">
            <input className="searchbar"
                placeholder="Find a room" />
        </div>
    );
};