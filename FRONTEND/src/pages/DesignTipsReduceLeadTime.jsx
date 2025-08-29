import React from 'react';

const DesignTipsReduceLeadTime = () => {
  return (
    <section className="bg-white min-h-screen">
      {/*Top Full-width Banner with spacing */}
      <div className="w-full py-6 md:py-10 flex justify-center">
        <img
          src="https://res.cloudinary.com/dxrryep5y/image/upload/v1753339712/website_static_media/cnc-lead-time-tips-banner.jpg"
          alt="Top 10 Design Tips for Reducing CNC Lead Time"
         className="w-full max-w-5xl h-[40rem] md:h-[32rem] object-cover rounded-xl shadow"
        />
      </div>

      {/* Content Container */}
      <div className="max-w-6xl mx-auto px-4 md:px-8 relative z-10">
        <div className="bg-white shadow-lg rounded-2xl p-6 md:p-10 space-y-8 mb-10">
          {/* Title */}
          <header className="text-center">
            <h1 className="text-3xl md:text-4xl font-bold text-gray-800">
              Top 10 Design Tips for Reducing CNC Lead Time
            </h1>
            <p className="mt-2 text-lg text-gray-600 max-w-2xl mx-auto">
              Learn how to optimize your part designs to minimize production delays and get your CNC machined parts faster.
            </p>
          </header>

          {/* Introduction */}
          <section>
            <p className="text-gray-700 text-base md:text-lg leading-relaxed text-justify">
              CNC machining is known for precision and reliability — but lead time can make or break your project schedule. By designing your parts with manufacturability in mind, you can significantly cut production time. Here are our top 10 tips to help you design smarter and reduce CNC lead times.
            </p>
          </section>

          {/* Tips List */}
          <section>
            <h2 className="text-xl md:text-2xl font-semibold text-blue-700 mb-4">
              Top 10 Design Tips:
            </h2>
            <ol className="list-decimal list-inside text-gray-700 space-y-1 text-base md:text-lg">
              <li>Avoid overly tight tolerances unless absolutely necessary.</li>
              <li>Stick to standard hole sizes that match common drill bits.</li>
              <li>Design parts with uniform wall thicknesses to prevent machining slowdowns.</li>
              <li>Minimize deep cavities, as they require slower cutting speeds and more passes.</li>
              <li>Use fillets on internal corners instead of sharp edges to ease toolpaths.</li>
              <li>Consolidate features and reduce the number of setups needed.</li>
              <li>Select materials that are readily machinable and available.</li>
              <li>Clearly specify critical features vs. non-critical features in drawings.</li>
              <li>Provide 3D CAD files along with 2D drawings for clarity.</li>
              <li>Consult with your CNC shop early in the design phase to get feedback.</li>
            </ol>
          </section>

          {/* Call to Action */}
          <section className="text-center">
            <h3 className="text-xl md:text-2xl font-bold text-gray-800 mb-4">
              Need Help Optimizing Your Design?
            </h3>
            <p className="text-gray-700 mb-4 max-w-xl mx-auto">
              Accu Design’s engineering team is here to help you design parts that are both functional and efficient to produce. Get in touch today to discuss your project.
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

export default DesignTipsReduceLeadTime;
