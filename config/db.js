require("dotenv").config();
const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGOOSE,{
      useNewUrlParser:true,
      useUnifiedTopology: true
    });
    console.log("mongoose connected");
  } catch (error) {
    console.log(error);
  }
};

module.exports = connectDB;
