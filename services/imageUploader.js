const uploadCloudinary = require("../utils/uploadCoudinary");
const cloudinary = require('../config/cloudinary')
const User = require('../models/authSchema')
const UploadImage = async(role,buffer,id)=>{
    try {
         const user = await User.findById(id)
        if (user.role !== role) throw new Error("invalid route");
        if (user.avatar.url && user.avatar.publicId) {
            await cloudinary.uploader.destroy(user.avatar.publicId)
        }
        const image = await uploadCloudinary(buffer, 'avatar')
        if (!image || !image.secure_url) {
            return res.status(500).json({ message: 'Cloudinary upload failed' })
        }

        user.avatar = {
            url: image.secure_url,
            publicId: image.public_id
        }
       return await user.save()
    } catch (error) {
        throw error
    }
}
const DeleteImage = async(role,id)=>{
    try {
        const user = await User.findById(id)
        if (user.role !== role) throw new Error("invalid route");
        if (!user.avatar.url || !user.avatar.publicId) {
            throw new Error("no image set");
        }
        await cloudinary.uploader.destroy(user.avatar.publicId)
        user.avatar = {url:null,publicId:null}
        return await user.save()
    } catch (error) {
        throw error
    }
}
module.exports = {UploadImage,DeleteImage}