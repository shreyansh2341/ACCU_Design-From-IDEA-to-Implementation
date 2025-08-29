import React, { useState, useRef } from 'react';
import { FaCloudUploadAlt, FaFileAlt, FaTrash } from 'react-icons/fa';
import toast from 'react-hot-toast';

const REACT_APP_BACKEND_URL = import.meta.env.VITE_WEBSITE_URL || 'http://localhost:4000';

const FileUploader = ({ onFileUpload }) => {
  const [files, setFiles] = useState([]);
  const fileInputRef = useRef(null);

  const uploadToServer = async (file) => {
    const formData = new FormData();
    formData.append('file', file);

    try {
      console.log('Uploading file:', file.name, 'Size:', file.size, 'Type:', file.type);
      
      const res = await fetch(`${REACT_APP_BACKEND_URL}/api/drive/upload`, {
        method: 'POST',
        body: formData,
        credentials: 'include',
      });

      console.log('Upload response status:', res.status, res.statusText);

      if (!res.ok) {
        // Try to get error message from response
        let errorMessage = `HTTP ${res.status}: ${res.statusText}`;
        try {
          const errorData = await res.json();
          errorMessage = errorData.message || errorData.error || errorMessage;
        } catch {
          // If JSON parsing fails, use default error message
        }
        console.error('Upload failed:', errorMessage);
        toast.error(`Upload failed: ${errorMessage}`);
        return null;
      }

      const data = await res.json();
      console.log('Upload response data:', data);
      
      if (data.success && data.link) {
        toast.success(`${file.name} uploaded successfully!`);
        return { name: file.name, link: data.link };
      } else {
        const errorMsg = data.message || 'Unknown error occurred';
        console.error('Upload response error:', errorMsg);
        toast.error(`Upload failed: ${errorMsg}`);
        return null;
      }
    } catch (err) {
      console.error('Upload error:', err);
      toast.error(`Network error: ${err.message}`);
      return null;
    }
  };

  const handleValidFiles = async (newFiles) => {
    console.log('Processing files:', newFiles.length);
    
    // Validate file size and type
    const allowedTypes = [
      'application/pdf',
      'image/jpeg', 
      'image/png',
      'application/msword',
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
    ];
    
    const maxSize = 50 * 1024 * 1024; // 50MB to match backend
    
    const validFiles = [];
    const invalidFiles = [];
    
    newFiles.forEach(file => {
      if (file.size > maxSize) {
        invalidFiles.push(`${file.name}: File too large (max 50MB)`);
      } else if (!allowedTypes.includes(file.type)) {
        invalidFiles.push(`${file.name}: Invalid file type`);
      } else {
        validFiles.push(file);
      }
    });
    
    // Show validation errors
    if (invalidFiles.length > 0) {
      invalidFiles.forEach(error => toast.error(error));
    }
    
    if (validFiles.length === 0) {
      console.log('No valid files to upload');
      return;
    }
    
    console.log('Valid files:', validFiles.map(f => f.name));
    
    try {
      const uploadedFiles = [];
      
      for (const file of validFiles) {
        const uploaded = await uploadToServer(file);
        if (uploaded) {
          uploadedFiles.push(uploaded);
        }
      }
      
      if (uploadedFiles.length > 0) {
        setFiles(prev => {
          const newFilesList = [...prev, ...uploadedFiles];
          onFileUpload(newFilesList);
          return newFilesList;
        });
      }
    } catch (error) {
      console.error('Error in handleValidFiles:', error);
      toast.error('An error occurred while processing files');
    }
  };

  const handleFileChange = (event) => {
    const newFiles = Array.from(event.target.files);
    handleValidFiles(newFiles);
    event.target.value = null;
  };

  const handleDrop = (event) => {
    event.preventDefault();
    const newFiles = Array.from(event.dataTransfer.files);
    handleValidFiles(newFiles);
  };

  const handleDragOver = (event) => {
    event.preventDefault();
  };

  const removeFile = (index) => {
    const newFiles = files.filter((_, i) => i !== index);
    setFiles(newFiles);
    onFileUpload(newFiles);
  };

  return (
    <div className="w-full">
      <div
        onDragOver={handleDragOver}
        onDrop={handleDrop}
        onClick={() => fileInputRef.current.click()}
        className="border-2 border-dashed border-blue-300 rounded-lg p-8 text-center cursor-pointer hover:bg-blue-50 transition-colors"
      >
        <FaCloudUploadAlt className="mx-auto text-blue-500 text-5xl mb-4" />
        <p className="text-gray-600">
          Drag & Drop or <span className="text-blue-500">Click to Upload</span> Files
        </p>
        <p className="text-xs text-gray-500 mt-2">
          PDF, DOCX, JPG, PNG (Max 50MB)
        </p>
        <input
          type="file"
          ref={fileInputRef}
          onChange={handleFileChange}
          multiple
          accept=".pdf,.jpg,.jpeg,.png,.doc,.docx"
          className="hidden"
        />
      </div>

      {files.length > 0 && (
        <div className="mt-4">
          <h4 className="text-sm font-semibold text-gray-700 mb-2">Uploaded Files:</h4>
          <div className="space-y-2">
            {files.map((file, index) => (
              <div
                key={index}
                className="flex items-center justify-between bg-gray-100 p-3 rounded-md"
              >
                <a
                  href={file.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center text-blue-600 hover:underline"
                >
                  <FaFileAlt className="text-blue-500 mr-3" />
                  <span className="text-sm">{file.name}</span>
                </a>
                <button
                  onClick={() => removeFile(index)}
                  className="text-red-500 hover:text-red-700"
                >
                  <FaTrash />
                </button>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default FileUploader;
