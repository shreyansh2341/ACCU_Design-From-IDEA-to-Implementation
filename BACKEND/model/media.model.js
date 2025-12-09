const mongoose = require('mongoose');

const mediaSchema = new mongoose.Schema({
    event: {
        type: String,
        required: true,
        trim: true,
    },
    about: {
        type: String,
        required: true,
        trim: true,
    },
    media: { 
        public_id: {
            type: String,
            required: true,
        },
        url: {
            type: String,
            required: true,
        },
        resource_type: {
            type: String,
            enum: ['image', 'video'], 
            default: 'image',
            required: true,
        }
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
    updatedAt: {
        type: Date,
        default: Date.now,
    },
}, { timestamps: true }); 

module.exports = mongoose.model('Media', mediaSchema);