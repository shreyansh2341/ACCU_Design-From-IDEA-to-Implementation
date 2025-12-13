import React from "react";
import { motion } from "framer-motion";
import { SLink } from "@/components/SLink";

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

const AboutEpc = () => {
  return (
    <div className="bg-slate-50 text-slate-900 min-h-screen">
      {/* HERO */}
      <motion.section
        className="bg-blue-900 py-16 md:py-20"
        initial="hidden"
        animate="visible"
        variants={fadeUp}
        transition={{ duration: 0.45, ease: "easeOut" }}
      >
        <div className="max-w-6xl mx-auto px-4 md:px-6">
          <p className="text-xs font-semibold tracking-[0.2em] text-blue-200 uppercase mb-3">
            ABOUT EPC
          </p>
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white leading-tight mb-4">
            Understanding EPC: Engineering, Procurement & Construction
          </h1>
          <p className="text-sm md:text-lg text-blue-100 max-w-3xl">
            EPC is a turnkey project delivery model where a single entity takes
            responsibility for engineering, procurement, and construction of a
            project, ensuring predictable quality, cost, and timelines for the
            client.
          </p>

          <div className="mt-8 flex flex-wrap gap-4">
            <SLink to="/epc">
              <button className="px-6 py-3 bg-white text-blue-800 rounded-full shadow-md hover:bg-blue-50 transition text-sm md:text-base">
                View EPC Collaboration Overview
              </button>
            </SLink>
            <SLink to="/get-quote">
              <button className="px-6 py-3 border border-blue-200 text-blue-50 rounded-full hover:bg-blue-800/60 transition text-sm md:text-base">
                Discuss an EPC Requirement
              </button>
            </SLink>
          </div>
        </div>
      </motion.section>

      {/* WHAT IS EPC */}
      <motion.section
        className="bg-white py-14 md:py-16 border-b border-slate-200"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-80px" }}
        variants={fadeUp}
        transition={{ duration: 0.4 }}
      >
        <div className="max-w-6xl mx-auto px-4 md:px-6">
          <div className="grid md:grid-cols-2 gap-10 items-start">
            <div>
              <h2 className="text-2xl md:text-3xl font-semibold text-slate-900 mb-4">
                What Does EPC Mean in Projects?
              </h2>
              <p className="text-sm md:text-base text-slate-600 mb-4 text-justify">
                EPC stands for <span className="font-semibold">Engineering, Procurement, and Construction</span>. In
                this model, an EPC contractor is responsible for designing the
                project, procuring all required materials and equipment, and
                executing the construction and commissioning of the facility.
              </p>
              <p className="text-sm md:text-base text-slate-600 text-justify">
                For the end client, EPC offers a single point of responsibility
                and clear accountability for performance, cost, and schedule. It
                is widely used in infrastructure, industrial, power, and
                renewable energy projects.
              </p>
            </div>

            <div className="bg-slate-50 border border-slate-200 rounded-xl p-5 md:p-6 shadow-sm">
              <h3 className="text-base md:text-lg font-semibold text-slate-900 mb-3">
                Key Characteristics of EPC Contracts
              </h3>
              <ul className="space-y-2 text-xs md:text-sm text-slate-700 list-disc list-inside">
                <li>Single point accountability for engineering and execution</li>
                <li>Defined scope, timelines, and performance guarantees</li>
                <li>Fixed or semi-fixed contract values in many cases</li>
                <li>Clear responsibilities between client and EPC contractor</li>
                <li>Turnkey delivery from design to commissioning</li>
              </ul>
            </div>
          </div>
        </div>
      </motion.section>

      {/* EPC COMPONENTS (E, P, C) */}
      <motion.section
        className="bg-slate-50 py-14 md:py-16"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-80px" }}
        variants={fadeUp}
        transition={{ duration: 0.4 }}
      >
        <div className="max-w-6xl mx-auto px-4 md:px-6">
          <div className="text-center mb-10">
            <p className="text-xs font-semibold tracking-[0.2em] text-blue-600 mb-2 uppercase">
              EPC BREAKDOWN
            </p>
            <h2 className="text-2xl md:text-3xl font-semibold text-slate-900 mb-3">
              The Three Pillars of EPC Delivery
            </h2>
            <p className="text-sm md:text-base text-slate-600 max-w-3xl mx-auto">
              EPC brings multiple disciplines together under one umbrella, ensuring
              that design, procurement, and execution are aligned and optimized.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            <motion.div
              className="bg-white border border-slate-200 rounded-xl p-5 md:p-6 shadow-sm"
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.3 }}
            >
              <p className="text-xs font-semibold text-blue-600 mb-1">
                E — ENGINEERING
              </p>
              <h3 className="text-base md:text-lg font-semibold text-slate-900 mb-2">
                Design & Engineering
              </h3>
              <p className="text-xs md:text-sm text-slate-700 mb-2">
                Engineering defines what will be built and how it will perform.
              </p>
              <ul className="space-y-1 text-xs md:text-sm text-slate-700 list-disc list-inside">
                <li>Concept and basic design</li>
                <li>Detailed design and calculations</li>
                <li>Layouts, drawings, and BOQs</li>
                <li>Technical specifications and standards</li>
              </ul>
            </motion.div>

            <motion.div
              className="bg-white border border-slate-200 rounded-xl p-5 md:p-6 shadow-sm"
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.3, delay: 0.05 }}
            >
              <p className="text-xs font-semibold text-blue-600 mb-1">
                P — PROCUREMENT
              </p>
              <h3 className="text-base md:text-lg font-semibold text-slate-900 mb-2">
                Materials & Equipment
              </h3>
              <p className="text-xs md:text-sm text-slate-700 mb-2">
                Procurement ensures that the right materials reach the site at the
                right time and cost.
              </p>
              <ul className="space-y-1 text-xs md:text-sm text-slate-700 list-disc list-inside">
                <li>Vendor selection and evaluation</li>
                <li>Technical and commercial comparison</li>
                <li>Ordering, expediting, and logistics</li>
                <li>Inspection and quality checks</li>
              </ul>
            </motion.div>

            <motion.div
              className="bg-white border border-slate-200 rounded-xl p-5 md:p-6 shadow-sm"
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.3, delay: 0.1 }}
            >
              <p className="text-xs font-semibold text-blue-600 mb-1">
                C — CONSTRUCTION
              </p>
              <h3 className="text-base md:text-lg font-semibold text-slate-900 mb-2">
                Site Execution & Commissioning
              </h3>
              <p className="text-xs md:text-sm text-slate-700 mb-2">
                Construction converts engineering and materials into a functioning
                asset.
              </p>
              <ul className="space-y-1 text-xs md:text-sm text-slate-700 list-disc list-inside">
                <li>Civil, mechanical, electrical works</li>
                <li>Installation and testing</li>
                <li>Pre-commissioning and commissioning</li>
                <li>Handover and as-built documentation</li>
              </ul>
            </motion.div>
          </div>
        </div>
      </motion.section>

      {/* BENEFITS OF EPC FOR CLIENTS */}
      <motion.section
        className="bg-white py-14 md:py-16 border-y border-slate-200"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-80px" }}
        variants={fadeUp}
        transition={{ duration: 0.4 }}
      >
        <div className="max-w-6xl mx-auto px-4 md:px-6">
          <div className="text-center mb-10">
            <p className="text-xs font-semibold tracking-[0.2em] text-blue-600 mb-2 uppercase">
              CLIENT PERSPECTIVE
            </p>
            <h2 className="text-2xl md:text-3xl font-semibold text-slate-900 mb-3">
              Why Clients Prefer the EPC Model
            </h2>
            <p className="text-sm md:text-base text-slate-600 max-w-3xl mx-auto">
              EPC offers multiple advantages for clients managing complex
              industrial or infrastructure investments.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6 text-sm">
            <div className="bg-slate-50 border border-slate-200 rounded-xl p-5 md:p-6">
              <h3 className="text-base md:text-lg font-semibold text-slate-900 mb-2">
                Single Point of Responsibility
              </h3>
              <p className="text-xs md:text-sm text-slate-700">
                One entity is accountable for design, procurement, and
                construction, reducing coordination overhead and disputes.
              </p>
            </div>
            <div className="bg-slate-50 border border-slate-200 rounded-xl p-5 md:p-6">
              <h3 className="text-base md:text-lg font-semibold text-slate-900 mb-2">
                Better Cost & Schedule Control
              </h3>
              <p className="text-xs md:text-sm text-slate-700">
                Defined scope and contract structure make it easier to predict
                investment, timelines, and project milestones.
              </p>
            </div>
            <div className="bg-slate-50 border border-slate-200 rounded-xl p-5 md:p-6">
              <h3 className="text-base md:text-lg font-semibold text-slate-900 mb-2">
                Coordinated Technical Delivery
              </h3>
              <p className="text-xs md:text-sm text-slate-700">
                Engineering, procurement, and site teams work under a unified
                plan, reducing rework and technical mismatches.
              </p>
            </div>
          </div>
        </div>
      </motion.section>

      {/* OUR ROLE IN EPC CONTEXT */}
      <motion.section
        className="bg-slate-50 py-14 md:py-16"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-80px" }}
        variants={fadeUp}
        transition={{ duration: 0.4 }}
      >
        <div className="max-w-6xl mx-auto px-4 md:px-6">
          <div className="grid md:grid-cols-2 gap-10 items-start">
            <div>
              <h2 className="text-2xl md:text-3xl font-semibold text-slate-900 mb-4">
                Where We Add Value in EPC Projects
              </h2>
              <p className="text-sm md:text-base text-slate-600 mb-3">
                We strengthen EPC delivery by supporting engineering, documentation,
                and coordination, especially in mechanically driven and industrial
                environments.
              </p>
              <ul className="space-y-2 text-sm text-slate-700 list-disc list-inside">
                <li>Mechanical and interdisciplinary engineering support</li>
                <li>Drawing and documentation preparation and control</li>
                <li>Support for vendor evaluations and technical clarifications</li>
                <li>On-ground coordination inputs and constructability feedback</li>
              </ul>
            </div>

            <div className="bg-white border border-slate-200 rounded-xl p-5 md:p-6 shadow-sm">
              <h3 className="text-base md:text-lg font-semibold text-slate-900 mb-3">
                Typical EPC Segments We Work In
              </h3>
              <ul className="space-y-2 text-xs md:text-sm text-slate-700 list-disc list-inside">
                <li>Solar and renewable energy projects</li>
                <li>Industrial utilities, piping, and mechanical systems</li>
                <li>Process and manufacturing plant infrastructure</li>
                <li>Industrial buildings and allied infrastructure</li>
              </ul>
             
            </div>
          </div>
        </div>
      </motion.section>
      
    </div>
  );
};

export default AboutEpc;
