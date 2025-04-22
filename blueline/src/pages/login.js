import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import logo from '../images/blueline_logo.png';
import { EyeIcon, EyeSlashIcon } from '@heroicons/react/24/outline';


function Login() {
  const [passwordVisible, setPasswordVisible] = useState(false);
  const navigate = useNavigate();

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  const handleLogin = () => {
    navigate('/dashboard');  // Navigate to the dashboard page
  };

  return (
    <div className="flex flex-row">
      {/* Left Column: Logo */}
      <div 
        className="w-1/2 flex min-h-screen flex flex-col px-8 items-center justify-center"
        style={{ backgroundColor: '#a0b3ca' }}
      >
        <img src={logo} alt="BlueLine Logo" className="w-68 h-auto mx-auto" />
      </div>

      {/* Right Column: Login Form */}
      <div 
        className="w-1/2 flex flex-col min-h-screen justify-center px-10"
      >
        <h1 
          className="text-3xl font-bold text-center mb-6"
          style={{ color: '#224168' }}
        >
          Login
        </h1>

        <form onSubmit={handleLogin}>
          {/* Employee ID Input */}
          <div className="mb-4">
            <label htmlFor="emp_id" className="block text-sm font-medium text-gray-700">Employee ID</label>
            <input
              type="text"
              id="emp_id"
              name="emp_id"
              placeholder="Enter your employee id"
              className="w-full px-4 py-2 mt-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
            />
          </div>

          {/* Password Input */}
          <div className="mb-6">
            <div className="flex items-center justify-between">
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
              <button
                type="button"
                onClick={togglePasswordVisibility}
              >
                {passwordVisible ? (
                  <EyeSlashIcon className="w-5 h-5 text-gray-500" />
                ) : (
                  <EyeIcon className="w-5 h-5 text-gray-500" />
                )}
              </button>
            </div>
            <input
              type={passwordVisible ? 'text' : 'password'}
              id="password"
              name="password"
              placeholder="Enter your password"
              className="w-full px-4 py-2 mt-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
            />

          </div>
          
          {/* Login Button */}
          <div className="flex items-center">
            <button
              type="submit"
              className="w-1/2 mx-auto hover:bg-blue-700 text-white py-2 px-4 rounded-lg"
              style={{ backgroundColor: '#224168' }}
            >
              Login
            </button>
          </div>
        </form>
      </div>
    </div>
    );
  }
export default Login;