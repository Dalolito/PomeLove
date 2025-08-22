import { promises as fs } from 'fs';
import path from 'path';

export async function deleteFileFromServer(fileUrl: string): Promise<void> {
  try {
    const urlPath = new URL(fileUrl, 'http://localhost').pathname;
    const filePath = path.join(process.cwd(), 'public', urlPath);
    
    await fs.access(filePath);
    await fs.unlink(filePath);
  } catch (error) {
    console.warn(`Failed to delete file: ${fileUrl}`, error);
  }
}

export async function deleteMultipleFilesFromServer(fileUrls: string[]): Promise<void> {
  const deletePromises = fileUrls.map(url => deleteFileFromServer(url));
  await Promise.allSettled(deletePromises);
}
