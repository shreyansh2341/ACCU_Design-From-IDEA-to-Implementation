import React from "react";

const GoogleAuthButton = ({ type }) => {
  const handleClick = () => {
    const backendURL = import.meta.env.VITE_WEBSITE_URL;
    const url =
      type === "login"
        ? `${backendURL}/api/auth/google/login`
        : `${backendURL}/api/auth/google/register`;

    window.location.href = url;
  };

  return (
    <button
      onClick={handleClick}
      className="w-full flex items-center justify-center gap-2 border rounded-lg py-2 text-gray-600 hover:bg-gray-100"
    >
      <img
        src="https://developers.google.com/identity/images/g-logo.png"
        alt="Google"
        className="w-5 h-5"
      />
      {type === "login" ? "Continue with Google" : "Sign up with Google"}
    </button>
  );
};

export default GoogleAuthButton;
