const {createUser} = require('../services/signupUser')

const signupController=async(req,res,next)=>{
    try {
       const newUser = await createUser(req.body)
       
       res.status(201).json({message:'account resgister succesfull'})
      } catch (error) {
         error.status = 400
        next(error)
    }
}

module.exports =signupController