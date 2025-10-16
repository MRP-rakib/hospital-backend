require('dotenv').config()
const express = require('express')
const app = express()
const morgan = require('morgan')
const cors = require('cors')

app.use([cors(),morgan('dev'), express.json()])

app.get('/',(_req,res)=>{
    res.status(200).json({message:'System is ok'})
})

module.exports = app