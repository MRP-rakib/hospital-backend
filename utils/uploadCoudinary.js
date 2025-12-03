const cloudinary = require('../config/cloudinary')

const uploadCloudinary = async(buffer,folder='/uploads')=>{
    return new Promise((resolve,reject)=>{
        cloudinary.uploader.upload_stream({folder},
            (err,result)=>{
                if (err) return reject(err)
                resolve(result)
            }
        ).end(buffer)
    })
}

module.exports = uploadCloudinary