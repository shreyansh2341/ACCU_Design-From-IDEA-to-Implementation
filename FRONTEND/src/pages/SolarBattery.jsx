import React, { useState } from "react";
import { FaChevronDown, FaSolarPanel } from "react-icons/fa";
import { SLink } from "@/components/SLink";
import { motion } from "framer-motion";

const faqs = [
  {
    question: "What types of solar systems do you offer?",
    answer:
      "We offer rooftop solar, ground-mounted solar systems, and off-grid solar solutions for residential, commercial, and industrial needs.",
  },
  {
    question: "Do you provide battery backup solutions?",
    answer:
      "Yes, we provide advanced lithium-ion and other battery storage systems to ensure uninterrupted power supply.",
  },
  {
    question: "Do you assist with government subsidies?",
    answer:
      "Absolutely. We help you understand and apply for available government incentives and subsidies for solar installations.",
  },
  {
    question: "Can I monitor my system performance?",
    answer:
      "Yes. Our systems come with smart monitoring tools so you can track energy production and usage in real time.",
  },
];

const phases = [
  {
    name: "Rooftop Solar",
    title: "Efficient Rooftop Solar Systems",
    description:
      "Our rooftop solar solutions maximize your roof’s potential, delivering clean energy directly to your home or business and helping you reduce electricity bills.",
    image:
      "https://res.cloudinary.com/dxrryep5y/image/upload/v1753339755/website_static_media/rooftop.png",
  },
  {
    name: "Ground Mounted Solar",
    title: "Scalable Ground-Mounted Solar Plants",
    description:
      "Ideal for large-scale installations, our ground-mounted solar systems are engineered for optimal sunlight capture, performance, and long-term reliability.",
    image:
      "https://res.cloudinary.com/dxrryep5y/image/upload/v1753339731/website_static_media/ground-solar.jpg",
  },
  {
    name: "Battery Storage",
    title: "Advanced Battery Energy Storage",
    description:
      "Our battery storage solutions ensure power availability during outages, peak tariff periods, and at night, improving energy reliability and cost control.",
    image:
      "https://res.cloudinary.com/dxrryep5y/image/upload/v1753339732/website_static_media/ground-solar1.jpg",
  },
  {
    name: "Hybrid Systems",
    title: "Integrated Solar + Battery Systems",
    description:
      "Hybrid systems combine solar generation with storage to increase self-consumption, enhance energy independence, and optimize your overall energy costs.",
    image:
      "https://res.cloudinary.com/dxrryep5y/image/upload/v1753339737/website_static_media/hybrid-system.png",
  },
];

const fadeUp = {
  hidden: { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0 },
};

