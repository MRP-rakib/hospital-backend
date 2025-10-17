require("dotenv").config();
const User = require("../models/userSchema");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const createUser = async (userData) => {
  try {
    const salt = await bcrypt.genSalt(10);
    const hashPass = await bcrypt.hash(userData.password, salt);
    const newUser = new User({
      firstname: userData.firstname,
      lastname: userData.lastname,
      email: userData.email,
      password: hashPass,
    });
    return await newUser.save();
  } catch (error) {
    throw error;
  }
};

const loginUser = async ({ email, password, remembar = false }) => {
  try {
    const user = await User.findOne({ email });
    if (!user) throw new error("invalid credentials");
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) throw new error("invalid credentials");
    const expiresIn = remembar ? "30d" : "1d";
    const token = jwt.sign(
      { id: user.id, role: user.role },
      process.env.JWT_SECRET,
      {expiresIn}
    );
    const userObj =  user.toObject()
    delete userObj.password
    return { user:userObj, token ,expiresIn};
  } catch (error) {
    throw error;
  }
};
module.exports = {createUser,loginUser}
