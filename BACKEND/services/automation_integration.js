// FILE: services/automation.js
// Service to call the (renamed) "Automation" API (previously "Magic Loops").
// Expects environment variables:
// AUTOMATION_API_KEY, AUTOMATION_ENDPOINT

const axios = require('axios');

const AUTOMATION_ENDPOINT = process.env.AUTOMATION_ENDPOINT || 'https://api.magicloops.example/generate';
const AUTOMATION_API_KEY = process.env.AUTOMATION_API_KEY || process.env.AUTOMATION_KEY || '';

/**
 * generateBlogContent
 * @param {Object} options - { topic, tone, keywords, length }
 * Returns: { title, about, imageUrl } (imageUrl optional)
 */
async function generateBlogContent(options = {}) {
  const { topic = '', tone = 'professional', keywords = [], length = 'medium' } = options;

  try {
    const payload = {
      prompt: `Write a long-form blog post for the website AccuDesign about: ${topic}.\n
- Tone: ${tone}\n- Keywords: ${keywords.join(', ')}\n- Length: ${length}\n
Please return a JSON object with keys: title, about, image_url (optional).`,
      // other provider specific options can go here
    };

    const headers = {
      'Content-Type': 'application/json',
    };
    if (AUTOMATION_API_KEY) headers['Authorization'] = `Bearer ${AUTOMATION_API_KEY}`;

    const resp = await axios.post(AUTOMATION_ENDPOINT, payload, { headers, timeout: 20000 });

    // NOTE: different automation APIs return different shapes. We try to handle common ones.
    let data = resp.data;

    // If the API returned a text blob, try to parse JSON inside it.
    if (typeof data === 'string') {
      try {
        data = JSON.parse(data);
      } catch (e) {
        // fallback: wrap text as about
        data = { title: topic, about: data };
      }
    }

    const title = data.title || data.headline || `About ${topic}`;
    const about = data.about || data.content || data.body || data.text || '';
    const imageUrl = data.image_url || data.image || null;

    return { title, about, imageUrl };
  } catch (error) {
    console.error('Automation API error:', error.message || error);
    throw new Error('Automation service failed: ' + (error.response?.data?.message || error.message || 'unknown'));
  }
}

module.exports = { generateBlogContent }; 


// -------------------------------------------------------------
// CONTROLLER: Add this function to your existing controller (e.g. controller/blog.controller.js)
// We'll export autoGenerateBlog alongside createBlog, updateBlog, etc.

/*
const { generateBlogContent } = require('../services/automation');
const cloudinary = require('cloudinary').v2;
const Blog = require('../model/blog.model');
*/


// -------------------------------------------------------------
// ROUTE: Add the following route to your routes/blogroute.js

/*
const { autoGenerateBlog } = require('../controller/blog.controller');
blogrouter.post('/auto-generate', authenticatedUser, isAdmin('admin'), autoGenerateBlog);
*/


// -------------------------------------------------------------
// README / INSTRUCTIONS
// 1) Install dependency: axios
//    npm i axios
//
// 2) Create environment variables in your Render dashboard (or .env for local):
//    AUTOMATION_ENDPOINT=https://api.magicloops.example/generate
//    AUTOMATION_API_KEY=your_api_key_here
//    DEFAULT_BLOG_IMAGE=https://link-to-default-image
//
// 3) Place services/automation.js in your project and require it from controller as shown.
//
// 4) Add the autoGenerateBlog to your controller exports. Example at top of controller file:
//    const { autoGenerateBlog } = require('./path/to/this/autoGenerateBlog');
//    module.exports = { createBlog, deleteBlog, getAllBlogs, getSingleBlog, updateBlog, autoGenerateBlog };
//
// 5) Add route to blogroute.js (POST /api/blog/auto-generate) and protect it with authenticatedUser + isAdmin.
//
// 6) Frontend example (simple fetch):
//    fetch('/api/blog/auto-generate', {
//      method: 'POST',
//      headers: { 'Content-Type': 'application/json' },
//      credentials: 'include',
//      body: JSON.stringify({ topic: 'Sustainable product design', tone: 'friendly', keywords: ['ux','eco'], length: 'long', category: 'Design' })
//    })
//    .then(r=>r.json()).then(console.log).catch(console.error);
//
// 7) Testing: First test locally with a mock automation endpoint if you don't have credentials. The generateBlogContent function will try to parse JSON returned by the service.
//
// 8) Notes on reliability:
//    - Automation APIs vary: you may need to adapt payload shape and response parsing depending on the provider's contract.
//    - Rate-limit handling, retries and caching are recommended for production. Add a job queue (Bull/Agenda) for heavy requests.

// -------------------------------------------------------------
// End of file
