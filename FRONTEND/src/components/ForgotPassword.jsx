import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";
import OTPInput from "./OTPInput";

const BASE_URL = import.meta.env.VITE_WEBSITE_URL || "http://localhost:4000";

const ForgotPassword = ({ onClose }) => {
  const [step, setStep] = useState("email"); // 'email', 'otp', 'reset'
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  // Step 1: Request OTP
  const sendOtp = async () => {
    if (!email) return toast.error("Please enter your email");
    try {
      await axios.post(`${BASE_URL}/api/user/forgot-password`, { email });
      toast.success("OTP sent to your email");
      setStep("otp");
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to send OTP");
    }
  };

  // Step 2: Verify OTP
  const verifyOtp = async () => {
    if (otp.length !== 6) return toast.error("Enter 6 digit OTP");
    try {
      await axios.post(`${BASE_URL}/api/user/verify-password-reset-otp`, { email, otp });
      toast.success("OTP verified! Set new password");
      setStep("reset");
    } catch (err) {
      toast.error(err.response?.data?.message || "Invalid/Expired OTP");
    }
  };

  // Step 3: Reset Password
  const resetPassword = async () => {
    if (!newPassword || !confirmPassword)
      return toast.error("Please fill both fields");
    if (newPassword !== confirmPassword)
      return toast.error("Passwords do not match");

    try {
      await axios.post(`${BASE_URL}/api/user/reset-password`, { email, otp, newPassword });
      toast.success("Password reset successful. Please log in");
      onClose?.(); // closes the modal & go back to Login
    } catch (err) {
      toast.error(err.response?.data?.message || "Reset failed");
    }
  };

  return (
    <div className="forgot-password-modal bg-white p-6 rounded-md shadow-md max-w-md mx-auto">
      {step === "email" && (
        <>
          <h2 className="text-lg font-bold mb-2">Forgot Password</h2>
          <input
            type="email"
            placeholder="Enter registered email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            className="w-full p-2 border rounded mb-4"
          />
          <button
            onClick={sendOtp}
            className="bg-blue-500 text-white w-full py-2 rounded hover:bg-blue-700 transition"
          >
            Send OTP
          </button>
          <button
            onClick={onClose}
            className="bg-gray-400 text-white w-full py-2 rounded mt-2 hover:bg-red-500 transition"
          >
            Cancel
          </button>
        </>
      )}

      {step === "otp" && (
        <>
          <p className="mb-2">Enter OTP sent to {email}</p>
          <OTPInput length={6} onComplete={setOtp} />
          <button
            onClick={verifyOtp}
            className="bg-blue-500 text-white w-full py-2 rounded mt-4 hover:bg-blue-700 transition"
          >
            Verify
          </button>
          <button
            onClick={() => setStep("email")}
            className="bg-blue-500 text-white w-full py-2 rounded mt-2 hover:bg-blue-700 transition"
          >
            Back
          </button>
        </>
      )}

      {step === "reset" && (
        <>
          <input
            type="password"
            placeholder="New password"
            value={newPassword}
            onChange={e => setNewPassword(e.target.value)}
            className="w-full p-2 border rounded mb-4"
          />
          <input
            type="password"
            placeholder="Confirm new password"
            value={confirmPassword}
            onChange={e => setConfirmPassword(e.target.value)}
            className="w-full p-2 border rounded mb-4"
          />
          <button
            onClick={resetPassword}
            className="bg-blue-500 text-white w-full py-2 rounded hover:bg-blue-700 transition"
          >
            Update Password
          </button>
        </>
      )}
    </div>
  );
};

export default ForgotPassword;
