import React from "react";
import { motion } from "framer-motion";
import { SLink } from "../components/SLink";

const PrecisionMachinedPartsPage = () => {
  return (
    <div className="w-full min-h-screen bg-white text-gray-800">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-blue-600 to-blue-800 text-white text-center py-16 px-4">
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-4xl md:text-5xl font-bold"
        >
          Precision Machined Parts
        </motion.h1>
        <p className="mt-4 max-w-6xl mx-auto text-lg opacity-90">
          ACCU DESIGN Comprehensive Guide to High-Quality, Custom CNC Components
        </p>

        {/* Curved Bottom */}
        <div className="absolute bottom-0 left-0 w-full overflow-hidden leading-[0]">
          <svg
            className="relative block w-full h-[60px]"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 1920 80"
            preserveAspectRatio="none"
          >
            <path
              fill="#ffffff"
              d="M0,32 C480,96 1440,-32 1920,32 L1920,80 L0,80 Z"
            ></path>
          </svg>
        </div>
      </section>

      {/* Content Section */}
      <section className="px-6 md:px-16 py-12 max-w-6xl mx-auto">
        <h2 className="text-2xl font-semibold text-blue-700 mb-6">
          About Precision Machined Parts
        </h2>
        <p className="mb-6 leading-relaxed">
          At ACCU DESIGN, precision isn’t just a standard — it’s our signature.
          We deliver high-performance CNC machined parts tailored to your exact
          specifications, ensuring unmatched accuracy, durability, and
          efficiency for industries ranging from aerospace to medical devices.
        </p>

        <h3 className="text-xl font-semibold text-blue-700 mt-8 mb-4">
          Key Features
        </h3>
        <ul className="list-disc pl-6 space-y-2">
          <li>Micron-level tolerances for critical components</li>
          <li>Wide range of materials: aluminum, steel, titanium, plastics</li>
          <li>Advanced surface finishes for functionality and aesthetics</li>
          <li>Fast turnaround with consistent quality assurance</li>
        </ul>

        <h3 className="text-xl font-semibold text-blue-700 mt-8 mb-4">
          Our Technology
        </h3>
        <p className="mb-6 leading-relaxed">
          Our state-of-the-art CNC machines are equipped with multi-axis
          capabilities, enabling the production of complex geometries in a
          single setup. This not only reduces lead times but also improves
          dimensional stability across production runs.
        </p>

        <h3 className="text-xl font-semibold text-blue-700 mt-8 mb-4">
          Applications
        </h3>
        <p className="leading-relaxed">
          From automotive prototypes to medical implants, precision machined
          parts play a critical role in modern manufacturing. At ACCU DESIGN, we
          understand the demands of each sector and tailor our machining
          processes accordingly to meet both functional and regulatory
          requirements.
        </p>
      </section>

      {/* Get Free Quote CTA */}
      <section className="bg-blue-600 text-white py-10 text-center">
        <h2 className="text-2xl font-bold mb-4">
          Ready to Bring Your Project to Life?
        </h2>
        <p className="mb-6 max-w-xl mx-auto opacity-90">
          Get in touch with ACCU DESIGN today and receive a free, no-obligation
          quote for your precision machining needs.
        </p>
        <SLink
          href="/get-quote"
          className="bg-white text-blue-700 font-semibold px-6 py-3 rounded-full shadow hover:bg-blue-100 transition"
        >
          Get Free Quote
        </SLink>
      </section>
      {/* Tagline */}
      <footer className="text-center pb-12 text-gray-600 italic mt-10">
        "ACCU DESIGN – Where Precision Meets Perfection."
      </footer>
    
    </div>
  );
};

export default PrecisionMachinedPartsPage;
