const mongoose = require("mongoose");

const TeamTodoSchema = new mongoose.Schema(
    {
      owner: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
      title: String,
      description: { type: String},
      tasks: [UserTodoSchema],
      collaborators: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
    },
    { timestamps: true }
  );

const TeamTodo = mongoose.model("TeamTodo", TeamTodoSchema);

module.exports = {TeamTodo}