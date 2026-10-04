const Conversation = require("../models/Conversation");
const Message      = require("../models/Message");

// ── Create new conversation ───────────────
const createConversation = async (req, res, next) => {
  try {
    const { title, model } = req.body;

    const conversation = await Conversation.create({
      user:  req.user._id,
      title: title || "New Chat",
      model: model || "claude-sonnet-4-6"
    });

    res.status(201).json(conversation);
  } catch (err) {
    next(err);
  }
};

// ── Get all user conversations ────────────
const getConversations = async (req, res, next) => {
  try {
    const conversations = await Conversation.find({ user: req.user._id })
      .sort({ updatedAt: -1 })
      .select("title model isPinned createdAt updatedAt");

    res.json(conversations);
  } catch (err) {
    next(err);
  }
};

// ── Get single conversation + messages ────
const getConversation = async (req, res, next) => {
  try {
    const conversation = await Conversation.findOne({
      _id:  req.params.id,
      user: req.user._id
    });

    if (!conversation) {
      return res.status(404).json({ error: "Conversation not found" });
    }

    const messages = await Message.find({ conversation: conversation._id })
      .sort({ createdAt: 1 });

    res.json({ conversation, messages });
  } catch (err) {
    next(err);
  }
};

// ── Update conversation title ─────────────
const updateTitle = async (req, res, next) => {
  try {
    const { title } = req.body;

    const conversation = await Conversation.findOneAndUpdate(
      { _id: req.params.id, user: req.user._id },
      { title },
      { new: true }
    );

    if (!conversation) {
      return res.status(404).json({ error: "Conversation not found" });
    }

    res.json(conversation);
  } catch (err) {
    next(err);
  }
};

// ── Delete conversation + its messages ────
const deleteConversation = async (req, res, next) => {
  try {
    const conversation = await Conversation.findOne({
      _id:  req.params.id,
      user: req.user._id
    });

    if (!conversation) {
      return res.status(404).json({ error: "Conversation not found" });
    }

    await Message.deleteMany({ conversation: conversation._id });
    await conversation.deleteOne();

    res.json({ message: "Conversation deleted" });
  } catch (err) {
    next(err);
  }
};

// ── Toggle pin conversation ───────────────
const togglePin = async (req, res, next) => {
  try {
    const conversation = await Conversation.findOne({
      _id:  req.params.id,
      user: req.user._id
    });

    if (!conversation) {
      return res.status(404).json({ error: "Conversation not found" });
    }

    conversation.isPinned = !conversation.isPinned;
    await conversation.save();

    res.json(conversation);
  } catch (err) {
    next(err);
  }
};

module.exports = {
  createConversation,
  getConversations,
  getConversation,
  updateTitle,
  deleteConversation,
  togglePin
};