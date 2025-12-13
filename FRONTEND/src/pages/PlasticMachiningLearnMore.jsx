import React from "react";
import { SLink } from "../components/SLink";

const PlasticMachiningLearnMore = () => {
  return (
    <section className="bg-gradient-to-b from-gray-50 to-blue-50 min-h-screen py-12 px-4 md:px-8">
      <div className="max-w-5xl mx-auto">
        {/* Label */}
        <div className="mb-4">
          <span className="inline-flex items-center rounded-full bg-blue-100 text-blue-700 text-xs font-semibold px-3 py-1">
            Services / Plastic Machining
          </span>
        </div>

        <div className="bg-white shadow-lg hover:shadow-2xl transition-shadow duration-300 rounded-2xl overflow-hidden border border-gray-100">
          {/* Image */}
          <div className="relative">
            <img
              src="https://res.cloudinary.com/dxrryep5y/image/upload/v1764182571/website_static_media/Plastic_machining_gem.png"
              alt="Plastic Machining"
              className="w-full aspect-video object-cover"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent pointer-events-none" />
          </div>

          {/* Content */}
          <div className="p-6 md:p-8">
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3">
              Plastic Machining
            </h1>

            <p className="text-lg text-gray-600 mb-6">
              <strong className="font-semibold text-gray-800">
                Precision machining of plastics
              </strong>{" "}
              for lightweight, corrosion-resistant, and electrically insulating
              components with exceptional dimensional accuracy.
            </p>

            {/* Why Choose */}
            <div className="mt-6">
              <h2 className="text-2xl font-semibold text-gray-900 mb-3">
                Why Choose Our Plastic Machining?
              </h2>
              <ul className="list-disc list-inside text-gray-700 space-y-1.5 text-sm md:text-base">
                <li>Expertise in engineering plastics like PEEK, Delrin, Nylon, PTFE.</li>
                <li>High accuracy with minimal thermal and machining stress.</li>
                <li>Excellent for medical, electrical, and chemical-resistant parts.</li>
                <li>Supports complex geometries and fine features.</li>
                <li>Clean machining with excellent surface finish.</li>
              </ul>
            </div>

            {/* Applications */}
            <div className="mt-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-3">
                Applications
              </h2>
              <p className="text-gray-600 text-sm md:text-base">
                Commonly used for:
              </p>
              <ul className="list-disc list-inside text-gray-700 mt-2 space-y-1 text-sm md:text-base">
                <li>Medical device housings and fixtures</li>
                <li>Electrical and thermal insulators</li>
                <li>Wear-resistant industrial components</li>
                <li>Lightweight structural and mechanical parts</li>
              </ul>
            </div>

            {/* Info Strip */}
            <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-3 text-sm">
              <div className="bg-blue-50 border border-blue-100 rounded-xl px-4 py-3">
                <p className="font-semibold text-blue-700">Typical Materials</p>
                <p className="text-gray-700 text-sm">
                  PEEK, Delrin (POM), Nylon, PTFE, UHMW
                </p>
              </div>
              <div className="bg-blue-50 border border-blue-100 rounded-xl px-4 py-3">
                <p className="font-semibold text-blue-700">Tolerance Capability</p>
                <p className="text-gray-700 text-sm">Up to ±0.03 mm (on request)</p>
              </div>
              <div className="bg-blue-50 border border-blue-100 rounded-xl px-4 py-3">
                <p className="font-semibold text-blue-700">Key Properties</p>
                <p className="text-gray-700 text-sm">
                  Lightweight, corrosion-resistant, electrically insulating
                </p>
              </div>
            </div>

            {/* CTA */}
            <div className="mt-10 text-center">
              <SLink
                to="/get-quote"
                className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-semibold px-7 py-3 rounded-full shadow-md hover:shadow-lg transform hover:-translate-y-0.5 active:translate-y-0 transition-all duration-200"
              >
                Get a Plastic Machining Quote →
              </SLink>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PlasticMachiningLearnMore;
