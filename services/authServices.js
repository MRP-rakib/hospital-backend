require("dotenv").config();
const User = require("../models/authSchema");
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
      role:userData.role
    });
    return await newUser.save();
  } catch (error) {
    throw error;
  }
};

const loginUser = async ({ email, password, remembar = false,role }) => {
  try {
    const user = await User.findOne({ email });
    if (!user) throw new Error("invalid credentials");
    if(user.role!==role) throw new Error('invalid credential')
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

const getUser = async (id,role) => {
  try {
    const user = await User.findById(id).select("-password");
    if (!user|| user.role !== role) throw new Error("user not found");
    return user;
  } catch (error) {
    throw error;
  }
};
const deleteUser = async ({ id, password,role }) => {
  try {
    if (!password) throw new Error("password is required");
    const user = await User.findById(id);
    if(user.role !== role) throw new Error("invalide route");
    
    const ismatch = await bcrypt.compare(password, user.password);
    if (!ismatch) throw new Error("password is wrong");

    await User.findByIdAndDelete(user);
    return "user delete succesfully";
  } catch (error) {
    throw error;
  }
};
module.exports = { createUser, loginUser, getUser, deleteUser };
