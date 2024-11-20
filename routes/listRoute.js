const express = require("express");
const router = express.Router();
const {
  createList,
  updateList,
  deleteList,
  addCollaborator,
  removeCollaborator,
} = require("../controllers/listController");

// Route to create a new list
router.post("/create", createList);

// Route to update an existing list
router.put("/update", updateList);

// Route to delete a list
router.delete("/delete", deleteList);

// Route to add a collaborator to a list
router.post("/add-collaborator", addCollaborator);

// Route to remove a collaborator from a list
router.post("/remove-collaborator", removeCollaborator);

module.exports = router;
