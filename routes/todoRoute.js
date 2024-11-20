const express = require('express');
const {
  createTodo,
  updateTodo,
  deleteTodo,
  assignTaskToUser,
} = require('../controllers/todoController');
const {authMiddleware} = require('../middlewares/authMiddleware');

const router = express.Router();

// Create a new Todo
router.post('/create', authMiddleware, createTodo);

// Update an existing Todo
router.put('/update', authMiddleware, updateTodo);

// Delete a Todo
router.delete('/delete', authMiddleware, deleteTodo);

// Assign a Todo to a User
router.post('/assign', authMiddleware, assignTaskToUser);

module.exports = router;
