import React from 'react';
import { SLink } from '@/components/SLink';

const AerospaceLearnMore = () => {
  return (
    <section className="w-full min-h-screen bg-gradient-to-r from-sky-50 to-sky-100 py-12 px-6 md:px-20">
      <div className="max-w-4xl mx-auto text-center">
        <h1 className="text-4xl md:text-5xl font-bold text-sky-800 mb-4">
          Learn More About Our Aerospace Expertise
        </h1>
        <p className="text-lg md:text-xl text-sky-700 mb-8">
          Discover how we deliver precision engineering, innovative solutions, and
          uncompromising quality for the aerospace industry.
        </p>
        <img
          src="https://res.cloudinary.com/dxrryep5y/image/upload/v1753690972/website_static_media/Aerospaceimgpng.png"
          alt="Aerospace Technology"
          className="w-full rounded-2xl shadow-lg mb-8"
        />
      </div>

      <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-8">
        <div className="bg-white rounded-2xl p-6 shadow hover:shadow-lg transition">
          <h2 className="text-2xl font-semibold text-sky-800 mb-2">
            Why Choose Us
          </h2>
          <p className="text-sky-700">
            We combine advanced manufacturing capabilities with stringent quality
            controls to meet the exacting standards of aerospace applications. Our
            team works with aerospace-grade materials and state-of-the-art
            processes to deliver components you can trust.
          </p>
        </div>

        <div className="bg-white rounded-2xl p-6 shadow hover:shadow-lg transition">
          <h2 className="text-2xl font-semibold text-sky-800 mb-2">
            Our Capabilities
          </h2>
          <p className="text-sky-700">
            From CNC machining and sheet metal fabrication to precision inspection
            and testing, we offer a full suite of services tailored to the needs
            of the aerospace sector. We ensure compliance with international
            standards and certifications.
          </p>
        </div>

        <div className="bg-white rounded-2xl p-6 shadow hover:shadow-lg transition">
          <h2 className="text-2xl font-semibold text-sky-800 mb-2">
            Commitment to Quality
          </h2>
          <p className="text-sky-700">
            Our ISO-certified processes, rigorous inspections, and continual
            improvement culture make us a trusted partner for mission-critical
            components and assemblies.
          </p>
        </div>

        <div className="bg-white rounded-2xl p-6 shadow hover:shadow-lg transition">
          <h2 className="text-2xl font-semibold text-sky-800 mb-2">
            Get in Touch
          </h2>
          <p className="text-sky-700 mb-4">
            Ready to discuss your aerospace project? Contact us today to learn
            how we can help turn your vision into reality.
          </p>
          <SLink
             to="/contact-us"
            className="inline-block bg-sky-700 text-white font-medium px-4 py-2 rounded-lg shadow hover:bg-sky-800 transition"
          >
            Contact Us →
          </SLink>
        </div>
      </div>
    </section>
  );
};

export default AerospaceLearnMore;
