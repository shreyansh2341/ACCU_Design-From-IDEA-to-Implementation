import React from "react";
import { SLink } from "@/components/SLink";
import { motion } from "framer-motion";

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

const faqItems = [
  {
    question: "Do you work directly with EPC companies or end clients?",
    answer:
      "We primarily collaborate with EPC companies as an engineering and project support partner, but we are also open to working with end clients alongside their EPC of choice.",
  },
  {
    question: "At what project stage can you get involved?",
    answer:
      "We can support from pre-bid and concept design stages up to detailed engineering, procurement support, site execution support, and documentation.",
  },
  {
    question: "Which industries do you primarily support?",
    answer:
      "We support renewable energy, industrial utilities, process plants, and infrastructure projects that require structured engineering and EPC coordination.",
  },
  {
    question: "How do you typically engage with project teams?",
    answer:
      "We follow a collaborative approach with clear communication, defined deliverables, and regular progress reviews with EPC project managers and client representatives.",
  },
];

const Epc = () => {
  return (
    <div className="bg-slate-50 text-slate-900">
      {/* EPC HERO / MAIN SECTION */}
      <motion.section
        className="bg-blue-900 py-20"
        initial="hidden"
        animate="visible"
        variants={fadeUp}
        transition={{ duration: 0.5, ease: "easeOut" }}
      >
        <div className="container mx-auto px-6 md:px-12 lg:px-20">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left: Hero Text */}
            <motion.div
              initial={{ opacity: 0, x: -24 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, ease: "easeOut" }}
            >
              <p className="text-sm font-semibold tracking-[0.2em] text-blue-200 uppercase mb-3">
                EPC COLLABORATION
              </p>
              <h1 className="text-4xl md:text-5xl font-bold text-white leading-tight mb-4">
                End-to-End EPC Partnership for Industrial & Infrastructure Projects
              </h1>
              <p className="mt-4 text-lg text-blue-100 max-w-xl">
                We collaborate with leading EPC companies to deliver turnkey
                engineering, procurement, and construction solutions with a
                strong focus on quality, safety, and timely execution.
              </p>

              {/* Small stats row */}
              <div className="mt-8 grid grid-cols-3 gap-4 max-w-md text-sm">
                <div>
                  <p className="text-2xl font-semibold text-white">10+</p>
                  <p className="text-blue-100 text-xs">EPC partners</p>
                </div>
                <div>
                  <p className="text-2xl font-semibold text-white">50+</p>
                  <p className="text-blue-100 text-xs">Projects supported</p>
                </div>
                <div>
                  <p className="text-2xl font-semibold text-white">PAN-India</p>
                  <p className="text-blue-100 text-xs">Project presence</p>
                </div>
              </div>

              <div className="mt-8 flex flex-wrap gap-4">
                <motion.div whileHover={{ y: -2 }} transition={{ duration: 0.15 }}>
                  <SLink to="/get-quote">
                    <button className="px-6 py-3 bg-white text-blue-800 rounded-full shadow-md hover:bg-blue-50 transition">
                      Discuss an EPC Project
                    </button>
                  </SLink>
                </motion.div>
                <motion.div whileHover={{ y: -2 }} transition={{ duration: 0.15 }}>
                  <SLink to="/Epcrole">
                    <button className="px-6 py-3 border border-blue-200 text-blue-50 rounded-full hover:bg-blue-800/60 transition">
                      Learn About Our Role
                    </button>
                  </SLink>
                </motion.div>
              </div>
            </motion.div>

            {/* Right: EPC Pillars */}
            <motion.div
              initial={{ opacity: 0, x: 24 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, ease: "easeOut", delay: 0.1 }}
            >
              <div className="grid sm:grid-cols-2 gap-6">
                <motion.div
                  whileHover={{ y: -4 }}
                  className="bg-white/95 backdrop-blur-sm rounded-2xl shadow-lg p-6"
                >
                  <div className="text-blue-600 mb-3">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-9 w-9"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={1.5}
                        d="M9.75 3v2.25M14.25 3v2.25M6 7.5h12M4.5 21h15M5.25 7.5v13.5M18.75 7.5v13.5M9 12h6m-6 4h6"
                      />
                    </svg>
                  </div>
                  <h3 className="text-lg font-semibold text-gray-800 mb-1">
                    Engineering Excellence
                  </h3>
                  <p className="text-sm text-gray-600">
                    Front-end engineering, detailed design, and value engineering
                    to meet complex project requirements.
                  </p>
                </motion.div>

                <motion.div
                  whileHover={{ y: -4 }}
                  className="bg-white/95 backdrop-blur-sm rounded-2xl shadow-lg p-6"
                >
                  <div className="text-teal-600 mb-3">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-9 w-9"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={1.5}
                        d="M12 6v6l4 2M20.25 12a8.25 8.25 0 11-16.5 0 8.25 8.25 0 0116.5 0z"
                      />
                    </svg>
                  </div>
                  <h3 className="text-lg font-semibold text-gray-800 mb-1">
                    Procurement Power
                  </h3>
                  <p className="text-sm text-gray-600">
                    Vendor evaluation, technical comparison, and optimized
                    material procurement aligned with project timelines.
                  </p>
                </motion.div>

                <motion.div
                  whileHover={{ y: -4 }}
                  className="bg-white/95 backdrop-blur-sm rounded-2xl shadow-lg p-6"
                >
                  <div className="text-indigo-600 mb-3">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-9 w-9"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={1.5}
                        d="M3 10h18M7 14h10M10 17h4"
                      />
                    </svg>
                  </div>
                  <h3 className="text-lg font-semibold text-gray-800 mb-1">
                    Construction Expertise
                  </h3>
                  <p className="text-sm text-gray-600">
                    Supervision, site coordination, and quality control to ensure
                    safe and efficient on-ground execution.
                  </p>
                </motion.div>

                <motion.div
                  whileHover={{ y: -4 }}
                  className="bg-white/95 backdrop-blur-sm rounded-2xl shadow-lg p-6"
                >
                  <div className="text-blue-700 mb-3">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-9 w-9"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={1.5}
                        d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                  </div>
                  <h3 className="text-lg font-semibold text-gray-800 mb-1">
                    Compliance & Documentation
                  </h3>
                  <p className="text-sm text-gray-600">
                    Technical documentation, drawings, and quality records aligned
                    with client and statutory requirements.
                  </p>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </div>
      </motion.section>

      {/* EPC PROCESS SECTION */}
      <motion.section
        className="bg-white py-16 border-b border-slate-200"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-80px" }}
        variants={fadeUp}
        transition={{ duration: 0.4 }}
      >
        <div className="container mx-auto px-6 md:px-12 lg:px-20">
          <div className="text-center mb-10">
            <p className="text-xs font-semibold tracking-[0.2em] text-blue-600 mb-2 uppercase">
              HOW WE WORK
            </p>
            <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-3">
              Structured EPC Delivery Process
            </h2>
            <p className="text-sm md:text-base text-gray-600 max-w-3xl mx-auto">
              A clear, well-defined project approach that supports EPC organizations
              from concept to commissioning.
            </p>
          </div>

          <div className="grid md:grid-cols-5 gap-6 text-sm">
            {[
              {
                step: "01",
                title: "Requirement Understanding",
                text: "Technical discussions, scope definition, and data collection for accurate project planning.",
              },
              {
                step: "02",
                title: "Design & Engineering",
                text: "Preparation of layouts, BOQs, and engineering documents aligned to standards.",
              },
              {
                step: "03",
                title: "Procurement Support",
                text: "Technical evaluation of vendors, specifications, and procurement coordination.",
              },
              {
                step: "04",
                title: "Site Support & Execution",
                text: "On-site coordination, installation support, inspection, and quality checks.",
              },
              {
                step: "05",
                title: "Handover & Documentation",
                text: "As-built documentation, test reports, and structured project handover.",
              },
            ].map((item, idx) => (
              <motion.div
                key={item.step}
                className="bg-slate-50 border border-slate-200 rounded-xl p-4 h-full"
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.3, delay: idx * 0.05 }}
              >
                <p className="text-xs font-semibold text-blue-600 mb-1">
                  STEP {item.step}
                </p>
                <h3 className="text-sm font-semibold text-gray-800 mb-2">
                  {item.title}
                </h3>
                <p className="text-xs text-gray-600">{item.text}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* ABOUT US SECTION */}
      <motion.section
        className="bg-white py-20"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-80px" }}
        variants={fadeUp}
        transition={{ duration: 0.4 }}
      >
        <div className="container mx-auto px-6 md:px-12 lg:px-20">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            {/* Left: Text */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.4 }}
            >
              <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-6">
                About Us
              </h2>
              <p className="text-lg text-gray-600 mb-4 text-justify">
                We are a team of passionate mechanical engineers collaborating
                with leading EPC companies to deliver turnkey engineering,
                procurement, and construction solutions. Our expertise spans
                across industries, helping clients achieve efficiency,
                sustainability, and operational excellence.
              </p>
              <p className="text-lg text-gray-600 text-justify">
                With a commitment to innovation and quality, we design and support
                projects that meet the highest technical standards, while
                maintaining clear communication and transparent project
                management.
              </p>
              <div className="mt-6">
                <SLink to="/Epcabout">
                  <button className="px-6 py-3 bg-blue-600 text-white rounded-full shadow-md hover:bg-blue-700 transition">
                    Learn More
                  </button>
                </SLink>
              </div>
            </motion.div>

            {/* Right: Image */}
            <motion.div
              className="flex justify-center"
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.4 }}
            >
              <img
                src="https://res.cloudinary.com/dxrryep5y/image/upload/v1753339721/website_static_media/epc12.png"
                alt="About Us"
                className="rounded-2xl shadow-lg max-h-[360px] object-cover"
              />
            </motion.div>
          </div>
        </div>
      </motion.section>

      {/* INDUSTRIES WE SERVE */}
      <motion.section
        className="bg-slate-100 py-16"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-80px" }}
        variants={fadeUp}
        transition={{ duration: 0.4 }}
      >
        <div className="container mx-auto px-6 md:px-12 lg:px-20">
          <div className="text-center mb-10">
            <p className="text-xs font-semibold tracking-[0.2em] text-blue-600 mb-2 uppercase">
              INDUSTRIES WE SUPPORT
            </p>
            <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-3">
              Diverse Sector Experience
            </h2>
            <p className="text-sm md:text-base text-gray-600 max-w-3xl mx-auto">
              Our engineering capabilities and EPC collaboration experience cover
              a wide range of industrial and infrastructure segments.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-4 text-sm">
            {[
              "Renewable Energy & Solar",
              "Industrial Utilities & Pipelines",
              "Process Plants & Manufacturing",
              "Infrastructure & Facilities",
            ].map((label, idx) => (
              <motion.div
                key={label}
                className="bg-white border border-slate-200 rounded-lg px-4 py-3 text-center text-gray-700"
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.25, delay: idx * 0.05 }}
              >
                {label}
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* GET QUOTE / CTA */}
      <SLink to="/get-quote">
        <motion.section
          className="bg-blue-600 text-white py-16 cursor-pointer"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          variants={fadeUp}
          transition={{ duration: 0.4 }}
        >
          <div className="max-w-screen-xl mx-auto px-4 text-center">
            <h2 className="text-2xl md:text-3xl font-bold mb-4">
              Let’s collaborate and bring your EPC ideas to life.
            </h2>
            <p className="text-sm md:text-lg mb-6 max-w-2xl mx-auto text-blue-100">
              Share your project requirements with us. Our team will connect with
              you to understand your scope and propose the right engagement model.
            </p>
            <motion.button
              className="bg-white text-blue-700 hover:bg-blue-100 px-8 py-3 rounded-lg font-semibold shadow-md text-sm md:text-base"
              whileHover={{ y: -2 }}
              whileTap={{ y: 0 }}
              transition={{ duration: 0.15 }}
            >
              Get Instant Quote
            </motion.button>
          </div>
        </motion.section>
      </SLink>

      {/* FAQ SECTION (AFTER QUOTE) */}
      <motion.section
        className="bg-white py-16"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-80px" }}
        variants={fadeUp}
        transition={{ duration: 0.4 }}
      >
        <div className="max-w-4xl mx-auto px-4 md:px-6">
          <div className="text-center mb-10">
            <p className="text-xs font-semibold tracking-[0.2em] text-blue-600 mb-2 uppercase">
              FAQ
            </p>
            <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-3">
              Frequently Asked Questions
            </h2>
            <p className="text-sm md:text-base text-gray-600 max-w-2xl mx-auto">
              Clarifying common queries about our EPC collaboration model and
              project support.
            </p>
          </div>

          <div className="space-y-4">
            {faqItems.map((item, idx) => (
              <motion.div
                key={item.question}
                className="bg-slate-50 border border-slate-200 rounded-lg p-4 md:p-5"
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.25, delay: idx * 0.05 }}
              >
                <p className="font-semibold text-gray-900 text-sm md:text-base mb-1">
                  {item.question}
                </p>
                <p className="text-xs md:text-sm text-gray-600">{item.answer}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>
    </div>
  );
};

export default Epc;
