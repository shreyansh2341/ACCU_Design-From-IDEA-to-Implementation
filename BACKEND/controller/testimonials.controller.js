const { default: mongoose } = require("mongoose");
const Review = require("../model/testimonials.model");
const cloudinary = require('cloudinary').v2;
const streamifier = require('streamifier');


const createReviewPost = async (req, res) => {
  try {
    if (!req.files || Object.keys(req.files).length === 0) {
      return res.status(400).json({ message: 'Review Image is required!' });
    }
    const { reviewImage } = req.files;
    const allowedTypes = ['image/jpeg', 'image/png', 'image/jpg', 'image/svg'];
    if (!allowedTypes.includes(reviewImage.mimetype)) {
      return res.status(400).json({ message: 'Invalid file type. Only JPEG, SVG and PNG are allowed.' });
    }

    const { company, about, rating } = req.body;

    if (!company || !about) {
      return res.status(400).json({ message: 'Company Name, and about fields are required!' });
    }
    if (!rating || rating < 1 || rating > 5) {
      return res.status(400).json({ message: 'Rating must be between 1 and 5' });
    }

    const cloudinaryResponse = await cloudinary.uploader.upload(reviewImage.tempFilePath, {
      folder: 'review_Images',
      use_filename: true,
      unique_filename: false,
      overwrite: true,
    });
    if (!cloudinaryResponse || !cloudinaryResponse.public_id || !cloudinaryResponse.secure_url || cloudinaryResponse.error) {
      console.error('Cloudinary upload error:', cloudinaryResponse.error);
    };

    reviewFields = {
      company,
      about,
      rating: Number(rating),
      reviewImage: {
        public_id: cloudinaryResponse.public_id,
        url: cloudinaryResponse.url,
      }
    };

    try {
      const Reviews = await Review.create(reviewFields);
      res.status(200).json({ message: 'Review Post created successfully', Review: Reviews });
    } catch (error) {
      res.status(500).json({ message: 'Error creating review post', error: error.message });
    };
  } catch (error) {
    res.status(500).json({ message: 'Internal Server Error', error: error.message });
  }
}

const deleteReviewPost = async (req, res) => {
  try {
    const { id } = req.params;
    const review = await Review.findById(id);
    if (!review) {
      return res.status(404).json({ message: 'Review Post not found' });
    }
    const cloudinaryResponse = await cloudinary.uploader.destroy(review.reviewImage.public_id);
    if (cloudinaryResponse.result !== 'ok') {
      return res.status(500).json({ message: 'Error deleting image from Cloudinary' });
    }
    await Review.findByIdAndDelete(id);
    res.status(200).json({ message: 'Review Post deleted successfully' });
  }
  catch (error) {
    console.error('Error deleting review post:', error);
    res.status(500).json({ message: 'Internal Server Error', error: error.message });
  }
}

const getAllReviews = async (req, res) => {
  try {
    const allreviews = await Review.find().select('+about').sort({ createdAt: -1 });

    if (!allreviews || allreviews.length === 0) {
      return res.status(404).json({ message: 'No reviews found' });
    }
    res.status(200).json({ message: 'Review Posts retrieved successfully', allreviews });
  } catch (error) {
    console.error('Error retrieving posts:', error);
    res.status(500).json({ message: 'Internal Server Error', error: error.message });
  }
}

const getSingleReview = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: 'Invalid post ID' });
    }

    const review = await Review.findById(id).select('+about');

    if (!review) {
      return res.status(404).json({ message: 'Review posts not found' });
    }

    res.status(200).json({ message: 'Review Post retrieved successfully', review });
  } catch (error) {
    console.error('Error retrieving review post:', error);
    res.status(500).json({ message: 'Internal Server Error', error: error.message });
  }
};


const updateReviewPost = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: 'Invalid review post ID' });
    }

    const review = await Review.findById(id);
    if (!review) {
      return res.status(404).json({ message: 'Review posts not found' });
    }

    let reviewFields = {
      ...req.body,
      updatedAt: Date.now(),
    };

    if (req.files && req.files.reviewImage) {
      await cloudinary.uploader.destroy(review.reviewImage.public_id);

      const result = await cloudinary.uploader.upload(req.files.reviewImage.tempFilePath, {
        folder: 'review_Images',
        use_filename: true,
        unique_filename: false,
        overwrite: true,
      });

      reviewFields.reviewImage = {
        public_id: result.public_id,
        url: result.secure_url,
      };
    }

    const updatedReviewPost = await Review.findByIdAndUpdate(id, reviewFields, { new: true });

    res.status(200).json({ message: 'Review Post updated successfully', updatedReviewPost });
  } catch (error) {
    console.error('Error updating review post:', error);
    res.status(500).json({ message: 'Internal Server Error', error: error.message });
  }
};

module.exports = { createReviewPost, deleteReviewPost, getAllReviews, getSingleReview, updateReviewPost };