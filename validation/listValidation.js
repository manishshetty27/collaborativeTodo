const { z } = require("zod");

// Validation for creating a list
const createListValidation = z.object({
  owner: z.string().nonempty({ message: "Owner is required" }),
  title: z.string().nonempty({ message: "Title is required" }),
  collaborators: z
    .array(z.string().nonempty({ message: "Collaborator ID must be a non-empty string" }))
    .optional(),
});

// Validation for adding a task to a list
const addTaskToListValidation = z.object({
  listId: z.string().nonempty({ message: "List ID is required" }),
  taskId: z.string().nonempty({ message: "Task ID is required" }),
});

// Validation for removing a task from a list
const removeTaskFromListValidation = z.object({
  listId: z.string().nonempty({ message: "List ID is required" }),
  taskId: z.string().nonempty({ message: "Task ID is required" }),
});

// Validation for updating a list
const updateListValidation = z.object({
  listId: z.string().nonempty({ message: "List ID is required" }),
  title: z.string().optional(),
  collaborators: z
    .array(z.string().nonempty({ message: "Collaborator ID must be a non-empty string" }))
    .optional(),
});

// Validation for deleting a list
const deleteListValidation = z.object({
  listId: z.string().nonempty({ message: "List ID is required" }),
});

// Validation for adding a collaborator by email
const addCollaboratorValidation = z.object({
  listId: z.string().nonempty({ message: "List ID is required" }),
  email: z.string().email({ message: "Valid email is required" }),
});

// Validation for removing a collaborator
const removeCollaboratorValidation = z.object({
  listId: z.string().nonempty({ message: "List ID is required" }),
  collaboratorId: z.string().nonempty({ message: "Collaborator ID is required" }),
});

module.exports = {
  createListValidation,
  addTaskToListValidation,
  removeTaskFromListValidation,
  updateListValidation,
  deleteListValidation,
  addCollaboratorValidation,
  removeCollaboratorValidation,
};
