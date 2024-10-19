require("dotenv").config();

const { User, Invitation } = require("../models/userModel");
const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");
const crypto = require("crypto");
const mongoose = require("mongoose");

const createToken = (_id) => {
  return jwt.sign({ _id: _id }, process.env.SECRET, { expiresIn: "3d" });
};

const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.login(email, password);

    const isAdmin = user.isAdmin;

    const token = createToken(user._id);

    res.status(200).json({ email, token, isAdmin });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// signup user
const signupUser = async (req, res) => {
  const { email, password, invitationCode } = req.body;

  try {
    const user = await User.signup(email, password, invitationCode);

    const token = createToken(user._id);

    res.status(200).json({ email, token });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL,
    pass: process.env.PASSWORD,
  },
});

const generateInvitationCode = () => {
  // Generate a random value
  const randomValue = crypto.randomBytes(16).toString("hex");

  // Generate a timestamp
  const timestamp = Date.now().toString(36); // Base36 encoding for shorter length

  // Combine the random value and timestamp to form the invitation code
  const invitationCode = `${timestamp}-${randomValue}`;

  return invitationCode;
};

const allUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
};

const deleteUser = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "Invalid User ID" });
  }

  const user = await User.findOneAndDelete({ _id: id });

  if (!user) {
    return res.status(404).json({ error: "User Not Found." });
  }

  res.status(200).json(user);
};

const pendingInvites = async (req, res) => {
  try {
    const invites = await Invitation.find();
    res.status(200).json(invites);
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
};

const sendInvitation = async (req, res) => {
  const { email } = req.body;

  if (!email) {
    console.error("Missing email parameter");
    return res.status(400).json({ message: "Email is required" });
  }

  const invitationCode = generateInvitationCode();

  // Save the invitation code to the database
  try {
    await Invitation.create({ code: invitationCode, email });

    console.log("Trying to send email to " + email);

    const registrationLink = `https://driving-instructor-app-1.onrender.com/signup?invitationCode=${invitationCode}`;

    const subject = "Welcome! Complete Your Registration";
    const html = `
      <p>Thank you for your interest in our service.</p>
      <p>Please complete your registration by using the following link:</p>
      <p><a href="${registrationLink}">${registrationLink}</a></p>
    `;

    await transporter.sendMail({
      from: "pierrelguichard@gmail.com",
      to: email,
      subject,
      html,
    });

    console.log("Email sent successfully to " + email);
    res.status(200).json({ message: "Invitation sent successfully" });
  } catch (error) {
    console.error("Error sending email or saving invitation:", error);
    res
      .status(500)
      .json({ message: "Error sending email or saving invitation" });
  }
};

module.exports = {
  loginUser,
  signupUser,
  sendInvitation,
  pendingInvites,
  allUsers,
  deleteUser,
};
