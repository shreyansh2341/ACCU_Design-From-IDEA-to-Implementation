import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const REACT_APP_BACKEND_URL = import.meta.env.VITE_WEBSITE_URL || 'http://localhost:4000';

const BlogDetails = () => {
  const { id } = useParams();
  const [blog, setBlog] = useState(null);

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const response = await axios.get(`${REACT_APP_BACKEND_URL}/api/blog/single-blog/${id}`,{
            withCredentials:true
        }
        );
        setBlog(response.data.blog);
      } catch (err) {
        console.error("Failed to load blog:", err);
      }
    };
    fetchBlog();
  }, [id]);

  if (!blog) return <div className="text-center mt-10 text-xl font-semibold">Loading blog...</div>;

  return (
    <div className="max-w-5xl mx-auto px-4 py-10">
      {/* Blog Title */}
      <h1 className="text-3xl font-bold text-center text-blue-700 mb-6">{blog.title}</h1>

      {/* Blog Image */}
      <div className="relative h-64 sm:h-96 overflow-hidden rounded-xl shadow-lg mb-6">
        <img
          src={blog.blogImage.url}
          alt={blog.title}
          className="w-full h-full object-cover"
        />
      </div>

      {/* Category */}
      <div className="mb-4 text-sm">
        <span className="bg-blue-500 text-white px-4 py-1 rounded-full shadow text-xs font-semibold">
          {blog.category}
        </span>
      </div>

      {/* Admin Info */}
      <div className="flex items-center gap-4 mb-6">
        <img
          src={blog.adminphoto}
          alt={blog.adminName}
          className="w-12 h-12 rounded-full border-2 border-blue-500"
        />
        <div>
          <p className="text-lg font-semibold text-gray-800">{blog.adminName}</p>
          <p className="text-xs text-gray-500">{new Date(blog.updatedAt).toLocaleDateString()}</p>
        </div>
      </div>

      {/* Blog Content */}
      <div className="text-gray-700 text-base leading-relaxed whitespace-pre-line">
        {blog.about}
      </div>
    </div>
  );
};

export default BlogDetails;
