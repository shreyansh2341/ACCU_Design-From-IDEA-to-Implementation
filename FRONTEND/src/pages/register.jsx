import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-hot-toast';
import { SLink } from '@/components/SLink';
import GoogleAuthButton from "./GoogleAuthButton.jsx";

const REACT_APP_BACKEND_URL = import.meta.env.VITE_WEBSITE_URL || 'http://localhost:4000';

const Register = () => {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    if (params.get('google') === 'true') {
      setIsGoogleSignup(true);
      setName(params.get('name') || '');
      setEmail(params.get('email') || '');
      setGooglePicture(params.get('picture') || '');
      setPhotoPreview(params.get('picture') || '');
    }
  }, [location.search]);

  // form states
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [role, setRole] = useState('');
  const [photo, setPhoto] = useState(null);
  const [photoPreview, setPhotoPreview] = useState('');
  const [password, setPassword] = useState('');
  const [isGoogleSignup, setIsGoogleSignup] = useState(false);
  const [googlePicture, setGooglePicture] = useState('');

  // photo preview handler
  const changePhotoHandler = (e) => {
    const file = e.target.files[0];
    if(file){
      setPhoto(file);
      const reader = new FileReader();
      reader.onloadend = () => setPhotoPreview(reader.result);
      reader.readAsDataURL(file);
    } else {
      setPhoto(null);
      setPhotoPreview('');
    }
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      if(isGoogleSignup){
        // Google signup JSON payload
        const payload = {
          isGoogleSignup: true,
          name,
          email,
          role,
          phone,
          picture: googlePicture,
        };
        const { data } = await axios.post(`${REACT_APP_BACKEND_URL}/api/user/register`, payload, {
          headers: { 'Content-Type': 'application/json' }
        });
        if(data.requiresVerification){
          toast.success(data.message);
          // Navigate to OTP verification page with email query param
          navigate(`/verify-otp?email=${encodeURIComponent(email)}`);
        }
      } else {
        // Normal signup multipart form data
        const formData = new FormData();
        formData.append('isGoogleSignup', false);
        formData.append('name', name);
        formData.append('email', email);
        formData.append('password', password);
        formData.append('phone', phone);
        formData.append('role', role);
        if(photo) formData.append('photo', photo);

        const { data } = await axios.post(`${REACT_APP_BACKEND_URL}/api/user/register`, formData, {
          headers: { 'Content-Type': 'multipart/form-data' }
        });
        if(data.requiresVerification){
          toast.success(data.message);
          navigate(`/verify-otp?email=${encodeURIComponent(email)}`);
        }
      }
    } catch (error) {
      console.error('Registration error:', error.response?.data || error.message);
      toast.error(error.response?.data?.message || 'Registration failed!');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
      <div className="max-w-md w-full bg-white rounded shadow p-6">
        <h1 className="text-xl font-semibold mb-6 text-center">{isGoogleSignup ? 'Complete Google Signup' : 'Register'}</h1>

        <form onSubmit={handleRegister}>
          <select
            value={role}
            onChange={e => setRole(e.target.value)}
            className="w-full p-2 mb-3 border rounded"
            required
          >
            <option value="">Select Role</option>
            <option value="user">User</option>
            <option value="admin">Admin</option>
            <option value="vendor">Vendor</option>
          </select>

          <input
            type="text"
            placeholder="Enter Your Name"
            value={name}
            onChange={e => setName(e.target.value)}
            className="w-full p-2 mb-3 border rounded"
            required
            disabled={isGoogleSignup}
          />

          <input
            type="email"
            placeholder="Enter Your E-mail"
            value={email}
            onChange={e => setEmail(e.target.value)}
            className="w-full p-2 mb-3 border rounded"
            required
            disabled={isGoogleSignup}
          />

          {!isGoogleSignup && (
            <input
              type="password"
              placeholder="Enter Your Password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              className="w-full p-2 mb-3 border rounded"
              required
            />
          )}

          <input
            type="phone"
            placeholder="Enter Your Phone Number"
            value={phone}
            onChange={e => setPhone(e.target.value)}
            className="w-full p-2 mb-3 border rounded"
            required
          />

          {!isGoogleSignup && (
            <>
              <div className="mb-3">
                {photoPreview ? (
                  <img src={photoPreview} alt="Preview" className="h-20 w-20 object-cover rounded" />
                ) : (
                  <div className="h-20 w-20 bg-gray-200 rounded flex items-center justify-center text-gray-500">No Image</div>
                )}
                <input type="file" onChange={changePhotoHandler} accept="image/*" className="mt-2" />
              </div>
            </>
          )}

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
          >
            {isGoogleSignup ? 'Send OTP' : 'Register'}
          </button>
        </form>

        {!isGoogleSignup && (
          <>
            <div className="my-4 flex items-center">
              <hr className="flex-grow border-gray-300" />
              <span className="mx-2 text-gray-500 text-sm">OR</span>
              <hr className="flex-grow border-gray-300" />
            </div>
            <GoogleAuthButton type="register" backendUrl={`${REACT_APP_BACKEND_URL}/api/auth/google`} />
          </>
        )}
      </div>
    </div>
  );
};

export default Register;
