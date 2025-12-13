import React from "react";
import { motion } from "framer-motion";
import { SLink } from "@/components/SLink";
const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

const EpcRole = () => {
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
            OUR ROLE IN EPC
          </p>
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white leading-tight mb-4">
            Your Engineering & Project Support Partner in EPC Delivery
          </h1>
          <p className="text-sm md:text-lg text-blue-100 max-w-3xl">
            We work alongside EPC companies as an extended engineering and project
            office—strengthening design, documentation, coordination, and quality
            across every stage of project execution.
          </p>

          <div className="mt-8 flex flex-wrap gap-4">
            <SLink to="/contact-us">
              <button className="px-6 py-3 bg-white text-blue-800 rounded-full shadow-md hover:bg-blue-50 transition text-sm md:text-base">
                Discuss an EPC Collaboration
              </button>
            </SLink>
            <SLink to="/epc">
              <button className="px-6 py-3 border border-blue-200 text-blue-50 rounded-full hover:bg-blue-800/60 transition text-sm md:text-base">
                Back to EPC Overview
              </button>
            </SLink>
          </div>
        </div>
      </motion.section>

      {/* HOW WE FIT SECTION */}
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
                How We Fit into the EPC Ecosystem
              </h2>
              <p className="text-sm md:text-base text-slate-600 mb-4 text-justify">
                We position ourselves as a specialist engineering and coordination
                partner to EPC companies. Our goal is to reduce rework, improve
                clarity, and ensure that designs, documentation, and on-site
                activities move in a structured and predictable manner.
              </p>
              <p className="text-sm md:text-base text-slate-600 text-justify">
                Instead of replacing EPC functions, we strengthen them—with
                technically sound inputs, detailed engineering support, and
                disciplined documentation that supports both client and statutory
                requirements.
              </p>
            </div>

            <div className="bg-slate-50 border border-slate-200 rounded-xl p-5 md:p-6 shadow-sm">
              <h3 className="text-base md:text-lg font-semibold text-slate-900 mb-3">
                Where We Typically Engage
              </h3>
              <ul className="space-y-2 text-sm md:text-base text-slate-700 list-disc list-inside">
                <li>Pre-bid and feasibility stage technical support</li>
                <li>Front-end engineering and basic design inputs</li>
                <li>Detailed engineering, drawings, and BOQs</li>
                <li>Technical evaluation during procurement</li>
                <li>On-site coordination and quality support</li>
                <li>As-built documentation and project handover packs</li>
              </ul>
            </div>
          </div>
        </div>
      </motion.section>

      {/* KEY RESPONSIBILITIES */}
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
              WHAT WE DO
            </p>
            <h2 className="text-2xl md:text-3xl font-semibold text-slate-900 mb-3">
              Core Responsibilities in EPC Collaboration
            </h2>
            <p className="text-sm md:text-base text-slate-600 max-w-3xl mx-auto">
              Our team supports EPC organizations with a blend of engineering,
              documentation, and on-ground coordination activities.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                title: "Design & Engineering Support",
                points: [
                  "Concept design and technical feasibility",
                  "Basic and detailed engineering",
                  "Preparation of layouts and GA drawings",
                ],
              },
              {
                title: "Documentation & BOQ Preparation",
                points: [
                  "Material take-offs and BOQ creation",
                  "Technical datasheets and specifications",
                  "As-built drawings and final documentation",
                ],
              },
              {
                title: "Coordination & Quality Support",
                points: [
                  "Coordination between design, site, and vendors",
                  "Review of vendor drawings and documentation",
                  "Support for inspections and quality checks",
                ],
              },
            ].map((card) => (
              <motion.div
                key={card.title}
                className="bg-white border border-slate-200 rounded-xl p-5 md:p-6 shadow-sm"
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.3 }}
              >
                <h3 className="text-base md:text-lg font-semibold text-slate-900 mb-3">
                  {card.title}
                </h3>
                <ul className="space-y-2 text-xs md:text-sm text-slate-700 list-disc list-inside">
                  {card.points.map((p) => (
                    <li key={p}>{p}</li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* ENGAGEMENT MODELS */}
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
              ENGAGEMENT MODELS
            </p>
            <h2 className="text-2xl md:text-3xl font-semibold text-slate-900 mb-3">
              Flexible Ways of Working with EPC Teams
            </h2>
            <p className="text-sm md:text-base text-slate-600 max-w-3xl mx-auto">
              We adapt our working model to suit project needs, EPC processes,
              and client expectations.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-slate-50 border border-slate-200 rounded-xl p-5 md:p-6">
              <h3 className="text-base md:text-lg font-semibold text-slate-900 mb-2">
                Project-Based Engagement
              </h3>
              <p className="text-xs md:text-sm text-slate-700">
                Engagement scoped around specific projects with defined
                deliverables, timelines, and milestones, suitable for turnkey
                assignments.
              </p>
            </div>
            <div className="bg-slate-50 border border-slate-200 rounded-xl p-5 md:p-6">
              <h3 className="text-base md:text-lg font-semibold text-slate-900 mb-2">
                Dedicated Engineering Support
              </h3>
              <p className="text-xs md:text-sm text-slate-700">
                A dedicated engineering team that functions as an extension of
                the EPC&apos;s internal design and documentation department.
              </p>
            </div>
            <div className="bg-slate-50 border border-slate-200 rounded-xl p-5 md:p-6">
              <h3 className="text-base md:text-lg font-semibold text-slate-900 mb-2">
                Hybrid / On-Demand Support
              </h3>
              <p className="text-xs md:text-sm text-slate-700">
                Support during peak workload phases—for bids, specific projects,
                drawing backlogs, or documentation finalization.
              </p>
            </div>
          </div>
        </div>
      </motion.section>

      {/* WHY EPCs CHOOSE US */}
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
                Why EPC Companies Choose to Work with Us
              </h2>
              <p className="text-sm md:text-base text-slate-600 mb-3">
                We understand the pressure EPC teams operate under—tight
                timelines, technical scrutiny, and demanding stakeholders. Our
                role is to make engineering and documentation one less thing to
                worry about.
              </p>
              <ul className="space-y-2 text-sm text-slate-700 list-disc list-inside">
                <li>Strong mechanical and multidisciplinary engineering base</li>
                <li>Structured documentation and drawing management approach</li>
                <li>Clear communication with technical and non-technical teams</li>
                <li>Experience with industrial, infrastructure, and renewable projects</li>
                <li>Focus on practicality, constructability, and safety</li>
              </ul>
            </div>

            <div className="bg-white border border-slate-200 rounded-xl p-5 md:p-6 shadow-sm">
              <h3 className="text-base md:text-lg font-semibold text-slate-900 mb-3">
                What You Can Expect from Us
              </h3>
              <ul className="space-y-2 text-xs md:text-sm text-slate-700 list-disc list-inside">
                <li>Standardized templates for drawings and documentation</li>
                <li>Professional presentation of technical submissions</li>
                <li>Ownership of delegated engineering and coordination tasks</li>
                <li>Responsive support during critical project phases</li>
                <li>Contribution to long-term relationships with end clients</li>
              </ul>
            </div>
          </div>
        </div>
      </motion.section>

      {/* FINAL CTA */}
      <motion.section
        className="bg-blue-600 text-white py-14 md:py-16"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-80px" }}
        variants={fadeUp}
        transition={{ duration: 0.4 }}
      >
        <div className="max-w-5xl mx-auto px-4 md:px-6 text-center">
          <h2 className="text-2xl md:text-3xl font-bold mb-3">
            Explore How We Can Support Your Next EPC Project
          </h2>
          <p className="text-sm md:text-base mb-6 text-blue-100 max-w-3xl mx-auto">
            Whether you are planning a new industrial facility, a renewable energy
            project, or an infrastructure upgrade, we can help strengthen your
            engineering and documentation backbone.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <SLink to="/get-quote">
              <button className="bg-white text-blue-700 hover:bg-blue-100 px-7 py-3 rounded-lg font-semibold shadow-md text-sm md:text-base">
                Share Project Requirements
              </button>
            </SLink>
            <SLink to="/contact-us">
              <button className="border border-blue-100 text-white hover:bg-blue-700/60 px-7 py-3 rounded-lg font-semibold text-sm md:text-base">
                Schedule a Discussion
              </button>
            </SLink>
          </div>
        </div>
      </motion.section>
      {/* HOW ENGAGEMENT BEGINS */}
      <motion.section
        className="bg-slate-50 py-14 md:py-16 border-t border-slate-200"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-80px" }}
        variants={fadeUp}
        transition={{ duration: 0.4 }}
      >
        <div className="max-w-6xl mx-auto px-4 md:px-6">
          <div className="text-center mb-10">
            <p className="text-xs font-semibold tracking-[0.2em] text-blue-600 mb-2 uppercase">
              WHAT HAPPENS NEXT
            </p>
            <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-3">
              How Engagement Typically Begins
            </h2>
            <p className="text-sm md:text-base text-slate-600 max-w-3xl mx-auto">
              Once you reach out, we follow a structured and transparent engagement
              process to ensure clarity, alignment, and smooth onboarding.
            </p>
          </div>

          <div className="grid md:grid-cols-4 gap-6 text-sm">
            {[
              {
                step: "01",
                title: "Initial Technical Discussion",
                text: "We understand scope, timelines, technical requirements, and project constraints.",
              },
              {
                step: "02",
                title: "Technical Review & Feasibility",
                text: "Our team evaluates design inputs, drawings, and execution requirements.",
              },
              {
                step: "03",
                title: "Commercial & Scope Finalization",
                text: "Deliverables, timelines, and commercial terms are clearly aligned.",
              },
              {
                step: "04",
                title: "Onboarding & Execution",
                text: "Teams are onboarded and engineering or site support begins as planned.",
              },
            ].map((item, idx) => (
              <motion.div
                key={item.step}
                className="bg-white border border-slate-200 rounded-xl p-4 shadow-sm h-full"
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.3, delay: idx * 0.05 }}
              >
                <p className="text-xs font-semibold text-blue-600 mb-1">
                  STEP {item.step}
                </p>
                <h3 className="text-sm font-semibold text-slate-900 mb-2">
                  {item.title}
                </h3>
                <p className="text-xs text-slate-600">{item.text}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* TRUST & COMPLIANCE */}
      <motion.section
        className="bg-white py-14 md:py-16"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-80px" }}
        variants={fadeUp}
        transition={{ duration: 0.4 }}
      >
        <div className="max-w-6xl mx-auto px-4 md:px-6">
          <div className="grid md:grid-cols-2 gap-12 items-start">
            <div>
              <h2 className="text-2xl md:text-3xl font-semibold text-slate-900 mb-4">
                A Partner You Can Rely On
              </h2>
              <p className="text-sm md:text-base text-slate-600 mb-3">
                EPC projects demand technical accuracy, regulatory compliance, and
                disciplined execution. We operate with strict internal processes to
                ensure reliability at every level.
              </p>
              <ul className="space-y-2 text-sm text-slate-700 list-disc list-inside">
                <li>Engineering checklists and multi-level reviews</li>
                <li>Drawing revision control and documentation logs</li>
                <li>Quality audits during design and execution</li>
                <li>Clear coordination with EPC and vendor teams</li>
                <li>Data confidentiality and controlled information sharing</li>
              </ul>
            </div>

            <div className="bg-slate-50 border border-slate-200 rounded-xl p-5 md:p-6 shadow-sm">
              <h3 className="text-base md:text-lg font-semibold text-slate-900 mb-3">
                Project Governance & Communication
              </h3>
              <ul className="space-y-2 text-xs md:text-sm text-slate-700 list-disc list-inside">
                <li>Defined points of contact for each project</li>
                <li>Weekly or milestone-based progress updates</li>
                <li>Issue tracking and resolution workflows</li>
                <li>Document sharing through controlled platforms</li>
                <li>Formal sign-offs and approvals at key stages</li>
              </ul>
            </div>
          </div>
        </div>
      </motion.section>
    </div>
  );
};

export default EpcRole;
