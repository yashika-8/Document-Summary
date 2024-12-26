export const ACCEPTED_FILE_TYPES = {
  TEXT: 'text/plain',
  PDF: 'application/pdf',
  IMAGE: ['image/jpeg', 'image/png', 'image/webp']
};

export function isValidFileType(file: File): boolean {
  return (
    file.type === ACCEPTED_FILE_TYPES.TEXT ||
    file.type === ACCEPTED_FILE_TYPES.PDF ||
    ACCEPTED_FILE_TYPES.IMAGE.includes(file.type)
  );
}

export function getFileTypeCategory(file: File): 'text' | 'pdf' | 'image' | null {
  if (file.type === ACCEPTED_FILE_TYPES.TEXT) return 'text';
  if (file.type === ACCEPTED_FILE_TYPES.PDF) return 'pdf';
  if (ACCEPTED_FILE_TYPES.IMAGE.includes(file.type)) return 'image';
  return null;
}