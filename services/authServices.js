const User = require('../models/authSchema')
const validator = require('validator')
const bcrypt = require('bcrypt')
const { genarateAccessToken, genarateRefreshToken } = require('../utils/token')
const CreateUser=async(userData,role)=>{
    try {
        const {name,email,password} = userData
        if (!name||!email||!password) throw new Error("All field are required")
        if(!validator.isEmail(email)) throw new Error('email invalid')
        if(password.length < 6 || password.length > 16) throw new Error("password must be 6-16 character")
        if(role === 'admin'){
            const existentAdmin = await User.findOne({role:'admin'})
            if (existentAdmin) throw new Error("Admin allready register")
        }
        const existentEmail = await User.findOne({email})
               if(existentEmail) throw new Error("email allready register")

        const user = new User({
            name:name,
            email:email,
            password:password,
            role:role,

        })
         return await user.save()        
    } catch (error) {
        throw error
    }
}

const LoginUser=async(userData,role)=>{
    try {
        const {email,password} = userData
        if(!email||!password) throw new Error("Email and Password required")
        const user = await User.findOne({email})
    if(!user||user.role !==role)  throw new Error("invalid credential")
        const checkPass = await bcrypt.compare(password,user.password)
        if(!checkPass) throw new Error("invalid credential");
        const accessToken = genarateAccessToken({id:user.id,role:user.role})
        const refreshToken = genarateRefreshToken({id:user.id})
        return {accessToken,refreshToken}
    } catch (error) {
        throw error
    }
}

const GetProfile =async(userId,role)=>{
    try {

        const user = await User.findById(userId).select('-password')
        if(!user||user.role!==role) throw new Error("user not available");
        
        return {user}
        
        
    } catch (error) {
        throw error
    }
}
module.exports = {CreateUser,LoginUser,GetProfile}