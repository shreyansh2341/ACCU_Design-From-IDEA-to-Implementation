import React, { useState } from 'react';
import { SLink } from '@/components/SLink';
import { FaCheckCircle, FaCheckSquare } from 'react-icons/fa';

 
const articles = [
  {
    title: 'Abrasive Vs Pure Waterjet Sheet Metal Cutting: Which Is Better?',
    excerpt:
      'Many processes may be utilized to cut sheet metal or other material stock...',
    image: '/images/waterjet.jpg',
  },
  {
    title: '316 vs 304 Steel: Choosing Between Two Great Metals',
    excerpt:
      'Steel is an alloy composed primarily of iron and carbon that’s rigid and sturdy...',
    image: '/images/steel-pipe.jpg',
  },
  {
    title: '7 Methods to Cut Costs for Low-Volume Production',
    excerpt:
      'In manufacturing, low-volume production comes with unique challenges and opportunities...',
    image: '/images/drone.jpg',
  },
];
// Features and Services
const features = [
  "Rapid prototyping with high precision",
  "Wide range of 3D printing materials",
  "Complex geometries with no tooling",
  "Upload your CAD and get instant quote",
  "Functional parts ready in 1-2 days",
];
const finishingOptions = [
  {
    name: "Chem Film",
    image: "/images/chem-film.jpg",
    materials: "Aluminum",
    colors: "Clear, gold",
    appliedWith: "Media Blasting, Tumbling, Type II Anodizing* Type III Anodizing with PTFE*",
  },
  {
    name: "Anodizing",
    image: "/images/anodizing.jpg",
    materials: "Aluminum",
    colors: "Clear, black, grey, red, blue, gold",
    appliedWith: "Media Blasting, Tumbling, Chem film*",
  },
  {
    name: "Black Oxide",
    image: "/images/black-oxide.jpg",
    materials: "Steel, Stainless Steel",
    colors: "Black",
    appliedWith: "Media Blasting, Tumbling, Passivation",
  },
  {
    name: "Electroless Nickel",
    image: "/images/electroless-nickel.jpg",
    materials: "Aluminum, Steel",
    colors: "—",
    appliedWith: "Media Blasting, Tumbling",
  },
  {
    name: "Zinc Plating",
    image: "/images/zinc-plating.jpg",
    materials: "Steel, Stainless Steel",
    colors: "Clear, blue, yellow, black",
    appliedWith: "Media Blasting, Tumbling",
  },
  {
    name: "Passivation",
    image: "/images/passivation.jpg",
    materials: "Stainless Steel",
    colors: "Natural",
    appliedWith: "Tumbling, Black Oxide",
  },
  {
    name: "Powder Coating",
    image: "/images/powder-coating.jpg",
    materials: "Aluminum, Steel",
    colors: "Various (customizable)",
    appliedWith: "Tumbling, Anodizing*",
  },
  {
    name: "Bead Blasting",
    image: "/images/bead-blasting.jpg",
    materials: "Aluminum, Steel, Stainless Steel",
    colors: "Matte texture",
    appliedWith: "Anodizing, Chem Film",
  },
  {
    name: "Polishing",
    image: "/images/polishing.jpg",
    materials: "Aluminum, Stainless Steel",
    colors: "Bright, reflective",
    appliedWith: "Tumbling, Electropolishing",
  },
  {
    name: "Brushed Finish",
    image: "/images/brushed-finish.jpg",
    materials: "Aluminum, Stainless Steel",
    colors: "Metallic lines",
    appliedWith: "Anodizing, Powder Coating",
  },
];
const services = [
  {
    title: "Cutting",
    description: "Laser cutting, plasma cutting, CNC turret, punching, shearing, water jet cutting",
    image: "/images/cutting.jpg",
  },
  {
    title: "Forming",
    description: "Press brake bending, stamping, rolling, custom form dies",
    image: "/images/forming.jpg",
  },
  {
    title: "Welding",
    description: "MIG welding, TIG welding, Spot welding, Robotic welding",
    image: "/images/welding.jpg",
  },
  {
    title: "Finishing",
    description: "Full RAL catalog Powder Coating, Plating, Media Blasting",
    image: "/images/finishing.jpg",
  },
];

