const { CreateUser, LoginUser, GetProfile, UpdateUser, UpdatePass, DeleteUser } = require("../services/authServices")
const JWT = require('jsonwebtoken')
const { genarateAccessToken } = require("../utils/token")
const { UploadImage, DeleteImage } = require("../services/imageUploader")
const CreateUserController = async (req, res, next) => {
    try {
        const { username, email, password } = req.body
        const role = req.role
        await CreateUser({ username, email, password }, role)
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
            secure: true,
            sameSite: 'none',
            maxAge:60*60*1000,
            // domain: 'dashboard-iota-eight-53.vercel.app',
            // path:'/'
        })
        res.cookie('accessToken', accessToken, {
            httpOnly: true,
            secure: true,
            sameSite: 'none',
            maxAge:30*60*1000,
            // domain: 'dashboard-iota-eight-53.vercel.app',
            // path:'/'
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
        const id = req.params.id
        const role = req.role
        const buffer = req.file.buffer
        await UploadImage(role, buffer, id)
        return res.status(201).json({ message: 'image uploaded' })
    } catch (error) {
        error.status = 400
        next(error)
    }
}
const DeleteProfileImageController = async (req, res, next) => {
    try {
        const id = req.params.id
        const role = req.role
        // const buffer = req.file.buffer
        await DeleteImage(role,id)
        return res.status(200).json({ message: 'image remove done' })
    } catch (error) {
        error.status = 400
        next(error)
    }
}

const UpdateUserDataController = async (req, res, next) => {
    try {
        const id = req.params.id
        const role = req.role
        const userData = req.body
        await UpdateUser(id, userData, role)
        return res.status(200).json({ message: 'Update done' })

    } catch (error) {
        error.status = 400
        next(error)
    }
}

const UpdatePassController = async (req, res, next) => {
    try {
        const id = req.params.id
        const role = req.role
        const { password, newpassword } = req.body
        await UpdatePass(id, password, newpassword, role)
        res.status(200).json({ message: 'password change done' })
    } catch (error) {
        error.status = 400
        next(error)
    }
}
const DeleteUserController = async (req, res, next) => {
    try {
        const id = req.params.id
        const role = req.role
        const { password } = req.body
        await DeleteUser(id, password, role)
          res.clearCookie("accessToken", {
            httpOnly: true,
            secure: true,
            sameSite: "none",
            // path: "/",
        });

        res.clearCookie("refreshToken", {
            httpOnly: true,
            secure: true,
            sameSite: "none",
            // path: "/",
        });
        return res.status(200).json({ message: 'user delete successful' })
    } catch (error) {
        error.status = 400
        next(error)
    }
}
module.exports = {
    CreateUserController, LoginUserController,
    GetProfileController,
    RefreshTokenController, uploadProfileImageController,
    UpdateUserDataController, UpdatePassController, DeleteUserController,DeleteProfileImageController
}