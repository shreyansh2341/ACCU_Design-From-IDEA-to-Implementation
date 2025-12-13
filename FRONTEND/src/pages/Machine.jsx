import React, { useState } from 'react';
import { SLink } from '@/components/SLink';
import { FiChevronDown, FiChevronUp } from 'react-icons/fi';
import { FaCheckCircle } from 'react-icons/fa';
import toleranceChartPdf from '@/pdf/CNC Tolerance Standards - Accu Design.pdf';

const features = [
  "Precision Engineering",
  "Superior Material Handling",
  "Fast Turnaround Times",
  "Scalable Production",
  "Industry Applications",
];


const finishingOptions = [
  {
    name: "Chem Film",
    materials: "Aluminum",
    colors: "Clear, gold",
    appliedWith: "Media Blasting, Tumbling, Type II Anodizing* Type III Anodizing with PTFE*",
  },
  {
    name: "Anodizing",
    materials: "Aluminum",
    colors: "Clear, black, grey, red, blue, gold",
    appliedWith: "Media Blasting, Tumbling, Chem film*",
  },
  {
    name: "Black Oxide",
    materials: "Steel, Stainless Steel",
    colors: "Black",
    appliedWith: "Media Blasting, Tumbling, Passivation",
  },
  {
    name: "Electroless Nickel",
    materials: "Aluminum, Steel",
    colors: "—",
    appliedWith: "Media Blasting, Tumbling",
  },
  {
    name: "Zinc Plating",
    materials: "Steel, Stainless Steel",
    colors: "Clear, blue, yellow, black",
    appliedWith: "Media Blasting, Tumbling",
  },
  {
    name: "Passivation",
    materials: "Stainless Steel",
    colors: "Natural",
    appliedWith: "Tumbling, Black Oxide",
  },
  {
    name: "Powder Coating",
    materials: "Aluminum, Steel",
    colors: "Various (customizable)",
    appliedWith: "Tumbling, Anodizing*",
  },
  {
    name: "Bead Blasting",
    materials: "Aluminum, Steel, Stainless Steel",
    colors: "Matte texture",
    appliedWith: "Anodizing, Chem Film",
  },
  {
    name: "Polishing",
    materials: "Aluminum, Stainless Steel",
    colors: "Bright, reflective",
    appliedWith: "Tumbling, Electropolishing",
  },
  {
    name: "Brushed Finish",
    materials: "Aluminum, Stainless Steel",
    colors: "Metallic lines",
    appliedWith: "Anodizing, Powder Coating",
  },
];


const faqData = [
  {
    question: "What is your typical lead time for CNC machining orders?",
    answer: "Lead time depends on the complexity and quantity of parts. However, parts can be delivered as fast as 1 day for urgent requirements.",
  },
  {
    question: "What tolerances can your CNC machines achieve?",
    answer: "Our CNC machines can achieve tolerances as tight as ±0.0001 inch, depending on material and part geometry.",
  },
  {
    question: "What types of materials work with your CNC machining services?",
    answer: "We work with metals like aluminum, steel, titanium, brass, and plastics like ABS, nylon, polycarbonate, and PEEK.",
  },
  {
    question: "How do you ensure the confidentiality and security of our designs and intellectual property?",
    answer: "We have strict NDAs, secure file handling protocols, and internal policies to ensure confidentiality and IP protection.",
  },
  {
    question: "Can you accommodate rush orders or expedited delivery for CNC machining?",
    answer: "Yes. We offer expedited production options for urgent needs, with fast-tracked scheduling and delivery.",
  },
  {
    question: "Are you able to work with complex geometries or 2D drawings for CNC?",
    answer: "Yes. Our engineers can handle complex 3D CAD models and 2D drawings in DXF, DWG, or PDF formats.",
  },
  {
    question: "Can you assist with design optimization for manufacturability in CNC machining?",
    answer: "Absolutely. We offer DFM (Design for Manufacturability) feedback to help you reduce costs and improve performance.",
  },
  {
    question: "What certifications or industry standards do you adhere to in your CNC machining processes?",
    answer: "We follow ISO 9001:2015 quality standards and provide material certifications, CMM reports, and inspection data upon request.",
  },
];
const articles = [
  {
    image: "https://res.cloudinary.com/dxrryep5y/image/upload/v1753339710/website_static_media/cnc-comparison-banner.jpg",
    title: "Rapid CNC Machining vs. Traditional CNC Machining",
    link: "RapidVsTraditional",
  },
  {
    image: "https://res.cloudinary.com/dxrryep5y/image/upload/v1764183078/website_static_media/precision_macchining_gempng.png",
    title: "Precision Machined Parts: Accu Desidn Comprehensive Guide",
    link: "PrecisionMachinedParts",
  },
  {
    image: "https://res.cloudinary.com/dxrryep5y/image/upload/v1753339712/website_static_media/cnc-lead-time-tips-banner.jpg",
    title: "Top 10 Design Tips for Reducing CNC Lead Time",
    link: "DesignTipsReduceLeadTime",
  },
];