// Material Tabs Data
const materials = {
  Aluminum: {
    name: "Aluminum",
    description:
      "Aluminum is a lightweight and highly versatile material that is widely used in various industries. It offers a unique combination of properties including high strength-to-weight ratio, excellent corrosion resistance, malleability, and good thermal and electrical conductivity.",
    image: "https://res.cloudinary.com/dxrryep5y/image/upload/v1753295633/website_static_media/aluminium.jpg",
  },
  Brass: {
    name: "Brass",
    description:
      "Brass is an alloy of copper and zinc, known for its excellent machinability, corrosion resistance, and attractive gold-like appearance.",
    image: "https://res.cloudinary.com/dxrryep5y/image/upload/v1753295650/website_static_media/brass.jpg",
  },
  Bronze: {
    name: "Bronze",
    description:
      "Bronze, an alloy of copper and tin, is valued for its toughness, wear resistance, and corrosion resistance in marine environments.",
    image: "https://res.cloudinary.com/dxrryep5y/image/upload/v1753295651/website_static_media/bronze.jpg",
  },
  Copper: {
    name: "Copper",
    description:
      "Copper is highly conductive and corrosion-resistant, ideal for electrical and thermal applications, and widely used in architecture.",
    image: "https://res.cloudinary.com/dxrryep5y/image/upload/v1753295662/website_static_media/copper.jpg",
  },
  "Stainless Steel": {
    name: "Stainless Steel",
    description:
      "Stainless steel offers high strength, corrosion resistance, and clean aesthetics, making it perfect for medical, food-grade, and industrial applications.",
    image: "https://res.cloudinary.com/dxrryep5y/image/upload/v1753295749/website_static_media/stainless.jpg",
  },
  Steel: {
    name: "Steel",
    description:
      "Steel is strong, durable, and affordable, making it ideal for construction, automotive, and manufacturing applications.",
    image: "https://res.cloudinary.com/dxrryep5y/image/upload/v1753295750/website_static_media/steel.jpg",
  },
  Titanium: {
    name: "Titanium",
    description:
      "Titanium is incredibly strong, lightweight, and corrosion-resistant, ideal for aerospace, medical, and high-performance parts.",
    image: "https://res.cloudinary.com/dxrryep5y/image/upload/v1753295762/website_static_media/Titanium.jpg",
  },
};

const SheetMetal = () => {
  const [activeMaterial, setActiveMaterial] = useState("Aluminum");

  return (
    <div>

      {/* HERO SECTION */}
      <section className="flex flex-col-reverse lg:flex-row items-center justify-between px-6 lg:px-20 py-16 gap-8 bg-white">
        <div className="max-w-xl">
          <h1 className="text-4xl lg:text-5xl font-bold text-gray-800 mb-6">Sheet Metal Services</h1>
          <p className="text-lg text-gray-700 mb-6">
            Fictiv’s sheet metal solutions deliver the consistency, reliability, durability, and quality you expect from Accu Design.
          </p>
          <button className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-3 px-6 rounded-md text-lg mb-2">
            Get Instant Sheet Metal Quote
          </button>
          <p className="text-sm text-gray-600 mt-2">Quality inspections on every part</p>

          <div className="flex flex-wrap items-center gap-6 mt-10">
            {["Teledyne-1", "Amazon_Robotics-1", "Joby-1", "Meta-1", "Johnson-and-Johnson-1"].map((logo, i) => (
              <img key={i} src={`https://fictiv.com/wp-content/uploads/2022/09/${logo}.png`} alt={logo} className="h-6" />
            ))}
          </div>
        </div>
        <div className="flex-1 flex justify-center">
          <img src="https://res.cloudinary.com/dxrryep5y/image/upload/v1753295746/website_static_media/sheet-metal-part.jpg" alt="Sheet Metal Part" className="w-full max-w-md lg:max-w-xl" />
        </div>
      </section>

      {/* FEATURES */}
      <div className="bg-[#111827] text-white py-10">
        <div className="max-w-7xl mx-auto flex flex-wrap justify-center gap-10 text-center px-4">
          {features.map((item, index) => (
            <div key={index} className="flex items-start gap-3 max-w-xs">
              <FaCheckCircle className="text-blue-500 mt-1" size={20} />
              <span className="text-lg leading-snug">{item}</span>
            </div>
          ))}
        </div>
      </div>

      {/* SERVICES GRID */}
      <section className="bg-gray-100 py-16 px-6 lg:px-20">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-12">Our Sheet Metal Services</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {services.map((service, index) => (
            <div key={index} className="bg-white rounded shadow hover:shadow-xl transition-shadow duration-300">
              <img src={service.image} alt={service.title} className="w-full h-40 object-cover rounded-t" />
              <div className="p-4">
                <h3 className="text-lg font-semibold text-gray-800 mb-2">{service.title}</h3>
                <p className="text-sm text-gray-600">{service.description}</p>
              </div>
            </div>
          ))}
        </div>
        <div className="flex flex-col sm:flex-row justify-center items-center gap-4">
          <button className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-md">
            Get Instant Quote
          </button>
          <button className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-md">
            Steel Sheet Manufacturing Guide
          </button>
        </div>
      </section>

      {/* WHY ACCU DESIGN */}
      <div className="w-full flex justify-center bg-blue-50 py-10">
        <section className="bg-blue-500 text-white rounded-md px-6 py-8 w-full max-w-4xl">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="md:w-1/2 space-y-3">
              <h2 className="text-2xl font-bold">Why Accu Design for Sheet Metal</h2>
              <p className="text-sm text-white/90">Sourcing simplified for custom sheet metal manufacturing</p>
              <p className="text-base font-semibold">1–500+ Parts As Fast As 2 Days</p>
              <ul className="space-y-1 text-sm">
                {[
                  "Guided expertise available pre- and post-sale",
                  "Flexible application options",
                  "Tolerances as low as ±0.005″",
                  "Variety of metals (aluminum, steel, brass, copper)",
                  "Cutting, forming, welding",
                  "Finishing options (Anodizing, Chem Film, Plating, Powder Coating, etc.)",
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <FaCheckSquare className="mt-0.5" /> {item}
                  </li>
                ))}
              </ul>
            </div>
            <div className="md:w-1/2 flex justify-center">
              <img src="https://res.cloudinary.com/dxrryep5y/image/upload/v1753295726/website_static_media/metal.jpg" alt="Sheet Metal" className="w-60 rounded" />
            </div>
          </div>
        </section>
      </div>

      {/* MATERIAL TABS SECTION */}
      <section className="bg-white py-16 px-6 lg:px-20">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-8">Sheet Metal Materials</h2>
        <div className="flex flex-wrap justify-center gap-4 mb-10">
          {Object.keys(materials).map((material) => (
            <button
              key={material}
              onClick={() => setActiveMaterial(material)}
              className={`px-4 py-2 rounded-md border ${
                activeMaterial === material
                  ? "bg-blue-600 text-white font-semibold"
                  : "bg-white text-gray-700 border-gray-300 hover:bg-gray-100"
              }`}
            >
              {material}
            </button>
          ))}
        </div>
        <div className="flex flex-col lg:flex-row gap-8 items-center">
          <div className="lg:w-1/2">
            <h3 className="text-2xl font-bold text-gray-800 mb-4">{materials[activeMaterial].name}</h3>
            <p className="text-gray-700 text-base">{materials[activeMaterial].description}</p>
          </div>
          <div className="lg:w-1/2">
            <img
  src={materials[activeMaterial].image}
  alt={materials[activeMaterial].name}
  className="w-full max-w-md mx-auto rounded shadow"
