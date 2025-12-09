// import React, { useState } from 'react';
// import axios from 'axios';
// import { toast } from 'react-hot-toast';
// import { useNavigate } from 'react-router-dom'; 
// import Sidebar from './Sidebar'; 


// const REACT_APP_BACKEND_URL = import.meta.env.VITE_WEBSITE_URL || 'http://localhost:4000';

// const CreateBlog = () => {
//   const [title, setTitle] = useState('');
//   const [category, setCategory] = useState('');
//   const [about, setAbout] = useState('');
//   const [blogImage, setBlogImage] = useState('');
//   const [blogImagePreview, setBlogImagePreview] = useState('');

//   const navigate = useNavigate(); // ✅ Step 2

//   const changePhotoHandler = (e) => {
//     const file = e.target.files[0];
//     if (file) {
//       setBlogImage(file);
//       const reader = new FileReader();
//       reader.onloadend = () => {
//         setBlogImagePreview(reader.result);
//       };
//       reader.readAsDataURL(file);
//     } else {
//       setBlogImage(null);
//       setBlogImagePreview('');
//     }
//   };

//   const handleCreateBlog = async (e) => {
//     e.preventDefault();
//     const formData = new FormData();
//     formData.append('title', title);
//     formData.append('category', category);
//     formData.append('about', about);
//     if (blogImage) {
//       formData.append('blogImage', blogImage);
//     }

//     try {
//       const { data, status } = await axios.post(`${REACT_APP_BACKEND_URL}/api/blog/create-blog`, formData, {
//         headers: { 'Content-Type': 'multipart/form-data' },
//         withCredentials: true,
//       });

//       if (status >= 200 && status < 300) {
//         toast.success('Blog Created successfully!');
//         navigate('/dashboard'); // ✅ Step 3: redirect
//       } else {
//         toast.error('Blog Creation failed');
//       }
//     } catch (error) {
//       console.error('Error during creation:', error.response ? error.response.data : error.message);
//       toast.error('Error while creating blog');
//     }

//     setTitle('');
//     setAbout('');
//     setCategory('');
//     setBlogImage(null);
//     setBlogImagePreview('');
//   };

//   return (

//     <div
//       className="flex h-100vh bg-gradient-to-br from-white via-[#e6f3fc] to-[#d4eafc]"
//       style={{
//         backgroundImage: `linear-gradient(rgba(240, 248, 255, 0.6), rgba(230, 243, 252, 0.75)), url("/images/bg-image-getquote.jpg")`,
//         backgroundRepeat: "no-repeat",
//         backgroundSize: "cover",
//         backgroundPosition: "center",
//       }}
//     >
//       {/* Sidebar */}
//             <Sidebar />
//       <div className='w-full h-[80vh] max-w-md bg-white shadow-md rounded-lg mx-auto mt-16 p-8'>
//         <form onSubmit={handleCreateBlog}>
//           <div className='font-semibold text-xl text-center mb-4'>
//             ACCU <span className='text-blue-500'>Design</span>
//           </div>
//           <input type="text" placeholder='Enter Your Title' value={title} onChange={(e) => setTitle(e.target.value)} className='w-full p-2 border rounded-md mb-4' />
//           <input type="text" placeholder='Enter Your Category' value={category} onChange={(e) => setCategory(e.target.value)} className='w-full p-2 border rounded-md mb-4' />
//           <div className='flex items-center mb-4'>
//             <div className='photo w-20 h-20 rounded-md overflow-hidden mr-4'>
//               {blogImagePreview ? (
//                 <img src={blogImagePreview} alt="Preview" className='w-full h-full object-cover' />
//               ) : (
//                 <div className='w-full h-full bg-gray-200 flex items-center justify-center'>
//                   <span className='text-gray-500'>No Image</span>
//                 </div>
//               )}
//             </div>
//             <input type="file" onChange={changePhotoHandler} className='w-full p-2 border rounded-md' />
//           </div>
//           <textarea placeholder='Write Something About the Blog' value={about} onChange={(e) => setAbout(e.target.value)} className='w-full h-[20vh] p-2 border rounded-md mb-4' />
//           <button type='submit' className='w-full bg-blue-500 text-white font-semibold hover:bg-blue-700 duration-300 px-4 py-2 rounded-md'>Post Blog</button>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default CreateBlog;

