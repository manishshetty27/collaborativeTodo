const mongoose = require("mongoose");

// User Schema
const UserSchema = new mongoose.Schema(
  {
    userName: { type: String, unique: true, required: true },
    name: { type: String, required: true },
    email: { type: String, unique: true, required: true },
    password: { type: String, required: true },
  },
  { timestamps: true }
);

// Task Schema
const UserTodoSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    description: { type: String},
    completed: { type: Boolean, default: false },
    assignee: String,
    priority: {
      type: { type: String, required: true },
      enum: ["low", "medium", "high"]
    },
    dueDate: Date,
  },
  { timestamps: true }
);

// To-Do List Schema
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

// Models
const User = mongoose.model("User", UserSchema);
const UserTodo = mongoose.model("UserTodo", UserTodoSchema);
const TeamTodo = mongoose.model("TeamTodo", TeamTodoSchema);

module.exports = {
  User,
  UserTodo,
  TeamTodo
}