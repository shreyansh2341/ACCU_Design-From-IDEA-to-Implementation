// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import Sidebar from './Sidebar';
// import { useNavigate } from 'react-router-dom';
// import { SLink } from '@/components/SLink';

// const REACT_APP_BACKEND_URL = import.meta.env.VITE_WEBSITE_URL || 'http://localhost:4000';

// const AllTestimonials = () => {
//   const [allReviews, setAllReviews] = useState([]);
//   const navigate = useNavigate();

//   useEffect(() => {
//     const fetchAllReviews = async () => {
//       try {
//         const { data } = await axios.get(`${REACT_APP_BACKEND_URL}/api/testimonials/all-review-posts`, {
//           withCredentials: true,
//         });
//         setAllReviews(data.allreviews);
//       } catch (error) {
//         console.error(error);
//       }
//     };
//     fetchAllReviews();
//   }, []);

//   const handleDelete = async (reviewId) => {
//     try {
//       await axios.delete(`${REACT_APP_BACKEND_URL}/api/testimonials/delete-review-posts/${reviewId}`, {
//         withCredentials: true,
//       });
//       setAllReviews((prev) => prev.filter((review) => review._id !== reviewId));
//     } catch (error) {
//       console.error('Error deleting testimonial:', error);
//     }
//   };

//   const renderStars = (rating) => {
//     const stars = [];
//     for (let i = 1; i <= 5; i++) {
//       stars.push(
//         <span key={i} className={i <= rating ? 'text-yellow-400' : 'text-gray-300'}>
//           &#9733;
//         </span>
//       );
//     }
//     return stars;
//   };

//   return (
//     <div
//       className="flex min-h-screen bg-gradient-to-br from-white via-[#e6f3fc] to-[#d4eafc]"
//       style={{
//         backgroundImage: `linear-gradient(rgba(240, 248, 255, 0.6), rgba(230, 243, 252, 0.75)), url("/images/bg-image-getquote.jpg")`,
//         backgroundRepeat: "no-repeat",
//         backgroundSize: "cover",
//         backgroundPosition: "center",
//       }}
//     >
//       <Sidebar />

//       <div className="ml-6 w-full px-4 py-8 transition-all duration-300">
//         <h1 className="text-2xl font-semibold mb-6 text-center">All Testimonials</h1>
//         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
//           {allReviews && allReviews.length > 0 ? (
//             allReviews.map((review) => (
//               <div
//                 key={review._id}
//                 className="group bg-white rounded-xl shadow-md hover:shadow-xl transform hover:scale-105 transition duration-300 ease-in-out p-4 flex flex-col items-center text-center"
//               >
//                 {/* Circular Image */}
//                 <div className="w-24 h-24 rounded-full overflow-hidden mb-3 border-2 border-gray-300">
//                   <img
//                     src={review.reviewImage.url}
//                     alt="testimonial"
//                     className="w-full h-full object-cover"
//                   />
//                 </div>

//                 {/* Company Name */}
//                 <h1 className="text-lg font-semibold text-yellow-600 group-hover:text-blue-500 transition mb-1">
//                   {review.company}
//                 </h1>

//                 {/* Star Rating (Dynamic) */}
//                 <div className="flex justify-center mb-2 text-xl">
//                   {renderStars(review.rating || 0)}
//                 </div>

//                 {/* About Text */}
//                 <p className="text-sm text-gray-700 mb-4 px-2">
//                   {review.about
//                     ? review.about.split(' ').slice(0, 20).join(' ') + '...'
//                     : 'No details available.'}
//                 </p>

//                 {/* Buttons */}
//                 <div className="flex justify-center gap-4 mt-auto">
//                   <SLink
//                     to={`/update-review/${review._id}`}
//                     className="text-green-600 font-semibold border border-green-600 px-3 py-1 rounded hover:text-white hover:bg-green-600 transition"
//                   >
//                     Update
//                   </SLink>
//                   <button
//                     onClick={() => handleDelete(review._id)}
//                     className="text-red-600 font-semibold border border-red-600 px-3 py-1 rounded hover:text-white hover:bg-red-600 transition"
//                   >
//                     Delete
//                   </button>
//                 </div>
//               </div>
//             ))
//           ) : (
//             <div className="col-span-full text-center text-gray-500 text-2xl font-semibold">
//               No Testimonials Available
//             </div>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default AllTestimonials;

import React, { useEffect, useState } from "react";
import axios from "axios";
import Sidebar from "./Sidebar";
import { SLink } from "@/components/SLink";
import { FaStar } from "react-icons/fa";

const REACT_APP_BACKEND_URL =
  import.meta.env.VITE_WEBSITE_URL || "http://localhost:4000";

