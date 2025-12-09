const express = require('express');
const {
  createBlog,
  deleteBlog,
  getAllBlogs,
  getSingleBlog,
  updateBlog,
  createBlogFromAI,
  publishBlog,
  revertBlog,
  autoGenerateBlog,
} = require('../controller/blog.controller');

const { authenticatedUser, isAdmin } = require('../middleware/authUser');
const verifyAutomationKey = require('../middleware/verifyAutomationKey');

const blogrouter = express.Router();

// ---------- ADMIN BLOG CRUD ----------

// Create a new blog (with image) - only admin
blogrouter.post(
  '/create-blog',
  authenticatedUser,
  isAdmin('admin'),
  createBlog
);

// Delete a blog - only admin
blogrouter.delete(
  '/delete-blog/:id',
  authenticatedUser,
  isAdmin('admin'),
  deleteBlog
);

// Update blog text + optional image - only admin
blogrouter.put(
  '/update-blog/:id',
  authenticatedUser,
  isAdmin('admin'),
  updateBlog
);

// ---------- PUBLIC / AUTHED READ ROUTES ----------

// Get all blogs (public)
blogrouter.get('/all-blogs', getAllBlogs);

// Get single blog (you had this protected; keeping it same)
blogrouter.get(
  '/single-blog/:id',
  authenticatedUser,
  getSingleBlog
);

// ---------- AI / AUTOMATION ROUTES ----------

// Auto-generate blog content (admin only)
blogrouter.post(
  '/auto-generate',
  authenticatedUser,
  isAdmin('admin'),
  autoGenerateBlog
);

// Create blog draft from AI / automation (secured by key)
blogrouter.post(
  '/ai/create',
  verifyAutomationKey,
  createBlogFromAI
);

// Admin publishes the AI draft
blogrouter.post(
  '/ai/publish/:id',
  authenticatedUser,
  isAdmin('admin'),
  publishBlog
);

// Admin reverts a published blog to draft
blogrouter.post(
  '/ai/revert/:id',
  authenticatedUser,
  isAdmin('admin'),
  revertBlog
);

module.exports = blogrouter;
