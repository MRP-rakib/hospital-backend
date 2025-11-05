const mongoose = require("mongoose");
const userSchema = new mongoose.Schema(
  {
    firstname: { type: String, required: true },
    lastname: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true , minlength:6},
    image:{type:String, default:''},
    role: { type: String, enum: ["admin", "patient"], default: "patient" },
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", userSchema);
