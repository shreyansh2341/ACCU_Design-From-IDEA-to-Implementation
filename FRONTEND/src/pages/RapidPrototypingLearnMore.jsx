import React from 'react';

const RapidPrototypingLearnMore = () => {
  return (
    <section className="bg-gray-50 min-h-screen py-12 px-4 md:px-12">
      <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-2xl overflow-hidden">
        <img
          src="https://res.cloudinary.com/dxrryep5y/image/upload/v1753295739/website_static_media/proto.jpg"
          alt="Rapid Prototyping"
          className="w-full aspect-video object-cover"
        />

        <div className="p-8">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
            Rapid Prototyping
          </h1>
          <p className="text-lg text-gray-600 mb-6">
            <strong>Fast turnaround for functional prototypes</strong> to help you test designs and accelerate development. Perfect for iterative product design and early-stage validation.
          </p>

          <h2 className="text-2xl font-semibold text-gray-800 mt-8 mb-4">
            Why Choose Our Rapid Prototyping?
          </h2>
          <ul className="list-disc list-inside text-gray-600 space-y-2">
            <li>Same-day and next-day delivery options available.</li>
            <li>Low-cost, quick production of prototype parts.</li>
            <li>Material selection to match final production needs.</li>
            <li>Ability to incorporate design changes quickly.</li>
          </ul>

          <h2 className="text-2xl font-semibold text-gray-800 mt-8 mb-4">
            Applications
          </h2>
          <p className="text-gray-600">
            Used for:
          </p>
          <ul className="list-disc list-inside text-gray-600 mt-2 space-y-1">
            <li>Product development cycles</li>
            <li>Concept models</li>
            <li>Design verification</li>
            <li>Customer demos</li>
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

export default RapidPrototypingLearnMore;
