const { z } = require("zod");

const createTodoValidation = z.object({
  title: z.string().min(1, "Title is required"),
  assignee: z.string().optional(),
  priority: z.enum(["low", "medium", "high"], "Invalid priority level"),
  dueDate: z.string().optional(),
  listId: z.string().nonempty("List ID is required"),
});

const updateTodoValidation = z.object({
  todoId: z.string().nonempty("Todo ID is required"),
  title: z.string().optional(),
  assignee: z.string().optional(),
  priority: z.enum(["low", "medium", "high"]).optional(),
  dueDate: z.string().optional(),
  completed: z.boolean().optional(),
});

const deleteTodoValidation = z.object({
  todoId: z.string().nonempty("Todo ID is required"),
  listId: z.string().nonempty("List ID is required"),
});

const assignTaskToUserValidation = z.object({
  taskId: z.string().nonempty("Task ID is required"),
  userId: z.string().nonempty("User ID is required"),
});

module.exports = {
  createTodoValidation,
  updateTodoValidation,
  deleteTodoValidation,
  assignTaskToUserValidation,
};
