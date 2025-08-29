import React, { useState } from 'react';
import { useAuth } from '@/context/AuthProvider.jsx';
import Trending from '@/home/Trending.jsx';
import { SLink } from '@/components/SLink';

const Blog = () => {
  const { blogs } = useAuth();
  const [currentPage, setCurrentPage] = useState(1);
  const blogsPerPage = 4;

  const indexOfLastBlog = currentPage * blogsPerPage;
  const indexOfFirstBlog = indexOfLastBlog - blogsPerPage;
  const currentBlogs = blogs?.slice(indexOfFirstBlog, indexOfLastBlog);

  const totalPages = Math.ceil((blogs?.length || 0) / blogsPerPage);

  const handleNext = () => {
    if (currentPage < totalPages) setCurrentPage(prev => prev + 1);
  };

  const handlePrevious = () => {
    if (currentPage > 1) setCurrentPage(prev => prev - 1);
  };

  return (
    <div className="px-4 md:px-10 py-8">
      {/* 🔥 Trending Section */}
      <Trending />

      {/* 📰 All Blogs */}
      <h1 className="text-3xl font-bold text-center text-[#2479C2] mb-8">All Blogs</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        {currentBlogs && currentBlogs.length > 0 ? (
          currentBlogs.map((element) => (
            <div
              key={element._id}
              className="group bg-white rounded-xl shadow-md hover:shadow-xl overflow-hidden transform hover:-translate-y-1 transition-all duration-300 ease-in-out flex flex-col relative border border-gray-200"
            >
              {/* Image */}
              <div className="relative h-64 overflow-hidden">
                <img
                  src={element.blogImage.url}
                  alt="blog"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-60 group-hover:opacity-90 transition duration-300 pointer-events-none" />
                <h1 className="absolute bottom-4 left-4 text-yellow-400 text-xl font-bold group-hover:text-white transition-colors duration-300 z-10">
                  {element.title}
                </h1>
              </div>

              {/* Category */}
              <div className="absolute top-4 left-4 text-white bg-blue-600 px-3 py-1 rounded-full text-xs font-semibold shadow-lg">
                {element.category}
              </div>

              {/* Admin Info */}
              <div className="p-4 flex items-center">
                <img
                  src={element.adminphoto}
                  alt="admin"
                  className="w-12 h-12 rounded-full border-2 border-blue-500"
                />
                <div className="ml-4">
                  <p className="text-base font-semibold text-gray-800">{element.adminName}</p>
                </div>
              </div>

              {/* About Preview */}
              <div className="px-4 pb-2 text-gray-700 text-sm">
                {element.about?.split(' ').slice(0, 20).join(' ')}...
              </div>

              {/* Read More Button */}
              <div className="px-4 pb-4 mt-auto">
                <SLink
                  to={`/blog/${element._id}`}
                  className="text-blue-600 font-semibold px-4 py-1 mt-2 border border-blue-500 rounded hover:bg-blue-600 hover:text-white transition text-sm"
                >
                  Read More
                </SLink>
              </div>
            </div>
          ))
        ) : (
          <div className="col-span-full text-center text-gray-500 text-2xl font-semibold">
            No Blogs Available
          </div>
        )}
      </div>

      {/* 👇 Pagination Controls */}
      {totalPages > 1 && (
        <div className="flex justify-center mt-10 space-x-2 flex-wrap">
          <button
            onClick={handlePrevious}
            className={`px-3 py-1 text-sm rounded border ${
              currentPage === 1
                ? 'bg-gray-200 cursor-not-allowed'
                : 'bg-white text-gray-800 border-gray-300 hover:bg-blue-100'
            }`}
            disabled={currentPage === 1}
          >
            Previous
          </button>

          {Array.from({ length: totalPages }, (_, i) => (
            <button
              key={i}
              onClick={() => setCurrentPage(i + 1)}
              className={`px-3 py-1 text-sm rounded border transition-all duration-200 ${
                currentPage === i + 1
                  ? 'bg-blue-500 text-white border-blue-500'
                  : 'bg-white text-gray-700 border-gray-300 hover:bg-blue-100'
              }`}
            >
              {i + 1}
            </button>
          ))}

          <button
            onClick={handleNext}
            className={`px-3 py-1 text-sm rounded border ${
              currentPage === totalPages
                ? 'bg-gray-200 cursor-not-allowed'
                : 'bg-white text-gray-800 border-gray-300 hover:bg-blue-100'
            }`}
            disabled={currentPage === totalPages}
          >
            Next
          </button>
        </div>
      )}

      {/* ℹ️ About Section */}
      <div className="mt-16 p-6 bg-blue-50 rounded-xl shadow-inner border border-blue-100 max-w-5xl mx-auto text-center">
        <h2 className="text-2xl font-bold text-blue-800 mb-3">About Our Blog</h2>
        <p className="text-gray-700 leading-relaxed text-base">
          Explore the latest updates, tutorials, industry insights, and personal stories from our talented
          creators and team. Each blog is carefully curated to inform, inspire, and engage our readers.
        </p>
      </div>
    </div>
  );
};

export default Blog;
