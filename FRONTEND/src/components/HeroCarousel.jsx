import React, { useState, useEffect, useCallback } from 'react';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';

const HeroCarousel = () => {
  const [activeSlide, setActiveSlide] = useState(null);
  const [currentSlide, setCurrentSlide] = useState(0);
  
  const slides = [
    {
      image: "/accuimages/hero-1.jpg",
      title: "Precision Engineering Solutions",
      subtitle: "Innovative Manufacturing & Prototyping",
      description: "We deliver high-quality precision engineering solutions tailored to your specific requirements."
    },
    {
      image: "/accuimages/hero-2.jpg",
      title: "Advanced Manufacturing",
      subtitle: "State-of-the-Art Technology",
      description: "Utilizing cutting-edge technology to provide superior manufacturing services."
    },
    {
      image: "/accuimages/hero-3.jpg",
      title: "Custom Fabrication",
      subtitle: "Tailored to Your Needs",
      description: "From concept to completion, we bring your ideas to life with precision and expertise."
    },
    {
      image: "/accuimages/hero-4.jpg",
      title: "Quality & Reliability",
      subtitle: "Excellence in Every Detail",
      description: "Our commitment to quality ensures reliable solutions that exceed expectations."
    }
  ];

  const nextSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
  }, [slides.length]);

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
  };

  useEffect(() => {
    // Only auto-rotate when no panel is being hovered
    if (activeSlide === null) {
      const interval = setInterval(() => {
        nextSlide();
      }, 5000);
      return () => clearInterval(interval);
    }
  }, [nextSlide, activeSlide]);

  return (
    <div className="relative w-full h-[600px] overflow-hidden flex bg-gradient-to-r from-[#f0f8ff] to-[#e6f2ff]">
      {/* Panel-style carousel - 70% width */}
      <div className="flex h-full w-[70%] relative">
        {slides.map((slide, index) => {
          // Alternate the tilt direction - head tilted right, foot tilted left
          const tiltClass = `transform-gpu rotate-1 origin-top-right`;
          
          return (
            <div
              key={index}
              className={`relative h-full transition-all duration-700 ease-in-out flex-shrink-0 overflow-hidden mx-1 ${tiltClass} ${
                activeSlide === index 
                  ? 'w-full absolute inset-0 z-30' 
                  : activeSlide === null 
                    ? `w-[${Math.floor(100 / slides.length)}%]` 
                    : 'w-[10%]'
              }`}
              onMouseEnter={() => setActiveSlide(index)}
              onMouseLeave={() => setActiveSlide(null)}
              style={{
                clipPath: activeSlide === index 
                  ? 'polygon(0 0, 100% 0, 100% 100%, 0 100%)' 
                  : `polygon(0 0, 100% 0, 98% 100%, 2% 100%)`
              }}
            >
              {/* Image with subtle overlay */}
              <div className="relative w-full h-full">
                <img
                  src={slide.image}
                  alt={slide.title}
                  className="w-full h-full object-cover"
                  loading={index === 0 ? "eager" : "lazy"}
                />
                <div className={`absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[rgba(0,0,0,0.6)] transition-opacity duration-700`}></div>
              </div>
              
              {/* Content */}
              <div className={`absolute inset-0 flex flex-col justify-end items-start px-6 md:px-10 pb-12 z-20 text-white
                ${activeSlide === index ? 'opacity-100' : 'opacity-0'} transition-opacity duration-500`}>
                <div className="max-w-xl transform transition-all duration-700 ease-out">
                  <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-2 text-white drop-shadow-lg">{slide.title}</h1>
                  <h2 className="text-xl md:text-2xl font-semibold mb-3 text-blue-300 drop-shadow-md">{slide.subtitle}</h2>
                  <p className="text-base md:text-lg mb-5 max-w-lg">{slide.description}</p>
                  <button className="bg-[#2479C2] hover:bg-[#1a5db0] text-white font-bold py-2 px-5 rounded-md transition-all duration-300 transform hover:scale-105 hover:shadow-lg">
                    Discover More
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
      
      {/* Intro content - 30% width - more interactive and attractive */}
      <div className="w-[30%] h-full bg-gradient-to-br from-[#1a5db0] to-[#2479C2] text-white p-8 flex flex-col justify-center relative overflow-hidden">
        {/* Animated background elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -right-16 -top-16 w-64 h-64 rounded-full bg-blue-400 opacity-10 animate-pulse"></div>
          <div className="absolute left-10 bottom-10 w-32 h-32 rounded-full bg-white opacity-5 animate-pulse" style={{animationDelay: '1s'}}></div>
          <div className="absolute right-10 bottom-32 w-16 h-16 rounded-full bg-blue-200 opacity-10 animate-pulse" style={{animationDelay: '2s'}}></div>
        </div>
        
        {/* Content with animated entrance */}
        <div className={`relative z-10 transition-opacity duration-500 ${activeSlide === null ? 'opacity-100' : 'opacity-0'}`}>
          <h2 className="text-3xl font-bold mb-6 text-white relative">
            Welcome to 
            <span className="block text-4xl mt-1 text-yellow-300 drop-shadow-md">ACCU DESIGN</span>
            <div className="absolute -left-2 -top-2 w-12 h-1 bg-yellow-300"></div>
          </h2>
          
          <div className="space-y-6">
            <div className="transform transition-all duration-300 hover:translate-x-2">
              <p className="text-lg mb-2 flex items-center">
                <span className="inline-block w-6 h-6 mr-2 bg-blue-400 rounded-full flex items-center justify-center text-blue-800 font-bold">1</span>
                We specialize in precision engineering and manufacturing solutions.
              </p>
            </div>
            
            <div className="transform transition-all duration-300 hover:translate-x-2">
              <p className="text-lg mb-2 flex items-center">
                <span className="inline-block w-6 h-6 mr-2 bg-blue-400 rounded-full flex items-center justify-center text-blue-800 font-bold">2</span>
                From CNC machining to 3D printing, laser cutting to custom fabrication.
              </p>
            </div>
            
            <div className="transform transition-all duration-300 hover:translate-x-2">
              <p className="text-lg mb-2 flex items-center">
                <span className="inline-block w-6 h-6 mr-2 bg-blue-400 rounded-full flex items-center justify-center text-blue-800 font-bold">3</span>
                With state-of-the-art technology and skilled professionals.
              </p>
            </div>
          </div>
          
          <button className="mt-8 bg-white text-[#2479C2] hover:bg-blue-100 font-bold py-3 px-6 rounded-md transition-all duration-300 transform hover:scale-105 hover:shadow-xl flex items-center group">
            Our Services
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2 transform group-hover:translate-x-1 transition-transform duration-200" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </button>
        </div>
      </div>
      
      {/* Navigation arrows - only visible when no panel is being hovered */}
      <div className={`transition-opacity duration-300 ${activeSlide === null ? 'opacity-100' : 'opacity-0'}`}>
        <button 
          onClick={prevSlide}
          className="absolute left-4 top-1/2 transform -translate-y-1/2 z-20 bg-white bg-opacity-20 hover:bg-opacity-40 text-white p-3 rounded-full transition-all duration-300 backdrop-blur-sm"
          aria-label="Previous slide"
        >
          <FaChevronLeft size={20} />
        </button>
        <button 
          onClick={nextSlide}
          className="absolute right-4 top-1/2 transform -translate-y-1/2 z-20 bg-white bg-opacity-20 hover:bg-opacity-40 text-white p-3 rounded-full transition-all duration-300 backdrop-blur-sm"
          aria-label="Next slide"
        >
          <FaChevronRight size={20} />
        </button>
      </div>
      
      {/* Indicators - only visible when no panel is being hovered */}
      <div className={`absolute bottom-6 left-1/3 transform -translate-x-1/2 z-20 flex space-x-2 transition-opacity duration-300 ${activeSlide === null ? 'opacity-100' : 'opacity-0'}`}>
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${
              currentSlide === index ? 'bg-white w-10' : 'bg-white bg-opacity-50'
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
};

export default HeroCarousel;