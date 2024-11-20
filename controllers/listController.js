const { 
  createListValidation, 
  addTaskToListValidation, 
  removeTaskFromListValidation, 
  updateListValidation, 
  deleteListValidation, 
  addCollaboratorValidation, 
  removeCollaboratorValidation 
} = require("../validation/listValidation");
const { List } = require("../models/ListSchema");
const { Todo } = require("../models/TodoSchema");
const { User } = require("../models/UserSchema");

// Create a new list
const createList = async (req, res) => {
  try {
    const parsedData = createListValidation.safeParse(req.body);

    if (!parsedData.success) {
      return res.status(400).json({
        message: "Validation failed",
        errors: parsedData.error.issues,
      });
    }

    const { owner, title, collaborators } = parsedData.data;

    const newList = new List({
      owner,
      title,
      collaborators,
    });

    await newList.save();

    res.status(201).json({
      message: "List created successfully",
      list: newList,
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to create list",
      error: error.message,
    });
  }
};

// Add a task to a list
const addTaskToList = async (req, res) => {
  try {
    const parsedData = addTaskToListValidation.safeParse(req.body);

    if (!parsedData.success) {
      return res.status(400).json({
        message: "Validation failed",
        errors: parsedData.error.issues,
      });
    }

    const { listId, taskId } = parsedData.data;

    const list = await List.findById(listId);
    if (!list) {
      return res.status(404).json({
        message: "List not found",
      });
    }

    const task = await Todo.findById(taskId);
    if (!task) {
      return res.status(404).json({
        message: "Task not found",
      });
    }

    if (!list.tasks.includes(taskId)) {
      list.tasks.push(taskId);
      await list.save();
    }

    res.status(200).json({
      message: "Task added to list successfully",
      list,
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to add task to list",
      error: error.message,
    });
  }
};

// Remove a task from a list
const removeTaskFromList = async (req, res) => {
  try {
    const parsedData = removeTaskFromListValidation.safeParse(req.body);

    if (!parsedData.success) {
      return res.status(400).json({
        message: "Validation failed",
        errors: parsedData.error.issues,
      });
    }

    const { listId, taskId } = parsedData.data;

    const list = await List.findById(listId);
    if (!list) {
      return res.status(404).json({
        message: "List not found",
      });
    }

    list.tasks = list.tasks.filter((id) => id.toString() !== taskId);
    await list.save();

    res.status(200).json({
      message: "Task removed from list successfully",
      list,
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to remove task from list",
      error: error.message,
    });
  }
};

// Update a list (e.g., title or collaborators)
const updateList = async (req, res) => {
  try {
    const parsedData = updateListValidation.safeParse(req.body);

    if (!parsedData.success) {
      return res.status(400).json({
        message: "Validation failed",
        errors: parsedData.error.issues,
      });
    }

    const { listId, title, collaborators } = parsedData.data;

    const list = await List.findById(listId);
    if (!list) {
      return res.status(404).json({
        message: "List not found",
      });
    }

    if (title) list.title = title;
    if (collaborators) list.collaborators = collaborators;

    await list.save();

    res.status(200).json({
      message: "List updated successfully",
      list,
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to update list",
      error: error.message,
    });
  }
};

// Delete a list
const deleteList = async (req, res) => {
  try {
    const parsedData = deleteListValidation.safeParse(req.params);

    if (!parsedData.success) {
      return res.status(400).json({
        message: "Validation failed",
        errors: parsedData.error.issues,
      });
    }

    const { listId } = parsedData.data;

    const list = await List.findByIdAndDelete(listId);
    if (!list) {
      return res.status(404).json({
        message: "List not found",
      });
    }

    res.status(200).json({
      message: "List deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to delete list",
      error: error.message,
    });
  }
};

// Add a collaborator to a list by email
const addCollaborator = async (req, res) => {
  try {
    const parsedData = addCollaboratorValidation.safeParse(req.body);

    if (!parsedData.success) {
      return res.status(400).json({
        message: "Validation failed",
        errors: parsedData.error.issues,
      });
    }

    const { listId, email } = parsedData.data;

    // Find the user by email
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Find the list and update collaborators
    const list = await List.findById(listId);
    if (!list) {
      return res.status(404).json({ message: "List not found" });
    }

    // Check if the user is already a collaborator
    if (list.collaborators.includes(user._id)) {
      return res.status(400).json({ message: "User is already a collaborator" });
    }

    // Add the user to the collaborators array
    list.collaborators.push(user._id);
    await list.save();

    res.status(200).json({ message: "Collaborator added successfully", list });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Remove a collaborator from a list
const removeCollaborator = async (req, res) => {
  try {
    const parsedData = removeCollaboratorValidation.safeParse(req.body);

    if (!parsedData.success) {
      return res.status(400).json({
        message: "Validation failed",
        errors: parsedData.error.issues,
      });
    }

    const { listId, collaboratorId } = parsedData.data;

    const list = await List.findById(listId);
    if (!list) {
      return res.status(404).json({ message: "List not found" });
    }

    // Check if the user is a collaborator
    if (!list.collaborators.includes(collaboratorId)) {
      return res.status(400).json({ message: "Collaborator not found" });
    }

    list.collaborators = list.collaborators.filter(
      (id) => id.toString() !== collaboratorId
    );
    await list.save();

    res.status(200).json({
      message: "Collaborator removed successfully",
      list,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = {
  createList,
  addTaskToList,
  removeTaskFromList,
  updateList,
  deleteList,
  addCollaborator,
  removeCollaborator,
};
