import React from 'react';
import { SLink } from '@/components/SLink';
import { FaCheckCircle } from 'react-icons/fa';

const features = [
  "Custom metal fabrication for all industries",
  "Welding, cutting, forming, and assembly expertise",
  "ISO 9001:2015 certified processes & inspections",
  "Prototypes to full-scale production",
  "Collaborative engineering support at every stage",
];

const processes = [
  {
    title: "Sheet Metal Fabrication",
    description:
      "Precision cutting, bending, and forming of sheet metal for enclosures, panels, and more.",
    image: "/images/sheet-metal-fabrication.jpg",
  },
  {
    title: "Welding & Assembly",
    description:
      "Expert welding and final assembly for durable, high-strength components.",
    image: "/images/welding-assembly.jpg",
  },
  {
    title: "Custom Structures",
    description:
      "Large and small custom structures fabricated to exact specifications.",
    image: "/images/custom-structures.jpg",
  },
];

const FabricationServices = () => {
  return (
    <div>
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-blue-900 via-blue-800 to-blue-700 text-white">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-blue-800/40 via-blue-900/60 to-black opacity-50" />
        <div className="relative z-10 max-w-7xl mx-auto px-6 py-28 text-center">
          <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight bg-gradient-to-r from-cyan-400 to-blue-300 bg-clip-text text-transparent animate-pulse">
            Custom Metal Fabrication Services
          </h1>
          <p className="mt-6 text-lg md:text-xl max-w-3xl mx-auto text-blue-100">
            At <span className="font-semibold text-cyan-300">ACCU DESIGN</span>, we bring your DESIGNs to life with precision metal fabrication that meets your timeline and quality expectations.
          </p>
          <div className="mt-8">
            <SLink
              to="/get-quote"
              className="bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-white font-semibold py-3 px-8 rounded-full shadow-lg transition transform hover:scale-105 inline-block"
            >
              Get a Fabrication Quote →
            </SLink>
          </div>
        </div>
        <div className="absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-blue-900 to-transparent opacity-50 blur-md" />
      </section>

      {/* Features */}
      <section className="bg-gray-50 py-12">
        <h2 className="text-3xl font-bold text-center mb-8">
          Why Choose ACCU DESIGN for Fabrication?
        </h2>
        <div className="max-w-6xl mx-auto flex flex-wrap justify-center gap-6 px-4">
          {features.map((feature, idx) => (
            <div key={idx} className="flex items-start gap-3 max-w-xs">
              <FaCheckCircle className="text-blue-500 mt-1" />
              <span className="text-gray-800">{feature}</span>
            </div>
          ))}
        </div>
      </section>

      {/* Processes */}
      <section className="py-12 px-4">
        <h2 className="text-3xl font-bold text-center mb-8">
          Our Fabrication Capabilities
        </h2>
        <div className="grid gap-6 md:grid-cols-3 max-w-7xl mx-auto">
          {processes.map((process, idx) => (
            <div
              key={idx}
              className="bg-white shadow rounded overflow-hidden"
            >
              <img
                src={process.image}
                alt={process.title}
                className="h-48 w-full object-cover"
              />
              <div className="p-4">
                <h3 className="text-xl font-semibold mb-2">{process.title}</h3>
                <p className="text-gray-600">{process.description}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Call to Action */}
      <section className="bg-blue-600 text-white text-center py-16">
        <h2 className="text-3xl md:text-4xl font-bold mb-4">
          Let’s Build Something Exceptional Together
        </h2>
        <p className="mb-6 text-lg">
          Contact Accu DESIGN today for high-quality and cost-effective fabrication services.
        </p>
        <SLink
          to="/contact-us"
          className="inline-block bg-white text-blue-700 font-medium py-3 px-6 rounded shadow hover:bg-gray-100"
        >
          Request a Consultation →
        </SLink>
      </section>

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
    </div>
  );
};

export default FabricationServices;
