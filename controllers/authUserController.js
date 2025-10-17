require('dotenv').config()
const {createUser,loginUser} = require("../services/authUser");
const validator = require("validator");
const User = require("../models/userSchema");
const userSignupController = async (req, res, next) => {
  try {
    const { firstname, lastname, email, password } = req.body;
    // fields checking
    if (!firstname || !lastname || !email || !password)
      return res.status(400).json({ message: "All fields are required" });
    // email checking
    if (!validator.isEmail(email))
      return res.status(400).json({ message: "invalid email format" });
    // existinguser checking
    const existingUser = await User.findOne({ email });
    if (existingUser)
      return res.status(400).json({ message: "email already registered" });
    // user create
    const newUser = await createUser({ firstname, lastname, email, password });
    const userObj = newUser.toObject()
    delete userObj.password
    res.status(201).json({ message: "Account resgister succesfull",user:userObj });
  } catch (error) {
    error.status = 400;
    console.log(error);

    next(error);
  }
};
const userLoginController=async(req,res,next)=>{
  try {
    const {email,password,remembar} =req.body
    const {user,token,expiresIn} = await loginUser({email,password,remembar})
     res.cookie("token",token,{
      httpOnly:true,
      secure:process.env.NODE_ENV === 'production',
      maxAge:remembar?30*24*60*60*1000:24*60*60*1000
     })
     res.status(200).json({
      message:'login successful',
      user,
      token,
      expiresIn
     })

  } catch (error) {
    console.log(error);
    error.status = 400
    next(error)
  }
}
module.exports = {userSignupController,userLoginController}