import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import Sidebar from "./Sidebar";
import { FaFileAlt } from "react-icons/fa";

const REACT_APP_BACKEND_URL =
  import.meta.env.VITE_WEBSITE_URL || "http://localhost:4000";

const CreateBlog = () => {
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [about, setAbout] = useState("");
  const [blogImage, setBlogImage] = useState("");
  const [blogImagePreview, setBlogImagePreview] = useState("");

  const navigate = useNavigate();

  const changePhotoHandler = (e) => {
    const file = e.target.files[0];
    if (file) {
      setBlogImage(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setBlogImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    } else {
      setBlogImage(null);
      setBlogImagePreview("");
    }
  };

  const handleCreateBlog = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("title", title);
    formData.append("category", category);
    formData.append("about", about);
    if (blogImage) {
      formData.append("blogImage", blogImage);
    }

    try {
      const { status } = await axios.post(
        `${REACT_APP_BACKEND_URL}/api/blog/create-blog`,
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
          withCredentials: true,
        }
      );

      if (status >= 200 && status < 300) {
        toast.success("Blog Created successfully!");
        navigate("/dashboard");
      } else {
        toast.error("Blog Creation failed");
      }
    } catch (error) {
      console.error(
        "Error during creation:",
        error.response ? error.response.data : error.message
      );
      toast.error("Error while creating blog");
    }

    setTitle("");
    setAbout("");
    setCategory("");
    setBlogImage(null);
    setBlogImagePreview("");
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

      <div className="ml-6 w-full px-4 py-8 flex justify-center items-start">
        <div className="w-full max-w-xl mt-10">
          <div className="bg-white/85 backdrop-blur-md rounded-2xl shadow-[0_15px_40px_rgba(36,121,194,0.18)] border border-blue-50 p-6">
            {/* Header */}
            <div className="flex items-center gap-3 mb-4">
              <span className="w-9 h-9 rounded-2xl bg-gradient-to-br from-blue-500 via-blue-600 to-indigo-500 flex items-center justify-center shadow-md shadow-blue-500/40">
                <FaFileAlt className="text-white text-lg" />
              </span>
              <div>
                <h2 className="text-xl font-bold text-[#2479C2]">
                  Create Blog
                </h2>
                <p className="text-xs text-gray-500">
                  Share a new update or article with your audience.
                </p>
              </div>
            </div>

            <form onSubmit={handleCreateBlog} className="space-y-4">
              <div className="font-semibold text-center text-sm text-gray-700">
                ACCU <span className="text-blue-500">Design</span>
              </div>

              <input
                type="text"
                placeholder="Enter Blog Title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full p-2.5 text-sm border border-blue-100 rounded-xl bg-slate-50/60
                           focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-300"
              />

              <input
                type="text"
                placeholder="Enter Blog Category"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full p-2.5 text-sm border border-blue-100 rounded-xl bg-slate-50/60
                           focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-300"
              />

              <div className="flex items-center gap-4">
                <div className="w-24 h-24 rounded-xl overflow-hidden border border-dashed border-blue-200 bg-slate-50/70 flex items-center justify-center">
                  {blogImagePreview ? (
                    <img
                      src={blogImagePreview}
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
                placeholder="Write something about the blog..."
                value={about}
                onChange={(e) => setAbout(e.target.value)}
                className="w-full h-[20vh] p-2.5 text-sm border border-blue-100 rounded-xl bg-slate-50/60
                           focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-300 resize-none"
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
                Post Blog
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateBlog;
