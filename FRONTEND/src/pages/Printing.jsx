import React, { useState } from 'react';
import { SLink } from '@/components/SLink';
import { FaCheckCircle } from 'react-icons/fa';
import { FiChevronDown, FiChevronUp } from 'react-icons/fi';

const services = [
  { image: '/images/fdm.jpg', title: 'FDM (Fused Deposition Modeling)', description: 'Affordable 3D printing with durable thermoplastics.' },
  { image: '/images/sla.jpg', title: 'SLA (Stereolithography)', description: 'High-precision parts with smooth surface finishes.' },
  { image: '/images/sls.jpg', title: 'SLS (Selective Laser Sintering)', description: 'Strong, functional parts with complex geometries.' },
  { image: '/images/msla.jpg', title: 'MSLA Printing', description: 'Fast, high-detail printing using LCD light sources.' },
  { image: '/images/dmls.jpg', title: 'DMLS (Metal 3D Printing)', description: 'Industrial-grade parts made from metal powders.' },
];

const features = [
  "Rapid prototyping with high precision",
  "Wide range of 3D printing materials",
  "Complex geometries with no tooling",
  "Upload your CAD and get instant quote",
  "Functional parts ready in 1-2 days",
];

const finishingOptions = [
  { name: 'Sanding', image: '/images/sanding.jpg', materials: 'Plastics', colors: 'N/A', appliedWith: 'FDM, SLA' },
  { name: 'Polishing', image: '/images/polishing.jpg', materials: 'Resins, Metals', colors: 'Glossy Clear, Natural', appliedWith: 'SLA, DMLS' },
  { name: 'Painting', image: '/images/painting.jpg', materials: 'Plastics, Metals', colors: 'Custom', appliedWith: 'FDM, SLS, DMLS' },
];

const faqData = [
  { question: 'What materials do you support?', answer: 'We support PLA, ABS, PETG, Nylon, Resin, and Metals.' },
  { question: 'How fast can I get my parts?', answer: 'Standard delivery is 2-4 days. Expedited delivery available in 1 day.' },
  { question: 'Do you offer post-processing?', answer: 'Yes, we offer sanding, polishing, painting, and more.' },
];

const articles = [
  {
    image: "/images/article1.jpg",
    title: "Rapid CNC Machining vs. Traditional CNC Machining",
    link: "#",
  },
  {
    image: "/images/article2.jpg",
    title: "Precision Machined Parts: ACCU DESIGN Comprehensive Guide",
    link: "#",
  },
  {
    image: "/images/article3.jpg",
    title: "Top 10 Design Tips for Reducing CNC Costs",
    link: "#",
  },
];

