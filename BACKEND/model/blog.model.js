const mongoose = require('mongoose');

const blogSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    blogImage: {
        public_id: {
            type: String,
            required: true,
        },
        url: {
            type: String,
            required: true,
        }
    },
    category: {
        type: String,
        required: true,
    },
    adminphoto: {
        type: String,
    },
    adminName: {
        type: String,
    },
    about: {
        type: String,
        select: false,
    },

    createdBy: {
        type: mongoose.Schema.ObjectId,
        ref: 'User',
    },
    updatedAt: {
        type: Date,
        default: Date.now,
    }
},
    { timestamps: true });

const Blog= mongoose.model('Blog', blogSchema);

module.exports= Blog;