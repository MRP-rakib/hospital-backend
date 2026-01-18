require('dotenv').config()
const JWT = require('jsonwebtoken')
const genarateAccessToken=(payload)=>{
     return JWT.sign(payload,process.env.ACCESS_TOKEN,{expiresIn:'1h'})
}
const genarateRefreshToken=(payload)=>{
     return JWT.sign(payload,process.env.REFRESH_TOKEN,{expiresIn:'2h'})
}

module.exports = {genarateAccessToken,genarateRefreshToken}