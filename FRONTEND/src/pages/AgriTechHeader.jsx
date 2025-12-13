import React, { useState } from 'react';
import { SLink } from '@/components/SLink';
import { FaTractor, FaTools, FaSeedling, FaRobot } from 'react-icons/fa';
import { motion } from "framer-motion";

const features = [
  {
    icon: <FaTractor className="text-green-600 text-4xl mb-4" />,
    title: "Smart Farm Equipment",
    description:
      "Custom-built machinery for plowing, harvesting, and spraying with greater efficiency and precision.",
  },
  {
    icon: <FaTools className="text-green-600 text-4xl mb-4" />,
    title: "Engineering Support",
    description:
      "Mechanical design, prototyping, and testing tailored for agricultural conditions and constraints.",
  },
  {
    icon: <FaSeedling className="text-green-600 text-4xl mb-4" />,
    title: "Sustainable Solutions",
    description:
      "Eco-friendly innovations that reduce fuel usage, increase crop yield, and minimize waste.",
  },
  {
    icon: <FaRobot className="text-green-600 text-4xl mb-4" />,
    title: "Automation & IoT",
    description:
      "Integrating sensors, automation, and robotics for data-driven and hands-free farming.",
  },
];

const phases = [
  {
    name: "CHAFF CUTTER - HAMMER MILL MACHINE",
    title: "Chaff Cutter - Hammer Mill Machine Efficient Grass Processing Solution",
    description:
      "Designed for efficient grass cutting and fertilizer production. With a powerful 750W motor and a compact footprint of 7306.92 mm², it effectively chops and mills biomass, enhancing composting quality. User-friendly and durable, it’s ideal for sustainable agricultural practices.",
    image: "https://res.cloudinary.com/dxrryep5y/image/upload/v1753295653/website_static_media/Chaff_cutter.png",
  },
  {
    name: "Organic Waste Seprating System",
    title: "Efficient Organic Waste Separate Processing System",
    description:
      "The processing system for organic recyclable materials utilizes a 7.5 kW motor to efficiently handle kitchen waste, raw organic residues, and expired goods in various packaging. It includes shredding and mixing mechanisms, advanced separation technologies, and a control panel.",
    image: "https://res.cloudinary.com/dxrryep5y/image/upload/v1753295733/website_static_media/organic_waste.png",
  },
  {
    name: "MSW treatment Twin Shaft Crusher cum Shredder AD100",
    title: "Shredder AD 100 Versatile Waste Processing Solution",
    description:
      "The Shredder AD 100 is designed for efficient processing of organic waste, fish waste, plastic waste, and agricultural residues. Its robust construction facilitates effective particle size reduction, enabling the composting of organic materials and the recycling of plastics.",
    image: "https://res.cloudinary.com/dxrryep5y/image/upload/v1753295764/website_static_media/treatment_Twin.png",
  },
];

