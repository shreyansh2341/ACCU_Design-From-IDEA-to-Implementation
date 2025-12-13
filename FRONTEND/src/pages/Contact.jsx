import React from 'react';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import { toast } from 'react-hot-toast';

const ContactUs = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    const userInfo = {
      access_key: 'c4fcec5c-3bdc-4da3-ad7d-d6119b630fb9',
      name: data.name,
      email: data.email,
      tel: data.tel,
      message: data.message,
    };

    try {
      await axios.post('https://api.web3forms.com/submit', userInfo, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      toast.success('Form submitted successfully!');
    } catch (error) {
      toast.error('Failed to submit the form. Please try again later.');
    }
  };

  return (
    <section className="bg-[#f4f6fb] py-12 px-4 md:px-20">
      {/* Contact Form + Map */}
      <div className="bg-white rounded-xl shadow-md overflow-hidden flex flex-col md:flex-row md:items-stretch">
        {/* Contact Form */}
        <div className="md:w-1/2 md:flex-1 p-10 flex flex-col justify-center">
          <h2 className="text-3xl font-bold mb-1">
            <span className="text-black">Get in </span>
            <span className="text-blue-500">Touch</span>
          </h2>
          <p className="text-gray-600 mb-6">
            We'd love to hear from you! Whether you have a question, need assistance, or want to discuss a project, feel free to get in touch with us. Our team is here to help.
          </p>

          <form
            action="https://api.web3forms.com/submit"
            method="POST"
            onSubmit={handleSubmit(onSubmit)}
            className="space-y-4"
          >
            <div>
              <input
                type="text"
                placeholder="Your Name"
                className="w-full border border-gray-300 p-3 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                {...register('name', { required: true })}
              />
              {errors.name && (
                <span className="text-red-500 font-semibold text-sm">
                  This Field is Required
                </span>
              )}
            </div>

            <div>
              <input
                type="email"
                placeholder="Your Email"
                className="w-full border border-gray-300 p-3 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                {...register('email', { required: true })}
              />
              {errors.email && (
                <span className="text-red-500 font-semibold text-sm">
                  This Field is Required
                </span>
              )}
            </div>

            <div>
              <input
                type="tel"
                placeholder="Phone Number"
                className="w-full border border-gray-300 p-3 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                {...register('tel', { required: true })}
              />
              {errors.tel && (
                <span className="text-red-500 font-semibold text-sm">
                  This Field is Required
                </span>
              )}
            </div>

            <select
              className="w-full border border-gray-300 p-3 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            >
              <option value="">How did you find us?</option>
              <option value="Google">Google</option>
              <option value="Instagram">Instagram</option>
              <option value="Facebook">Facebook</option>
              <option value="Referral">Referral</option>
              <option value="Other">Other</option>
            </select>

            <div>
              <textarea
                placeholder="Your Message"
                rows="4"
                className="w-full border border-gray-300 p-3 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                {...register('message', { required: true })}
              />
              {errors.message && (
                <span className="text-red-500 font-semibold text-sm">
                  This Field is Required
                </span>
              )}
            </div>

            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-3 rounded-md hover:bg-blue-700 transition"
            >
              Send Message
            </button>
          </form>

          {/* Social Media Icons */}
          <div className="flex justify-center gap-6 mt-8 text-blue-600 text-2xl">
            <a
              href="https://www.instagram.com/accu_design/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <i className="fab fa-instagram" />
            </a>
            <a
              href="https://www.linkedin.com/company/accudesign/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <i className="fab fa-linkedin" />
            </a>
            <a
              href="https://twitter.com/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <i className="fab fa-x-twitter" />
            </a>
            <a
              href="https://www.youtube.com/channel/UCjxd8s0WT4IwQBJDouUR4EQ"
              target="_blank"
              rel="noopener noreferrer"
            >
              <i className="fab fa-youtube" />
            </a>
            <a
              href="https://accudesign.in/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <i className="fab fa-google" />
            </a>
          </div>
        </div>

        {/* Map Section */}
        <div className="md:w-1/2 md:flex-1 relative bg-blue-100 flex">
          <a
            href="https://www.google.com/maps/place/ACCU+DESIGN/@18.4409238,73.8221371,15z"
            target="_blank"
            rel="noopener noreferrer"
            className="block w-full h-full"
          >
            <iframe
              title="ACCU DESIGN Location"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3784.9424091983915!2d73.82213709999999!3d18.440923800000004!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bc295c2bd2465db%3A0x1e95ccaa0122326f!2sACCU%20DESIGN!5e0!3m2!1sen!2sin!4v1740560184982!5m2!1sen!2sin"
              width="100%"
              height="100%"
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="w-full h-full min-h-[400px] border-0"
            />
          </a>
        </div>
      </div>

      {/* Team Section */}
      <div className="mt-20 bg-[#f7f8fa] text-center">
        <h2 className="text-3xl font-bold text-gray-800 mb-10">MEET OUR BEST TEAM</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-10 place-items-center">
          {/* Team Member 1 */}
          <div className="transition-transform duration-300 hover:scale-105">
            <img
              src="/images/team1.jpg"
              alt="Suresh Dhanawade"
              className="w-40 h-40 object-cover rounded-full shadow-lg transition-shadow duration-300 hover:shadow-xl"
              loading="lazy"
            />
            <p className="mt-4 text-lg font-semibold text-gray-800 hover:text-blue-600 hover:underline transition duration-300 cursor-pointer">
              Suresh Dhanawade
            </p>
          </div>

          {/* Team Member 2 */}
          <div className="transition-transform duration-300 hover:scale-105">
            <img
              src="/images/team2.jpg"
              alt="Omkar Dhanawade"
              className="w-40 h-40 object-cover rounded-full shadow-lg transition-shadow duration-300 hover:shadow-xl"
              loading="lazy"
            />
            <p className="mt-4 text-lg font-semibold text-gray-800 hover:text-blue-600 hover:underline transition duration-300 cursor-pointer">
              Omkar Dhanawade
            </p>
          </div>

          {/* Team Member 3 */}
          <div className="transition-transform duration-300 hover:scale-105">
            <img
              src="/images/team3.jpg"
              alt="Newprakash Chandra"
              className="w-40 h-40 object-cover rounded-full shadow-lg transition-shadow duration-300 hover:shadow-xl"
              loading="lazy"
            />
            <p className="mt-4 text-lg font-semibold text-gray-800 hover:text-blue-600 hover:underline transition duration-300 cursor-pointer">
              Newprakash Chandra
            </p>
          </div>

          {/* Team Member 4 */}
          <div className="transition-transform duration-300 hover:scale-105">
            <img
              src="/images/team4.jpg"
              alt="Sunny Tiwari"
              className="w-40 h-40 object-cover rounded-full shadow-lg transition-shadow duration-300 hover:shadow-xl"
              loading="lazy"
            />
            <p className="mt-4 text-lg font-semibold text-gray-800 hover:text-blue-600 hover:underline transition duration-300 cursor-pointer">
              Sunny Tiwari
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactUs;
