const fs = require('fs/promises');
const { default: mongoose } = require("mongoose");
const Blog = require("../model/blog.model");
const cloudinary = require('cloudinary').v2;
const sanitizeHtml = require('sanitize-html');

/**
 * Upload a local temp file (from express-fileupload) to Cloudinary.
 * @param {string} tempFilePath
 * @param {Object} options
 * @returns {Promise<Object>}
 */
const uploadFileToCloudinary = async (tempFilePath, options = {}) => {
  const result = await cloudinary.uploader.upload(tempFilePath, {
    folder: 'blog_Images',
    use_filename: true,
    unique_filename: false,
    overwrite: true,
    ...options,
  });

  // Optionally clean up temp file (good hygiene)
  try {
    await fs.unlink(tempFilePath);
  } catch (err) {
    console.warn('Failed to remove temp file:', tempFilePath, err.message);
  }

  return result;
};

// ---------------------- CREATE BLOG ---------------------- //

const createBlog = async (req, res) => {
  try {
    console.log('--- createBlog hit ---');
    console.log('req.body:', req.body);
    console.log('req.files:', req.files);

    if (!req.files || !req.files.blogImage) {
      return res.status(400).json({ message: 'Blog Image is required!' });
    }

    const blogImage = req.files.blogImage;
    const allowedTypes = ['image/jpeg', 'image/png', 'image/jpg', 'image/webp'];

    if (!allowedTypes.includes(blogImage.mimetype)) {
      // clean up invalid file
      if (blogImage.tempFilePath) {
        await fs.unlink(blogImage.tempFilePath).catch(() => {});
      }
      return res.status(400).json({
        message: 'Invalid file type. Only JPEG, PNG, JPG, WEBP are allowed.',
      });
    }

    const { title, category, about } = req.body;
    if (!title || !category || !about) {
      // optional: also clean temp file here
      if (blogImage.tempFilePath) {
        await fs.unlink(blogImage.tempFilePath).catch(() => {});
      }
      return res.status(400).json({
        message: 'Title, category and about fields are required!',
      });
    }

    const adminName = req?.user?.name || null;
    const adminphoto = req?.user?.photo?.url || null;
    const createdBy = req?.user?._id || null;

    if (!blogImage.tempFilePath) {
      console.error('createBlog: blogImage has no tempFilePath');
      return res.status(500).json({
        message: 'Server file handling misconfigured: no tempFilePath',
      });
    }

    let cloudinaryResponse;
    try {
      cloudinaryResponse = await uploadFileToCloudinary(blogImage.tempFilePath);
    } catch (uploadErr) {
      console.error('Cloudinary upload error (file path):', uploadErr);
      return res.status(500).json({
        message: 'Cloudinary upload failed',
        error: uploadErr.message || uploadErr,
      });
    }

    if (!cloudinaryResponse || cloudinaryResponse.error || !cloudinaryResponse.public_id) {
      console.error('Bad cloudinary response:', cloudinaryResponse);
      return res.status(500).json({
        message: 'Cloudinary upload returned invalid response',
        details: cloudinaryResponse,
      });
    }

    const blogFields = {
      title,
      about,
      category,
      adminName,
      adminphoto,
      createdBy,
      updatedAt: Date.now(),
      blogImage: {
        public_id: cloudinaryResponse.public_id,
        url: cloudinaryResponse.secure_url || cloudinaryResponse.url,
      },
    };

    try {
      const blog = await Blog.create(blogFields);
      return res.status(201).json({
        message: 'Blog created successfully',
        blog,
      });
    } catch (dbErr) {
      console.error('DB create error:', dbErr);
      return res.status(500).json({
        message: 'Error creating blog',
        error: dbErr.message,
      });
    }
  } catch (err) {
    console.error('Unhandled error in createBlog:', err);
    return res.status(500).json({
      message: 'Internal Server Error',
      error: err.message,
    });
  }
};

// ---------------------- DELETE BLOG ---------------------- //

const deleteBlog = async (req, res) => {
  try {
    const { id } = req.params;
    const blog = await Blog.findById(id);
    if (!blog) {
      return res.status(404).json({ message: 'Blog not found' });
    }

    if (blog.blogImage && blog.blogImage.public_id) {
      try {
        const cloudinaryResponse = await cloudinary.uploader.destroy(blog.blogImage.public_id);
        console.log('Cloudinary delete result:', cloudinaryResponse);
      } catch (err) {
        console.warn('Error deleting image from Cloudinary:', err.message || err);
        // do not block deletion of blog if image delete fails
      }
    }

    await Blog.findByIdAndDelete(id);
    res.status(200).json({ message: 'Blog deleted successfully' });
  } catch (error) {
    console.error('Error deleting blog:', error);
    res.status(500).json({
      message: 'Internal Server Error',
      error: error.message,
    });
  }
};

