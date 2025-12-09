import React, { useState, useRef } from 'react';
import { FaCloudUploadAlt, FaFileAlt, FaTrash } from 'react-icons/fa';
import toast from 'react-hot-toast';

const FileUploader = ({ onFilesSelected }) => {
  const [files, setFiles] = useState([]);
  const fileInputRef = useRef(null);

  // validate file size & type
  const validateFiles = (newFiles) => {
    const allowedTypes = [
      'application/pdf',
      'image/jpeg',
      'image/png',
      'application/msword',
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
    ];
    const maxSize = 50 * 1024 * 1024; // 50MB

    const valid = [];
    newFiles.forEach((file) => {
      if (file.size > maxSize) {
        toast.error(`${file.name}: File too large (max 50MB)`);
      } else if (!allowedTypes.includes(file.type)) {
        toast.error(`${file.name}: Invalid file type`);
      } else {
        valid.push(file);
      }
    });
    return valid;
  };

  const handleFileChange = (event) => {
    const newFiles = Array.from(event.target.files);
    const validFiles = validateFiles(newFiles);

    setFiles((prev) => {
      const updated = [...prev, ...validFiles];
      onFilesSelected(updated);
      return updated;
    });
    event.target.value = null;
  };

  const handleDrop = (event) => {
    event.preventDefault();
    const newFiles = Array.from(event.dataTransfer.files);
    const validFiles = validateFiles(newFiles);

    setFiles((prev) => {
      const updated = [...prev, ...validFiles];
      onFilesSelected(updated);
      return updated;
    });
  };

  const handleDragOver = (event) => {
    event.preventDefault();
  };

  const removeFile = (index) => {
    const newFiles = files.filter((_, i) => i !== index);
    setFiles(newFiles);
    onFilesSelected(newFiles);
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
          Drag & Drop or <span className="text-blue-500">Click to Select</span> Files
        </p>
        <p className="text-xs text-gray-500 mt-2">PDF, DOCX, JPG, PNG (Max 50MB)</p>
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
          <h4 className="text-sm font-semibold text-gray-700 mb-2">Selected Files:</h4>
          <div className="space-y-2">
            {files.map((file, index) => (
              <div
                key={index}
                className="flex items-center justify-between bg-gray-100 p-3 rounded-md"
              >
                <div className="flex items-center text-gray-700">
                  <FaFileAlt className="text-blue-500 mr-3" />
                  <span className="text-sm">{file.name}</span>
                </div>
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
