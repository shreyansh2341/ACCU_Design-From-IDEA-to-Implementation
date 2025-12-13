import React, { useState, useEffect } from "react";
import { useNavigate, useLocation, Link } from "react-router-dom";
import axios from "axios";
import { toast } from "react-hot-toast";
import GoogleAuthButton from "./GoogleAuthButton";

const REACT_APP_BACKEND_URL =
  import.meta.env.VITE_WEBSITE_URL || "http://localhost:4000";

const COUNTRIES = [
  {
    code: "+91",
    label: "India",
    flag: "https://flagcdn.com/w20/in.png",
  },
  {
    code: "+1",
    label: "USA",
    flag: "https://flagcdn.com/w20/us.png",
  },
  {
    code: "+44",
    label: "UK",
    flag: "https://flagcdn.com/w20/gb.png",
  },
  {
    code: "+61",
    label: "Australia",
    flag: "https://flagcdn.com/w20/au.png",
  },
  {
    code: "+971",
    label: "UAE",
    flag: "https://flagcdn.com/w20/ae.png",
  },
];

const Register = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [countryCode, setCountryCode] = useState("+91");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [photo, setPhoto] = useState(null);
  const [photoPreview, setPhotoPreview] = useState("");
  const [isGoogleSignup, setIsGoogleSignup] = useState(false);
  const [googlePicture, setGooglePicture] = useState("");

  const selectedCountry = COUNTRIES.find(
    (c) => c.code === countryCode
  );

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    if (params.get("google") === "true") {
      setIsGoogleSignup(true);
      setName(params.get("name") || "");
      setEmail(params.get("email") || "");
      setGooglePicture(params.get("picture") || "");
      setPhotoPreview(params.get("picture") || "");
    }
  }, [location.search]);

  const changePhotoHandler = (e) => {
    const file = e.target.files[0];
    if (file) {
      setPhoto(file);
      const reader = new FileReader();
      reader.onloadend = () => setPhotoPreview(reader.result);
      reader.readAsDataURL(file);
    }
  };

  const handleRegister = async (e) => {
    e.preventDefault();

    const fullPhone = `${countryCode}${phone}`;

    try {
      if (isGoogleSignup) {
        const payload = {
          isGoogleSignup: true,
          name,
          email,
          phone: fullPhone,
          picture: googlePicture,
        };

        const { data } = await axios.post(
          `${REACT_APP_BACKEND_URL}/api/user/register`,
          payload,
          { headers: { "Content-Type": "application/json" } }
        );

        if (data.requiresVerification) {
          toast.success(data.message);
          navigate(`/verify-otp?email=${encodeURIComponent(email)}`);
        }
      } else {
        const formData = new FormData();
        formData.append("isGoogleSignup", false);
        formData.append("name", name);
        formData.append("email", email);
        formData.append("password", password);
        formData.append("phone", fullPhone);
        if (photo) formData.append("photo", photo);

        const { data } = await axios.post(
          `${REACT_APP_BACKEND_URL}/api/user/register`,
          formData,
          { headers: { "Content-Type": "multipart/form-data" } }
        );

        if (data.requiresVerification) {
          toast.success(data.message);
          navigate(`/verify-otp?email=${encodeURIComponent(email)}`);
        }
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Registration failed!");
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
            {isGoogleSignup ? "Complete Signup" : "Create Account"}
          </h1>
          <p className="text-xs text-gray-500 mt-1">
            Join ACCU Design to continue
          </p>
        </div>

        <form onSubmit={handleRegister} className="space-y-3">
          <input
            type="text"
            placeholder="Full Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            disabled={isGoogleSignup}
            required
            className={inputClass}
          />

          <input
            type="email"
            placeholder="Email Address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            disabled={isGoogleSignup}
            required
            className={inputClass}
          />

          {!isGoogleSignup && (
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className={inputClass}
            />
          )}

          {/* ✅ Phone with ALWAYS-VISIBLE flag */}
          <div className="flex gap-2 items-center">
            <div className="flex items-center gap-2 px-3 py-2.5 rounded-xl border border-gray-200 bg-white shadow-inner">
              <img
                src={selectedCountry.flag}
                alt={selectedCountry.label}
                className="w-5 h-4 object-cover rounded-sm"
              />

              <select
                value={countryCode}
                onChange={(e) => setCountryCode(e.target.value)}
                className="bg-transparent outline-none text-sm cursor-pointer"
              >
                {COUNTRIES.map((c) => (
                  <option key={c.code} value={c.code}>
                    {c.label} ({c.code})
                  </option>
                ))}
              </select>
            </div>

            <input
              type="tel"
              placeholder="Phone Number"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              required
              className={inputClass}
            />
          </div>

          {/* Profile photo */}
          {!isGoogleSignup && (
            <div className="space-y-2">
              <p className="text-xs font-semibold text-gray-600">
                Profile Photo
              </p>

              <div className="flex items-center gap-4">
                <div className="w-20 h-20 rounded-xl border border-blue-100 bg-blue-50 flex items-center justify-center overflow-hidden">
                  {photoPreview ? (
                    <img
                      src={photoPreview}
                      alt="Preview"
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <span className="text-xs text-blue-500 font-medium">
                      Preview
                    </span>
                  )}
                </div>

                <label className="inline-flex items-center px-4 py-2 rounded-xl text-sm font-medium cursor-pointer bg-blue-50 text-blue-700 border border-blue-200 hover:bg-blue-100 transition">
                  Choose Image
                  <input
                    type="file"
                    accept="image/*"
                    onChange={changePhotoHandler}
                    className="hidden"
                  />
                </label>
              </div>
            </div>
          )}

          <p className="text-center text-xs text-gray-500">
            Already have an account?{" "}
            <Link
              to="/login"
              className="text-blue-600 font-semibold hover:underline"
            >
              Login
            </Link>
          </p>

          <button
            type="submit"
            className="w-full mt-2 py-2.5 rounded-xl text-white font-semibold
                       bg-gradient-to-r from-blue-600 to-indigo-600
                       hover:shadow-[0_10px_25px_rgba(37,99,235,0.5)]
                       transition"
          >
            {isGoogleSignup ? "Send OTP" : "Register"}
          </button>
        </form>

        {!isGoogleSignup && (
          <>
            <div className="flex items-center my-5">
              <hr className="flex-grow border-gray-300" />
              <span className="mx-3 text-xs text-gray-400">OR</span>
              <hr className="flex-grow border-gray-300" />
            </div>

            <GoogleAuthButton type="register" />
          </>
        )}
      </div>
    </div>
  );
};

export default Register;
