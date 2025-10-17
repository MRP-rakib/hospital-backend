require('dotenv').config()
const express = require('express')
const app = express()
const morgan = require('morgan')
const cors = require('cors')
const connectDB = require('../config/db')
const { notFoundErrorHandelar, errorMiddleware } = require('../middlewares/errorMiddleware')
const userRoute = require('../routers/authuserRoute')
const adminRoute = require('../routers/authadminRoute')
connectDB()
app.use([morgan('dev'), cors(), express.json()])


app.get('/',(_req,res)=>{
    res.status(200).json({message:'System is ok'})
})
app.use('/api/auth/',userRoute)
app.use('/api/auth/',adminRoute)
app.use(notFoundErrorHandelar)
app.use(errorMiddleware)

module.exports = app