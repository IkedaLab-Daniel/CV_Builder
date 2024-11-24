const User = require('../models/UserModel')
const jwt = require('jsonwebtoken')

const createToken = (_id) => {
    return jwt.sign({_id}, process.env.SECRET, { expiresIn: '3d'})
}

// login user
const loginUser = async (req, res) => {
    const { email, password } = req.body

    try {
        const user = await User.login(email, password)
        const userData = await User.findOne({email})
        // create a token
        const token = createToken(user._id)

        res.status(200).json({email, token, userData})
    } catch (error) {
        res.status(400).json({error: error.message})
    }
}

// signup user
const singupUser = async (req, res) => {
    const { email, password, firstName, middleName, lastName, suffix, username, dateofbirth} = req.body

    try {
        const user = await User.signup(email, password, firstName, middleName, lastName, suffix, username, dateofbirth)
        const userData = await User.findOne({email})
        // create a token
        const token = createToken(user._id)

        res.status(200).json({email, token, userData})
    } catch (error) {
        res.status(400).json({error: error.message})
    }
}

module.exports = {
    loginUser,
    singupUser
}