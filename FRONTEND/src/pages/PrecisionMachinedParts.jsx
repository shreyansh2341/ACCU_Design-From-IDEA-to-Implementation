import React from 'react';

const PrecisionMachinedParts = () => {
  return (
    <section className="bg-white min-h-screen">
      {/* ✅ Top Full-width Banner with spacing */}
      <div className="w-full py-6 md:py-10">
        <img
          src="https://res.cloudinary.com/dxrryep5y/image/upload/v1753339749/website_static_media/precision-machined-banner.jpg"
          alt="Precision Machined Parts by Accu Design"
          className="w-full h-72 md:h-96 object-cover rounded-xl shadow"
        />
      </div>

      {/* Content Container */}
      <div className="max-w-6xl mx-auto px-4 md:px-8 relative z-10">
        <div className="bg-white shadow-lg rounded-2xl p-6 md:p-10 space-y-8 mb-10">
          {/* Title */}
          <header className="text-center">
            <h1 className="text-3xl md:text-4xl font-bold text-gray-800">
              Precision Machined Parts: Accu Design's Comprehensive Guide
            </h1>
            <p className="mt-2 text-lg text-gray-600 max-w-2xl mx-auto">
              Discover everything you need to know about precision machined parts and how Accu Design ensures excellence in every detail.
            </p>
          </header>

          {/* Introduction */}
          <section>
            <p className="text-gray-700 text-base md:text-lg leading-relaxed">
              Precision machined parts are the foundation of countless industries — from aerospace to medical devices. At <strong>Accu Design</strong>, we specialize in delivering high-quality, custom parts that meet exacting standards and specifications. This guide covers what precision machining is, why it matters, and how our team can help you achieve success.
            </p>
          </section>

          {/* What Are Precision Machined Parts? */}
          <section>
            <h2 className="text-xl md:text-2xl font-semibold text-blue-700 mb-2">
              What Are Precision Machined Parts?
            </h2>
            <p className="text-gray-700 text-base md:text-lg leading-relaxed">
              Precision machined parts are components created through CNC machining processes to extremely tight tolerances. They’re engineered to fit and function perfectly, ensuring reliability and performance in critical applications. Whether it’s a one-off prototype or a high-volume production run, precision machining delivers accuracy and repeatability.
            </p>
          </section>

          {/* Why Choose Accu Design? */}
          <section>
            <h2 className="text-xl md:text-2xl font-semibold text-green-700 mb-2">
              Why Choose Accu Design?
            </h2>
            <ul className="list-disc list-inside text-gray-700 space-y-1 text-base md:text-lg">
              <li>State-of-the-art CNC equipment for unmatched precision</li>
              <li>Experienced engineers and machinists focused on quality</li>
              <li>Custom solutions tailored to your project’s requirements</li>
              <li>Fast turnaround times without compromising standards</li>
              <li>Trusted partner across aerospace, automotive, medical & more</li>
            </ul>
          </section>

          {/* Call to Action */}
          <section className="text-center">
            <h3 className="text-xl md:text-2xl font-bold text-gray-800 mb-4">
              Ready to Get Started?
            </h3>
            <p className="text-gray-700 mb-4 max-w-xl mx-auto">
              Whether you need a single prototype or thousands of parts, Accu Design is here to deliver precision and performance at every step. Talk to our experts today!
            </p>
            <a
              href="/contact"
              className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-medium px-6 py-3 rounded-xl shadow"
            >
              Contact Accu Design →
            </a>
          </section>
        </div>
      </div>
    </section>
  );
};

export default PrecisionMachinedParts;
