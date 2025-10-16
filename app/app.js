require('dotenv').config()
const express = require('express')
const app = express()
const morgan = require('morgan')
const cors = require('cors')
const connectDB = require('../config/db')
const { notFoundErrorHandelar, errorMiddleware } = require('../middlewares/errorMiddleware')
const authRoute = require('../routers/authRoute')
connectDB()
app.use([cors(),morgan('dev'), express.json()])


app.get('/',(_req,res)=>{
    res.status(200).json({message:'System is ok'})
})
app.use('/api/auth/',authRoute)
app.use(notFoundErrorHandelar)
app.use(errorMiddleware)

module.exports = app