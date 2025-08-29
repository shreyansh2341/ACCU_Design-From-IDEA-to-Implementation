// const { default: mongoose } = require("mongoose");
// const Media = require("../model/media.model");
// const cloudinary = require('cloudinary').v2;

// const createMediaPost = async (req, res) => {
//     try {
//         if (!req.files || Object.keys(req.files).length === 0) {
//             return res.status(400).json({ message: 'Post Image is required!' });
//         }
//         const { mediaImage } = req.files;
//         const allowedTypes = ['image/jpeg', 'image/png', 'image/jpg', 'image/svg'];
//         if (!allowedTypes.includes(mediaImage.mimetype)) {
//             return res.status(400).json({ message: 'Invalid file type. Only JPEG, SVG and PNG are allowed.' });
//         }

//         const { event, about } = req.body;

//         if (!event || !about) {
//             return res.status(400).json({ message: 'Event, and about fields are required!' });
//         }

//         const cloudinaryResponse = await cloudinary.uploader.upload(mediaImage.tempFilePath, {
//             folder: 'media_Images',
//             use_filename: true,
//             unique_filename: false,
//             overwrite: true,
//         });
//         if (!cloudinaryResponse || !cloudinaryResponse.public_id || !cloudinaryResponse.secure_url || cloudinaryResponse.error) {
//             console.error('Cloudinary upload error:', cloudinaryResponse.error);
//         };

//         mediaFields = {
//             event,
//             about,
//             mediaImage: {
//                 public_id: cloudinaryResponse.public_id,
//                 url: cloudinaryResponse.url,
//             }
//         };

//         try {
//             const Medias = await Media.create(mediaFields);
//             res.status(200).json({ message: 'Media Post created successfully', media: Medias });
//         } catch (error) {
//             res.status(500).json({ message: 'Error creating media post', error: error.message });
//         };
//     } catch (error) {
//         res.status(500).json({ message: 'Internal Server Error', error: error.message });
//     }
// }

// const deleteMediaPost = async (req, res) => {
//     try {
//         const { id } = req.params;
//         const media = await Media.findById(id);
//         if (!media) {
//             return res.status(404).json({ message: 'Media Post not found' });
//         }
//         // Delete the image from Cloudinary
//         const cloudinaryResponse = await cloudinary.uploader.destroy(media.mediaImage.public_id);
//         if (cloudinaryResponse.result !== 'ok') {
//             return res.status(500).json({ message: 'Error deleting image from Cloudinary' });
//         }
//         // Delete the blog from the database
//         await Media.findByIdAndDelete(id);
//         res.status(200).json({ message: 'Media Post deleted successfully' });
//     }
//     catch (error) {
//         console.error('Error deleting media post:', error);
//         res.status(500).json({ message: 'Internal Server Error', error: error.message });
//     }
// }

// const getAllPosts = async (req, res) => {
//     try {
//         const allposts = await Media.find().select('+about').sort({ createdAt: -1 });

//         if (!allposts|| allposts.length === 0) {
//             return res.status(404).json({ message: 'No posts found' });
//         }
//         res.status(200).json({ message: 'Posts retrieved successfully', allposts });
//     } catch (error) {
//         console.error('Error retrieving posts:', error);
//         res.status(500).json({ message: 'Internal Server Error', error: error.message });
//     }
// }

// const getSinglePost = async (req, res) => {
//   try {
//     const { id } = req.params;

//     if (!mongoose.Types.ObjectId.isValid(id)) {
//       return res.status(400).json({ message: 'Invalid post ID' });
//     }

//     const media = await Media.findById(id).select('+about');

//     if (!media) {
//       return res.status(404).json({ message: 'Media postss not found' });
//     }

//     res.status(200).json({ message: 'Post retrieved successfully', media });
//   } catch (error) {
//     console.error('Error retrieving post:', error);
//     res.status(500).json({ message: 'Internal Server Error', error: error.message });
//   }
// };


// const updatePost = async (req, res) => {
//   try {
//     const { id } = req.params;

//     if (!mongoose.Types.ObjectId.isValid(id)) {
//       return res.status(400).json({ message: 'Invalid post ID' });
//     }

//     const media = await Media.findById(id);
//     if (!media) {
//       return res.status(404).json({ message: 'Media posts not found' });
//     }

//     let mediaFields = {
//       ...req.body,
//       updatedAt: Date.now(),
//     };

//     if (req.files && req.files.mediaImage) {
//       // Delete old image
//       await cloudinary.uploader.destroy(media.mediaImage.public_id);

