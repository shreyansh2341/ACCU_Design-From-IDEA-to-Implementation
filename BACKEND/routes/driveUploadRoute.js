const express = require('express');
const uploadrouter = express.Router();
const { uploadToDrive } = require('../controller/driveUploadController');

uploadrouter.post('/upload', uploadToDrive);

module.exports = uploadrouter;