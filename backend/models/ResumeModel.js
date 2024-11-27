const mongoose = require('mongoose')

const Schema = mongoose.Schema

const resumeSchema = new Schema({
    image: String,
    user_id: String,
},{ timestamps: true })

module.exports = mongoose.model('ResumeModel', resumeSchema)