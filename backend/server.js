require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const resumeRoutes = require('./routes/resumeRoutes');
const userRoutes = require('./routes/User')
// express app
const app = express();

// middleware
app.use(express.json());
app.use(express.static('public'));

app.use((req, res, next) => {
  console.log(req.path, req.method);
  next();
});

// routes
app.use('/api/resumes', resumeRoutes);
app.use('/api/user', userRoutes);

// connect to db
mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log('Connected to database ❤️');
    // listen to port
    app.listen(process.env.PORT, () => {
      console.log('Listening for requests on port', process.env.PORT, '❤️');
    });
  })
  .catch((err) => {
    console.error(err, '💔');
  });
