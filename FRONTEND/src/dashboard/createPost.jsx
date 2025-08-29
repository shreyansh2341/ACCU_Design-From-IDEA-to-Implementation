import React, { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom'; // ✅ Step 1

const REACT_APP_BACKEND_URL = import.meta.env.VITE_WEBSITE_URL || 'http://localhost:4000';

const CreatePost = () => {
  const [event, setEvent] = useState('');
  const [about, setAbout] = useState('');
  const [mediaImage, setMediaImage] = useState('');
  const [mediaImagePreview, setMediaImagePreview] = useState('');

  const navigate = useNavigate(); // ✅ Step 2

  const changePhotoHandler = (e) => {
    const file = e.target.files[0];
    if (file) {
      setMediaImage(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setMediaImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    } else {
      setMediaImage(null);
      setMediaImagePreview('');
    }
  };

  const handleCreatePost = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('event', event);
    formData.append('about', about);
    if (mediaImage) {
      formData.append('mediaImage', mediaImage);
    }

    try {
      const { data, status } = await axios.post(`${REACT_APP_BACKEND_URL}/api/media/create`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
        withCredentials: true,
      });

      if (status >= 200 && status < 300) {
        toast.success('Post Created successfully!');
        navigate('/dashboard'); // ✅ Step 3: redirect
      } else {
        toast.error('Post Creation failed');
      }
    } catch (error) {
      console.error('Error during creation:', error.response ? error.response.data : error.message);
      toast.error('Error while creating post');
    }

    setEvent('');
    setAbout('');
    setMediaImage(null);
    setMediaImagePreview('');
  };

  return (

    <div className='bg-gray-100 h-90vh flex items-center justify-center'>
      <div className='w-full max-w-md bg-white shadow-md rounded-lg mx-auto mt-16 p-8'>
        <form onSubmit={handleCreatePost}>
          <div className='font-semibold text-xl text-center mb-4'>
            ACCU <span className='text-blue-500'>Design</span>
          </div>
          <input type="text" placeholder='Enter Your Title' value={event} onChange={(e) => setEvent(e.target.value)} className='w-full p-2 border rounded-md mb-4' />
          <div className='flex items-center mb-4'>
            <div className='photo w-20 h-20 rounded-md overflow-hidden mr-4'>
              {mediaImagePreview ? (
                <img src={mediaImagePreview} alt="Preview" className='w-full h-full object-cover' />
              ) : (
                <div className='w-full h-full bg-gray-200 flex items-center justify-center'>
                  <span className='text-gray-500'>No Image</span>
                </div>
              )}
            </div>
            <input type="file" onChange={changePhotoHandler} className='w-full p-2 border rounded-md' />
          </div>
          <textarea placeholder='Write Something About the Blog' value={about} onChange={(e) => setAbout(e.target.value)} className='w-full h-[20vh] p-2 border rounded-md mb-4' />
          <button type='submit' className='w-full bg-blue-500 text-white font-semibold hover:bg-blue-700 duration-300 px-4 py-2 rounded-md'>Add Post</button>
        </form>
      </div>
    </div>
  );
};

export default CreatePost;

