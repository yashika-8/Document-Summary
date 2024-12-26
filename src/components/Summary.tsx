import React from 'react';
import { FileText } from 'lucide-react';

interface SummaryProps {
  fileName: string;
  summary: string;
  wordCount: number;
  characterCount: number;
}

export function Summary({ fileName, summary, wordCount, characterCount }: SummaryProps) {
  return (
    <div className="bg-white rounded-lg shadow-md p-6 space-y-6">
      <div className="flex items-center space-x-3">
        <FileText className="w-6 h-6 text-blue-500" />
        <h2 className="text-xl font-semibold text-gray-800">{fileName}</h2>
      </div>

      <div className="flex space-x-6">
        <div className="flex-1">
          <h3 className="text-sm font-medium text-gray-500 mb-2">Summary</h3>
          <p className="text-gray-700 leading-relaxed">{summary}</p>
        </div>
      </div>

      <div className="flex space-x-6 pt-4 border-t border-gray-200">
        <div>
          <p className="text-sm font-medium text-gray-500">Word Count</p>
          <p className="text-lg font-semibold text-gray-700">{wordCount}</p>
        </div>
        <div>
          <p className="text-sm font-medium text-gray-500">Character Count</p>
          <p className="text-lg font-semibold text-gray-700">{characterCount}</p>
        </div>
      </div>
    </div>
  );
}