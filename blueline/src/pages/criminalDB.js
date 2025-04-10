import React from "react";
import SearchBar from "./components/searchBar";

const CriminalDB = () => {
    return (
        <div className="flex flex-col h-30 items-center justify-center gap-2">
                <SearchBar/>
                <span className="text-sm">Advanced Filters</span>
        </div>
    );
};

export default CriminalDB;