/>

          </div>
        </div>
      </section>
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
     <div className="relative bg-black text-white py-24 overflow-hidden">
      {/* Decorative SVG background elements */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none z-0">
        <img
          src=" https://res.cloudinary.com/dxrryep5y/image/upload/v1753295664/website_static_media/deco.jpg"
          alt="Decorative Left"
          className="absolute top-10 left-0 w-48 opacity-50"
        />
        <img
          src="https://res.cloudinary.com/dxrryep5y/image/upload/v1753295665/website_static_media/decorate.jpg"
          alt="Decorative Right"
          className="absolute bottom-0 right-0 w-48 opacity-50"
        />
      </div>

      {/* Main Content */}
      <div className="relative z-10 text-center px-4">
        <h1 className="text-4xl md:text-6xl font-bold mb-8">
          Let’s CNC Something Great, Together
        </h1>
        <button className="bg-blue-500 hover:bg-blue-600 text-black font-semibold py-3 px-6 rounded-md transition duration-300">
          Get A CNC Quote Now
        </button>
      </div>
    </div>
      <section className="bg-gray-100 py-12 px-4 md:px-16">
      <h2 className="text-3xl md:text-4xl font-bold text-center mb-10">
        Learn More About Sheet Metal
      </h2>
      <div className="grid md:grid-cols-3 gap-8">
        {articles.map((article, index) => (
          <div
            key={index}
            className="bg-white rounded-lg shadow-md overflow-hidden transform transition duration-300 hover:shadow-xl hover:-translate-y-1"
          >
            <div className="overflow-hidden">
              <img
                src={article.image}
                alt={article.title}
                className="w-full h-52 object-cover transition-transform duration-300 hover:scale-105"
              />
            </div>
            <div className="p-6">
              <h3 className="text-lg font-semibold text-gray-800 mb-2">
                {article.title}
              </h3>
              <p className="text-sm text-gray-600">{article.excerpt}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
    </div>
  );
};

export default SheetMetal;
