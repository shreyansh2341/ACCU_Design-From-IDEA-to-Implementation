import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FaChevronDown } from 'react-icons/fa';
import SliderComponent from '../components/Slider';
import { SLink } from '../components/SLink';
import FeaturesSection from "../components/FeaturesSection";
import TestimonialsSection from '../components/TestimonialsSection';
import { REACT_APP_BACKEND_URL } from '../config/globals';
import FeatureCard from "../components/FeatureCardsSection";

const Home = () => {
  useEffect(() => {
    const videos = document.querySelectorAll("video");

    videos.forEach((video) => {
      video.addEventListener("play", () => {
        // Pause others
        videos.forEach((v) => {
          if (v !== video) v.pause();
        });
        video.parentElement.classList.add("expanded");
      });

      video.addEventListener("pause", () => {
        video.parentElement.classList.remove("expanded");
      });

      video.addEventListener("ended", () => {
        video.parentElement.classList.remove("expanded");
      });
    });

    return () => {
      videos.forEach((video) => {
        video.removeEventListener("play", () => { });
        video.removeEventListener("pause", () => { });
        video.removeEventListener("ended", () => { });
      });
    };
  }, []);

  const videosData = [
    {
      poster:
        "https://res.cloudinary.com/dxrryep5y/image/upload/v1753295760/website_static_media/thumbnail2.jpg",
      src:
        "https://res.cloudinary.com/dxrryep5y/video/upload/v1753296201/website_static_media/Basics_of_Welding_Techniques___Welding_1080P_HD.mp4",
    },
    {
      poster:
        "https://res.cloudinary.com/dxrryep5y/image/upload/v1753295761/website_static_media/thumbnail3.jpg",
      src:
        "https://res.cloudinary.com/dxrryep5y/video/upload/v1753296356/website_static_media/cisbso6xawpuzkfe3nvo.mp4",
    },
    {
      poster:
        "https://res.cloudinary.com/dxrryep5y/image/upload/v1753339758/website_static_media/thumbnail4.png",
      src:
        "https://res.cloudinary.com/dxrryep5y/video/upload/v1753296277/website_static_media/Heat_Treatment_of_Metals___Strengthening_Engineering_Materials_1080P_HD.mp4",
    },
    {
      poster:
        "https://res.cloudinary.com/dxrryep5y/image/upload/v1753339759/website_static_media/thumbnail5.png",
      src:
        "https://res.cloudinary.com/dxrryep5y/video/upload/v1753296421/website_static_media/k6n7mfqcwaldxxg778p6.mp4",
    },
  ];

  const [activeIndex, setActiveIndex] = useState(null);

  const toggleFAQ = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  const [testimonials, setTestimonials] = useState([]);
  const [showChat, setShowChat] = useState(false);

  useEffect(() => {
    const fetchTestimonials = async () => {
      try {
        const { data } = await axios.get(`${REACT_APP_BACKEND_URL}/api/testimonials/all-review-posts`, {
          withCredentials: true,
        });
        setTestimonials(data.allreviews.slice(0, 3));
      } catch (error) {
        console.error("Failed to fetch testimonials", error);
      }
    };

    fetchTestimonials();
  }, []);


  const faqs = [
    {
      question: 'WHAT INDUSTRIES DO YOU SERVE?',
      answer: 'We serve a wide range of industries, including aerospace, automotive, medical, electronics, and more. Contact us to discuss your specific needs.'
    },
    {
      question: 'DO YOU OFFER SUSTAINABLE SOLUTIONS?',
      answer: 'Yes, we are committed to sustainable manufacturing practices. We explore eco-friendly materials and processes whenever possible.'
    },
    {
      question: 'WHAT ARE YOUR PAYMENT TERMS?',
      answer: 'Our payment terms vary depending on the project. We typically require a deposit upfront, with the remaining balance due upon completion. Contact us for details.'
    },
    {
      question: 'CAN YOU HANDLE CUSTOM REQUESTS?',
      answer: 'Absolutely! We specialize in custom manufacturing. Bring us your ideas, we shall provide you a full stack solution from designing to manufacturing and we will make it happen.'
    },
    {
      question: 'HOW CAN I REQUEST A QUOTE?',
      answer: 'You can request a quote by filling out the form on our "Contact Us" page, or by calling or emailing us directly. You can also chat with our AI assistant and provide as much detail as possible about your project.'
    },
    {
      question: 'WHAT QUALITY CONTROL PROCESSES DO YOU FOLLOW?',
      answer: 'We have rigorous quality control processes in place at every stage of manufacturing, from material inspection to final product testing. We adhere to industry standards and are ISO 9001 certified.'
    }
  ];
  return (
    <div id="home" className="home overflow-x-hidden">
      {/* <Carousel /> */}
      <section
        className="w-full py-16 px-8 md:px-20 flex flex-col md:flex-row items-center justify-between gap-12 relative overflow-hidden"
        style={{
          background: "linear-gradient(to right, #f5f5f5, #e0e0e0)",
        }}
      >
        {/* Futuristic background lines */}
        <div
          className="absolute inset-0 z-0"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='800' height='600' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' stroke='%2300B4D8' stroke-width='0.5'%3E%3Cpath d='M0 50 L800 50 M0 150 L800 150 M0 250 L800 250 M0 350 L800 350 M0 450 L800 450 M0 550 L800 550'/%3E%3Cpath d='M50 0 L50 600 M150 0 L150 600 M250 0 L250 600 M350 0 L350 600 M450 0 L450 600 M550 0 L550 600 M650 0 L650 600 M750 0 L750 600'/%3E%3Ccircle cx='400' cy='300' r='2' fill='%2300B4D8'/%3E%3C/g%3E%3C/svg%3E")`,
            backgroundSize: "cover",
            opacity: "0.1",
          }}
        ></div>

        {/* LEFT: Hero Info */}
        <div className="max-w-xl md:w-1/2 text-center md:text-left px-4 z-10">
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-4 leading-tight text-justify pl-4 md:pl-10">
            Innovation in <span className="block">Every Component</span>
          </h1>

          <p className="text-base md:text-lg text-gray-700 mb-6 text-justify pl-4 md:pl-10">
            <span className="font-semibold text-gray-900">
              We're not just Simplifying Manufacturing. <br />We're
              revolutionizing it. <br />
            </span>
            At <span className="font-semibold">ACCU DESIGN</span>, we provide an
            agile, meticulously vetted, and expertly managed global supply chain
            for Custom On-Demand Manufacturing, fueled by world-class experts
            alongside Cutting Edge AI technology that adapts seamlessly to your
            evolving needs.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row flex-wrap gap-4 justify-center md:justify-start pl-4 md:pl-10">
            {/* buttons here */}
            <SLink to="/get-quote">
              <button className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-lg shadow text-sm font-medium transition-all duration-300 hover:scale-105">
                Get Instant Quote →
              </button>
            </SLink>
            <SLink to="/get-quote">
              <button className="bg-white border border-gray-300 hover:bg-gray-50 px-6 py-3 rounded-lg shadow text-sm font-medium transition-all duration-300 hover:scale-105">
                Start Production Quote →
              </button>
            </SLink>
          </div>
        </div>
        {/* Right side content of hero section*/}
        <div className="grid grid-cols-2 gap-6 z-10 md:w-1/3">
          <FeatureCard
            label="Defence"
            src="https://res.cloudinary.com/dxrryep5y/image/upload/v1753687269/website_static_media/AhomeDefence.png"
            description="Support for clean energy, sustainability, and cutting-edge climate solutions. At ACCU DESIGN, we provide an agile, meticulously vetted, and expertly managed global supply chain for Custom On-Demand Manufacturing, fueled by world-class experts alongside Cutting Edge AI technology that adapts seamlessly to your evolving needs."
          />
          <FeatureCard
            label="Aerospace"
            src="https://res.cloudinary.com/dxrryep5y/image/upload/v1753687264/website_static_media/AhomeAerospace.png"
            description="Precision aerospace manufacturing solutions that meet the highest industry standards."
          />
          <FeatureCard
            label="Automation"
            src="https://res.cloudinary.com/dxrryep5y/image/upload/v1753687275/website_static_media/AhomeRobotics.png"
            description="Explore how automation is transforming industries with intelligent robotics and software."
          />
          <FeatureCard
            label="Medical Device"
            src="https://res.cloudinary.com/dxrryep5y/image/upload/v1753687272/website_static_media/AhomeMedical_devices.png"
            description="Innovative solutions for the medical device industry including prototyping and precision production."
          />
        </div>
      </section>
      {/* Featured Section */}
      <>
        <FeaturesSection />
      </>
      {/* Welcome Section */}
      <div className="welcome flex flex-wrap justify-center items-start m-5">
        {/* Image Section */}
        <div className="welcome-img w-full md:w-1/2 p-2.5 box-border">
          <img src="https://res.cloudinary.com/dxrryep5y/image/upload/v1753296084/website_static_media/welcome-img.png" alt="Welcome Image" className="w-full h-auto block" loading="lazy" />
        </div>

        {/* Video + Text Section */}
        <div className="welcome-video w-full md:w-1/2 p-2.5 box-border">
          <div className="welcome-heading flex items-center mb-2.5">
            <img src="https://res.cloudinary.com/dxrryep5y/image/upload/v1753296081/website_static_media/Vector.png" alt="Icon" className="w-8 h-auto mr-1.5" loading="lazy" />
            <h2 className="text-[#2479C2] text-2xl font-bold m-0">Who We Are</h2>
          </div>
          <h1 className="text-2xl font-semibold mb-4">
            Experts in Rapid Prototyping Development & Precision Manufacturing & Development
          </h1>
          <p className="text-xl font-medium mb-5">
            We at ACCU DESIGN, specialize in precision manufacturing, development of indigenous engineering solutions tailored to meet the unique needs of our clients.
          </p>
          <div className="video-item w-full max-w-3xl mx-auto">
            <video
              controls
              className="w-full h-auto"
              preload="none"
              poster="https://res.cloudinary.com/dxrryep5y/image/upload/v1753295759/website_static_media/thumbnail1.png "
            >
              <source
                src="https://res.cloudinary.com/dxrryep5y/video/upload/v1753296822/webssite_static_media/nynfmrimsl007byaou9q.webm"
                type="video/webm"
              />
              Your browser does not support the video tag.
            </video>
          </div>

        </div>
      </div>

      {/* SERVICE SECTION */}
      <div id="services" className="services text-center p-5 bg-[#eaf6fd]">
        <div className="container mx-auto">
          <h2 className="offer flex justify-center items-center mb-5 text-[#2479C2] text-2xl font-bold m-2">
            <img src="https://res.cloudinary.com/dxrryep5y/image/upload/v1753296081/website_static_media/Vector.png" alt="Icon" className="vector w-13 h-10 mr-2" loading="lazy" />
            WHAT WE OFFER
          </h2>

          <h1 className="explore-services text-3xl font-bold mb-10">Explore Our Services</h1>

          {/* First row - 3 cards */}
          <div className="flex flex-wrap justify-center gap-12 mb-10">
            {[
              {
                to: "/machining",
                img: "https://res.cloudinary.com/dxrryep5y/image/upload/v1753295862/website_static_media/home_machnining.png",
                alt: "Machining",
                title: "CNC, VMC MACHINING",
                points: [
                  "High-precision CNC & VMC",
                  "Tight tolerance machining",
                  "Fast delivery & reliable results",
                ]
              },
              {
                to: "/3d-printing",
                img: "https://res.cloudinary.com/dxrryep5y/image/upload/v1753295834/website_static_media/home_3d_printing.jpg",
                alt: "3D Printing",
                title: "3D PRINTING",
                points: [
                  "FDM, SLA, SLS technologies",
                  "Multi-material & color options",
                  "Perfect for rapid prototyping",
                ]
              },
              {
                to: "/laser-cutting",
                img: "https://res.cloudinary.com/dxrryep5y/image/upload/v1753295856/website_static_media/home_laser_cutting.jpg",
                alt: "Laser Cutting",
                title: "LASER CUTTING",
                points: [
                  "Precision metal cutting",
                  "Supports intricate designs",
                  "Efficient and cost-effective",
                ]
              }
            ].map((service, index) => (
              <div
                key={index}
                className="relative w-80 group bg-white rounded-lg shadow-lg overflow-hidden transition-all duration-300"
              >
                {/* Image with Title */}
                <div className="relative w-full h-80 overflow-hidden">
                  <img
                    src={`${service.img}`}
                    alt={service.alt}
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-95"
                    loading="lazy"
                  />
                  <div className="absolute bottom-0 left-0 w-full bg-black bg-opacity-70 text-[#007AFF] py-2.5 px-2.5 text-center text-lg font-semibold z-10">
                    {service.title}
                  </div>
                </div>

                {/* Hover Card Content */}
                <div className="absolute left-0 right-0 -bottom-44 group-hover:bottom-0 bg-white p-4 opacity-0 group-hover:opacity-100 transition-all duration-500 ease-in-out z-20 shadow-inner border-t rounded-b-lg">
                  <ul className="text-sm text-gray-800 font-bold list-disc list-inside mb-3 text-left">
                    {service.points.map((point, i) => (
                      <li key={i}>{point}</li>
                    ))}
                  </ul>
                  <SLink
                    to={service.to}
                    className="inline-flex items-center mt-1 px-3 py-1 bg-blue-600 text-white text-sm font-semibold rounded hover:bg-blue-700 transition"
                  >
                    Know More <span className="ml-2">→</span>
                  </SLink>
                </div>
              </div>
            ))}
          </div>

          {/* Second row - 2 cards centered */}
          <div className="flex flex-wrap justify-center gap-12 mb-10">
            {[
              {
                to: "/fabrication",
                img: "https://res.cloudinary.com/dxrryep5y/image/upload/v1753295810/website_static_media/fabrication2.png",
                alt: "Fabrication",
                title: "FABRICATION",
                points: [
                  "Sheet metal structures",
                  "Cutting, welding, punching",
                  "Custom precision builds",
                ]
              },
              {
                to: "/casting",
                img: "https://res.cloudinary.com/dxrryep5y/image/upload/v1753295794/website_static_media/casting.png",
                alt: "Casting",
                title: "CASTING",
                points: [
                  "Die, sand & investment casting",
                  "Durable and accurate parts",
                  "Suited for mass production",
                ]
              }
            ].map((service, index) => (
              <div
                key={index}
                className="relative w-80 group bg-white rounded-lg shadow-lg overflow-hidden transition-all duration-300"
              >
                {/* Image with Title */}
                <div className="relative w-full h-80 overflow-hidden">
                  <img
                    src={`${service.img}`}
                    alt={service.alt}
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-95"
                    loading="lazy"
                  />
                  <div className="absolute bottom-0 left-0 w-full bg-black bg-opacity-70 text-[#007AFF] py-2.5 px-2.5 text-center text-lg font-semibold z-10">
                    {service.title}
                  </div>
                </div>

                {/* Hover Card Content */}
                <div className="absolute left-0 right-0 -bottom-44 group-hover:bottom-0 bg-white p-4 opacity-0 group-hover:opacity-100 transition-all duration-500 ease-in-out z-20 shadow-inner border-t rounded-b-lg">
                  <ul className="text-sm text-gray-800 font-bold list-disc list-inside mb-3 text-left">
                    {service.points.map((point, i) => (
                      <li key={i}>{point}</li>
                    ))}
                  </ul>
                  <a
                    href={service.to}
                    className="inline-flex items-center mt-1 px-3 py-1 bg-blue-600 text-white text-sm font-semibold rounded hover:bg-blue-700 transition"
                  >
                    Know More <span className="ml-2">→</span>
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div>
        <SliderComponent />
      </div>

      {/* Latest Work Section */}

      <div className="our-latest-work flex flex-wrap justify-center items-center p-5">
        {/* Text Section */}
        <div className="latest-work-study w-full md:w-[48%] bg-white border-2 border-[#2479C2] p-5 box-border m-2.5">
          <div className="heading-with-img flex items-center mb-2.5">
            <img src="https://res.cloudinary.com/dxrryep5y/image/upload/v1753296081/website_static_media/Vector.png" alt="Icon" className="w-10 h-7 mr-2.5" loading="lazy" />
            <h2 className="latest-work text-[#2479C2] text-3xl font-bold">OUR LATEST WORK</h2>
          </div>
          <h1 className="text-2xl mb-2.5 font-bold">HIGH SHEAR POWDER & LIQUID MIXER</h1>
          <p className="text-base mb-2.5">High Shear Mixer takes a revolutionary approach to powder/liquid mixing.</p>
          <ul className="list-disc pl-5 mb-4 text-md">
            <li>Model: HSM25</li>
            <li>Motor: 5.5 KW (7.5HP)</li>
            <li>Flow Rate: 3.785 Liters per minute</li>
            <li>Specification: L1050 X W375 X 900MM</li>
          </ul>
          <button className="w-full h-14 bg-[#2479C2] text-white border-none py-4 px-0 text-lg cursor-pointer transition-colors duration-300 hover:bg-[#1a5db0]">
            VIEW CASE STUDIES
          </button>
        </div>

        {/* Image Section */}
        <div className="images-latest w-full md:w-[48%] m-2.5 text-center">
          <img src="https://res.cloudinary.com/dxrryep5y/image/upload/v1753295880/website_static_media/home_page_remaining_img.jpg" alt="Mixer Image" className="max-w-full h-auto block mx-auto" loading="lazy" />
        </div>
      </div>

      {/* WHY ACCU DESIGN */}

      {/* Testimonials Section */}
      <div id="testimonials" className="testimonial text-center mb-5">
        <div className="test">
          <h2 className="test-img flex items-center justify-center text-[#2479C2] text-3xl font-bold mb-8">
            <img src="https://res.cloudinary.com/dxrryep5y/image/upload/v1753296081/website_static_media/Vector.png" alt="Testimonial Icon" className="w-13 h-10 mr-1.5" loading="lazy" /> TESTIMONIALS
          </h2>
        </div>

        <div id="testimonials">
          <TestimonialsSection />
        </div>

        <div className="machining-components mb-2">
          <h2 className="test-img flex items-center justify-center text-[#2479C2] text-3xl font-bold  mt-8">
            <img src="https://res.cloudinary.com/dxrryep5y/image/upload/v1753296081/website_static_media/Vector.png" alt="Testimonial Icon" className="w-13 h-10 mr-1.5" loading="lazy" /> PRECISION MACHINING COMPONENTS
          </h2>
        </div>

        <div className="flex flex-wrap justify-center gap-10 px-6 py-12">
          {/* CARD 1 */}
          <div className="w-[350px] bg-white rounded-xl shadow-lg hover:shadow-2xl transition-shadow duration-300 p-6 text-center">
            <img src="https://res.cloudinary.com/dxrryep5y/image/upload/v1753295885/website_static_media/home_pan_ind.png" alt="Pan India DRDO Labs" className="w-full h-auto rounded-md mb-5" loading="lazy" />
            <h3 className="text-[#2479C2] text-xl font-bold mb-3">PAN India DRDO Labs</h3>
            <p className="text-gray-500 text-base">No. of Unique Parts Manuf: 100+</p>
            <p className="text-gray-500 text-base">Finish Range: 05 – 15 microns</p>
            <p className="text-gray-500 text-base">Production Tenure: 2018 – Present</p>
          </div>

          {/* CARD 2 */}
          <div className="w-[350px] bg-white rounded-xl shadow-lg hover:shadow-2xl transition-shadow duration-300 p-6 text-center">
            <img src="https://res.cloudinary.com/dxrryep5y/image/upload/v1753295835/website_static_media/home_c-teach.png" alt="C-TECH CNC COMPONENTS" className="w-full h-auto rounded-md mb-5" loading="lazy" />
            <h3 className="text-[#2479C2] text-xl font-bold mb-3">C–TECH CNC COMPONENTS</h3>
            <p className="text-gray-500 text-base">No. of Unique Parts Manuf: 32</p>
            <p className="text-gray-500 text-base">Finish Range: 20 – 40 microns</p>
            <p className="text-gray-500 text-base">Production Tenure: 9 months</p>
          </div>

          {/* CARD 3 */}
          <div className="w-[350px] bg-white rounded-xl shadow-lg hover:shadow-2xl transition-shadow duration-300 p-6 text-center">
            <img src=" https://res.cloudinary.com/dxrryep5y/image/upload/v1753295886/website_static_media/home_seinumero.png" alt="Seinumero Nirman Pvt. Ltd." className="w-full h-auto rounded-md mb-5" loading="lazy" />
            <h3 className="text-[#2479C2] text-xl font-bold mb-3">Seinumero Nirman Pvt. Ltd.</h3>
            <p className="text-gray-500 text-base">No. of Unique Parts Manuf: 100+</p>
            <p className="text-gray-500 text-base">Finish Range: 10 – 30 microns</p>
            <p className="text-gray-500 text-base">Production Tenure: 12 months</p>
          </div>
        </div>
      </div>
      {/* Blogs Section */}
      <div id="blogs" className="our-blogs px-4 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h2 className="flex items-center justify-center text-[#2479C2] text-3xl font-bold mb-2">
            <img src=" https://res.cloudinary.com/dxrryep5y/image/upload/v1753296081/website_static_media/Vector.png" alt="Blogs Icon" className="w-10 h-auto mr-2" loading="lazy" />
            OUR BLOGS
          </h2>
          <h1 className="text-3xl font-bold">Exploring The World Of</h1>
          <h1 className="text-3xl font-bold mt-1">Mechanical Engineering</h1>
        </div>
        {/* video grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 px-4">
          {videosData.map((video, index) => (
            <div
              key={index}
              className="rounded-xl overflow-hidden"
            >
              <div className="video-wrapper h-[220px] transition-all duration-500 ease-in-out">
                <video
                  controls
                  className="w-full h-full object-cover"
                  preload="none"
                  poster={video.poster}
                >
                  <source src={video.src} type="video/mp4" />
                  Your browser does not support the video tag.
                </video>
              </div>
            </div>
          ))}
        </div>


        {/* Button */}
        <div className="flex justify-center mt-10 px-4">
          <a href="/our-services" className="w-full max-w-[300px] sm:max-w-[300px] md:max-w-[320px] lg:max-w-[400px] xl:max-w-[450px]">
            <button className="w-full bg-[#2479C2] text-white text-lg py-3 rounded-lg shadow-md hover:bg-[#1d69b1] active:scale-95 transform transition duration-150 ease-in-out">
              VIEW CASE STUDY
            </button>
          </a>
        </div>
      </div>

      {/* Appointment Section */}
      <div id="appointment" className="flex flex-col md:flex-row justify-center items-start p-5 md:p-10">
        {/* Left Side */}
        <div className="bg-[#2479C2] w-full md:w-6/12 sm:w-6/12 sm:h-3/12 p-6 md:p-10 box-border min-h-[700px] md:min-h-[60vh] mt-8">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-white text-xl font-semi-bold mb-2.5 flex items-center">
              <img src="https://res.cloudinary.com/dxrryep5y/image/upload/v1753296079/website_static_media/Vector_1.png" alt="Appointment Icon" className="w-5 h-auto mr-1.5" loading="lazy" />
              MAKE APPOINTMENT
            </h2>
            <h1 className="text-white text-2xl font-semi-bold mb-2.5">PARTNER WITH US FOR RELIABLE ENGINEERING SOLUTIONS!</h1>
            <p className="text-white text-base mb-5">From Ideation to Execution, we deliver it ALL.</p>
            <div className="partner-col">
              <ul className="list-none p-0">
                <li className="mb-2.5">
                  <h6 className="text-white text-base mb-1.25 font-bold">LOCATION</h6>
                  <a
                    href="https://maps.app.goo.gl/TdVCnvpmeFAvt345A"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-white no-underline flex items-center"
                  >
                    <i className="fa fa-map-marker bg-[#373737] w-9 h-9 rounded-full mr-2.5 flex justify-center items-center"></i>
                    Shop No. 30/15, Unity Industrial Estate, Saidham Road, Dhayari, Pune, Maharashtra 411041
                  </a>
                </li>
                <li className="mb-2.5">
                  <h6 className="text-white text-base mb-1.25 font-bold">EMAIL</h6>
                  <a href="mailto:projects@accudesign.in" className="text-white no-underline flex items-center">
                    <i className="fa fa-envelope bg-[#373737] w-9 h-9 rounded-full mr-2.5 flex justify-center items-center"></i>
                    projects@accudesign.in
                  </a>
                </li>
                <li className="mb-2.5">
                  <h6 className="text-white text-base mb-1.25 font-bold">PHONE</h6>
                  <a href="tel:+91-9579314891" className="text-white no-underline flex items-center mt-2 font-bold">
                    <i className="fa fa-phone-square bg-[#373737] w-9 h-9 rounded-full mr-2.5 flex justify-center items-center"></i>
                    +91-9579314891
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Right Side */}
        <div className="w-full md:w-5/12 bg-white p-5 box-border border-2 border-[#2479C2] mt-5 md:mt-0 h-[75vh]">
          <h2 className="text-[#2479C2] text-2xl font-bold mb-2.5 text-center">HOW CAN WE HELP</h2>
          <div className="input-help">
            <form id="contactForm" action="https://api.web3forms.com/submit" method="POST">
              <input type="hidden" name="access_key" value="c4fcec5c-3bdc-4da3-ad7d-d6119b630fb9" />
              <input
                type="text"
                id="name"
                name="name"
                placeholder="YOUR NAME"
                required
                className="w-full px-2.5 py-2.5 my-2.5 box-border border border-gray-300 placeholder-gray-600 text-sm"
              />
              <input
                type="text"
                id="number"
                name="number"
                placeholder="PHONE NUMBER"
                required
                className="w-full px-2.5 py-2.5 my-2.5 box-border border border-gray-300 placeholder-gray-600 text-sm"
              />
              <input
                type="email"
                id="email"
                name="email"
                placeholder="EMAIL ADDRESS"
                required
                className="w-full px-2.5 py-2.5 my-2.5 box-border border border-gray-300 placeholder-gray-600 text-sm"
              />
              <textarea
                id="issue"
                name="issue"
                placeholder="YOUR ISSUE"
                className="w-full px-2.5 py-2.5 my-2.5 box-border border border-gray-300 h-40 placeholder-gray-600 text-sm"
                required
              ></textarea>
              <button
                type="submit"
                className="w-full bg-[#828282] text-white py-2.5 px-0 text-lg font-bold border-none cursor-pointer mt-2.5"
              >
                SEND YOUR MESSAGE
              </button>
            </form>
          </div>
        </div>

      </div>
      {/* FAQs Section */}
      <div id="faq" className="w-full px-5 md:px-10 lg:px-20 py-10">
        <div className="flex items-center mb-6">
          <img src="https://res.cloudinary.com/dxrryep5y/image/upload/v1753296081/website_static_media/Vector.png " alt="FAQs Icon" className="w-10 h-auto mr-2" loading="lazy" />
          <h2 className="text-[#2479C2] text-4xl font-bold">FAQs</h2>
        </div>
        <h1 className="text-5xl font-bold mb-10">FREQUENTLY ASKED QUESTIONS</h1>

        <div className="flex flex-col md:flex-row gap-6">
          {[0, 1].map((col) => (
            <div key={col} className="flex-1 space-y-2.5">
              {faqs.slice(col * 3, col * 3 + 3).map((faq, idx) => {
                const index = col * 3 + idx;
                const isOpen = activeIndex === index;
                return (
                  <div
                    key={index}
                    className="border-b border-gray-300 pb-2 relative"
                  >
                    <div
                      className="flex justify-between items-center cursor-pointer pl-3"
                      onClick={() => toggleFAQ(index)}
                    >
                      <div className="text-base font-bold border-l-4 border-[#2479C2] pl-3 py-3 w-full">
                        {faq.question}
                      </div>
                      <FaChevronDown
                        className={`text-[#2479C2] transition-transform duration-300 mr-4 ${isOpen ? 'rotate-180' : ''
                          }`}
                      />
                    </div>
                    {isOpen && (
                      <div className="mt-2 text-sm text-gray-700 px-6">
                        {faq.answer}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          ))}
        </div>
      </div>
      {/* Floating Chatbot Button and Modal */}
      <div>
        {/* Floating Button */}
        <button
          onClick={() => setShowChat(true)}
          className="fixed bottom-6 right-6 z-50 bg-blue-600 hover:bg-blue-700 text-white px-4 py-3 rounded-full shadow-xl transition duration-300"
        >
          💬 Chat with AI
        </button>

        {/* Chat Modal */}
        {showChat && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
            <div className="relative bg-white w-full max-w-3xl h-[80vh] rounded-lg shadow-lg overflow-hidden">

              {/* Top-right Controls: Expand & Close */}
              <div className="absolute top-3 right-3 flex gap-2 items-center">

                {/* Expand Icon */}
                <button
                  onClick={() => window.open("https://chat.accudesign.in", "_blank")}
                  className="text-gray-600 hover:text-blue-600 text-xl px-2"
                  title="Open in new tab"
                >
                  ↗
                </button>

                {/* Close Icon */}
                <button
                  onClick={() => setShowChat(false)}
                  className="text-gray-700 hover:text-black text-xl font-bold px-2"
                  title="Close"
                >
                  ✕
                </button>
              </div>

              {/* Chatbot Iframe */}
              <iframe
                src="https://chat.accudesign.in"
                title="AccuDesign Chatbot"
                className="w-full h-full border-none"
              ></iframe>
            </div>
          </div>
        )}
      </div>

      {/* Copyright Section */}
      <div className="copyright flex justify-center items-center w-full h-auto text-white bg-[#2479C2] text-base p-2.5 box-border text-center">
        <p>&copy; Copyright 2025 TechNewity Labs - All rights reserved.</p>
      </div>
    </div>
  );
};

export default Home;

