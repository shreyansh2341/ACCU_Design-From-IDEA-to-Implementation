const mongoose = require('mongoose');

const testSchema = new mongoose.Schema({
    company: {
        type: String,
        required: true,
    },
    reviewImage: {
        public_id: {
            type: String,
            required: true,
        },
        url: {
            type: String,
            required: true,
        }
    },
    about: {
        type: String,
        select: false,
    },
    rating: {
        type: Number,
        min: 1,
        max: 5,
        required: true
    }

},
    { timestamps: true });

const Review = mongoose.model('Review', testSchema);

module.exports = Review;