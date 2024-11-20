const express = require("express");
const router = express.Router();
const {
  createTodo,
  updateTodo,
  deleteTodo,
  assignTaskToUser,
} = require("../controllers/todoController");

// Route to create a new todo
router.post("/create", createTodo);

// Route to update an existing todo
router.put("/update", updateTodo);

// Route to delete a todo
router.delete("/delete", deleteTodo);

// Route to assign a task to a user
router.post("/assign", assignTaskToUser);

module.exports = router;
