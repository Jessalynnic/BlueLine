import { useNavigate } from 'react-router-dom';
import logo from '../images/blueline_text_logo.png';

function Dashboard() {
    const navigate = useNavigate();

    const handleClick = () => {
        navigate('/');  // Navigate to the login page
    };

    return (
      <div>
        <div 
          className="flex px-2 py-4 justify-between"
          style={{ backgroundColor: '#a0b3ca' }}
        >
          <img src={logo} alt="BlueLine Text Logo" className="w-40 h-auto" />

          <div className="flex w-62 gap-2">
            <button
                type="submit"
                className="w-32 self-center text-sm text-white py-2 rounded-lg"
                style={{ backgroundColor: '#224168' }}
              >
                User: Oterjn
            </button>

            <button
                type="submit"
                className="w-32 self-center text-sm text-white py-2 rounded-lg"
                style={{ backgroundColor: '#224168' }}
                onClick={handleClick}
              >
                Logout
            </button>
          </div>
        </div>
        <div className="flex h-20 px-6">
          <h1 className='text-2xl font-bold self-center'>Dashboard Overview</h1>
        </div>

      </div>
    );
  }
  export default Dashboard;