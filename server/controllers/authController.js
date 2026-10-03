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

module.exports = { register, login, getMe };