const services = [
  {
    image: "https://res.cloudinary.com/dxrryep5y/image/upload/v1753295701/website_static_media/images.jpg",
    title: "CNC Milling",
    description: "High precision 3-5 axis milling for complex parts.",
    link: "/CncMillingLearnMore",
  },
  {
    image: "https://res.cloudinary.com/dxrryep5y/image/upload/v1753295732/website_static_media/OIP.jpg",
    title: "CNC Turning",
    description: "Efficient turning solutions for cylindrical parts.",
    link: "/CncTurningLearnMore",
  },
  {
    image: "https://res.cloudinary.com/dxrryep5y/image/upload/v1753295739/website_static_media/proto.jpg",
    title: "Rapid Prototyping",
    description: "Fast turnaround for functional prototype parts.",
    link: "/RapidPrototypingLearnMore",
  },
  {
    image: "https://res.cloudinary.com/dxrryep5y/image/upload/v1753295727/website_static_media/metalmachine.jpg",
    title: "Metal Machining",
    description: "Machining of aluminum, steel, titanium, and more.",
    link: "/MetalMachiningLearnMore",
  },
  {
    image: "https://res.cloudinary.com/dxrryep5y/image/upload/v1753295736/website_static_media/plasticmachine.jpg",
    title: "Plastic Machining",
    description: "Precision machining of a variety of plastics.",
    link: "/PlasticMachiningLearnMore",
  },
];


