import { v2 as cloudinary } from 'cloudinary';

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME || 'dz0bhhsbc',
  api_key: process.env.CLOUDINARY_API_KEY || '313757876197894',
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export default cloudinary;
