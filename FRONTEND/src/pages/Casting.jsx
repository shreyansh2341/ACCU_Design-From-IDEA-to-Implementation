import React from 'react';
import { SLink } from '@/components/SLink';

const CastingPage = () => {
  return (
    <div className="w-full overflow-x-hidden">
      {/* Header Section */}
      <section className="w-full h-[46vh] bg-[url('https://res.cloudinary.com/dxrryep5y/image/upload/v1753295798/website_static_media/casting2.png')] bg-cover bg-center bg-black bg-opacity-70 bg-blend-darken flex items-center justify-center">
        <div className="text-white text-center text-2xl md:text-4xl font-semibold">
          Casting
        </div>
      </section>
      {/* Main Container */}
      <div className="w-full flex flex-col-reverse md:flex-row justify-evenly flex-wrap mt-5 px-4">
        {/* Left Side */}
        <div className="w-full md:w-[40%] p-5 flex flex-col items-center">
          {/* Buttons */}
          <div className="flex flex-col gap-3 mb-5 w-full max-w-xs md:max-w-[20vw]">
            {[
              { name: "Machining", path: "/machining" },
              { name: "Laser Cutting", path: "/laser-cutting" },
              { name: "Fabrication", path: "/fabrication" },
              { name: "3D Printing", path: "/3d-printing" },
              // { name: "Casting", path: "/casting" },
              { name: "Gear Manufacturing", path: "/gear" },
              { name: "Bending", path: "/bending" },
              { name: "Wire Cutting", path: "/cutting" },
            ].map((btn, index) => (
              <SLink to={btn.path} key={index}>
                <button className="px-4 py-2 w-full bg-blue-600 text-white rounded-md hover:bg-[#f3f7fa] hover:text-[#b36500] hover:font-medium hover:text-lg border border-transparent hover:border-[#b36500] transition-all duration-300">
                  {btn.name}
                </button>
              </SLink>
            ))}
          </div>

          {/* Left Image */}
          <SLink to="/contact-us">
            <img
              src="https://res.cloudinary.com/dxrryep5y/image/upload/v1753295826/website_static_media/Group_48095677_1.png"
              alt="Left Side"
              className="w-full max-w-sm md:max-w-[20vw] rounded shadow-lg transition duration-300 hover:translate-y-[-2px] hover:shadow-2xl object-contain"
            />
          </SLink>
        </div>

        {/* Right Side */}
        <div className="w-full md:w-[55%] p-5 flex flex-col items-start">
          <img
            src=" https://res.cloudinary.com/dxrryep5y/image/upload/v1753295794/website_static_media/casting.png"
            alt="Casting"
            className="w-full max-w-md mb-5 transition duration-300 transform hover:scale-110 hover:rotate-2 hover:grayscale-[1%] hover:shadow-[0_0_10px_#b87333] object-contain"
          />
          <h2 className="text-2xl font-bold ml-2 mb-2">Casting</h2>
          <p className="text-justify mb-4 ml-3 text-lg">
            Our Casting Solutions provide durable, precise, and cost-effective components — reducing material waste and supporting sustainable production practices.
          </p>

          {/* Services Section */}
          <h2 className="text-xl font-bold ml-2 mb-2">Services:</h2>
          <ul className="list-disc ml-6 mb-5 text-lg">
            <li>Die Casting</li>
            <li>Sand Casting</li>
            <li>Investment Casting</li>
            <li>Centrifugal Casting</li>
            <li>Custom Mold Design</li>
          </ul>
          {/* Features Grid */}
          <div className="mt-8 w-full">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 w-full">
              {[
                { label: "Affordable Pricing", icon: "₹" },
                { label: "24x7 Support", icon: "🕒" },
                { label: "Certified & Insured", icon: "✅" },
                { label: "Expert Technicians", icon: "🛠️" },
              ].map((feature, idx) => (
                <div
                  key={idx}
                  className="flex flex-col items-center text-center p-6 bg-gray rounded-xl shadow-sm hover:shadow-[0_4px_20px_rgba(0,0,0,0.15)] hover:scale-105 transition-transform duration-300 cursor-pointer"
                >
                  <div className="text-5xl mb-3">{feature.icon}</div>
                  <span className="font-semibold text-gray-800">{feature.label}</span>
                </div>
              ))}

              {/* Learn More Button */}
              <div className="col-span-full flex justify-center mt-4">
                <SLink
                  to="/castingservices"
                  className="inline-block px-6 py-3 text-base font-semibold text-white bg-gradient-to-r from-blue-500 to-blue-600 rounded-full shadow-lg hover:shadow-xl hover:scale-105 transform transition duration-300 ease-in-out"
                >
                  Learn More
                </SLink>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CastingPage;
