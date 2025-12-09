// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import { toast } from 'react-hot-toast';
// import { useNavigate, useParams } from 'react-router-dom';

// const REACT_APP_BACKEND_URL = import.meta.env.VITE_WEBSITE_URL || 'http://localhost:4000';

// const UpdateReview = () => {
//   const { id } = useParams();
//   const navigate = useNavigate();

//   const [company, setCompany] = useState('');
//   const [about, setAbout] = useState('');
//   const [reviewImage, setReviewImage] = useState(null);
//   const [previewImage, setPreviewImage] = useState('');

//   useEffect(() => {
//     const fetchReview = async () => {
//       try {
//         const { data } = await axios.get(`${REACT_APP_BACKEND_URL}/api/testimonials/single-review-post/${id}`, {
//           withCredentials: true,
//         });
//         setCompany(data.review.company);
//         setAbout(data.review.about);
//         setPreviewImage(data.review.reviewImage.url);
//       } catch (error) {
//         console.error('Error fetching review:', error);
//       }
//     };

//     fetchReview();
//   }, [id]);

//   const changePhotoHandler = (e) => {
//     const file = e.target.files[0];
//     if (file) {
//       setReviewImage(file);
//       const reader = new FileReader();
//       reader.onloadend = () => setPreviewImage(reader.result);
//       reader.readAsDataURL(file);
//     }
//   };

//   const handleUpdate = async (e) => {
//     e.preventDefault();

//     const formData = new FormData();
//     formData.append('company', company);
//     formData.append('about', about);
//     if (reviewImage) formData.append('reviewImage', reviewImage);

//     try {
//       const { status } = await axios.put(`${REACT_APP_BACKEND_URL}/api/testimonials/update-review/${id}`, formData, {
//         headers: { 'Content-Type': 'multipart/form-data' },
//         withCredentials: true,
//       });

//       if (status >= 200 && status < 300) {
//         toast.success('Review Updated!');
//         navigate('/dashboard');
//       }
//     } catch (error) {
//       console.error('Error updating review:', error);
//       toast.error('Failed to update review');
//     }
//   };

//   return (
//     <div className='bg-gray-100 h-90vh flex items-center justify-center'>
//       <div className='w-full max-w-md bg-white shadow-md rounded-lg mx-auto mt-16 p-8'>
//         <form onSubmit={handleUpdate}>
//           <div className='font-semibold text-xl text-center mb-4'>
//             Update <span className='text-blue-500'>Review</span>
//           </div>
//           <input
//             type="text"
//             placeholder='Company Name'
//             value={company}
//             onChange={(e) => setCompany(e.target.value)}
//             className='w-full p-2 border rounded-md mb-4'
//           />
//           <div className='flex items-center mb-4'>
//             <div className='photo w-20 h-20 rounded-md overflow-hidden mr-4'>
//               {previewImage ? (
//                 <img src={previewImage} alt="Preview" className='w-full h-full object-cover' />
//               ) : (
//                 <div className='w-full h-full bg-gray-200 flex items-center justify-center'>
//                   <span className='text-gray-500'>No Image</span>
//                 </div>
//               )}
//             </div>
//             <input type="file" onChange={changePhotoHandler} className='w-full p-2 border rounded-md' />
//           </div>
//           <textarea
//             placeholder='About the Company'
//             value={about}
//             onChange={(e) => setAbout(e.target.value)}
//             className='w-full h-[20vh] p-2 border rounded-md mb-4'
//           />
//           <button type='submit' className='w-full bg-blue-500 text-white font-semibold hover:bg-blue-700 duration-300 px-4 py-2 rounded-md'>
//             Update Review
//           </button>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default UpdateReview;

import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";
import { useNavigate, useParams } from "react-router-dom";
import { FaStar } from "react-icons/fa";

const REACT_APP_BACKEND_URL =
  import.meta.env.VITE_WEBSITE_URL || "http://localhost:4000";

