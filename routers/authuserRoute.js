const userSignupController = require('../controllers/authUserController')

const route = require('express').Router()

route.post('/user',userSignupController)

module.exports = route