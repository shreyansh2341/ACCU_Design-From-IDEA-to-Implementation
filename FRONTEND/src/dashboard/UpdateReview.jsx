import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-hot-toast';
import { useNavigate, useParams } from 'react-router-dom';

const REACT_APP_BACKEND_URL = import.meta.env.VITE_WEBSITE_URL || 'http://localhost:4000';

const UpdateReview = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [company, setCompany] = useState('');
  const [about, setAbout] = useState('');
  const [reviewImage, setReviewImage] = useState(null);
  const [previewImage, setPreviewImage] = useState('');

  useEffect(() => {
    const fetchReview = async () => {
      try {
        const { data } = await axios.get(`${REACT_APP_BACKEND_URL}/api/testimonials/single-review-post/${id}`, {
          withCredentials: true,
        });
        setCompany(data.review.company);
        setAbout(data.review.about);
        setPreviewImage(data.review.reviewImage.url);
      } catch (error) {
        console.error('Error fetching review:', error);
      }
    };

    fetchReview();
  }, [id]);

  const changePhotoHandler = (e) => {
    const file = e.target.files[0];
    if (file) {
      setReviewImage(file);
      const reader = new FileReader();
      reader.onloadend = () => setPreviewImage(reader.result);
      reader.readAsDataURL(file);
    }
  };

  const handleUpdate = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('company', company);
    formData.append('about', about);
    if (reviewImage) formData.append('reviewImage', reviewImage);

    try {
      const { status } = await axios.put(`${REACT_APP_BACKEND_URL}/api/testimonials/update-review/${id}`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
        withCredentials: true,
      });

      if (status >= 200 && status < 300) {
        toast.success('Review Updated!');
        navigate('/dashboard');
      }
    } catch (error) {
      console.error('Error updating review:', error);
      toast.error('Failed to update review');
    }
  };

  return (
    <div className='bg-gray-100 h-90vh flex items-center justify-center'>
      <div className='w-full max-w-md bg-white shadow-md rounded-lg mx-auto mt-16 p-8'>
        <form onSubmit={handleUpdate}>
          <div className='font-semibold text-xl text-center mb-4'>
            Update <span className='text-blue-500'>Review</span>
          </div>
          <input
            type="text"
            placeholder='Company Name'
            value={company}
            onChange={(e) => setCompany(e.target.value)}
            className='w-full p-2 border rounded-md mb-4'
          />
          <div className='flex items-center mb-4'>
            <div className='photo w-20 h-20 rounded-md overflow-hidden mr-4'>
              {previewImage ? (
                <img src={previewImage} alt="Preview" className='w-full h-full object-cover' />
              ) : (
                <div className='w-full h-full bg-gray-200 flex items-center justify-center'>
                  <span className='text-gray-500'>No Image</span>
                </div>
              )}
            </div>
            <input type="file" onChange={changePhotoHandler} className='w-full p-2 border rounded-md' />
          </div>
          <textarea
            placeholder='About the Company'
            value={about}
            onChange={(e) => setAbout(e.target.value)}
            className='w-full h-[20vh] p-2 border rounded-md mb-4'
          />
          <button type='submit' className='w-full bg-blue-500 text-white font-semibold hover:bg-blue-700 duration-300 px-4 py-2 rounded-md'>
            Update Review
          </button>
        </form>
      </div>
    </div>
  );
};

export default UpdateReview;
