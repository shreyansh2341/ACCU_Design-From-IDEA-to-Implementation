import React, { useState } from 'react';
import { SLink } from '@/components/SLink';
import { motion } from "framer-motion";
import {
  FaGlobe,
  FaSatelliteDish,
  FaShieldAlt,
  FaSatellite,
  FaSpaceShuttle,
  FaIndustry,
} from 'react-icons/fa';

// Services
const services = [
  {
    icon: <FaGlobe className="text-blue-600 text-6xl mb-6" />,
    title: "Massive Network Capacity",
    description:
      "Instantly access the production capacity of over 10,000 manufacturers with wide-ranging capabilities and certifications across 46 states and around the world. From your desktop. Strict NDA agreements with our network protect your privacy.",
  },
  {
    icon: <FaSatelliteDish className="text-blue-600 text-6xl mb-6" />,
    title: "Instant Quoting Engine",
    description:
      "Get DFM feedback, lead times, and pricing in a matter of clicks, not days. Our platform puts Data Science to work so you can easily choose the optimal price/lead time option for your project. Compatible with STEP, Mesh, Parasolid, and ACIS files.",
  },
  {
    icon: <FaShieldAlt className="text-blue-600 text-6xl mb-6" />,
    title: "Quality Assurance",
    description:
      "We are certified to ISO 9001:2015, ISO 13485, IATF 16949:2016, CMMC Level 2, and AS9100D. We are ITAR registered and offer CoCs, material certifications, full dimensional reports, inspection reports, and hardware certs.",
  },
];

// Industries
const industries = [
  {
    icon: <FaSatellite className="text-blue-600 text-5xl mb-4" />,
    title: "Satellite Systems",
    description:
      "Advanced satellite components and complete system integration for communication, navigation, and observation.",
  },
  {
    icon: <FaSpaceShuttle className="text-blue-600 text-5xl mb-4" />,
    title: "Space Exploration",
    description:
      "Design and manufacturing of parts for spacecrafts, launch vehicles, and planetary probes.",
  },
  {
    icon: <FaShieldAlt className="text-blue-600 text-5xl mb-4" />,
    title: "Defense & Security",
    description:
      "Critical aerospace solutions for national defense and security applications with certified quality.",
  },
  {
    icon: <FaIndustry className="text-blue-600 text-5xl mb-4" />,
    title: "Advanced Manufacturing",
    description:
      "Innovative fabrication processes and materials for the next generation of aerospace components.",
  },
];

