const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const { uploadResume, getResumes, deleteResume } = require('../controllers/resumeController');
const requireAuth = require('../middleware/requireAuth')

// Multer setup
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.resolve(__dirname, '../public/images'));
  },
  filename: (req, file, cb) => {
    cb(null, file.fieldname + '_' + Date.now() + path.extname(file.originalname));
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
