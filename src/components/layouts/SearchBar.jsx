import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./SearchBar.css";

function SearchBar({ data, onSearch, setFilteredData }) {
    const [wordEntered, setWordEntered] = useState("");

    const handleFilter = (event) => {
        const searchWord = event.target.value;
        setWordEntered(searchWord);
        if (searchWord !== "") {
            onSearch(searchWord);
        } else{
            setFilteredData(data)
        }
    };

    const clearInput = () => {
        setWordEntered("");
        setFilteredData(data)
    };

    return (
        <div className="search">
            <div className="searchInputs">
                <input
                    type="text"
                    placeholder='Buscar...'
                    value={wordEntered}
                    onChange={handleFilter}
                />
                <div className="searchIcon">
                    {!wordEntered ? (
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-search" viewBox="0 0 16 16">
                            <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z" />
                        </svg>
                    ) : (
                        <button type="button" className="btn-close" aria-label="Close" onClick={clearInput}></button>
                    )}
                </div>
            </div>
        </div>
    );
}

export default SearchBar;