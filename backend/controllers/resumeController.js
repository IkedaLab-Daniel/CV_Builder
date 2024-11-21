const ResumeModel = require('../models/ResumeModel');

// Upload Resume
const uploadResume = (req, res) => {
  ResumeModel.create({ image: req.file.filename })
    .then(result => res.json(result))
    .catch(err => {
      console.error(err);
      res.status(500).json({ error: 'Failed to upload resume.' });
    });
};

// Get Resumes
const getResumes = (req, res) => {
  ResumeModel.find({})
    .then(resumes => res.json(resumes))
    .catch(err => {
      console.error(err);
      res.status(500).json({ error: 'Failed to fetch resumes.' });
    });
};

module.exports = {
  uploadResume,
  getResumes,
};
