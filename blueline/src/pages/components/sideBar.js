import React from "react";
import { 
    ArrowLeftStartOnRectangleIcon, 
    CircleStackIcon, 
    ClipboardDocumentListIcon, 
    FingerPrintIcon 
} from '@heroicons/react/24/outline';

const Sidebar = ({ headerText, sideBarClick }) => {
    return (
        <div className="flex flex-col gap-3">
            <div 
              className={`flex items-center px-2 cursor-pointer hover:underline ${headerText === "Dashboard Overview" ? "text-blue-600" : ""}`}
              onClick={() => sideBarClick("Dashboard Overview")}
            >
              <ArrowLeftStartOnRectangleIcon className="w-5 h-5 mr-2" />
              <span className="text-lg">Dashboard</span>
            </div>
            <div 
              className={`flex items-center px-2 cursor-pointer hover:underline ${headerText === "Criminal Database" ? "text-blue-600" : ""}`}
              onClick={() => sideBarClick("Criminal Database")}
            >
              <CircleStackIcon className="w-5 h-5 mr-2" />
              <span className="text-lg">Criminal DB</span>
            </div>
            <div 
              className={`flex items-center px-2 cursor-pointer hover:underline ${headerText === "Reports" ? "text-blue-600" : ""}`}
              onClick={() => sideBarClick("Reports")}
            >
              <ClipboardDocumentListIcon className="w-5 h-5 mr-2" />
              <span className="text-lg">Reports</span>
            </div>
            <div 
              className={`flex items-center px-2 cursor-pointer hover:underline ${headerText === "Processing" ? "text-blue-600" : ""}`}
              onClick={() => sideBarClick("Processing")}
            >
              <FingerPrintIcon className="w-5 h-5 mr-2" />
              <span className="text-lg">Processing</span>
            </div>
        </div>
    );
};

export default Sidebar;