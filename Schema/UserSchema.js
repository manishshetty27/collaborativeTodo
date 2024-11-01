const mongoose = require("mongoose");

// User Schema
const UserSchema = new mongoose.Schema(
  {
    userName: { type: String, unique: true, required: true },
    name: { type: String, required: true },
    email: { type: String, unique: true, required: true },
    password: { type: String, required: true },
  },
  { timestamps: true }
);




const User = mongoose.model("User", UserSchema);

module.exports = {User}