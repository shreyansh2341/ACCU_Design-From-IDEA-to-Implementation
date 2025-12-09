const express= require('express');
const { 
    createMediaPost, 
    deleteMediaPost, 
    getAllPosts, 
    getSinglePost, 
    updatePost 
    }= require('../controller/media.controller');
const {authenticatedUser} = require('../middleware/authUser');
const { isAdmin } = require('../middleware/authUser');

const mediarouter= express.Router();
mediarouter.post('/create-post', authenticatedUser,isAdmin("admin"), createMediaPost);
mediarouter.delete('/delete-posts/:id', authenticatedUser,isAdmin("admin"), deleteMediaPost);
mediarouter.get('/all-posts',authenticatedUser, getAllPosts);
mediarouter.get('/single-post/:id', authenticatedUser, getSinglePost);
mediarouter.put('/update-post/:id', authenticatedUser, isAdmin("admin"), updatePost);

module.exports = mediarouter;