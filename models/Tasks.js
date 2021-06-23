const mongoose = require("mongoose");

const initState = {
  Lists: [
    {
      id: "1",
      title: "Getting Started",
    },
  ],
  Tasks: [
    {
      id: "1",
      title: "Welcome to Microsoft's To Do clone",
      isChecked: true,
      addedToMyDay: null,
      Important: true,
      Planned: null,
      parentListId: "1",
      createdAt: 1602294834230,
    },
  ],
  Steps: [
    {
      parentTaskId: "1",
      id: "111",
      title: "Play around with the app and figure things out",
      isChecked: false,
    },
  ],
};

const TasksSchema = new mongoose.Schema({
  _user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  lists: { type: JSON, default: JSON.stringify(initState.Lists) },
  tasks: { type: JSON, default: JSON.stringify(initState.Tasks) },
  steps: { type: JSON, default: JSON.stringify(initState.Steps) },
});

module.exports = mongoose.model("Tasks", TasksSchema);
