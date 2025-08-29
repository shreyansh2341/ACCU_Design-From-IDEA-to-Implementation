import React, { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom'; // ✅ Step 1

const REACT_APP_BACKEND_URL = import.meta.env.VITE_WEBSITE_URL || 'http://localhost:4000';

const CreateBlog = () => {
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('');
  const [about, setAbout] = useState('');
  const [blogImage, setBlogImage] = useState('');
  const [blogImagePreview, setBlogImagePreview] = useState('');

  const navigate = useNavigate(); // ✅ Step 2

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
      setBlogImagePreview('');
    }
  };

  const handleCreateBlog = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('title', title);
    formData.append('category', category);
    formData.append('about', about);
    if (blogImage) {
      formData.append('blogImage', blogImage);
    }

    try {
      const { data, status } = await axios.post(`${REACT_APP_BACKEND_URL}/api/blog/create`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
        withCredentials: true,
      });

      if (status >= 200 && status < 300) {
        toast.success('Blog Created successfully!');
        navigate('/dashboard'); // ✅ Step 3: redirect
      } else {
        toast.error('Blog Creation failed');
      }
    } catch (error) {
      console.error('Error during creation:', error.response ? error.response.data : error.message);
      toast.error('Error while creating blog');
    }

    setTitle('');
    setAbout('');
    setCategory('');
    setBlogImage(null);
    setBlogImagePreview('');
  };

  return (

    <div className='bg-gray-100 h-90vh flex items-center justify-center'>
      <div className='w-full max-w-md bg-white shadow-md rounded-lg mx-auto mt-16 p-8'>
        <form onSubmit={handleCreateBlog}>
          <div className='font-semibold text-xl text-center mb-4'>
            ACCU <span className='text-blue-500'>Design</span>
          </div>
          <input type="text" placeholder='Enter Your Title' value={title} onChange={(e) => setTitle(e.target.value)} className='w-full p-2 border rounded-md mb-4' />
          <input type="text" placeholder='Enter Your Category' value={category} onChange={(e) => setCategory(e.target.value)} className='w-full p-2 border rounded-md mb-4' />
          <div className='flex items-center mb-4'>
            <div className='photo w-20 h-20 rounded-md overflow-hidden mr-4'>
              {blogImagePreview ? (
                <img src={blogImagePreview} alt="Preview" className='w-full h-full object-cover' />
              ) : (
                <div className='w-full h-full bg-gray-200 flex items-center justify-center'>
                  <span className='text-gray-500'>No Image</span>
                </div>
              )}
            </div>
            <input type="file" onChange={changePhotoHandler} className='w-full p-2 border rounded-md' />
          </div>
          <textarea placeholder='Write Something About the Blog' value={about} onChange={(e) => setAbout(e.target.value)} className='w-full h-[20vh] p-2 border rounded-md mb-4' />
          <button type='submit' className='w-full bg-blue-500 text-white font-semibold hover:bg-blue-700 duration-300 px-4 py-2 rounded-md'>Post Blog</button>
        </form>
      </div>
    </div>
  );
};

export default CreateBlog;