const SolarBattery = () => {
  const [openIndex, setOpenIndex] = useState(null);
  const [selected, setSelected] = useState(phases[0].name);

  const currentPhase = phases.find((phase) => phase.name === selected);

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };
  return (
    <div className="bg-slate-50 text-slate-900">
      {/* HERO */}
      <motion.section
        className="w-full bg-gradient-to-r from-blue-50 via-white to-blue-100 border-b border-slate-200"
        initial="hidden"
        animate="visible"
        variants={fadeUp}
        transition={{ duration: 0.5, ease: "easeOut" }}
      >
        <div className="max-w-6xl mx-auto px-4 md:px-6 py-16 md:py-20 flex flex-col-reverse lg:flex-row items-center gap-10">
          {/* Left content */}
          <motion.div
            className="flex-1"
            initial={{ opacity: 0, x: -24 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
          >
            <div className="inline-flex items-center gap-2 rounded-full bg-blue-50 text-blue-700 text-xs font-medium px-3 py-1 mb-4 border border-blue-100">
              <span className="inline-flex h-1.5 w-1.5 rounded-full bg-blue-600" />
              Solar & Battery Solutions
            </div>

            <h1 className="text-3xl md:text-4xl lg:text-5xl font-semibold leading-tight mb-4">
             Power the Future with{" "}
              <span className="text-blue-700">Solar & Storage</span> Solutions
            </h1>

            <p className="text-base md:text-lg text-slate-600 mb-6 max-w-xl">
              End-to-end solar and energy storage systems for residential,
              commercial, and industrial clients. Designed for reliability,
              compliance, and long-term performance.
            </p>

            <div className="flex flex-wrap gap-4 mb-6">
              <motion.div whileHover={{ y: -2 }} transition={{ duration: 0.15 }}>
                <SLink
                  to="/get-started"
                  className="inline-flex items-center justify-center rounded-lg bg-blue-600 text-white px-6 py-3 text-sm md:text-base font-medium shadow-sm hover:bg-blue-700 transition-colors"
                >
                  Get Started
                </SLink>
              </motion.div>

              <motion.div whileHover={{ y: -2 }} transition={{ duration: 0.15 }}>
                <SLink
                  to="/SolarBatteryLearnMore"
                  className="inline-flex items-center justify-center rounded-lg border border-slate-300 bg-white px-6 py-3 text-sm md:text-base font-medium text-slate-800 hover:bg-slate-50 transition-colors"
                >
                  Learn More
                </SLink>
              </motion.div>
            </div>

            <div className="grid grid-cols-3 gap-4 max-w-md text-xs md:text-sm">
              {[
                { label: "Installed capacity", value: "25+ MW" },
                { label: "Industry experience", value: "10+ years" },
                { label: "Client presence", value: "Pan-India" },
              ].map((item) => (
                <div key={item.label}>
                  <p className="font-semibold text-blue-700">{item.value}</p>
                  <p className="text-slate-500">{item.label}</p>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Right image */}
          <motion.div
            className="flex-1 flex justify-center lg:justify-end"
            initial={{ opacity: 0, x: 24 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, ease: "easeOut", delay: 0.1 }}
          >
            <div className="relative">
              <div className="absolute -inset-3 rounded-3xl bg-blue-100 blur-xl" />
              <div className="relative rounded-3xl border border-slate-200 bg-white p-3 shadow-md max-w-md">
                <img
                  src="https://res.cloudinary.com/dxrryep5y/image/upload/v1753339757/website_static_media/Solar_Storage.jpg"
                  alt="Solar and Battery Storage"
                  className="w-full rounded-2xl object-cover"
                />
                <div className="mt-3 flex items-center justify-between text-xs text-slate-600">
                  <div className="flex items-center gap-2">
                    <div className="flex h-7 w-7 items-center justify-center rounded-full bg-blue-50 text-blue-700">
                      <FaSolarPanel />
                    </div>
                    <div>
                      <p className="font-medium text-slate-800">
                        System Monitoring
                      </p>
                      <p>Real-time performance insights</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-slate-500 text-[11px]">
                      Estimated monthly savings
                    </p>
                    <p className="text-sm font-semibold text-blue-700">
                      ₹ 15,000+
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </motion.section>

      {/* WHY CHOOSE US */}
      <section className="py-16 bg-slate-50">
        <div className="max-w-6xl mx-auto px-4 md:px-6">
          <motion.div
            className="text-center mb-10"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            variants={fadeUp}
            transition={{ duration: 0.4 }}
          >
            <p className="text-xs font-semibold tracking-[0.2em] text-blue-600 mb-2 uppercase">
              WHY PARTNER WITH US
            </p>
            <h2 className="text-2xl md:text-3xl font-semibold mb-3 text-slate-900">
              A Structured & Reliable Solar Partner
            </h2>
            <p className="text-sm md:text-base text-slate-600 max-w-2xl mx-auto">
              We combine engineering expertise, high-quality components, and
              professional project management to deliver bankable solar and
              storage projects.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                title: "Engineering-led Design",
                desc: "Every system is designed by qualified engineers to meet site conditions, regulatory norms, and long-term performance goals.",
              },
              {
                title: "Reliable Storage Integration",
                desc: "Battery storage systems are integrated and configured to support backup, peak-load management, and tariff optimization.",
              },
              {
                title: "End-to-End Project Support",
                desc: "From feasibility and subsidies to commissioning and O&M, we support you across the full project lifecycle.",
              },
            ].map((card, idx) => (
              <motion.div
                key={card.title}
                className="bg-white border border-slate-200 rounded-xl p-6 shadow-sm"
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.35, delay: idx * 0.05 }}
              >
                <h3 className="text-lg font-semibold mb-2 text-slate-900">
                  {card.title}
                </h3>
                <p className="text-sm text-slate-600">{card.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-16 bg-white border-t border-slate-200">
        <div className="max-w-3xl mx-auto px-4 md:px-6">
          <motion.div
            className="text-center mb-10"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            variants={fadeUp}
            transition={{ duration: 0.4 }}
          >
            <p className="text-xs font-semibold tracking-[0.2em] text-blue-600 mb-2 uppercase">
              FAQ
            </p>
            <h2 className="text-2xl md:text-3xl font-semibold mb-3 text-slate-900">
              Frequently Asked Questions
            </h2>
            <p className="text-sm md:text-base text-slate-600">
              Key information about our solar and storage offerings.
            </p>
          </motion.div>

          <div className="space-y-3">
            {faqs.map((faq, index) => {
              const isOpen = openIndex === index;
              return (
                <motion.div
                  key={index}
                  className="bg-slate-50 border border-slate-200 rounded-lg overflow-hidden"
                  initial={{ opacity: 0, y: 8 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-60px" }}
                  transition={{ duration: 0.25, delay: index * 0.03 }}
                >
                  <button
                    onClick={() => toggleFAQ(index)}
                    className="w-full flex justify-between items-center px-4 md:px-5 py-3 md:py-4 text-left text-sm md:text-base font-medium text-slate-900"
                  >
                    <span>{faq.question}</span>
                    <FaChevronDown
                      className={`ml-3 text-blue-600 transition-transform duration-200 ${
                        isOpen ? "rotate-180" : ""
                      }`}
                    />
                  </button>
                  {isOpen && (
                    <motion.div
                      className="px-4 md:px-5 pb-4 text-sm text-slate-600 border-t border-slate-200"
                      initial={{ opacity: 0, y: -4 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      {faq.answer}
                    </motion.div>
                  )}
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* GET QUOTE */}
      <SLink to="/get-quote">
        <motion.section
          className="bg-blue-600 text-white py-16 cursor-pointer"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.4 }}
        >
          <div className="max-w-6xl mx-auto px-4 md:px-6 text-center">
            <h2 className="text-2xl md:text-3xl font-semibold mb-3">
              Discuss Your Solar & Storage Requirements
            </h2>
            <p className="text-sm md:text-base mb-6 max-w-2xl mx-auto text-blue-50">
              Share your site details and energy profile. Our team will provide a
              structured proposal with system design, estimation, and timelines.
            </p>
            <motion.button
              className="inline-flex items-center justify-center rounded-lg bg-white text-blue-700 px-7 py-3 text-sm md:text-base font-semibold shadow-sm hover:bg-slate-100 transition-colors"
              whileHover={{ y: -2 }}
              whileTap={{ y: 0 }}
              transition={{ duration: 0.15 }}
            >
              Get an Estimate
            </motion.button>
          </div>
        </motion.section>
      </SLink>

      {/* SYSTEMS SECTION */}
      <section className="max-w-6xl mx-auto px-4 md:px-6 py-20">
        <motion.div
          className="text-center mb-10"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          variants={fadeUp}
          transition={{ duration: 0.4 }}
        >
          <p className="text-xs font-semibold tracking-[0.2em] text-blue-600 mb-2 uppercase">
            SOLUTIONS
          </p>
          <h2 className="text-2xl md:text-3xl font-semibold mb-3 text-slate-900">
            Our Solar & Storage Systems
          </h2>
          <p className="text-sm md:text-base text-slate-600 max-w-2xl mx-auto">
            A modular portfolio designed to address different site conditions,
            scale requirements, and energy objectives.
          </p>
        </motion.div>

        <div className="flex flex-col md:flex-row gap-10 md:gap-12">
          {/* Selector */}
          <motion.div
            className="md:w-1/4"
            initial={{ opacity: 0, x: -16 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.35 }}
          >
            <div className="flex md:flex-col gap-3 md:gap-4">
              {phases.map((phase) => {
                const isActive = selected === phase.name;
                return (
                  <motion.button
                    key={phase.name}
                    onClick={() => setSelected(phase.name)}
                    className={`w-full text-left text-sm font-medium rounded-lg border px-3 py-2 transition-colors ${
                      isActive
                        ? "border-blue-600 bg-blue-50 text-blue-700"
                        : "border-slate-200 bg-white text-slate-700 hover:bg-slate-50"
                    }`}
                    whileHover={{ y: -1 }}
                    transition={{ duration: 0.12 }}
                  >
                    {phase.name}
                  </motion.button>
                );
              })}
            </div>
          </motion.div>

          {/* Content */}
          <motion.div
            className="md:w-3/4 space-y-6"
            initial={{ opacity: 0, x: 16 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.35, delay: 0.05 }}
          >
            <div className="w-full h-[260px] md:h-[320px] flex items-center justify-center rounded-xl border border-slate-200 bg-white shadow-sm">
              <motion.img
                key={currentPhase.image}
                src={currentPhase.image}
                alt={currentPhase.title}
                className="max-h-full max-w-full object-contain"
                initial={{ opacity: 0, scale: 0.97 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.25 }}
              />
            </div>
            <div>
              <h3 className="text-xl md:text-2xl font-semibold mb-2 text-slate-900">
                {currentPhase.title}
              </h3>
              <p className="text-sm md:text-base text-slate-600 text-justify">
                {currentPhase.description}
              </p>
            </div>

            <div className="grid sm:grid-cols-3 gap-4 text-xs md:text-sm">
              <div className="bg-white border border-slate-200 rounded-lg p-4">
                <p className="text-slate-500 mb-1">Ideal for</p>
                <p className="font-medium text-slate-800">
                  {selected === "Rooftop Solar"
                    ? "Homes, SMEs, institutions"
                    : selected === "Ground Mounted Solar"
                    ? "Industrial, utility, large campuses"
                    : selected === "Battery Storage"
                    ? "Backup power & peak demand"
                    : "Sites needing higher self-consumption"}
                </p>
              </div>
              <div className="bg-white border border-slate-200 rounded-lg p-4">
                <p className="text-slate-500 mb-1">Energy Independence</p>
                <p className="font-medium text-slate-800">
                  {selected === "Battery Storage" ||
                  selected === "Hybrid Systems"
                    ? "High"
                    : "Medium to High"}
                </p>
              </div>
              <div className="bg-white border border-slate-200 rounded-lg p-4">
                <p className="text-slate-500 mb-1">Scalability</p>
                <p className="font-medium text-slate-800">
                  {selected === "Ground Mounted Solar"
                    ? "Utility-scale ready"
                    : "Modular & expandable"}
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default SolarBattery;
