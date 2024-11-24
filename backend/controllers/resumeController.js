const ResumeModel = require('../models/ResumeModel');
const fs = require('fs');
const path = require('path');

// Upload Resume
const uploadResume = (req, res) => {
  const user_id = req.user._id
  ResumeModel.create({ image: req.file.filename, user_id: user_id })
    .then(result => res.json(result))
    .catch(err => {
      console.error(err);
      res.status(500).json({ error: 'Failed to upload resume.' });
    });
};

// Get Resumes
const getResumes = (req, res) => {
  const user_id = req.user._id

  ResumeModel.find({user_id})
    .then(resumes => res.json(resumes))
    .catch(err => {
      console.error(err);
      res.status(500).json({ error: 'Failed to fetch resumes.' });
    });
};

// Delete resume
const deleteResume = async (req, res) => {
    const { id } = req.params;

    try {
        // Find and delete the resume in the database
        const resume = await ResumeModel.findOneAndDelete({ _id: id });

        if (!resume) {
            return res.status(400).json({ error: 'No such resume' });
        }

        // Construct the file path
        const filePath = path.join(__dirname, '../public/images/', resume.image);

        // Delete the file from the folder
        fs.unlink(filePath, (err) => {
            if (err) {
                console.error('Error deleting file:', err);
                return res.status(500).json({ error: 'Failed to delete the file' });
            }
        });

        res.status(200).json(resume);
    } catch (error) {
        console.error('Error deleting resume:', error);
        res.status(500).json({ error: 'Failed to delete resume' });
    }
}

module.exports = {
  uploadResume,
  getResumes,
  deleteResume
};
