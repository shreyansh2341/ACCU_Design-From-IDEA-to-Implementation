// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import Sidebar from './Sidebar';
// import { useNavigate } from 'react-router-dom';
// import { SLink } from '@/components/SLink';

// const REACT_APP_BACKEND_URL = import.meta.env.VITE_WEBSITE_URL || 'http://localhost:4000';

// const AllPosts = () => {
//   const [allposts, setAllPosts] = useState([]);
//   const navigate = useNavigate();

//   useEffect(() => {
//     const fetchAllPosts = async () => {
//       try {
//         const { data } = await axios.get(`${REACT_APP_BACKEND_URL}/api/media/all-posts`, {
//           withCredentials: true,
//         });
//         setAllPosts(data.allposts);
//       } catch (error) {
//         console.error(error);
//       }
//     };
//     fetchAllPosts();
//   }, []);

//   const handleDelete = async (postId) => {
//     try {
//       await axios.delete(`${REACT_APP_BACKEND_URL}/api/media/delete-posts/${postId}`, {
//         withCredentials: true,
//       });
//       setAllPosts((prev) => prev.filter((post) => post._id !== postId));
//     } catch (error) {
//       console.error('Error deleting post:', error);
//     }
//   };

//   const handleUpdate = (postId) => {
//     navigate(`/update-post/${postId}`);
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
//       {/* Sidebar */}
//       <Sidebar />

//       {/* Content */}
//       <div className="ml-6 w-full px-4 py-8 transition-all duration-300">
//         <h1 className="text-3xl font-bold mb-6 text-center text-[#2479C2]">All Posts</h1>
//         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
//           {allposts && allposts.length > 0 ? (
//             allposts.map((element) => (
//               <div
//                 key={element._id}
//                 className="group bg-white rounded-xl shadow-md hover:shadow-xl overflow-hidden transform hover:scale-105 transition duration-300 ease-in-out h-[460px] flex flex-col relative"
//               >
//                 {/* Image */}
//                 <div className="relative h-64 overflow-hidden">
//                   <img
//                     src={element.media.url}
//                     alt="post"
//                     className="w-full h-full object-cover"
//                   />
//                   <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-75 group-hover:opacity-100 transition duration-300 pointer-events-none" />
//                   <h1 className="absolute bottom-4 left-4 text-yellow-500 text-xl font-bold group-hover:text-blue-500 transition-colors duration-300 z-10">
//                     {element.event}
//                   </h1>
//                 </div>

//                 {/* Blog About Preview */}
//                 <div className="px-4 pb-2 text-gray-700 text-sm">
//                   {element.about?.split(' ').slice(0, 20).join(' ')}...
//                 </div>

//                 {/* Buttons */}
//                 <div className="flex justify-between px-4 pb-4 mt-auto">
//                   <SLink
//                     to={`/update-post/${element._id}`}
//                     className="text-green-600 font-semibold border border-green-600 px-3 py-1 rounded hover:text-white hover:bg-green-600 transition"
//                   >
//                     Update
//                   </SLink>
//                   <button
//                     onClick={() => handleDelete(element._id)}
//                     className="text-red-600 font-semibold border border-red-600 px-3 py-1 rounded hover:text-white hover:bg-red-600 transition"
//                   >
//                     Delete
//                   </button>
//                 </div>
//               </div>
//             ))
//           ) : (
//             <div className="col-span-full text-center text-gray-500 text-2xl font-semibold">
//               No Posts Available
//             </div>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };

//       export default AllPosts;


import React, { useEffect, useState } from "react";
import axios from "axios";
import Sidebar from "./Sidebar";
import { SLink } from "@/components/SLink";
import { FaBullhorn } from "react-icons/fa";

const REACT_APP_BACKEND_URL =
  import.meta.env.VITE_WEBSITE_URL || "http://localhost:4000";

const AllPosts = () => {
  const [allposts, setAllPosts] = useState([]);

  useEffect(() => {
    const fetchAllPosts = async () => {
      try {
        const { data } = await axios.get(
          `${REACT_APP_BACKEND_URL}/api/media/all-posts`,
          {
            withCredentials: true,
          }
        );
        setAllPosts(data.allposts);
      } catch (error) {
        console.error(error);
      }
    };
    fetchAllPosts();
  }, []);

  const handleDelete = async (postId) => {
    try {
      await axios.delete(
        `${REACT_APP_BACKEND_URL}/api/media/delete-posts/${postId}`,
        {
          withCredentials: true,
        }
      );
      setAllPosts((prev) => prev.filter((post) => post._id !== postId));
    } catch (error) {
      console.error("Error deleting post:", error);
    }
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
      {/* Sidebar */}
      <Sidebar />

      {/* Content Card */}
      <div className="ml-6 w-full px-4 py-8 transition-all duration-300">
        <div className="w-full max-w-6xl mx-auto mt-8 mb-8">
          <div className="bg-white/85 backdrop-blur-md rounded-2xl shadow-[0_15px_40px_rgba(36,121,194,0.18)] border border-blue-50 p-5">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <span className="w-9 h-9 rounded-2xl bg-gradient-to-br from-blue-500 via-blue-600 to-indigo-500 flex items-center justify-center shadow-md shadow-blue-500/40">
                  <FaBullhorn className="text-white text-lg" />
                </span>
                <div>
                  <h1 className="text-xl font-bold text-[#2479C2]">
                    All Posts
                  </h1>
                  <p className="text-xs text-gray-500">
                    Manage and update all your media posts here.
                  </p>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mt-4">
              {allposts && allposts.length > 0 ? (
                allposts.map((element) => (
                  <div
                    key={element._id}
                    className="group bg-white/90 backdrop-blur-sm rounded-2xl border border-blue-50 shadow-sm shadow-slate-200
                               hover:border-blue-200 hover:bg-gradient-to-br hover:from-blue-50/80 hover:via-white hover:to-blue-50
                               hover:shadow-[0_12px_30px_rgba(148,163,184,0.55)] transform hover:-translate-y-[3px]
                               transition-all duration-300 ease-out h-[460px] flex flex-col overflow-hidden relative"
                  >
                    {/* Image */}
                    <div className="relative h-64 overflow-hidden">
                      <img
                        src={element.media.url}
                        alt="post"
                        className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent opacity-80 group-hover:opacity-100 transition duration-300 pointer-events-none" />
                      <h1 className="absolute bottom-4 left-4 text-yellow-400 text-lg font-semibold group-hover:text-blue-50 transition-colors duration-300 z-10 drop-shadow">
                        {element.event}
                      </h1>
                    </div>

                    {/* About Preview */}
                    <div className="px-4 pt-3 pb-2 text-gray-700 text-sm">
                      {element.about?.split(" ").slice(0, 22).join(" ")}...
                    </div>

                    {/* Buttons */}
                    <div className="flex justify-between items-center px-4 pb-4 mt-auto">
                      <SLink
                        to={`/update-post/${element._id}`}
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
                        onClick={() => handleDelete(element._id)}
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
                  No Posts Available
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AllPosts;
