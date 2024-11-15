const mongoose = require("mongoose");

const TodoSchema = new mongoose.Schema(
  {
        owner: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true }, 
        title: { type: String, required: true },
        completed: { type: Boolean, default: false }, 
        assignee: { type: String }, 
        priority: {
          type: String,
          enum: ["low", "medium", "high"],
          default: "medium",
        },
        dueDate: { type: Date }, 
      },
  { timestamps: true } 
);

const Todo = mongoose.model("Todo", TodoSchema);

module.exports = { Todo };
