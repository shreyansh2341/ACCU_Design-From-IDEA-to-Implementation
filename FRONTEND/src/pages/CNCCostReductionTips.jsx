import React from "react";
import { SLink } from "@/components/SLink";

const CNCCostReductionTips = () => {
  return (
    <div className="w-full bg-gray-50 flex flex-col">
      {/* Hero Section */}
      <section className="relative w-full bg-blue-700 text-white text-center py-16 px-6 rounded-b-[50px]">
        <h1 className="text-4xl font-bold mb-4">
          Top 10 Design Tips for Reducing CNC Costs
        </h1>
        <p className="max-w-3xl mx-auto text-lg opacity-90">
          Save time and money without compromising quality — practical tips to
          optimize your CNC designs for efficient manufacturing.
        </p>
      </section>

      {/* Tips Section */}
      <section className="w-full max-w-5xl mx-auto py-12 px-6">
        <ol className="list-decimal pl-6 space-y-6 text-gray-700 text-lg leading-relaxed">
          <li>
            <strong>Choose the Right Material:</strong> Select materials that
            are easier to machine to reduce tool wear and processing time.
          </li>
          <li>
            <strong>Optimize Wall Thickness:</strong> Avoid ultra-thin walls
            unless necessary — they increase machining time and risk breakage.
          </li>
          <li>
            <strong>Minimize Deep Cavities:</strong> Deep pockets require
            special tooling and slow machining speeds.
          </li>
          <li>
            <strong>Limit Tight Tolerances:</strong> Apply tight tolerances only
            to critical features to save machining time.
          </li>
          <li>
            <strong>Simplify Complex Geometries:</strong> Reduce unnecessary
            curves, undercuts, and intricate features.
          </li>
          <li>
            <strong>Standardize Hole Sizes:</strong> Use standard drill bit
            sizes to reduce custom tooling requirements.
          </li>
          <li>
            <strong>Design for Tool Access:</strong> Ensure all features are
            accessible without awkward tool paths.
          </li>
          <li>
            <strong>Use Fillets Instead of Sharp Corners:</strong> Rounded
            corners are faster and easier to machine.
          </li>
          <li>
            <strong>Combine Parts Where Possible:</strong> Reducing part count
            lowers setup time and overall cost.
          </li>
          <li>
            <strong>Consult with Your CNC Partner Early:</strong> Collaboration
            during the design phase helps catch cost drivers early.
          </li>
        </ol>
      </section>

      {/* Call to Action */}
      <div className="text-center mt-10 mb-20">
        <SLink
          href="/get-quote"
          className="bg-blue-700 text-white font-semibold px-6 py-3 rounded-full shadow hover:bg-blue-800 transition"
        >
          Get Free Quote
        </SLink>
        <p className="mt-10 text-gray-600 italic">
          "Precision, efficiency, and savings — that’s the ACCU DESIGN promise."
        </p>
      </div>
    </div>
  );
};

export default CNCCostReductionTips;
