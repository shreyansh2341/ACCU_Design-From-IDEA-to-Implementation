import React from "react";

const MetalMachiningLearnMore = () => {
  return (
    <section className="bg-gradient-to-b from-gray-50 to-blue-50 min-h-screen py-12 px-4 md:px-8">
      <div className="max-w-5xl mx-auto">
        {/* Label / Breadcrumb */}
        <div className="mb-4">
          <span className="inline-flex items-center rounded-full bg-blue-100 text-blue-700 text-xs font-semibold px-3 py-1">
            Services / Metal Machining
          </span>
        </div>

        <div className="bg-white shadow-lg hover:shadow-2xl transition-shadow duration-300 rounded-2xl overflow-hidden border border-gray-100">
          {/* Image */}
          <div className="relative">
            <img
              src="https://res.cloudinary.com/dxrryep5y/image/upload/v1764182190/website_static_media/metal_machining_gem.png"
              alt="Metal Machining"
              className="w-full aspect-video object-cover"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent pointer-events-none" />
          </div>

          {/* Content */}
          <div className="p-6 md:p-8">
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3">
              Metal Machining
            </h1>

            <p className="text-lg text-gray-600 mb-6">
              <strong className="font-semibold text-gray-800">
                Precision machining of metals
              </strong>{" "}
              including aluminum, steel, titanium, and more to deliver robust and
              durable components for demanding applications.
            </p>

            {/* Why Choose Us */}
            <div className="mt-6">
              <h2 className="text-2xl font-semibold text-gray-900 mb-3">
                Why Choose Our Metal Machining?
              </h2>
              <ul className="list-disc list-inside text-gray-700 space-y-1.5 text-sm md:text-base">
                <li>Deep machining expertise across a wide range of metals.</li>
                <li>Capability to handle hard-to-machine alloys and complex parts.</li>
                <li>High-strength, long-lasting parts designed for real-world use.</li>
                <li>Strict tolerances and excellent surface finishes as per spec.</li>
                <li>Process-driven quality control at every stage.</li>
              </ul>
            </div>

            {/* Applications */}
            <div className="mt-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-3">
                Applications
              </h2>
              <p className="text-gray-600 text-sm md:text-base">
                Ideal for:
              </p>
              <ul className="list-disc list-inside text-gray-700 mt-2 space-y-1 text-sm md:text-base">
                <li>Aerospace components and structural parts</li>
                <li>Industrial machinery and automation systems</li>
                <li>Medical implants and device components</li>
                <li>Automotive performance and motorsport parts</li>
              </ul>
            </div>

            {/* Info Strip */}
            <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-3 text-sm">
              <div className="bg-blue-50 border border-blue-100 rounded-xl px-4 py-3">
                <p className="font-semibold text-blue-700">Capabilities</p>
                <p className="text-gray-700 text-sm">
                  Milling, turning, drilling, tapping, boring
                </p>
              </div>
              <div className="bg-blue-50 border border-blue-100 rounded-xl px-4 py-3">
                <p className="font-semibold text-blue-700">Typical Tolerance</p>
                <p className="text-gray-700 text-sm">Down to ±0.02 mm (on request)</p>
              </div>
              <div className="bg-blue-50 border border-blue-100 rounded-xl px-4 py-3">
                <p className="font-semibold text-blue-700">Common Materials</p>
                <p className="text-gray-700 text-sm">
                  Mild steel, alloy steel, stainless steel, aluminum, brass, titanium
                </p>
              </div>
            </div>

            {/* CTA */}
            <div className="mt-10 text-center">
              <a
                href="/get-quote"
                className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-semibold px-7 py-3 rounded-full shadow-md hover:shadow-lg transform hover:-translate-y-0.5 active:translate-y-0 transition-all duration-200"
              >
                Get a Metal Machining Quote →
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default MetalMachiningLearnMore;
