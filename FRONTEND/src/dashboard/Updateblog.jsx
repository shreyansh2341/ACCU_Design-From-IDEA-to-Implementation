import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';

const REACT_APP_BACKEND_URL = import.meta.env.VITE_WEBSITE_URL || 'http://localhost:4000';

const UpdateBlog = () => {
  const { id } = useParams();
  const [form, setForm] = useState({
    title: '',
    category: '',
    about: ''
  });
  const [blogImage, setBlogImage] = useState(null);
  const [imageUrl, setImageUrl] = useState('');
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
  const fetchBlog = async () => {
    try {
      const { data } = await axios.get(`${REACT_APP_BACKEND_URL}/api/blog/single-blog/${id}`, {
        withCredentials: true,
      });
      const blog = data.blog;
      setForm({
        title: blog.title,
        category: blog.category,
        about: blog.about || ''
      });
      setImageUrl(blog.blogImage.url);  // <-- Set current image
    } catch (error) {
      toast.error("Failed to fetch blog.");
    }
  };
  fetchBlog();
}, [id]);


  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleUpdate = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("title", form.title);
    formData.append("category", form.category);
    formData.append("about", form.about);

    if (blogImage) {
      formData.append("blogImage", blogImage);
    }

    try {
      const { data } = await axios.put(
        `${REACT_APP_BACKEND_URL}/api/blog/update-blog/${id}`,
        formData,
        {
          withCredentials: true,
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      toast.success("Blog updated successfully!");
      navigate("/dashboard");
    } catch (error) {
      console.error(error);
      toast.error("Error updating blog.");
    }
  };


  return (
    <div className="max-w-xl mx-auto mt-10 p-6 bg-white shadow-md rounded">
      <h2 className="text-2xl font-bold mb-4 text-center">Update Blog</h2>
      <form onSubmit={handleUpdate} className="space-y-4">
  <input
    type="text"
    name="title"
    value={form.title}
    onChange={handleChange}
    placeholder="Title"
    className="w-full p-2 border rounded"
  />
  <input
    type="text"
    name="category"
    value={form.category}
    onChange={handleChange}
    placeholder="Category"
    className="w-full p-2 border rounded"
  />
  <textarea
    name="about"
    value={form.about}
    onChange={handleChange}
    placeholder="About Blog"
    className="w-full p-2 border rounded h-32"
  />

  {imageUrl && (
    <div>
      <p className="font-semibold mb-1">Current Blog Image:</p>
      <img
        src={imageUrl}
        alt="Current Blog"
        className="w-full h-64 object-cover rounded border"
      />
    </div>
  )}

  <input
    type="file"
    accept="image/*"
    onChange={(e) => setBlogImage(e.target.files[0])}
    className="w-full border p-2 rounded"
  />

  <button
    type="submit"
    className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700"
  >
    Update Blog
  </button>
</form>

    </div>
  );
};

export default UpdateBlog;
