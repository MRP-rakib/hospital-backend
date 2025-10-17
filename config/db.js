require('dotenv').config()
const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    await mongoose.connect(`${process.env.MONGOOSE}/hospital-backend`);
    console.log("mongoose connected");
  } catch (error) {
    console.log(error);
  }
};

module.exports = connectDB;
