import React, { useState } from 'react';
import { FaChevronDown, FaLeaf } from 'react-icons/fa';
import { SLink } from '@/components/SLink';
import { motion } from "framer-motion";

const faqs = [
  {
    question: "What types of biofuels do you offer?",
    answer:
      "We provide biodiesel, bioethanol, biogas, and other sustainable fuel solutions for various industries and vehicles.",
  },
  {
    question: "How sustainable are your biofuels?",
    answer:
      "Our biofuels are produced from renewable resources and reduce carbon emissions significantly compared to fossil fuels.",
  },
  {
    question: "Do you provide installation and consultation?",
    answer:
      "Yes, we offer complete consultation and installation services for biofuel systems and equipment.",
  },
  {
    question: "Can businesses switch entirely to biofuel?",
    answer:
      "Absolutely! We help businesses transition to 100% biofuel-powered operations, with tailored solutions.",
  },
];

const phases = [
  {
    name: "BioDiesel Production",
    title: "Efficient Biodiesel Production Systems",
    description:
      "Our biodiesel production units use advanced transesterification technology to convert vegetable oils and animal fats into clean, renewable diesel. High-yield, cost-effective, and scalable for large or small operations.",
    image: " https://res.cloudinary.com/dxrryep5y/image/upload/v1753339708/website_static_media/Biodiesel.png",
  },
  {
    name: "High Shear Powder/Liquid Mixing",
    title: "High Shear Mixer takes a revolutionary approach to powder/liquid mixing.",
    description:
      "The High Shear Mixer (HSM25) efficiently disperses powders into liquids, using a 5.5 kW motor and achieving a flow rate of 3.785 liters per minute. It handles up to 25 kg/h of gums, 90 kg/h of milk proteins, and 40 kg/h.",
    image: "https://res.cloudinary.com/dxrryep5y/image/upload/v1753295693/website_static_media/high_Shear.png",
  },
  {
    name: "BioEthanol Plants",
    title: "High-Efficiency Bioethanol Plants",
    description:
      "Our plants produce bioethanol from sugarcane, corn, or other biomass, providing a renewable alternative to gasoline. Designed for high throughput and minimal environmental impact.",
    image: "https://res.cloudinary.com/dxrryep5y/image/upload/v1753362810/website_static_media/bioethanol.jpg",
  },
  {
    name: "Biogas Digesters",
    title: "Advanced Biogas Digesters",
    description:
      "Harness the power of organic waste with our biogas systems, converting food and agricultural residues into clean energy and fertilizer. Sustainable and compact designs for industrial and rural applications.",
    image: "https://res.cloudinary.com/dxrryep5y/image/upload/v1753362811/website_static_media/biogasdigester.jpg",
  },
  {
    name: "Waste-to-Energy Systems",
    title: "Waste-to-Energy Solutions",
    description:
      "Our systems efficiently convert municipal solid waste into usable bioenergy, reducing landfill usage and emissions. Ideal for urban sustainability initiatives.",
    image: "https://res.cloudinary.com/dxrryep5y/image/upload/v1753362854/website_static_media/wasteenergysystem.jpg",
  },
];

