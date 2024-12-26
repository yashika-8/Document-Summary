import React, { useCallback, useState } from 'react';
import { Upload, FileText, AlertCircle } from 'lucide-react';
import { isValidFileType, ACCEPTED_FILE_TYPES } from '../utils/fileTypes';

interface FileUploadProps {
  onFileSelect: (file: File) => void;
  isProcessing: boolean;
}

export function FileUpload({ onFileSelect, isProcessing }: FileUploadProps) {
  const [isDragging, setIsDragging] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleDrag = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setIsDragging(true);
    } else if (e.type === "dragleave") {
      setIsDragging(false);
    }
  }, []);

  const validateAndProcessFile = useCallback((file: File) => {
    setError(null);
    if (!isValidFileType(file)) {
      setError("Please upload a text, PDF, or image file");
      return;
    }
    onFileSelect(file);
  }, [onFileSelect]);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);

    const files = Array.from(e.dataTransfer.files);
    if (files.length > 1) {
      setError("Please upload only one file at a time");
      return;
    }

    validateAndProcessFile(files[0]);
  }, [validateAndProcessFile]);

  const handleFileInput = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      validateAndProcessFile(file);
    }
  }, [validateAndProcessFile]);

  const acceptedTypes = [
    ACCEPTED_FILE_TYPES.TEXT,
    ACCEPTED_FILE_TYPES.PDF,
    ...ACCEPTED_FILE_TYPES.IMAGE
  ].join(',');

  return (
    <div
      className={`relative border-2 border-dashed rounded-lg p-8 transition-colors ${
        isDragging 
          ? "border-blue-500 bg-blue-50" 
          : "border-gray-300 hover:border-gray-400"
      }`}
      onDragEnter={handleDrag}
      onDragLeave={handleDrag}
      onDragOver={handleDrag}
      onDrop={handleDrop}
    >
      <input
        type="file"
        accept={acceptedTypes}
        onChange={handleFileInput}
        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
        disabled={isProcessing}
      />
      
      <div className="flex flex-col items-center justify-center space-y-4 text-center">
        <div className="p-4 bg-gray-100 rounded-full">
          {error ? (
            <AlertCircle className="w-8 h-8 text-red-500" />
          ) : (
            <Upload className="w-8 h-8 text-gray-500" />
          )}
        </div>
        
        <div className="space-y-2">
          <p className="text-lg font-medium text-gray-700">
            {isProcessing ? "Processing..." : "Drop your file here"}
          </p>
          <p className="text-sm text-gray-500">
            or click to select a file
          </p>
          <p className="text-xs text-gray-400">
            Supports TXT, PDF, JPG, PNG, and WebP
          </p>
        </div>

        {error && (
          <p className="text-sm text-red-500">{error}</p>
        )}
      </div>
    </div>
  );
}