const Aerospace = () => {
  const [showMore, setShowMore] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
    >
      {/* Hero Section */}
      <motion.section
        className="w-full relative overflow-hidden bg-gradient-to-br from-black via-gray-900 to-blue-900 text-white"
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        viewport={{ once: true }}
      >
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(59,130,246,0.3),_transparent_70%)]" />

        <div className="relative z-10 max-w-7xl mx-auto px-6 py-20 flex flex-col-reverse md:flex-row items-center gap-10">
          {/* Left Text */}
          <div className="flex-1 text-center md:text-left">
            <motion.h1
              className="text-4xl md:text-6xl font-extrabold leading-tight"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              Shaping the{" "}
              <span className="text-blue-300">Future of Aerospace</span>
            </motion.h1>
            <motion.p
              className="mt-6 text-lg md:text-xl text-blue-100"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              viewport={{ once: true }}
            >
              Innovative solutions for flight, space exploration, and beyond — engineering excellence that reaches new heights.
            </motion.p>
            <motion.div
              className="mt-8 flex justify-center md:justify-start gap-4"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <SLink to="/contact-us">
                <button className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-xl shadow-md transition">
                  Get Started
                </button>
              </SLink>
              <SLink to="/AerospaceLearnMore">
                <button className="border border-white text-white px-6 py-3 rounded-xl shadow-md hover:bg-white hover:text-blue-800 transition">
                  Learn More
                </button>
              </SLink>
            </motion.div>
          </div>

          {/* Right Image */}
          <motion.div
            className="flex-1 flex justify-center md:justify-end"
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7 }}
            viewport={{ once: true }}
          >
            <motion.img
              src="https://res.cloudinary.com/dxrryep5y/image/upload/v1753295768/website_static_media/web_aero.png"
              alt="Aerospace"
              className="w-80 md:w-[28rem] rounded-2xl shadow-xl"
              whileHover={{ scale: 1.03, rotate: 1 }}
              transition={{ type: "spring", stiffness: 200, damping: 18 }}
            />
          </motion.div>
        </div>
      </motion.section>

      {/* Services Section */}
      <motion.section
        className="w-full bg-white py-20"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
      >
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid gap-10 grid-cols-1 md:grid-cols-3 text-center">
            {services.map((service, index) => (
              <motion.div
                key={index}
                className="flex flex-col items-center bg-white rounded-2xl shadow-md p-6 hover:shadow-xl border border-transparent hover:border-blue-100"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.08 }}
                viewport={{ once: true }}
                whileHover={{ y: -6, scale: 1.02 }}
              >
                {service.icon}
                <h3 className="text-lg font-bold text-gray-800">
                  {service.title}
                </h3>
                <p className="mt-3 text-sm text-gray-600">
                  {service.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* About Us Section */}
      <motion.section
        className="w-full bg-white py-20"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
      >
        <div className="max-w-6xl mx-auto px-6 flex flex-col md:flex-row gap-10 items-center">
          {/* Left Image */}
          <motion.div
            className="flex-1 flex justify-start"
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <motion.img
              src="https://res.cloudinary.com/dxrryep5y/image/upload/v1753295623/website_static_media/aero.png"
              alt="About Us"
              className="rounded-2xl shadow-lg"
              whileHover={{ scale: 1.03 }}
              transition={{ type: "spring", stiffness: 220, damping: 18 }}
            />
          </motion.div>

          {/* Right Text */}
          <motion.div
            className="flex-1"
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
              About <span className="text-blue-600">Us</span>
            </h2>
            <p className="text-gray-600 text-lg mb-4 text-justify">
              We are a team of passionate aerospace engineers, designers, and innovators dedicated to advancing flight and space technology. With decades of combined experience, we bring precision, innovation, and excellence to every project.
            </p>
            {showMore && (
              <motion.p
                className="text-gray-600 text-lg mb-4 transition-all duration-300 text-justify"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
              >
                From concept design to manufacturing and testing, our mission is to deliver high-quality aerospace solutions that meet the toughest standards of performance and reliability. Our global network and cutting-edge facilities ensure that we can tackle the most challenging projects with confidence and precision.
              </motion.p>
            )}
            <motion.button
              onClick={() => setShowMore(!showMore)}
              className="mt-4 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl shadow"
              whileTap={{ scale: 0.97 }}
            >
              {showMore ? "Show Less" : "Learn More"}
            </motion.button>
          </motion.div>
        </div>
      </motion.section>

      {/* Industries Section */}
      <motion.section
        className="w-full bg-gray-50 py-20"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
      >
        <div className="max-w-7xl mx-auto px-6 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-12">
            Industries We <span className="text-blue-600">Serve</span>
          </h2>
          <div className="grid gap-10 grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
            {industries.map((industry, index) => (
              <motion.div
                key={index}
                className="bg-white rounded-xl shadow-md p-6 hover:shadow-xl transition border border-transparent hover:border-blue-100"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.08 }}
                viewport={{ once: true }}
                whileHover={{ y: -6, scale: 1.02 }}
              >
                {industry.icon}
                <h3 className="text-xl font-semibold text-gray-800 mb-2">
                  {industry.title}
                </h3>
                <p className="text-gray-600 text-sm">
                  {industry.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* CTA Section */}
      <motion.section
        className="w-full bg-gradient-to-r from-blue-800 to-blue-600 py-16 text-white mb-8 md:mb-16 lg:mb-20"
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
      >
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Ready to Take Your Aerospace Project Higher?
          </h2>
          <p className="text-lg md:text-xl mb-8 text-blue-100">
            Get an instant quote today and partner with us to bring your vision to life with precision, quality, and innovation.
          </p>
          <SLink
            to="/contact"
            className="inline-block bg-white text-blue-800 font-semibold px-8 py-4 rounded-xl shadow hover:bg-blue-100 transition"
          >
            Get an Instant Quote
          </SLink>
        </div>
      </motion.section>
    </motion.div>
  );
};

export default Aerospace;
