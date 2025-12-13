import React, { useState } from 'react';
import { SLink } from '@/components/SLink';
import { FaCheckCircle } from 'react-icons/fa';
import { FiChevronDown, FiChevronUp } from 'react-icons/fi';
import { motion } from "framer-motion";

const services = [
  { 
    image: 'https://res.cloudinary.com/dxrryep5y/image/upload/v1764179331/website_static_media/Fdm.jpg', 
    title: 'FDM (Fused Deposition Modeling)', 
    description: 'Affordable 3D printing with durable thermoplastics.',
    link: '/FDMPage'
  },
  { 
    image: 'https://res.cloudinary.com/dxrryep5y/image/upload/v1764179333/website_static_media/SLA.jpg', 
    title: 'SLA (Stereolithography)', 
    description: 'High-precision parts with smooth surface finishes.',
    link: '/SLAPage'
  },
  { 
    image: 'https://res.cloudinary.com/dxrryep5y/image/upload/v1764179335/website_static_media/SLS.jpg', 
    title: 'SLS (Selective Laser Sintering)', 
    description: 'Strong, functional parts with complex geometries.',
    link: '/SLSPage'
  },
  { 
    image: 'https://res.cloudinary.com/dxrryep5y/image/upload/v1764179332/website_static_media/MSLAjpg.jpg', 
    title: 'MSLA Printing', 
    description: 'Fast, high-detail printing using LCD light sources.',
    link: '/MLSAPage'
  },
  { 
    image: 'https://res.cloudinary.com/dxrryep5y/image/upload/v1764179330/website_static_media/DSML.jpg', 
    title: 'DMLS (Metal 3D Printing)', 
    description: 'Industrial-grade parts made from metal powders.',
    link: '/DMLSPage'
  },
];

const features = [
  "Rapid prototyping with high precision",
  "Wide range of 3D printing materials",
  "Complex geometries with no tooling",
  "Upload your CAD and get instant quote",
  "Functional parts ready in 1-2 days",
];

const finishingOptions = [
  { 
    name: 'Sanding', 
    materials: 'Plastics', 
    colors: 'N/A', 
    appliedWith: 'FDM, SLA' 
  },
  { 
    name: 'Polishing', 
    materials: 'Resins, Metals', 
    colors: 'Glossy Clear, Natural', 
    appliedWith: 'SLA, DMLS' 
  },
  { 
    name: 'Painting', 
    materials: 'Plastics, Metals', 
    colors: 'Custom', 
    appliedWith: 'FDM, SLS, DMLS' 
  },
];


const faqData = [
  { question: 'What materials do you support?', answer: 'We support PLA, ABS, PETG, Nylon, Resin, and Metals.' },
  { question: 'How fast can I get my parts?', answer: 'Standard delivery is 2-4 days. Expedited delivery available in 1 day.' },
  { question: 'Do you offer post-processing?', answer: 'Yes, we offer sanding, polishing, painting, and more.' },
];