// ---------------------- GET ALL BLOGS ---------------------- //

const getAllBlogs = async (req, res) => {
  try {
    const allblogs = await Blog.find().select('+about').sort({ createdAt: -1 });

    if (!allblogs || allblogs.length === 0) {
      return res.status(404).json({ message: 'No blogs found' });
    }
    res.status(200).json({
      message: 'Blogs retrieved successfully',
      allblogs,
    });
  } catch (error) {
    console.error('Error retrieving blogs:', error);
    res.status(500).json({
      message: 'Internal Server Error',
      error: error.message,
    });
  }
};

// ---------------------- GET SINGLE BLOG ---------------------- //

const getSingleBlog = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: 'Invalid blog ID' });
    }

    const blog = await Blog.findById(id).select('+about');

    if (!blog) {
      return res.status(404).json({ message: 'Blog not found' });
    }

    res.status(200).json({
      message: 'Blog retrieved successfully',
      blog,
    });
  } catch (error) {
    console.error('Error retrieving blog:', error);
    res.status(500).json({
      message: 'Internal Server Error',
      error: error.message,
    });
  }
};

// ---------------------- UPDATE BLOG ---------------------- //

const updateBlog = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: 'Invalid blog ID' });
    }

    const blog = await Blog.findById(id);
    if (!blog) {
      return res.status(404).json({ message: 'Blog not found' });
    }

    const blogFields = {
      title: req.body.title ?? blog.title,
      about: req.body.about ?? blog.about,
      category: req.body.category ?? blog.category,
      updatedAt: Date.now(),
    };

    // Optional image update
    if (req.files && req.files.blogImage) {
      const blogImage = req.files.blogImage;

      console.log('updateBlog: received file =>', {
        name: blogImage.name,
        mimetype: blogImage.mimetype,
        size: blogImage.size,
        tempFilePath: blogImage.tempFilePath,
      });

      const allowedTypes = ['image/jpeg', 'image/png', 'image/jpg', 'image/webp'];
      if (!allowedTypes.includes(blogImage.mimetype)) {
        if (blogImage.tempFilePath) {
          await fs.unlink(blogImage.tempFilePath).catch(() => {});
        }
        return res.status(400).json({
          message: 'Invalid file type. Only JPEG, PNG, JPG, WEBP are allowed.',
        });
      }

      if (!blogImage.tempFilePath) {
        console.error('updateBlog: blogImage has no tempFilePath');
        return res.status(500).json({
          message: 'Server file handling misconfigured: no tempFilePath',
        });
      }

      // Delete old image if it exists
      if (blog.blogImage && blog.blogImage.public_id) {
        try {
          const destroyRes = await cloudinary.uploader.destroy(blog.blogImage.public_id);
          console.log('Cloudinary destroy result:', destroyRes);
        } catch (destroyErr) {
          console.warn(
            'Error deleting old image from Cloudinary:',
            destroyErr.message || destroyErr
          );
        }
      }

      // Upload new image
      let uploadResult;
      try {
        uploadResult = await uploadFileToCloudinary(blogImage.tempFilePath);
      } catch (uploadErr) {
        console.error('Cloudinary upload error in updateBlog:', uploadErr);
        return res.status(500).json({
          message: 'Cloudinary upload failed',
          error: uploadErr.message || uploadErr,
        });
      }

      if (!uploadResult || uploadResult.error || !uploadResult.public_id) {
        console.error('Bad cloudinary response in updateBlog:', uploadResult);
        return res.status(500).json({
          message: 'Cloudinary upload returned invalid response',
          details: uploadResult,
        });
      }

      blogFields.blogImage = {
        public_id: uploadResult.public_id,
        url: uploadResult.secure_url || uploadResult.url,
      };
    }

    const updatedBlog = await Blog.findByIdAndUpdate(id, blogFields, { new: true });

    return res.status(200).json({
      message: 'Blog updated successfully',
      updatedBlog,
    });
  } catch (error) {
    console.error('Error updating blog:', error);
    return res.status(500).json({
      message: 'Internal Server Error',
      error: error.message,
    });
  }
};

// ---------------------- createBlogFromAI ---------------------- //

