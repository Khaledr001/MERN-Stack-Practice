const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    fName: String,
    lName: String,
    email: String,
    age: Number,
    password: String,
  },
  { timestamps: true }
);

const UserModel = mongoose.model("user", userSchema);

module.exports = UserModel;
