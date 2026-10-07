require("express-async-errors");
const express  = require("express");
const mongoose = require("mongoose");
const cors     = require("cors");
const helmet   = require("helmet");
const morgan   = require("morgan");
require("dotenv").config();

const app = express();

// ── Middleware ──────────────────────────────────
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors({ origin: process.env.CLIENT_URL, credentials: true }));
app.use(helmet());
app.use(morgan("dev"));

// ── Routes ──────────────────────────────────────
app.use("/api/auth",          require("./routes/auth"));
app.use("/api/conversations", require("./routes/conversation"));
app.use("/api/ai",            require("./routes/ai"));

// ── Health check ────────────────────────────────
app.get("/", (req, res) => {
  res.json({ message: "✦ Lumina API is running" });
});

// ── Global error handler ────────────────────────
app.use((err, req, res, next) => {
  console.error(err.message);
  res.status(err.status || 500).json({
    error: err.message || "Server Error"
  });
});

// ── Connect DB then start server ─────────────────
const PORT = process.env.PORT || 5000;

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("✦ MongoDB connected");
    app.listen(PORT, () =>
      console.log(`✦ Lumina server running on port ${PORT}`)
    );
  })
  .catch((err) => console.error("✦ DB connection failed:", err.message));