const createBlogFromAI = async (req, res) => {
  try {
    const {
      title, category, aboutHtml, tags = [], seo_meta = {}, blogImage = null, aiMetadata = {},
    } = req.body;

    if (!title || !category || !aboutHtml) {
      return res.status(400).json({ message: 'title, category and aboutHtml are required' });
    }

    const safeHtml = sanitizeHtml(aboutHtml, {
      allowedTags: sanitizeHtml.defaults.allowedTags.concat(['img']),
      allowedAttributes: {
        a: ['href', 'name', 'target'],
        img: ['src', 'alt'],
      },
      allowedSchemes: ['http', 'https', 'data'],
    });

    const blogFields = {
      title,
      slug: (title || '')
        .toLowerCase()
        .replace(/[^\w\s-]/g, '')
        .replace(/\s+/g, '-')
        .slice(0, 200),
      about: safeHtml,
      category,
      tags,
      seo_meta,
      status: 'draft',
      aiGenerated: true,
      aiMetadata: {
        ...aiMetadata,
        generatedAt: aiMetadata.generatedAt ? new Date(aiMetadata.generatedAt) : new Date(),
      },
      auditTrail: [
        {
          action: 'created_by_ai',
          by: req.automation?.by || 'automation',
          at: new Date(),
          note: aiMetadata.prompt || '',
        },
      ],
      updatedAt: Date.now(),
    };

    if (blogImage && (blogImage.public_id || blogImage.publicId)) {
      blogFields.blogImage = {
        public_id: blogImage.public_id || blogImage.publicId,
        url: blogImage.secure_url || blogImage.url || blogImage.secureUrl,
      };
    }

    const created = await Blog.create(blogFields);
    return res.status(201).json({ message: 'AI draft created', blog: created });
  } catch (err) {
    console.error('createBlogFromAI error', err);
    return res.status(500).json({ message: 'Server error', error: err.message });
  }
};

// ---------------------- publishBlog / revertBlog / autoGenerateBlog ---------------------- //

const publishBlog = async (req, res) => {
  try {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: 'Invalid blog ID' });
    }

    const blog = await Blog.findById(id);
    if (!blog) return res.status(404).json({ message: 'Blog not found' });

    if (blog.status === 'published') {
      return res.status(400).json({ message: 'Blog is already published' });
    }

    blog.status = 'published';
    blog.publishedAt = new Date();
    blog.auditTrail = blog.auditTrail || [];
    blog.auditTrail.push({
      action: 'published',
      by: req.user?.name || req.automation?.by || 'unknown',
      at: new Date(),
      note: req.body.note || '',
    });
    await blog.save();

    return res.status(200).json({ message: 'Blog published', blog });
  } catch (err) {
    console.error('publishBlog error', err);
    return res.status(500).json({ message: 'Server error', error: err.message });
  }
};

const revertBlog = async (req, res) => {
  try {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: 'Invalid blog ID' });
    }
    const blog = await Blog.findById(id);
    if (!blog) return res.status(404).json({ message: 'Blog not found' });

    blog.status = 'draft';
    blog.auditTrail = blog.auditTrail || [];
    blog.auditTrail.push({
      action: 'reverted_to_draft',
      by: req.user?.name || req.automation?.by || 'unknown',
      at: new Date(),
      note: req.body.note || '',
    });
    await blog.save();

    return res.status(200).json({ message: 'Blog reverted to draft', blog });
  } catch (err) {
    console.error('revertBlog error', err);
    return res.status(500).json({ message: 'Server error', error: err.message });
  }
};

const autoGenerateBlog = async (req, res) =>{
  try {
    const { topic, tone, keywords, length, category } = req.body;

    if (!topic) return res.status(400).json({ message: 'topic field is required in request body' });

    const { generateBlogContent } = require('../services/automation');
    const content = await generateBlogContent({
      topic,
      tone,
      keywords: keywords || [],
      length: length || 'medium',
    });

    const adminName = req?.user?.name || 'Admin';
    const adminphoto = req?.user?.photo?.url || '';
    const createdBy = req?.user?._id || null;

    let blogImage = null;
    if (content.imageUrl) {
      try {
        const uploadResult = await cloudinary.uploader.upload(content.imageUrl, {
          folder: 'blog_Images',
          use_filename: true,
          unique_filename: false,
          overwrite: true,
        });
        blogImage = { public_id: uploadResult.public_id, url: uploadResult.secure_url };
      } catch (err) {
        console.warn(
          'Cloudinary upload of automation image failed — continuing without image:',
          err.message || err
        );
      }
    }

    if (!blogImage) {
      blogImage = {
        public_id: 'default_placeholder',
        url:
          process.env.DEFAULT_BLOG_IMAGE ||
          'https://via.placeholder.com/1200x800?text=AccuDesign',
      };
    }

    const blogFields = {
      title: content.title,
      about: content.about,
      category: category || 'Automation',
      adminName,
      adminphoto,
      createdBy,
      updatedAt: Date.now(),
      blogImage,
    };

    const newBlog = await Blog.create(blogFields);

    return res.status(201).json({
      message: 'Blog auto-generated successfully',
      blog: newBlog,
    });
  } catch (error) {
    console.error('autoGenerateBlog error:', error);
    return res.status(500).json({
      message: 'Auto generation failed',
      error: error.message,
    });
  }
};

module.exports = {
  createBlog,
  deleteBlog,
  getAllBlogs,
  getSingleBlog,
  updateBlog,
  createBlogFromAI,
  publishBlog,
  revertBlog,
  autoGenerateBlog,
};
