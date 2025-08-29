import React from 'react';

const CncMillingLearnMore = () => {
  return (
    <section className="bg-gray-50 min-h-screen py-12 px-4 md:px-12">
      <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-2xl overflow-hidden">
        {/* Image at the top */}
        <img
          src="https://res.cloudinary.com/dxrryep5y/image/upload/v1753339713/website_static_media/cnc-milling.jpg"
          alt="CNC Milling"
          className="w-full aspect-video object-cover"
        />

        <div className="p-8">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
            CNC Milling
          </h1>
          <p className="text-lg text-gray-600 mb-6">
            <strong>High precision 3-5 axis milling</strong> for complex parts with tight tolerances and excellent surface finish. Our CNC milling services cater to industries requiring intricate geometries, such as aerospace, automotive, and medical devices.
          </p>

          <h2 className="text-2xl font-semibold text-gray-800 mt-8 mb-4">
            Why Choose Our CNC Milling?
          </h2>
          <ul className="list-disc list-inside text-gray-600 space-y-2">
            <li>Advanced 3-axis and 5-axis CNC machines for superior flexibility.</li>
            <li>Capability to machine complex shapes and fine details.</li>
            <li>Support for a wide range of materials including aluminum, steel, titanium, and plastics.</li>
            <li>Fast turnaround with strict quality control processes.</li>
            <li>Expert engineers ensuring precision and consistency at every step.</li>
          </ul>

          <h2 className="text-2xl font-semibold text-gray-800 mt-8 mb-4">
            Applications
          </h2>
          <p className="text-gray-600">
            CNC milling is ideal for prototypes, custom parts, and production runs in industries such as:
          </p>
          <ul className="list-disc list-inside text-gray-600 mt-2 space-y-1">
            <li>Aerospace components</li>
            <li>Medical device parts</li>
            <li>Automotive prototypes</li>
            <li>Industrial machinery parts</li>
          </ul>

          <div className="mt-8 text-center">
            <a
              href="/get-quote"
              className="inline-block bg-blue-600 text-white font-semibold px-6 py-3 rounded-xl shadow hover:bg-blue-700 transition"
            >
              Get a Quote
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CncMillingLearnMore;
