const { default: mongoose } = require("mongoose");
const Blog = require("../model/blog.model");
const cloudinary = require('cloudinary').v2;
const createBlog = async (req, res) => {
    try {
        if (!req.files || Object.keys(req.files).length === 0) {
            return res.status(400).json({ message: 'Blog Image is required!' });
        }
        const { blogImage } = req.files;
        const allowedTypes = ['image/jpeg', 'image/png', 'image/jpg'];
        if (!allowedTypes.includes(blogImage.mimetype)) {
            return res.status(400).json({ message: 'Invalid file type. Only JPEG and PNG are allowed.' });
        }


        const { title, category, about } = req.body;

        if (!title || !category || !about) {
            return res.status(400).json({ message: 'Title, category and about fields are required!' });
        }

        const adminName = req?.user?.name;
        const adminphoto = req?.user?.photo.url;
        const createdBy = req?.user?._id;

        const cloudinaryResponse = await cloudinary.uploader.upload(blogImage.tempFilePath, {
            folder: 'blog_Images',
            use_filename: true,
            unique_filename: false,
            overwrite: true,
        });
        if (!cloudinaryResponse || !cloudinaryResponse.public_id || !cloudinaryResponse.secure_url || cloudinaryResponse.error) {
            console.error('Cloudinary upload error:', cloudinaryResponse.error);
        };

        blogFields = {
            title,
            about,
            category,
            adminName,
            adminphoto,
            createdBy,
            updatedAt: Date.now(),
            blogImage: {
                public_id: cloudinaryResponse.public_id,
                url: cloudinaryResponse.url,
            }
        };

        try {
            const Blogs = await Blog.create(blogFields);
            res.status(200).json({ message: 'Blog created successfully', blog: Blogs });
        } catch (error) {
            res.status(500).json({ message: 'Error creating blog', error: error.message });
        };
    } catch (error) {
        res.status(500).json({ message: 'Internal Server Error', error: error.message });
    }
}

const deleteBlog = async (req, res) => {
    try {
        const { id } = req.params;
        const blog = await Blog.findById(id);
        if (!blog) {
            return res.status(404).json({ message: 'Blog not found' });
        }
        // Delete the image from Cloudinary
        const cloudinaryResponse = await cloudinary.uploader.destroy(blog.blogImage.public_id);
        if (cloudinaryResponse.result !== 'ok') {
            return res.status(500).json({ message: 'Error deleting image from Cloudinary' });
        }
        // Delete the blog from the database
        await Blog.findByIdAndDelete(id);
        res.status(200).json({ message: 'Blog deleted successfully' });
    }
    catch (error) {
        console.error('Error deleting blog:', error);
        res.status(500).json({ message: 'Internal Server Error', error: error.message });
    }
}

const getAllBlogs = async (req, res) => {
    try {
        const allblogs = await Blog.find().select('+about').sort({ createdAt: -1 });

        if (!allblogs || allblogs.length === 0) {
            return res.status(404).json({ message: 'No blogs found' });
        }
        res.status(200).json({ message: 'Blogs retrieved successfully', allblogs });
    } catch (error) {
        console.error('Error retrieving blogs:', error);
        res.status(500).json({ message: 'Internal Server Error', error: error.message });
    }
}

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

    res.status(200).json({ message: 'Blog retrieved successfully', blog });
  } catch (error) {
    console.error('Error retrieving blog:', error);
    res.status(500).json({ message: 'Internal Server Error', error: error.message });
  }
};


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

    let blogFields = {
      ...req.body,
      updatedAt: Date.now(),
    };

    if (req.files && req.files.blogImage) {
      // Delete old image
      await cloudinary.uploader.destroy(blog.blogImage.public_id);

      // Upload new image
      const result = await cloudinary.uploader.upload(req.files.blogImage.tempFilePath, {
        folder: 'blog_Images',
        use_filename: true,
        unique_filename: false,
        overwrite: true,
      });

      blogFields.blogImage = {
        public_id: result.public_id,
        url: result.secure_url,
      };
    }

    const updatedBlog = await Blog.findByIdAndUpdate(id, blogFields, { new: true });

    res.status(200).json({ message: 'Blog updated successfully', updatedBlog });
  } catch (error) {
    console.error('Error updating blog:', error);
    res.status(500).json({ message: 'Internal Server Error', error: error.message });
  }
};


module.exports = { createBlog, deleteBlog, getAllBlogs, getSingleBlog, updateBlog };