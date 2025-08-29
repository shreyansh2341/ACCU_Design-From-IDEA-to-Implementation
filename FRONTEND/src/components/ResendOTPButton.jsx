import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";

const ResendOTPButton = ({ email }) => {
  const [timer, setTimer] = useState(0);

  useEffect(() => {
    if (timer === 0) return;
    const interval = setInterval(() => {
      setTimer((prev) => prev - 1);
    }, 1000);
    return () => clearInterval(interval);
  }, [timer]);

  const handleResend = async () => {
    try {
      await axios.post("/api/user/resend-otp", { email });
      toast.success("OTP resent successfully");
      setTimer(60); // 60 seconds cooldown
    } catch (e) {
      toast.error("Failed to resend OTP");
    }
  };

  return (
    <button onClick={handleResend} disabled={timer > 0} className="btn-resend-otp">
      {timer > 0 ? `Resend OTP in ${timer}s` : "Resend OTP"}
    </button>
  );
};

export default ResendOTPButton;
