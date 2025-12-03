const mongoose = require('mongoose')
const bcrypt = require('bcrypt')

const userSchema = new mongoose.Schema({
      name:{type:String,required:true},
      email:{type:String,required:true, lowercase:true, unique:true, trim:true},
      password:{type:String,required:true, minlength:6},
      avatar:{url:{type:String},publicId:{type:String}},
      role:{type:String,enum:['admin','patient'],default:'patient'}
},{timestamps:true})

userSchema.pre('save',async function(next){
    if(!this.isModified('password')) return next()
       try {
        this.password = await bcrypt.hash(this.password,10)
        next()
       } catch (error) {
        next(error)
       }
})

module.exports = mongoose.model('User',userSchema)

