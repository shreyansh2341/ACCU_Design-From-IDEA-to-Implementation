import React from "react";
import { motion } from "framer-motion";

const CNCMachiningComparison = () => {
  return (
    <div className="bg-white text-gray-800 min-h-screen px-6 md:px-16 py-12">
      
      {/* Hero Section */}
      <motion.div
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center max-w-4xl mx-auto"
      >
        <h1 className="text-4xl md:text-5xl font-bold mb-4 text-[#2479C2]">
          Rapid CNC Machining vs. Traditional CNC Machining
        </h1>
        <p className="text-lg text-gray-600">
          A detailed look at how speed, scalability, and innovation are shaping the future of manufacturing.
        </p>
      </motion.div>

      {/* Comparison Grid */}
      <div className="mt-12 grid md:grid-cols-2 gap-10 max-w-6xl mx-auto">
        
        {/* Rapid CNC */}
        <motion.div
          whileHover={{ scale: 1.02 }}
          className="bg-white rounded-2xl p-6 border border-[#2479C2] shadow-md"
        >
          <h2 className="text-2xl font-semibold text-[#2479C2] mb-3">🚀 Rapid CNC Machining</h2>
          <ul className="space-y-3 text-gray-700">
            <li>⚡ Ultra-fast prototyping with turnaround in 1–3 days.</li>
            <li>🤖 Ideal for on-demand, small-batch production.</li>
            <li>🌐 Integrates with AI-driven CAD/CAM for real-time adjustments.</li>
            <li>🔧 High flexibility for design changes mid-production.</li>
            <li>🛰 Preferred for aerospace, robotics, and rapid innovation sectors.</li>
          </ul>
        </motion.div>

        {/* Traditional CNC */}
        <motion.div
          whileHover={{ scale: 1.02 }}
          className="bg-white rounded-2xl p-6 border border-gray-300 shadow-md"
        >
          <h2 className="text-2xl font-semibold text-gray-700 mb-3">🏭 Traditional CNC Machining</h2>
          <ul className="space-y-3 text-gray-700">
            <li>⚙️ Best for large-scale, long-term production runs.</li>
            <li>📏 Extremely consistent quality over thousands of units.</li>
            <li>🛠 Proven processes with decades of reliability.</li>
            <li>💰 Lower cost per unit for mass production.</li>
            <li>🏢 Preferred in automotive, heavy machinery, and mass manufacturing.</li>
          </ul>
        </motion.div>
      </div>

      {/* Insight Section */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
        className="mt-16 max-w-5xl mx-auto text-center"
      >
        <h3 className="text-3xl font-semibold text-[#2479C2]">The Future of CNC</h3>
        <p className="text-gray-600 mt-4 leading-relaxed">
          In the near future, hybrid manufacturing will combine the speed of rapid CNC 
          with the scalability of traditional methods. Expect smart factories with AI-powered 
          quality control, IoT-enabled machines, and fully automated “lights-out” production. 
          The right choice depends on your project’s time frame, budget, and scale.
        </p>
      </motion.div>

      {/* Call to Action */}
      <div className="mt-12 text-center">
        <a
          href="/contact-us"
          className="inline-block bg-[#2479C2] hover:bg-blue-600 text-white font-medium px-6 py-3 rounded-full transition-colors duration-300 shadow-md"
        >
          Get Your CNC Project Started
        </a>
      </div>
    </div>
  );
};

export default CNCMachiningComparison;
