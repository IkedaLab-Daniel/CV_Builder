const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const validator = require('validator')

const Schema = mongoose.Schema

const userSchema = new Schema({
    email:{
        type: String,
        required: true,
        unique: true
    },
    password:{
        type: String,
        required: true,
    },
    firstName: {
        type: String,
        required: true,
    },
    middleName: {
        type: String,
        required: true,
    },
    lastName: {
        type: String,
        required: true,
    },
    suffix: {
        type: String,
        required: true,
    },
    username: {
        type: String,
        required: true,
    },
    dateofbirth:{
        type: String,
        required: true,
    },
    profileImage:{
        type: String
    },
    address: {
        type: String
    },
    sex: {
        type: String
    }
}) 

// mah static method signup
userSchema.statics.signup = async function(email, password, firstName, middleName, lastName, suffix, username, dateofbirth) {

    // validator
    if (!email || !password || !firstName || !lastName || !username || !dateofbirth){
        throw Error('All fields must be filled')
    }
    if (!validator.isEmail(email)){
        throw Error('Email if not valid')
    }
    if (!validator.isStrongPassword(password)){
        throw Error('Password must be at least 8 characters long and include at least one symbol, one lowercase letter, one uppercase letter, and one number.')
    }
    
    const exists = await this.findOne({ email })

    if (exists){
        throw Error('Email already in use')
    }

    const usernameExists = await this.findOne({ username })
    
    if (usernameExists){
        throw Error('Username already taken')
    }

    const daniel = await bcrypt.genSalt(10)
    const hash = await bcrypt.hash(password, daniel)

    let inputSuffix;
    if (!suffix){
        inputSuffix = ' '
    } else{
        inputSuffix = suffix
    }

    let inputMiddleName;
    if (!middleName){
        inputMiddleName = ' '
    } else{
        inputMiddleName = middleName
    }

    const user = await this.create({ email, password: hash, firstName, middleName: inputMiddleName, lastName, suffix: inputSuffix, username, dateofbirth})

    return user
}

// static for login method
userSchema.statics.login = async function (email, password, username){
    // validator
    if (!email || !password){
        throw Error('All fields must be filled')
    }

    const user = await this.findOne({ email })

    if (!user){
        throw Error('Incorrect Email or Password')
    }


    const match = await bcrypt.compare(password, user.password)
    
    if (!match){
        throw Error('Incorrect Email or password')
    }

    return user
} 


module.exports = mongoose.model('User', userSchema)