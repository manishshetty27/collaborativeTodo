const { 
  createTodoValidation, 
  updateTodoValidation, 
  deleteTodoValidation, 
  assignTaskToUserValidation 
} = require("../validation/todoValidation");

const { Todo } = require("../models/TodoSchema");
const { List } = require("../models/ListSchema");
const { User } = require("../models/UserSchema");

// Create a new todo
const createTodo = async (req, res) => {
  try {
    const parsedData = createTodoValidation.safeParse(req.body);

    if (!parsedData.success) {
      return res.status(400).json({
        message: "Validation failed",
        errors: parsedData.error.issues,
      });
    }

    const { title, assignee, priority, dueDate, listId } = parsedData.data;

    const list = await List.findById(listId);
    if (!list) {
      return res.status(404).json({ message: "List not found" });
    }

    const newTodo = await Todo.create({
      owner: req.userId,
      title,
      assignee,
      priority,
      dueDate,
    });

    list.tasks.push(newTodo._id);
    await list.save();

    res.status(201).json(newTodo);
  } catch (error) {
    res.status(500).json({ message: "Error creating Todo", error: error.message });
  }
};

// Update an existing todo
const updateTodo = async (req, res) => {
  try {
    const parsedData = updateTodoValidation.safeParse(req.body);

    if (!parsedData.success) {
      return res.status(400).json({
        message: "Validation failed",
        errors: parsedData.error.issues,
      });
    }

    const { todoId, title, assignee, priority, dueDate, completed } = parsedData.data;

    const updatedTodo = await Todo.findByIdAndUpdate(
      todoId,
      { title, assignee, priority, dueDate, completed },
      { new: true }
    );

    if (!updatedTodo) {
      return res.status(404).json({ message: "Todo not found" });
    }

    res.status(200).json(updatedTodo);
  } catch (error) {
    res.status(500).json({ message: "Error updating Todo", error: error.message });
  }
};

// Delete a todo
const deleteTodo = async (req, res) => {
  try {
    const parsedData = deleteTodoValidation.safeParse(req.body);

    if (!parsedData.success) {
      return res.status(400).json({
        message: "Validation failed",
        errors: parsedData.error.issues,
      });
    }

    const { todoId, listId } = parsedData.data;

    const todo = await Todo.findByIdAndDelete(todoId);
    if (!todo) {
      return res.status(404).json({ message: "Todo not found" });
    }

    const list = await List.findById(listId);
    if (list) {
      list.tasks = list.tasks.filter((taskId) => taskId.toString() !== todoId);
      await list.save();
    }

    res.status(200).json({ message: "Todo deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting Todo", error: error.message });
  }
};

// Assign a task to a user
const assignTaskToUser = async (req, res) => {
  try {
    const parsedData = assignTaskToUserValidation.safeParse(req.body);

    if (!parsedData.success) {
      return res.status(400).json({
        message: "Validation failed",
        errors: parsedData.error.issues,
      });
    }

    const { taskId, userId } = parsedData.data;

    const task = await Todo.findById(taskId);
    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const assignedBy = req.user._id;

    task.assignee = user._id;
    task.assignedBy = assignedBy;
    await task.save();

    res.status(200).json({
      message: "Task assigned successfully",
      task,
    });
  } catch (error) {
    res.status(500).json({ message: "Failed to assign task", error: error.message });
  }
};

module.exports = {
  createTodo,
  updateTodo,
  deleteTodo,
  assignTaskToUser,
};
