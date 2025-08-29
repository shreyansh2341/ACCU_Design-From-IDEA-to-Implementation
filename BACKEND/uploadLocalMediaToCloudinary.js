require('dotenv').config(); 
const cloudinary = require('cloudinary').v2;
const fs = require('fs');
const path = require('path');

cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.CLOUD_API_KEY,
    api_secret: process.env.CLOUD_API_SECRET
});

const localFoldersToUpload = [
    '../frontend/images',      
    '../frontend/accuimages',  
    '../frontend/Accuvideos',  
];


const cloudinaryTargetFolder = 'website_static_media'; 

const allowedExtensions = ['.jpg', '.jpeg', '.png', '.gif', '.svg', '.mp4', '.webm', '.ogg', '.mov', '.avi'];

const uploadFile = async (filePath) => {
    const ext = path.extname(filePath).toLowerCase();
    if (!allowedExtensions.includes(ext)) {
        console.warn(`Skipping unsupported file type: ${filePath}`);
        return null;
    }


    let resource_type = 'image';
    if (['.mp4', '.webm', '.ogg', '.mov', '.avi'].includes(ext)) {
        resource_type = 'video';
    }

    try {
        const result = await cloudinary.uploader.upload(filePath, {
            folder: cloudinaryTargetFolder,
            resource_type: resource_type,
            use_filename: true, 
            unique_filename: false, 
            overwrite: false, 
        });
        console.log(`Uploaded ${filePath} to Cloudinary.`);
        console.log(`Cloudinary URL: ${result.secure_url}`);
        return {
            localPath: filePath,
            cloudinaryUrl: result.secure_url,
            publicId: result.public_id,
            resourceType: resource_type
        };
    } catch (error) {
        if (error.http_code === 409) { 
            console.warn(`File already exists on Cloudinary and overwrite is false, skipping: ${filePath}`);
            return null;
        }
        console.error(`Error uploading ${filePath}:`, error.message);
        return null;
    }
};

const processFolder = async (folderPath) => {
    const absoluteFolderPath = path.resolve(__dirname, folderPath);
    console.log(`\nProcessing folder: ${absoluteFolderPath}`);

    if (!fs.existsSync(absoluteFolderPath)) {
        console.error(`Folder does not exist: ${absoluteFolderPath}`);
        return [];
    }

    const files = fs.readdirSync(absoluteFolderPath);
    let uploadedResults = [];

    for (const file of files) {
        const filePath = path.join(absoluteFolderPath, file);
        const stats = fs.statSync(filePath);

        if (stats.isFile()) {
            const result = await uploadFile(filePath);
            if (result) {
                uploadedResults.push(result);
            }
        } else if (stats.isDirectory()) {
            console.warn(`Skipping subdirectory: ${filePath}. Script only processes files directly within specified folders.`);
        }
    }
    return uploadedResults;
};

const runUpload = async () => {
    console.log('Starting local media upload to Cloudinary...');
    let allUploaded = [];

    for (const folder of localFoldersToUpload) {
        const results = await processFolder(folder);
        allUploaded = allUploaded.concat(results);
    }

    console.log('\n--- UPLOAD SUMMARY ---');
    if (allUploaded.length > 0) {
        console.log('Successfully processed and uploaded/skipped files:');
        allUploaded.forEach(item => {
            const displayPath = item.localPath.substring(item.localPath.indexOf('frontend'));
            console.log(`Local: ${displayPath} -> Cloudinary: ${item.cloudinaryUrl}`);
        });
    } else {
        console.log('No new files were uploaded or processed. Check your paths and file types.');
    }
    console.log('Upload process complete. Please keep this log for updating frontend URLs.');
};

runUpload();