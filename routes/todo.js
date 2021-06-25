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

router.post("/editList", authMiddleware, async (req, res) => {
  try {
    const editedList = req.body.list;
    const user = await User.findOne({ id: req.user.id }).populate(
      "tasks",
      "lists"
    );
    const lists = await JSON.parse(user.tasks.lists);
    const oldList = lists.find((list) => list.id === editedList.id);
    oldList.title = editedList.title;
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

router.post("/editTask", authMiddleware, async (req, res) => {
  try {
    const editedTask = req.body.task;
    const user = await User.findOne({ id: req.user.id }).populate(
      "tasks",
      "tasks"
    );
    const tasks = await JSON.parse(user.tasks.tasks);
    const oldTask = tasks.find((task) => task.id === editedTask.id);
    oldTask.title = editedTask.title;
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

router.post("/editStep", authMiddleware, async (req, res) => {
  try {
    const editedStep = req.body.step;
    const user = await User.findOne({ id: req.user.id }).populate(
      "tasks",
      "steps"
    );
    const steps = await JSON.parse(user.tasks.steps);
    const oldStep = steps.find((step) => step.id === editedStep.id);
    oldStep.title = editedStep.title;
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

router.post("/checkTask", authMiddleware, async (req, res) => {
  try {
    const checkedTask = req.body.task;
    const user = await User.findOne({ id: req.user.id }).populate(
      "tasks",
      "tasks"
    );
    const tasks = await JSON.parse(user.tasks.tasks);
    const oldTask = tasks.find((task) => task.id === checkedTask.id);
    oldTask.isChecked = checkedTask.isChecked;
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

router.post("/checkStep", authMiddleware, async (req, res) => {
  try {
    const checkedStep = req.body.step;
    const user = await User.findOne({ id: req.user.id }).populate(
      "tasks",
      "steps"
    );
    const steps = await JSON.parse(user.tasks.steps);
    const oldStep = steps.find((step) => step.id === checkedStep.id);
    oldStep.isChecked = checkedStep.isChecked;
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

router.post("/addToMyDay", authMiddleware, async (req, res) => {
  try {
    const addToMyDayTask = req.body.task;
    const user = await User.findOne({ id: req.user.id }).populate(
      "tasks",
      "tasks"
    );
    const tasks = await JSON.parse(user.tasks.tasks);
    const oldTask = tasks.find((task) => task.id === addToMyDayTask.id);
    oldTask.addedToMyDay = addToMyDayTask.addedToMyDay;
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

router.post("/dueDate", authMiddleware, async (req, res) => {
  try {
    const dueDateTask = req.body.task;
    const user = await User.findOne({ id: req.user.id }).populate(
      "tasks",
      "tasks"
    );
    const tasks = await JSON.parse(user.tasks.tasks);
    const oldTask = tasks.find((task) => task.id === dueDateTask.id);
    oldTask.Planned = dueDateTask.Planned;
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

router.post("/important", authMiddleware, async (req, res) => {
  try {
    const importantTask = req.body.task;
    const user = await User.findOne({ id: req.user.id }).populate(
      "tasks",
      "tasks"
    );
    const tasks = await JSON.parse(user.tasks.tasks);
    const oldTask = tasks.find((task) => task.id === importantTask.id);
    oldTask.Important = importantTask.Important;
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

router.post("/deleteList", authMiddleware, async (req, res) => {
  try {
    const deletedList = req.body.list;
    const user = await User.findOne({ id: req.user.id }).populate(
      "tasks",
      "lists"
    );
    const lists = await JSON.parse(user.tasks.lists);
    const newLists = lists.filter((list) => list.id !== deletedList.id);
    const updated = await Tasks.findOneAndUpdate(
      { _id: user.tasks._id },
      { lists: JSON.stringify(newLists) },
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

router.post("/deleteTask", authMiddleware, async (req, res) => {
  try {
    const deletedTask = req.body.task;
    const user = await User.findOne({ id: req.user.id }).populate(
      "tasks",
      "tasks"
    );
    const tasks = await JSON.parse(user.tasks.tasks);
    const newTasks = tasks.filter((task) => task.id !== deletedTask.id);
    const updated = await Tasks.findOneAndUpdate(
      { _id: user.tasks._id },
      { tasks: JSON.stringify(newTasks) },
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

router.post("/deleteStep", authMiddleware, async (req, res) => {
  try {
    const deletedStep = req.body.step;
    const user = await User.findOne({ id: req.user.id }).populate(
      "tasks",
      "steps"
    );
    const steps = await JSON.parse(user.tasks.steps);
    const newSteps = steps.filter((step) => step.id !== deletedStep.id);
    const updated = await Tasks.findOneAndUpdate(
      { _id: user.tasks._id },
      { steps: JSON.stringify(newSteps) },
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

module.exports = router;
