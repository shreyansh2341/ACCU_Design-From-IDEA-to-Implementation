import React, { useEffect, useState } from 'react';
import axios from 'axios';
import TestimonialCard from './TestimonialCard';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';

const REACT_APP_BACKEND_URL = import.meta.env.VITE_WEBSITE_URL || 'http://localhost:4000';

const TestimonialsSection = () => {
  const [allReviews, setAllReviews] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const reviewsPerPage = 3;

  useEffect(() => {
    const fetchAllReviews = async () => {
      try {
        const { data } = await axios.get(`${REACT_APP_BACKEND_URL}/api/testimonials/all-review-posts`, {
          withCredentials: true,
        });
        setAllReviews(data.allreviews);
      } catch (error) {
        console.error(error);
      }
    };
    fetchAllReviews();
  }, []);

  const totalPages = Math.ceil(allReviews.length / reviewsPerPage);

  const handlePrev = () => {
    setCurrentPage((prev) => (prev > 0 ? prev - 1 : prev));
  };

  const handleNext = () => {
    setCurrentPage((prev) => (prev < totalPages - 1 ? prev + 1 : prev));
  };

  const currentReviews = allReviews.slice(
    currentPage * reviewsPerPage,
    (currentPage + 1) * reviewsPerPage
  );

  return (
    <div className="text-center mb-10 px-4">
      {/* Arrow buttons */}
      <div className="flex items-center justify-center gap-4 mb-6">
        <button
          onClick={handlePrev}
          disabled={currentPage === 0}
          className="text-blue-600 hover:text-blue-800 disabled:opacity-50"
        >
          <FaChevronLeft size={30} />
        </button>

        <div className="flex flex-wrap justify-center gap-8">
          {currentReviews.map((review) => (
            <TestimonialCard key={review._id} review={review} />
          ))}
        </div>

        <button
          onClick={handleNext}
          disabled={currentPage === totalPages - 1}
          className="text-blue-600 hover:text-blue-800 disabled:opacity-50"
        >
          <FaChevronRight size={30} />
        </button>
      </div>
    </div>
  );
};

export default TestimonialsSection;
