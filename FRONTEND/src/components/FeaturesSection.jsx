import React, { useState, useRef } from 'react';
import {
  MdCurrencyRupee,
  MdVerified,
  MdEngineering
} from 'react-icons/md';

const FeaturesSection = () => {
  const cardRefs = useRef([]);

  const handleMouseMove = (index) => (e) => {
    const card = cardRefs.current[index];
    if (!card) return;

    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotateX = (y - centerY) / 10;
    const rotateY = -(x - centerX) / 10;

    card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.02)`;
    card.style.boxShadow = '0 20px 40px rgba(0,0,0,0.2)';
  };

  const handleMouseLeave = (index) => () => {
    const card = cardRefs.current[index];
    if (!card) return;

    card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale(1)';
    card.style.boxShadow = '0 10px 20px rgba(0,0,0,0.1)';
  };

  const features = [
    {
      icon:<MdCurrencyRupee size={48} />,
      title: "BEST PRICES",
      description: "We offer a full range of manufacturing solutions at competitive rates.",
      points: [
        "Transparent and flexible pricing",
        "Bulk order discounts available",
        "No hidden charges or surprise fees"
      ]
    },
    {
      icon: <MdVerified size={48} />,
      title: "100% GUARANTEE",
      description: "We stand by our quality with a 100% satisfaction guarantee.",
      points: [
        "Strict quality control at every step",
        "Rework assurance if standards aren't met",
        "Reliability backed by years of trust"
      ]
    },
    {
      icon: <MdEngineering size={48} />,
      title: "CERTIFIED MECHANICS",
      description: "Our technicians are trained, certified, and highly experienced.",
      points: [
        "ISO-certified professionals",
        "Continuous upskilling & training",
        "Experts in precision tools & methods"
      ]
    }
  ];

  return (
    <section className="relative w-full py-16 px-4 mt-10 bg-[#f1f8ff] overflow-hidden">
      {/* Background Shapes */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none z-0 overflow-hidden">
        <div className="absolute w-40 h-40 bg-blue-200 rounded-full top-10 left-5 opacity-30 blur-2xl animate-pulse"></div>
        <div className="absolute w-24 h-24 bg-blue-100 rounded-full bottom-10 right-10 opacity-40 blur-md animate-pulse"></div>
        <div className="absolute w-72 h-72 bg-blue-100 rounded-[60%] top-1/3 right-1/4 opacity-20 blur-3xl rotate-6"></div>
      </div>

      {/* Cards */}
      <div className="relative z-10 max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
        {features.map((item, index) => (
          <div
            key={index}
            ref={(el) => cardRefs.current[index] = el}
            onMouseMove={handleMouseMove(index)}
            onMouseLeave={handleMouseLeave(index)}
            className="group relative transition-all duration-150 ease-in-out bg-white min-h-[280px] group-hover:min-h-[320px]
              rounded-2xl shadow-lg hover:shadow-2xl transform-gpu origin-center will-change-transform max-w-[320px] w-full 
              mx-auto flex flex-col items-center overflow-hidden hover:bg-black"
          >
            {/* Glow BG */}
            <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-blue-200/10 opacity-0 group-hover:opacity-100 transition-opacity duration-200 rounded-2xl" />

            {/* Icon */}
            <div className="relative z-10 mt-1.5 mb-2 transition-transform duration-150 group-hover:-translate-x-2 group-hover:scale-125">
              <div className="absolute -inset-3 bg-blue-500/30 rounded-full blur-lg animate-pulse opacity-0 group-hover:opacity-100 transition-opacity" />
              <div className="text-blue-600 group-hover:text-blue-400 group-hover:drop-shadow-[0_0_8px_#3b82f6] transition duration-150 relative z-20">
                {item.icon}
              </div>
            </div>

            {/* Title */}
            <h3 className="font-bold text-lg mb-2 text-blue-900 group-hover:text-blue-300 group-hover:drop-shadow-[0_0_6px_#60a5fa] transition-transform duration-150 relative z-20 group-hover:translate-x-2 group-hover:scale-105">
              {item.title}
            </h3>

            {/* Description */}
            <p className="text-sm text-gray-700 group-hover:text-blue-100 group-hover:drop-shadow-[0_0_4px_#3b82f6] mb-3 transition-transform duration-150 relative z-20 group-hover:translate-x-2">
              {item.description}
            </p>

            {/* Points */}
            <ul className="text-sm space-y-1 text-left transition-transform duration-150 relative z-20 group-hover:translate-x-2">
              {item.points.map((point, i) => (
                <li key={i} className="text-gray-600 group-hover:text-blue-200 group-hover:drop-shadow-[0_0_4px_#60a5fa] transition duration-150">
                  • {point}
                </li>
              ))}
            </ul>

            {/* Explore Button */}
            <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-200 mt-4 z-20">
              <button className="px-4 py-2 text-sm text-blue-500 border border-blue-500 rounded-md hover:bg-blue-500 hover:text-white transition duration-150">
                Explore More →
              </button>
            </div>

            {/* Border */}
            <div className="absolute inset-0 border-2 border-blue-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl pointer-events-none"></div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default FeaturesSection;
