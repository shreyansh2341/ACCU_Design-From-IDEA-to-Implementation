import React, { useEffect, useRef, useState } from "react";
import { SLink } from "@/components/SLink";

const SliderComponent = () => {
  const sliderRef = useRef(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [imageWidth, setImageWidth] = useState(0);
  const autoScrollRef = useRef(null);

  const services = [
    { src: "https://res.cloudinary.com/dxrryep5y/image/upload/v1753295862/website_static_media/home_machnining.png", name: "Precision Machining", link: "/machining" },
    { src: "https://res.cloudinary.com/dxrryep5y/image/upload/v1753295896/website_static_media/laser1.png", name: "Laser Cutting", link: "/laser-cuttting" },
    { src: "https://res.cloudinary.com/dxrryep5y/image/upload/v1753295805/website_static_media/fabrication1.png", name: "Aluminium, Stainless Steel Fabrication", link: "/fabrication" },
    { src: "https://res.cloudinary.com/dxrryep5y/image/upload/v1753295775/website_static_media/3d_print_1.png", name: "3D Printing", link: "/3d printing" },
    { src: "https://res.cloudinary.com/dxrryep5y/image/upload/v1753295794/website_static_media/casting.png", name: "Casting", link: "/casting" },
    { src: "https://res.cloudinary.com/dxrryep5y/image/upload/v1753295818/website_static_media/gear1.png", name: "Gear", link: "/gear" },
    { src: "https://res.cloudinary.com/dxrryep5y/image/upload/v1753295786/website_static_media/bending.png", name: "Bending", link: "/bending" },
    { src: "https://res.cloudinary.com/dxrryep5y/image/upload/v1753296098/website_static_media/wire_cutting.png", name: "Cutting", link: "/cutting" },
  ];

  const duplicatedServices = [...services, ...services];

  useEffect(() => {
    const firstItem = sliderRef.current.querySelector(".slider-item1");
    if (firstItem) {
      setImageWidth(firstItem.offsetWidth + 20);
    }
    updateSliderPosition();
    startAutoScroll();

    return () => clearInterval(autoScrollRef.current);
  }, []);

  const updateSliderPosition = () => {
    sliderRef.current.style.transition = "transform 0.5s ease-in-out";
    sliderRef.current.style.transform = `translateX(-${currentIndex * imageWidth}px)`;
  };

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => prevIndex + 1);
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? duplicatedServices.length - 1 : prevIndex - 1
    );
  };

  useEffect(() => {
    if (currentIndex >= services.length) {
      setTimeout(() => {
        sliderRef.current.style.transition = "none";
        setCurrentIndex(0);
        sliderRef.current.style.transform = `translateX(0px)`;
      }, 500);
    } else {
      updateSliderPosition();
    }
  }, [currentIndex]);

  const startAutoScroll = () => {
    autoScrollRef.current = setInterval(nextSlide, 3000);
  };

  const stopAutoScroll = () => {
    clearInterval(autoScrollRef.current);
  };

  return (
    <div className="relative w-[90%] mx-auto flex flex-col items-center justify-center overflow-hidden">
      <div className="relative w-full flex items-center justify-center">
        
        {/* Left Arrow */}
        <button
          onClick={prevSlide}
          className="absolute left-1 top-1/3 -translate-y-1/2 
                     bg-[#2479C2] text-white px-2 py-1 sm:px-3 sm:py-2 
                     rounded-md z-10 shadow hover:bg-[#1e6aa8] 
                     opacity-80 hover:opacity-100 transition-all"
        >
          &#10094;
        </button>

        <div
          className="overflow-hidden w-[90%]"
          onMouseEnter={stopAutoScroll}
          onMouseLeave={startAutoScroll}
        >
          <div
            ref={sliderRef}
            className="flex gap-5 transition-transform duration-500 ease-in-out whitespace-nowrap"
          >
            {duplicatedServices.map((item, index) => (
              <div
                key={index}
                className="slider-item1 group flex flex-col items-center min-w-[300px] relative"
              >
                <div className="relative w-[300px] h-[200px]">
                  <img
                    src={item.src}
                    alt={item.name}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute bottom-0 w-full bg-black/60 text-white text-center py-1 text-sm uppercase">
                    {item.name}
                  </div>
                </div>
                <div className="button-wrapper flex flex-col sm:flex-row gap-2 mt-4 sm:mt-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <SLink
                    to={item.link}
                    className="bg-[#2479C2] text-white px-4 py-2 rounded-full border-2 border-[#2479C2] hover:bg-white hover:text-[#2479C2] text-sm w-[170px] text-center"
                  >
                    Learn More
                  </SLink>
                  <a
                    href="/get-quote"
                    className="bg-[#2479C2] text-white px-4 py-2 rounded-full border-2 border-[#2479C2] hover:bg-white hover:text-[#2479C2] text-sm w-[170px] text-center"
                  >
                    Get a free Quote
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right Arrow */}
        <button
          onClick={nextSlide}
          className="absolute right-1 top-1/3 -translate-y-1/2 
                     bg-[#2479C2] text-white px-2 py-1 sm:px-3 sm:py-2 
                     rounded-md z-10 shadow hover:bg-[#1e6aa8] 
                     opacity-80 hover:opacity-100 transition-all"
        >
          &#10095;
        </button>
      </div>

      <div className="flex justify-center mt-6 sm:mt-8">
        <SLink to="/our-services">
          <button className="bg-[#2479C2] text-white py-3 px-8 rounded-md text-lg shadow-md hover:shadow-lg transition-all duration-300">
            VIEW MORE SERVICES
          </button>
        </SLink>
      </div>
    </div>
  );
};

export default SliderComponent;
