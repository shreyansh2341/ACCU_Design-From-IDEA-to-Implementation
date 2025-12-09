import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const REACT_APP_BACKEND_URL = import.meta.env.VITE_WEBSITE_URL || 'http://localhost:4000';

const MediaDetails = () => {
  const { id } = useParams();
  const [media, setMedia] = useState(null);

  useEffect(() => {
    const fetchMedia = async () => {
      try {
        const response = await axios.get(`${REACT_APP_BACKEND_URL}/api/media/single-post/${id}`, {
          withCredentials: true,
        });
        setMedia(response.data.media);
      } catch (err) {
        console.error("Failed to load media:", err);
      }
    };
    fetchMedia();
  }, [id]);

  if (!media) {
    return (
      <div className="text-center mt-10 text-xl font-semibold">
        Loading media post...
      </div>
    );
  }

  return (
    <div
      className="min-h-screen flex items-center justify-center bg-cover bg-center bg-no-repeat py-10 px-4"
      style={{
        backgroundImage: "url('/images/bg-image-getquote.jpg')",
        backgroundBlendMode: 'overlay',
        backgroundColor: 'rgba(240,248,255, 0.5)', // bluish white
      }}
    >
      <div className="max-w-4xl w-full bg-white/90 backdrop-blur-md border border-blue-200 rounded-xl shadow-xl p-8">
        {/* Title */}
        <h1 className="text-3xl font-bold text-center text-blue-700 mb-6 border-b border-blue-300 pb-2">
          {media.event}
        </h1>

        {/* Media Image */}
        <div className="relative h-64 sm:h-96 overflow-hidden rounded-xl shadow-md mb-6 border-4 border-blue-200">
          <img
            src={media.media.url}
            alt={media.event}
            className="w-full h-full object-cover"
          />
        </div>

        {/* Created Date */}
        <p className="text-center text-sm font-semibold text-blue-600 mb-6 italic underline">
          Posted on: {new Date(media.updatedAt).toLocaleDateString()}
        </p>

        {/* Description */}
        <div className="text-gray-800 text-base leading-relaxed whitespace-pre-line border-t pt-4 border-blue-100 px-2">
          {media.about}
        </div>
      </div>
    </div>
  );
};

export default MediaDetails;
