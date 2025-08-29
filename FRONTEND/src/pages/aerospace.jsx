import React, { useState } from 'react';
import { SLink } from '@/components/SLink';
import {
  FaGlobe,
  FaSatelliteDish,
  FaShieldAlt,
  FaSatellite,
  FaSpaceShuttle,
  FaIndustry,
} from 'react-icons/fa';

// Services
const services = [
  {
    icon: <FaGlobe className="text-blue-600 text-6xl mb-6" />,
    title: "Massive Network Capacity",
    description:
      "Instantly access the production capacity of over 10,000 manufacturers with wide-ranging capabilities and certifications across 46 states and around the world. From your desktop. Strict NDA agreements with our network protect your privacy.",
  },
  {
    icon: <FaSatelliteDish className="text-blue-600 text-6xl mb-6" />,
    title: "Instant Quoting Engine",
    description:
      "Get DFM feedback, lead times, and pricing in a matter of clicks, not days. Our platform puts Data Science to work so you can easily choose the optimal price/lead time option for your project. Compatible with STEP, Mesh, Parasolid, and ACIS files.",
  },
  {
    icon: <FaShieldAlt className="text-blue-600 text-6xl mb-6" />,
    title: "Quality Assurance",
    description:
      "We are certified to ISO 9001:2015, ISO 13485, IATF 16949:2016, CMMC Level 2, and AS9100D. We are ITAR registered and offer CoCs, material certifications, full dimensional reports, inspection reports, and hardware certs.",
  },
];

// Industries
const industries = [
  {
    icon: <FaSatellite className="text-blue-600 text-5xl mb-4" />,
    title: "Satellite Systems",
    description:
      "Advanced satellite components and complete system integration for communication, navigation, and observation.",
  },
  {
    icon: <FaSpaceShuttle className="text-blue-600 text-5xl mb-4" />,
    title: "Space Exploration",
    description:
      "Design and manufacturing of parts for spacecrafts, launch vehicles, and planetary probes.",
  },
  {
    icon: <FaShieldAlt className="text-blue-600 text-5xl mb-4" />,
    title: "Defense & Security",
    description:
      "Critical aerospace solutions for national defense and security applications with certified quality.",
  },
  {
    icon: <FaIndustry className="text-blue-600 text-5xl mb-4" />,
    title: "Advanced Manufacturing",
    description:
      "Innovative fabrication processes and materials for the next generation of aerospace components.",
  },
];

const Aerospace = () => {
  const [showMore, setShowMore] = useState(false);

  return (
    <div>
      {/* Hero Section */}
      <section className="w-full relative overflow-hidden bg-gradient-to-br from-black via-gray-900 to-blue-900 text-white">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(59,130,246,0.3),_transparent_70%)]"></div>

        <div className="relative z-10 max-w-7xl mx-auto px-6 py-20 flex flex-col-reverse md:flex-row items-center gap-10">
          {/* Left Text */}
          <div className="flex-1 text-center md:text-left">
            <h1 className="text-4xl md:text-6xl font-extrabold leading-tight">
              Shaping the <span className="text-blue-300">Future of Aerospace</span>
            </h1>
            <p className="mt-6 text-lg md:text-xl text-blue-100">
              Innovative solutions for flight, space exploration, and beyond — engineering excellence that reaches new heights.
            </p>
            <div className="mt-8 flex justify-center md:justify-start gap-4">
              <SLink to="/contact-us">
                <button className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-xl shadow-md">
                  Get Started
                </button>
              </SLink>
              <SLink to="/AerospaceLearnMore">
                <button className="border border-white text-white px-6 py-3 rounded-xl shadow-md hover:bg-white hover:text-blue-800">
                  Learn More
                </button>
              </SLink>
            </div>
          </div>

          {/* Right Image */}
          <div className="flex-1 flex justify-center md:justify-end">
            <img
              src="https://res.cloudinary.com/dxrryep5y/image/upload/v1753295768/website_static_media/web_aero.png"
              alt="Aerospace"
              className="w-80 md:w-[28rem] rounded-2xl shadow-xl"
            />
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="w-full bg-white py-20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid gap-10 grid-cols-1 md:grid-cols-3 text-center">
            {services.map((service, index) => (
              <div key={index} className="flex flex-col items-center">
                {service.icon}
                <h3 className="text-lg font-bold text-gray-800">{service.title}</h3>
                <p className="mt-3 text-sm text-gray-600">{service.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* About Us Section */}
      <section className="w-full bg-white py-20">
        <div className="max-w-6xl mx-auto px-6 flex flex-col md:flex-row gap-10 items-center">
          {/* Left Image */}
          <div className="flex-1 flex justify-start">
            <img
              src="https://res.cloudinary.com/dxrryep5y/image/upload/v1753295623/website_static_media/aero.png"
              alt="About Us"
              className="rounded-2xl shadow-lg"
            />
          </div>

          {/* Right Text */}
          <div className="flex-1">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
              About <span className="text-blue-600">Us</span>
            </h2>
            <p className="text-gray-600 text-lg mb-4 text-justify">
              We are a team of passionate aerospace engineers, designers, and innovators dedicated to advancing flight and space technology. With decades of combined experience, we bring precision, innovation, and excellence to every project.
            </p>
            {showMore && (
              <p className="text-gray-600 text-lg mb-4 transition-all duration-300 text-justify">
                From concept design to manufacturing and testing, our mission is to deliver high-quality aerospace solutions that meet the toughest standards of performance and reliability. Our global network and cutting-edge facilities ensure that we can tackle the most challenging projects with confidence and precision.
              </p>
            )}
            <button
              onClick={() => setShowMore(!showMore)}
              className="mt-4 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl shadow"
            >
              {showMore ? "Show Less" : "Learn More"}
            </button>
          </div>
        </div>
      </section>

      {/* Industries Section */}
      <section className="w-full bg-gray-50 py-20">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-12">
            Industries We <span className="text-blue-600">Serve</span>
          </h2>
          <div className="grid gap-10 grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
            {industries.map((industry, index) => (
              <div
                key={index}
                className="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition"
              >
                {industry.icon}
                <h3 className="text-xl font-semibold text-gray-800 mb-2">{industry.title}</h3>
                <p className="text-gray-600 text-sm">{industry.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="w-full bg-gradient-to-r from-blue-800 to-blue-600 py-16 text-white mb-8 md:mb-16 lg:mb-20">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Ready to Take Your Aerospace Project Higher?
          </h2>
          <p className="text-lg md:text-xl mb-8 text-blue-100">
            Get an instant quote today and partner with us to bring your vision to life with precision, quality, and innovation.
          </p>
          <SLink
            to="/contact"
            className="inline-block bg-white text-blue-800 font-semibold px-8 py-4 rounded-xl shadow hover:bg-blue-100 transition"
          >
            Get an Instant Quote
          </SLink>
        </div>
      </section>
    </div>
  );
};

export default Aerospace;
