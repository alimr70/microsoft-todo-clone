const express = require("express");
const authMiddleware = require("../middleware/authMiddleware");
const router = express.Router();
const User = require("../models/User");

/**
 * @route   POST auth/login
 * @desc    Login user
 * @access  Public
 */

router.get("/getTasks", authMiddleware, async (req, res) => {
  try {
    const id = req.user.id;
    let user = await User.findOne({ id: id }).populate("tasks", "state");
    res.json({ state: JSON.parse(user.tasks.state) });
  } catch (err) {
    throw err;
  }
});

module.exports = router;
