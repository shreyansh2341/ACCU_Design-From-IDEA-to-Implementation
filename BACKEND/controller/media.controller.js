const fs = require('fs/promises');
const { default: mongoose } = require("mongoose");
const Media = require("../model/media.model");
const cloudinary = require('cloudinary').v2;

/**
 * Upload a local temp file (from multer/express-fileupload) to Cloudinary.
 * @param {string} tempFilePath
 * @param {Object} options
 * @returns {Promise<Object>}
 */
const uploadFileToCloudinary = async (tempFilePath, options = {}) => {
  const result = await cloudinary.uploader.upload(tempFilePath, {
    folder: 'media_gallery',
    use_filename: true,
    unique_filename: false,
    overwrite: true,
    ...options,
  });

  // Cleanup local temp file
  try {
    await fs.unlink(tempFilePath);
  } catch (err) {
    console.warn('Failed to remove temp file:', tempFilePath, err.message);
  }

  return result;
};

// ---------------------- CREATE MEDIA POST ---------------------- //

const createMediaPost = async (req, res) => {
  try {
    console.log('--- createMediaPost hit ---');
    console.log('req.body:', req.body);
    console.log('req.files:', req.files);

    // Support: req.files.mediaFile OR req.files.mediaImage OR first file
    const uploadedFile =
      (req.files && (req.files.mediaFile || req.files.mediaImage || Object.values(req.files)[0])) ||
      null;

    if (!uploadedFile) {
      return res.status(400).json({ message: 'Media file (image or video) is required!' });
    }

    const mimetype = uploadedFile.mimetype;
    if (!mimetype) {
      return res.status(400).json({ message: 'Uploaded file missing mimetype' });
    }

    const allowedImageTypes = ['image/jpeg', 'image/png', 'image/jpg', 'image/svg+xml', 'image/webp'];
    const allowedVideoTypes = [
      'video/mp4',
      'video/webm',
      'video/ogg',
      'video/quicktime',
      'video/mov',
      'video/avi',
    ];
    const allowedTypes = [...allowedImageTypes, ...allowedVideoTypes];

    if (!allowedTypes.includes(mimetype)) {
      // optional: clean temp file if present
      if (uploadedFile.tempFilePath) {
        await fs.unlink(uploadedFile.tempFilePath).catch(() => {});
      }
      return res.status(400).json({
        message: `Invalid file type. Allowed types: ${allowedTypes.join(', ')}`,
      });
    }

    const { event, about } = req.body;
    if (!event || !about) {
      if (uploadedFile.tempFilePath) {
        await fs.unlink(uploadedFile.tempFilePath).catch(() => {});
      }
      return res
        .status(400)
        .json({ message: 'Event and about fields are required!' });
    }

    if (!uploadedFile.tempFilePath) {
      console.error('createMediaPost: uploadedFile has no tempFilePath');
      return res.status(500).json({
        message: 'Server file handling misconfigured: no tempFilePath',
      });
    }

    const resourceType = allowedVideoTypes.includes(mimetype) ? 'video' : 'image';

    let cloudinaryResponse;
    try {
      cloudinaryResponse = await uploadFileToCloudinary(uploadedFile.tempFilePath, {
        resource_type: resourceType,
      });
    } catch (err) {
      console.error('Cloudinary upload error (file path):', err);
      return res.status(500).json({
        message: 'Failed to upload media to Cloudinary',
        error: err.message || err,
      });
    }

    if (!cloudinaryResponse || cloudinaryResponse.error || !cloudinaryResponse.public_id) {
      console.error('Bad cloudinary response:', cloudinaryResponse);
      return res.status(500).json({
        message: 'Failed to upload media to Cloudinary',
        details: cloudinaryResponse,
      });
    }

    const mediaFields = {
      event,
      about,
      media: {
        public_id: cloudinaryResponse.public_id,
        url: cloudinaryResponse.secure_url || cloudinaryResponse.url,
        resource_type: resourceType,
      },
      createdBy: req?.user?._id || null,
      createdAt: Date.now(),
    };

    try {
      const newMedia = await Media.create(mediaFields);
      return res
        .status(201)
        .json({ message: 'Media Post created successfully', media: newMedia });
    } catch (dbErr) {
      console.error('Error creating media post in DB:', dbErr);
      // attempt cleanup on Cloudinary to avoid orphaned files
      try {
        await cloudinary.uploader.destroy(cloudinaryResponse.public_id, {
          resource_type: resourceType,
        });
      } catch (delErr) {
        console.warn('Failed to delete orphaned Cloudinary resource:', delErr);
      }
      return res.status(500).json({
        message: 'Error creating media post',
        error: dbErr.message,
      });
    }
  } catch (error) {
    console.error('Internal Server Error during media creation:', error);
    return res.status(500).json({
      message: 'Internal Server Error',
      error: error.message,
    });
  }
};

// ---------------------- DELETE MEDIA POST ---------------------- //

