const express = require("express");
const router = express.Router();
const {authMiddleware} = require("../middlewares/authMiddleware")
const {
  createList,
  updateList,
  deleteList,
  addCollaborator,
  removeCollaborator,
} = require("../controllers/listController");

// Route to create a new list
router.post("/create", authMiddleware ,createList);

// Route to update an existing list
router.put("/update", authMiddleware , updateList);

// Route to delete a list
router.delete("/delete/:listId", authMiddleware , deleteList);

// Route to add a collaborator to a list
router.post("/add-collaborator", authMiddleware , addCollaborator);

// Route to remove a collaborator from a list
router.post("/remove-collaborator", authMiddleware , removeCollaborator);

module.exports = router;
