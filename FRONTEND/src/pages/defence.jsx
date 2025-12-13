import React, { useState } from "react";
import { FaCheckCircle } from "react-icons/fa";
import { SLink } from '@/components/SLink';
import { motion } from "framer-motion";

const features = [
  "DRDO Recognized Vendor",
  "5+ Custom Machines Delivered",
  "Precision CNC + Fabrication Shop",
  "Custom Design & Manufacturing Expertise",
  "Defence-Grade Quality Assurance",
];
const cardData = [
  {
    title: "Conceptual Solutions provided to RDE, Dighi",
    description: "Portable Light Weight Suitcase Power Box",
    image: "https://res.cloudinary.com/dxrryep5y/image/upload/v1753295753/website_static_media/suitcase.png",
  },
  {
    title: "Conceptual design Photos",
    description: "Lightweight Solar Generator Concept",
    image: " https://res.cloudinary.com/dxrryep5y/image/upload/v1753295729/website_static_media/micro.png",
  },
  {
    title: "Conceptual Solutions provided to RDE, Dighi Portable Light Weight",
    description: "Suitcase Power Box Conceptual design Photos",
    image: "https://res.cloudinary.com/dxrryep5y/image/upload/v1753295751/website_static_media/suitcase_power.png",
  },
];
const projects = [
  {
    title: "Customised Thermal Insulated Temperature Controlled Portable ISO 20 Ft. Shipping Container for Power Plant",
    soNumber: "NO204/D1/ESE",
    group: "ESG",
    amount: "₹4,50,000",
    pdc: "30 Apr 2019",
    images: [
      "https://res.cloudinary.com/dxrryep5y/image/upload/v1753295757/website_static_media/Thermal.png",
      "https://res.cloudinary.com/dxrryep5y/image/upload/v1753295758/website_static_media/Thermal1.png",
    ],
    description: "Customised Thermal insulated Temperature Controlled Portable ISO 20Ft. Shipping Container with subsystems and accessories for power plant application in the field",
    abstract:
      "The system is a mobile solar power grid and surveillance cabinet built from a 20-foot shipping container, designed for remote solar energy generation. The 2 kW setup features eight 250W semi-flexible solar panels on a tilted frame. Inside, it includes a 2.5 kW Direct Methanol Fuel Cell, a high-tech surveillance room with CCTV and monitoring equipment, and a storage area for lead-acid batteries. It also has cooling, ventilation, and a walkable platform for patrolling.",
  },
  {
    title: "Mobile Hybrid Portable Power Generation System",
    soNumber: "S.O No.: N0206/D1/ESE",
    group: "ESG",
    amount: " 8,45,500",
    pdc: "30 Apr 2019",
    images: ["https://res.cloudinary.com/dxrryep5y/image/upload/v1753295699/website_static_media/hybrid.png"],
    description: "Successfully completed the prototype development of Hybrid Mobile Solar Power generation system for R&D(E), Dighi",
    abstract:
      "A mobile surveillance tower built on a rugged steel base, equipped with pan-tilt-zoom cameras, thermal imaging, and onboard power systems. Designed for forward operating bases.",
  },
  {
    title: "Portable Solar Cuboid System",
    soNumber: "Unit III/30452/19-20",
    group: "ESG",
    amount: "₹1,50,000",
    pdc: "26 Dec 2019",
    images: [
      "https://res.cloudinary.com/dxrryep5y/image/upload/v1753295738/website_static_media/portable.png",
      "https://res.cloudinary.com/dxrryep5y/image/upload/v1753295748/website_static_media/solar.png",
      "https://res.cloudinary.com/dxrryep5y/image/upload/v1753295663/website_static_media/cube.png",
      "https://res.cloudinary.com/dxrryep5y/image/upload/v1753295755/website_static_media/system.png",
    ],
    description: "Prototype development of Mobile Cubical Mini Power House",
    abstract:
      "A compact, powerful movable system was designed for easy assembly by just two people. It features a foldable Al 6061 square tube structure, 2 mm thick,with nine 250W semi-flexible polycrystalline solar panels, resulting in a 2.2 kWsystem. Controlled lifting and tilting are managed by gas struts, and allelectrical devices are housed in a 19-inch rack structure. Notably, the entireassembly can be unbolted and reassembled by two unskilled individuals.",
  },
  {
    title: "Supply of Third Arm Support Assembly",
    soNumber: "D5075/D5/ADS",
    group: "EMSG",
    amount: "₹2,26,800",
    pdc: "15 Feb 20",
    images: [
      "https://res.cloudinary.com/dxrryep5y/image/upload/v1753295635/website_static_media/arm.png",
    ],
    description: "Supply of Third Arm Support Assembly",
    abstract:
      "The universal third arm support system is designed to mount firearms, reducing fatigue for Army personnel patrolling the Indian border. It straps around the waist, allowing soldiers to rest their guns while remaining alert.The system supports a payload of 10 kg and sweighs only 2.5 kg.",
  },
  {
    title: "Electrically Actuated Payload Mount Scissor Type",
    soNumber: "N5087/D6/AVSG",
    group: "AvSG",
    amount: "₹49,100",
    pdc: "15 Mar 2021",
    images: ["https://res.cloudinary.com/dxrryep5y/image/upload/v1753295678/website_static_media/electric.png",],
    description: "Electrically actuated payload mount Scissor type",
    abstract:
      "Battery actuated scissoring mechanism for a mounted payload of 50kg was designed and developed for a height of 4ft.",
  },
  {
    title: "Supply of Miniature Mechanical Clutch Assembly",
    soNumber: "D5118/D6/ADS",
    group: "EMSG",
    amount: "₹2,38,140",
    pdc: "30 Apr 2021",
    description: "Supply of Miniature Mechanical Clutch Assembly",
    abstract:
      "The Miniature Clutch Assembly was developed to alleviate the load on the body during steep climbs. Utilizing a ratchet and pulley mechanism, this purely mechanical system has been successfully tested by soldiers, who reported comfortable usage. It is now widely adopted in the exoskeleton domain for military applications.",
  },
  {
    title: "Manufacturing, Integration, Testing & Supply of Multi-Axis Motion Platform",
    soNumber: " N0061/D6/ADS",
    group: "EMSG",
    amount: "₹22,00,000",
    pdc: "15 Mar 2022",
    images: ["https://res.cloudinary.com/dxrryep5y/image/upload/v1753295731/website_static_media/miniature.png",],
    description: "Supply of Miniature Mechanical Clutch Assembly",
    abstract:
      "The Miniature Clutch Assembly was designed to reduce the physical load on soldiers while climbing steep altitudes. Utilizing a ratchet and pulley mechanism, this purely mechanical system has undergone successful trials, with soldiers reporting comfortable usage. It is now widely implemented in the exoskeleton domain for military applications.",
  },
  {
    title: "Supply and Manufacturing of Planetary Gearbox",
    images: ["https://res.cloudinary.com/dxrryep5y/image/upload/v1753295735/website_static_media/planetary.png",],
    description: "Supply and Manufacturing of Planetary Gearbox",
    abstract:
      "The planetary gearbox was designed to control the opening and closing of fighter jet flaps for missile launching, completing the operation in just 3 seconds. This rapid action is crucial for stealth mode, minimizing the jets' exposure to enemy radar detection.",
  },

];

