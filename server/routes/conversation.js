const express = require("express");
const router  = express.Router();
const { protect } = require("../middleware/authMiddleware");
const {
  createConversation,
  getConversations,
  getConversation,
  updateTitle,
  deleteConversation,
  togglePin
} = require("../controllers/conversationController");

// All routes are protected
router.use(protect);

router.route("/")
  .post(createConversation)
  .get(getConversations);

router.route("/:id")
  .get(getConversation)
  .delete(deleteConversation);

router.patch("/:id/title", updateTitle);
router.patch("/:id/pin",   togglePin);

module.exports = router;