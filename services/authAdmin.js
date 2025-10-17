const User = require('../models/userSchema')
const bcrypt = require('bcrypt')
const createAdmin =async(userData)=>{
       try {
              const salt = await bcrypt.genSalt(10)
              const hash = await bcrypt.hash(userData.password,salt)
              const newUser = new User({
                     firstname:userData.firstname,
                     lastname:userData.lastname,
                     email:userData.email,
                     password:hash,
                     role:"admin"
              })
              return await newUser.save()
       } catch (error) {
              throw error
       }
}

module.exports = createAdmin