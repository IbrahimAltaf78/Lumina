const express = require("express")
const router  = express.Router()
const { register, login, getMe, updateProfile, deleteAccount } = require("../controllers/authController")
const { protect } = require("../middleware/authMiddleware")
const { authLimiter } = require("../middleware/rateLimiter")

router.post("/register",  authLimiter, register)
router.post("/login",     authLimiter, login)
router.get("/me",         protect, getMe)
router.patch("/update",   protect, updateProfile)
router.delete("/delete",  protect, deleteAccount)

module.exports = router