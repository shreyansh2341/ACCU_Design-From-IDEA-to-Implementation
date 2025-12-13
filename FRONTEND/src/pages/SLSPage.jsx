import { motion } from "framer-motion";
import { SLink } from "../components/SLink";

const SLSPage = () => {
  return (
    <div className="w-full min-h-screen bg-gray-50 flex flex-col">
      
      {/* Hero Section */}
      <section className="w-full py-20 bg-gradient-to-b from-blue-600 to-indigo-900 text-center text-white px-4">
        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-4xl md:text-6xl font-bold"
        >
          Selective Laser Sintering (SLS)
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.3 }}
          className="mt-4 text-lg md:text-xl max-w-3xl mx-auto text-blue-100"
        >
          High-performance powder-bed 3D printing for complex, durable, and functional parts 
          without the need for support structures – ideal for serious engineering applications.
        </motion.p>

        {/* Hero Highlights */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="mt-8 flex flex-wrap justify-center gap-3"
        >
          <span className="px-4 py-1 rounded-full bg-white/10 border border-white/20 text-sm">
            No support structures
          </span>
          <span className="px-4 py-1 rounded-full bg-white/10 border border-white/20 text-sm">
            Production-grade nylon parts
          </span>
          <span className="px-4 py-1 rounded-full bg-white/10 border border-white/20 text-sm">
            Ideal for batch production
          </span>
        </motion.div>
      </section>

      {/* Main Content Card */}
      <section className="max-w-6xl mx-auto py-16 px-6 md:px-12 space-y-12 bg-white rounded-t-3xl shadow-lg -mt-10 z-10">
        
        {/* What is SLS */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            What is SLS 3D Printing?
          </h2>
          <p className="text-gray-700 leading-relaxed">
            Selective Laser Sintering (SLS) is an industrial powder-bed 3D printing process 
            that uses a high-powered laser to selectively fuse layers of polymer powder. 
            The surrounding unfused powder naturally supports the part, so no dedicated support 
            structures are required. This allows SLS to produce highly complex geometries, 
            strong functional components, and production-ready parts with excellent mechanical properties.
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
            <li>No support structures needed, enabling complex internal channels and interlocking parts</li>
            <li>Strong, functional parts with excellent load-bearing and impact performance</li>
            <li>Consistent dimensional accuracy and repeatability across batches</li>
            <li>Well-suited for low-to-medium volume production and functional prototyping</li>
            <li>Good balance of strength, detail, and surface quality for engineering applications</li>
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
            SLS supports a range of high-performance polymer powders designed for real-world use:
          </p>
          <ul className="list-disc pl-6 mt-3 space-y-2 text-gray-700">
            <li>
              <b>Nylon (PA12, PA11)</b> – Strong, versatile, wear-resistant; excellent for general engineering parts.
            </li>
            <li>
              <b>Glass-filled Nylon</b> – Enhanced stiffness, dimensional stability, and heat resistance for demanding environments.
            </li>
            <li>
              <b>TPU</b> – Flexible, durable, and impact-resistant, ideal for seals, grippers, and shock-absorbing parts.
            </li>
            <li>
              <b>Composite Powders</b> – Tailored properties (e.g., improved stiffness, heat, or chemical resistance) for specialized applications.
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
            <li>Functional prototypes for engineering validation and field testing</li>
            <li>End-use components in automotive, aerospace, medical, and industrial sectors</li>
            <li>Complex, interlocking mechanisms and assemblies that are difficult to mold or machine</li>
            <li>Short-run and bridge production with consistent, repeatable quality</li>
            <li>Housings, brackets, ducts, lattice structures, and lightweight optimized designs</li>
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
            Advantages of SLS
          </h2>
          <ul className="list-disc pl-6 space-y-2 text-gray-700">
            <li>No supports, enabling truly complex geometries and efficient nesting of parts in the build</li>
            <li>Strong, durable parts suitable for real-world, end-use applications</li>
            <li>High accuracy and excellent batch-to-batch repeatability</li>
            <li>Efficient for batch production, helping reduce per-part cost at volume</li>
            <li>Ideal choice when you need a balance of design freedom, strength, and production capability</li>
          </ul>
        </motion.div>

        {/* When is SLS the Right Choice? */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            When is SLS the Right Choice?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-5 rounded-2xl border border-gray-200 bg-gray-50">
              <h3 className="font-semibold text-gray-900 mb-3">
                Choose <span className="text-blue-700">SLS</span> when:
              </h3>
              <ul className="list-disc pl-5 space-y-1 text-gray-700">
                <li>You need strong, production-grade polymer parts</li>
                <li>Your design has complex internal channels or interlocking features</li>
                <li>You want to produce batches of parts in a single build</li>
                <li>Support-free manufacturing and design freedom are important</li>
              </ul>
            </div>
            <div className="p-5 rounded-2xl border border-gray-200">
              <h3 className="font-semibold text-gray-900 mb-3">
                Consider <span className="text-indigo-700">FDM / SLA</span> when:
              </h3>
              <ul className="list-disc pl-5 space-y-1 text-gray-700">
                <li>You need very low-cost, quick prototype iterations (FDM)</li>
                <li>You need ultra-smooth surfaces and tiny details (SLA)</li>
                <li>Your parts are mainly for visual review rather than heavy functional loads</li>
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
          Bring Your Complex Designs to Life with SLS
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mt-2 text-blue-100 max-w-xl mx-auto"
        >
          Share your CAD files and requirements, and we&apos;ll help you choose the right 
          material and SLS setup for strong, production-ready parts.
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
    {/* QnA Timeline Section */}
<section className="w-full bg-gray-50 py-20 px-6">
  <div className="max-w-4xl mx-auto">
    <motion.h2
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className="text-3xl md:text-4xl font-bold text-blue-800 text-center"
    >
      Frequently Asked Questions
    </motion.h2>

    <motion.p
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: 0.15 }}
      className="mt-3 text-center text-gray-600 max-w-2xl mx-auto"
    >
      Answers to the most common questions about our 3D printing and manufacturing services.
    </motion.p>

    <div className="mt-12 relative">
      {/* Vertical line (desktop) */}
      <div className="hidden md:block absolute left-6 top-0 bottom-0 w-px bg-gradient-to-b from-blue-300 via-blue-200 to-transparent" />

      <div className="space-y-10">
        {[
          {
            q: "Is my design file kept confidential?",
            a: "Yes. All CAD files and project details are handled securely and are used only for quoting and manufacturing your parts.",
          },
          {
            q: "Can I order just one prototype?",
            a: "Absolutely. We support everything from single prototypes to low- and medium-volume production batches.",
          },
          {
            q: "Which file formats do you accept?",
            a: "We typically accept STL, STEP, IGES and other standard CAD formats. If you’re unsure, you can still upload and we’ll guide you.",
          },
          {
            q: "How long will my parts take to be delivered?",
            a: "Lead time depends on part size, complexity, and technology (FDM, SLA, SLS, DMLS), but most orders are completed within a few working days after approval.",
          },
          {
            q: "What if my design is not manufacturable as uploaded?",
            a: "Our engineers will review your design and suggest adjustments or alternative processes to help you achieve the best result.",
          },
        ].map((item, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            whileHover={{ y: -4, scale: 1.01 }}
            className="relative flex items-start gap-4 md:gap-6"
          >
            {/* Timeline icon */}
            <div className="flex flex-col items-center">
              <div className="w-10 h-10 rounded-full bg-white shadow-md border border-blue-200 flex items-center justify-center z-10">
                <span className="text-lg font-bold text-blue-700">?</span>
              </div>
              {/* Connector line for mobile */}
              {index !== 4 && (
                <div className="md:hidden w-px flex-1 bg-gradient-to-b from-blue-200 to-transparent" />
              )}
            </div>

            {/* QnA Card */}
            <div className="flex-1 bg-white/90 backdrop-blur rounded-2xl shadow-md border border-gray-100 p-5 md:p-6 transition-all duration-300 hover:shadow-xl hover:border-blue-400">
              <h3 className="text-lg md:text-xl font-semibold text-gray-900">
                {item.q}
              </h3>
              <p className="mt-2 text-gray-700 leading-relaxed">
                {item.a}
              </p>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  </div>
</section>

    </div>
  );
};

export default SLSPage;