const deleteMediaPost = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: 'Invalid post ID' });
    }

    const media = await Media.findById(id);
    if (!media) {
      return res.status(404).json({ message: 'Media Post not found' });
    }

    const resourceTypeToDelete = media.media?.resource_type || 'image';

    try {
      const cloudinaryResponse = await cloudinary.uploader.destroy(
        media.media.public_id,
        { resource_type: resourceTypeToDelete }
      );

      if (
        cloudinaryResponse.result !== 'ok' &&
        cloudinaryResponse.result !== 'not found'
      ) {
        console.warn(
          `Cloudinary deletion for public_id ${media.media.public_id} resulted in: ${cloudinaryResponse.result}`
        );
      }
    } catch (err) {
      console.warn('Error deleting media from Cloudinary:', err.message || err);
      // continue with DB delete anyway
    }

    await Media.findByIdAndDelete(id);
    res.status(200).json({ message: 'Media Post deleted successfully' });
  } catch (error) {
    console.error('Error deleting media post:', error);
    res.status(500).json({
      message: 'Internal Server Error',
      error: error.message,
    });
  }
};

// ---------------------- GET ALL POSTS ---------------------- //

const getAllPosts = async (req, res) => {
  try {
    const allposts = await Media.find()
      .select('+about +media')
      .sort({ createdAt: -1 });

    if (!allposts || allposts.length === 0) {
      return res.status(404).json({ message: 'No posts found' });
    }
    res
      .status(200)
      .json({ message: 'Posts retrieved successfully', allposts });
  } catch (error) {
    console.error('Error retrieving posts:', error);
    res.status(500).json({
      message: 'Internal Server Error',
      error: error.message,
    });
  }
};

// ---------------------- GET SINGLE POST ---------------------- //

const getSinglePost = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: 'Invalid post ID' });
    }

    const media = await Media.findById(id).select('+about +media');

    if (!media) {
      return res.status(404).json({ message: 'Media post not found' });
    }

    res.status(200).json({ message: 'Post retrieved successfully', media });
  } catch (error) {
    console.error('Error retrieving post:', error);
    res.status(500).json({
      message: 'Internal Server Error',
      error: error.message,
    });
  }
};

// ---------------------- UPDATE POST ---------------------- //

const updatePost = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: 'Invalid post ID' });
    }

    const media = await Media.findById(id);
    if (!media) {
      return res.status(404).json({ message: 'Media post not found' });
    }

    const mediaFields = {
      event: req.body.event ?? media.event,
      about: req.body.about ?? media.about,
      updatedAt: Date.now(),
    };

    if (req.files && (req.files.mediaFile || req.files.mediaImage)) {
      const newMediaFile = req.files.mediaFile || req.files.mediaImage;

      console.log('updatePost: received file =>', {
        name: newMediaFile.name,
        mimetype: newMediaFile.mimetype,
        size: newMediaFile.size,
        tempFilePath: newMediaFile.tempFilePath,
      });

      const allowedImageTypes = ['image/jpeg', 'image/png', 'image/jpg', 'image/svg+xml', 'image/webp'];
      const allowedVideoTypes = [
        'video/mp4',
        'video/webm',
        'video/ogg',
        'video/quicktime',
        'video/mov',
        'video/avi',
      ];
      const allowedTypes = [...allowedImageTypes, ...allowedVideoTypes];

      if (!allowedTypes.includes(newMediaFile.mimetype)) {
        if (newMediaFile.tempFilePath) {
          await fs.unlink(newMediaFile.tempFilePath).catch(() => {});
        }
        return res.status(400).json({
          message:
            'Invalid file type for update. Only JPEG, PNG, JPG, SVG, WEBP, MP4, WebM, Ogg, MOV, AVI, QuickTime are allowed.',
        });
      }

      if (!newMediaFile.tempFilePath) {
        console.error('updatePost: newMediaFile has no tempFilePath');
        return res.status(500).json({
          message: 'Server file handling misconfigured: no tempFilePath',
        });
      }

      const newResourceType = allowedVideoTypes.includes(newMediaFile.mimetype)
        ? 'video'
        : 'image';

      // Delete old media from Cloudinary
      if (media.media && media.media.public_id) {
        const oldResourceType = media.media.resource_type || 'image';
        try {
          const destroyResult = await cloudinary.uploader.destroy(
            media.media.public_id,
            { resource_type: oldResourceType }
          );
          if (
            destroyResult.result !== 'ok' &&
            destroyResult.result !== 'not found'
          ) {
            console.warn(
              `Cloudinary old media deletion failed: ${destroyResult.result}`
            );
          }
        } catch (err) {
          console.warn('Error deleting old media from Cloudinary:', err.message || err);
        }
      }

      // Upload new media
      let result;
      try {
        result = await uploadFileToCloudinary(newMediaFile.tempFilePath, {
          resource_type: newResourceType,
        });
      } catch (err) {
        console.error('Cloudinary upload error during update:', err);
        return res.status(500).json({
          message: 'Failed to upload new media to Cloudinary during update.',
          error: err.message || err,
        });
      }

      if (!result || !result.public_id || (result.error && !result.secure_url)) {
        console.error('Bad Cloudinary response during update:', result);
        return res.status(500).json({
          message: 'Failed to upload new media to Cloudinary during update.',
          details: result,
        });
      }

      mediaFields.media = {
        public_id: result.public_id,
        url: result.secure_url || result.url,
        resource_type: newResourceType,
      };
    } else {
      mediaFields.media = media.media;
    }

    const updatedPost = await Media.findByIdAndUpdate(id, mediaFields, { new: true });

    res.status(200).json({
      message: 'Media Post updated successfully',
      updatedPost,
    });
  } catch (error) {
    console.error('Error updating media post:', error);
    res.status(500).json({
      message: 'Internal Server Error',
      error: error.message,
    });
  }
};

module.exports = {
  createMediaPost,
  deleteMediaPost,
  getAllPosts,
  getSinglePost,
  updatePost,
};
