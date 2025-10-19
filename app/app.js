require('dotenv').config()
const express = require('express')
const app = express()
const morgan = require('morgan')
const cors = require('cors')
const connectDB = require('../config/db')
const { notFoundErrorHandelar, errorMiddleware } = require('../middlewares/errorMiddleware')
const userRouter = require('../routers/authuserRouter')
const adminRouter = require('../routers/authadminRouter')
connectDB()
app.use([morgan('dev'), cors(), express.json()])


app.get('/',(_req,res)=>{
    res.status(200).json({message:'System is ok'})
})
app.use('/api/auth/',userRouter)
app.use('/api/auth/',adminRouter)
app.use(notFoundErrorHandelar)
app.use(errorMiddleware)

module.exports = app