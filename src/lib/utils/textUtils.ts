export const replaceText = (
  text: string,
  replacements: Record<string, string | number>
): string => {
  let result = text;
  
  Object.entries(replacements).forEach(([key, value]) => {
    const pluralRegex = new RegExp(`\\{${key},\\s*plural,\\s*one\\s*\\{([^}]+)\\}\\s*other\\s*\\{([^}]+)\\}\\}`, 'g');
    result = result.replace(pluralRegex, (match, oneForm, otherForm) => {
      const numValue = Number(value);
      return numValue === 1 ? oneForm : otherForm;
    });
  });
  
  Object.entries(replacements).forEach(([key, value]) => {
    result = result.replace(new RegExp(`\\{${key}\\}`, 'g'), value.toString());
  });
  
  return result;
};

import { Dictionary } from '@/lib/types/dictionary';

export const formatFileSize = (bytes: number, dict: Dictionary): string => {
  if (bytes === 0) return dict.admin.utils.fileSize.zeroBytes;
  const k = 1024;
  const sizes = [
    dict.admin.utils.fileSize.bytes,
    dict.admin.utils.fileSize.kb,
    dict.admin.utils.fileSize.mb,
    dict.admin.utils.fileSize.gb
  ];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
};
