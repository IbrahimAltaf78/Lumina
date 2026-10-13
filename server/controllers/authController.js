const User = require("../models/User");
const jwt  = require("jsonwebtoken");

// ── Generate JWT ─────────────────────────
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN
  });
};

// ── Register ─────────────────────────────
const register = async (req, res, next) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({ error: "All fields are required" });
    }

    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({ error: "Email already registered" });
    }

    const user = await User.create({ name, email, password });

    res.status(201).json({
      _id:   user._id,
      name:  user.name,
      email: user.email,
      plan:  user.plan,
      token: generateToken(user._id)
    });
  } catch (err) {
    next(err);
  }
};

// ── Login ─────────────────────────────────
const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ error: "Email and password are required" });
    }

    const user = await User.findOne({ email });
    if (!user || !(await user.comparePassword(password))) {
      return res.status(401).json({ error: "Invalid email or password" });
    }

    res.json({
      _id:   user._id,
      name:  user.name,
      email: user.email,
      plan:  user.plan,
      token: generateToken(user._id)
    });
  } catch (err) {
    next(err);
  }
};

// ── Get current user ──────────────────────
const getMe = async (req, res, next) => {
  try {
    res.json(req.user);
  } catch (err) {
    next(err);
  }
};

// ── Update profile ────────────────────────
const updateProfile = async (req, res, next) => {
  try {
    const { name, currentPassword, newPassword } = req.body;
    const user = await User.findById(req.user._id);

    if (name) user.name = name;

    if (currentPassword && newPassword) {
      const match = await user.comparePassword(currentPassword);
      if (!match) {
        return res.status(400).json({ error: "Current password is incorrect" });
      }
      if (newPassword.length < 6) {
        return res.status(400).json({ error: "Password must be at least 6 characters" });
      }
      user.password = newPassword;
    }

    await user.save();
    res.json({ message: "Profile updated", name: user.name });
  } catch (err) {
    next(err);
  }
};

// ── Delete account ────────────────────────
const deleteAccount = async (req, res, next) => {
  try {
    const Conversation = require("../models/Conversation");
    const Message      = require("../models/Message");

    const convos = await Conversation.find({ user: req.user._id });
    for (const c of convos) {
      await Message.deleteMany({ conversation: c._id });
    }
    await Conversation.deleteMany({ user: req.user._id });
    await User.findByIdAndDelete(req.user._id);

    res.json({ message: "Account deleted successfully" });
  } catch (err) {
    next(err);
  }
};

module.exports = { register, login, getMe, updateProfile, deleteAccount };