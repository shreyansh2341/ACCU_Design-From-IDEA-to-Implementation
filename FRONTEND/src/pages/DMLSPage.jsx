import { motion } from "framer-motion";
import { SLink } from "../components/SLink";

const DMLSPage = () => {
  return (
    <div className="w-full min-h-screen bg-gray-50 flex flex-col">
      
      {/* Hero Section */}
      <section className="w-full py-20 text-center text-white px-4 bg-gradient-to-b from-blue-700 to-blue-900">
        <motion.h1
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-4xl md:text-5xl font-bold mb-6"
        >
          DMLS (Metal 3D Printing)
        </motion.h1>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.8 }}
          className="max-w-4xl mx-auto text-lg leading-relaxed"
        >
          Direct Metal Laser Sintering (DMLS) is an advanced additive manufacturing process 
          that creates fully functional metal parts by fusing fine metal powder layer by layer 
          using a high-powered laser. This technology allows for the production of highly complex, 
          durable, and precise metal components directly from a CAD design.
        </motion.p>
      </section>

      {/* Full Product Information */}
      <section className="max-w-6xl mx-auto py-16 px-6 md:px-12 space-y-12 bg-white rounded-t-3xl shadow-lg -mt-10 z-10">
        
        {/* What is DMLS */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
        >
          <h2 className="text-3xl md:text-4xl font-bold text-blue-800 mb-4">
            What is DMLS 3D Printing?
          </h2>
          <p className="text-gray-700 leading-relaxed">
            Direct Metal Laser Sintering (DMLS) is an additive manufacturing process that uses a high-powered laser to fuse fine metal powder into fully dense, functional parts. By building objects layer by layer directly from a CAD model, DMLS enables the creation of complex geometries that would be impossible or costly with traditional manufacturing.
          </p>
        </motion.div>

        {/* Key Features */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
        >
          <h2 className="text-3xl md:text-4xl font-bold text-blue-800 mb-4">
            Key Features
          </h2>
          <ul className="list-disc pl-6 space-y-2 text-gray-700">
            <li>Produces fully dense, high-strength metal parts</li>
            <li>Supports complex internal structures and fine details</li>
            <li>No need for molds or traditional tooling</li>
            <li>Excellent mechanical properties and precision</li>
          </ul>
        </motion.div>

        {/* Materials */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
        >
          <h2 className="text-3xl md:text-4xl font-bold text-blue-800 mb-4">
            Compatible Materials
          </h2>
          <p className="text-gray-700 leading-relaxed">
            DMLS works with a variety of metal powders, each suited for different applications:
          </p>
          <ul className="list-disc pl-6 mt-3 space-y-2 text-gray-700">
            <li><b>Aluminum Alloys</b> – Lightweight with good strength-to-weight ratio</li>
            <li><b>Stainless Steel</b> – High corrosion resistance and durability</li>
            <li><b>Titanium Alloys</b> – Excellent strength and biocompatibility</li>
            <li><b>Cobalt-Chrome</b> – High wear and heat resistance</li>
            <li><b>Tool Steels</b> – For manufacturing and cutting applications</li>
          </ul>
        </motion.div>

        {/* Applications */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
        >
          <h2 className="text-3xl md:text-4xl font-bold text-blue-800 mb-4">
            Applications
          </h2>
          <ul className="list-disc pl-6 space-y-2 text-gray-700">
            <li>Aerospace components requiring lightweight and strong materials</li>
            <li>Medical implants and surgical instruments</li>
            <li>Automotive high-performance parts</li>
            <li>Custom tooling and functional prototypes</li>
          </ul>
        </motion.div>

        {/* Advantages */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
        >
          <h2 className="text-3xl md:text-4xl font-bold text-blue-800 mb-4">
            Advantages of DMLS
          </h2>
          <ul className="list-disc pl-6 space-y-2 text-gray-700">
            <li>Short production lead times</li>
            <li>Reduced material waste compared to subtractive manufacturing</li>
            <li>High design freedom for complex shapes</li>
            <li>Consistent and repeatable part quality</li>
          </ul>
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
          Ready to Manufacture in Metal with DMLS?
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mt-2 text-blue-100 max-w-xl mx-auto"
        >
          Contact us to discuss your project and get high-precision metal parts produced quickly.
        </motion.p>
        <SLink
          to="/get-quote"
          className="inline-block bg-white text-blue-800 font-semibold px-6 py-3 rounded-xl shadow hover:bg-gray-100 transition mt-8"
        >
          Get a Quote
        </SLink>
      </section>
    {/* Why Choose Us Section */}
<section className="w-full bg-gray-100 py-16 px-6">
  <div className="max-w-6xl mx-auto text-center">
    <motion.h2
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="text-3xl md:text-4xl font-bold text-blue-800 mb-8"
    >
      Why Choose Our DMLS Service?
    </motion.h2>

    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-left">
      <div className="bg-white p-6 rounded-2xl shadow">
        <h3 className="text-xl font-semibold text-blue-700 mb-2">Industrial-Grade Quality</h3>
        <p className="text-gray-700">
          We use professional-grade DMLS machines to ensure excellent strength, accuracy, and surface finish.
        </p>
      </div>

      <div className="bg-white p-6 rounded-2xl shadow">
        <h3 className="text-xl font-semibold text-blue-700 mb-2">Fast Turnaround</h3>
        <p className="text-gray-700">
          Rapid production without molds or tooling helps you save time and reach the market faster.
        </p>
      </div>

      <div className="bg-white p-6 rounded-2xl shadow">
        <h3 className="text-xl font-semibold text-blue-700 mb-2">Expert Engineering Support</h3>
        <p className="text-gray-700">
          Our engineers review your design to ensure optimal printability and strength.
        </p>
      </div>
    </div>
  </div>
</section>

{/* How It Works Section */}
<section className="w-full bg-white py-16 px-6">
  <div className="max-w-6xl mx-auto text-center">
    <motion.h2
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="text-3xl md:text-4xl font-bold text-blue-800 mb-10"
    >
      How Our DMLS Process Works
    </motion.h2>

    <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
      <div className="p-5 rounded-xl shadow bg-gray-50">
        <h4 className="font-semibold text-blue-700 mb-2">1. Upload Design</h4>
        <p className="text-gray-700">Submit your CAD file for review.</p>
      </div>

      <div className="p-5 rounded-xl shadow bg-gray-50">
        <h4 className="font-semibold text-blue-700 mb-2">2. Engineering Analysis</h4>
        <p className="text-gray-700">We verify strength, tolerances, and feasibility.</p>
      </div>

      <div className="p-5 rounded-xl shadow bg-gray-50">
        <h4 className="font-semibold text-blue-700 mb-2">3. Metal Printing</h4>
        <p className="text-gray-700">Laser sintering builds the part layer by layer.</p>
      </div>

      <div className="p-5 rounded-xl shadow bg-gray-50">
        <h4 className="font-semibold text-blue-700 mb-2">4. Finishing & Delivery</h4>
        <p className="text-gray-700">Post-processing and fast shipping.</p>
      </div>
    </div>
  </div>
</section>

{/* Mini FAQ Section */}
<section className="w-full py-16 px-6">
  <div className="max-w-5xl mx-auto">
    <motion.h2
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="text-3xl md:text-4xl font-bold text-center text-blue-800 mb-10"
    >
      Frequently Asked Questions
    </motion.h2>

    <div className="space-y-6">
      <div className="bg-white p-6 rounded-xl shadow">
        <h4 className="font-semibold text-blue-700 mb-1">Is DMLS stronger than CNC parts?</h4>
        <p className="text-gray-700">
          DMLS parts have excellent mechanical properties and can match or exceed CNC strength for many applications.
        </p>
      </div>

      <div className="bg-white p-6 rounded-xl shadow">
        <h4 className="font-semibold text-blue-700 mb-1">What file formats do you accept?</h4>
        <p className="text-gray-700">
          We accept STL, STEP, IGES, and most major CAD formats.
        </p>
      </div>

      <div className="bg-white p-6 rounded-xl shadow">
        <h4 className="font-semibold text-blue-700 mb-1">Can you handle low-volume production?</h4>
        <p className="text-gray-700">
          Yes! DMLS is ideal for low-volume, high-performance metal parts.
        </p>
      </div>
    </div>
  </div>
</section>
    </div>
    
  );
};

export default DMLSPage;
