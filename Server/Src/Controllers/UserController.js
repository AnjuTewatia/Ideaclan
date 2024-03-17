const bcrypt = require("bcrypt");
require("dotenv").config();
const jwt = require("jsonwebtoken");
const { UserModel } = require("../Models/UserModel");

const register = async (req, res) => {
  const { email, name, phoneNumber, password } = req.body;

  try {
    const hashedpass = await bcrypt.hash(password, bcrypt.genSaltSync(10));
    const user = new UserModel({
      name,
      email,
      phoneNumber,
      password: hashedpass,
    });
    await user.save();
    res.send("registered successfully", user);
  } catch (error) {
    res.send(error.message);
  }
};

const login = async (req, res) => {
  const { phoneNumber, password } = req.body;

  try {
    const user = await UserModel.findOne({ phoneNumber });
    if (user) {
      let result = await bcrypt.compare(password, user.password);
      if (result) {
        const token = jwt.sign({ userId: user._id }, process.env.SECRET_KEY);
        res.send({ msg: "logged in", token, user });
      } else {
        res.send("wrong credentials");
      }
    } else {
      res.send("Please register");
    }
  } catch (error) {
    res.send(error.message);
  }
};

const allusers = async (req, res) => {
  try {
    let product = await UserModel.find();
    res.status(200).send({ message: "all Users", product });
  } catch (error) {
    return res.status(400).send(error.message);
  }
};
module.exports = { register, login, allusers };
