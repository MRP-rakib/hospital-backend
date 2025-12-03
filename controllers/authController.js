const { CreateUser, LoginUser, GetProfile } = require("../services/authservices")
const JWT = require('jsonwebtoken')
const { genarateAccessToken } = require("../utils/token")
const uploadCloudinary = require("../utils/uploadCoudinary")
const User = require('../models/authSchema')
const cloudinary = require("../config/cloudinary")
const CreateUserController = async (req, res, next) => {
    try {
        const { name, email, password } = req.body
        const role = req.role
        await CreateUser({ name, email, password }, role)

        return res.status(201).json({ message: 'Account Create Done' })
    } catch (error) {
        error.status = 400
        next(error)
    }
}

const LoginUserController = async (req, res, next) => {
    try {
        const { email, password } = req.body
        const role = req.role
        const { accessToken, refreshToken } = await LoginUser({ email, password }, role)
        res.cookie('refreshToken', refreshToken, {
            httpOnly: true,
            secure: false,
            sameSite: 'lax'
        })
        return res.status(200).json({ message: 'login successfull', accessToken })
    } catch (error) {
        error.status = 400
        next(error)
    }
}

const GetProfileController = async (req, res, next) => {
    try {
        userId = req.user.id
        role = req.role
        const user = await GetProfile(userId, role)
        return res.status(200).json(user)
    } catch (error) {
        error.status = 401
        next(error)
    }
}

const RefreshTokenController = async (req, res, next) => {
    try {
        const refreshToken = req.cookies.refreshToken
        if (!refreshToken) throw new Error("refresh Token not available")
        const decoded = JWT.verify(refreshToken, process.env.REFRESH_TOKEN)
        const newAccessToken = genarateAccessToken({ id: decoded.id, role: decoded.role })
        return res.status(200).json({ newAccessToken })
    } catch (error) {
        error.status = 400
        next(error)
    }
}
const uploadProfileImageController = async (req, res, next) => {
    try {
        const role = req.role
        const user = await User.findById(req.user.id)
        if (user.role !== role) throw new Error("invalid route");
        if (user.avatar.url && user.avatar.publicId) {
            await cloudinary.uploader.destroy(user.avatar.publicId)
        }
        const image = await uploadCloudinary(req.file.buffer, 'avatar')
        if (!image || !image.secure_url) {
            return res.status(500).json({ message: 'Cloudinary upload failed' })
        }

        user.avatar = {
            url: image.secure_url,
            publicId: image.public_id
        }
        await user.save()
        return res.status(201).json({ message: 'image uploaded', avatar: user.avatar })

    } catch (error) {
        error.status = 400
        next(error)
    }
}
module.exports = { CreateUserController, LoginUserController, GetProfileController, RefreshTokenController, uploadProfileImageController }