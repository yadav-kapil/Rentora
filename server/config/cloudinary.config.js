const cloudinary = require('cloudinary').v2;
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const multer = require('multer');

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME || process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUD_API_KEY || process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUD_API_SECRET || process.env.CLOUDINARY_API_SECRET,
});

let storage;
try {
  storage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: {
      folder: 'rentora_avatars',
      allowed_formats: ['jpg', 'jpeg', 'png', 'webp'],
    },
  });
} catch (e) {
  storage = multer.memoryStorage();
}

const upload = multer({ storage });

/**
 * Uploads a base64 string or file URL to Cloudinary using the configured SDK.
 */
const uploadToCloudinary = async (fileStr) => {
  if (!fileStr) return "";
  
  // If it's already an HTTP/HTTPS URL, return directly
  if (fileStr.startsWith("http://") || fileStr.startsWith("https://")) {
    return fileStr;
  }

  try {
    const uploadResponse = await cloudinary.uploader.upload(fileStr, {
      folder: "rentora_homes",
    });
    return uploadResponse.secure_url;
  } catch (error) {
    console.error("Cloudinary SDK upload failed:", error);
    return fileStr; // fallback to original input
  }
};

module.exports = {
  cloudinary,
  upload,
  uploadToCloudinary,
};
