import React, { useState } from "react";
import { FaCheckCircle } from "react-icons/fa";
import { SLink } from '@/components/SLink';
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
    pdc: "30 Apr 2019",
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
      "A compact, powerful movable system was designed for easy assembly by just two people. It features a foldable Al 6061 square tube structure, 2 mm thick,with nine 250W semi-flexible polycrystalline solar panels, resulting in a 2.2 kWsystem. Controlled lifting and tilting are managed by gas struts, and allelectrical devices are housed in a 19-inch rack structure. Notably, the entireassembly can be unbolted and reassembled by two unskilled individuals.",
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
      "The Miniature Clutch Assembly was developed to alleviate the load on the body during steep climbs. Utilizing a ratchet and pulley mechanism, this purely mechanical system has been successfully tested by soldiers, who reported comfortable usage. It is now widely adopted in the exoskeleton domain for military applications.",
  },
  {
    title: "Manufacturing, Integration, Testing & Supply of Multi-Axis Motion Platform",
    soNumber: " N0061/D6/ADS",
    group: "EMSG",
    amount: "₹22,00,000",
    pdc: "15 Mar 2022",
    images: ["https://res.cloudinary.com/dxrryep5y/image/upload/v1753295731/website_static_media/miniature.png",],
    description: "Supply of Miniature Mechanical Clutch Assembly",
    abstract:
      "The Miniature Clutch Assembly was designed to reduce the physical load on soldiers while climbing steep altitudes. Utilizing a ratchet and pulley mechanism, this purely mechanical system has undergone successful trials, with soldiers reporting comfortable usage. It is now widely implemented in the exoskeleton domain for military applications.",
  },
   {
    title: "Supply and Manufacturing of Planetary Gearbox",
    images: ["https://res.cloudinary.com/dxrryep5y/image/upload/v1753295735/website_static_media/planetary.png",],
    description: "Supply and Manufacturing of Planetary Gearbox",
    abstract:
      "The planetary gearbox was designed to control the opening and closing of fighter jet flaps for missile launching, completing the operation in just 3 seconds. This rapid action is crucial for stealth mode, minimizing the jets' exposure to enemy radar detection.",
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
    name: "High Shear Powder/Liquid Mixing",
    title: "High Shear Mixer takes a revolutionary approach to powder/liquid mixing.",
    description:
      "The High Shear Mixer (HSM25) efficiently disperses powders into liquids, using a 5.5 kW motor and achieving a flow rate of 3.785 liters per minute. It handles up to 25 kg/h of gums, 90 kg/h of milk proteins, and 40 kg/h.",
    image: "https://res.cloudinary.com/dxrryep5y/image/upload/v1753295693/website_static_media/high_Shear.png",
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

const Defence = () => {
  const [selected, setSelected] = useState(phases[0].name);
  const [openIndex, setOpenIndex] = useState(null);
  const currentPhase = phases.find((p) => p.name === selected);

  const toggleIndex = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div>
      {/* Hero Section */}
      <section
        className="relative bg-black text-white overflow-hidden h-[500px] bg-cover bg-center"
        style={{ backgroundImage: "url('/accuimages/welcome-img.png')" }}
      >
        <div className="absolute inset-0 bg-black opacity-60" />
        <div className="relative z-10 h-full flex flex-col items-center justify-center text-center px-4">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Engineering Precision for India’s Defence
          </h1>
          <p className="text-lg max-w-2xl text-gray-200">
            Proud partner in national defence innovation — delivering mechanical solutions for DRDO and mission-critical applications.
          </p>
          <SLink
            to="/contact-us"
            className="mt-6 inline-block bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg shadow-md transition"
          >
            Partner with Us →
          </SLink>
        </div>
      </section>

      {/* Features */}
      <div className="bg-white text-black py-10">
        <div className="max-w-7xl mx-auto flex flex-wrap justify-center gap-10 text-center px-4">
          {features.map((item, index) => (
            <div key={index} className="flex items-start gap-3 max-w-xs">
              <FaCheckCircle className="text-blue-500 mt-1" size={20} />
              <span className="text-lg leading-snug">{item}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Timeline Section */}
      <div className="max-w-7xl mx-auto px-6 py-20">
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
              <div
                key={phase.name}
                className="flex flex-col items-center group cursor-pointer"
                onClick={() => setSelected(phase.name)}
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
              </div>
            ))}
          </div>

          {/* Timeline Content */}
          <div className="md:w-4/5 space-y-6">
            <div className="w-full h-[400px] flex items-center justify-center">
              <img
                src={currentPhase.image}
                alt={currentPhase.title}
                className="max-h-full max-w-full object-contain rounded-lg shadow-md transition-transform duration-300 ease-in-out hover:scale-105 hover:shadow-xl"
              />
            </div>
            <h3 className="text-2xl font-bold">{currentPhase.title}</h3>
            <p className="text-gray-600">{currentPhase.description}</p>
          </div>
        </div>
      </div>

      {/* Projects Section */}
      <div className="max-w-6xl mx-auto px-4 py-10">
        <h2 className="text-3xl font-bold mb-8 text-center text-blue-600">
          Projects Executed for DRDO
        </h2>

        {projects.map((project, index) => (
          <div key={index} className="mb-6 border border-blue-300 rounded-lg shadow-md">
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
              <div className="p-4">
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
              </div>
            )}
          </div>
        ))}
      </div>
      <div className="bg-blue-600 text-white py-24 text-center px-4">
              <h1 className="text-4xl md:text-4xl font-bold mb-8">
                Precision. Performance. For Defence—Together.
              </h1>
              <SLink
                to="/get-quote"
                className="bg-white text-blue-600 font-semibold py-3 px-6 rounded-md hover:bg-gray-100 transition duration-300"
              >
                Get A Defence Quote Now
              </SLink>
            </div>
             {/* Card Section */}
      <section className="max-w-screen-lg mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {cardData.map((card, index) => (
            <div
              key={index}
              className="bg-white rounded-2xl shadow-md border hover:shadow-lg transition"
            >
              <div className="flex justify-center items-center h-64 bg-white">
                <img
                  src={card.image}
                  alt={card.title}
                  className="max-h-full max-w-full object-contain"
                />
              </div>
              <div className="px-4 pb-4">
                <h3 className="text-lg font-semibold text-blue-700 mb-1">{card.title}</h3>
                <p className="text-gray-600">{card.description}</p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Defence;
