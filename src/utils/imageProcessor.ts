import { createWorker } from 'tesseract.js';

export async function extractTextFromImage(file: File): Promise<string> {
  const worker = await createWorker('eng');
  
  const imageUrl = URL.createObjectURL(file);
  const { data: { text } } = await worker.recognize(imageUrl);
  
  URL.revokeObjectURL(imageUrl);
  await worker.terminate();
  
  return text.trim();
}