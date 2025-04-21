import React, { useState, useEffect } from "react";
import SearchBar from "./components/searchBar";
import { ChevronUpIcon, ListBulletIcon, Squares2X2Icon } from "@heroicons/react/24/outline";
import { fetchAllCriminals } from "../api/criminalApi";
import CriminalRecord from "./criminalRecords";
import CriminalTable from "./components/tableLayout";
import CriminalGrid from "./components/gridLayout";

const getCriminals = async () => {
    try {
      const criminals = await fetchAllCriminals();
      return criminals;
    } catch (err) {
      throw new Error(`Failed to load criminals: ${err.message}`);
    }
};

  
const CriminalDB = () => {
    const [viewMode, setViewMode] = useState("table");
    const [criminals, setCriminals] = useState([]);
    const [selectedCriminal, setSelectedCriminal] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            try {
                const data = await getCriminals();
                setCriminals(data);
            } catch (err) {
                console.error(err);
                setError(err);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, []);

    if (loading) return <div>Loading criminals…</div>;
    if (error) return <div>Error fetching criminals: {error.message}</div>;

    if (selectedCriminal) {
        return (
          <CriminalRecord 
            criminal={selectedCriminal} 
            onBack={() => setSelectedCriminal(null)} 
          />
        );
    }

    return (
        //<div className="flex flex-col">
        <>
            <div className="flex flex-col h-30 items-center justify-center gap-2">
                <SearchBar/>
                <div className="flex flex-row gap-2">
                    <span className="text-sm">Advanced Filters</span>
                    <ChevronUpIcon className="w-5 h-5" />
                </div>
                
            </div>
            <div className="w-full h-10 mt-4 flex items-center justify-end relative">
                <div className="absolute left-1/2 -translate-x-1/2 flex flex-row self-center gap-1">
                    <span className="text-sm">{criminals.length}</span>
                    <span className="text-sm">records found</span>
                </div>
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
                {viewMode === 'table' && (
                    <CriminalTable 
                        data={criminals} 
                        onViewRecord={setSelectedCriminal} 
                    />
                )}
                {viewMode === 'grid' && (
                    <CriminalGrid  
                        data={criminals} 
                        onViewRecord={setSelectedCriminal} 
                    />
                )}
            </div>
        </>
        //</div>
    );
};

export default CriminalDB;