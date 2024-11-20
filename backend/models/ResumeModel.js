const mongoose = require('mongoose')

const Schema = mongoose.Schema

const resumeSchema = new Schema({
    image: String
},)

module.exports = mongoose.model('ResumeModel', resumeSchema)