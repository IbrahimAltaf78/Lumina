const express   = require("express");
const router    = express.Router();
const { protect } = require("../middleware/authMiddleware");
const { aiLimiter } = require("../middleware/rateLimiter");
const { chat }  = require("../controllers/aiController");

router.post("/chat", protect, aiLimiter, chat);

module.exports = router;