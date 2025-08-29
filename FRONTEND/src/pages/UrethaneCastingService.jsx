import React, { useState } from 'react';
import {
  FaCheckCircle,
  FaCogs,
  FaPuzzlePiece,
  FaDraftingCompass,
} from 'react-icons/fa';

// Features data
const features = [
  {
    icon: FaCogs,
    title: 'Production Quality at Low Volumes',
    description:
      'This process is a quick, cost-effective way to produce 10-200 units with production-level quality. Typically, each silicone mold will produce 20 castings.',
  },
  {
    icon: FaPuzzlePiece,
    title: 'Complex Elastomeric Parts',
    description:
      'Urethane casting is ideal for prototyping elastomeric parts such as complex gaskets and overmolds on rigid parts.',
  },
  {
    icon: FaDraftingCompass,
    title: 'High Level of Detail',
    description:
      'Urethane casting allows for almost limitless complexity, including sharp internal corners unachievable with CNC machining, and designs without draft or uniform wall-thickness that can’t be injection molded.',
  },
];

const data = {
  Materials: {
    'ABS-Like': {
      title: 'ABS-Like',
      image: '/images/abs-like.jpg',
      properties: {
        Hardness: '75-85 Shore D',
        'Tensile Strength (Mpa)': '42-73',
        'Elongation %': '16-21',
        'Impact Strength': '12 kJ/m² (0.58–2 ft-lb/in)',
      },
    },
    'Acrylic-Like': {
      title: 'Acrylic-Like',
      image: '/images/acrylic-like.jpg',
      properties: {
        Hardness: '80-90 Shore D',
        'Tensile Strength (Mpa)': '55-75',
        'Elongation %': '8-12',
        'Impact Strength': '10 kJ/m²',
      },
    },
    Acrylic: {
      title: 'Acrylic',
      image: '/images/acrylic.jpg',
      properties: {
        Hardness: '80-90 Shore D',
        'Tensile Strength (Mpa)': '55-75',
        'Elongation %': '8-12',
        'Impact Strength': '10 kJ/m²',
      },
    },
  },
  Finishes: {
    'Smooth Finish': {
      title: 'Smooth Finish',
      image: '/images/smooth-finish.jpg',
      properties: {
        Description: 'Surface smoothed for aesthetic and functional use.',
        Method: 'Media blasting or manual polishing',
      },
    },
    'Textured Finish': {
      title: 'Textured Finish',
      image: '/images/textured-finish.jpg',
      properties: {
        Description: 'Rough or patterned surface for grip or style.',
        Method: 'Mold or post-processing treatment',
      },
    },
  },
  'Secondary Options': {
    'Insert Molding': {
      title: 'Insert Molding',
      image: '/images/insert-molding.jpg',
      properties: {
        Description: 'Metal or threaded inserts embedded into parts.',
      },
    },
    Overmolding: {
      title: 'Overmolding',
      image: '/images/overmolding.jpg',
      properties: {
        Description: 'Secondary material molded over a primary substrate.',
      },
    },
  },
};

const stages = [
  {
    title: 'Concept stage',
    description:
      'Looks-like models for marketing photography, investor pitches, and trade shows.',
  },
  {
    title: 'Early prototyping stage',
    description: 'Prototype elastomeric parts such as complex gaskets.',
  },
  {
    title: 'Late prototyping stage',
    description:
      'Cost-effective way to produce 100 EVT units before cutting injection molding tool.',
  },
  {
    title: 'Low-volume production',
    description:
      'Customized, small-batch production (20–200 units at a time) with production-level quality.',
  },
];

