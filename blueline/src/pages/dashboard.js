import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import logo from '../images/blueline_text_logo.png';
import Sidebar from './components/sideBar';
import { ArrowLeftStartOnRectangleIcon } from '@heroicons/react/24/outline';
import badgeIcon from '../images/badge.png';
import CurrentDateDisplay from './components/dateDisplay';
import CriminalDB from './criminal/criminalDB';

function Dashboard() {
    const navigate = useNavigate();
    const [headerText, setHeaderText] = useState("Dashboard Overview");

    const handleClick = () => {
        navigate('/');  // Navigate to the login page
    };

    const sideBarClick = (text) => {
      setHeaderText(text);
    }

    return (
      <div className="flex flex-row h-screen">
        {/* Left Column: Blueline Sidebar */}
        <div 
          className="flex flex-col h-full px-2 py-4 justify-between"
          style={{ backgroundColor: '#a0b3ca' }}
        >
          <img src={logo} alt="BlueLine Text Logo" className="w-40 h-auto" />
          
          <Sidebar headerText={headerText} sideBarClick={sideBarClick} />

          <div className="flex flex-col h-24 py-2 gap-3">
            <div 
              className="flex items-center text-sm cursor-pointer hover:underline px-2"
              onClick={handleClick}
            >
              <ArrowLeftStartOnRectangleIcon className="w-5 h-5" />
              <span className="text-lg">Log Out</span>
            </div>
            <div className="flex flex-row px-2 items-center">
              <img src={badgeIcon} alt="Badge Icon" className="w-7 h-7"/>
              <div className="flex flex-col px-2">
                <span className="text-sm text-white font-bold">John Smith</span>
                <span className="text-sm">Patrol Officer</span>
              </div>
            </div>
          </div>
        </div>
        {/* Right Column: Information Section */}
        <div className="flex-1 flex flex-col border-2 px-6 pt-7 overflow-hidden">
          <h1 className='text-2xl mb-4 font-bold'>{headerText}</h1>
          <CurrentDateDisplay />

          <div className="flex-1 flex flex-col min-h-0 overflow-y-auto">
            {headerText === "Criminal Database" && <CriminalDB />}
          </div>
        </div>
      </div>
    );
  }
  export default Dashboard;