const Printing = () => {
  const [openIndex, setOpenIndex] = useState(null);
  const toggleIndex = (index) => setOpenIndex(openIndex === index ? null : index);

  return (
    <div>
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-blue-900 via-blue-800 to-blue-700 text-white">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-blue-800/40 via-blue-900/60 to-black opacity-50" />
        <div className="relative z-10 max-w-7xl mx-auto px-6 py-28 text-center">
          <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight bg-gradient-to-r from-cyan-400 to-blue-300 bg-clip-text text-transparent animate-pulse">
            Professional 3D Printing Services
          </h1>
          <p className="mt-6 text-lg md:text-xl max-w-3xl mx-auto text-blue-100">
            At{" "}
            <span className="font-semibold text-cyan-300">Accu Design</span>, get high-quality 3D printed parts with complex geometries and fast turnaround using the latest additive manufacturing technologies.
            Parts delivered in as fast as 1 day with 99% customer satisfaction.
          </p>
          <div className="mt-8">
            <SLink
              to="/get-quote"
              className="bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-white font-semibold py-3 px-8 rounded-full shadow-lg transition transform hover:scale-105 inline-block"
            >
              Get a 3D Printing  Quote →
            </SLink>
          </div>
        </div>
        <div className="absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-blue-900 to-transparent opacity-50 blur-md" />
      </section>

      {/* Features */}
      <section className="bg-gray-50 py-12">
        <h2 className="text-3xl font-bold text-center mb-8">
          Why Choose Accu Design for 3D Printing Services?
        </h2>
        <div className="max-w-6xl mx-auto flex flex-wrap justify-center gap-6 px-4">
          {features.map((feature, idx) => (
            <div key={idx} className="flex items-start gap-3 max-w-xs">
              <FaCheckCircle className="text-blue-500 mt-1" />
              <span className="text-gray-800">{feature}</span>
            </div>
          ))}
        </div>
      </section>
      {/* SERVICES */}
      <div className="bg-white py-12">
        <h2 className="text-3xl font-semibold text-center mb-8">Our 3D Printing Services</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-5 px-6 md:px-20">
          {services.map((service, index) => (
            <div key={index} className="bg-white shadow-sm rounded-lg overflow-hidden">
              <img src={service.image} alt={service.title} className="w-full h-48 object-cover" />
              <div className="p-4">
                <h3 className="text-lg font-semibold mb-2">{service.title}</h3>
                <p className="text-sm text-gray-600 mb-4">{service.description}</p>
                <a href="#" className="text-blue-600 font-semibold hover:underline">Learn more &gt;</a>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* FINISHING OPTIONS */}
      <div className="py-12 px-4 md:px-16 bg-white">
        <h2 className="text-3xl font-bold text-center mb-8">Finishing Options for 3D Printing</h2>
        <div className="overflow-x-auto">
          <table className="min-w-full table-auto border-collapse border border-gray-200">
            <thead className="bg-blue-200">
              <tr className="text-left text-gray-700 text-sm">
                <th className="p-4">Name</th>
                <th className="p-4">Applicable Materials</th>
                <th className="p-4">Colors</th>
                <th className="p-4">Can Be Applied with</th>
              </tr>
            </thead>
            <tbody>
              {finishingOptions.map((item, index) => (
                <tr key={index} className="border-b border-gray-200">
                  <td className="flex items-center gap-4 p-4">
                    <img src={item.image} alt={item.name} className="w-16 h-16 object-cover rounded" />
                    <span className="text-teal-600 font-medium">{item.name}</span>
                  </td>
                  <td className="p-4 text-gray-700">{item.materials}</td>
                  <td className="p-4 text-gray-700">{item.colors}</td>
                  <td className="p-4 text-gray-700">{item.appliedWith}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* FAQ */}
      <section className="py-12 px-2 max-w-6xl mx-auto">
        <h2 className="text-3xl font-bold text-center mb-10">3D Printing Service FAQs</h2>
        <div className="space-y-4">
          {faqData.map((faq, index) => (
            <div key={index} className="rounded-xl bg-gray-50 hover:shadow-md transition-shadow duration-300">
              <button onClick={() => toggleIndex(index)} className="w-full flex justify-between items-center p-5 text-left text-gray-800 font-medium">
                <span>{faq.question}</span>
                {openIndex === index ? <FiChevronUp className="text-blue-500 text-xl" /> : <FiChevronDown className="text-blue-500 text-xl" />}
              </button>
              {openIndex === index && <div className="px-5 pb-5 text-gray-600 text-sm">{faq.answer}</div>}
            </div>
          ))}
        </div>
      </section>

      {/* CNC Section */}
      <section className="relative bg-blue-500 text-white py-20">
        <div className="absolute inset-0 bg-cover bg-center opacity-30" style={{ backgroundImage: "url('/accuimages/machine.jpeg')" }} />
        <div className="relative z-10 text-center px-4">
          <h1 className="text-4xl md:text-6xl font-bold mb-8">Let’s CNC Something Great, Together</h1>
          <button className="bg-blue-700 hover:bg-blue-800 text-white font-semibold py-3 px-6 rounded-md transition duration-300">Get A CNC Quote Now</button>
        </div>
      </section>

      {/* CNC Articles */}
      <div className="flex flex-wrap gap-6 justify-center py-12">
        {articles.map((article, idx) => (
          <div key={idx} className="max-w-sm rounded overflow-hidden shadow-lg">
            <img src={article.image} alt={article.title} className="w-full h-48 object-cover" />
            <div className="px-6 py-4">
              <div className="font-bold text-xl mb-2">{article.title}</div>
              <SLink to={article.link} className="text-blue-500 hover:underline">
                Read More
              </SLink>
            </div>
          </div>
        ))}
      </div>

      {/* Other Services Buttons */}
      <section className="py-12 bg-gray-50">
        <h2 className="text-3xl font-bold text-center mb-6">
          Explore Our Other Services
        </h2>
        <div className="flex flex-wrap gap-3 mb-10 w-full justify-center px-4">
          {[
            { name: "Machining", path: "/machining" },
            { name: "Laser Cutting", path: "/laser-cutting" },
            { name: "Fabrication", path: "/fabrication" },
            { name: "3D Printing", path: "/3d-printing" },
            { name: "Casting", path: "/casting" },
            { name: "Gear Manufacturing", path: "/gear" },
            { name: "Bending", path: "/bending" },
            { name: "Wire Cutting", path: "/cutting" },
          ].map((btn, index) => (
            <SLink
              to={btn.path}
              key={index}
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-[#f3f7fa] hover:text-[#b36500] hover:font-medium hover:text-lg border border-transparent hover:border-[#b36500] transition-all duration-300"
            >
              {btn.name}
            </SLink>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Printing;
