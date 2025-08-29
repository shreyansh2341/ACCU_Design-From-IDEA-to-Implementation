import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-hot-toast';
import { SLink } from '@/components/SLink';
import { useAuth } from '@/context/AuthProvider';
import GoogleAuthButton from './GoogleAuthButton';
import ForgotPassword from '../components/ForgotPassword';

const REACT_APP_BACKEND_URL = import.meta.env.VITE_WEBSITE_URL || 'http://localhost:4000';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('');
  const [showForgotPassword, setShowForgotPassword] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const { setauthenticatedUser, setProfile } = useAuth();

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const error = params.get('error');
    if (error === 'not_registered') {
      toast.error('User not registered. Please sign up first.');
      navigate('/login', { replace: true });
    }
  }, [location, navigate]);

  const handleLogin = async (e) => {
    e.preventDefault();
    if (!email || !password || !role) {
      return toast.error('Please fill in all fields');
    }
    try {
      const { data } = await axios.post(
        `${REACT_APP_BACKEND_URL}/api/user/login`,
        { email, password, role },
        { headers: { 'Content-Type': 'application/json' }, withCredentials: true }
      );
      if (data.success) {
        setauthenticatedUser(true);
        setProfile(data.user);
        toast.success('Login successful!');
        navigate('/', { replace: true });
        setTimeout(() => window.location.reload(), 100);
      } else if (data.requiresRegistration) {
        toast('User not registered. Redirecting to registration...');
        navigate('/register');
      } else {
        toast.error(data.message || 'Login failed.');
      }
    } catch (error) {
      if (error.response?.data?.requiresRegistration) {
        toast('User not registered. Redirecting to registration...');
        navigate('/register');
      } else {
        toast.error('Login failed. Check credentials.');
      }
    }
  };

  // Removed handleForgotPassword and forgotEmail state entirely

  return (
    <div
      className="min-h-screen flex items-center justify-center bg-cover bg-center bg-no-repeat"
      style={{
        backgroundImage: `url('/images/bg-gif.gif')`,
        backgroundBlendMode: 'lighten',
        backgroundColor: 'rgba(240,248,255,0.9)',
      }}
    >
      <div className="w-full max-w-md bg-white/90 backdrop-blur-md shadow-md rounded-lg mx-auto mt-16 p-8">
        <form onSubmit={handleLogin}>
          <div className="font-semibold text-xl text-center">
            ACCU <span className="text-blue-500">Design</span>
          </div>
          <h1 className="text-xl font-semibold mb-6 text-center">Login</h1>

          <select
            value={role}
            onChange={(e) => setRole(e.target.value)}
            className="w-full p-2 mb-2 border rounded-md"
            required
          >
            <option value="">Select Role</option>
            <option value="user">User</option>
            <option value="admin">Admin</option>
            <option value="vendor">Vendor</option>
          </select>

          <input
            type="email"
            placeholder="Enter Your E-mail"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-2 mb-4 border rounded-md"
            required
          />
          <input
            type="password"
            placeholder="Enter Your Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-2 mb-4 border rounded-md"
            required
          />

          <p className="text-center text-gray-500 mb-4">
            New User?{' '}
            <SLink className="text-blue-500" to="/register">
              Register Now
            </SLink>
          </p>

          <button
            type="submit"
            className="w-full bg-blue-500 text-white font-semibold hover:bg-blue-700 duration-300 px-4 py-2 rounded-md"
          >
            Login
          </button>

          {/* Forgot Password Button */}
          <p className="text-right mt-2">
            <button
              type="button"
              className="text-blue-500 underline"
              onClick={() => setShowForgotPassword(true)}
            >
              Forgot Password?
            </button>
          </p>
        </form>

        {showForgotPassword && (
          <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50">
            <ForgotPassword onClose={() => setShowForgotPassword(false)} />
          </div>
        )}

        <div className="flex items-center my-4">
          <hr className="flex-grow border-gray-300" />
          <span className="mx-2 text-gray-500 text-sm">OR</span>
          <hr className="flex-grow border-gray-300" />
        </div>

        <GoogleAuthButton
          type="login"
          backendUrl={`${REACT_APP_BACKEND_URL}/api/google/auth/google`}
        />
      </div>
    </div>
  );
};

export default Login;
