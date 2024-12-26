export function generateSummary(text: string): string {
  // Split text into sentences
  const sentences = text.match(/[^.!?]+[.!?]+/g) || [];
  
  // Get the first few sentences (up to 3) as a summary
  const summaryLength = Math.min(3, sentences.length);
  return sentences.slice(0, summaryLength).join(' ').trim();
}

export function getWordCount(text: string): number {
  return text.trim().split(/\s+/).filter(word => word.length > 0).length;
}

export function getCharacterCount(text: string): number {
  return text.length;
}