import React, { useState, useRef } from 'react';

const OTPInput = ({ length = 6, onComplete }) => {
  const [otp, setOtp] = useState(Array(length).fill(''));
  const inputsRef = useRef([]);

  const handleChange = (e, idx) => {
    const val = e.target.value;
    if (!/^\d*$/.test(val)) return;

    const newOtp = [...otp];
    newOtp[idx] = val.slice(-1);
    setOtp(newOtp);

    if (val && idx < length - 1) {
      inputsRef.current[idx + 1].focus();
    }
  
    if (newOtp.every((num) => num !== '')) {
      onComplete(newOtp.join(''));
    }
  };

  const handleKeyDown = (e, idx) => {
    if (e.key === 'Backspace' && !otp[idx] && idx > 0) {
      inputsRef.current[idx - 1].focus();
    }
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'center', gap: 8 }}>
      {otp.map((v, i) => (
        <input
          key={i}
          type="text"
          maxLength={1}
          value={v}
          onChange={(e) => handleChange(e, i)}
          onKeyDown={(e) => handleKeyDown(e, i)}
          ref={(el) => (inputsRef.current[i] = el)}
          style={{
            width: 40, height: 40, fontSize: 24,
            textAlign: 'center', borderRadius: 4, border: '1px solid #ccc'
          }}
        />
      ))}
    </div>
  );
};

export default OTPInput;
