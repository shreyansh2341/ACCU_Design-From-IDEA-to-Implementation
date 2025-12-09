import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { SLink } from '@/components/SLink';
import {
  FaChevronDown,
  FaSignInAlt,
  FaSignOutAlt,
  FaTachometerAlt,
  FaTools,
  FaClipboardList,
  FaFileAlt,
  FaLightbulb,
  FaPhoneAlt,
  FaComments,
  FaMapMarkedAlt,
  FaBullseye,
  FaHandshake,
  FaInfoCircle,
  FaBriefcase,
  FaNewspaper,
  FaBars,
  FaTimes
} from 'react-icons/fa';
import { useAuth } from '@/context/AuthProvider.jsx';
import axios from 'axios';
import toast from 'react-hot-toast';
import SearchBar from '@/components/SearchBar.jsx';

const REACT_APP_BACKEND_URL = import.meta.env.VITE_WEBSITE_URL || 'http://localhost:4000';

const Navbar = () => {
  const { authenticatedUser, setauthenticatedUser, setProfile } = useAuth();
  const navigate = useNavigate();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);

  const handleLogout = async () => {
    try {
      await axios.get(`${REACT_APP_BACKEND_URL}/api/user/logout`, {
        withCredentials: true,
      });
      setauthenticatedUser(false);
      setProfile(null);
      toast.success('Logged out successfully!');
      navigate('/');
    } catch (error) {
      console.error('Logout failed', error);
      toast.error('Logout failed');
    }
  };

  const scrollToSection = (id) => {
    setMobileMenuOpen(false);
    const section = document.getElementById(id);
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' });
    } else {
      navigate('/');
      setTimeout(() => {
        const target = document.getElementById(id);
        if (target) target.scrollIntoView({ behavior: 'smooth' });
      }, 500);
    }
  };

  const toggleDropdown = (dropdown) => {
    setActiveDropdown(activeDropdown === dropdown ? null : dropdown);
  };

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setMobileMenuOpen(false);
    setActiveDropdown(null);
  };

  return (
    <nav className="bg-[#f0f8ff] shadow-lg px-4 py-2 sticky top-0 z-50">
      <div className="flex flex-wrap justify-between container mx-auto items-center">
        {/* Left - Logo & Menu */}
        <div className="flex items-center">
          <SLink to="/" className="text-white text-2xl font-bold mr-6" onClick={closeMobileMenu}>
            <img src="https://res.cloudinary.com/dxrryep5y/image/upload/v1753295781/website_static_media/ad_logo.svg " alt="Logo" className="w-16 h-16" />
          </SLink>

          {/* Desktop Navigation - Moved right after logo */}
          <div className="hidden md:flex items-center">
            <ul className="flex space-x-8">
              {/* Home Dropdown */}
              <div className="relative group cursor-pointer">
                <div className="flex items-center text-black hover:text-blue-500 space-x-1 transition-all duration-300">
                  <span className="cursor-pointer" onClick={() => scrollToSection('home')}>Home</span>
                  <FaChevronDown size={12} />
                </div>
                <div className="absolute opacity-0 invisible group-hover:visible group-hover:opacity-100 group-hover:translate-y-2 transition-all duration-300 ease-in-out delay-150 bg-white text-black mt-2 rounded-md shadow-lg z-50 py-4 px-3 min-w-[500px] grid grid-cols-2 gap-4">
                  <div className="col-span-2 pb-2 border-b">
                    <h3 className="text-md font-semibold text-blue-600">Discover ACCU DESIGN</h3>
                    <p className="text-sm text-gray-600">Navigate through our core offerings, client stories, and support.</p>
                  </div>
                  {[{ id: 'services', label: 'Our Services', icon: <FaTools />, desc: 'What we provide to clients' },
                  { id: 'blogs', label: 'Our Blogs', icon: <FaFileAlt />, desc: 'Insights and updates' },
                  { id: 'testimonials', label: 'Testimonials', icon: <FaComments />, desc: 'Feedback from clients' },
                  { id: 'appointment', label: 'Make Appointment', icon: <FaClipboardList />, desc: 'Schedule a consultation' },
                  { id: 'faq', label: 'FAQs', icon: <FaLightbulb />, desc: 'Common questions answered' },
                  ].map((item) => (
                    <div key={item.id}
                      onClick={() => scrollToSection(item.id)}
                      className="flex items-start hover:bg-gray-100 p-2 rounded transition-all cursor-pointer space-x-2"
                    >
                      <div className="mt-1 text-gray-600 hover:text-blue-500 transition">{item.icon}</div>
                      <div>
                        <h4 className="text-sm font-semibold hover:text-blue-500 transition">{item.label}</h4>
                        <p className="text-xs text-gray-600 hover:text-blue-500 transition">{item.desc}</p>
                      </div>
                    </div>
                  ))}
                  <div className="col-span-1 p-2 rounded bg-blue-50 text-blue-800 text-sm font-semibold flex items-center justify-center text-center">
                    Empowering Innovation with Precision ⚙️
                  </div>
                </div>
              </div>

              {/* Our Services */}
              <div className="relative group cursor-pointer">
                <div className="flex items-center text-black hover:text-blue-500 space-x-1 transition-all duration-300">
                  <SLink to="/our-services" className="flex items-center space-x-1">
                    <span>Our Services</span>
                    <FaChevronDown size={12} />
                  </SLink>
                </div>
                <div className="absolute opacity-0 invisible group-hover:visible group-hover:opacity-100 group-hover:translate-y-2 transition-all duration-300 ease-in-out delay-150 bg-white text-black mt-2 rounded-md shadow-lg z-50 py-1 px-4 min-w-[700px] grid grid-cols-3 gap-x-3 gap-y-3">

                  {/* Heading */}
                  <div className="col-span-3 pb-2 border-b">
                    <h3 className="text-md font-semibold text-blue-600">Our Capabilities</h3>
                    <p className="text-sm text-gray-600">Explore the full range of advanced manufacturing services we offer.</p>
                  </div>
                  {[
                    { path: 'machining', img: 'https://res.cloudinary.com/dxrryep5y/image/upload/v1753295932/website_static_media/machining2.png', name: 'Machining', desc: 'High-precision CNC parts delivered fast.' },
                    { path: 'laser-cutting', img: ' https://res.cloudinary.com/dxrryep5y/image/upload/v1753295896/website_static_media/laser1.png', name: 'Laser Cutting', desc: 'Efficient and accurate laser cutting.' },
                    { path: '3d-printing', img: ' https://res.cloudinary.com/dxrryep5y/image/upload/v1753295775/website_static_media/3d_print_1.png', name: '3D Printing', desc: 'Rapid prototyping using modern printers.' },
                    { path: 'fabrication', img: 'https://res.cloudinary.com/dxrryep5y/image/upload/v1753295810/website_static_media/fabrication2.png', name: 'Fabrication', desc: 'Custom sheet metal fabrication solutions.' },
                    { path: 'bending', img: 'https://res.cloudinary.com/dxrryep5y/image/upload/v1753295786/website_static_media/bending.png', name: 'Bending', desc: 'Precise sheet metal bending services.' },
                    { path: 'gear', img: 'https://res.cloudinary.com/dxrryep5y/image/upload/v1753295822/website_static_media/gear2.png', name: 'Gear Manufacturing', desc: 'Custom gear production solutions.' },
                    { path: 'cutting', img: 'https://res.cloudinary.com/dxrryep5y/image/upload/v1753296098/website_static_media/wire_cutting.png', name: 'Wire Cutting', desc: 'High-accuracy wire EDM cutting.' },
                    { path: 'casting', img: 'https://res.cloudinary.com/dxrryep5y/image/upload/v1753295794/website_static_media/casting.png', name: 'Casting', desc: 'Reliable metal casting services.' },
                    // { path: 'machine', img: 'https://res.cloudinary.com/dxrryep5y/image/upload/v1753295935/website_static_media/machining3.png', name: 'Machine', desc: 'Industrial-grade machinery for precision manufacturing tasks.' },
                    // { path: 'sheet-metal', img: 'https://res.cloudinary.com/dxrryep5y/image/upload/v1753295746/website_static_media/sheet-metal-part.jpg', name: 'Sheet Metal', desc: 'Durable and accurate sheet metal components.' },
                    // { path: 'urethrane-casting', img: ': https://res.cloudinary.com/dxrryep5y/image/upload/v1753295765/website_static_media/Urethane_Casting.jpg', name: 'Urethrane Casting', desc: 'Flexible, high-quality urethane casting solutions.' }
                  ].map((service) => (
                    <SLink
                      key={service.name}
                      to={`/${service.path}`}
                      className="flex items-start hover:bg-gray-100 p-2 rounded transition-all space-x-2 min-h-[90px]"
                    >
                      <img
                        src={`${service.img}`}
                        alt={service.name}
                        className="w-10 h-10 object-cover rounded mr-2"
                      />
                      <div>
                        <h4 className="text-sm font-semibold hover:text-blue-500 transition">{service.name}</h4>
                        <p className="text-xs text-gray-600 hover:text-blue-500 transition">{service.desc}</p>
                      </div>
                    </SLink>
                  ))}

                  {/* Catchy Phrase Box at 12th place */}
                  <div className="flex items-center justify-center text-center p-2 min-h-[90px] rounded bg-blue-50 text-blue-800 text-sm font-semibold col-span-1">
                    Designed to Deliver. Powered by Precision ⚙️🚀
                  </div>
                </div>
              </div>

              {/* Industries */}
              <div className="relative group cursor-pointer">
                <div className="flex items-center text-black hover:text-blue-500 space-x-1 transition-all duration-300">
                  <SLink to="/our-services" className="flex items-center space-x-1">
                    <span>Industries</span>
                    <FaChevronDown size={12} />
                  </SLink>
                </div>
                <div className="absolute opacity-0 invisible group-hover:visible group-hover:opacity-100 group-hover:translate-y-2 transition-all duration-300 ease-in-out delay-150 bg-white text-black mt-2 rounded-md shadow-lg z-50 py-4 px-3 min-w-[600px] grid grid-cols-2 gap-4">

                  {/* Subheading */}
                  <div className="col-span-2 pb-2 border-b">
                    <h3 className="text-md font-semibold text-blue-600">Industries We Serve</h3>
                    <p className="text-sm text-gray-600">We deliver tailored manufacturing solutions across a variety of industries.</p>
                  </div>

                  {/* Industry Items */}
                  {[
                    { path: 'defence', img: 'https://res.cloudinary.com/dxrryep5y/image/upload/v1753295675/website_static_media/defence3.png', name: 'Defence', desc: 'Reliable solutions for mission-critical defense systems. Protect with precision.' },
                    { path: 'epc', img: 'https://res.cloudinary.com/dxrryep5y/image/upload/v1753295680/website_static_media/epc1.png', name: 'EPC', desc: 'Complete engineering, procurement, and construction solutions for complex projects. Build the future.' },
                    { path: 'biofuel', img: 'https://res.cloudinary.com/dxrryep5y/image/upload/v1753295683/website_static_media/gree.png', name: 'Bio-Fuel-Energy', desc: 'Complete engineering, procurement, and construction solutions for complex projects. Build the future.' },
                    { path: 'agri-tech', img: 'https://res.cloudinary.com/dxrryep5y/image/upload/v1753295632/website_static_media/agriculture.png', name: 'Agriculture', desc: 'Smart manufacturing for modern farming tools. Grow with technology.' },
                    { path: 'aerospace', img: 'https://res.cloudinary.com/dxrryep5y/image/upload/v1753295624/website_static_media/aerospace.png', name: 'Aerospace', desc: 'Precision parts for flight-critical applications. Soar with confidence.' },
                    { path: 'solarBattery', img: 'https://res.cloudinary.com/dxrryep5y/image/upload/v1753295636/website_static_media/battery.png', name: 'SolarBattery', desc: 'Reliable solutions for mission-critical defense systems. Protect with precision.' },
                  ].map((industry) => (
                    <SLink
                      key={industry.name}
                      to={`/${industry.path}`}
                      className="flex items-start hover:bg-gray-100 p-2 rounded transition-all space-x-2"
                    >
                      <img
                        src={`${industry.img}`}
                        alt={industry.name}
                        className="w-10 h-10 object-cover rounded mr-2"
                      />
                      <div>
                        <h4 className="text-sm font-semibold hover:text-blue-500 transition">{industry.name}</h4>
                        <p className="text-xs text-gray-600 hover:text-blue-500 transition">{industry.desc}</p>
                      </div>
                    </SLink>
                  ))}

                  {/* Catchy Phrase Box */}
                  <div className="col-span-2 p-2 rounded bg-blue-50 text-blue-800 text-sm font-semibold flex items-center justify-center text-center">
                    Built to Serve Every Industry with Innovation ⚙️✨
                  </div>
                </div>
              </div>
              {/* About Us */}
              <div className="relative group cursor-pointer">
                <div className="flex items-center text-black hover:text-blue-500 space-x-1 transition-all duration-300">
                  <SLink to="/about-us" className="flex items-center space-x-1">
                    <span>About Us</span>
                    <FaChevronDown size={12} />
                  </SLink>
                </div>
                <div className="absolute opacity-0 invisible group-hover:visible group-hover:opacity-100 group-hover:translate-y-2 transition-all duration-300 ease-in-out delay-150 bg-white text-black mt-2 rounded-md shadow-lg z-50 py-4 px-3 min-w-[500px] grid grid-cols-2 gap-4">
                  {/* Heading */}
                  <div className="pb-2 border-b">
                    <h3 className="text-md font-semibold text-blue-600">Who We Are</h3>
                    <p className="text-sm text-gray-600">Learn about our vision, culture, services, and opportunities.</p>
                  </div>
                  {[
                    {
                      sectionId: "mission",
                      icon: <FaBullseye className="text-gray-600 hover:text-blue-500 transition" />,
                      title: "Our Vision & Mission",
                      desc: "Learn about our goals and company purpose.",
                    },
                    {
                      sectionId: "brand-values",
                      icon: <FaHandshake className="text-gray-600 hover:text-blue-500 transition" />,
                      title: "Our Values",
                      desc: "The principles that guide our work and culture.",
                    },
                    {
                      sectionId: "about-services",
                      icon: <FaInfoCircle className="text-gray-600 hover:text-blue-500 transition" />,
                      title: "About Our Services",
                      desc: "A deeper look into what we offer.",
                    },
                    {
                      sectionId: "careers",
                      icon: <FaBriefcase className="text-gray-600 hover:text-blue-500 transition" />,
                      title: "Careers",
                      desc: "Explore job openings and opportunities.",
                    },
                  ].map((item, index) => (
                    <div
                      key={index}
                      className="flex items-start hover:bg-gray-100 p-2 rounded transition-all cursor-pointer space-x-2"
                      onClick={() => {
                        sessionStorage.setItem("scrollToAboutSection", item.sectionId);
                        window.location.href = "/about-us";
                      }}
                    >
                      <div className="mt-1">{item.icon}</div>
                      <div>
                        <h4 className="text-sm font-semibold hover:text-blue-500 transition">{item.title}</h4>
                        <p className="text-xs text-gray-600 hover:text-blue-500 transition">{item.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Blogs */}
              <div className="relative group cursor-pointer">
                <div className="flex items-center text-black hover:text-blue-500 space-x-1 transition-all duration-300">
                  <SLink to="/blog" className="flex items-center space-x-1">
                    <span>Blogs</span>
                    <FaChevronDown size={12} />
                  </SLink>
                </div>
                <div className="absolute opacity-0 invisible group-hover:visible group-hover:opacity-100 group-hover:translate-y-2 transition-all duration-300 ease-in-out delay-150 bg-white text-black mt-2 rounded-md shadow-lg z-50 py-4 px-3 min-w-[500px] grid grid-cols-2 gap-4">
                  {/* Heading */}
                  <div className="col-span-2 pb-2 border-b">
                    <h3 className="text-md font-semibold text-blue-600">Insights & Expertise</h3>
                    <p className="text-sm text-gray-600">Stay updated with industry trends, project journeys, and expert advice.</p>
                  </div>
                  {[
                    {
                      to: "/blogs/industry-news",
                      icon: <FaNewspaper className="text-gray-600 hover:text-blue-500 transition" />,
                      title: "Industry News",
                      desc: "Latest trends and updates in the field.",
                    },
                    {
                      to: "/blogs/project-stories",
                      icon: <FaTools className="text-gray-600 hover:text-blue-500 transition" />,
                      title: "Project Stories",
                      desc: "Real stories behind our projects.",
                    },
                    {
                      to: "/blogs/expert-tips",
                      icon: <FaLightbulb className="text-gray-600 hover:text-blue-500 transition" />,
                      title: "Expert Tips",
                      desc: "Insights and tips from industry experts.",
                    },
                    {
                      to: "/media-gallery",
                      icon: <FaLightbulb className="text-gray-600 hover:text-blue-500 transition" />,
                      title: "Media Gallery",
                      desc: "Explore our media journey featuring our top events, innovations, and behind-the-scenes.",
                    },
                  ].map((item, index) => (
                    <SLink
                      key={index}
                      to={item.to}
                      className="block p-2 hover:bg-gray-100 flex items-start space-x-2 rounded transition-all"
                    >
                      <div className="mt-1">{item.icon}</div>
                      <div>
                        <span className="font-semibold hover:text-blue-500 transition">{item.title}</span>
                        <p className="text-xs text-gray-600 hover:text-blue-500 transition">{item.desc}</p>
                      </div>
                    </SLink>
                  ))}

                  {/* 3 empty slots → Fill 1 with catchy text */}
                  <div className="col-span-1 p-2 rounded bg-blue-50 text-blue-800 text-sm font-semibold flex items-center justify-center text-center">
                    Built to Share Knowledge & Inspire 💡
                  </div>
                </div>
              </div>

              {/* Connect Us */}
              <div className="relative group cursor-pointer">
                <div className="flex items-center text-black hover:text-blue-500 space-x-1 transition-all duration-300">
                  <SLink to="/contact-us" className="flex items-center space-x-1">
                    <span>Connect Us</span>
                    <FaChevronDown size={12} />
                  </SLink>
                </div>
                <div className="absolute opacity-0 invisible group-hover:visible group-hover:opacity-100 group-hover:translate-y-2 transition-all duration-300 ease-in-out delay-150 bg-white text-black mt-2 rounded-md shadow-lg z-50 py-4 px-3 min-w-[500px] grid grid-cols-2 gap-4">
                  {/* Heading */}
                  <div className="col-span-2 pb-2 border-b">
                    <h3 className="text-md font-semibold text-blue-600">Connect With Us</h3>
                    <p className="text-sm text-gray-600">Whether you need info, a quote, or directions — we're just a click away.</p>
                  </div>
                  {[
                    {
                      to: "/Collab",
                      icon: <FaPhoneAlt className="text-gray-600 hover:text-blue-500 transitio" />,
                      title: "Collab with Us",
                      desc: "Reach us via phone, email or online.",
                    },
                    {
                      to: "/get-quote",
                      icon: <FaHandshake className="text-gray-600 hover:text-blue-500 transition" />,
                      title: "Get a Quote",
                      desc: "Request pricing for your requirements.",
                    },
                    {
                      to: "/connect/visit-office",
                      icon: <FaMapMarkedAlt className="text-gray-600 hover:text-blue-500 transition" />,
                      title: "Visit Our Office",
                      desc: "Find directions to our location.",
                    },
                  ].map((item, index) => (
                    <SLink
                      key={index}
                      to={item.to}
                      className="block p-2 hover:bg-gray-100 flex items-start space-x-2 rounded transition-all"
                    >
                      <div className="mt-1">{item.icon}</div>
                      <div>
                        <span className="font-semibold hover:text-blue-500 transition">{item.title}</span>
                        <p className="text-xs text-gray-600 hover:text-blue-500 transition">{item.desc}</p>
                      </div>
                    </SLink>
                  ))}

                  {/* Catchy Tagline */}
                  <div className="col-span-1 p-2 rounded bg-blue-50 text-blue-800 text-sm font-semibold flex items-center justify-center text-center">
                    Let's Build Great Things Together 🤝
                  </div>
                </div>
              </div>
            </ul>
          </div>
        </div>

        {/* Right side - SearchBar (desktop only), Auth, and Mobile menu button */}
        <div className="flex items-center">
          {/* SearchBar - visible only on desktop */}
          <div className="hidden md:block mr-4">
            <SearchBar />
          </div>

          {/* Right - Dashboard, Auth, Quote for desktop and medium devices */}
          <div className="hidden md:flex items-center space-x-4">
            {/* {authenticatedUser && (
              <SLink
                to={
                  authenticatedUser.role === 'admin'
                    ? '/admin-dashboard'
                    : authenticatedUser.role === 'vendor'
                      ? '/vendor-dashboard'
                      : '/user-dashboard'
                }
                className="text-black hover:text-blue-500 flex items-center transition-all duration-300"
              >
                <FaTachometerAlt className="mr-1" />
                Dashboard
              </SLink>
            )} */}

            {authenticatedUser && authenticatedUser.role === 'admin' && (
              <div className="relative group">
                {/* Button that admin sees */}
                <button
                  type="button"
                  className="flex items-center text-black hover:text-blue-500 transition-all duration-300"
                >
                  <FaTachometerAlt className="mr-1" />
                  <span>Admin Panel</span>
                  <FaChevronDown size={12} className="ml-1" />
                </button>

                {/* Dropdown with the two admin sections */}
                <div className="absolute right-0 mt-2 bg-white text-black rounded-md shadow-lg py-2 w-64 opacity-0 invisible group-hover:opacity-100 group-hover:visible transform group-hover:translate-y-1 transition-all duration-200 z-50">
                  <SLink
                    to="/admin-dashboard"
                    className="block px-4 py-2 text-sm hover:bg-gray-100"
                  >
                    <div className="font-semibold hover:text-blue-500">CMS Dashboard</div>
                    <p className="text-xs text-gray-500 hover:text-blue-500">
                      Blogs, posts, testimonials & media
                    </p>
                  </SLink>

                  <SLink
                    to="/manage-orders"
                    className="block px-4 py-2 text-sm hover:bg-gray-100"
                  >
                    <div className="font-semibold hover:text-blue-500">Orders & Users</div>
                    <p className="text-xs text-gray-500 hover:text-blue-500">
                      Orders, users, vendors & operations
                    </p>
                  </SLink>
                </div>
              </div>
            )}

            {authenticatedUser && authenticatedUser.role !== 'admin' && (
              <SLink
                to={
                  authenticatedUser.role === 'vendor'
                    ? '/vendor-dashboard'
                    : '/user-dashboard'
                }
                className="text-black hover:text-blue-500 flex items-center transition-all duration-300"
              >
                <FaTachometerAlt className="mr-1" />
                Dashboard
              </SLink>
            )}


            {/* 👤 Login / Logout + Tooltip */}
            {authenticatedUser ? (
              <button onClick={handleLogout} className="flex items-center text-black hover:text-red-500 transition-all">
                <FaSignOutAlt className="mr-2" />
                Logout
              </button>
            ) : (
              <div className="relative flex items-center justify-center">
                {/* 🌥️ Chat-style Floating Tooltip Below Login Button */}
                {/* <div className="absolute top-full mt-2 w-max px-4 py-2 bg-white text-blue-700 text-sm font-semibold rounded-lg border border-blue-300 shadow-lg animate-float z-[999]
                  before:content-[''] before:absolute before:-top-2 before:left-1/2 before:-translate-x-1/2 before:border-8 before:border-transparent before:border-b-white">
                  Login to explore more
                </div> */}

                {/* 🔒 Login Button */}
                <SLink to="/login" className="flex items-center text-black hover:text-green-500 transition-all relative z-10">
                  <FaSignInAlt className="mr-2" />
                  Login
                </SLink>
              </div>
            )}

            {/* 🚀 Instant Quote Button */}
            <SLink
              to="/get-quote"
              className="relative group inline-flex items-center px-6 py-3 rounded-full text-base font-semibold text-white bg-blue-600 overflow-hidden transition-all duration-300 shadow-md"
            >
              <span className="absolute inset-0 bg-blue-800 group-hover:translate-x-0 -translate-x-full transition-transform duration-700 ease-out z-0" />
              <span className="relative z-10">Get Instant Quote</span>
              <span className="ml-2 relative z-10 text-lg group-hover:translate-x-1 transition-transform duration-300">→</span>
            </SLink>
          </div>

          {/* Mobile menu button - only visible on small screens */}
          <button
            onClick={toggleMobileMenu}
            className="md:hidden text-black hover:text-blue-500 focus:outline-none"
            aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
          >
            {mobileMenuOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
          </button>
        </div>

        {/* Mobile Menu - Fixed overlay that doesn't affect the layout */}
        <div className={`md:hidden fixed inset-0 bg-white z-50 transition-transform duration-300 ease-in-out ${mobileMenuOpen ? 'translate-x-0' : 'translate-x-full'}`} style={{ top: '0', height: '100vh' }}>
          <div className="flex justify-between items-center p-4 border-b">
            <SLink to="/" onClick={closeMobileMenu}>
              <img src="https://res.cloudinary.com/dxrryep5y/image/upload/v1753295781/website_static_media/ad_logo.svg" alt="Logo" className="w-16 h-16" />
            </SLink>
            <button
              onClick={toggleMobileMenu}
              className="text-black hover:text-blue-500 focus:outline-none"
            >
              <FaTimes size={24} />
            </button>
          </div>

          {/* SearchBar - Added inside mobile menu */}
          <div className="p-4 border-b">
            <SearchBar />
          </div>

          <div className="overflow-y-auto h-full pb-20">
            <ul className="p-4 space-y-4">
              {/* Home Dropdown - Mobile */}
              <li>
                <div
                  className="flex justify-between items-center text-black py-2"
                  onClick={() => toggleDropdown('home')}
                >
                  <span>Home</span>
                  <FaChevronDown size={12} className={`transition-transform duration-300 ${activeDropdown === 'home' ? 'rotate-180' : ''}`} />
                </div>
                {activeDropdown === 'home' && (
                  <div className="mt-2 pl-4 border-l-2 border-blue-300 space-y-3">
                    {[
                      { id: 'services', label: 'Our Services', icon: <FaTools /> },
                      { id: 'blogs', label: 'Our Blogs', icon: <FaFileAlt /> },
                      { id: 'testimonials', label: 'Testimonials', icon: <FaComments /> },
                      { id: 'appointment', label: 'Make Appointment', icon: <FaClipboardList /> },
                      { id: 'faq', label: 'FAQs', icon: <FaLightbulb /> },
                    ].map((item) => (
                      <div
                        key={item.id}
                        className="flex items-center space-x-2 py-2"
                        onClick={() => scrollToSection(item.id)}
                      >
                        <span className="text-gray-600">{item.icon}</span>
                        <span>{item.label}</span>
                      </div>
                    ))}
                  </div>
                )}
              </li>
              {/* Our Services - Mobile */}
              <li>
                <div
                  className="flex justify-between items-center text-black py-2"
                  onClick={() => toggleDropdown('services')}
                >
                  <span>Our Services</span>
                  <FaChevronDown size={12} className={`transition-transform duration-300 ${activeDropdown === 'services' ? 'rotate-180' : ''}`} />
                </div>
                {activeDropdown === 'services' && (
                  <div className="mt-2 pl-4 border-l-2 border-blue-300 space-y-3">
                    {[
                      { path: 'machining', name: 'Machining' },
                      { path: 'laser-cutting', name: 'Laser Cutting' },
                      { path: '3d-printing', name: '3D Printing' },
                      { path: 'fabrication', name: 'Fabrication' },
                      { path: 'bending', name: 'Bending' },
                      { path: 'gear', name: 'Gear Manufacturing' },
                      { path: 'cutting', name: 'Wire Cutting' },
                      { path: 'casting', name: 'Casting' },
                    ].map((service) => (
                      <SLink
                        key={service.name}
                        to={`/${service.path}`}
                        className="block py-2"
                        onClick={closeMobileMenu}
                      >
                        {service.name}
                      </SLink>
                    ))}
                  </div>
                )}
              </li>
              {/* Industries - Mobile */}
              <li>
                <button
                  onClick={() => toggleDropdown('industries')}
                  className="w-full flex justify-between items-center text-left text-black py-2 focus:outline-none"
                  aria-expanded={activeDropdown === 'industries'}
                >
                  <span>Industries</span>
                  <FaChevronDown
                    size={12}
                    className={`transition-transform duration-300 ${activeDropdown === 'industries' ? 'rotate-180' : ''
                      }`}
                  />
                </button>
                {activeDropdown === 'industries' && (
                  <div className="mt-2 pl-4 border-l-2 border-blue-300 space-y-3">
                    {[
                      { path: 'defence', name: 'Defence' },
                      { path: 'epc', name: 'EPC' },
                      { path: 'biofuel', name: 'Bio-Fuel-Energy' },
                      { path: 'agri-tech', name: 'Agriculture' },
                      { path: 'aerospace', name: 'AEROSPACE' },
                      { path: 'solarBattery', name: 'Solar Battery' },
                    ].map((industry) => (
                      <SLink
                        key={industry.name}
                        to={`/${industry.path}`}
                        className="block py-2 text-sm text-gray-700 hover:text-blue-600 transition-colors duration-200"
                        onClick={closeMobileMenu}
                      >
                        {industry.name}
                      </SLink>
                    ))}
                  </div>
                )}
              </li>

              {/* About Us - Mobile */}
              <li>
                <div
                  className="flex justify-between items-center text-black py-2"
                  onClick={() => toggleDropdown('about')}
                >
                  <span>About Us</span>
                  <FaChevronDown size={12} className={`transition-transform duration-300 ${activeDropdown === 'about' ? 'rotate-180' : ''}`} />
                </div>
                {activeDropdown === 'about' && (
                  <div className="mt-2 pl-4 border-l-2 border-blue-300 space-y-3">
                    {[
                      { sectionId: "mission", title: "Our Vision & Mission" },
                      { sectionId: "brand-values", title: "Our Values" },
                      { sectionId: "about-services", title: "About Our Services" },
                      { sectionId: "careers", title: "Careers" },
                    ].map((item, index) => (
                      <div
                        key={index}
                        className="block py-2"
                        onClick={() => {
                          sessionStorage.setItem("scrollToAboutSection", item.sectionId);
                          window.location.href = "/about-us";
                          closeMobileMenu();
                        }}
                      >
                        {item.title}
                      </div>
                    ))}
                  </div>
                )}
              </li>

              {/* Blogs - Mobile */}
              <li>
                <div
                  className="flex justify-between items-center text-black py-2"
                  onClick={() => toggleDropdown('blogs')}
                >
                  <span>Blogs</span>
                  <FaChevronDown size={12} className={`transition-transform duration-300 ${activeDropdown === 'blogs' ? 'rotate-180' : ''}`} />
                </div>
                {activeDropdown === 'blogs' && (
                  <div className="mt-2 pl-4 border-l-2 border-blue-300 space-y-3">
                    {[
                      { to: "/blogs/industry-news", title: "Industry News" },
                      { to: "/blogs/project-stories", title: "Project Stories" },
                      { to: "/blogs/expert-tips", title: "Expert Tips" },
                      { to: "/media-gallery", title: "Media Gallery" },
                    ].map((item, index) => (
                      <SLink
                        key={index}
                        to={item.to}
                        className="block py-2"
                        onClick={closeMobileMenu}
                      >
                        {item.title}
                      </SLink>
                    ))}
                  </div>
                )}
              </li>

              {/* Connect Us - Mobile */}
              <li>
                <div
                  className="flex justify-between items-center text-black py-2"
                  onClick={() => toggleDropdown('connect')}
                >
                  <span>Connect Us</span>
                  <FaChevronDown size={12} className={`transition-transform duration-300 ${activeDropdown === 'connect' ? 'rotate-180' : ''}`} />
                </div>
                {activeDropdown === 'connect' && (
                  <div className="mt-2 pl-4 border-l-2 border-blue-300 space-y-3">
                    {[
                      { to: "/Collab", title: "Collab with Us" },
                      { to: "/get-quote", title: "Get a Quote" },
                      { to: "/connect/visit-office", title: "Visit Our Office" },
                    ].map((item, index) => (
                      <SLink
                        key={index}
                        to={item.to}
                        className="block py-2"
                        onClick={closeMobileMenu}
                      >
                        {item.title}
                      </SLink>
                    ))}
                  </div>
                )}
              </li>
            </ul>

            {/* Mobile Auth & Quote */}
            <div className="p-4 space-y-4 border-t">
              {/* {authenticatedUser && (
                <SLink
                  to={
                    authenticatedUser.role === 'admin'
                      ? '/admin-dashboard'
                      : authenticatedUser.role === 'vendor'
                        ? '/vendor-dashboard'
                        : '/user-dashboard'
                  }
                  className="flex items-center text-black hover:text-blue-500 py-2"
                  onClick={closeMobileMenu}
                >
                  <FaTachometerAlt className="mr-2" />
                  Dashboard
                </SLink>
              )} */}

              {authenticatedUser && authenticatedUser.role === 'admin' && (
                <>
                  <SLink
                    to="/admin-dashboard"
                    className="flex items-center text-black hover:text-blue-500 py-2"
                    onClick={closeMobileMenu}
                  >
                    <FaTachometerAlt className="mr-2 hover:text-blue-500" />
                    CMS Dashboard
                  </SLink>
                  <SLink
                    to="/manage-orders"
                    className="flex items-center text-black hover:text-blue-500 py-2"
                    onClick={closeMobileMenu}
                  >
                    <FaClipboardList className="mr-2 hover:text-blue-500" />
                    Orders & Users
                  </SLink>
                </>
              )}

              {authenticatedUser && authenticatedUser.role !== 'admin' && (
                <SLink
                  to={
                    authenticatedUser.role === 'vendor'
                      ? '/vendor-dashboard'
                      : '/user-dashboard'
                  }
                  className="flex items-center text-black hover:text-blue-500 py-2"
                  onClick={closeMobileMenu}
                >
                  <FaTachometerAlt className="mr-2 hover:text-blue-500" />
                  Dashboard
                </SLink>
              )}



              {authenticatedUser ? (
                <button
                  onClick={() => {
                    handleLogout();
                    closeMobileMenu();
                  }}
                  className="flex items-center text-black hover:text-red-500 py-2 w-full text-left"
                >
                  <FaSignOutAlt className="mr-2" />
                  Logout
                </button>
              ) : (
                <SLink
                  to="/login"
                  className="flex items-center text-black hover:text-green-500 py-2"
                  onClick={closeMobileMenu}
                >
                  <FaSignInAlt className="mr-2" />
                  Login
                </SLink>
              )}

              <SLink
                to="/get-quote"
                className="block w-full text-center py-3 rounded-full text-white bg-blue-600 font-semibold shadow-md"
                onClick={closeMobileMenu}
              >
                Get Instant Quote
              </SLink>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;