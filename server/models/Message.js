const mongoose = require("mongoose");

const messageSchema = new mongoose.Schema({
  conversation: { type: mongoose.Schema.Types.ObjectId, ref: "Conversation", required: true },
  role:         { type: String, enum: ["user", "assistant"], required: true },
  content:      { type: String, required: true },
  tokens:       { type: Number, default: 0 }
}, { timestamps: true });

module.exports = mongoose.model("Message", messageSchema);