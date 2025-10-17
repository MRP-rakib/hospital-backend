const adminSignupController = require("../controllers/authAdminController");

const route = require("express").Router();

route.post("/admin/signup", adminSignupController);

module.exports = route;
