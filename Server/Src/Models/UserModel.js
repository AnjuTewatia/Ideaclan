const mongoose = require("mongoose");

const UserSchema = mongoose.Schema(
  {
    email: String,
    name: String,
    phoneNumber: Number,
    password: String,
    userId: String,
  },

  {
    verion: false,
  }
);

const UserModel = mongoose.model("users", UserSchema);

module.exports = { UserModel };
