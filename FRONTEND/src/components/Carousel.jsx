import React, { useEffect, useRef, useState } from 'react';

const images = [
  {
    src: 'https://res.cloudinary.com/dxrryep5y/image/upload/v1753295691/website_static_media/Hero.jpg',
    author: 'ACCU DESIGN',
    title: 'EXPERTS',
    topic: 'CERTIFIED',
    des: `We at ACCU DESIGN, specialize in precision manufacturing,
    development of indigenous engineering solutions tailored to
    meet the unique needs of our clients.
    MAKE APPOINTMENT +91-9579314891 EMERGENCY ASSISTANCE`,
    link: '/',
  },
  {
    src: 'https://res.cloudinary.com/dxrryep5y/image/upload/v1753295932/website_static_media/machining2.png',
    author: 'ACCU DESIGN',
    title: 'MACHINING',
    topic: 'Saving Resources',
    des: `We offer comprehensive solutions designed to boost your bottom line while minimizing your environmental footprint.  Our services focus on optimizing resource utilization, reducing waste, and improving operational efficiency.`,
    link: '/machining',
  },
  {
    src: 'https://res.cloudinary.com/dxrryep5y/image/upload/v1753295912/website_static_media/laser2.png',
    author: 'ACCU DESIGN',
    title: 'Laser Cutting',
    topic: 'Saving Resources',
    des: ` Our Precision Laser Cutting Services Offer Cost-Effective, High-Quality Solutior While Minimizing Material Waste And Environmental Impact.`,
    link: '/laser-cutting',
  },
  {
    src: 'https://res.cloudinary.com/dxrryep5y/image/upload/v1753295810/website_static_media/fabrication2.png',
    author: 'ACCU DESIGN',
    title: 'Fabrication',
    topic: 'Saving Resources',
    des: `Fabrication We Offer Custom Fabrication Services That Ensure High-Quality, Cost-Effective Solutions While Minimizing Waste And Promoting Sustainability.`,
    link: '/fabrication',
  },
  {
    src: 'https://res.cloudinary.com/dxrryep5y/image/upload/v1753295775/website_static_media/3d_print_1.png',
    author: 'ACCU DESIGN',
    title: '3D PRINTING',
    topic: 'Optimization',
    des: `3D Printing We Can Provide You With A Range Of Solutions To Save Money And Reduce Your Carbon
    Footprint. By adopting 3D printing technologies and incorporating sustainable practices,
    businesses and individuals can save money, reduce their environmental impact, 
    and contribute to a more sustainable future.`,
    link: '/3d-printing',
  },
  {
    src: ' https://res.cloudinary.com/dxrryep5y/image/upload/v1753295798/website_static_media/casting2.png',
    author: 'ACCU DESIGN',
    title: 'Casting',
    topic: 'Synergy',
    des: `Our Casting Solutions Provide Durable, Precise, And Cost-Effective Components. Reducing Material Waste And Supporting Sustainable Production Practices.`,
    link: '/casting',
  },
  {
    src: 'https://res.cloudinary.com/dxrryep5y/image/upload/v1753295822/website_static_media/gear2.png',
    author: 'ACCU DESIGN',
    title: 'Gear',
    topic: 'Synergy',
    des: `We are experts in high-precision gear manufacturing, providing cost-effective solutions tailored to your specific needs. Our specialized processes minimize material waste during production, contributing to both cost savings and a smaller environmental footprint.`,
    link: '/gear',
  },
];

