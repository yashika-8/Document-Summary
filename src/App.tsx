import React, { useState } from 'react';
import { FileUpload } from './components/FileUpload';
import { Summary } from './components/Summary';
import { processFile } from './utils/fileProcessor';
import { FileAnalysis } from './types';

export default function App() {
  const [isProcessing, setIsProcessing] = useState(false);
  const [fileAnalysis, setFileAnalysis] = useState<FileAnalysis | null>(null);

  const handleFileSelect = async (file: File) => {
    setIsProcessing(true);
    try {
      const analysis = await processFile(file);
      setFileAnalysis(analysis);
    } catch (error) {
      console.error('Error processing file:', error);
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto space-y-8">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-gray-900">
            File Summary Generator
          </h1>
          <p className="mt-2 text-gray-600">
            Upload a text, PDF, or image file to generate a summary
          </p>
        </div>

        <FileUpload 
          onFileSelect={handleFileSelect}
          isProcessing={isProcessing}
        />

        {fileAnalysis && (
          <Summary
            fileName={fileAnalysis.fileName}
            summary={fileAnalysis.summary}
            wordCount={fileAnalysis.wordCount}
            characterCount={fileAnalysis.characterCount}
          />
        )}
      </div>
    </div>
  );
}