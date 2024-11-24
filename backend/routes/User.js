const express = require('express')

// controller functions
const {
    loginUser,
    singupUser,
    updateUser
} = require('../controllers/userController')

const router = express.Router()

// login route
router.post('/login', loginUser)

// signup route
router.post('/signup', singupUser)

// update route
router.patch('/:id', updateUser)

module.exports = router