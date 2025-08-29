import React, { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

const REACT_APP_BACKEND_URL = import.meta.env.VITE_WEBSITE_URL || 'http://localhost:4000';

const CreateReview = () => {
  const [company, setCompany] = useState('');
  const [about, setAbout] = useState('');
  const [reviewImage, setReviewImage] = useState('');
  const [reviewImagePreview, setReviewImagePreview] = useState('');
  const [rating, setRating] = useState(0);

  const navigate = useNavigate();

  const changePhotoHandler = (e) => {
    const file = e.target.files[0];
    if (file) {
      setReviewImage(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setReviewImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    } else {
      setReviewImage(null);
      setReviewImagePreview('');
    }
  };

  const handleCreateReview = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('company', company);
    formData.append('about', about);
    formData.append('rating', rating);
    if (reviewImage) {
      formData.append('reviewImage', reviewImage);
    }

    try {
      const { status } = await axios.post(`${REACT_APP_BACKEND_URL}/api/testimonials/create`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
        withCredentials: true,
      });

      if (status >= 200 && status < 300) {
        toast.success('Review Created successfully!');
        navigate('/all-testimonials');
      } else {
        toast.error('Review Creation failed');
      }
    } catch (error) {
      console.error('Error during creation:', error.response ? error.response.data : error.message);
      toast.error('Error while creating review');
    }

    setCompany('');
    setAbout('');
    setReviewImage(null);
    setReviewImagePreview('');
    setRating(0);
  };

  const handleStarClick = (value) => {
    setRating(value);
  };

  return (
    <div className='bg-gray-100 h-90vh flex items-center justify-center'>
      <div className='w-full max-w-md bg-white shadow-md rounded-lg mx-auto mt-16 p-8'>
        <form onSubmit={handleCreateReview}>
          <div className='font-semibold text-xl text-center mb-4'>
            ACCU <span className='text-blue-500'>Design</span>
          </div>
          <input
            type="text"
            placeholder='Enter Company Name'
            value={company}
            onChange={(e) => setCompany(e.target.value)}
            className='w-full p-2 border rounded-md mb-4'
          />
          <div className='flex items-center mb-4'>
            <div className='photo w-20 h-20 rounded-full overflow-hidden mr-4 border'>
              {reviewImagePreview ? (
                <img src={reviewImagePreview} alt="Preview" className='w-full h-full object-cover' />
              ) : (
                <div className='w-full h-full bg-gray-200 flex items-center justify-center'>
                  <span className='text-gray-500'>No Image</span>
                </div>
              )}
            </div>
            <input type="file" onChange={changePhotoHandler} className='w-full p-2 border rounded-md' />
          </div>
          <textarea
            placeholder='Write Something About the Company'
            value={about}
            onChange={(e) => setAbout(e.target.value)}
            className='w-full h-[20vh] p-2 border rounded-md mb-4'
          />

          {/* ⭐ Rating Input */}
          <div className='mb-4 text-center'>
            <label className='block mb-2 font-medium text-gray-700'>Rate This Company:</label>
            <div className="flex justify-center space-x-1 text-yellow-400 text-xl cursor-pointer">
              {[1, 2, 3, 4, 5].map((val) => (
                <span
                  key={val}
                  onClick={() => handleStarClick(val)}
                  className={val <= rating ? 'text-yellow-500' : 'text-gray-300'}
                >
                  ★
                </span>
              ))}
            </div>
          </div>

          <button
            type='submit'
            className='w-full bg-blue-500 text-white font-semibold hover:bg-blue-700 duration-300 px-4 py-2 rounded-md'
          >
            Add Review
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreateReview;
