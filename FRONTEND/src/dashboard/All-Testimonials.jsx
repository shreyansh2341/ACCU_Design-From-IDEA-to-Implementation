import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Sidebar from './Sidebar';
import { useNavigate } from 'react-router-dom';
import { SLink } from '@/components/SLink';

const REACT_APP_BACKEND_URL = import.meta.env.VITE_WEBSITE_URL || 'http://localhost:4000';

const AllTestimonials = () => {
  const [allReviews, setAllReviews] = useState([]);
  const navigate = useNavigate();

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

  const handleDelete = async (reviewId) => {
    try {
      await axios.delete(`${REACT_APP_BACKEND_URL}/api/testimonials/delete-review-posts/${reviewId}`, {
        withCredentials: true,
      });
      setAllReviews((prev) => prev.filter((review) => review._id !== reviewId));
    } catch (error) {
      console.error('Error deleting testimonial:', error);
    }
  };

  const renderStars = (rating) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <span key={i} className={i <= rating ? 'text-yellow-400' : 'text-gray-300'}>
          &#9733;
        </span>
      );
    }
    return stars;
  };

  return (
    <div
      className="flex min-h-screen bg-gradient-to-br from-white via-[#e6f3fc] to-[#d4eafc]"
      style={{
        backgroundImage: `linear-gradient(rgba(240, 248, 255, 0.6), rgba(230, 243, 252, 0.75)), url("/images/bg-image-getquote.jpg")`,
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <Sidebar />

      <div className="ml-64 w-full px-4 py-8 transition-all duration-300">
        <h1 className="text-2xl font-semibold mb-6 text-center">All Testimonials</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {allReviews && allReviews.length > 0 ? (
            allReviews.map((review) => (
              <div
                key={review._id}
                className="group bg-white rounded-xl shadow-md hover:shadow-xl transform hover:scale-105 transition duration-300 ease-in-out p-4 flex flex-col items-center text-center"
              >
                {/* Circular Image */}
                <div className="w-24 h-24 rounded-full overflow-hidden mb-3 border-2 border-gray-300">
                  <img
                    src={review.reviewImage.url}
                    alt="testimonial"
                    className="w-full h-full object-cover"
                  />
                </div>

                {/* Company Name */}
                <h1 className="text-lg font-semibold text-yellow-600 group-hover:text-blue-500 transition mb-1">
                  {review.company}
                </h1>

                {/* Star Rating (Dynamic) */}
                <div className="flex justify-center mb-2 text-xl">
                  {renderStars(review.rating || 0)}
                </div>

                {/* About Text */}
                <p className="text-sm text-gray-700 mb-4 px-2">
                  {review.about
                    ? review.about.split(' ').slice(0, 20).join(' ') + '...'
                    : 'No details available.'}
                </p>

                {/* Buttons */}
                <div className="flex justify-center gap-4 mt-auto">
                  <SLink
                    to={`/update-review/${review._id}`}
                    className="text-green-600 font-semibold border border-green-600 px-3 py-1 rounded hover:text-white hover:bg-green-600 transition"
                  >
                    Update
                  </SLink>
                  <button
                    onClick={() => handleDelete(review._id)}
                    className="text-red-600 font-semibold border border-red-600 px-3 py-1 rounded hover:text-white hover:bg-red-600 transition"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))
          ) : (
            <div className="col-span-full text-center text-gray-500 text-2xl font-semibold">
              No Testimonials Available
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AllTestimonials;
