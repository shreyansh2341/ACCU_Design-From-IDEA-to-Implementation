import React from 'react';

const MetalMachiningLearnMore = () => {
  return (
    <section className="bg-gray-50 min-h-screen py-12 px-4 md:px-12">
      <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-2xl overflow-hidden">
        <img
          src="https://res.cloudinary.com/dxrryep5y/image/upload/v1753295727/website_static_media/metalmachine.jpg"
          alt="Metal Machining"
          className="w-full aspect-video object-cover"
        />

        <div className="p-8">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
            Metal Machining
          </h1>
          <p className="text-lg text-gray-600 mb-6">
            <strong>Precision machining of metals</strong> including aluminum, steel, titanium, and more for robust and durable components.
          </p>

          <h2 className="text-2xl font-semibold text-gray-800 mt-8 mb-4">
            Why Choose Our Metal Machining?
          </h2>
          <ul className="list-disc list-inside text-gray-600 space-y-2">
            <li>Machining expertise with a wide range of metals.</li>
            <li>Ability to handle hard-to-machine alloys.</li>
            <li>High strength and long-lasting parts.</li>
            <li>Strict tolerances and excellent surface finishes.</li>
          </ul>

          <h2 className="text-2xl font-semibold text-gray-800 mt-8 mb-4">
            Applications
          </h2>
          <p className="text-gray-600">
            Ideal for:
          </p>
          <ul className="list-disc list-inside text-gray-600 mt-2 space-y-1">
            <li>Aerospace components</li>
            <li>Industrial machinery</li>
            <li>Medical implants and devices</li>
            <li>Automotive performance parts</li>
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

export default MetalMachiningLearnMore;
