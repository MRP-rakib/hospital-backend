require("dotenv").config();
const {
  createUser,
  loginUser,
  getUser,
  deleteUser,
} = require("../services/authServices");
const validator = require("validator");
const User = require("../models/authSchema");

const userSignupController = async (req, res, next) => {
  try {
    const { firstname, lastname, email, password } = req.body;

    if (!firstname || !lastname || !email || !password)
      return res.status(400).json({ message: "All fields are required" });

    if (!validator.isEmail(email))
      return res.status(400).json({ message: "invalid email format" });
    const role = req.baseUrl.includes("/admin") ? "admin" : "patient";

    if (role === "admin") {
      const existingdAdmin = await User.findOne({ role: "admin" });
      if (existingdAdmin)
        return res.status(400).json({ message: "Admin already registered" });
    }
    const existingUser = await User.findOne({ email });
    if (existingUser)
      return res.status(400).json({ message: "email already registered" });

    const newUser = await createUser({
      firstname,
      lastname,
      email,
      password,
      role,
    });
    const userObj = newUser.toObject();
    delete userObj.password;
    res
      .status(201)
      .json({ message: "Account resgister succesfull", user: userObj });
  } catch (error) {
    error.status = 400;
    console.log(error);

    next(error);
  }
};

const userLoginController = async (req, res, next) => {
  try {
    const { email, password, remembar } = req.body;
    const role = req.baseUrl.includes("/admin") ? "admin" : "patient";
    const { user, token, expiresIn } = await loginUser({
      email,
      password,
      remembar,
      role,
    });
    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: remembar ? 30 * 24 * 60 * 60 * 1000 : 24 * 60 * 60 * 1000,
    });
    res.status(200).json({
      message: "login successful",
      user,
      token,
      expiresIn,
    });
  } catch (error) {
    console.log(error);
    error.status = 400;
    next(error);
  }
};

const getUserController = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const role = req.baseUrl.includes("/admin") ? "admin" : "patient";
    const user = await getUser(userId, role);
    res.status(200).json(user);
  } catch (error) {
    error.status = 400;
    console.log(error);

    next(error);
  }
};

const deleteUserController = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const role = req.baseUrl.includes("/admin") ? "admin" : "patient";
    const { password } = req.body;
    const message = await deleteUser({ id: userId, password, role });
    res.status(200).json({ message: message });
  } catch (error) {
    error.status = 400;
    console.log(error);

    next(error);
  }
};

module.exports = {
  userSignupController,
  userLoginController,
  getUserController,
  deleteUserController,
};
