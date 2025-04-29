import React from "react";
import searchIcon from '../../images/search_icon.png';

const SearchBar = ({ value, onChange }) => {

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("Search for:", value);
    };

    return (
        <form
            onSubmit={handleSubmit}
            className="relative w-1/2 h-1/2 selfcenter border border-gray-300 rounded-lg py-2 bg-white shadow-sm"
        >
            <img src={searchIcon} alt="hour-glass-icon" className="w-14 h-auto absolute"/>
            <input
                type="text"
                className="w-full pl-10 focus:outline-none text-sm flex items-center"
                placeholder="Search..."
                value={value}
                onChange={(e) => onChange(e.target.value)}
            />
        </form>
    );
};

export default SearchBar;