const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const validator = require("validator");

const Schema = mongoose.Schema;

const userSchema = new Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  isAdmin: { type: Boolean, default: false },
});

const invitationSchema = new Schema({
  code: { type: String, required: true, unique: true },
  used: { type: Boolean, default: false },
});

// static signup method, hash password
userSchema.statics.signup = async function (email, password, invitationCode) {
  if (!email || !password || !invitationCode) {
    throw Error("All fields must be filled");
  }
  if (!validator.isEmail(email)) {
    throw Error("Email is not valid");
  }
  if (!validator.isStrongPassword(password)) {
    throw Error("Password not strong enough");
  }

  // Check if the invitation code is valid
  const invitation = await Invitation.findOne({ code: invitationCode });
  if (!invitation || invitation.used) {
    throw new Error("Invalid or used invitation code");
  }

  // Check if the email is already in use
  const exists = await this.findOne({ email });
  if (exists) {
    throw new Error("Email already in use");
  }

  try {
    const saltRounds = 10;
    const hash = await bcrypt.hash(password, saltRounds);

    const user = await this.create({ email, password: hash });

    // Delete invitation after use.
    await Invitation.findOneAndDelete({ code: invitationCode });

    return user;
  } catch (error) {
    console.error("Error hashing password or creating user:", error);
    throw new Error("Failed to create user");
  }
};

userSchema.statics.login = async function (email, password) {
  if (!email || !password) {
    throw Error("All fields must be filled");
  }

  const user = await this.findOne({ email });

  if (!user) {
    throw new Error("No accounts under this email");
  }

  const match = await bcrypt.compare(password, user.password);

  if (!match) {
    throw new Error("Incorrect password");
  }

  return user;
};

const User = mongoose.model("User", userSchema);
const Invitation = mongoose.model("Invitation", invitationSchema);

module.exports = { User, Invitation };
