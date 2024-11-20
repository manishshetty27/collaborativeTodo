const express = require('express');
const {
  createList,
  updateList,
  deleteList,
  addTaskToList,
  removeTaskFromList,
  addCollaborator,
  removeCollaborator,
} = require('../controllers/listController');

const router = express.Router();

// Create a new list
router.post('/create', createList);

// Add a task to a list
router.post('/add-task', addTaskToList);

// Remove a task from a list
router.post('/remove-task', removeTaskFromList);

// Update list details (e.g., title, collaborators)
router.put('/update', updateList);

// Delete a list
router.delete('/:listId', deleteList);

// Add a collaborator to a list by email
router.post('/add-collaborator', addCollaborator);

router.post('/remove-collaborator', removeCollaborator);

module.exports = router;
