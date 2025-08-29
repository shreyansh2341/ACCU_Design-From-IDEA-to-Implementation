import React from 'react';

const PlasticMachiningLearnMore = () => {
  return (
    <section className="bg-gray-50 min-h-screen py-12 px-4 md:px-12">
      <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-2xl overflow-hidden">
        <img
          src="https://res.cloudinary.com/dxrryep5y/image/upload/v1753295736/website_static_media/plasticmachine.jpg"
          alt="Plastic Machining"
          className="w-full aspect-video object-cover"
        />

        <div className="p-8">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
            Plastic Machining
          </h1>
          <p className="text-lg text-gray-600 mb-6">
            <strong>Precision machining of plastics</strong> for lightweight, corrosion-resistant, and insulating components.
          </p>

          <h2 className="text-2xl font-semibold text-gray-800 mt-8 mb-4">
            Why Choose Our Plastic Machining?
          </h2>
          <ul className="list-disc list-inside text-gray-600 space-y-2">
            <li>Expertise with engineering plastics like PEEK, Delrin, Nylon, and more.</li>
            <li>High accuracy with minimal material stress.</li>
            <li>Ideal for electrical and medical applications.</li>
            <li>Custom finishes and complex geometries possible.</li>
          </ul>

          <h2 className="text-2xl font-semibold text-gray-800 mt-8 mb-4">
            Applications
          </h2>
          <p className="text-gray-600">
            Commonly used for:
          </p>
          <ul className="list-disc list-inside text-gray-600 mt-2 space-y-1">
            <li>Medical device housings</li>
            <li>Electrical insulators</li>
            <li>Wear-resistant industrial parts</li>
            <li>Lightweight structural components</li>
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

export default PlasticMachiningLearnMore;
