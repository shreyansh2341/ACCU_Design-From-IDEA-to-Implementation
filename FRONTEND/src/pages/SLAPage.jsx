import { motion } from "framer-motion";
import { SLink } from "../components/SLink";

const SLAPage = () => {
  return (
    <div className="w-full min-h-screen bg-gray-50 flex flex-col">
      
      {/* Hero Section */}
      <section className="w-full py-20 bg-gradient-to-b from-blue-700 to-indigo-900 text-center text-white px-4">
        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-4xl md:text-6xl font-bold"
        >
          Stereolithography (SLA) 3D Printing
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.3 }}
          className="mt-4 text-lg md:text-xl max-w-3xl mx-auto text-blue-100"
        >
          High-resolution resin 3D printing ideal for intricate details, smooth finishes,
          and functional prototypes across product design, medical, and jewelry industries.
        </motion.p>

        {/* Highlight Pills */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="mt-8 flex flex-wrap justify-center gap-3"
        >
          <span className="px-4 py-1 rounded-full bg-white/10 border border-white/20 text-sm">
            Micron-level detail
          </span>
          <span className="px-4 py-1 rounded-full bg-white/10 border border-white/20 text-sm">
            Presentation-ready surfaces
          </span>
          <span className="px-4 py-1 rounded-full bg-white/10 border border-white/20 text-sm">
            Engineering & dental applications
          </span>
        </motion.div>
      </section>

      {/* Main Content Card */}
      <section className="max-w-6xl mx-auto py-16 px-6 md:px-12 space-y-12 bg-white rounded-t-3xl shadow-lg -mt-10 z-10">
        
        {/* What is SLA */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            What is SLA 3D Printing?
          </h2>
          <p className="text-gray-700 leading-relaxed">
            Stereolithography (SLA) is a precision 3D printing process that uses a UV laser to
            selectively cure liquid photopolymer resin, building parts layer by layer. SLA is
            known for its ability to produce highly detailed parts with smooth surface finishes
            and tight tolerances. It is widely used in product design, dental, jewelry, and
            engineering applications where visual quality and accuracy are critical.
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
            <li>Exceptional surface finish and ultra-fine feature resolution</li>
            <li>Ideal for visual prototypes, miniatures, and high-detail models</li>
            <li>Supports transparent, flexible, and engineering-grade resins</li>
            <li>High dimensional accuracy and excellent repeatability</li>
            <li>Great for thin walls, undercuts, and complex organic shapes</li>
          </ul>
        </motion.div>

        {/* Compatible Materials */}
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
            SLA printers use a range of photopolymer resins that can be tuned for different
            performance and visual requirements:
          </p>
          <ul className="list-disc pl-6 mt-3 space-y-2 text-gray-700">
            <li>
              <b>Standard Resin</b> – Smooth finish and ideal for concept models and visual prototypes.
            </li>
            <li>
              <b>Tough Resin</b> – Strong and impact-resistant, suitable for functional testing and snap-fit parts.
            </li>
            <li>
              <b>Flexible Resin</b> – Rubber-like properties for soft-touch, gasket-like or wearable components.
            </li>
            <li>
              <b>Clear Resin</b> – Highly transparent for optical parts, light pipes, and visual flow studies.
            </li>
            <li>
              <b>High Temp Resin</b> – Maintains performance at elevated temperatures for specialized fixtures and functional components.
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
            <li>High-detail prototypes for consumer products and industrial design</li>
            <li>Dental models, surgical guides, and custom medical components</li>
            <li>Miniatures, collectibles, and jewelry masters with sharp details</li>
            <li>Transparent flow models and optical or light-guiding parts</li>
            <li>Functional validation parts using tough or high-temperature resins</li>
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
            Advantages of SLA
          </h2>
          <ul className="list-disc pl-6 space-y-2 text-gray-700">
            <li>Unmatched surface quality compared to most other 3D printing processes</li>
            <li>Excellent for show models, visual prototypes, and fit-check parts</li>
            <li>Wide material portfolio for specific mechanical or thermal needs</li>
            <li>Highly accurate features, thin walls, and small details</li>
            <li>Short lead times for low-volume and custom production runs</li>
          </ul>
        </motion.div>

        {/* SLA vs FDM Quick Comparison */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            SLA vs FDM: When to Choose SLA
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-5 rounded-2xl border border-gray-200">
              <h3 className="font-semibold text-gray-900 mb-3">Choose <span className="text-blue-700">SLA</span> when:</h3>
              <ul className="list-disc pl-5 space-y-1 text-gray-700">
                <li>You need very smooth surfaces and small details</li>
                <li>The part is for visual review, presentation, or fit checks</li>
                <li>Thin walls, organic shapes, or sharp details are required</li>
                <li>Transparent or flexible parts are needed</li>
              </ul>
            </div>
            <div className="p-5 rounded-2xl border border-gray-200 bg-gray-50">
              <h3 className="font-semibold text-gray-900 mb-3">Choose <span className="text-gray-800">FDM</span> when:</h3>
              <ul className="list-disc pl-5 space-y-1 text-gray-700">
                <li>You need more rugged parts at lower cost</li>
                <li>Surface finish is less important than strength</li>
                <li>Large, simple prototypes are required quickly</li>
              </ul>
            </div>
          </div>
        </motion.div>

      </section>

      {/* Footer CTA */}
      <section className="w-full bg-blue-700 py-12 text-center text-white mt-auto">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-2xl md:text-3xl font-bold"
        >
          Interested in High-Detail SLA Prints?
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mt-2 text-blue-100 max-w-xl mx-auto"
        >
          Share your CAD files and application requirements, and we&apos;ll help you choose the ideal resin and settings for the best results.
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
    <section className="w-full bg-gray-100 py-16 px-6">
  <div className="max-w-6xl mx-auto text-center">
    <h2 className="text-3xl font-bold text-blue-800 mb-10">Why Choose Us?</h2>

    <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
      
      <div className="bg-white p-6 rounded-xl shadow 
        transition-all duration-300 ease-in-out 
        hover:-translate-y-2 hover:shadow-2xl hover:scale-105 
        hover:border hover:border-blue-600 cursor-pointer">
        ✅ Industrial Grade Machines
      </div>

      <div className="bg-white p-6 rounded-xl shadow 
        transition-all duration-300 ease-in-out 
        hover:-translate-y-2 hover:shadow-2xl hover:scale-105 
        hover:border hover:border-blue-600 cursor-pointer">
        ✅ Expert Engineers
      </div>

      <div className="bg-white p-6 rounded-xl shadow 
        transition-all duration-300 ease-in-out 
        hover:-translate-y-2 hover:shadow-2xl hover:scale-105 
        hover:border hover:border-blue-600 cursor-pointer">
        ✅ Fast Turnaround
      </div>

      <div className="bg-white p-6 rounded-xl shadow 
        transition-all duration-300 ease-in-out 
        hover:-translate-y-2 hover:shadow-2xl hover:scale-105 
        hover:border hover:border-blue-600 cursor-pointer">
        ✅ Strict Quality Checks
      </div>

    </div>
  </div>
</section>

    </div>
  );
};

export default SLAPage;
