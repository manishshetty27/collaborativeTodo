const mongoose = require("mongoose");

const UserTodoSchema = new mongoose.Schema(
    {
      title: { type: String, required: true },
      description: { type: String},
      completed: { type: Boolean, default: false },
      assignee: String,
      priority: {
        type: String,
        required: true,
        enum: ["low", "medium", "high"],
      },
      dueDate: Date,
    },
    { timestamps: true }
  );

const UserTodo = mongoose.model("UserTodo", UserTodoSchema);
module.exports = {UserTodo}