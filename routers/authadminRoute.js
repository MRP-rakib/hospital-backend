const adminSignupController = require('../controllers/authAdminController')

const route = require('express').Router()

route.post('/admin',adminSignupController)

module.exports = route