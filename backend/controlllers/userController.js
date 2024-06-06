const User = require("../models/userModel");
const bcrypt = require("bcryptjs");

const userLogin = async (req, res) => {
  const { username, password } = req.body;

  try {
    const user = await User.findOne({ username });
    if (!user) {
      res.send({ success: false, message: "User doesn't exist" });
    }
    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      res.send({ success: false, message: "Wrong password" });
    }
    res.send({ success: true, message: "User is verified", user });
  } catch (error) {
    res.send({ success: false, message: "An error occurred during login" });
  }
};

const userSignup = async (req, res) => {
  const { name, username, password } = req.body;

  try {
    const existingUser = await User.findOne({ username });
    if (existingUser) {
      res.send({ success: false, message: "Username is already taken" });
    }
    const hashedPassword = await bcrypt.hash(password, 8);
    await User.create({
      name,
      username,
      password: hashedPassword,
    });
    res.send({ success: true, message: "User signed up successfully" });
  } catch (error) {
    res.send({ success: false, message: "An error occurred during signup" });
  }
};

module.exports = {
  userLogin,
  userSignup,
};
