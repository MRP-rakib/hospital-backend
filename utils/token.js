require('dotenv').config()
const JWT = require('jsonwebtoken')
const genarateAccessToken=(payload)=>{
     return JWT.sign(payload,process.env.ACCESS_TOKEN,{expiresIn:'30m'})
}
const genarateRefreshToken=(payload)=>{
     return JWT.sign(payload,process.env.REFRESH_TOKEN,{expiresIn:'1h'})
}

module.exports = {genarateAccessToken,genarateRefreshToken}