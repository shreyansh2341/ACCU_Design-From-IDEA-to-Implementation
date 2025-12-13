import React from "react";
import { motion } from "framer-motion";

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.15 }
  }
};

const item = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0 }
};

const CncTurningLearnMore = () => {
  return (
    <section className="bg-gradient-to-b from-gray-50 to-blue-50 min-h-screen py-12 px-4 md:px-8">
      <motion.div
        className="max-w-5xl mx-auto"
        variants={container}
        initial="hidden"
        animate="show"
      >
        {/* Breadcrumb */}
        <motion.div
          variants={item}
          className="mb-4"
        >
          <span className="inline-flex items-center rounded-full bg-blue-100 text-blue-700 text-xs font-semibold px-3 py-1">
            Services / CNC Turning
          </span>
        </motion.div>

        <motion.div
          variants={item}
          className="bg-white shadow-lg hover:shadow-2xl transition-shadow duration-300 rounded-2xl overflow-hidden border border-gray-100"
        >
          {/* Image */}
          <motion.div
            className="relative overflow-hidden"
            initial={{ scale: 1.05 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.8 }}
          >
            <img
              src="https://res.cloudinary.com/dxrryep5y/image/upload/v1753339714/website_static_media/cnc-turning.jpg"
              alt="CNC Turning"
              className="w-full aspect-video object-cover"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent" />
          </motion.div>

          {/* Content */}
          <div className="p-6 md:p-8">
            <motion.h1
              variants={item}
              className="text-3xl md:text-4xl font-bold text-gray-900 mb-3"
            >
              CNC Turning
            </motion.h1>

            <motion.p
              variants={item}
              className="text-lg text-gray-600 mb-6"
            >
              <strong className="font-semibold text-gray-800">
                Efficient turning solutions
              </strong>{" "}
              for cylindrical parts with high precision and repeatability. Our CNC
              turning services deliver smooth finishes, tight tolerances, and
              reliable performance for components across a wide range of
              industries.
            </motion.p>

            {/* Why Choose */}
            <motion.div variants={item} className="mt-6">
              <h2 className="text-2xl font-semibold text-gray-900 mb-3">
                Why Choose Our CNC Turning?
              </h2>
              <ul className="list-disc list-inside text-gray-700 space-y-1.5 text-sm md:text-base">
                <li>State-of-the-art CNC lathes for precision and efficiency.</li>
                <li>Ideal for shafts, bushings, pins, and cylindrical components.</li>
                <li>Supports both prototypes and production volumes.</li>
                <li>Wide range of metals and engineering plastics.</li>
                <li>Strict quality checks and skilled machinists.</li>
              </ul>
            </motion.div>

            {/* Applications */}
            <motion.div variants={item} className="mt-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-3">
                Applications
              </h2>
              <ul className="list-disc list-inside text-gray-700 space-y-1 text-sm md:text-base">
                <li>Automotive components</li>
                <li>Industrial shafts and rods</li>
                <li>Medical device parts</li>
                <li>Custom bushings and collars</li>
              </ul>
            </motion.div>

            {/* Info Strip */}
            <motion.div
              variants={item}
              className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-3 text-sm"
            >
              {[
                { title: "Typical Tolerance", value: "±0.02 mm" },
                { title: "Production Type", value: "Prototype to Bulk" },
                { title: "Common Materials", value: "Steel, Aluminum, Brass, Plastics" },
              ].map((box, i) => (
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  key={i}
                  className="bg-blue-50 border border-blue-100 rounded-xl px-4 py-3 transition"
                >
                  <p className="font-semibold text-blue-700">{box.title}</p>
                  <p className="text-gray-700 text-sm">{box.value}</p>
                </motion.div>
              ))}
            </motion.div>

            {/* CTA */}
            <motion.div
              variants={item}
              className="mt-10 text-center"
            >
              <motion.a
                href="/get-quote"
                whileHover={{ scale: 1.08 }}
                whileTap={{ scale: 0.95 }}
                className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-semibold px-7 py-3 rounded-full shadow-md hover:shadow-lg transition-all"
              >
                Get a CNC Turning Quote →
              </motion.a>
            </motion.div>
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default CncTurningLearnMore;
