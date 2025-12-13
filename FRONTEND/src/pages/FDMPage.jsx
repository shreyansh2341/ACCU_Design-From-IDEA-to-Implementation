import { motion } from "framer-motion";
import { SLink } from "../components/SLink";

const FDMPage = () => {
  return (
    <div className="w-full min-h-screen bg-gray-50 flex flex-col">
      
      {/* Hero Section */}
      <section className="w-full py-20 bg-gradient-to-b from-blue-600 to-blue-900 text-center text-white px-4">
        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-4xl md:text-6xl font-bold"
        >
          Fused Deposition Modeling (FDM)
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.3 }}
          className="mt-4 text-lg md:text-xl max-w-3xl mx-auto text-blue-100"
        >
          Affordable, robust 3D printing with engineering-grade thermoplastics –
          ideal for prototypes, functional parts, jigs, fixtures, and small-batch production.
        </motion.p>

        {/* Hero Highlights */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="mt-8 flex flex-wrap justify-center gap-3"
        >
          <span className="px-4 py-1 rounded-full bg-white/10 border border-white/20 text-sm">
            Cost-effective prototyping
          </span>
          <span className="px-4 py-1 rounded-full bg-white/10 border border-white/20 text-sm">
            Strong functional plastics
          </span>
          <span className="px-4 py-1 rounded-full bg-white/10 border border-white/20 text-sm">
            Ideal for jigs & fixtures
          </span>
        </motion.div>
      </section>

      {/* Main Content Card */}
      <section className="max-w-6xl mx-auto py-16 px-6 md:px-12 space-y-12 bg-white rounded-t-3xl shadow-lg -mt-10 z-10">
        
        {/* What is FDM */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            What is FDM 3D Printing?
          </h2>
          <p className="text-gray-700 leading-relaxed">
            Fused Deposition Modeling (FDM) is one of the most widely used 3D printing
            technologies. It builds parts layer by layer by extruding heated thermoplastic
            filament through a nozzle. As the material is deposited, it cools and solidifies,
            forming a strong, functional part. FDM is known for its reliability, ease of use,
            and suitability for everyday prototypes and end-use plastic components.
          </p>
        </motion.div>

        {/* Key Features */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Key Features
          </h2>
          <ul className="list-disc pl-6 space-y-2 text-gray-700">
            <li>Cost-effective solution for prototypes and low-volume production runs</li>
            <li>Strong, durable thermoplastic parts suitable for real-world functional use</li>
            <li>Supports relatively large build volumes for bigger components</li>
            <li>Simple post-processing with sanding, painting, or vapor smoothing (for some materials)</li>
            <li>Wide availability of materials and colors to match your application</li>
          </ul>
        </motion.div>

        {/* Materials */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Compatible Materials
          </h2>
          <p className="text-gray-700 leading-relaxed">
            FDM printers support a wide variety of thermoplastic filaments to meet
            different mechanical, thermal, and visual requirements:
          </p>
          <ul className="list-disc pl-6 mt-3 space-y-2 text-gray-700">
            <li>
              <b>PLA (Polylactic Acid)</b> – Easy to print, dimensionally stable, ideal for concept models and visual prototypes.
            </li>
            <li>
              <b>ABS (Acrylonitrile Butadiene Styrene)</b> – Durable and heat-resistant, suitable for functional parts and enclosures.
            </li>
            <li>
              <b>PETG (Polyethylene Terephthalate Glycol)</b> – Strong, slightly flexible, and chemical-resistant, great for mechanical parts.
            </li>
            <li>
              <b>TPU (Thermoplastic Polyurethane)</b> – Flexible and impact-resistant for gaskets, grips, and special flexible components.
            </li>
            <li>
              <b>Engineering-grade blends</b> – Reinforced or modified materials for higher strength or temperature resistance (where applicable).
            </li>
          </ul>
        </motion.div>

        {/* Applications */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Applications
          </h2>
          <ul className="list-disc pl-6 space-y-2 text-gray-700">
            <li>Rapid prototyping for mechanical, consumer, and industrial products</li>
            <li>Custom jigs, fixtures, and assembly aids for manufacturing</li>
            <li>Functional testing and validation of mechanical designs</li>
            <li>Small-batch and bridge manufacturing of plastic components</li>
            <li>Educational models, hobby projects, and concept visualization</li>
          </ul>
        </motion.div>

        {/* Advantages */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Advantages of FDM
          </h2>
          <ul className="list-disc pl-6 space-y-2 text-gray-700">
            <li>Highly affordable and widely accessible 3D printing technology</li>
            <li>Fast turnaround times for both prototypes and functional parts</li>
            <li>Parts can be strong enough for tooling, fixtures, and end-use applications</li>
            <li>Large range of materials with different strengths, flexibilities, and temperatures</li>
            <li>Good choice for larger parts where ultra-fine surface finish is not the top priority</li>
          </ul>
        </motion.div>

        {/* When to Choose FDM (vs SLA) */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            When is FDM the Right Choice?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-5 rounded-2xl border border-gray-200 bg-gray-50">
              <h3 className="font-semibold text-gray-900 mb-3">
                Choose <span className="text-blue-700">FDM</span> when:
              </h3>
              <ul className="list-disc pl-5 space-y-1 text-gray-700">
                <li>You need a cost-effective prototype or functional plastic part</li>
                <li>Strength and durability matter more than cosmetic surface finish</li>
                <li>You are printing medium to large parts</li>
                <li>You want jigs, fixtures, or tooling for the shop floor</li>
              </ul>
            </div>
            <div className="p-5 rounded-2xl border border-gray-200">
              <h3 className="font-semibold text-gray-900 mb-3">
                Consider <span className="text-indigo-700">SLA/DLP</span> when:
              </h3>
              <ul className="list-disc pl-5 space-y-1 text-gray-700">
                <li>You need extremely fine details and very smooth surfaces</li>
                <li>The part is primarily for visual presentation or aesthetics</li>
                <li>Thin walls, sharp edges, and small features are critical</li>
              </ul>
            </div>
          </div>
        </motion.div>
      </section>

      {/* Footer CTA */}
      <section className="w-full bg-blue-600 py-12 text-center text-white mt-auto">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-2xl md:text-3xl font-bold"
        >
          Ready to Start Your FDM 3D Printing Project?
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mt-2 text-blue-100 max-w-xl mx-auto"
        >
          Share your CAD files and requirements, and we&apos;ll help you choose the
          right material and settings for reliable, cost-effective parts.
        </motion.p>

        <div className="mt-8 flex justify-center gap-4">
          <SLink
            to="/get-quote"
            className="inline-block bg-white text-blue-700 font-semibold px-6 py-3 rounded-xl shadow hover:bg-gray-100 transition"
          >
            Get a Quote
          </SLink>
          <SLink
            to="/contact"
            className="inline-block border border-white/70 text-white font-medium px-6 py-3 rounded-xl hover:bg-white/10 transition"
          >
            Talk to an Expert
          </SLink>
        </div>
      </section>
    <section className="w-full bg-gray-50 py-20 px-6">
  <div className="max-w-6xl mx-auto text-center">
    <motion.h2
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="text-3xl md:text-4xl font-bold text-blue-800 mb-14"
    >
      Why Choose Our Manufacturing Services?
    </motion.h2>

    <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
      {[
        "Industrial-Grade Machines",
        "Experienced Engineers",
        "Fast Turnaround",
        "Strict Quality Checks",
      ].map((item, i) => (
        <motion.div
          key={i}
          whileHover={{ y: -12, scale: 1.06 }}
          transition={{ type: "spring", stiffness: 200 }}
          className="bg-white p-8 rounded-2xl shadow-xl border border-gray-200 
          hover:border-blue-600 hover:shadow-blue-200 transition-all duration-300 cursor-pointer"
        >
          <div className="text-4xl mb-4">✅</div>
          <h3 className="font-bold text-lg text-gray-900">{item}</h3>
        </motion.div>
      ))}
    </div>
  </div>
</section>
 <section className="w-full bg-gray-100 py-20 px-6">
  <div className="max-w-4xl mx-auto">
    <motion.h2
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="text-3xl md:text-4xl font-bold text-blue-800 text-center mb-12"
    >
      Frequently Asked Questions
    </motion.h2>

    <div className="space-y-8">
      {[
        {
          q: "Is my design confidential?",
          a: "Yes, all uploaded CAD files and project details are kept strictly confidential.",
        },
        {
          q: "Do you accept single-piece orders?",
          a: "Yes, we support everything from single prototypes to batch production.",
        },
        {
          q: "Which file formats do you support?",
          a: "We accept STL, STEP, IGES and most standard CAD formats.",
        },
      ].map((item, i) => (
        <motion.div
          key={i}
          whileHover={{ scale: 1.02 }}
          className="bg-white p-8 rounded-2xl shadow-lg border border-gray-200 hover:border-blue-500 transition-all"
        >
          <h4 className="font-semibold text-lg text-gray-900 mb-2">{item.q}</h4>
          <p className="text-gray-700">{item.a}</p>
        </motion.div>
      ))}
    </div>
  </div>
</section>

    </div>
  );
};

export default FDMPage;
