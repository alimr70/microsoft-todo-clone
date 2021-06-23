const express = require("express");
const authMiddleware = require("../middleware/authMiddleware");
const router = express.Router();
const User = require("../models/User");
const Tasks = require("../models/Tasks");

/**
 * @route   POST auth/login
 * @desc    Login user
 * @access  Public
 */

router.get("/getState", authMiddleware, async (req, res) => {
  try {
    const user = await User.findOne({ id: req.user.id }).populate(
      "tasks",
      "lists tasks steps"
    );
    res.json({
      Lists: JSON.parse(user.tasks.lists),
      Tasks: JSON.parse(user.tasks.tasks),
      Steps: JSON.parse(user.tasks.steps),
    });
  } catch (err) {
    res.status(500).json({ msg: "Something went wrong", err: err });
  }
});

router.post("/addList", authMiddleware, async (req, res) => {
  try {
    const newList = req.body.list;
    const user = await User.findOne({ id: req.user.id });
    const userTasks = await Tasks.findById(user.tasks);
    const lists = await JSON.parse(userTasks.lists);
    const updatedTasks = await userTasks.updateOne({
      lists: JSON.stringify([...lists, newList]),
    });
    if (updatedTasks.ok === 1) {
      res.status(200).json({ msg: "Lists updated" });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: "Something went wrong", err: err });
  }
});

router.post("/addTask", authMiddleware, async (req, res) => {
  try {
    const newTask = req.body.task;
    const user = await User.findOne({ id: req.user.id });
    const userTasks = await Tasks.findById(user.tasks);
    const tasks = await JSON.parse(userTasks.tasks);
    const updatedTasks = await userTasks.updateOne({
      tasks: JSON.stringify([...tasks, newTask]),
    });
    if (updatedTasks.ok === 1) {
      res.status(200).json({ msg: "Tasks updated" });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: "Something went wrong", err: err });
  }
});

router.post("/addStep", authMiddleware, async (req, res) => {
  try {
    const newStep = req.body.step;
    const user = await User.findOne({ id: req.user.id });
    const userTasks = await Tasks.findById(user.tasks);
    const steps = await JSON.parse(userTasks.steps);
    const updatedTasks = await userTasks.updateOne({
      steps: JSON.stringify([...steps, newStep]),
    });
    if (updatedTasks.ok === 1) {
      res.status(200).json({ msg: "Steps updated" });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: "Something went wrong", err: err });
  }
});

module.exports = router;
