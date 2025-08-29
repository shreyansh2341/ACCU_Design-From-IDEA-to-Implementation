import React, { useState } from 'react';
import { FaChevronDown, FaSolarPanel } from 'react-icons/fa';
import { SLink } from '@/components/SLink';

const faqs = [
  {
    question: "What types of solar systems do you offer?",
    answer:
      "We offer rooftop solar, ground-mounted solar systems, and off-grid solar solutions for residential, commercial, and industrial needs.",
  },
  {
    question: "Do you provide battery backup solutions?",
    answer:
      "Yes, we provide advanced lithium-ion and other battery storage systems to ensure uninterrupted power supply.",
  },
  {
    question: "Do you assist with government subsidies?",
    answer:
      "Absolutely! We help you navigate through the available government incentives and subsidies for solar installations.",
  },
  {
    question: "Can I monitor my system performance?",
    answer:
      "Yes, our systems come with smart monitoring tools so you can track energy production and usage in real-time.",
  },
];

const phases = [
  {
    name: "Rooftop Solar",
    title: "Efficient Rooftop Solar Systems",
    description:
      "Our rooftop solar solutions maximize your roof’s potential, providing clean energy directly to your home or business while lowering utility costs.",
    image: "https://res.cloudinary.com/dxrryep5y/image/upload/v1753339755/website_static_media/rooftop.png",
  },
  {
    name: "Ground Mounted Solar",
    title: "Scalable Ground-Mounted Solar Plants",
    description:
      "Ideal for large-scale installations, our ground-mounted solar systems are designed for optimal sunlight capture and high efficiency.",
    image: "https://res.cloudinary.com/dxrryep5y/image/upload/v1753339731/website_static_media/ground-solar.jpg",
  },
  {
    name: "Battery Storage",
    title: "Advanced Battery Energy Storage",
    description:
      "Our cutting-edge battery storage systems ensure you always have power when you need it, even during outages or at night.",
    image: "https://res.cloudinary.com/dxrryep5y/image/upload/v1753339732/website_static_media/ground-solar1.jpg",
  },
  {
    name: "Hybrid Systems",
    title: "Hybrid Solar + Battery Systems",
    description:
      "Combine solar and storage with hybrid systems to achieve maximum energy independence and cost savings.",
    image: "https://res.cloudinary.com/dxrryep5y/image/upload/v1753339737/website_static_media/hybrid-system.png",
  },
];

const SolarBattery = () => {
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
              Power the Future with <span className="text-green-500">Solar & Storage</span>
            </h1>
            <p className="text-lg mb-6 max-w-xl">
              Clean, renewable solar energy paired with advanced battery storage. Explore our solutions for a more resilient, sustainable future.
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
              src="https://res.cloudinary.com/dxrryep5y/image/upload/v1753339757/website_static_media/Solar_Storage.jpg"
              alt="Solar and Storage"
              className="w-full max-w-md rounded-xl shadow-lg"
            />
          </div>
        </div>

        <div className="absolute top-4 left-4 text-6xl text-green-600 opacity-10">
          <FaSolarPanel />
        </div>
      </section>

      {/* WHY CHOOSE US */}
      <section className="py-16 bg-gray-100">
        <div className="max-w-screen-xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-8">Why Choose Us</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="p-6 bg-white shadow rounded">
              <h3 className="text-xl font-semibold mb-2">Sustainable Technology</h3>
              <p>We bring you renewable energy solutions for a cleaner tomorrow.</p>
            </div>
            <div className="p-6 bg-white shadow rounded">
              <h3 className="text-xl font-semibold mb-2">Reliable Storage</h3>
              <p>Our battery systems keep you powered through the night and outages.</p>
            </div>
            <div className="p-6 bg-white shadow rounded">
              <h3 className="text-xl font-semibold mb-2">Proven Expertise</h3>
              <p>Years of experience delivering trusted solar & storage solutions.</p>
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
                    className={`text-green-600 transform transition-transform duration-300 ${
                      openIndex === index ? "rotate-180" : ""
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
        <section className="bg-green-600 text-white py-16 mb-12 cursor-pointer">
          <div className="max-w-screen-xl mx-auto px-4 text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Ready to Go Solar?
            </h2>
            <p className="text-lg mb-6">
              Get an instant quote or speak with our experts about solar & storage.
            </p>
            <button className="bg-white text-green-600 hover:bg-gray-100 px-8 py-3 rounded-lg font-semibold shadow-md">
              Get Instant Quote
            </button>
          </div>
        </section>
      </SLink>

      {/* TIMELINE */}
      <section className="max-w-7xl mx-auto px-6 py-20">
        <h2 className="text-3xl md:text-4xl font-semibold text-center mb-4">
          Our Solar & Storage Systems
        </h2>
        <p className="text-center text-gray-500 mb-12 max-w-2xl mx-auto text-justify">
          Supporting homes and businesses with reliable, renewable power solutions.
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
  );
};

export default SolarBattery;
