const { createUser } = require("../services/signupUser");
const validator = require("validator");
const User = require("../models/userSchema");
const signupController = async (req, res, next) => {
  try {
    const { firstname, lastname, email, password } = req.body;
// fields checking
    if (!firstname || !lastname || !email || !password)
      return res.status(400).json({ message: "All fields are required" });
// email checking
    if (!validator.isEmail(email))
      return res.status(400).json({ message: "invalid email format" });
// existinguser checking
    const existingUser = await User.findOne({ email });
    if (existingUser)
      return res.status(400).json({ message: "email already registered" });
// user create
    const newUser = await createUser({ firstname, lastname, email, password });
    res.status(201).json({ message: "Account resgister succesfull" });
  } catch (error) {
    error.status = 400;
    console.log(error);

    next(error);
  }
};

module.exports = signupController;
