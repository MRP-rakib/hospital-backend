const mongoose = require('mongoose')
const bcrypt = require('bcrypt')

const userSchema = new mongoose.Schema({
      username: { type: String, required: true, unique: true },
      firstname: { type: String, },
      lastname: { type: String },
      bio: { type: String },
      phone: { type: Number },
      address: { type: String },
      bitrhday: { type: Date },
      gender: { type: String, enum: ['male', 'female', 'other'] },
      bloodGroup: {
            type: String,
            enum: ['A+', 'A-', 'B+', 'B-', 'O+', 'O-', 'AB+', 'AB-']
      },
      email: { type: String, required: true, lowercase: true, unique: true, trim: true },
      password: { type: String, required: true, minlength: 6 },
      avatar: { url: { type: String }, publicId: { type: String } },
      role: { type: String, enum: ['admin', 'patient'], default: 'patient' }
}, { timestamps: true })

userSchema.pre('save', async function (next) {
      if (!this.isModified('password')) return next()
      try {
            this.password = await bcrypt.hash(this.password, 10)
            next()
      } catch (error) {
            next(error)
      }
})

module.exports = mongoose.model('User', userSchema)

