const bcrypt = require("bcryptjs");
const { generateToken } = require("../config/utils.js");
const User = require("../models/user.model.js");
const UserDetails = require("../models/userDetails.model.js");
require("dotenv").config();

const register = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    const getUsername = username.toLowerCase();
    const getEmail = email.toLowerCase();

    const checkAlreadyExist = await User.findOne({ email: getEmail });
    if (checkAlreadyExist) {
      return res.status(400).json({ msg: "User already exists" });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = new User({
      username: getUsername,
      email: getEmail,
      password: hashedPassword,
    });

    const user = await newUser.save();

    if (!user) {
      return res.status(400).json({ msg: "User not created" });
    }

    generateToken(user._id, res);

    return res.status(201).json({
      msg: "Registration successful",
      user: {
        _id: user._id,
        username: user.username,
        email: user.email,
      },
    });
  } catch (err) {
    console.error("Register Controller Error: " + err.message);
    return res.status(500).json({ msg: "Internal Server Error" });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ msg: "Please fill in all fields" });
    }

    const user = await User.findOne({ email: email.toLowerCase() });
    if (!user) {
      return res.status(400).json({ msg: "User does not exist" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ msg: "Invalid credentials" });
    }

    generateToken(user._id, res);

    return res.status(200).json({
      msg: "Login successful",
      user: {
        _id: user._id,
        username: user.username,
        email: user.email,
      },
    });
  } catch (err) {
    console.error("Login Controller Error: " + err.message);
    res.status(500).json({ msg: "Internal Server Error" });
  }
};

const verify = async (req, res) => {
  try {
    const user = req.user;
    return res.status(200).json({ user });
  } catch (err) {
    console.error("Verify Controller Error: " + err.message);
    res.status(500).json({ msg: "Internal Server Error" });
  }
};

const logout = async (req, res) => {
  try {
    res.cookie("jwt", "", { maxAge: 0 });
    return res.status(200).json({ msg: "Logout successful" });
  } catch (err) {
    console.error("Logout Controller Error: " + err.message);
    res.status(500).json({ msg: "Internal Server Error" });
  }
};

const profile = async (req, res) => {
  try {
    const user = req.user;
    const { mobile } = req.body;

    if (!user) {
      return res.status(400).json({ msg: "User not found" });
    }
    
    const checkUserDetails = await UserDetails.findOne({ userId: user._id });

    if (!checkUserDetails) {
      const addUserDetails = await UserDetails.create({
        mobile: mobile,
        userId: user._id,
      });
      return res.status(200).json({
        msg: "User details created successfully",
        userDetails: addUserDetails,
      });
    }

    const updateUserDetails = await UserDetails.findOneAndUpdate(
      { userId: user._id },
      { mobile: mobile },
      { new: true }
    );

    // console.log("debugging...")

    return res.status(200).json({
      userDetails: updateUserDetails,
      msg: "User details updated successfully",
    });
  } catch (err) {
    console.error("Profile Controller Error: " + err.message);
    res.status(500).json({ msg: "Internal Server Error" });
  }
};

const getProfileData = async (req, res) => {
  try {
    const user = req.user;
    console.log(user);
    const getUserDetails = await UserDetails.findOne({ userId: user._id });
    if (!getUserDetails) {
      return res.status(404).json({ msg: "Please add your details" });
    }

    return res.status(200).json({ userDetails: getUserDetails });
  } catch (err) {
    console.error("Profile Controller Error: " + err.message);
    res.status(500).json({ msg: "Internal Server Error" });
  }
};

module.exports = { register, login, verify, logout, profile, getProfileData };
