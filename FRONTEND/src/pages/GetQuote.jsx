import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  FaFileUpload,
  FaCheckCircle,
  FaQuoteRight,
  FaEnvelope,
  FaInfoCircle,
  FaIndustry,
  FaProjectDiagram,
} from "react-icons/fa";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";

const steps = [
  {
    icon: <FaCheckCircle className="mr-2 text-green-500 text-lg sm:text-xl" />,
    text: "Fill out the detailed project information",
  },
  {
    icon: <FaFileUpload className="mr-2 text-blue-500 text-lg sm:text-xl" />,
    text: "Upload relevant project documents",
  },
  {
    icon: <FaIndustry className="mr-2 text-purple-500 text-lg sm:text-xl" />,
    text: "Our team reviews your specific requirements",
  },
  {
    icon: <FaProjectDiagram className="mr-2 text-orange-500 text-lg sm:text-xl" />,
    text: "Receive a comprehensive, customized quote",
  },
];

const GetQuote = () => {
  const [visibleStepIndex, setVisibleStepIndex] = useState(0);
  const [phone, setPhone] = useState("");

  useEffect(() => {
    const interval = setInterval(() => {
      setVisibleStepIndex((prev) => (prev + 1) % steps.length);
    }, 2500);
    return () => clearInterval(interval);
  }, []);

  return (
    <div
      className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-blue-50 flex flex-col items-center justify-center px-4 sm:px-6 md:px-10 py-12"
      style={{
        backgroundImage: `url('/images/bg-image-getquote.jpg')`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundBlendMode: "lighten",
      }}
    >
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        className="text-center mb-10 sm:mb-12"
      >
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-800 flex items-center justify-center mb-3 sm:mb-4">
          <FaQuoteRight className="mr-2 sm:mr-3 text-blue-600" />
          Get a Customized Quote
        </h1>
        <p className="text-gray-600 text-sm sm:text-base max-w-2xl mx-auto">
          Share your project details, and our expert team will provide a
          tailored solution that meets your specific needs.
        </p>
      </motion.div>

      {/* Main Grid */}
      <div className="max-w-6xl w-full grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 bg-white/90 backdrop-blur-sm rounded-2xl shadow-2xl p-6 sm:p-8">
        {/* LEFT SECTION */}
        <div className="space-y-8">
          {/* Quote Process Steps */}
          <div className="bg-gradient-to-br from-blue-50 to-white p-5 sm:p-6 rounded-2xl shadow-lg border border-blue-100">
            <h3 className="text-xl sm:text-2xl font-semibold mb-4 flex items-center text-gray-800">
              <FaInfoCircle className="mr-2 sm:mr-3 text-blue-500" />
              How Our Quote Process Works
            </h3>

            <div className="relative h-16 overflow-hidden flex items-center justify-center">
              <AnimatePresence mode="wait">
                <motion.div
                  key={visibleStepIndex}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.6 }}
                  className="flex items-center justify-center bg-white/70 backdrop-blur-sm px-4 py-2 rounded-xl shadow-sm border border-gray-200 text-sm sm:text-base font-medium text-gray-700 text-center"
                >
                  {steps[visibleStepIndex].icon}
                  {steps[visibleStepIndex].text}
                </motion.div>
              </AnimatePresence>
            </div>
          </div>

          {/* Contact Info */}
          <div className="bg-gradient-to-br from-gray-50 to-white p-5 sm:p-6 rounded-2xl shadow-md border border-gray-100">
            <h3 className="text-lg sm:text-xl font-semibold mb-3 sm:mb-4 flex items-center text-gray-800">
              <FaEnvelope className="mr-2 sm:mr-3 text-red-500" />
              Contact Information
            </h3>
            <p className="text-gray-600 text-sm sm:text-base leading-relaxed">
              Need immediate assistance?
              <br />
              <strong>Email:</strong> quotes@yourcompany.com
              <br />
              <strong>Phone:</strong> +1 (555) 123-4567
            </p>
          </div>
        </div>

        {/* RIGHT SECTION - Form */}
        <motion.form
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7 }}
          className="space-y-5 sm:space-y-6 bg-white p-5 sm:p-8 rounded-2xl shadow-lg border border-gray-100"
        >
          <h3 className="text-xl sm:text-2xl font-semibold text-gray-800 mb-3 flex items-center">
            <FaFileUpload className="mr-2 sm:mr-3 text-blue-600" />
            Request a Quote
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <input
              type="text"
              placeholder="Full Name *"
              className="w-full p-3 text-sm sm:text-base border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-300 outline-none"
            />
            <input
              type="text"
              placeholder="Company Name"
              className="w-full p-3 text-sm sm:text-base border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-300 outline-none"
            />
          </div>

          <input
            type="email"
            placeholder="Email Address *"
            className="w-full p-3 text-sm sm:text-base border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-300 outline-none"
          />

          {/* 🌍 Country Flag Phone Input */}
          <div className="w-full">
            <PhoneInput
              country={"in"}
              value={phone}
              onChange={setPhone}
              inputProps={{
                name: "phone",
                required: true,
                autoFocus: false,
              }}
              inputClass="!w-full !p-3 !text-sm sm:!text-base !text-gray-800 !rounded-lg !border !border-gray-300 !focus:ring-2 !focus:ring-blue-300 !outline-none"
              containerClass="!w-full"
              buttonClass="!border-gray-300"
            />
          </div>

          <textarea
            placeholder="Describe Your Project Requirements *"
            rows={5}
            className="w-full p-3 text-sm sm:text-base border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-300 outline-none"
          ></textarea>

          <div>
            <h4 className="text-base sm:text-lg font-semibold mb-2 sm:mb-3 flex items-center text-gray-800">
              <FaFileUpload className="mr-2 sm:mr-3 text-blue-500" />
              Upload Project Documents
            </h4>
            <input
              type="file"
              className="w-full text-gray-600 text-sm sm:text-base file:mr-4 file:py-2 file:px-4 file:rounded-full 
                file:border-0 file:text-sm file:font-semibold 
                file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition-colors font-semibold text-base sm:text-lg shadow-md"
          >
            Submit Quote Request
          </button>
        </motion.form>
      </div>
    </div>
  );
};

export default GetQuote;
