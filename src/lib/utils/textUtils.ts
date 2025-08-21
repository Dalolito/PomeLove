export const replaceText = (
  text: string,
  replacements: Record<string, string | number>
): string => {
  let result = text;
  Object.entries(replacements).forEach(([key, value]) => {
    result = result.replace(`{${key}}`, value.toString());
  });
  return result;
};

export const formatFileSize = (bytes: number): string => {
  if (bytes === 0) return '0 Bytes';
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
};