const Defence = () => {

  const [openIndex, setOpenIndex] = useState(null);
  const toggleIndex = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
    >
      {/* Hero Section */}
      <motion.section
        className="relative bg-gradient-to-r from-blue-800 via-blue-900 to-indigo-900 text-white overflow-hidden h-[500px]"
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        viewport={{ once: true }}
      >
        {/* Subtle Glow */}
        <div className="absolute inset-0">
          <div className="absolute w-96 h-96 bg-blue-500/30 rounded-full blur-3xl -top-20 -left-20"></div>
          <div className="absolute w-96 h-96 bg-indigo-500/20 rounded-full blur-3xl bottom-0 right-0"></div>
        </div>

        <div className="relative z-10 h-full flex flex-col items-center justify-center text-center px-4">
          <motion.h1
            className="text-4xl md:text-5xl font-bold mb-4"
            initial={{ y: 20, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            Engineering Precision for India’s Defence
          </motion.h1>
          <motion.p
            className="text-lg max-w-2xl text-gray-200"
            initial={{ y: 20, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            viewport={{ once: true }}
          >
            Proud partner in national defence innovation — delivering mechanical solutions for DRDO and mission-critical applications.
          </motion.p>
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <SLink
              to="/contact-us"
              className="mt-6 inline-block relative overflow-hidden rounded-lg font-semibold py-3 px-6 shadow-lg transition-all duration-300 group"
            >
              {/* Background Animation Layer */}
              <span className="absolute inset-0 bg-gradient-to-r from-blue-500 to-blue-700 translate-x-[-100%] group-hover:translate-x-0 transition-transform duration-500 ease-out"></span>

              {/* Button Text */}
              <span className="relative z-10 text-white">
                Partner with Us →
              </span>
            </SLink>
          </motion.div>
        </div>
      </motion.section>


      {/* Features */}
      <div className="bg-white text-black py-10">
        <div className="max-w-7xl mx-auto flex flex-wrap justify-center gap-10 text-center px-4">
          {features.map((item, index) => (
            <motion.div
              key={index}
              className="flex items-start gap-3 max-w-xs"
              whileHover={{ scale: 1.03, y: -3 }}
              transition={{ type: "spring", stiffness: 200, damping: 15 }}
            >
              <FaCheckCircle className="text-blue-500 mt-1" size={20} />
              <span className="text-lg leading-snug">{item}</span>
            </motion.div>
          ))}
        </div>
      </div>
      {/* Projects Section */}
      <div className="max-w-6xl mx-auto px-4 py-10">
        <h2 className="text-3xl font-bold mb-8 text-center text-blue-600">
          Projects Executed for DRDO
        </h2>

        {projects.map((project, index) => (
          <motion.div
            key={index}
            className="mb-6 border border-blue-300 rounded-lg shadow-md"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.05 }}
            viewport={{ once: true }}
          >
            <button
              className="w-full text-left p-4 bg-blue-100 hover:bg-blue-200"
              onClick={() => toggleIndex(index)}
            >
              <h3 className="text-xl font-semibold">
                {index + 1}. {project.title}
              </h3>
              <p className="text-sm text-blue-600">
                Click to {openIndex === index ? "collapse" : "expand"}
              </p>
            </button>

            {openIndex === index && (
              <motion.div
                className="p-4"
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                transition={{ duration: 0.4 }}
              >
                <div className="mb-4 text-sm">
                  <p><strong>S.O No:</strong> {project.soNumber}</p>
                  <p><strong>Group:</strong> {project.group}</p>
                  <p><strong>Amount:</strong> {project.amount}</p>
                  <p><strong>P.D.C:</strong> {project.pdc}</p>
                </div>

                {project.images?.length > 0 && (
                  project.images.length === 1 ? (
                    <div className="flex justify-center mt-4">
                      <img
                        src={project.images[0]}
                        alt={`Project ${index + 1}`}
                        className="w-[300px] h-auto rounded-lg transition-transform duration-300 ease-in-out transform hover:scale-105 hover:shadow-xl hover:brightness-110"
                      />
                    </div>
                  ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                      {project.images.map((img, imgIndex) => (
                        <img
                          key={imgIndex}
                          src={img}
                          alt={`Project ${index + 1} - Image ${imgIndex + 1}`}
                          className="w-full max-h-[280px] object-contain rounded-lg transition-transform duration-300 ease-in-out transform hover:scale-105 hover:shadow-xl hover:brightness-110"
                        />
                      ))}
                    </div>
                  )
                )}

                <div className="mt-4">
                  <p className="text-black">{project.description}</p>
                </div>

                <div className="mt-4">
                  <h4 className="font-semibold text-lg">Abstract:</h4>
                  <p className="text-gray-700">{project.abstract}</p>
                </div>
              </motion.div>
            )}
          </motion.div>
        ))}
      </div>
      <motion.div
        className="bg-blue-600 text-white py-24 text-center px-4"
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
      >
        <h1 className="text-4xl md:text-4xl font-bold mb-8">
          Precision. Performance. For Defence—Together.
        </h1>
        <SLink
          to="/get-quote"
          className="bg-white text-blue-600 font-semibold py-3 px-6 rounded-md hover:bg-gray-100 transition duration-300"
        >
          Get A Defence Quote Now
        </SLink>
      </motion.div>
      {/* Card Section */}
      <section className="max-w-screen-lg mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {cardData.map((card, index) => (
            <motion.div
              key={index}
              className="relative bg-white rounded-2xl shadow-md border border-transparent hover:border-blue-500 overflow-hidden transition-all duration-500 group"
              whileHover={{ y: -6, scale: 1.02 }}
              transition={{ type: "spring", stiffness: 220, damping: 18 }}
            >
              {/* Animated Border Lines */}
              <span className="absolute inset-0 border-2 border-transparent rounded-2xl group-hover:border-blue-500 transition-all duration-500"></span>
              <span className="absolute inset-0 rounded-2xl group-hover:shadow-[0_0_15px_rgba(37,99,235,0.5)] transition-all duration-500"></span>

              {/* Image */}
              <div className="flex justify-center items-center h-64 bg-white relative z-10">
                <img
                  src={card.image}
                  alt={card.title}
                  className="max-h-full max-w-full object-contain"
                />
              </div>

              {/* Text */}
              <div className="px-4 pb-4 relative z-10">
                <h3 className="text-lg font-semibold text-blue-700 mb-1">{card.title}</h3>
                <p className="text-gray-600">{card.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </section>
    </motion.div>
  );
};

export default Defence;
