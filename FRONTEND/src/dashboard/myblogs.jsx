import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Sidebar from './Sidebar'; // ✅ Sidebar import
import { useNavigate } from 'react-router-dom';
import { SLink } from '@/components/SLink';

const REACT_APP_BACKEND_URL = import.meta.env.VITE_WEBSITE_URL || 'http://localhost:4000';

const Myblogs = () => {
  const [myBlogs, setMyBlogs] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchMyBlogs = async () => {
      try {
        const { data } = await axios.get(`${REACT_APP_BACKEND_URL}/api/blog/all-blogs`, {
          withCredentials: true,
        });
        setMyBlogs(data.allblogs);
      } catch (error) {
        console.error(error);
      }
    };
    fetchMyBlogs();
  }, []);

  const handleDelete = async (blogId) => {
    try {
      await axios.delete(`${REACT_APP_BACKEND_URL}/api/blog/delete/${blogId}`, {
        withCredentials: true,
      });
      setMyBlogs((prev) => prev.filter((blog) => blog._id !== blogId));
    } catch (error) {
      console.error('Error deleting blog:', error);
    }
  };

  const handleUpdate = (blogId) => {
    navigate(`/update-blog/${blogId}`);
  };

  return (
    <div className="flex min-h-screen bg-white">
      {/* Sidebar */}
      <Sidebar />

      {/* Content */}
      <div className="ml-64 w-full px-4 py-8 transition-all duration-300">
        <h1 className="text-2xl font-semibold mb-6 text-center">All Blogs</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {myBlogs && myBlogs.length > 0 ? (
            myBlogs.map((element) => (
              <div
                key={element._id}
                className="group bg-white rounded-xl shadow-md hover:shadow-xl overflow-hidden transform hover:scale-105 transition duration-300 ease-in-out h-[540px] flex flex-col relative"
              >
                {/* Image */}
                <div className="relative h-64 overflow-hidden">
                  <img
                    src={element.blogImage.url}
                    alt="blog"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-75 group-hover:opacity-100 transition duration-300 pointer-events-none" />
                  <h1 className="absolute bottom-4 left-4 text-yellow-500 text-xl font-bold group-hover:text-blue-500 transition-colors duration-300 z-10">
                    {element.title}
                  </h1>
                </div>

                {/* Category Tag */}
                <div className="absolute top-4 left-4 text-white bg-blue-500 px-3 py-1 rounded-full text-sm font-semibold">
                  {element.category}
                </div>

                {/* Admin Info */}
                <div className="p-4 flex items-center">
                  <img
                    src={element.adminphoto}
                    alt=""
                    className="w-12 h-12 rounded-full border-2 border-blue-500"
                  />
                  <div className="ml-4">
                    <p className="text-lg font-semibold text-gray-800">{element.adminName}</p>
                  </div>
                </div>

                {/* Blog About Preview */}
                <div className="px-4 pb-2 text-gray-700 text-sm">
                  {element.about?.split(' ').slice(0, 20).join(' ')}...
                </div>

                {/* Buttons */}
                <div className="flex justify-between px-4 pb-4 mt-auto">
                  <SLink
                    to={`/update-blog/${element._id}`}
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
              No Blogs Available
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Myblogs;