const UrethaneCastingService = () => {
  const mainTabs = Object.keys(data);
  const [activeMainTab, setActiveMainTab] = useState('Materials');
  const [activeSubTab, setActiveSubTab] = useState(
    Object.keys(data['Materials'])[0]
  );

  const handleMainTabChange = (tab) => {
    setActiveMainTab(tab);
    setActiveSubTab(Object.keys(data[tab])[0]);
  };

  const activeContent = data[activeMainTab][activeSubTab];

  return (
    <div className="bg-white">
      {/* HERO SECTION */}
      <section className="py-16 px-6 md:px-20 flex flex-col md:flex-row items-center justify-between gap-10">
        <div className="max-w-xl">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-6">
            Urethane Casting <br /> Service
          </h1>
          <ul className="space-y-4 text-lg text-gray-700 mb-6">
            {[
              'Instant quotes & DFM feedback',
              'Production grade quality',
              'Parts as fast as 7 days',
            ].map((text, idx) => (
              <li key={idx} className="flex items-center gap-3">
                <FaCheckCircle className="text-blue-500 text-xl" />
                <span>{text}</span>
              </li>
            ))}
          </ul>
          <button className="bg-blue-500 hover:bg-blue-600 text-white font-semibold px-6 py-3 rounded-sm transition">
            Get Instant Urethane Casting Quote
          </button>
          <p className="mt-2 text-sm text-gray-700">
            No minimum order quantities
          </p>
        </div>

        <div className="w-full md:w-1/2">
          <img
            src="https://res.cloudinary.com/dxrryep5y/image/upload/v1753295765/website_static_media/Urethane_Casting.jpg"
            alt="Urethane part"
            className="w-full object-contain rounded-md"
          />
        </div>
      </section>

      {/* FEATURES SECTION */}
      <section className="bg-gray-100 py-14 px-6">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="bg-white shadow-md p-8 rounded-lg text-center hover:shadow-lg transition-shadow"
            >
              <div className="flex justify-center mb-4 text-blue-500 text-4xl">
                {React.createElement(feature.icon)}
              </div>
              <h3 className="text-lg font-semibold mb-2">{feature.title}</h3>
              <p className="text-gray-600 text-sm">{feature.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* TABS SECTION */}
      <section className="px-6 md:px-20 pt-16 pb-10">
        <div className="flex flex-wrap justify-center gap-4 mb-4">
          {mainTabs.map((tab) => (
            <button
              key={tab}
              onClick={() => handleMainTabChange(tab)}
              className={`px-6 py-2 rounded-full font-medium transition ${
                activeMainTab === tab
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-300 text-gray-800'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        <p className="text-lg text-center font-bold uppercase tracking-widest mb-4">
          Urethane Casting {activeMainTab}
        </p>

        <div className="flex flex-wrap justify-center gap-2 mb-6">
          {Object.keys(data[activeMainTab]).map((subTab) => (
            <button
              key={subTab}
              onClick={() => setActiveSubTab(subTab)}
              className={`px-4 py-1 border rounded transition ${
                activeSubTab === subTab
                  ? 'bg-blue-500 text-white border-transparent'
                  : 'bg-white text-gray-700 border-gray-300'
              }`}
            >
              {subTab}
            </button>
          ))}
        </div>

        <div className="flex flex-col md:flex-row items-center justify-center gap-6 bg-gray-100 p-6 rounded-lg shadow">
          <div className="flex-1 text-center md:text-left">
            <h2 className="text-2xl font-bold mb-4">{activeContent.title}</h2>
            <ul className="list-disc list-inside text-gray-800 space-y-1">
              {Object.entries(activeContent.properties).map(([key, value]) => (
                <li key={key}>
                  <strong>{key}:</strong> {value}
                </li>
              ))}
            </ul>
          </div>

          <img
            src={activeContent.image}
            alt={activeContent.title}
            className="w-full md:w-1/3 rounded object-cover"
          />
        </div>
      </section>

      {/* ADVANTAGES SECTION */}
      <section className="bg-white py-20 px-6 text-center">
        <div className="max-w-7xl mx-auto">
          <p className="text-lg text-gray-500 uppercase tracking-widest mb-4 font-semibold">
            ACCU DESIGN URETHANE CASTING ADVANTAGES
          </p>
          <h2 className="text-5xl font-bold text-gray-800 mb-16">
            From Prototype to Production
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 border-t pt-12">
            {stages.map((stage, index) => (
              <div key={index} className="px-6">
                <h3 className="text-xl font-semibold text-gray-700 mb-4">
                  {stage.title}
                </h3>
                <p className="text-lg text-gray-600 leading-relaxed">
                  {stage.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* TECHNOLOGY OVERVIEW */}
      <section className="w-full bg-white py-12">
        <div className="max-w-5xl mx-auto px-4 text-gray-800">
          <p className="text-sm text-gray-500 uppercase text-center mb-2 font-medium">
            Technology Overview
          </p>
          <h2 className="text-3xl font-bold text-center mb-6">
            What is Urethane Casting
          </h2>

          <div className="mb-6">
            <h3 className="text-lg font-semibold mb-2">
              About the Urethane Casting Process
            </h3>
            <p className="mb-3">
              Urethane casting (also known as RTV molding, cast urethane, and silicone molding)
              is a fabrication method that uses silicone molds to produce production-quality plastic parts.
            </p>
            <p className="mb-2">Urethane Casting production consists of three main steps:</p>
            <ol className="list-decimal list-inside ml-5 space-y-1">
              <li>Build a master pattern using 3D printing or CNC machining</li>
              <li>Build the mold by pouring platinum silicone around master</li>
              <li>Pour liquid polyurethane resin into mold, create polyurethane casting under vacuum</li>
            </ol>
          </div>

          <div className="mb-6">
            <h3 className="text-lg font-semibold mb-2">Advantages of Urethane Casting</h3>
            <p>
              With urethane casting, you can get production quality parts at low volumes and
              without the high costs and lead times of steel or aluminum tooling. This helps you
              test with customers and validate your design before scaling up manufacturing.
            </p>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-1">
              Urethane Casting Design Considerations
            </h3>
            <p>
              If you are familiar with designing parts for injection molding, you can apply the same
              best practices and rules of thumb to design parts for urethane casting.
            </p>
          </div>
        </div>
      </section>
      <div className="relative bg-black text-white py-24 overflow-hidden">
      {/* Decorative SVG background elements */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none z-0">
        <img
          src=" https://res.cloudinary.com/dxrryep5y/image/upload/v1753295664/website_static_media/deco.jpg"
          alt="Decorative Left"
          className="absolute top-10 left-0 w-48 opacity-50"
        />
        <img
          src=" https://res.cloudinary.com/dxrryep5y/image/upload/v1753295665/website_static_media/decorate.jpg"
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
    </div>
  );
};

export default UrethaneCastingService;