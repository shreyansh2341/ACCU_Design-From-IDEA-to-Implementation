import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const PreRegister = () => {
  const location = useLocation();
  const navigate = useNavigate();

  // Parse query params
  const query = new URLSearchParams(location.search);
  const msg = query.get("msg") || "Redirecting...";
  const email = query.get("email");
  const name = query.get("name");
  const picture = query.get("picture");

  useEffect(() => {
    // Redirect to /register after 3 seconds
    const timer = setTimeout(() => {
      navigate(
        `/register?email=${encodeURIComponent(email)}&name=${encodeURIComponent(name)}&picture=${encodeURIComponent(picture)}`
      );
    }, 3000);

    return () => clearTimeout(timer);
  }, [navigate, email, name, picture]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white shadow-md rounded-lg p-8 text-center">
        <h1 className="text-2xl font-semibold text-red-600 mb-4">⚠️ No User Found</h1>
        <p className="text-gray-700">{msg}</p>
        <p className="text-sm text-gray-500 mt-2">You’ll be redirected shortly...</p>
      </div>
    </div>
  );
};

export default PreRegister;
