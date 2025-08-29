import React, { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-hot-toast';
import GoogleAuthButton from "../pages/GoogleAuthButton";

const REACT_APP_BACKEND_URL = import.meta.env.VITE_WEBSITE_URL || 'http://localhost:4000';

const VerifyOtp = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const emailParam = searchParams.get('email') || '';
  const [email] = useState(emailParam);

  const [otp, setOtp] = useState('');
  const [resendTimer, setResendTimer] = useState(0);
  const [isGoogleSignup, setIsGoogleSignup] = useState(false); // optionally pass from register or set as needed

  useEffect(() => {
    let timerId;
    if (resendTimer > 0) {
      timerId = setInterval(() => setResendTimer(prev => prev -1), 1000);
    }
    return () => clearInterval(timerId);
  }, [resendTimer]);

  const handleResendOtp = async () => {
    try {
      await axios.post(`${REACT_APP_BACKEND_URL}/api/user/resend-otp`, { email });
      toast.success('OTP resent successfully');
      setResendTimer(60);
    } catch (error) {
      toast.error('Failed to resend OTP');
    }
  };

  const handleVerifyOtp = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post(
        `${REACT_APP_BACKEND_URL}/api/user/verify-otp`,
        { email, otp },
        { headers: { 'Content-Type': 'application/json' }, withCredentials: true }
      );
      if (data.message) {
        toast.success(data.message);
        navigate('/login');
      }
    } catch (error) {
      toast.error(error.response?.data?.message || 'OTP verification failed!');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
      <div className="max-w-md w-full bg-white rounded shadow p-6">
        <h1 className="text-xl font-semibold mb-6 text-center">Verify Your Email</h1>
        <p className="mb-4 text-center text-gray-600">An OTP has been sent to <strong>{email}</strong></p>

        <form onSubmit={handleVerifyOtp}>
          <input
            type="text"
            placeholder="Enter OTP"
            value={otp}
            onChange={e => setOtp(e.target.value)}
            className="w-full p-2 mb-4 border rounded"
            required
          />

          <button
            type="button"
            disabled={resendTimer > 0}
            onClick={handleResendOtp}
            className={`w-full mb-4 py-2 rounded font-semibold ${
              resendTimer > 0
                ? 'bg-gray-400 text-gray-700 cursor-not-allowed'
                : 'bg-yellow-500 text-black hover:bg-yellow-600'
            }`}
          >
            {resendTimer > 0 ? `Resend OTP in ${resendTimer}s` : 'Resend OTP'}
          </button>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
          >
            Verify & Continue
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

export default VerifyOtp;
