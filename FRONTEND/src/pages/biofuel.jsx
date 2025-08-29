import React, { useState } from 'react';
import { FaChevronDown, FaLeaf } from 'react-icons/fa';
import { SLink } from '@/components/SLink';

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
    <div>
      {/* HERO */}
      <section className="relative w-full bg-gradient-to-r from-gray-900 to-gray-800 text-white">
        <div className="w-full max-w-screen-xl mx-auto px-4 md:px-6 py-20 flex flex-col-reverse lg:flex-row items-center gap-8">
          <div className="flex-1">
            <h1 className="text-4xl md:text-5xl font-bold leading-tight mb-6">
              Power the Future with <span className="text-green-500">Bio-Fuel</span> Energy
            </h1>
            <p className="text-lg mb-6 max-w-xl">
              Clean, renewable energy solutions engineered for sustainability and efficiency. Explore our innovations driving the next generation of fuel.
            </p>
            <div className="flex gap-4">
              <button className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg shadow-md">
                Get Started
              </button>
              <button className="border border-white text-white hover:bg-white hover:text-gray-900 px-6 py-3 rounded-lg">
                Learn More
              </button>
            </div>
          </div>
          <div className="flex-1 flex justify-center lg:justify-end">
            <img
              src="https://res.cloudinary.com/dxrryep5y/image/upload/v1753339729/website_static_media/Green.jpg"
              alt="Bio-Fuel Energy"
              className="w-full max-w-md rounded-xl shadow-lg"
            />
          </div>
        </div>

        <div className="absolute top-4 left-4 text-6xl text-green-600 opacity-10">
          <FaLeaf />
        </div>
      </section>

      {/* WHY CHOOSE US */}
      <section className="py-16 bg-gray-100">
        <div className="max-w-screen-xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-8">Why Choose Us</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="p-6 bg-white shadow rounded">
              <h3 className="text-xl font-semibold mb-2">Sustainable Technology</h3>
              <p>We lead with renewable energy innovations for a greener tomorrow.</p>
            </div>
            <div className="p-6 bg-white shadow rounded">
              <h3 className="text-xl font-semibold mb-2">Cost-Effective Solutions</h3>
              <p>Our biofuels save costs while reducing your environmental footprint.</p>
            </div>
            <div className="p-6 bg-white shadow rounded">
              <h3 className="text-xl font-semibold mb-2">Proven Expertise</h3>
              <p>Years of experience delivering reliable biofuel systems and services.</p>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-16 bg-gray-100">
        <div className="max-w-screen-md mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-8">Frequently Asked Questions</h2>
          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <div key={index} className="bg-white shadow rounded">
                <button
                  onClick={() => toggleFAQ(index)}
                  className="w-full flex justify-between items-center px-4 py-3 text-left text-lg font-medium focus:outline-none"
                >
                  {faq.question}
                  <FaChevronDown
                    className={`text-green-600 transform transition-transform duration-300 ${openIndex === index ? "rotate-180" : ""
                      }`}
                  />
                </button>
                {openIndex === index && (
                  <div className="px-4 py-2 text-gray-700">{faq.answer}</div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* GET QUOTE */}
      <SLink to="/get-quote">
        <section className="bg-blue-500 text-white py-16 mb-12 cursor-pointer">
          <div className="max-w-screen-xl mx-auto px-4 text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Ready to Switch to Clean Energy?
            </h2>
            <p className="text-lg mb-6">
              Get an instant quote or talk to our experts about bio-fuel solutions.
            </p>
            <button className="bg-white text-black hover:bg-blue-100 px-8 py-3 rounded-lg font-semibold shadow-md">
              Get Instant Quote
            </button>
          </div>
        </section>
      </SLink>

      {/* TIMELINE */}
      <section className="max-w-7xl mx-auto px-6 py-20">
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
              <div
                key={phase.name}
                className="flex flex-col items-center group cursor-pointer"
                onClick={() => setSelected(phase.name)}
              >
                <div
                  className={`w-6 h-6 rounded-full border-4 transition-all ${selected === phase.name
                      ? "bg-green-600 border-green-100"
                      : "bg-white border-gray-300 group-hover:border-green-400"
                    }`}
                />
                <span
                  className={`mt-2 text-xs font-semibold text-center ${selected === phase.name
                      ? "text-green-600"
                      : "text-gray-500 group-hover:text-green-500"
                    }`}
                >
                  {phase.name}
                </span>
              </div>
            ))}
          </div>

          {/* Content */}
          <div className="md:w-4/5 space-y-6">
            <div className="w-full h-[400px] flex items-center justify-center">
              <img
                src={currentPhase.image}
                alt={currentPhase.title}
                className="max-h-full max-w-full object-contain rounded-lg shadow-md"
              />
            </div>
            <h3 className="text-2xl font-bold">{currentPhase.title}</h3>
            <p className="text-gray-600 text-justify">{currentPhase.description}</p>
          </div>
        </div>
      </section>
    </div>
  )
}

export default biofuel