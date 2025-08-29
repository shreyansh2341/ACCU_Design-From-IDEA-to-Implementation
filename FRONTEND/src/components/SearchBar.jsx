import React, { useState, useEffect, useRef } from 'react';
import { useAuth } from '@/context/AuthProvider';
import { useNavigate } from 'react-router-dom';
import { AiOutlineSearch } from 'react-icons/ai';

const SearchBar = () => {
  const { blogs } = useAuth();
  const [query, setQuery] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [hovering, setHovering] = useState(false);
  const navigate = useNavigate();
  const containerRef = useRef(null);

  const services = [
    { name: "Machining", url: "/machining", img: "https://res.cloudinary.com/dxrryep5y/image/upload/v1753295932/website_static_media/machining2.png" },
    { name: "Laser Cutting", url: "/laser cutting", img: "https://res.cloudinary.com/dxrryep5y/image/upload/v1753295912/website_static_media/laser2.png" },
    { name: "Fabrication", url: "/fabrication", img: "https://res.cloudinary.com/dxrryep5y/image/upload/v1753295810/website_static_media/fabrication2.png" },
    { name: "3D Printing", url: "/3d-printing", img: "https://res.cloudinary.com/dxrryep5y/image/upload/v1753295778/website_static_media/3d_printng.png" },
    { name: "Casting", url: "/casting", img: "https://res.cloudinary.com/dxrryep5y/image/upload/v1753295798/website_static_media/casting2.png" },
    { name: "Gear", url: "/gear", img: " https://res.cloudinary.com/dxrryep5y/image/upload/v1753295818/website_static_media/gear1.png" },
    { name: "Bending", url: "/bending", img: " https://res.cloudinary.com/dxrryep5y/image/upload/v1753295790/website_static_media/bending2.png" },
    { name: "Wire Cutting", url: "/cutting", img: " https://res.cloudinary.com/dxrryep5y/image/upload/v1753296098/website_static_media/wire_cutting.png" },
    { name: "Home", url: "/", img: "/images/home.jpg" },
    { name: "Services", url: "/our-services", img: "https://res.cloudinary.com/dxrryep5y/image/upload/v1753295830/website_static_media/head_service.png" }
  ];

  useEffect(() => {
    if (query === '') {
      setSuggestions([]);
    } else {
      const serviceMatches = services.filter(service =>
        service.name.toLowerCase().includes(query.toLowerCase())
      );
      const blogMatches = blogs?.filter(blog =>
        blog.title.toLowerCase().includes(query.toLowerCase())
      ).map(blog => ({
        name: blog.title,
        url: `/blog/${blog._id}`,
        img: blog.blogImage.url
      })) || [];

      setSuggestions([...serviceMatches, ...blogMatches]);
    }
  }, [query, blogs]);

  const handleSelect = (url) => {
    setQuery('');
    setSuggestions([]);
    navigate(url);
  };

  const handleOutsideClick = (e) => {
    if (containerRef.current && !containerRef.current.contains(e.target)) {
      setSuggestions([]);
    }
  };

  useEffect(() => {
    document.addEventListener('click', handleOutsideClick);
    return () => document.removeEventListener('click', handleOutsideClick);
  }, []);

  return (
    <div
      ref={containerRef}
      className="relative group transition-all duration-500 ease-in-out"
      onMouseEnter={() => setHovering(true)}
      onMouseLeave={() => setHovering(false)}
    >
      <div className={`bg-white p-2 rounded-full shadow-md flex items-center transition-all duration-700 ease-in-out ${hovering ? 'w-56 px-4' : 'w-10 px-2'} overflow-hidden`}>
        <AiOutlineSearch className="text-black text-lg" />
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search..."
          className={`ml-2 w-full outline-none text-black bg-transparent ${hovering ? 'block' : 'hidden'} transition-all duration-500 ease-in-out`}
        />
      </div>

      {suggestions.length > 0 && (
        <div className="absolute top-full left-0 w-64 bg-white border rounded-md shadow-lg mt-1 z-50 max-h-72 overflow-auto">
          {suggestions.map((item, index) => (
            <div
              key={index}
              onClick={() => handleSelect(item.url)}
              className="flex items-center p-2 hover:bg-gray-200 cursor-pointer transition"
            >
              <img src={item.img} alt={item.name} className="w-10 h-10 rounded mr-3" />
              <span className="text-sm font-medium">{item.name}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default SearchBar;
