const { 
  createListValidation, 
  updateListValidation, 
  deleteListValidation, 
  addCollaboratorValidation, 
  removeCollaboratorValidation 
} = require("../validation/listValidation");

const { List } = require("../models/ListSchema");
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

// Update a list
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

// Add a collaborator to a list
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

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const list = await List.findById(listId);
    if (!list) {
      return res.status(404).json({ message: "List not found" });
    }

    if (list.collaborators.includes(user._id)) {
      return res.status(400).json({ message: "User is already a collaborator" });
    }

    list.collaborators.push(user._id);
    await list.save();

    res.status(200).json({ message: "Collaborator added successfully", list });
  } catch (error) {
    res.status(500).json({ message: "Failed to add collaborator", error: error.message });
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
    res.status(500).json({ message: "Failed to remove collaborator", error: error.message });
  }
};

module.exports = {
  createList,
  updateList,
  deleteList,
  addCollaborator,
  removeCollaborator,
};
