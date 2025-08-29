import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Sidebar from './Sidebar'; // ✅ Sidebar import
import { useNavigate } from 'react-router-dom';
import { SLink } from '@/components/SLink';

const REACT_APP_BACKEND_URL = import.meta.env.VITE_WEBSITE_URL || 'http://localhost:4000';

const AllPosts = () => {
  const [allposts, setAllPosts] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchAllPosts = async () => {
      try {
        const { data } = await axios.get(`${REACT_APP_BACKEND_URL}/api/media/all-posts`, {
          withCredentials: true,
        });
        setAllPosts(data.allposts);
      } catch (error) {
        console.error(error);
      }
    };
    fetchAllPosts();
  }, []);

  const handleDelete = async (postId) => {
    try {
      await axios.delete(`${REACT_APP_BACKEND_URL}/api/media/delete-posts/${postId}`, {
        withCredentials: true,
      });
      setAllPosts((prev) => prev.filter((post) => post._id !== postId));
    } catch (error) {
      console.error('Error deleting post:', error);
    }
  };

  const handleUpdate = (postId) => {
    navigate(`/update-post/${postId}`);
  };

  return (
    <div className="flex min-h-screen bg-white">
      {/* Sidebar */}
      <Sidebar />

      {/* Content */}
      <div className="ml-64 w-full px-4 py-8 transition-all duration-300">
        <h1 className="text-2xl font-semibold mb-6 text-center">All Posts</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {allposts && allposts.length > 0 ? (
            allposts.map((element) => (
              <div
                key={element._id}
                className="group bg-white rounded-xl shadow-md hover:shadow-xl overflow-hidden transform hover:scale-105 transition duration-300 ease-in-out h-[460px] flex flex-col relative"
              >
                {/* Image */}
                <div className="relative h-64 overflow-hidden">
                  <img
                    src={element.mediaImage.url}
                    alt="post"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-75 group-hover:opacity-100 transition duration-300 pointer-events-none" />
                  <h1 className="absolute bottom-4 left-4 text-yellow-500 text-xl font-bold group-hover:text-blue-500 transition-colors duration-300 z-10">
                    {element.event}
                  </h1>
                </div>

                {/* Blog About Preview */}
                <div className="px-4 pb-2 text-gray-700 text-sm">
                  {element.about?.split(' ').slice(0, 20).join(' ')}...
                </div>

                {/* Buttons */}
                <div className="flex justify-between px-4 pb-4 mt-auto">
                  <SLink
                    to={`/update-post/${element._id}`}
                    className="text-green-600 font-semibold border border-green-600 px-3 py-1 rounded hover:text-white hover:bg-green-600 transition"
                  >
                    Update
                  </SLink>
                  <button
                    onClick={() => handleDelete(element._id)}
                    className="text-red-600 font-semibold border border-red-600 px-3 py-1 rounded hover:text-white hover:bg-red-600 transition"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))
          ) : (
            <div className="col-span-full text-center text-gray-500 text-2xl font-semibold">
              No Posts Available
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AllPosts;
