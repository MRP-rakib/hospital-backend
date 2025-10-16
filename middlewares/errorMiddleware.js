const notFoundErrorHandelar =(_req,_res,next)=>{
    const error = new Error('Resources not found')
    error.status = 404
    next(error)
}

const errorMiddleware=(err,_req,res,_next)=>{
    if(err.status)return res.status(err.status).json({message:err.message})
        res.status(500).json({message:'something went wrong'})
}

module.exports ={notFoundErrorHandelar,errorMiddleware}