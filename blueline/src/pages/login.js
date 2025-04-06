import { useNavigate } from 'react-router-dom';

function Login() {
  const navigate = useNavigate();

  const handleLogin = () => {
    navigate('/dashboard');  // Navigate to the dashboard page
  };

  return (
      <div>
        <h1>Login Page</h1>

        <button
          type="submit"
          className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded"
          onClick={handleLogin}
        >
          Login
        </button>
      </div>
    );
  }
export default Login;