const AgriTechHeader = () => {
  const [selected, setSelected] = useState(phases[0].name);
  const currentPhase = phases.find((p) => p.name === selected);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
    >
      {/* Hero Section */}
      <motion.section
        className="bg-white py-16 px-6 md:px-20"
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
      >
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 items-center gap-12">
          {/* Left Text Section */}
          <div className="pl-6">
            <motion.h1
              className="text-4xl md:text-5xl font-bold text-blue-700 mb-6"
              initial={{ y: 20, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
            >
              GREEN AGRI
            </motion.h1>
            <motion.h2
              className="text-2xl font-semibold text-blue-700 mb-4"
              initial={{ y: 20, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.05 }}
              viewport={{ once: true }}
            >
              Advancing Agriculture with Engineering
            </motion.h2>
            <motion.p
              className="text-gray-600 text-lg mb-6"
              initial={{ y: 20, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              viewport={{ once: true }}
            >
              Bringing mechanical innovation to the fields — from automated
              machinery to precision farming tools.
            </motion.p>
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.15 }}
              viewport={{ once: true }}
            >
              <SLink
                to="/contact-us"
                className="mt-6 inline-block relative overflow-hidden rounded-lg font-semibold py-3 px-6 shadow-lg bg-teal-600 text-white transition-all duration-300 group"
              >
                {/* Hover Animation Layer */}
                <span className="absolute inset-0 bg-gradient-to-r from-teal-500 to-teal-950 translate-x-[-100%] group-hover:translate-x-0 transition-transform duration-500 ease-out"></span>

                {/* Button Text */}
                <span className="relative z-10">
                  Get Started →
                </span>
              </SLink>
            </motion.div>
          </div>

          {/* Image Section */}
          <motion.div
            className="pr-6"
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <img
              src="https://res.cloudinary.com/dxrryep5y/image/upload/v1753295655/website_static_media/clean.jpg"
              alt="Innovative Agricultural Technology"
              className="w-auto h-auto rounded-2xl shadow-xl"
            />
          </motion.div>
        </div>
      </motion.section>

      {/* Focus Areas */}
      <motion.section
        className="bg-gray-50 py-16 px-6 md:px-20"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
      >
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-blue-700 mb-12">
            Our Agri-Tech Focus Areas
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                className="bg-white p-6 rounded-2xl shadow hover:shadow-lg transition flex flex-col items-center text-center"
                whileHover={{ y: -6, scale: 1.02 }}
                transition={{ type: "spring", stiffness: 220, damping: 16 }}
              >
                <div>{feature.icon}</div>
                <h3 className="text-xl font-semibold text-gray-800 my-2">
                  {feature.title}
                </h3>
                <p className="text-gray-600 text-sm">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* CleanTech Sourcing */}
      <motion.section
        className="bg-gray-50 py-16 px-6 md:px-20"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
      >
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center gap-12">
          {/* Text */}
          <motion.div
            className="md:w-1/2 text-center md:text-left"
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-blue-700 mb-4">
              Simplified Sourcing for the CleanTech Industry
            </h2>
            <p className="text-gray-600 text-lg">
              We make it easier for CleanTech innovators to source custom
              parts, energy-efficient components, and eco-friendly materials — 
              all through one streamlined platform.
            </p>
          </motion.div>

          {/* Image */}
          <motion.div
            className="md:w-1/2 flex justify-center"
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            <img
              src="https://res.cloudinary.com/dxrryep5y/image/upload/v1753295656/website_static_media/clean1.jpg"
              alt="CleanTech Industry Solutions"
              className="w-auto h-96 rounded-2xl shadow-xl"
            />
          </motion.div>
        </div>
      </motion.section>

      {/* Call to Action */}
      <motion.section
        className="bg-blue-500 py-16 px-6 md:px-20 text-white"
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
      >
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Let's Get Started
          </h2>
          <p className="text-lg md:text-xl mb-8">
            Ready to bring innovation to your farm or agri-tech project? Connect
            with us today and explore tailored mechanical solutions.
          </p>
          <SLink to="/get-quote">
            <button className="bg-teal-600 text-white px-8 py-3 rounded-xl font-semibold hover:bg-teal-700 transition">
              Get Instant Quote
            </button>
          </SLink>
        </div>
      </motion.section>

      {/* Timeline Section */}
      <motion.div
        className="max-w-7xl mx-auto px-6 py-20"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
      >
        <h2 className="text-3xl md:text-4xl font-semibold text-center mb-4">
          Special Purpose Machines
        </h2>
        <p className="text-center text-gray-500 mb-12 max-w-2xl mx-auto">
          Supporting defense parts development from rapid prototyping to full production.
        </p>

        <div className="flex flex-col md:flex-row gap-12">
          {/* Selector */}
          <div className="md:w-1/5 flex md:flex-col gap-6 items-center justify-start">
            {phases.map((phase) => (
              <motion.div
                key={phase.name}
                className="flex flex-col items-center group cursor-pointer"
                onClick={() => setSelected(phase.name)}
                whileHover={{ scale: 1.05 }}
              >
                <div
                  className={`w-6 h-6 rounded-full border-4 transition-all duration-200 ${
                    selected === phase.name
                      ? "bg-blue-600 border-blue-100"
                      : "bg-white border-gray-300 group-hover:border-blue-400"
                  }`}
                />
                <span
                  className={`mt-2 text-xs font-semibold text-center ${
                    selected === phase.name
                      ? "text-blue-600"
                      : "text-gray-500 group-hover:text-blue-500"
                  }`}
                >
                  {phase.name}
                </span>
              </motion.div>
            ))}
          </div>

          {/* Timeline Content */}
          <div className="md:w-4/5 space-y-6">
            <div className="w-full h-[400px] flex items-center justify-center">
              <motion.img
                key={currentPhase.image}
                src={currentPhase.image}
                alt={currentPhase.title}
                className="max-h-full max-w-full object-contain rounded-lg shadow-md"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
                whileHover={{ scale: 1.05 }}
              />
            </div>
            <h3 className="text-2xl font-bold">{currentPhase.title}</h3>
            <p className="text-gray-600">{currentPhase.description}</p>
          </div>
        </div>
      </motion.div>

      {/* Footer */}
      <section className="bg-white py-10 px-6 md:px-20 border-t">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 text-center md:text-left text-gray-700">
          {/* Contact Info */}
          <div>
            <h3 className="text-xl font-bold text-blue-700 mb-4">
              Contact Us
            </h3>
            <p>Email: projects@accudesign.in</p>
            <p>Phone: +91 9821679475</p>
            <p>Location: Pune, Maharashtra</p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-xl font-bold text-blue-700 mb-4">
              Quick Links
            </h3>
            <ul className="space-y-2">
              <li>
                <SLink to="/" className="hover:underline">
                  Home
                </SLink>
              </li>
              <li>
                <SLink to="/services" className="hover:underline">
                  Services
                </SLink>
              </li>
              <li>
                <SLink to="/get-quote" className="hover:underline">
                  Get Quote
                </SLink>
              </li>
              <li>
                <SLink to="/contact" className="hover:underline">
                  Contact
                </SLink>
              </li>
            </ul>
          </div>
        </div>
      </section>
    </motion.div>
  );
};

export default AgriTechHeader;
