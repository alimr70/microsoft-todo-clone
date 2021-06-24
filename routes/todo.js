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
    console.log(err);
    res.status(500).json({ msg: "Something went wrong", err: err });
  }
});

router.post("/addList", authMiddleware, async (req, res) => {
  try {
    const newList = req.body.list;
    const user = await User.findOne({ id: req.user.id }).populate(
      "tasks",
      "lists"
    );
    const lists = await JSON.parse(user.tasks.lists);
    lists.push(newList);
    const updated = await Tasks.findOneAndUpdate(
      { _id: user.tasks._id },
      { lists: JSON.stringify(lists) },
      { rawResult: true }
    );
    if (updated.lastErrorObject.updatedExisting) {
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
    const user = await User.findOne({ id: req.user.id }).populate(
      "tasks",
      "tasks"
    );
    const tasks = await JSON.parse(user.tasks.tasks);
    tasks.push(newTask);
    const updated = await Tasks.findOneAndUpdate(
      { _id: user.tasks._id },
      { tasks: JSON.stringify(tasks) },
      { rawResult: true }
    );
    if (updated.lastErrorObject.updatedExisting) {
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
    const user = await User.findOne({ id: req.user.id }).populate(
      "tasks",
      "steps"
    );
    const steps = await JSON.parse(user.tasks.steps);
    steps.push(newStep);
    const updated = await Tasks.findOneAndUpdate(
      { _id: user.tasks._id },
      { steps: JSON.stringify(steps) },
      { rawResult: true }
    );
    if (updated.lastErrorObject.updatedExisting) {
      res.status(200).json({ msg: "Steps updated" });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: "Something went wrong", err: err });
  }
});

router.post("/editList", authMiddleware, (req, res) => {});

module.exports = router;
