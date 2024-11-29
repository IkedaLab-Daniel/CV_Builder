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

const updateUser = async (req, res) => {
    const { id } = req.params
    const { username } = req.body

    console.log('Request Body:', req.body);

    const currentUser = await User.findById(id);
    // Check if the new username is already taken by another user
    if (username && username !== currentUser.username) {
      const existingUser = await User.findOne({ username: username });
      if (existingUser) {
          return res.status(400).json({ error: 'Username already taken' });
      }
  }
   
    const user = await User.findOneAndUpdate({_id: id}, {
      ...req.body
    }, {new: true})
  
    if (!user) {
      return res.status(400).json({error: 'No such user'})
    }
  
    res.status(200).json(user)
  }

  // update profile image
  const updateProfileImage = async (req, res) => {
    try {
      const { id } = req.params;
  
      // If a file is uploaded, add its filename to the user's data
      let updatedData = { ...req.body };
      if (req.file) {
        updatedData.profileImage = req.file.filename;
      }
  
      const updatedUser = await User.findByIdAndUpdate(id, updatedData, {
        new: true, // Return the updated user
      });
  
      if (!updatedUser) {
        return res.status(404).json({ message: 'User not found' });
      }
  
      res.status(200).json(updatedUser);
    } catch (error) {
      res.status(500).json({ message: 'Error updating user', error });
    }
  };
module.exports = {
    loginUser,
    singupUser,
    updateUser,
    updateProfileImage
}