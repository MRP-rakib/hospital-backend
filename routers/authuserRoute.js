const {userSignupController,userLoginController} = require("../controllers/authUserController");

const route = require("express").Router();

route.post("/user/signup", userSignupController);
route.post("/user/login", userLoginController);

module.exports = route;
