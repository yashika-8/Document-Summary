import { FileAnalysis } from '../types';
import { getFileTypeCategory } from './fileTypes';
import { extractTextFromPDF } from './pdfProcessor';
import { extractTextFromImage } from './imageProcessor';
import { generateSummary, getWordCount, getCharacterCount } from './textProcessing';

export async function processFile(file: File): Promise<FileAnalysis> {
  let text: string;
  const fileType = getFileTypeCategory(file);

  switch (fileType) {
    case 'text':
      text = await file.text();
      break;
    case 'pdf':
      text = await extractTextFromPDF(file);
      break;
    case 'image':
      text = await extractTextFromImage(file);
      break;
    default:
      throw new Error('Unsupported file type');
  }

  return {
    fileName: file.name,
    summary: generateSummary(text),
    wordCount: getWordCount(text),
    characterCount: getCharacterCount(text)
  };
}