const User = require('../models/userSchema')
const bcrypt = require('bcrypt')
const createUser=async(userData)=>{
       try {
        const salt = await bcrypt.genSalt(10)
        const hashPass = await bcrypt.hash(userData.password,salt)
        const  newUser = new User({
            firstname:userData.firstname,
            lastname:userData.lastname,
            email:userData.email,
            password:hashPass,
            
          })
          return await newUser.save()
       } catch (error) {
        throw error
       }
}



module.exports = createUser