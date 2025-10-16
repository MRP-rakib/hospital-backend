const signupController = require('../controllers/signupController')

const route = require('express').Router()

route.post('/signup',signupController)

module.exports = route