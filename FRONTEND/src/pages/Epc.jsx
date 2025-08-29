import React from 'react'
import { SLink } from '@/components/SLink';

const Epc = () => {
  return (
    <div>
      <div>
        {/* EPC Section */}
        <section className="bg-gradient-to-r from-slate-900 via-gray-800 to-slate-900 py-20">
          <div className="container mx-auto px-6 md:px-12 lg:px-20">
            <div className="text-center mb-12">
              <h2 className="text-4xl md:text-5xl font-bold text-white">
                EPC Collaboration
              </h2>
              <p className="mt-4 text-lg text-gray-300 max-w-3xl mx-auto">
                Driving success through our strategic partnership with leading EPC
                companies to deliver turnkey engineering, procurement, and
                construction solutions.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              <div className="bg-white bg-opacity-90 backdrop-blur-sm rounded-2xl shadow-lg p-8 hover:shadow-xl transition">
                <div className="text-blue-600 mb-4">
                  {/* Icon */}
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-10 w-10 mx-auto"
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
                <h3 className="text-xl font-semibold text-gray-800 mb-2">
                  Engineering Excellence
                </h3>
                <p className="text-gray-600">
                  Innovative designs and precise engineering to meet complex
                  project demands.
                </p>
              </div>

              <div className="bg-white bg-opacity-90 backdrop-blur-sm rounded-2xl shadow-lg p-8 hover:shadow-xl transition">
                <div className="text-teal-600 mb-4">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-10 w-10 mx-auto"
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
                <h3 className="text-xl font-semibold text-gray-800 mb-2">
                  Procurement Power
                </h3>
                <p className="text-gray-600">
                  Global sourcing and supply chain management to ensure timely
                  and cost-effective delivery.
                </p>
              </div>

              <div className="bg-white bg-opacity-90 backdrop-blur-sm rounded-2xl shadow-lg p-8 hover:shadow-xl transition">
                <div className="text-indigo-600 mb-4">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-10 w-10 mx-auto"
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
                <h3 className="text-xl font-semibold text-gray-800 mb-2">
                  Construction Expertise
                </h3>
                <p className="text-gray-600">
                  Professional execution with safety, quality, and efficiency at
                  every stage of construction.
                </p>
              </div>
            </div>

            <div className="text-center mt-12">
              <button className="px-6 py-3 bg-blue-600 text-white rounded-full shadow-md hover:bg-blue-700 transition">
                Get in Touch
              </button>
            </div>
          </div>
        </section>

        {/* About Us Section */}
        <section className="bg-white py-20">
          <div className="container mx-auto px-6 md:px-12 lg:px-20">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              {/* Left: Text */}
              <div>
                <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-6">
                  About Us
                </h2>
                <p className="text-lg text-gray-600 mb-4 text-justify justify-end">
                  We are a team of passionate mechanical engineers collaborating
                  with leading EPC companies to deliver turnkey engineering,
                  procurement, and construction solutions. Our expertise spans
                  across industries, helping clients achieve efficiency,
                  sustainability, and excellence.
                </p>
                <p className="text-lg text-gray-600 text-justify">
                  With a commitment to innovation and quality, we design and
                  execute projects that meet the highest standards and exceed client
                  expectations.
                </p>
                <div className="mt-6">
                  <SLink to="/about-us">
                  <button className="px-6 py-3 bg-blue-600 text-white rounded-full shadow-md hover:bg-blue-700 transition">
                    Learn More
                  </button>
                  </SLink>
                </div>
              </div>

              {/* Right: Image */}
              <div className="flex justify-center">
                <img
                  src="https://res.cloudinary.com/dxrryep5y/image/upload/v1753339721/website_static_media/epc12.png"
                  alt="About Us"
                  className="rounded-2xl shadow-lg"
                />
              </div>
            </div>
          </div>
        </section>
      </div>
      {/* GET QUOTE */}
           <SLink to="/get-quote">
             <section className="bg-blue-500 text-white py-16 mb-12 cursor-pointer">
               <div className="max-w-screen-xl mx-auto px-4 text-center">
                 <h2 className="text-3xl md:text-4xl font-bold mb-4">
                    Let’s collaborate and bring your ideas to life. Reach out to our team today!
                 </h2>
                 <p className="text-lg mb-6">
                   Get an instant quote or talk to our experts about project.
                 </p>
                 <button className="bg-white text-black hover:bg-blue-100 px-8 py-3 rounded-lg font-semibold shadow-md">
                   Get Instant Quote
                 </button>
               </div>
             </section>
           </SLink>
     
    </div>
  )
}

export default Epc;