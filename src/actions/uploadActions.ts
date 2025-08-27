'use server';

import cloudinary from '@/lib/cloudinary';

const ALLOWED_MIME_TYPES = [
  'image/jpeg',
  'image/jpg',
  'image/png',
  'image/webp',
  'image/gif',
  'video/mp4',
  'video/webm',
  'video/ogg',
  'video/quicktime',
];
const MAX_FILE_SIZE = 50 * 1024 * 1024;

interface UploadResult {
  success: boolean;
  url?: string;
  error?: string;
}

export async function uploadMediaAction(
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

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    const timestamp = Date.now();
    const random = Math.random().toString(36).substring(2, 15);
    const extension = file.name.split('.').pop();
    const filename = `${timestamp}_${random}`;

    const uploadType = (formData.get('type') as string) || 'puppies';
    const folder =
      uploadType === 'parents' ? 'pomelove/parents' : 'pomelove/puppies';

    const uploadResult = await cloudinary.uploader.upload(
      `data:${file.type};base64,${buffer.toString('base64')}`,
      {
        public_id: `${folder}/${filename}`,
        resource_type: 'auto',
        folder: folder,
      }
    );

    return { success: true, url: uploadResult.secure_url };
  } catch (error) {
    console.error('Error uploading media:', error);
    return { success: false, error: 'UPLOAD_FAILED' };
  }
}

export async function uploadImageAction(
  formData: FormData
): Promise<UploadResult> {
  return uploadMediaAction(formData);
}
