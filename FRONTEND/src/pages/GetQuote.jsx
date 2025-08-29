import React, { useState } from 'react';
import {
  FaFileUpload,
  FaCheckCircle,
  FaQuoteRight,
  FaEnvelope,
  FaPhone,
  FaInfoCircle,
  FaIndustry,
  FaProjectDiagram
} from 'react-icons/fa';
import FileUploader from '@/components/FileUploader';
import toast from 'react-hot-toast';
import { motion } from 'framer-motion';
const REACT_APP_BACKEND_URL = import.meta.env.VITE_WEBSITE_URL || 'http://localhost:4000';

const GetQuote = () => {
  const [uploadedFiles, setUploadedFiles] = useState([]);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    description: '',
    fileLinks: []
  });

  const handleFileUpload = (files) => {
    setUploadedFiles(files);
    setFormData(prevState => ({
      ...prevState,
      fileLinks: files.map(file => file.link)
    }));
  };


const handleInputChange = (e) => {
  const { name, value } = e.target;
  setFormData(prevState => ({
    ...prevState,
    [name]: value
  }));
};

const handleSubmit = async (e) => {
  e.preventDefault();
  if (!formData.name || !formData.email || !formData.description) {
    toast.error('Please fill in required fields');
    return;
  }

  try {
    // Show loading toast
    const loadingToast = toast.loading('Submitting your quote request...');

    const response = await fetch(`${REACT_APP_BACKEND_URL}//api/email/send-quote`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData)
    });

    const result = await response.json();

    // Dismiss loading toast
    toast.dismiss(loadingToast);

    if (response.ok) {
      toast.success('Quote request submitted successfully! We\'ll get back to you soon.');
      // Reset form after successful submission
      setFormData({
        name: '',
        email: '',
        phone: '',
        company: '',
        description: '',
        fileLinks: []
      });
      setUploadedFiles([]);
    } else {
      toast.error(result.error || 'Failed to submit quote request. Please try again.');
    }
  } catch (error) {
    console.error('Error submitting quote request:', error);
    toast.error('Network error. Please check your connection and try again.');
  }
};

return (
  <div
    className="min-h-screen bg-blue-50 bg-cover bg-center bg-no-repeat p-8"
    style={{
      backgroundImage: `url('/images/bg-image-getquote.jpg')`,
      backgroundBlendMode: 'lighten',
      backgroundColor: 'rgba(240, 248, 255, 0.85)'
    }}
  >
    <div className="max-w-6xl mx-auto">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-800 flex items-center justify-center">
          <FaQuoteRight className="mr-4 text-blue-500" />
          Get a Customized Quote
        </h1>
        <p className="mt-4 text-gray-600 max-w-2xl mx-auto">
          Share your project details, and our expert team will provide a tailored solution that meets your specific needs.
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-12 bg-white/90 backdrop-blur-sm rounded-2xl shadow-2xl p-8">
        {/* Quote Process Information */}
        <div className="space-y-6">
          <div className="bg-blue-50 p-6 rounded-lg">
            <h3 className="text-xl font-semibold mb-4 flex items-center">
              <FaInfoCircle className="mr-3 text-blue-500" />
              How Our Quote Process Works
            </h3>
            <ul className="space-y-3 text-gray-700">
              <li className="flex items-center">
                <FaCheckCircle className="mr-3 text-green-500" />
                Fill out the detailed project information
              </li>
              <li className="flex items-center">
                <FaFileUpload className="mr-3 text-blue-500" />
                Upload relevant project documents
              </li>
              <li className="flex items-center">
                <FaIndustry className="mr-3 text-purple-500" />
                Our team reviews your specific requirements
              </li>
              <li className="flex items-center">
                <FaProjectDiagram className="mr-3 text-orange-500" />
                Receive a comprehensive, customized quote
              </li>
            </ul>
          </div>

          <div className="bg-gray-50 p-6 rounded-lg">
            <h3 className="text-xl font-semibold mb-4 flex items-center">
              <FaEnvelope className="mr-3 text-red-500" />
              Contact Information
            </h3>
            <p className="text-gray-600">
              Need immediate assistance?
              <br />
              <strong>Email:</strong> quotes@yourcompany.com
              <br />
              <strong>Phone:</strong> +1 (555) 123-4567
            </p>
          </div>
        </div>

        {/* Quote Request Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid md:grid-cols-2 gap-4">
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              placeholder="Full Name *"
              required
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-300"
            />
            <input
              type="text"
              name="company"
              value={formData.company}
              onChange={handleInputChange}
              placeholder="Company Name"
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-300"
            />
          </div>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            placeholder="Email Address *"
            required
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-300"
          />
          <input
            type="tel"
            name="phone"
            value={formData.phone}
            onChange={handleInputChange}
            placeholder="Phone Number"
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-300"
          />
          <textarea
            name="description"
            value={formData.description}
            onChange={handleInputChange}
            placeholder="Describe Your Project Requirements *"
            required
            rows={5}
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-300"
          ></textarea>

          <div>
            <h4 className="text-lg font-semibold mb-4 flex items-center">
              <FaFileUpload className="mr-3 text-blue-500" />
              Upload Project Documents
            </h4>
            <FileUploader onFileUpload={handleFileUpload} />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition-colors font-semibold"
          >
            Submit Quote Request
          </button>
        </form>
      </div>
    </div>
  </div>
);
};

export default GetQuote;