const Machine = () => {
  const [openIndex, setOpenIndex] = useState(null);
  const toggleIndex = (index) => setOpenIndex(openIndex === index ? null : index);

  return (
    <>
      {/* HERO SECTION */}
      <section className="relative bg-gradient-to-br from-blue-900 via-blue-800 to-blue-700 text-white">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-blue-800/40 via-blue-900/60 to-black opacity-50" />
        <div className="relative z-10 max-w-7xl mx-auto px-6 py-28 text-center">
          <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight bg-gradient-to-r from-cyan-400 to-blue-300 bg-clip-text text-transparent animate-pulse">
            Custom CNC Machining Services
          </h1>
          <p className="mt-6 text-lg md:text-xl max-w-3xl mx-auto text-blue-100">
            At <span className="font-semibold text-cyan-300">ACCU DESIGN</span>,Accelerate prototyping, product development and production with a faster, easier way to get precision CNC machined parts with tolerances as tight as ±0.0001 inch.
            CNC parts manufactured as fast as 1 day with 95.4% of orders delivered on-time and in-full.
          </p>
          <div className="mt-8">
            <SLink
              to="/get-quote"
              className="bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-white font-semibold py-3 px-8 rounded-full shadow-lg transition transform hover:scale-105 inline-block"
            >
              Get a Cnc Machining Quote →
            </SLink>
          </div>
        </div>
        <div className="absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-blue-900 to-transparent opacity-50 blur-md" />
      </section>
      {/* Features */}
      <section className="bg-gray-50 py-12">
        <h2 className="text-3xl font-bold text-center mb-8">
          Why Choose ACCU DESIGN for CNC Machining?
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

      {/* SERVICES SECTION */}
      <div className="bg-white py-12">
        <h2 className="text-3xl font-semibold text-center mb-8">Our CNC Machining Services</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-5 px-6 md:px-20">
          {services.map((service, index) => (
            <div key={index} className="bg-white shadow-sm rounded-lg overflow-hidden">
              <img src={service.image} alt={service.title} className="w-full h-48 object-cover" />
              <div className="p-4">
                <h3 className="text-lg font-semibold mb-2">{service.title}</h3>
                <p className="text-sm text-gray-600 mb-4">{service.description}</p>
                <SLink
                  to={service.link}
                  className="text-blue-600 font-semibold hover:underline"
                >
                  Learn more &gt;
                </SLink>
              </div>
            </div>
          ))}
        </div>
        <div className="flex justify-center mt-10 px-6">
          <SLink
            to="/get-quote"
            className="bg-blue-600 text-white px-6 py-3 rounded-full hover:bg-blue-700 transition font-medium shadow-md"
          >
            Get Instant Quote
          </SLink>
        </div>
      </div>
      {/* Precision Machining Tolerance */}

      <div className="max-w-6xl mx-auto px-4 py-12">
        <h2 className="text-3xl font-semibold text-center mb-8">
          Precision Machining Tolerance
        </h2>
        <div className="overflow-x-auto">
          <table className="min-w-full table-auto border border-gray-200">
            <thead className="bg-blue-200">
              <tr>
                <th className="text-left p-4 border border-gray-200"> </th>
                <th className="text-left p-4 border border-gray-200">
                  Metals, PEEK, And ULTEM with Drawing
                </th>
                <th className="text-left p-4 border border-gray-200">
                  Other Plastics with Drawing
                </th>
                <th className="text-left p-4 border border-gray-200">
                  No Drawing
                </th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-t border-gray-200">
                <td className="p-4 font-medium">Linear Dimension</td>
                <td className="p-4">
                  +/- 0.0025 mm
                  <br />
                  +/- 0.0001 inch
                </td>
                <td className="p-4">
                  +/- 0.05 mm
                  <br />
                  +/- 0.002 inch
                </td>
                <td className="p-4">ISO 2768 Medium</td>
              </tr>
              <tr className="border-t border-gray-200">
                <td className="p-4 font-medium">
                  Hole Diameters
                  <br />
                  <span className="text-sm">(Not Reamed)</span>
                </td>
                <td className="p-4">
                  +/- 0.0025 mm
                  <br />
                  +/- 0.0001 inch
                </td>
                <td className="p-4">
                  +/- 0.05 mm
                  <br />
                  +/- 0.002 inch
                </td>
                <td className="p-4">ISO 2768 Medium</td>
              </tr>
              <tr className="border-t border-gray-200">
                <td className="p-4 font-medium">Shaft Diameters</td>
                <td className="p-4">
                  +/- 0.0025 mm
                  <br />
                  +/- 0.0001 inch
                </td>
                <td className="p-4">
                  +/- 0.05 mm
                  <br />
                  +/- 0.002 inch
                </td>
                <td className="p-4">ISO 2768 Medium</td>
              </tr>
            </tbody>
          </table>
        </div>
        <p className="text-sm text-gray-600 mt-6 text-center max-w-3xl mx-auto">
          Part lengths of up to 48" are available on our platform process dependent. Please inquire about anything larger.
          Tolerances listed here are minimums for an ideal case. Looser tolerances may be required depending on process,
          material choice, or part geometry.
        </p>
        <div className="flex justify-center mt-8">
          <a
            href={toleranceChartPdf}
            download
            className="bg-blue-600 text-white px-6 py-2 rounded-full hover:bg-blue-700 transition inline-block text-center"
          >
            Download Tolerance Chart
          </a>
        </div>
      </div>
      {/* FINISHING OPTIONS */}
      <div className="py-12 px-4 md:px-16 bg-white">
        <h2 className="text-3xl font-bold text-center mb-8">Finishing Options for CNC Machining</h2>
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
                  <td className="p-4 text-blue-600 font-medium">{item.name}</td>
                  <td className="p-4 text-gray-700">{item.materials}</td>
                  <td className="p-4 text-gray-700">{item.colors}</td>
                  <td className="p-4 text-gray-700">{item.appliedWith}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* FAQ SECTION */}
      <section className="py-12 px-2 max-w-6xl mx-auto">
        <h2 className="text-3xl font-bold text-center mb-10">CNC Machining Service FAQs</h2>
        <div className="space-y-4">
          {faqData.map((faq, index) => (
            <div key={index} className="rounded-xl bg-gray-50 hover:shadow-md transition-shadow duration-300">
              <button onClick={() => toggleIndex(index)} className="w-full flex justify-between items-center p-5 text-left text-gray-800 font-medium">
                <span>{faq.question}</span>
                {openIndex === index ? <FiChevronUp className="text-blue-500 text-xl" /> : <FiChevronDown className="text-blue-500 text-xl" />}
              </button>
              {openIndex === index && (
                <div className="px-5 pb-5 text-gray-600 text-sm">{faq.answer}</div>
              )}
            </div>
          ))}
        </div>
      </section>
      <div className="bg-blue-600 text-white py-24 text-center px-4">
        <h1 className="text-4xl md:text-6xl font-bold mb-8">
          Let’s CNC Something Great, Together
        </h1>
        <SLink
          to="/get-quote"
          className="bg-white text-blue-600 font-semibold py-3 px-6 rounded-md hover:bg-gray-100 transition duration-300"
        >
          Get A CNC Quote Now
        </SLink>
      </div>

      <section className="bg-gray-100 py-16 px-4">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-3xl font-semibold mb-12">Learn More About CNC Machining</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {articles.map((article, index) => (
              <div key={index} className="bg-white shadow-sm rounded-md overflow-hidden">
                <img src={article.image} alt={article.title} className="w-full h-56 object-cover" />
                <div className="p-6 text-left">
                  <p className="text-sm text-gray-500 font-semibold mb-2">ARTICLE</p>
                  <h3 className="text-lg font-medium text-gray-800 mb-4">
                    {article.title}
                  </h3>
                  <a
                    href={article.link}
                    className="text-blue-600 hover:underline font-medium"
                  >
                    Read more &gt;
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default Machine;
