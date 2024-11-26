const express = require('express');
const fs = require('fs');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const { uploadResume, getResumes, deleteResume } = require('../controllers/resumeController');
const requireAuth = require('../middleware/requireAuth')

// Multer setup
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.resolve(__dirname, '../public/images')); // Specify the destination folder
  },
  filename: (req, file, cb) => {
    const uploadPath = path.resolve(__dirname, '../public/images', file.originalname);

    // Check if file already exists
    fs.access(uploadPath, fs.constants.F_OK, (err) => {
      if (err) {
        // File does not exist, use original name
        cb(null, file.originalname);
      } else {
        // File exists, handle the conflict (e.g., add a timestamp to the name)
        const timestamp = Date.now();
        const ext = path.extname(file.originalname);
        const baseName = path.basename(file.originalname, ext);
        cb(null, `${baseName}_${timestamp}${ext}`);
      }
    });
  },
});

const upload = multer({ storage });

// require auth for all resume routes
router.use(requireAuth)

// Routes
router.post('/upload', upload.single('file'), uploadResume);
router.get('/getResumes', getResumes);
router.delete('/delete/:id', deleteResume)

module.exports = router;