const AllTestimonials = () => {
  const [allReviews, setAllReviews] = useState([]);

  useEffect(() => {
    const fetchAllReviews = async () => {
      try {
        const { data } = await axios.get(
          `${REACT_APP_BACKEND_URL}/api/testimonials/all-review-posts`,
          {
            withCredentials: true,
          }
        );
        setAllReviews(data.allreviews);
      } catch (error) {
        console.error(error);
      }
    };
    fetchAllReviews();
  }, []);

  const handleDelete = async (reviewId) => {
    try {
      await axios.delete(
        `${REACT_APP_BACKEND_URL}/api/testimonials/delete-review-posts/${reviewId}`,
        {
          withCredentials: true,
        }
      );
      setAllReviews((prev) =>
        prev.filter((review) => review._id !== reviewId)
      );
    } catch (error) {
      console.error("Error deleting testimonial:", error);
    }
  };

  const renderStars = (rating) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <span
          key={i}
          className={i <= rating ? "text-yellow-400" : "text-gray-300"}
        >
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

      <div className="ml-6 w-full px-4 py-8 transition-all duration-300">
        <div className="w-full max-w-6xl mx-auto mt-8 mb-8">
          <div className="bg-white/85 backdrop-blur-md rounded-2xl shadow-[0_15px_40px_rgba(36,121,194,0.18)] border border-blue-50 p-5">
            <div className="flex items-center gap-3 mb-4">
              <span className="w-9 h-9 rounded-2xl bg-gradient-to-br from-blue-500 via-blue-600 to-indigo-500 flex items-center justify-center shadow-md shadow-blue-500/40">
                <FaStar className="text-white text-lg" />
              </span>
              <div>
                <h1 className="text-xl font-bold text-[#2479C2]">
                  All Testimonials
                </h1>
                <p className="text-xs text-gray-500">
                  See and manage all client reviews here.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mt-4">
              {allReviews && allReviews.length > 0 ? (
                allReviews.map((review) => (
                  <div
                    key={review._id}
                    className="group bg-white/90 backdrop-blur-sm rounded-2xl border border-blue-50 shadow-sm shadow-slate-200
                               hover:border-blue-200 hover:bg-gradient-to-br hover:from-blue-50/80 hover:via-white hover:to-blue-50
                               hover:shadow-[0_12px_30px_rgba(148,163,184,0.55)] transform hover:-translate-y-[3px]
                               transition-all duration-300 ease-out p-5 flex flex-col items-center text-center"
                  >
                    {/* Circular Image */}
                    <div className="w-24 h-24 rounded-full overflow-hidden mb-3 border-2 border-blue-200 shadow-sm shadow-blue-100">
                      <img
                        src={review.reviewImage.url}
                        alt="testimonial"
                        className="w-full h-full object-cover"
                      />
                    </div>

                    {/* Company Name */}
                    <h1 className="text-lg font-semibold text-yellow-600 group-hover:text-blue-600 transition mb-1">
                      {review.company}
                    </h1>

                    {/* Star Rating */}
                    <div className="flex justify-center mb-2 text-xl">
                      {renderStars(review.rating || 0)}
                    </div>

                    {/* About Text */}
                    <p className="text-sm text-gray-700 mb-4 px-2">
                      {review.about
                        ? review.about.split(" ").slice(0, 20).join(" ") +
                          "..."
                        : "No details available."}
                    </p>

                    {/* Buttons */}
                    <div className="flex justify-center gap-3 mt-auto">
                      <SLink
                        to={`/update-review/${review._id}`}
                        className="inline-flex items-center px-3 py-1.5 text-xs font-semibold rounded-full 
                                   border border-green-200 text-green-600 bg-green-50/80
                                   hover:bg-green-100 hover:border-green-300
                                   hover:-translate-y-[1px] hover:shadow-[0_8px_18px_rgba(34,197,94,0.45)]
                                   active:translate-y-0 active:shadow-md
                                   transition"
                      >
                        Update
                      </SLink>
                      <button
                        onClick={() => handleDelete(review._id)}
                        className="inline-flex items-center px-3 py-1.5 text-xs font-semibold rounded-full
                                   border border-red-200 text-red-600 bg-red-50/80
                                   hover:bg-red-100 hover:border-red-300
                                   hover:-translate-y-[1px] hover:shadow-[0_8px_18px_rgba(248,113,113,0.55)]
                                   active:translate-y-0 active:shadow-md
                                   transition"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                ))
              ) : (
                <div className="col-span-full text-center text-gray-500 text-sm font-semibold py-10">
                  No Testimonials Available
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AllTestimonials;
