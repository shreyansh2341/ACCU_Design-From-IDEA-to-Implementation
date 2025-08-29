// const mongoose = require('mongoose');

// const mediaSchema = new mongoose.Schema({
//     event: {
//         type: String,
//         required: true,
//     },
//     mediaImage: {
//         public_id: {
//             type: String,
//             required: true,
//         },
//         url: {
//             type: String,
//             required: true,
//         }
//     },
//     about: {
//         type: String,
//         select: false,
//     },
// },
//     { timestamps: true });

// const Media= mongoose.model('Media', mediaSchema);

// module.exports= Media;

// models/media.model.js
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
    media: { // Changed from mediaImage to media to be more generic
        public_id: {
            type: String,
            required: true,
        },
        url: {
            type: String,
            required: true,
        },
        resource_type: { // <-- NEW FIELD: to store 'image' or 'video'
            type: String,
            enum: ['image', 'video'], // Restrict to these values
            default: 'image', // Default to 'image' if not explicitly set
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
}, { timestamps: true }); // Adding timestamps might be redundant if you're manually setting createdAt/updatedAt

module.exports = mongoose.model('Media', mediaSchema);