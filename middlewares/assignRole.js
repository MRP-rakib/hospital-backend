const assignRole = (req,res,next) => {
    if(req.baseUrl.includes('/admin')){
        req.role = 'admin'
    }else{
        req.role = 'patient'
    }
    next()
}


module.exports = assignRole