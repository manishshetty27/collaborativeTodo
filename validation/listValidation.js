const { z } = require("zod");

// Validation schema for creating a list
const createListValidation = z.object({
  title: z.string().min(1, { message: "Title is required" }),
});

// Validation schema for updating a list
const updateListValidation = z.object({
  listId: z.string().min(1, { message: "List ID is required" }),
  title: z.string().optional(),
});

// Validation schema for deleting a list
const deleteListValidation = z.object({
  listId: z.string().min(1, { message: "List ID is required" }),
});

// Validation schema for adding a collaborator to a list
const addCollaboratorValidation = z.object({
  listId: z.string().min(1, { message: "List ID is required" }),
  email: z.string().email({ message: "Email is required" }),
});

// Validation schema for removing a collaborator from a list
const removeCollaboratorValidation = z.object({
  listId: z.string().min(1, { message: "List ID is required" }),
  collaboratorId: z.string().min(1, { message: "Collaborator ID is required" }),
});

module.exports = {
  createListValidation,
  updateListValidation,
  deleteListValidation,
  addCollaboratorValidation,
  removeCollaboratorValidation,
};
