const express= require('express');
const { 
    createReviewPost, 
    deleteReviewPost, 
    getAllReviews, 
    getSingleReview, 
    updateReviewPost 
    }= require('../controller/testimonials.controller');
const {authenticatedUser} = require('../middleware/authUser');
const { isAdmin } = require('../middleware/authUser');

const testimonialsrouter= express.Router();
testimonialsrouter.post('/create-review', authenticatedUser,isAdmin("admin"), createReviewPost);
testimonialsrouter.delete('/delete-review-posts/:id', authenticatedUser,isAdmin("admin"), deleteReviewPost);
testimonialsrouter.get('/all-review-posts',authenticatedUser, getAllReviews);
testimonialsrouter.get('/single-review-post/:id', authenticatedUser, getSingleReview);
testimonialsrouter.put('/update-review/:id', authenticatedUser, isAdmin("admin"), updateReviewPost);

module.exports = testimonialsrouter;