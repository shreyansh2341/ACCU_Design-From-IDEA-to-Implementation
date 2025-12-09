const express = require('express');
const fileUpload = require('express-fileupload');
const { uploadToDrive } = require('../controller/driveUploadController');

const uploadrouter = express.Router();

uploadrouter.post('/upload', uploadToDrive);

module.exports = uploadrouter;