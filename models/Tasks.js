const mongoose = require("mongoose");

const initState = {
  Lists: [
    {
      id: "1",
      title: "Getting Started",
      group: 1,
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
  state: { type: JSON, default: JSON.stringify(initState) },
});

module.exports = mongoose.model("Tasks", TasksSchema);
