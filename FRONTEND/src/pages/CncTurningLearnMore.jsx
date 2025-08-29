import React from 'react';

const CncTurningLearnMore = () => {
  return (
    <section className="bg-gray-50 min-h-screen py-12 px-4 md:px-12">
      <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-2xl overflow-hidden">
        {/* Image at the top */}
        <img
          src="https://res.cloudinary.com/dxrryep5y/image/upload/v1753339714/website_static_media/cnc-turning.jpg"
          alt="CNC Turning"
          className="w-full aspect-video object-cover"
        />

        <div className="p-8">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
            CNC Turning
          </h1>
          <p className="text-lg text-gray-600 mb-6">
            <strong>Efficient turning solutions</strong> for cylindrical parts with high precision and repeatability. Our CNC turning services produce smooth finishes and tight tolerances for components of various sizes and complexities.
          </p>

          <h2 className="text-2xl font-semibold text-gray-800 mt-8 mb-4">
            Why Choose Our CNC Turning?
          </h2>
          <ul className="list-disc list-inside text-gray-600 space-y-2">
            <li>State-of-the-art CNC lathes for precision and efficiency.</li>
            <li>Ideal for shafts, bushings, and other cylindrical components.</li>
            <li>Capable of handling both small and large production runs.</li>
            <li>Supports a variety of materials including metals and plastics.</li>
            <li>Skilled machinists ensuring superior quality control.</li>
          </ul>

          <h2 className="text-2xl font-semibold text-gray-800 mt-8 mb-4">
            Applications
          </h2>
          <p className="text-gray-600">
            CNC turning is commonly used in:
          </p>
          <ul className="list-disc list-inside text-gray-600 mt-2 space-y-1">
            <li>Automotive components</li>
            <li>Industrial shafts and rods</li>
            <li>Medical device parts</li>
            <li>Custom bushings and collars</li>
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

export default CncTurningLearnMore;
