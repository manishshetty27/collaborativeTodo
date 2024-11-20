const { z } = require("zod");

// Validation schema for creating a todo
const createTodoValidation = z.object({
  title: z.string().min(1, { message: "Title is required" }),
  assignee: z.string().optional(),
  priority: z.enum(["low", "medium", "high"]).optional(),
  dueDate: z.string().optional(),
  listId: z.string().min(1, { message: "List ID is required" }),
});

// Validation schema for updating a todo
const updateTodoValidation = z.object({
  todoId: z.string().min(1, { message: "Todo ID is required" }),
  title: z.string().optional(),
  assignee: z.string().optional(),
  priority: z.enum(["low", "medium", "high"]).optional(),
  dueDate: z.string().optional(),
  completed: z.boolean().optional(),
});

// Validation schema for deleting a todo
const deleteTodoValidation = z.object({
  todoId: z.string().min(1, { message: "Todo ID is required" }),
  listId: z.string().min(1, { message: "List ID is required" }),
});

// Validation schema for assigning a task to a user
const assignTaskToUserValidation = z.object({
  taskId: z.string().min(1, { message: "Task ID is required" }),
  userId: z.string().min(1, { message: "User ID is required" }),
});

module.exports = {
  createTodoValidation,
  updateTodoValidation,
  deleteTodoValidation,
  assignTaskToUserValidation,
};
