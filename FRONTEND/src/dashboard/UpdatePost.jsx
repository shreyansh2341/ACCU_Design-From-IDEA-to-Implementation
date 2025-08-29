import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';

const REACT_APP_BACKEND_URL = import.meta.env.VITE_WEBSITE_URL || 'http://localhost:4000';

const UpdatePost = () => {
  const { id } = useParams();
  const [form, setForm] = useState({
    event: '',
    about: ''
  });
  const [mediaImage, setMediaImage] = useState(null);
  const [imageUrl, setImageUrl] = useState('');
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
  const fetchPost = async () => {
    try {
      const { data } = await axios.get(`${REACT_APP_BACKEND_URL}/api/media/single-post/${id}`, {
        withCredentials: true,
      });
      const media = data.media;
      setForm({
        event: media.event,
        about: media.about || ''
      });
      setImageUrl(media.mediaImage.url);  // <-- Set current image
    } catch (error) {
      toast.error("Failed to fetch post.");
    }
  };
  fetchPost();
}, [id]);


  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };
    const handleUpdate = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("event", form.event);
    formData.append("about", form.about);

    if (mediaImage) {
      formData.append("mediaImage", mediaImage);
    }

    try {
      const { data } = await axios.put(
        `${REACT_APP_BACKEND_URL}/api/media/update-post/${id}`,
        formData,
        {
          withCredentials: true,
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      toast.success("Post updated successfully!");
      navigate("/all-posts");
    } catch (error) {
      console.error(error);
      toast.error("Error updating post.");
    }
  };


  return (
    <div className="max-w-xl mx-auto mt-10 p-6 bg-white shadow-md rounded">
      <h2 className="text-2xl font-bold mb-4 text-center">Update Post</h2>
      <form onSubmit={handleUpdate} className="space-y-4">
  <input
    type="text"
    name="event"
    value={form.event}
    onChange={handleChange}
    placeholder="Event"
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
      <p className="font-semibold mb-1">Current Post Image:</p>
      <img
        src={imageUrl}
        alt="Current Post"
        className="w-full h-64 object-cover rounded border"
      />
    </div>
  )}

  <input
    type="file"
    accept="image/*"
    onChange={(e) => setMediaImage(e.target.files[0])}
    className="w-full border p-2 rounded"
  />

  <button
    type="submit"
    className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700"
  >
    Update Post
  </button>
</form>

    </div>
  );
};

export default UpdatePost;
