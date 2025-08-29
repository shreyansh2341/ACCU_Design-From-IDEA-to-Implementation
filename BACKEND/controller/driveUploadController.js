const { google } = require('googleapis');
const { PassThrough } = require('stream');

const oAuth2Client = new google.auth.OAuth2(
  process.env.GDRIVE_CLIENT_ID,
  process.env.GDRIVE_CLIENT_SECRET,
  process.env.GDRIVE_REDIRECT_URI
);

oAuth2Client.setCredentials({
  refresh_token: process.env.GDRIVE_REFRESH_TOKEN
});

const drive = google.drive({ version: 'v3', auth: oAuth2Client });

const uploadToDrive = async (req, res) => {
  try {
    console.log('Upload request received:');
    console.log('Files:', req.files ? Object.keys(req.files) : 'No files');
    console.log('Content-Type:', req.headers['content-type']);

    if (!req.files || !req.files.file) {
      console.log('No files found in request');
      return res.status(400).json({
        success: false,
        message: 'No file uploaded'
      });
    }

    const file = req.files.file;
    console.log('File details:', {
      name: file.name,
      size: file.size,
      mimetype: file.mimetype
    });

    if (file.size > 50 * 1024 * 1024) {
      return res.status(400).json({
        success: false,
        message: 'File size too large. Maximum size is 50MB.'
      });
    }

    console.log('Uploading to Google Drive...');

    const bufferStream = new PassThrough();
    bufferStream.end(file.data);

    const response = await drive.files.create({
      requestBody: {
        name: file.name,
        mimeType: file.mimetype,
      },
      media: {
        mimeType: file.mimetype,
        body: bufferStream,
      },
      fields: 'id, webViewLink, webContentLink',
    });

    console.log('Upload successful, file ID:', response.data.id);

    await drive.permissions.create({
      fileId: response.data.id,
      requestBody: {
        role: 'reader',
        type: 'anyone',
      },
    });

    res.status(200).json({
      success: true,
      message: 'File uploaded successfully',
      fileId: response.data.id,
      link: response.data.webViewLink,
      downloadLink: response.data.webContentLink
    });

  } catch (err) {
    if (err.response) {
      console.error('Google API Error Response:', err.response.data);
    } else if (err.errors) {
      console.error('Drive upload error details:', err.errors);
    } else {
      console.error('Drive upload error:', err.message || err);
    }

    res.status(500).json({
      success: false,
      message: 'Upload failed',
      error: err.message,
      details: err.code || 'Unknown error'
    });
  }
};

module.exports = { uploadToDrive };
