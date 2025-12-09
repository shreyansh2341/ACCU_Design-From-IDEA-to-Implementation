const { google } = require('googleapis');
const { PassThrough } = require('stream');
const key = require('../config/accu-design-466517-7bc1340042f1.json');

// --- Google Auth using Service Account ---
const auth = new google.auth.GoogleAuth({
  credentials: key,
  scopes: ['https://www.googleapis.com/auth/drive']
});
const drive = google.drive({ version: 'v3', auth });

// If you want to create a folder once and reuse it:
let PARENT_FOLDER_ID = '1pv7vXqEI_rQvUG5pIPl_KT2CGhPkY88R'; // paste an existing folder ID if you have one

async function createFolderIfNeeded() {
  if (PARENT_FOLDER_ID) return;

  const res = await drive.files.create({
    requestBody: {
      name: 'Get Quote Uploads',
      mimeType: 'application/vnd.google-apps.folder'
    },
    fields: 'id',
  });
  PARENT_FOLDER_ID = res.data.id;
  console.log('Created Drive folder with ID:', PARENT_FOLDER_ID);

  // Share folder with your personal Gmail so you can view it in Drive
  await drive.permissions.create({
    fileId: PARENT_FOLDER_ID,
    requestBody: { role: 'writer', type: 'user', emailAddress: 'your@gmail.com' },
  });
  console.log('Shared folder with your@gmail.com');
}
createFolderIfNeeded().catch(console.error);

exports.uploadFilesToDrive = async (files) => {
  const uploadedLinks = [];

  for (const file of files) {
    if (file.size > 50 * 1024 * 1024) {
      throw new Error(`${file.name} exceeds 50MB limit`);
    }

    const bufferStream = new PassThrough();
    bufferStream.end(file.data);

    const response = await drive.files.create({
      requestBody: {
        name: file.name,
        parents: [PARENT_FOLDER_ID],
        mimeType: file.mimetype
      },
      media: { mimeType: file.mimetype, body: bufferStream },
      fields: 'id, webViewLink, webContentLink'
    });

    await drive.permissions.create({
      fileId: response.data.id,
      requestBody: { role: 'reader', type: 'anyone' }
    });

    uploadedLinks.push({
      name: file.name,
      viewLink: response.data.webViewLink,
      downloadLink: response.data.webContentLink
    });
  }

  return uploadedLinks;
};
