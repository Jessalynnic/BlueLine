import { useNavigate } from 'react-router-dom';

function Dashboard() {
    const navigate = useNavigate();

    const handleClick = () => {
        navigate('/');  // Navigate to the login page
    };

    return (
      <div>
        <h1>Dashboard</h1>

        <button
          type="submit"
          className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded"
          onClick={handleClick}
        >
          Back to Login
        </button>
      </div>
    );
  }
  export default Dashboard;