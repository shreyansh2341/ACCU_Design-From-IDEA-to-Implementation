import React from 'react';
import { motion } from 'framer-motion';
import { FaUsers, FaUserTie } from 'react-icons/fa';

const benefitsCustomer = [
  "Ensuring CX satisfaction with accuracy & excellence in every delivery",
  "Streamlined processes with 3-Stage QC layers that saves CX’s time",
  "Nuturing Symbiotic CX Relationship",
  "Innovative and Economical Solutions that fits CX budget",
  "Fast and reliable service",
];

const benefitsVendor = [
  "Healthy Collaboration, Faster Delivery",
  "Together, we can exceed our Quality standards",
  "Let’s Join hands to grow together",
  "Expanding Job portfolio could open new opportunities",
  "Technical insights can help enhance our digital presence",
];


const Collab = () => {
  return (
    <div>
        <section className="w-full py-16 px-4 bg-gradient-to-b from-gray-50 to-white text-center">
      <h2 className="text-4xl font-bold text-blue-900 mb-12">
        Collaboration Benefits
      </h2>

      {/* Customer Section */}
      <div className="flex flex-col items-center mb-20">
        <motion.div
          animate={{ y: [0, -5, 0] }}
          transition={{ repeat: Infinity, duration: 1.5 }}
          className="bg-yellow-400 text-white px-4 py-1 rounded mb-4"
        >
          To Our Valued Customer
        </motion.div>

        {/* FIXED ICON */}
        <div>
          <FaUsers className="text-6xl text-yellow-500 mb-6" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-4xl mx-auto">
          {benefitsCustomer.map((benefit, i) => (
            <motion.div
              key={i}
              animate={{
                y: [0, -5, 0],
              }}
              transition={{
                repeat: Infinity,
                duration: 2,
                delay: i * 0.2,
              }}
              className="bg-white shadow-md p-4 rounded-md text-sm"
            >
              {benefit}
            </motion.div>
          ))}
        </div>
      </div>

      {/* Vendor Section */}
      <div className="flex flex-col items-center">
        <motion.div
          animate={{ y: [0, -5, 0] }}
          transition={{ repeat: Infinity, duration: 1.5 }}
          className="bg-yellow-400 text-white px-4 py-1 rounded mb-4"
        >
          To our Vendors
        </motion.div>

        {/* FIXED ICON */}
        <div>
          <FaUserTie className="text-6xl text-yellow-500 mb-6" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-4xl mx-auto">
          {benefitsVendor.map((benefit, i) => (
            <motion.div
              key={i}
              animate={{
                y: [0, -5, 0],
              }}
              transition={{
                repeat: Infinity,
                duration: 2,
                delay: i * 0.2,
              }}
              className="bg-white shadow-md p-4 rounded-md text-sm"
            >
              {benefit}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
    </div>
  )
}

export default Collab