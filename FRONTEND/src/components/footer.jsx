import React from 'react';
import {
  FaFacebookF,
  FaInstagram,
  FaYoutube,
  FaLinkedin,
} from 'react-icons/fa';
import { FaXTwitter, FaAnglesRight } from 'react-icons/fa6';

const Footer = () => {
  return (
    <footer className="bg-[#24262b] py-8">
      <div className="max-w-[1200px] mx-auto px-4">
        <div className="flex justify-between flex-wrap gap-x-4 gap-y-6">

          <div className="w-[22%] min-w-[200px]">
            <h4 className="text-white text-lg font-medium mb-2 relative">
              <a href="/"><span className="text-[#007AFF]">ACCU</span> DESIGN</a>
              <span className="absolute left-0 -bottom-1 h-[2px] w-[50px] bg-[#2479C2]" />
            </h4>
            <ul className="space-y-[6px] mt-3">
              {[
                <a href="/about-us">About Us</a>,
                <a href="/our-services">Our Services</a>,
                <a href="/blog">Blogs</a>,
                <a href="/contact-us">Contact Us</a>
              ].map((item, i) => (
                <li key={i}>
                  <a
                    href="/"
                    className="text-[#bbbbbb] text-[16px] font-light hover:text-white  hover:pl-2 transition-all block"
                  >
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div className="w-[22%] min-w-[200px]">
            <h4 className="text-white text-lg font-medium mb-2 relative">
              Services
              <span className="absolute left-0 -bottom-1 h-[2px] w-[50px] bg-[#2479C2]" />
            </h4>
            <ul className="space-y-[6px] mt-3">
              {[
                <a href="/machining">Machining</a>,
                <a href="/laser-cutting">Laser Cutting</a>,
                <a href="/fabrication">Fabrication</a>,
                <a href="/3d-printing">3D printing</a>,
                <a href="/casting">Casting</a>,
                <a href="/gear">Gear Manufacturing</a>,
                <a href="/bending">Bending</a>,
                <a href="/cutting">Wire Cutting</a>,
              ].map((service, i) => (
                <li key={i}>
                  <a
                    href="/"
                    className="text-[#bbbbbb] text-[16px] font-light hover:text-white hover:pl-2 transition-all block"
                  >
                    {service}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div className="w-[22%] min-w-[200px]">
            <h4 className="text-white text-lg font-medium mb-2 relative">
              Contact Us
              <span className="absolute left-0 -bottom-1 h-[2px] w-[50px] bg-[#2479C2]" />
            </h4>
            <ul className="space-y-2 mt-3 text-[16px] font-light text-[#bbbbbb]">
              <li>
                <a
                  href="https://maps.app.goo.gl/TdVCnvpmeFAvt345A"
                  className="hover:text-white hover:pl-2 transition-all block"
                >
                  Shop No. 30/15, Unity Industrial Estate, Saidham Road, Dhayari, Pune, Maharashtra 411041
                </a>
              </li>
              <li>
                <a
                  href="mailto:projects@accudesign.in"
                  className="hover:text-white hover:pl-2 transition-all block"
                >
                  projects@accudesign.in
                </a>
              </li>
              <li>
                <a
                  href="tel:+919821679475"
                  className="hover:text-white hover:pl-2 transition-all block"
                >
                  +91-9821679475 / +91-9579314891
                </a>
              </li>
            </ul>
          </div>

          <div className="w-[22%] min-w-[200px]">
            <h4 className="text-white text-lg font-medium mb-2 relative">
              Follow Us
              <span className="absolute left-0 -bottom-1 h-[2px] w-[50px] bg-[#2479C2]" />
            </h4>
            <div className="flex flex-wrap gap-2 mt-3 mb-4">
              {[FaFacebookF, FaXTwitter, FaInstagram, FaYoutube, FaLinkedin].map((Icon, i) => (
                <a
                  href="#"
                  key={i}
                  className="bg-[#2479C2] w-9 h-9 rounded-full flex items-center justify-center text-white hover:bg-white hover:text-[#24262b] transition-all"
                >
                  <Icon size={14} />
                </a>
              ))}
            </div>
            <div>
              <h4 className="text-white text-[16px] mb-2 font-medium">Subscribe Us</h4>
              <form
                action="https://api.web3forms.com/submit"
                method="POST"
                className="flex"
              >
                <input
                  type="email"
                  name="email"
                  placeholder="Write to us..."
                  className="w-[180px] h-[38px] px-2 rounded-l-md text-sm"
                />
                <button
                  type="submit"
                  className="bg-[#2479C2] h-[38px] px-3 text-white rounded-r-md flex items-center justify-center"
                >
                  <FaAnglesRight size={14} />
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