const biofuel = () => {
  const [openIndex, setOpenIndex] = useState(null);
  const [selected, setSelected] = useState(phases[0].name);

  const currentPhase = phases.find((phase) => phase.name === selected);

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
    >
      {/* HERO */}
      <motion.section
        className="relative w-full bg-gradient-to-r from-gray-900 to-gray-800 text-white overflow-hidden"
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        viewport={{ once: true }}
      >
        <div className="w-full max-w-screen-xl mx-auto px-4 md:px-6 py-20 flex flex-col-reverse lg:flex-row items-center gap-8">
          <div className="flex-1">
            <motion.h1
              className="text-4xl md:text-5xl font-bold leading-tight mb-6"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
            >
              Power the Future with{" "}
              <span className="text-green-500">Bio-Fuel</span> Energy
            </motion.h1>
            <motion.p
              className="text-lg mb-6 max-w-xl"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              viewport={{ once: true }}
            >
              Clean, renewable energy solutions engineered for sustainability and efficiency. Explore our innovations driving the next generation of fuel.
            </motion.p>
            <motion.div
              className="flex gap-4"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.15 }}
              viewport={{ once: true }}
            >
              {/* Use SLink to connect to your contact / quote pages */}
              <SLink to="/contact-us">
                <button className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg shadow-md transition">
                  Get Started
                </button>
              </SLink>
              <SLink to="/services">
                <button className="border border-white text-white hover:bg-white hover:text-gray-900 px-6 py-3 rounded-lg transition">
                  Learn More
                </button>
              </SLink>
            </motion.div>
          </div>
          <motion.div
            className="flex-1 flex justify-center lg:justify-end"
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <motion.img
              src="https://res.cloudinary.com/dxrryep5y/image/upload/v1753339729/website_static_media/Green.jpg"
              alt="Bio-Fuel Energy"
              className="w-full max-w-md rounded-xl shadow-lg"
              whileHover={{ scale: 1.03 }}
              transition={{ type: "spring", stiffness: 220, damping: 18 }}
            />
          </motion.div>
        </div>

        <div className="absolute top-4 left-4 text-6xl text-green-600 opacity-10 pointer-events-none">
          <FaLeaf />
        </div>
      </motion.section>

      {/* WHY CHOOSE US */}
      <motion.section
        className="py-16 bg-gray-100"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
      >
        <div className="max-w-screen-xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-8">Why Choose Us</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                title: "Sustainable Technology",
                text: "We lead with renewable energy innovations for a greener tomorrow.",
              },
              {
                title: "Cost-Effective Solutions",
                text: "Our biofuels save costs while reducing your environmental footprint.",
              },
              {
                title: "Proven Expertise",
                text: "Years of experience delivering reliable biofuel systems and services.",
              },
            ].map((item, index) => (
              <motion.div
                key={index}
                className="p-6 bg-white shadow rounded border border-transparent hover:border-green-100 hover:shadow-lg transition"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.08 }}
                viewport={{ once: true }}
                whileHover={{ y: -4, scale: 1.02 }}
              >
                <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
                <p>{item.text}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* FAQ */}
      <motion.section
        className="py-16 bg-gray-100"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
      >
        <div className="max-w-screen-md mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-8">
            Frequently Asked Questions
          </h2>
          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <motion.div
                key={index}
                className="bg-white shadow rounded overflow-hidden"
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.05 }}
                viewport={{ once: true }}
              >
                <button
                  onClick={() => toggleFAQ(index)}
                  className="w-full flex justify-between items-center px-4 py-3 text-left text-lg font-medium focus:outline-none"
                >
                  {faq.question}
                  <FaChevronDown
                    className={`text-green-600 transform transition-transform duration-300 ${
                      openIndex === index ? "rotate-180" : ""
                    }`}
                  />
                </button>
                {openIndex === index && (
                  <motion.div
                    className="px-4 py-2 text-gray-700"
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    transition={{ duration: 0.3 }}
                  >
                    {faq.answer}
                  </motion.div>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* GET QUOTE */}
      <SLink to="/get-quote">
        <motion.section
          className="bg-blue-500 text-white py-16 mb-12 cursor-pointer"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          whileHover={{ y: -4 }}
        >
          <div className="max-w-screen-xl mx-auto px-4 text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Ready to Switch to Clean Energy?
            </h2>
            <p className="text-lg mb-6">
              Get an instant quote or talk to our experts about bio-fuel solutions.
            </p>
            <motion.button
              className="bg-white text-black hover:bg-blue-100 px-8 py-3 rounded-lg font-semibold shadow-md"
              whileTap={{ scale: 0.97 }}
            >
              Get Instant Quote
            </motion.button>
          </div>
        </motion.section>
      </SLink>

      {/* TIMELINE / SYSTEMS */}
      <motion.section
        className="max-w-7xl mx-auto px-6 py-20"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
      >
        <h2 className="text-3xl md:text-4xl font-semibold text-center mb-4">
          Our Bio-Fuel Systems
        </h2>
        <p className="text-center text-gray-500 mb-12 max-w-2xl mx-auto text-justify">
          Supporting industries and communities with clean, renewable energy production.
        </p>

        <div className="flex flex-col md:flex-row gap-12">
          {/* Selector */}
          <div className="md:w-1/5 flex md:flex-col gap-4 items-center justify-start">
            {phases.map((phase) => (
              <motion.div
                key={phase.name}
                className="flex flex-col items-center group cursor-pointer"
                onClick={() => setSelected(phase.name)}
                whileHover={{ scale: 1.05 }}
              >
                <div
                  className={`w-6 h-6 rounded-full border-4 transition-all ${
                    selected === phase.name
                      ? "bg-green-600 border-green-100"
                      : "bg-white border-gray-300 group-hover:border-green-400"
                  }`}
                />
                <span
                  className={`mt-2 text-xs font-semibold text-center ${
                    selected === phase.name
                      ? "text-green-600"
                      : "text-gray-500 group-hover:text-green-500"
                  }`}
                >
                  {phase.name}
                </span>
              </motion.div>
            ))}
          </div>

          {/* Content */}
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
                whileHover={{ scale: 1.03 }}
              />
            </div>
            <h3 className="text-2xl font-bold">{currentPhase.title}</h3>
            <p className="text-gray-600 text-justify">
              {currentPhase.description}
            </p>
          </div>
        </div>
      </motion.section>
    </motion.div>
  );
};

export default biofuel;
