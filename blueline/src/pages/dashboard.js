import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import logo from '../images/blueline_text_logo.png';
import Sidebar from './components/sideBar';
import { ArrowLeftStartOnRectangleIcon } from '@heroicons/react/24/outline';
import badgeIcon from '../images/badge.png';

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
      <div className="flex flex-row">
        <div 
          className="flex flex-col h-screen px-2 py-4 justify-between"
          style={{ backgroundColor: '#a0b3ca' }}
        >
          <img src={logo} alt="BlueLine Text Logo" className="w-40 h-auto" />

          <Sidebar headerText={headerText} sideBarClick={sideBarClick} />

          <div className="flex border-2 flex-col h-24 py-2 gap-3">
            <div 
              className="flex items-center text-sm cursor-pointer hover:underline px-2"
              onClick={handleClick}
            >
              <ArrowLeftStartOnRectangleIcon className="w-5 h-5" />
              <span className="text-sm">Log Out</span>
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
        <div className="flex h-20 px-6">
          <h1 className='text-2xl font-bold self-center'>{headerText}</h1>
        </div>

      </div>
    );
  }
  export default Dashboard;