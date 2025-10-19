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
    if (!user) throw new Error("invalid credentials");
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) throw new Error("invalid credentials");
    const expiresIn = remembar ? "30d" : "1d";
    const token = jwt.sign(
      { id: user.id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn }
    );
    const userObj = user.toObject();
    delete userObj.password;
    return { user: userObj, token, expiresIn };
  } catch (error) {
    throw error;
  }
};

const getUser = async (id) => {
  try {
    const userId = await User.findById(id).select("-password");
    if (!userId) throw new Error("user not found");
    return userId;
  } catch (error) {
    throw error;
  }
};
const deleteUser = async ({ id, password }) => {
  try {
    if (!password) throw new Error("password is required");
    const user = await User.findById(id);
    const ismatch = await bcrypt.compare(password, user.password);
    if (!ismatch) throw new Error("password is wrong");

    await User.findByIdAndDelete(user);
    return "user delete succesfully";
  } catch (error) {
    throw error;
  }
};
module.exports = { createUser, loginUser, getUser, deleteUser };