const UpdateReview = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [company, setCompany] = useState("");
  const [about, setAbout] = useState("");
  const [reviewImage, setReviewImage] = useState(null);
  const [previewImage, setPreviewImage] = useState("");

  useEffect(() => {
    const fetchReview = async () => {
      try {
        const { data } = await axios.get(
          `${REACT_APP_BACKEND_URL}/api/testimonials/single-review-post/${id}`,
          {
            withCredentials: true,
          }
        );
        setCompany(data.review.company);
        setAbout(data.review.about);
        setPreviewImage(data.review.reviewImage.url);
      } catch (error) {
        console.error("Error fetching review:", error);
      }
    };

    fetchReview();
  }, [id]);

  const changePhotoHandler = (e) => {
    const file = e.target.files[0];
    if (file) {
      setReviewImage(file);
      const reader = new FileReader();
      reader.onloadend = () => setPreviewImage(reader.result);
      reader.readAsDataURL(file);
    }
  };

  const handleUpdate = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("company", company);
    formData.append("about", about);
    if (reviewImage) formData.append("reviewImage", reviewImage);

    try {
      const { status } = await axios.put(
        `${REACT_APP_BACKEND_URL}/api/testimonials/update-review/${id}`,
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
          withCredentials: true,
        }
      );

      if (status >= 200 && status < 300) {
        toast.success("Review Updated!");
        navigate("/dashboard");
      }
    } catch (error) {
      console.error("Error updating review:", error);
      toast.error("Failed to update review");
    }
  };

  return (
    <div
      className="flex min-h-screen items-center justify-center bg-gradient-to-br from-white via-[#e6f3fc] to-[#d4eafc]"
      style={{
        backgroundImage: `linear-gradient(rgba(240, 248, 255, 0.6), rgba(230, 243, 252, 0.75)), url("/images/bg-image-getquote.jpg")`,
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="w-full max-w-xl mx-auto px-4">
        <div className="bg-white/85 backdrop-blur-md rounded-2xl shadow-[0_15px_40px_rgba(36,121,194,0.18)] border border-blue-50 p-6">
          <div className="flex items-center gap-3 mb-4">
            <span className="w-9 h-9 rounded-2xl bg-gradient-to-br from-blue-500 via-blue-600 to-indigo-500 flex items-center justify-center shadow-md shadow-blue-500/40">
              <FaStar className="text-white text-lg" />
            </span>
            <div>
              <h2 className="text-xl font-bold text-[#2479C2]">
                Update Review
              </h2>
              <p className="text-xs text-gray-500">
                Edit the company review and image.
              </p>
            </div>
          </div>

          <form onSubmit={handleUpdate}>
            <div className="font-semibold text-center text-sm text-gray-700 mb-4">
              Update <span className="text-blue-500">Review</span>
            </div>

            <input
              type="text"
              placeholder="Company Name"
              value={company}
              onChange={(e) => setCompany(e.target.value)}
              className="w-full p-2.5 text-sm border border-blue-100 rounded-xl bg-slate-50/60
                         focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-300 mb-4"
            />

            <div className="flex items-center gap-4 mb-4">
              <div className="w-24 h-24 rounded-full overflow-hidden border border-dashed border-blue-200 bg-slate-50/70 flex items-center justify-center">
                {previewImage ? (
                  <img
                    src={previewImage}
                    alt="Preview"
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <span className="text-xs text-gray-400">No Image</span>
                )}
              </div>
              <input
                type="file"
                onChange={changePhotoHandler}
                className="w-full p-2 text-xs border border-blue-100 rounded-xl bg-slate-50/60
                           focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-300"
              />
            </div>

            <textarea
              placeholder="About the Company"
              value={about}
              onChange={(e) => setAbout(e.target.value)}
              className="w-full h-[20vh] p-2.5 text-sm border border-blue-100 rounded-xl bg-slate-50/60
                         focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-300 resize-none mb-4"
            />

            <button
              type="submit"
              className="w-full inline-flex justify-center items-center px-4 py-2.5 rounded-xl text-sm font-semibold
                         bg-gradient-to-r from-blue-500 via-blue-600 to-indigo-500 text-white
                         shadow-[0_10px_25px_rgba(37,99,235,0.55)]
                         hover:from-blue-600 hover:via-blue-700 hover:to-indigo-600
                         hover:-translate-y-[1px] hover:shadow-[0_14px_30px_rgba(37,99,235,0.7)]
                         active:translate-y-0 active:shadow-md
                         transition"
            >
              Update Review
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default UpdateReview;
