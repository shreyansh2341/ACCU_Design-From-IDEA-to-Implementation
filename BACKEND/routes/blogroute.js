const express= require('express');
const { 
    createBlog, 
    deleteBlog, 
    getAllBlogs, 
    getSingleBlog, 
    updateBlog 
    }= require('../controller/blog.controller');
const {authenticatedUser} = require('../middleware/authUser');
const { isAdmin } = require('../middleware/authUser');

const blogrouter= express.Router();
blogrouter.post('/create', authenticatedUser,isAdmin("admin"), createBlog);
blogrouter.delete('/delete/:id', authenticatedUser,isAdmin("admin"), deleteBlog);
blogrouter.get('/all-blogs',authenticatedUser, getAllBlogs);
blogrouter.get('/single-blog/:id', authenticatedUser, getSingleBlog);
blogrouter.put('/update-blog/:id', authenticatedUser, isAdmin("admin"), updateBlog);

module.exports = blogrouter;