//       // Upload new image
//       const result = await cloudinary.uploader.upload(req.files.mediaImage.tempFilePath, {
//         folder: 'media_Images',
//         use_filename: true,
//         unique_filename: false,
//         overwrite: true,
//       });

//       mediaFields.mediaImage = {
//         public_id: result.public_id,
//         url: result.secure_url,
//       };
//     }

//     const updatedPost = await Media.findByIdAndUpdate(id, mediaFields, { new: true });

//     res.status(200).json({ message: 'Post updated successfully', updatedPost });
//   } catch (error) {
//     console.error('Error updating post:', error);
//     res.status(500).json({ message: 'Internal Server Error', error: error.message });
//   }
// };


// module.exports = { createMediaPost, deleteMediaPost, getAllPosts, getSinglePost, updatePost };

// controller/media.controller.js
const { default: mongoose } = require("mongoose");
const Media = require("../model/media.model"); // Assuming your model is named Media
const cloudinary = require('cloudinary').v2;

const createMediaPost = async (req, res) => {
    try {
        if (!req.files || Object.keys(req.files).length === 0) {
            return res.status(400).json({ message: 'Media file (image or video) is required!' });
        }

        const { mediaFile } = req.files; // Renamed from mediaImage to mediaFile for generality
        
        // Define allowed MIME types for both images and videos
        const allowedImageTypes = ['image/jpeg', 'image/png', 'image/jpg', 'image/svg+xml'];
        const allowedVideoTypes = ['video/mp4', 'video/webm', 'video/ogg', 'video/mov', 'video/avi']; // Added more video types
        const allowedTypes = [...allowedImageTypes, ...allowedVideoTypes];

        if (!allowedTypes.includes(mediaFile.mimetype)) {
            return res.status(400).json({ message: 'Invalid file type. Only JPEG, PNG, JPG, SVG, MP4, WebM, Ogg, MOV, and AVI are allowed.' });
        }

        const { event, about } = req.body;

        if (!event || !about) {
            return res.status(400).json({ message: 'Event and about fields are required!' });
        }

        // Determine resource_type for Cloudinary based on mimetype
        let resourceType = 'image';
        if (allowedVideoTypes.includes(mediaFile.mimetype)) {
            resourceType = 'video';
        }

        const cloudinaryResponse = await cloudinary.uploader.upload(mediaFile.tempFilePath, {
            folder: 'media_gallery', // Consistent folder for new uploads
            use_filename: true,
            unique_filename: false,
            overwrite: true, // Allow overwriting if the same file is uploaded again
            resource_type: resourceType, // Set resource_type dynamically
        });

        if (!cloudinaryResponse || !cloudinaryResponse.public_id || !cloudinaryResponse.secure_url || cloudinaryResponse.error) {
            console.error('Cloudinary upload error:', cloudinaryResponse.error);
            // Consider more specific error message based on cloudinaryResponse.error.message
            return res.status(500).json({ message: 'Failed to upload media to Cloudinary.' });
        }

        const mediaFields = {
            event,
            about,
            media: { // Renamed from mediaImage to media for generality
                public_id: cloudinaryResponse.public_id,
                url: cloudinaryResponse.secure_url,
                resource_type: resourceType, // Store resource_type in your DB
            }
        };

        try {
            const newMedia = await Media.create(mediaFields);
            res.status(200).json({ message: 'Media Post created successfully', media: newMedia });
        } catch (error) {
            // If DB save fails, consider deleting from Cloudinary to prevent orphaned files
            console.error('Error creating media post in DB:', error);
            await cloudinary.uploader.destroy(cloudinaryResponse.public_id, { resource_type: resourceType }); // Clean up
            res.status(500).json({ message: 'Error creating media post', error: error.message });
        }
    } catch (error) {
        console.error('Internal Server Error during media creation:', error);
        res.status(500).json({ message: 'Internal Server Error', error: error.message });
    }
}

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

        // Determine resource_type for deletion from Cloudinary
        // It's crucial to get this from the DB, or default if not found
        const resourceTypeToDelete = media.media.resource_type || 'image'; 

        // Delete the media from Cloudinary
        const cloudinaryResponse = await cloudinary.uploader.destroy(media.media.public_id, {
            resource_type: resourceTypeToDelete
        });

        // Cloudinary destroy returns 'not found' if the asset doesn't exist, which is fine.
        // Only treat as an error if it's 'error' or something unexpected.
        if (cloudinaryResponse.result !== 'ok' && cloudinaryResponse.result !== 'not found') {
            console.warn(`Cloudinary deletion for public_id ${media.media.public_id} resulted in: ${cloudinaryResponse.result}`);
            // You might want to return an error here or just log it depending on your error handling policy
        }

        // Delete the media post from the database
        await Media.findByIdAndDelete(id);
        res.status(200).json({ message: 'Media Post deleted successfully' });
    } catch (error) {
        console.error('Error deleting media post:', error);
        res.status(500).json({ message: 'Internal Server Error', error: error.message });
    }
}

