import { motion } from "framer-motion";
import { SLink } from "../components/SLink";

const MSLAPage = () => {
  const fadeUp = (delay = 0) => ({
    initial: { opacity: 0, y: 40 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true },
    transition: { duration: 0.7, delay },
  });

  return (
    <div className="w-full min-h-screen bg-gray-50 flex flex-col">

      {/* Hero Section */}
      <section className="w-full bg-gradient-to-b from-blue-700 to-blue-800 py-20 text-white">
        <div className="max-w-6xl mx-auto px-6 md:px-12 flex flex-col md:flex-row md:items-center gap-12">

          {/* Left Content */}
          <div className="flex-1 text-center md:text-left">
            <motion.h1
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-4xl md:text-6xl font-bold"
            >
              Masked Stereolithography (MSLA)
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.2 }}
              className="mt-5 text-lg max-w-xl mx-auto md:mx-0 text-blue-100"
            >
              High-speed, high-resolution resin 3D printing using an LCD light engine for fast,
              uniform curing of each layer—ideal for precision parts and batch production.
            </motion.p>

            {/* Pills */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="mt-6 flex flex-wrap justify-center md:justify-start gap-3"
            >
              <span className="px-4 py-1 rounded-full bg-white/10 border border-white/30 text-sm">
                LCD Layer Projection
              </span>
              <span className="px-4 py-1 rounded-full bg-white/10 border border-white/30 text-sm">
                High-Speed Printing
              </span>
              <span className="px-4 py-1 rounded-full bg-white/10 border border-white/30 text-sm">
                Ultra-Fine Details
              </span>
            </motion.div>

            {/* CTA */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="mt-8 flex flex-wrap gap-4 justify-center md:justify-start"
            >
              <SLink
                to="/get-quote"
                className="inline-flex items-center justify-center px-6 py-3 rounded-xl bg-white text-blue-800 font-semibold shadow hover:bg-gray-100 transition"
              >
                Get a Quote
              </SLink>

              <SLink
                to="/contact"
                className="inline-flex items-center justify-center px-6 py-3 rounded-xl border border-white/60 text-white font-medium hover:bg-white/10 transition"
              >
                Talk to an Expert
              </SLink>
            </motion.div>
          </div>

          {/* Right Info Card */}
          <motion.div
            initial={{ opacity: 0, y: 40, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.9 }}
            className="flex-1 flex justify-center"
          >
            <div className="bg-white rounded-3xl shadow-xl p-6 border border-blue-100 max-w-md">
              <p className="text-xs uppercase text-blue-600 tracking-widest mb-3 font-semibold">
                MSLA Snapshot
              </p>
              <ul className="space-y-3 text-gray-700 text-sm">
                <li>• Entire layer cured at once using LCD masking</li>
                <li>• Pixel-based resolution for crisp fine details</li>
                <li>• High productivity for batch printing</li>
                <li>• Perfect for dental, miniatures & precision parts</li>
              </ul>
            </div>
          </motion.div>

        </div>
      </section>

      {/* Main Content */}
      <section className="max-w-6xl mx-auto py-16 px-6 md:px-12 space-y-14">

        {/* What is MSLA */}
        <motion.div {...fadeUp(0)}>
          <h2 className="text-3xl md:text-4xl font-bold text-blue-800 mb-4">
            What is MSLA 3D Printing?
          </h2>
          <p className="text-gray-700 leading-relaxed">
            Masked Stereolithography (MSLA) uses an LCD screen as a digital mask to project UV light
            across an entire resin layer at once. This enables high-speed printing while maintaining
            extremely fine resolution and uniform accuracy across the build platform.
          </p>
        </motion.div>

        {/* Features & Applications */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">

          <motion.div {...fadeUp(0.05)} className="bg-white border border-blue-100 rounded-3xl p-6 shadow">
            <h2 className="text-2xl font-bold text-blue-800 mb-4">Key Features</h2>
            <ul className="list-disc pl-6 space-y-2 text-gray-700">
              <li>Faster than traditional laser-based SLA</li>
              <li>High resolution from LCD pixel size</li>
              <li>Uniform layer exposure</li>
              <li>Ideal for batch printing small parts</li>
            </ul>
          </motion.div>

          <motion.div {...fadeUp(0.1)} className="bg-white border border-blue-100 rounded-3xl p-6 shadow">
            <h2 className="text-2xl font-bold text-blue-800 mb-4">Applications</h2>
            <ul className="list-disc pl-6 space-y-2 text-gray-700">
              <li>Miniatures & figurines</li>
              <li>Dental aligner models</li>
              <li>Precision mechanical components</li>
              <li>Small batch production</li>
            </ul>
          </motion.div>

        </div>

        {/* Materials */}
        <motion.div {...fadeUp(0.12)} className="bg-white border border-blue-100 rounded-3xl p-6 shadow">
          <h2 className="text-2xl md:text-3xl font-bold text-blue-800 mb-4">
            Compatible Materials
          </h2>
          <ul className="list-disc pl-6 space-y-2 text-gray-700">
            <li><b>Standard Resin</b> – Smooth surface for visual prototypes</li>
            <li><b>Tough Resin</b> – Stronger parts for functional use</li>
            <li><b>Flexible Resin</b> – Rubber-like flexibility</li>
            <li><b>Clear Resin</b> – Transparent visual models</li>
            <li><b>Specialty Resins</b> – Castable, high-temp & bio-compatible</li>
          </ul>
        </motion.div>

        {/* Advantages + Comparison */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

          <motion.div {...fadeUp(0.14)} className="lg:col-span-2 bg-white border border-blue-100 rounded-3xl p-6 shadow">
            <h2 className="text-2xl md:text-3xl font-bold text-blue-800 mb-4">
              Advantages of MSLA
            </h2>
            <ul className="list-disc pl-6 space-y-2 text-gray-700">
              <li>Very fast layer exposure</li>
              <li>Extremely fine surface finish</li>
              <li>Ideal for mass production of small parts</li>
              <li>Lower running and maintenance costs</li>
            </ul>
          </motion.div>

          <motion.div {...fadeUp(0.18)} className="bg-blue-700 text-white rounded-3xl p-6 shadow">
            <h3 className="text-lg font-semibold mb-3">
              MSLA vs SLA
            </h3>
            <ul className="space-y-2 text-sm">
              <li><b>MSLA:</b> Full-layer LCD curing = faster builds</li>
              <li><b>SLA:</b> Laser point curing = slower but precise</li>
              <li><b>Best for:</b> Batch production & miniatures</li>
            </ul>
          </motion.div>

        </div>
      </section>

      {/* Footer CTA */}
      <section className="w-full bg-blue-800 py-12 text-center text-white mt-auto">
        <motion.h2 {...fadeUp(0)} className="text-2xl md:text-3xl font-bold">
          Ready to Start Your MSLA Project?
        </motion.h2>
        <motion.p {...fadeUp(0.1)} className="mt-2 text-blue-100 max-w-xl mx-auto">
          Upload your design and get precision resin parts delivered fast.
        </motion.p>

        <div className="mt-8 flex justify-center gap-4">
          <SLink
            to="/get-quote"
            className="inline-block bg-white text-blue-800 font-semibold px-6 py-3 rounded-xl shadow hover:bg-gray-100 transition"
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
    {/* Q&A Timeline Section */}
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
      transition={{ duration: 0.6, delay: 0.1 }}
      className="mt-3 text-center text-gray-600 max-w-2xl mx-auto"
    >
      Answers to common questions about our MSLA resin printing and manufacturing services.
    </motion.p>

    <div className="mt-12 relative">
      {/* Vertical line on desktop */}
      <div className="hidden md:block absolute left-6 top-0 bottom-0 w-px bg-gradient-to-b from-blue-300 via-blue-200 to-transparent" />

      <div className="space-y-10">
        {[
          {
            q: "Is my design file kept confidential?",
            a: "Yes. All CAD files and project information are handled securely and are only used to quote and manufacture your parts.",
          },
          {
            q: "Can I order just one MSLA prototype?",
            a: "Absolutely. We support everything from a single detailed prototype to small batch production of multiple parts.",
          },
          {
            q: "Which file formats do you accept for MSLA jobs?",
            a: "We commonly work with STL, STEP and IGES files. If you are unsure, you can still upload your file and our team will guide you.",
          },
          {
            q: "When should I choose MSLA over FDM or SLA?",
            a: "Choose MSLA when you need very high detail on small parts, smooth surfaces, and efficient batch printing of miniatures or dental models.",
          },
          {
            q: "How long will it take to receive my parts?",
            a: "Lead times depend on part size, quantity and finishing, but most MSLA jobs are completed within a few working days after quote approval.",
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

            {/* Q&A Card */}
            <div className="flex-1 bg-white border border-blue-100 rounded-2xl shadow-sm p-5 md:p-6 transition-all duration-300 hover:shadow-lg hover:border-blue-400">
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

export default MSLAPage;
