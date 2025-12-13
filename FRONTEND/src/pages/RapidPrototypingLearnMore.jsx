import React from "react";

const RapidPrototypingLearnMore = () => {
  return (
    <section className="bg-gradient-to-b from-gray-50 to-blue-50 min-h-screen py-12 px-4 md:px-8">
      <div className="max-w-5xl mx-auto">
        {/* Small page label */}
        <div className="mb-4">
          <span className="inline-flex items-center rounded-full bg-blue-100 text-blue-700 text-xs font-semibold px-3 py-1">
            Services / Rapid Prototyping
          </span>
        </div>

        <div className="bg-white shadow-lg hover:shadow-2xl transition-shadow duration-300 rounded-2xl overflow-hidden border border-gray-100">
          {/* Image */}
          <div className="relative">
            <img
              src="https://res.cloudinary.com/dxrryep5y/image/upload/v1764181485/website_static_media/rapid_prototyping.jpg"
              alt="Rapid Prototyping"
              className="w-full aspect-video object-cover"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent pointer-events-none" />
          </div>

          {/* Content */}
          <div className="p-6 md:p-8">
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3">
              Rapid Prototyping
            </h1>

            <p className="text-lg text-gray-600 mb-6">
              <strong className="font-semibold text-gray-800">
                Fast turnaround for functional prototypes
              </strong>{" "}
              to help you test designs and accelerate development. Ideal for
              iterative product design, early-stage validation, and quick
              decision-making.
            </p>

            {/* Why Choose */}
            <div className="mt-6">
              <h2 className="text-2xl font-semibold text-gray-900 mb-3">
                Why Choose Our Rapid Prototyping?
              </h2>
              <ul className="list-disc list-inside text-gray-700 space-y-1.5 text-sm md:text-base">
                <li>Same-day and next-day delivery options available.</li>
                <li>Low-cost, quick production of prototype parts.</li>
                <li>Material selection to match final production needs.</li>
                <li>Ability to incorporate design changes quickly.</li>
              </ul>
            </div>

            {/* Applications */}
            <div className="mt-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-3">
                Applications
              </h2>
              <p className="text-gray-600 text-sm md:text-base">
                Rapid prototyping is commonly used for:
              </p>
              <ul className="list-disc list-inside text-gray-700 mt-2 space-y-1 text-sm md:text-base">
                <li>Product development cycles</li>
                <li>Concept models</li>
                <li>Design verification</li>
                <li>Customer demos</li>
              </ul>
            </div>

            {/* Small info strip */}
            <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-3 text-sm">
              <div className="bg-blue-50 border border-blue-100 rounded-xl px-4 py-3">
                <p className="font-semibold text-blue-700">Typical Lead Time</p>
                <p className="text-gray-700 text-sm">1 – 3 business days</p>
              </div>
              <div className="bg-blue-50 border border-blue-100 rounded-xl px-4 py-3">
                <p className="font-semibold text-blue-700">Ideal For</p>
                <p className="text-gray-700 text-sm">Early-stage design & testing</p>
              </div>
              <div className="bg-blue-50 border border-blue-100 rounded-xl px-4 py-3">
                <p className="font-semibold text-blue-700">Supported Processes</p>
                <p className="text-gray-700 text-sm">3D Printing, CNC, Casting (on request)</p>
              </div>
            </div>

            {/* CTA */}
            <div className="mt-10 text-center">
              <a
                href="/get-quote"
                className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-semibold px-7 py-3 rounded-full shadow-md hover:shadow-lg transform hover:-translate-y-0.5 active:translate-y-0 transition-all duration-200"
              >
                Get a Rapid Prototyping Quote →
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default RapidPrototypingLearnMore;