const getAllPosts = async (req, res) => {
    try {
        // Ensure you select the 'media' field which now includes public_id, url, and resource_type
        const allposts = await Media.find().select('+about +media').sort({ createdAt: -1 });

        if (!allposts || allposts.length === 0) {
            return res.status(404).json({ message: 'No posts found' });
        }
        res.status(200).json({ message: 'Posts retrieved successfully', allposts });
    } catch (error) {
        console.error('Error retrieving posts:', error);
        res.status(500).json({ message: 'Internal Server Error', error: error.message });
    }
}

const getSinglePost = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: 'Invalid post ID' });
    }

    // Ensure you select the 'media' field
    const media = await Media.findById(id).select('+about +media');

    if (!media) {
      return res.status(404).json({ message: 'Media posts not found' });
    }

    res.status(200).json({ message: 'Post retrieved successfully', media });
  } catch (error) {
    console.error('Error retrieving post:', error);
    res.status(500).json({ message: 'Internal Server Error', error: error.message });
  }
};

const updatePost = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: 'Invalid post ID' });
    }

    const media = await Media.findById(id);
    if (!media) {
      return res.status(404).json({ message: 'Media posts not found' });
    }

    let mediaFields = {
      ...req.body,
      updatedAt: Date.now(),
    };

    if (req.files && req.files.mediaFile) { // Renamed from mediaImage to mediaFile
        const newMediaFile = req.files.mediaFile;
        const allowedImageTypes = ['image/jpeg', 'image/png', 'image/jpg', 'image/svg+xml'];
        const allowedVideoTypes = ['video/mp4', 'video/webm', 'video/ogg', 'video/mov', 'video/avi'];
        const allowedTypes = [...allowedImageTypes, ...allowedVideoTypes];

        if (!allowedTypes.includes(newMediaFile.mimetype)) {
            return res.status(400).json({ message: 'Invalid file type for update. Only JPEG, PNG, JPG, SVG, MP4, WebM, Ogg, MOV, and AVI are allowed.' });
        }

        let newResourceType = 'image';
        if (allowedVideoTypes.includes(newMediaFile.mimetype)) {
            newResourceType = 'video';
        }

        // Delete old media from Cloudinary (if it exists and has a public_id)
        if (media.media && media.media.public_id) {
            const oldResourceType = media.media.resource_type || 'image'; // Default to 'image' if not stored
            const destroyResult = await cloudinary.uploader.destroy(media.media.public_id, { resource_type: oldResourceType });
            if (destroyResult.result !== 'ok' && destroyResult.result !== 'not found') {
                console.warn(`Cloudinary old media deletion failed: ${destroyResult.result}`);
                // You might choose to stop here or just log the warning
            }
        }

        // Upload new media
        const result = await cloudinary.uploader.upload(newMediaFile.tempFilePath, {
            folder: 'media_gallery', // Consistency with create
            use_filename: true,
            unique_filename: false,
            overwrite: true,
            resource_type: newResourceType,
        });

        if (!result || !result.public_id || !result.secure_url || result.error) {
            console.error('Cloudinary upload error during update:', result.error);
            return res.status(500).json({ message: 'Failed to upload new media to Cloudinary during update.' });
        }

        mediaFields.media = {
            public_id: result.public_id,
            url: result.secure_url,
            resource_type: newResourceType, // Store new resource_type
        };
    } else {
        // If no new file is uploaded, retain existing media data.
        // This is important if you're only updating text fields and not the file itself.
        mediaFields.media = media.media; 
    }

    const updatedPost = await Media.findByIdAndUpdate(id, mediaFields, { new: true });

    res.status(200).json({ message: 'Media Post updated successfully', updatedPost });
  } catch (error) {
    console.error('Error updating media post:', error);
    res.status(500).json({ message: 'Internal Server Error', error: error.message });
  }
};


module.exports = { createMediaPost, deleteMediaPost, getAllPosts, getSinglePost, updatePost };