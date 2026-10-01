const mongoose = require("mongoose");

const conversationSchema = new mongoose.Schema({
  user:      { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  title:     { type: String, default: "New Chat" },
  model:     { type: String, default: "claude-sonnet-4-6" },
  messages:  [{ type: mongoose.Schema.Types.ObjectId, ref: "Message" }],
  isPinned:  { type: Boolean, default: false }
}, { timestamps: true });

module.exports = mongoose.model("Conversation", conversationSchema);