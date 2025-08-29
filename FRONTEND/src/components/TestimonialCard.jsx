import React from 'react';

const TestimonialCard = ({ review }) => {
  const trimmedAbout = review.about
    ? review.about.split(' ').slice(0, 50).join(' ') + (review.about.split(' ').length > 50 ? '...' : '')
    : 'No details available.';

  return (
    <div className="group bg-white rounded-xl shadow-md hover:shadow-xl transform hover:scale-105 transition duration-300 ease-in-out p-5 flex flex-col items-start text-left w-[350px]">
      {/* Image (centered & bigger) */}
      <div className="w-28 h-28 rounded-full overflow-hidden mb-4 border-2 border-gray-300 self-center">
        <img src={review.reviewImage.url} alt="testimonial" className="w-full h-full object-cover" />
      </div>

      {/* Company Name (centered) */}
      <h1 className="text-lg font-semibold text-yellow-600 group-hover:text-blue-500 transition mb-1 text-center w-full">
        {review.company}
      </h1>

      {/* Rating (centered) */}
      <div className="flex justify-center text-yellow-400 mb-3 w-full">
        {[...Array(review.rating || 0)].map((_, i) => (
          <span key={i} className="text-xl">&#9733;</span>
        ))}
      </div>

      {/* About Text (left-aligned) */}
      <p className="text-sm text-gray-700 leading-relaxed">
        {trimmedAbout}
      </p>
    </div>
  );
};

export default TestimonialCard;
