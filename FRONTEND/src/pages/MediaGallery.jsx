import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { SLink } from '@/components/SLink';

const MediaGallery = () => {
  const [mediaItems, setMediaItems] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 7;

  useEffect(() => {
    const fetchMedia = async () => {
      try {
        const { data } = await axios.get("http://localhost:4000/api/media/all-posts", {
          withCredentials: true,
        });
        if (Array.isArray(data.allposts)) {
          setMediaItems(data.allposts);
        } else {
          setMediaItems([]);
        }
      } catch (error) {
        console.error("Error fetching media:", error);
        setMediaItems([]);
      }
    };

    fetchMedia();
  }, []);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = mediaItems.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(mediaItems.length / itemsPerPage);

  const handleNext = () => {
    if (currentPage < totalPages) setCurrentPage(prev => prev + 1);
  };

  const handlePrevious = () => {
    if (currentPage > 1) setCurrentPage(prev => prev - 1);
  };

  return (
     <div
            className="px-4 md:px-10 py-10 min-h-screen bg-cover bg-center bg-no-repeat"
            style={{
                backgroundImage: `url('/images/bg-image-getquote.jpg')`,
                backgroundColor: 'rgba(240,248,255, 0.9)',
                backgroundBlendMode: 'lighten',
            }}
        >
      <h1 className="text-4xl font-extrabold text-center text-blue-700 mb-10 animate-fade-in-down">Media Gallery</h1>

      {/* Grid */}
      <div className="flex flex-wrap justify-center gap-6">
        {currentItems.length > 0 ? (
          currentItems.map((item, index) => (
            <div
              key={item._id}
              className="group relative overflow-hidden bg-white rounded-xl shadow-lg transition-transform duration-300 ease-in-out transform hover:-translate-y-1 hover:scale-105"
              style={{ maxWidth: '280px', width: '100%', height: '420px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}
            >
              {/* Image */}
              <div className="relative h-48 overflow-hidden">
                <img
                  src={item.media.url}
                  alt="media"
                  className="w-full h-full object-cover transition-transform duration-500 ease-in-out group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-60 group-hover:opacity-80 transition duration-300" />
                <h2 className="absolute bottom-4 left-4 text-yellow-400 text-lg font-bold group-hover:text-blue-500 transition-all duration-300">
                  {item.event}
                </h2>
              </div>

              {/* About */}
              <div className="p-4">
                <p className="text-gray-700 text-sm mb-4 transition-all duration-300 ease-in-out group-hover:translate-x-1">
                  {item.about?.split(' ').slice(0, 25).join(' ')}...
                </p>
                <div className="text-right">
                  <SLink
                    to={`/media/${item._id}`}
                    className="inline-block px-4 py-2 text-sm font-semibold text-blue-600 border border-blue-500 rounded hover:bg-blue-600 hover:text-white transition"
                  >
                    Know More
                  </SLink>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="col-span-full text-center text-gray-500 text-2xl font-semibold">
            No Media Available
          </div>
        )}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex justify-center mt-12 space-x-2 flex-wrap animate-fade-in-up">
          <button
            onClick={handlePrevious}
            disabled={currentPage === 1}
            className={`px-4 py-2 text-sm rounded border transition-all duration-200 ${
              currentPage === 1
                ? 'bg-gray-200 cursor-not-allowed'
                : 'bg-white text-gray-800 border-gray-300 hover:bg-blue-100'
            }`}
          >
            Previous
          </button>

          {Array.from({ length: totalPages }, (_, i) => (
            <button
              key={i}
              onClick={() => setCurrentPage(i + 1)}
              className={`px-4 py-2 text-sm rounded border transition-all duration-200 ${
                currentPage === i + 1
                  ? 'bg-blue-600 text-white border-blue-600'
                  : 'bg-white text-gray-800 border-gray-300 hover:bg-blue-100'
              }`}
            >
              {i + 1}
            </button>
          ))}

          <button
            onClick={handleNext}
            disabled={currentPage === totalPages}
            className={`px-4 py-2 text-sm rounded border transition-all duration-200 ${
              currentPage === totalPages
                ? 'bg-gray-200 cursor-not-allowed'
                : 'bg-white text-gray-800 border-gray-300 hover:bg-blue-100'
            }`}
          >
            Next
          </button>
        </div>
      )}

      {/* About Gallery */}
      <div className="mt-20 p-6 bg-white/80 backdrop-blur-md rounded-xl shadow-inner border border-blue-100 max-w-4xl mx-auto text-center animate-fade-in-up">
        <h2 className="text-2xl font-bold text-blue-800 mb-4">About This Gallery</h2>
        <p className="text-gray-700 leading-relaxed">
          Explore our media journey featuring our top events, innovations, and behind-the-scenes. This gallery is a reflection of our passion and commitment. Discover visuals that capture our spirit and creativity.
        </p>
      </div>
    </div>
  );
};

export default MediaGallery;
