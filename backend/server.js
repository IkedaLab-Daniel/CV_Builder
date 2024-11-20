require('dotenv').config()
const multer = require('multer')
const path = require('path')
const express = require('express')
const mongoose = require('mongoose')
const workoutRoutes = require('./routes/workouts')
const ResumeModel = require('./models/ResumeModel')
// express app
const app = express()

// middleware
app.use(express.json())

app.use((req, res, next) => {
  console.log(req.path, req.method)
  next()
})

// Multer ##################################
app.use(express.static('public'))

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'public/images')
  },
  filename: (req, file, cb) => {
    cb(null, file.fieldname + "_" + Date.now() + path.extname(file.originalname))
  }
})

const upload = multer({
  storage: storage
})

app.post('/upload', upload.single('file'), (req, res) => {
  ResumeModel.create({image: req.file.filename})
  .then(result => res.json(result))
  .catch(err => console.log(err))
})

app.get('/getResumes', (req,res) => {
  ResumeModel.find({})
  .then(resumes => res.json(resumes))
  .catch(err => console.log(err))
})

// End of Multer ###########################

// routes
app.use('/api/workouts', workoutRoutes)
// connect to db
mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log('connected to database')
    // listen to port
    app.listen(process.env.PORT, () => {
      console.log('listening for requests on port', process.env.PORT)
    })
  })
  .catch((err) => {
    console.log(err)
  }) 