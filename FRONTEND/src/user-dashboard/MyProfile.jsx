// src/user-dashboard/MyProfile.jsx

import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";
import {
  FaUser,
  FaEnvelope,
  FaPhone,
  FaBuilding,
  FaMapMarkerAlt,
  FaFacebook,
  FaInstagram,
  FaLinkedin,
  FaGlobe,
  FaEdit,
  FaCheck,
  FaTimes,
} from "react-icons/fa";

const REACT_APP_BACKEND_URL =
  import.meta.env.VITE_WEBSITE_URL || "http://localhost:4000";

const MyProfile = () => {
  const [profile, setProfile] = useState(null);
  const [stats, setStats] = useState(null);

  const [isEditing, setIsEditing] = useState(false);
  const [isOtpStep, setIsOtpStep] = useState(false);
  const [formValues, setFormValues] = useState({
    name: "",
    email: "",
    phone: "",
    companyName: "",
    companyAddress: "",
    facebook: "",
    instagram: "",
    linkedin: "",
    website: "",
  });
  const [otp, setOtp] = useState("");
  const [loading, setLoading] = useState(false);

  // Fetch profile on mount
  const fetchProfile = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(
        `${REACT_APP_BACKEND_URL}/api/profile/me`,
        { withCredentials: true }
      );

      setProfile(data.user);
      setStats(data.stats);

      const socials = data.user.socials || {};
      setFormValues({
        name: data.user.name || "",
        email: data.user.email || "",
        phone: data.user.phone || "",
        companyName: data.user.companyName || "",
        companyAddress: data.user.companyAddress || "",
        facebook: socials.facebook || "",
        instagram: socials.instagram || "",
        linkedin: socials.linkedin || "",
        website: socials.website || "",
      });
    } catch (error) {
      console.error("Error loading profile:", error);
      toast.error(
        error.response?.data?.message || "Failed to load profile details"
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProfile();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues((prev) => ({ ...prev, [name]: value }));
  };

  const handleStartEdit = () => {
    setIsEditing(true);
    setIsOtpStep(false);
    setOtp("");
  };

  const handleCancelEdit = () => {
    // reset to profile values
    if (profile) {
      const socials = profile.socials || {};
      setFormValues({
        name: profile.name || "",
        email: profile.email || "",
        phone: profile.phone || "",
        companyName: profile.companyName || "",
        companyAddress: profile.companyAddress || "",
        facebook: socials.facebook || "",
        instagram: socials.instagram || "",
        linkedin: socials.linkedin || "",
        website: socials.website || "",
      });
    }
    setIsEditing(false);
    setIsOtpStep(false);
    setOtp("");
  };

  const handleRequestUpdate = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);

      await axios.put(
        `${REACT_APP_BACKEND_URL}/api/profile/request-update`,
        {
          name: formValues.name,
          email: formValues.email,
          phone: formValues.phone,
          companyName: formValues.companyName,
          companyAddress: formValues.companyAddress,
          socials: {
            facebook: formValues.facebook,
            instagram: formValues.instagram,
            linkedin: formValues.linkedin,
            website: formValues.website,
          },
        },
        { withCredentials: true }
      );

      toast.success("OTP sent to your email. Please verify.");
      setIsOtpStep(true);
    } catch (error) {
      console.error("Error requesting profile update:", error);
      toast.error(
        error.response?.data?.message || "Failed to start profile update"
      );
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyOtp = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const { data } = await axios.post(
        `${REACT_APP_BACKEND_URL}/api/profile/verify-update`,
        { otp },
        { withCredentials: true }
      );

      toast.success("Profile updated successfully!");
      setProfile(data.user);

      const socials = data.user.socials || {};
      setFormValues({
        name: data.user.name || "",
        email: data.user.email || "",
        phone: data.user.phone || "",
        companyName: data.user.companyName || "",
        companyAddress: data.user.companyAddress || "",
        facebook: socials.facebook || "",
        instagram: socials.instagram || "",
        linkedin: socials.linkedin || "",
        website: socials.website || "",
      });

      setIsEditing(false);
      setIsOtpStep(false);
      setOtp("");
    } catch (error) {
      console.error("Error verifying OTP:", error);
      toast.error(error.response?.data?.message || "Invalid or expired OTP");
    } finally {
      setLoading(false);
    }
  };

  if (loading && !profile) {
    return (
      <div className="flex items-center justify-center h-full">
        <p className="text-gray-500 text-sm">Loading profile...</p>
      </div>
    );
  }

  if (!profile) {
    return (
      <div className="p-6">
        <p className="text-gray-500 text-sm">
          No profile information available.
        </p>
      </div>
    );
  }

  const createdAt = profile.createdAt
    ? new Date(profile.createdAt).toLocaleDateString("en-IN", {
        dateStyle: "medium",
      })
    : "";

  return (
    <div className="min-h-[80vh] p-4 md:p-6 bg-gradient-to-br from-white via-[#e8f3fc] to-[#d9e9fb] rounded-3xl shadow-[0_15px_35px_rgba(15,23,42,0.12)] border border-blue-50">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
        <div>
          <h2 className="text-2xl font-bold text-[#2479C2] mb-1">
            My Profile
          </h2>
          <p className="text-xs text-gray-500">
            Manage your personal details, contact info and account stats.
          </p>
        </div>

        {!isEditing ? (
          <button
            onClick={handleStartEdit}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs md:text-sm font-semibold
                       bg-blue-600 text-white shadow-sm shadow-blue-500/40
                       hover:bg-blue-700 hover:-translate-y-[1px] hover:shadow-[0_10px_25px_rgba(37,99,235,0.7)]
                       active:translate-y-0 active:shadow-md transition-all"
          >
            <FaEdit />
            Edit Profile
          </button>
        ) : (
          <div className="flex gap-2">
            <button
              onClick={handleCancelEdit}
              className="inline-flex items-center gap-1 px-3 py-1.5 rounded-full text-xs font-semibold
                         border border-red-300 text-red-600 bg-red-50
                         hover:bg-red-100 hover:border-red-400 hover:-translate-y-[1px]
                         hover:shadow-md transition-all"
            >
              <FaTimes />
              Cancel
            </button>
          </div>
        )}
      </div>

      <div className="grid md:grid-cols-[280px,1fr] gap-6">
        {/* Left card: avatar + basic info + stats */}
        <div className="bg-white/90 backdrop-blur-sm rounded-2xl border border-blue-50 shadow-[0_10px_30px_rgba(148,163,184,0.35)] p-5 flex flex-col items-center">
          {/* Avatar */}
          <div className="relative mb-3">
            {profile.photo?.url ? (
              <img
                src={profile.photo.url}
                alt={profile.name}
                className="w-24 h-24 rounded-full object-cover border-4 border-blue-100 shadow-md shadow-blue-500/30"
              />
            ) : (
              <div className="w-24 h-24 rounded-full bg-gradient-to-br from-blue-500 via-blue-600 to-indigo-500 flex items-center justify-center text-2xl font-bold text-white shadow-md shadow-blue-500/40">
                {(profile.name || "?")
                  .split(" ")
                  .map((n) => n[0])
                  .join("")
                  .slice(0, 2)
                  .toUpperCase()}
              </div>
            )}

            <span className="absolute -bottom-1 -right-1 w-4 h-4 rounded-full border-2 border-white bg-emerald-400 shadow-sm shadow-emerald-300" />
          </div>

          <h3 className="text-lg font-semibold text-gray-900 mb-1">
            {profile.name}
          </h3>
          <p className="text-xs text-gray-500 mb-1">{profile.email}</p>
          <p className="text-[11px] text-blue-600 font-semibold mb-4 uppercase tracking-wide">
            {profile.role}
          </p>

          <div className="w-full grid grid-cols-2 gap-3 text-center text-[11px]">
            <div className="bg-blue-50 rounded-xl p-2 border border-blue-100">
              <p className="font-semibold text-blue-700">
                {stats?.totalOrders ?? 0}
              </p>
              <p className="text-[10px] text-blue-500">Total Orders</p>
            </div>
            <div className="bg-emerald-50 rounded-xl p-2 border border-emerald-100">
              <p className="font-semibold text-emerald-700">
                {stats?.completedOrders ?? 0}
              </p>
              <p className="text-[10px] text-emerald-500">Completed</p>
            </div>
            <div className="bg-amber-50 rounded-xl p-2 border border-amber-100">
              <p className="font-semibold text-amber-700">
                {stats?.activeOrders ?? 0}
              </p>
              <p className="text-[10px] text-amber-500">Active</p>
            </div>
            <div className="bg-red-50 rounded-xl p-2 border border-red-100">
              <p className="font-semibold text-red-700">
                {stats?.cancelledOrders ?? 0}
              </p>
              <p className="text-[10px] text-red-500">Cancelled</p>
            </div>
          </div>

          <p className="mt-4 text-[10px] text-gray-400">
            Member since <span className="font-medium">{createdAt}</span>
          </p>
        </div>

        {/* Right side: details & edit form */}
        <div className="bg-white/90 backdrop-blur-sm rounded-2xl border border-blue-50 shadow-[0_10px_30px_rgba(148,163,184,0.35)] p-5">
          {!isEditing && (
            <div className="space-y-4 text-sm">
              {/* Contact info */}
              <div>
                <h4 className="text-xs font-semibold text-gray-500 mb-2 uppercase tracking-wide">
                  Contact Details
                </h4>
                <div className="grid sm:grid-cols-2 gap-3">
                  <div className="flex items-center gap-2 text-gray-700">
                    <FaUser className="text-blue-500" />
                    <span>{profile.name || "–"}</span>
                  </div>
                  <div className="flex items-center gap-2 text-gray-700 break-all">
                    <FaEnvelope className="text-blue-500" />
                    <span className="truncate">{profile.email || "–"}</span>
                  </div>
                  <div className="flex items-center gap-2 text-gray-700">
                    <FaPhone className="text-blue-500" />
                    <span>{profile.phone || "Not added"}</span>
                  </div>
                </div>
              </div>

              {/* Company info */}
              <div>
                <h4 className="text-xs font-semibold text-gray-500 mb-2 uppercase tracking-wide">
                  Company Info
                </h4>
                <div className="space-y-2 text-gray-700">
                  <div className="flex items-center gap-2">
                    <FaBuilding className="text-blue-500" />
                    <span>
                      {profile.companyName || "No company name provided"}
                    </span>
                  </div>
                  <div className="flex items-start gap-2">
                    <FaMapMarkerAlt className="text-blue-500 mt-[3px]" />
                    <span className="text-xs">
                      {profile.companyAddress || "No address provided"}
                    </span>
                  </div>
                </div>
              </div>

              {/* Social links */}
              <div>
                <h4 className="text-xs font-semibold text-gray-500 mb-2 uppercase tracking-wide">
                  Social Profiles
                </h4>
                <div className="grid sm:grid-cols-2 gap-2 text-xs">
                  <SocialRow
                    icon={<FaFacebook className="text-blue-600" />}
                    label="Facebook"
                    value={profile.socials?.facebook}
                  />
                  <SocialRow
                    icon={<FaInstagram className="text-pink-500" />}
                    label="Instagram"
                    value={profile.socials?.instagram}
                  />
                  <SocialRow
                    icon={<FaLinkedin className="text-blue-700" />}
                    label="LinkedIn"
                    value={profile.socials?.linkedin}
                  />
                  <SocialRow
                    icon={<FaGlobe className="text-indigo-500" />}
                    label="Website"
                    value={profile.socials?.website}
                  />
                </div>
              </div>
            </div>
          )}

          {isEditing && (
            <form
              onSubmit={isOtpStep ? handleVerifyOtp : handleRequestUpdate}
              className="space-y-4 text-sm"
            >
              {/* Step 1: edit fields */}
              {!isOtpStep && (
                <>
                  <div className="grid sm:grid-cols-2 gap-3">
                    <InputField
                      label="Full Name"
                      name="name"
                      value={formValues.name}
                      onChange={handleChange}
                      icon={<FaUser className="text-blue-500" />}
                      required
                    />
                    <InputField
                      label="Email"
                      name="email"
                      value={formValues.email}
                      onChange={handleChange}
                      icon={<FaEnvelope className="text-blue-500" />}
                      type="email"
                      required
                    />
                    <InputField
                      label="Phone"
                      name="phone"
                      value={formValues.phone}
                      onChange={handleChange}
                      icon={<FaPhone className="text-blue-500" />}
                    />
                    <InputField
                      label="Company Name"
                      name="companyName"
                      value={formValues.companyName}
                      onChange={handleChange}
                      icon={<FaBuilding className="text-blue-500" />}
                    />
                  </div>

                  <div>
                    <label className="text-xs font-semibold text-gray-500 mb-1 block">
                      Company Address
                    </label>
                    <div className="flex items-start gap-2">
                      <FaMapMarkerAlt className="text-blue-500 mt-2" />
                      <textarea
                        name="companyAddress"
                        value={formValues.companyAddress}
                        onChange={handleChange}
                        rows={3}
                        className="w-full border border-blue-100 rounded-xl px-3 py-2 text-xs bg-white/80
                                   focus:outline-none focus:ring-2 focus:ring-blue-200"
                      />
                    </div>
                  </div>

                  <div className="grid sm:grid-cols-2 gap-3">
                    <InputField
                      label="Facebook URL"
                      name="facebook"
                      value={formValues.facebook}
                      onChange={handleChange}
                      icon={<FaFacebook className="text-blue-600" />}
                    />
                    <InputField
                      label="Instagram URL"
                      name="instagram"
                      value={formValues.instagram}
                      onChange={handleChange}
                      icon={<FaInstagram className="text-pink-500" />}
                    />
                    <InputField
                      label="LinkedIn URL"
                      name="linkedin"
                      value={formValues.linkedin}
                      onChange={handleChange}
                      icon={<FaLinkedin className="text-blue-700" />}
                    />
                    <InputField
                      label="Website"
                      name="website"
                      value={formValues.website}
                      onChange={handleChange}
                      icon={<FaGlobe className="text-indigo-500" />}
                    />
                  </div>

                  <p className="text-[11px] text-gray-500">
                    When you click{" "}
                    <span className="font-semibold text-blue-600">
                      Save & Send OTP
                    </span>
                    , we will send a verification code to your email. Your
                    profile will update only after you confirm that OTP.
                  </p>

                  <button
                    type="submit"
                    disabled={loading}
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs md:text-sm font-semibold
                               bg-blue-600 text-white shadow-sm shadow-blue-500/40
                               hover:bg-blue-700 hover:-translate-y-[1px] hover:shadow-[0_10px_25px_rgba(37,99,235,0.7)]
                               active:translate-y-0 active:shadow-md transition-all disabled:opacity-60 disabled:cursor-not-allowed"
                  >
                    <FaCheck />
                    {loading ? "Sending OTP..." : "Save & Send OTP"}
                  </button>
                </>
              )}

              {/* Step 2: OTP */}
              {isOtpStep && (
                <div className="space-y-3">
                  <p className="text-xs text-gray-600">
                    We’ve sent a 6-digit verification code to{" "}
                    <span className="font-semibold text-blue-600">
                      {formValues.email}
                    </span>
                    . Enter it below to confirm your profile changes.
                  </p>

                  <div>
                    <label className="text-xs font-semibold text-gray-500 mb-1 block">
                      Enter OTP
                    </label>
                    <input
                      type="text"
                      maxLength={6}
                      value={otp}
                      onChange={(e) => setOtp(e.target.value)}
                      className="w-40 border border-blue-200 rounded-xl px-3 py-2 text-center tracking-[0.4em] text-lg font-semibold
                                 bg-white/80 focus:outline-none focus:ring-2 focus:ring-blue-300"
                    />
                  </div>

                  <div className="flex gap-2">
                    <button
                      type="submit"
                      disabled={loading || otp.length < 4}
                      className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs md:text-sm font-semibold
                                 bg-emerald-600 text-white shadow-sm shadow-emerald-500/40
                                 hover:bg-emerald-700 hover:-translate-y-[1px] hover:shadow-[0_10px_25px_rgba(16,185,129,0.7)]
                                 active:translate-y-0 active:shadow-md transition-all disabled:opacity-60 disabled:cursor-not-allowed"
                    >
                      <FaCheck />
                      {loading ? "Verifying..." : "Verify & Update"}
                    </button>

                    <button
                      type="button"
                      onClick={handleCancelEdit}
                      className="inline-flex items-center gap-1 px-3 py-1.5 rounded-full text-xs font-semibold
                                 border border-red-300 text-red-600 bg-red-50
                                 hover:bg-red-100 hover:border-red-400 hover:-translate-y-[1px]
                                 hover:shadow-md transition-all"
                    >
                      <FaTimes />
                      Cancel
                    </button>
                  </div>
                </div>
              )}
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

const InputField = ({ label, icon, ...rest }) => (
  <div>
    <label className="text-xs font-semibold text-gray-500 mb-1 block">
      {label}
    </label>
    <div className="flex items-center gap-2 border border-blue-100 rounded-xl px-3 py-2 bg-white/80 focus-within:ring-2 focus-within:ring-blue-200">
      {icon}
      <input
        {...rest}
        className="flex-1 bg-transparent border-none outline-none text-xs text-gray-800"
      />
    </div>
  </div>
);

const SocialRow = ({ icon, label, value }) => (
  <div className="flex items-center gap-2">
    {icon}
    {value ? (
      <a
        href={value}
        target="_blank"
        rel="noreferrer"
        className="text-blue-600 hover:underline truncate"
      >
        {label}
      </a>
    ) : (
      <span className="text-gray-400">No {label} added</span>
    )}
  </div>
);

export default MyProfile;
