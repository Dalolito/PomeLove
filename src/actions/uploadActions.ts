'use server';

import { writeFile } from 'fs/promises';
import { join } from 'path';

const ALLOWED_MIME_TYPES = [
  'image/jpeg',
  'image/jpg',
  'image/png',
  'image/webp',
  'image/gif',
];
const MAX_FILE_SIZE = 5 * 1024 * 1024;

interface UploadResult {
  success: boolean;
  url?: string;
  error?: string;
}

export async function uploadImageAction(
  formData: FormData
): Promise<UploadResult> {
  try {
    const file = formData.get('file') as File;

    if (!file) {
      return { success: false, error: 'NO_FILE_PROVIDED' };
    }

    if (!ALLOWED_MIME_TYPES.includes(file.type)) {
      return { success: false, error: 'INVALID_FILE_TYPE' };
    }

    if (file.size > MAX_FILE_SIZE) {
      return { success: false, error: 'FILE_TOO_LARGE' };
    }

    const timestamp = Date.now();
    const random = Math.random().toString(36).substring(2, 15);
    const extension = file.name.split('.').pop();
    const filename = `${timestamp}_${random}.${extension}`;

    const uploadType = (formData.get('type') as string) || 'puppies';
    const uploadDir = uploadType === 'parents' ? 'parents' : 'puppies';
    const uploadPath = join(process.cwd(), 'public', 'uploads', uploadDir);
    const filePath = join(uploadPath, filename);

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);
    await writeFile(filePath, buffer);

    const url = `/uploads/${uploadDir}/${filename}`;
    return { success: true, url };
  } catch (error) {
    console.error('Error uploading image:', error);
    return { success: false, error: 'UPLOAD_FAILED' };
  }
}
