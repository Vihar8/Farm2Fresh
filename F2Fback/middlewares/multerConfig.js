// const multer = require('multer');
// const path = require('path');

// const storage = multer.diskStorage({
//     destination: function (req, file, cb) {
//         cb(null, 'uploads/'); // Save images in 'uploads' folder
//     },
//     filename: function (req, file, cb) {
//         cb(null, Date.now() + path.extname(file.originalname)); // Add timestamp to file name
//     }
// });

// const upload = multer({ storage });
// module.exports = upload;


const multer = require('multer');
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const cloudinary = require('./cloudinaryConfig');

const storage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: {
        folder: 'commodities', // Specify a folder in your Cloudinary account
        allowed_formats: ['jpeg', 'png', 'jpg'], // Specify allowed file formats
    },
});

const upload = multer({ storage });
module.exports = upload;