const Printing = () => {
  const [openIndex, setOpenIndex] = useState(null);
  const toggleIndex = (index) => setOpenIndex(openIndex === index ? null : index);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      {/* Hero Section */}
      <motion.section
        className="relative bg-gradient-to-br from-blue-900 via-blue-800 to-blue-700 text-white"
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        viewport={{ once: true }}
      >
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-blue-800/40 via-blue-900/60 to-black opacity-50" />
        <div className="relative z-10 max-w-7xl mx-auto px-6 py-28 text-center">
          <motion.h1
            className="text-4xl md:text-6xl font-extrabold tracking-tight bg-gradient-to-r from-cyan-400 to-blue-300 bg-clip-text text-transparent animate-pulse"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            Professional 3D Printing Services
          </motion.h1>
          <motion.p
            className="mt-6 text-lg md:text-xl max-w-3xl mx-auto text-blue-100"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            viewport={{ once: true }}
          >
            At{" "}
            <span className="font-semibold text-cyan-300">Accu DESIGN</span>, get high-quality 3D printed parts with complex geometries and fast turnaround using the latest additive manufacturing technologies.
            Parts delivered in as fast as 1 day with 99% customer satisfaction.
          </motion.p>
          <motion.div
            className="mt-8"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <SLink
              to="/get-quote"
              className="bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-white font-semibold py-3 px-8 rounded-full shadow-lg transition transform hover:scale-105 inline-block"
            >
              Get a 3D Printing  Quote →
            </SLink>
          </motion.div>
        </div>
        <div className="absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-blue-900 to-transparent opacity-50 blur-md" />
      </motion.section>

      {/* Features */}
      <motion.section
        className="bg-gray-50 py-12"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
      >
        <h2 className="text-3xl font-bold text-center mb-8">
          Why Choose Accu Design for 3D Printing Services?
        </h2>
        <div className="max-w-6xl mx-auto flex flex-wrap justify-center gap-6 px-4">
          {features.map((feature, idx) => (
            <motion.div
              key={idx}
              className="flex items-start gap-3 max-w-xs"
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: idx * 0.05 }}
              viewport={{ once: true }}
              whileHover={{ y: -3 }}
            >
              <FaCheckCircle className="text-blue-500 mt-1" />
              <span className="text-gray-800">{feature}</span>
            </motion.div>
          ))}
        </div>
      </motion.section>

      {/* SERVICES */}
      <section className="grid grid-cols-1 md:grid-cols-5 gap-6 p-6 max-w-10xl mx-auto">
        {services.map((service, index) => (
          <SLink 
            to={service.link} 
            key={index} 
            className="group bg-white rounded-xl shadow-md hover:shadow-xl transition overflow-hidden"
          >
            <motion.img 
              src={service.image} 
              alt={service.title} 
              className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
              whileHover={{ scale: 1.05 }}
            />
            <div className="p-4">
              <h3 className="text-lg font-bold text-gray-900">{service.title}</h3>
              <p className="text-gray-600 mt-1">{service.description}</p>
            </div>
          </SLink>
        ))}
      </section>

      {/* FINISHING OPTIONS */}
      <div className="py-12 px-4 md:px-16 bg-white">
        <h2 className="text-3xl font-bold text-center mb-8">
          Finishing Options for 3D Printing
        </h2>

        <div className="overflow-x-auto">
          <table className="min-w-full table-auto border-collapse border border-gray-200">
            <thead className="bg-blue-200">
              <tr className="text-left text-gray-700 text-sm">
                <th className="p-4">Name</th>
                <th className="p-4">Applicable Materials</th>
                <th className="p-4">Colors</th>
                <th className="p-4">Can Be Applied With</th>
              </tr>
            </thead>

            <tbody>
              {finishingOptions.map((item, index) => (
                <tr
                  key={index}
                  className="border-b border-gray-200 hover:bg-gray-50 transition"
                >
                  <td className="p-4 font-medium text-blue-700">
                    {item.name}
                  </td>

                  <td className="p-4 text-gray-700">
                    {item.materials}
                  </td>

                  <td className="p-4 text-gray-700">
                    {item.colors}
                  </td>

                  <td className="p-4 text-gray-700">
                    {item.appliedWith}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* FAQ */}
      <motion.section
        className="py-12 px-2 max-w-6xl mx-auto"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
      >
        <h2 className="text-3xl font-bold text-center mb-10">3D Printing Service FAQs</h2>
        <div className="space-y-4">
          {faqData.map((faq, index) => (
            <motion.div
              key={index}
              className="rounded-xl bg-gray-50 hover:shadow-md transition-shadow duration-300"
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: index * 0.05 }}
              viewport={{ once: true }}
            >
              <button onClick={() => toggleIndex(index)} className="w-full flex justify-between items-center p-5 text-left text-gray-800 font-medium">
                <span>{faq.question}</span>
                {openIndex === index ? <FiChevronUp className="text-blue-500 text-xl" /> : <FiChevronDown className="text-blue-500 text-xl" />}
              </button>
              {openIndex === index && (
                <motion.div
                  className="px-5 pb-5 text-gray-600 text-sm"
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
                   Ready to get 3D Printing Services
                 </h2>
                 <p className="text-lg mb-6">
                   Let’s CNC Something Great, Together
                 </p>
                 <motion.button
                   className="bg-white text-black hover:bg-blue-100 px-8 py-3 rounded-lg font-semibold shadow-md"
                   whileTap={{ scale: 0.97 }}
                 >
                  Get A CNC Quote Now
                 </motion.button>
               </div>
             </motion.section>
           </SLink>


      {/* Other Services Buttons */}
      <section className="py-12 bg-gray-50">
        <h2 className="text-3xl font-bold text-center mb-6">
          Explore Our Other Services
        </h2>
        <div className="flex flex-wrap gap-3 mb-10 w-full justify-center px-4">
          {[
            { name: "Machining", path: "/machining" },
            { name: "Laser Cutting", path: "/laser-cutting" },
            { name: "Fabrication", path: "/fabrication" },
            { name: "3D Printing", path: "/3d-printing" },
            { name: "Casting", path: "/casting" },
            { name: "Gear Manufacturing", path: "/gear" },
            { name: "Bending", path: "/bending" },
            { name: "Wire Cutting", path: "/cutting" },
          ].map((btn, index) => (
            <SLink
              to={btn.path}
              key={index}
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-[#f3f7fa] hover:text-[#b36500] hover:font-medium hover:text-lg border border-transparent hover:border-[#b36500] transition-all duration-300"
            >
              {btn.name}
            </SLink>
          ))}
        </div>
      </section>
    </motion.div>
  );
};

export default Printing;
