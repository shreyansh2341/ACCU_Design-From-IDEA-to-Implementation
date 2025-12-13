import React, { useState, useEffect } from "react";
import { useNavigate, useLocation, Link } from "react-router-dom";
import axios from "axios";
import { toast } from "react-hot-toast";
import { useAuth } from "@/context/AuthProvider";
import GoogleAuthButton from "./GoogleAuthButton";
import ForgotPassword from "../components/ForgotPassword";

const REACT_APP_BACKEND_URL =
  import.meta.env.VITE_WEBSITE_URL || "http://localhost:4000";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showForgotPassword, setShowForgotPassword] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();
  const { setauthenticatedUser, setProfile } = useAuth();

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    if (params.get("error") === "not_registered") {
      toast.error("User not registered. Please sign up first.");
      navigate("/login", { replace: true });
    }
  }, [location, navigate]);

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const { data } = await axios.post(
        `${REACT_APP_BACKEND_URL}/api/user/login`,
        { email, password },
        { withCredentials: true }
      );

      if (data.success) {
        navigate("/login-success", { replace: true });
      }
    } catch (error) {
      const status = error.response?.status;
      const message = error.response?.data?.message;

      if (status === 403 && message?.toLowerCase().includes("deactivated")) {
        toast.error(
          "Your account is deactivated. Please mail admin to activate your account again."
        );
        setTimeout(() => navigate("/", { replace: true }), 2000);
        return;
      }

      toast.error(message || "Login failed. Please check your credentials.");
    }
  };

  const inputClass =
    "w-full px-4 py-2.5 rounded-xl border border-gray-200 bg-white shadow-inner " +
    "focus:ring-2 focus:ring-blue-400 focus:border-blue-400 outline-none transition";

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-white to-indigo-50 px-4">
      <div className="w-full max-w-md bg-white/90 backdrop-blur-xl border border-blue-100 rounded-2xl shadow-[0_20px_40px_rgba(37,99,235,0.18)] p-8">
        <div className="text-center mb-6">
          <h1 className="text-2xl font-bold text-blue-600">
            ACCU <span className="text-indigo-600">Design</span>
          </h1>
          <p className="text-xs text-gray-500 mt-1">Welcome back</p>
        </div>

        <form onSubmit={handleLogin} className="space-y-4">
          <input
            type="email"
            placeholder="Email Address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className={inputClass}
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className={inputClass}
          />

          <p className="text-center text-xs text-gray-500">
            New here?{" "}
            <Link to="/register" className="text-blue-600 font-semibold hover:underline">
              Create account
            </Link>
          </p>

          <button
            type="submit"
            className="w-full py-2.5 rounded-xl text-white font-semibold
                       bg-gradient-to-r from-blue-600 to-indigo-600
                       hover:shadow-[0_10px_25px_rgba(37,99,235,0.5)]
                       transition"
          >
            Login
          </button>

          <p className="text-right text-xs">
            <button
              type="button"
              className="text-blue-600 hover:underline"
              onClick={() => setShowForgotPassword(true)}
            >
              Forgot password?
            </button>
          </p>
        </form>

        {showForgotPassword && (
          <div className="fixed inset-0 bg-black/30 flex items-center justify-center z-50">
            <ForgotPassword onClose={() => setShowForgotPassword(false)} />
          </div>
        )}

        <div className="flex items-center my-5">
          <hr className="flex-grow border-gray-300" />
          <span className="mx-3 text-xs text-gray-400">OR</span>
          <hr className="flex-grow border-gray-300" />
        </div>

        <GoogleAuthButton type="login" />
      </div>
    </div>
  );
};

export default Login;
