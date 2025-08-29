import React from 'react';

const RapidVsTraditional = () => {
  return (
    <section className="bg-white min-h-screen">
      {/* Top Full-width Banner with spacing */}
      <div className="py-6 md:py-10 text-center">
        <img
          src="https://res.cloudinary.com/dxrryep5y/image/upload/v1753339711/website_static_media/cnc-comparison-banner1.jpg"
          alt="Rapid vs Traditional CNC Machining"
          className="inline-block w-full max-w-5xl rounded-xl shadow"
        />
      </div>
      {/* Content Container */}
      <div className="max-w-6xl mx-auto px-4 md:px-8 relative z-10">
        <div className="bg-white shadow-lg rounded-2xl p-6 md:p-10 space-y-10 mb-10">
          {/* Title */}
          <header className="text-center">
            <h1 className="text-3xl md:text-4xl font-bold text-gray-800">
              Rapid CNC Machining vs. Traditional CNC Machining
            </h1>
            <p className="mt-2 text-lg text-gray-600 max-w-2xl mx-auto text-justify">
              Explore the key differences between Rapid CNC and Traditional CNC to choose the right solution for your manufacturing needs.
            </p>
          </header>

          {/* Intro */}
          <section>
            <p className="text-gray-700 text-base md:text-lg leading-relaxed text-justify">
              CNC machining is the backbone of modern precision manufacturing. Whether you’re working on a prototype or a mass production run, choosing the right approach is critical. Here we compare <strong>Rapid CNC machining</strong> and <strong>Traditional CNC machining</strong> to help you decide which fits your project better.
            </p>
          </section>

          {/* Comparison Grid */}
          <div className="grid md:grid-cols-2 gap-6">
            {/* Rapid CNC */}
            <div className="bg-gray-50 rounded-xl shadow p-6">
              <h2 className="text-xl font-semibold text-blue-700 mb-4">
                Rapid CNC Machining
              </h2>
              <ul className="list-disc list-inside text-gray-700 space-y-1 text-sm md:text-base">
                <li>Designed for fast turnaround times</li>
                <li>Ideal for prototypes and low-volume production</li>
                <li>Higher per-unit cost compared to mass production</li>
                <li>Minimal tooling setup — quicker to start</li>
                <li>Great for iterative design and testing phases</li>
              </ul>
            </div>

            {/* Traditional CNC */}
            <div className="bg-gray-50 rounded-xl shadow p-6">
              <h2 className="text-xl font-semibold text-green-700 mb-4">
                Traditional CNC Machining
              </h2>
              <ul className="list-disc list-inside text-gray-700 space-y-1 text-sm md:text-base">
                <li>Optimized for high-volume, repeatable production</li>
                <li>Lower per-unit cost at scale</li>
                <li>Longer setup and tooling preparation</li>
                <li>Best for finalized designs with stable demand</li>
                <li>Higher efficiency for mass manufacturing</li>
              </ul>
            </div>
          </div>

          {/* Divider */}
          <div className="border-t border-gray-200"></div>

          {/* Conclusion */}
          <section>
            <h3 className="text-xl md:text-2xl font-bold text-gray-800 mb-2">
              Which One Should You Choose?
            </h3>
            <p className="text-gray-700 leading-relaxed text-base md:text-lg">
              If speed and flexibility are your priorities — especially in the design and testing phase — then <strong>Rapid CNC machining</strong> is your best option. For finalized, high-volume runs where cost per part is critical, <strong>Traditional CNC machining</strong> delivers better efficiency.
            </p>
          </section>

          {/* CTA */}
          <div className="text-center">
            <a
              href="/contact"
              className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-medium px-6 py-3 rounded-xl shadow"
            >
              Talk to Our Experts →
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default RapidVsTraditional;
