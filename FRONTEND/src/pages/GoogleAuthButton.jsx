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
      className="w-full flex items-center justify-center gap-3
                 bg-white border border-gray-200 rounded-xl py-2.5
                 text-gray-700 font-medium
                 shadow-sm hover:shadow-md
                 hover:-translate-y-[1px] transition"
    >
      <img
        src="https://developers.google.com/identity/images/g-logo.png"
        alt="Google"
        className="w-5 h-5"
      />
      <span>
        {type === "login" ? "Continue with Google" : "Sign up with Google"}
      </span>
    </button>
  );
};

export default GoogleAuthButton;
