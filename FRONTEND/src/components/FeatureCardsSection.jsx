import { motion } from "framer-motion";
import { useState } from "react";

const FeatureCard = ({ label, src, description }) => {
  const [showDetail, setShowDetail] = useState(false);

  const isMedicalDevice = label === "Medical Device";
  const buttonPosition = isMedicalDevice ? "top-4 left-4" : "bottom-4 left-4";

  return (
    <>
      <motion.div
        whileHover={{ scale: 1.05, boxShadow: "0 8px 20px rgba(59, 130, 246, 0.5)" }}
        className="relative rounded-2xl overflow-hidden bg-gradient-to-br from-blue-600 to-blue-400 text-white border border-blue-800 cursor-pointer shadow-lg transition-all duration-300 w-full"
        style={{ aspectRatio: "3/4" }}
      >
        <img
          src={src}
          alt={label}
          className="w-full h-full object-cover object-center filter brightness-90 transition duration-500"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-blue-900/70 via-transparent to-transparent"></div>

        {/* Glowing Plus Button */}
        <div
          className={`absolute ${buttonPosition} z-10`}
          onClick={() => setShowDetail(true)}
        >
          <motion.div
            whileTap={{ scale: 0.9 }}
            animate={{
              boxShadow: [
                "0 0 12px 3px rgba(59, 130, 246, 0.6)",
                "0 0 24px 6px rgba(59, 130, 246, 0.85)",
                "0 0 12px 3px rgba(59, 130, 246, 0.6)",
              ],
            }}
            transition={{
              duration: 1.8,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="w-10 h-10 rounded-full bg-white text-blue-600 font-bold text-2xl flex items-center justify-center
              ring-4 ring-blue-400 shadow-lg cursor-pointer"
          >
            +
          </motion.div>
        </div>
      </motion.div>
      {/* Premium Blue Modal */}
      {showDetail && (
        <motion.div
          className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center px-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
        >
          <motion.div
            className="bg-gradient-to-b from-blue-50 to-white/90 backdrop-blur-md 
             max-w-3xl w-full rounded-3xl relative shadow-[0_0_40px_rgba(59,130,246,0.5)] overflow-hidden"
            initial={{ scale: 0.7, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.7, opacity: 0 }}
            transition={{ type: 'spring', stiffness: 120, damping: 15 }}
          >
            {/* Blue Header */}
            <div className="bg-gradient-to-r from-blue-600 to-blue-400 p-6">
              <h3 className="text-3xl font-extrabold text-white drop-shadow-lg">{label}</h3>
            </div>
            {/* Content */}
            <div className="p-8">
              <p className="text-gray-700 text-lg leading-relaxed">{description}</p>
            </div>
            {/* Close Button */}
            <button
              onClick={() => setShowDetail(false)}
              className="absolute top-4 right-4 w-10 h-10 rounded-full bg-blue text-blue-600 font-bold text-xl flex items-center justify-center
                         shadow-lg hover:bg-blue-100 transition duration-300"
              aria-label="Close detail modal"
            >
              ×
            </button>
          </motion.div>
        </motion.div>
      )}
    </>
  );
};

export default FeatureCard;
