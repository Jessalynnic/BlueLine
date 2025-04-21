import React, { useState} from "react";
import { ChevronLeftIcon } from '@heroicons/react/24/outline';
import CriminalInformation from "./components/criminalPI";

const CriminalRecord = ({ criminal, onBack }) => {
    const [activeSection, setActiveSection] = useState("Personal Information");

    const sectionClick = (text) => {
        setActiveSection(text);
    }

    return (
        <div className="flex flex-col h-screen">
            {/* Header Section */}
            <div className="flex h-10 items-center">
                <button onClick={onBack} className="">
                    <ChevronLeftIcon className="w-6 h-6" />
                </button>

                <div className="flex flex-1 justify-center gap-3">
                    <button
                        onClick={() => sectionClick("Personal Information")}
                        className={`text-md cursor-pointer hover:underline px-2 py-1 ${activeSection === "Personal Information" ? "text-blue-600" : ""}`}
                    >
                        Personal Information
                    </button>
                    <button
                        onClick={() => sectionClick("Arrest Records")}
                        className={`text-md cursor-pointer hover:underline px-2 py-1 ${activeSection === "Arrest Records" ? "text-blue-600" : ""}`}
                    >
                        Arrest Records
                    </button>
                </div>
            </div>
            
            <div className="flex flex-col flex-1 mt-6 min-h-0 border-2 overflow-y-auto">
                {activeSection === "Personal Information" ? <CriminalInformation criminal={criminal}/> : ""}
                
            </div>
        </div>
    )
}

export default CriminalRecord;