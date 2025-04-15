import React, { useState } from "react";
import SearchBar from "./components/searchBar";
import { ListBulletIcon, Squares2X2Icon } from "@heroicons/react/24/outline";
import CriminalTable from "./components/tableLayout";

const criminals = [
    { id: 1, name: "Doe, John", age: 35, dateEntered: "03/15/2024", lastUpdated: "04/01/2025" },
    { id: 2, name: "Smith, Jane", age: 29, dateEntered: "06/20/2024", lastUpdated: "03/12/2025" },
    { id: 3, name: "Rivera, Carlos", age: 42, dateEntered: "01/10/2024", lastUpdated: "03/29/2025" },
    { id: 4, name: "Johnson, Emily", age: 31, dateEntered: "08/25/2024", lastUpdated: "04/05/2025" },
    { id: 5, name: "Lee, Marcus", age: 27, dateEntered: "11/30/2024", lastUpdated: "02/21/2025" },
    { id: 6, name: "Patel, Sophia", age: 38, dateEntered: "02/19/2024", lastUpdated: "01/30/2025" },
    { id: 7, name: "Chen, James", age: 44, dateEntered: "04/01/2024", lastUpdated: "03/05/2025" },
    { id: 8, name: "Martinez, Olivia", age: 33, dateEntered: "07/14/2024", lastUpdated: "03/18/2025" },
    { id: 9, name: "O'Connor, Liam", age: 30, dateEntered: "09/09/2024", lastUpdated: "02/28/2025" },
    { id: 10, name: "Nguyen, Ava", age: 36, dateEntered: "12/03/2024", lastUpdated: "04/08/2025" },
    { id: 11, name: "Brown, Noah", age: 41, dateEntered: "05/11/2024", lastUpdated: "03/25/2025" },
    { id: 12, name: "Davis, Isabella", age: 26, dateEntered: "03/03/2024", lastUpdated: "01/14/2025" },
    { id: 13, name: "Thomas, Elijah", age: 39, dateEntered: "10/20/2024", lastUpdated: "04/04/2025" },
    { id: 14, name: "Wilson, Mia", age: 34, dateEntered: "06/17/2024", lastUpdated: "03/09/2025" },
    { id: 15, name: "Scott, William", age: 32, dateEntered: "01/25/2024", lastUpdated: "02/18/2025" }
];
  
const CriminalDB = () => {
    const [viewMode, setViewMode] = useState("table");

    return (
        <div className="flex flex-col">
            <div className="flex flex-col h-30 items-center justify-center gap-2">
                <SearchBar/>
                <span className="text-sm">Advanced Filters</span>
            </div>
            <div className="w-full h-10 flex items-center justify-end">
                <div
                    onClick={() => setViewMode("table")}
                    className={`w-8 h-8 flex items-center justify-center rounded-md cursor-pointer hover:bg-gray-100 
                        ${viewMode === "table" ? "border-2 border-gray-400" : ""}`}
                >
                    <ListBulletIcon className="w-5 h-5" />
                </div>
                
                <div
                    onClick={() => setViewMode("grid")}
                    className={`w-8 h-8 flex items-center justify-center rounded-md cursor-pointer hover:bg-gray-100 
                        ${viewMode === "grid" ? "border-2 border-gray-400" : ""}`}
                >
                    <Squares2X2Icon className="w-5 h-5" />
                </div>
            </div>
            <div>
                <CriminalTable data={criminals} />
            </div>
        </div>
    );
};

export default CriminalDB;