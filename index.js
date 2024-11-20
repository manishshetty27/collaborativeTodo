const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');

// Load environment variables
dotenv.config();

// Import routes
const userRoutes = require('./routes/userRoute');
const listRoutes = require('./routes/listRoute');
const todoRoutes = require('./routes/todoRoute');

// Initialize the app
const app = express();

// Middleware
app.use(express.json());
app.use(cors()); // Enable CORS for cross-origin requests

// Routes
app.use('/api/users', userRoutes);   // Routes for user actions (register, login, etc.)
app.use('/api/lists', listRoutes);   // Routes for list management
app.use('/api/todos', todoRoutes);   // Routes for todo/task management

// MongoDB connection
mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log('Connected to MongoDB');
    // Start the server
    app.listen(process.env.PORT || 5000, () => {
      console.log('Server is running on port 5000');
    });
  })
  .catch((err) => {
    console.error('Error connecting to MongoDB', err);
  });