const Carousel = () => {
  const [current, setCurrent] = useState(0);
  const timeoutRef = useRef(null);
  const [direction, setDirection] = useState('');

  const resetTimeout = () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
  };

  useEffect(() => {
    resetTimeout();
    timeoutRef.current = setTimeout(() => {
      setDirection('next');
      setCurrent((prev) => (prev + 1) % images.length);
    }, 7000);
    return () => resetTimeout();
  }, [current]);

  const handleNext = () => {
    setDirection('next');
    setCurrent((prev) => (prev + 1) % images.length);
  };

  const handlePrev = () => {
    setDirection('prev');
    setCurrent((prev) => (prev - 1 + images.length) % images.length);
  };

  return (
    <div className={`carousel relative w-full h-screen overflow-hidden ${direction}`}>
      <div className="list relative w-full h-full">
        {images.map((item, index) => (
          <div
            key={index}
            className={`item absolute inset-0 w-full h-full transition-opacity duration-700 ${index === current ? 'z-10 opacity-100' : 'opacity-0 z-0'}`}
          >
            <img src={item.src} alt={item.title} className="w-full h-full object-cover" />
            <div className="content absolute top-[20%] left-1/2 transform -translate-x-1/2 w-[90%] max-w-[1140px] md:pr-[30%] text-white text-shadow backdrop-blur-md bg-black/40 p-4 rounded-md">
              <div className="author font-bold tracking-[10px]">{item.author}</div>
              <div className="title text-4xl sm:text-5xl md:text-6xl font-bold leading-tight">{item.title}</div>
              <div className="topic text-orange-500 text-[30px] sm:text-[40px] md:text-[50px] font-bold">{item.topic}</div>
              <div className={`desi text-justify mt-4 ${index === 0 ? 'bg-[#3c3a3a] p-2 rounded-md' : ''}`}>{item.des}</div>
              <div className="buttons grid grid-cols-2 w-[260px] h-[40px] gap-2 mt-5">
                <button className="bg-gray-200 text-black font-medium tracking-widest">
                  <a href={item.link}>SEE MORE</a>
                </button>
                <button className="border border-white text-white tracking-widest">
                  {index === 0 ? 'SUBSCRIBE' : 'LEARN MORE'}
                </button>
              </div>
              {/* Arrows for mobile inside description block */}
              <div className="arrows mt-6 flex justify-center gap-4 sm:hidden">
                <button onClick={handlePrev} className="w-[40px] h-[40px] rounded-full bg-blue-600 text-white font-bold text-xl shadow-md hover:bg-[#2479C2] hover:text-black">
                  {'<'}
                </button>
                <button onClick={handleNext} className="w-[40px] h-[40px] rounded-full bg-blue-600 text-white font-bold text-xl shadow-md hover:bg-[#2479C2] hover:text-black">
                  {'>'}
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Thumbnails - hidden on small screens */}
      <div className="thumbnail absolute bottom-[10px] left-1/2 -translate-x-1/2 gap-5 z-[100] overflow-hidden px-2 max-w-full hidden sm:flex">
        {images.map((item, index) => (
          <a
            key={index}
            href={item.link}
            className="item min-w-[120px] sm:w-[150px] h-[160px] flex-shrink-0 relative mb-[-30px] cursor-pointer group"
            onClick={(e) => {
              e.stopPropagation();
              setCurrent(index);
            }}
          >
            <div className="relative w-full h-full rounded-2xl overflow-hidden">
              <img
                src={item.src}
                alt={`Thumbnail ${index}`}
                className="w-full h-full object-cover"
              />
              <div className="absolute bottom-0 left-0 right-0 bg-black/60 text-white text-center py-1 text-sm font-medium">
                {item.title}
              </div>
            </div>
          </a>
        ))}
      </div>

      {/* Arrows for desktop */}
      <div className="arrows absolute z-[100] w-full justify-between px-6 top-1/2 transform -translate-y-1/2 hidden sm:flex">
        <button onClick={handlePrev} className="w-[45px] h-[45px] rounded-full bg-blue-600 text-white font-bold text-xl shadow-md hover:bg-[#2479C2] hover:text-black">
          {'<'}
        </button>
        <button onClick={handleNext} className="w-[45px] h-[45px] rounded-full bg-blue-600 text-white font-bold text-xl shadow-md hover:bg-[#2479C2] hover:text-black">
          {'>'}
        </button>
      </div>

      {/* Time bar */}
      <div className="time absolute top-0 left-0 h-[3px] bg-[#f1683a] z-[1000] w-0"></div>
    </div>
  );
};

export default Carousel;
