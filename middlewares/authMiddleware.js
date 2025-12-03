const JWT = require('jsonwebtoken')
const authMiddleware= async (req,_res,next)=>{
         try {
            const authHeader = req.headers['authorization']
            if(!authHeader) throw new Error("token is not available 1");
            const token = authHeader.split(' ')[1]
            if(!token) throw new Error("token is not available 2");
            const decoded = JWT.verify(token,process.env.ACCESS_TOKEN)
            req.user = decoded
            next()
           
            
         } catch (error) {
            error.status=401
            next(error)
         }
}

module.exports = authMiddleware