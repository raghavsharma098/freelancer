const cloudinary = require('cloudinary').v2;
const { CloudinaryStorage } = require('multer-storage-cloudinary');

cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.CLOUD_API_KEY,
    api_secret: process.env.CLOUD_API_SECRET
});

const storage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: {
        folder: 'wanderlust_DEV',  // Folder in your Cloudinary account where images will be stored
        allowedFormats: ["png", "jpg", "jpeg"],  // Fixed typo here (allowedFormats instead of allowerdFormats)
    },
});

module.exports = {
    cloudinary,
    storage,
};
