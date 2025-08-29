import React from 'react';
import { SLink } from '@/components/SLink';
import { FaTractor, FaTools, FaSeedling, FaRobot } from 'react-icons/fa';

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

const AgriTechHeader = () => {
  return (
    <div>
      {/* Hero Section */}
      <section className="bg-white py-16 px-6 md:px-20">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 items-center gap-12">
          {/* Left Text Section */}
          <div className="pl-6">
            <h1 className="text-4xl md:text-5xl font-bold text-blue-700 mb-6">
              GREEN AGRI
            </h1>
            <h2 className="text-2xl font-semibold text-blue-700 mb-4">
              Advancing Agriculture with Engineering
            </h2>
            <p className="text-gray-600 text-lg mb-6">
              Bringing mechanical innovation to the fields — from automated
              machinery to precision farming tools.
            </p>
            <button className="bg-teal-600 text-white px-6 py-3 rounded-xl hover:bg-teal-700 transition">
              Get Started
            </button>
          </div>

          {/* Image Section */}
          <div className="pr-6">
            <img
              src="https://res.cloudinary.com/dxrryep5y/image/upload/v1753295655/website_static_media/clean.jpg"
              alt="Innovative Agricultural Technology"
              className="w-auto h-auto rounded-2xl shadow-xl"
            />
          </div>
        </div>
      </section>

      {/* Focus Areas */}
      <section className="bg-gray-50 py-16 px-6 md:px-20">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-blue-700 mb-12">
            Our Agri-Tech Focus Areas
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div
                key={index}
                className="bg-white p-6 rounded-2xl shadow hover:shadow-lg transition flex flex-col items-center text-center"
              >
                <div>{feature.icon}</div>
                <h3 className="text-xl font-semibold text-gray-800 my-2">
                  {feature.title}
                </h3>
                <p className="text-gray-600 text-sm">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CleanTech Sourcing */}
      <section className="bg-gray-50 py-16 px-6 md:px-20">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center gap-12">
          {/* Text */}
          <div className="md:w-1/2 text-center md:text-left">
            <h2 className="text-3xl md:text-4xl font-bold text-blue-700 mb-4">
              Simplified Sourcing for the CleanTech Industry
            </h2>
            <p className="text-gray-600 text-lg">
              We make it easier for CleanTech innovators to source custom
              parts, energy-efficient components, and eco-friendly materials —
              all through one streamlined platform.
            </p>
          </div>

          {/* Image */}
          <div className="md:w-1/2 flex justify-center">
            <img
              src="https://res.cloudinary.com/dxrryep5y/image/upload/v1753295656/website_static_media/clean1.jpg"
              alt="CleanTech Industry Solutions"
              className="w-auto h-96 rounded-2xl shadow-xl"
            />
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="bg-blue-500 py-16 px-6 md:px-20 text-white">
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
      </section>

      {/* Footer */}
      <section className="bg-white py-10 px-6 md:px-20 border-t">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 text-center md:text-left text-gray-700">
          {/* Contact Info */}
          <div>
            <h3 className="text-xl font-bold text-blue-700 mb-4">
              Contact Us
            </h3>
            <p>Email: projects@accudesign.in</p>
            <p>Phone: +91 98765 43210</p>
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
    </div>
  );
};

export default AgriTechHeader;
