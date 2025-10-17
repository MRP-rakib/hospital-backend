const {userSignupController,adminSignupController} = require('../controllers/signupController')

const route = require('express').Router()

route.post('/signup',userSignupController)
route.post('/admin/signup',adminSignupController)

module.exports = route