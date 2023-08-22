const mongoose = require("mongoose");
const { isEmail } = require('validator');

// Define subtask schema
const subtaskSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  isCompleted: {
    type: Boolean,
    default: false
  },
  taskId: { // Reference to the parent task ID
    type: mongoose.Schema.Types.ObjectId,
    required: true
  },
  columnId: { // Reference to the parent column ID
    type: mongoose.Schema.Types.ObjectId,
    required: true
  },
  boardId: { // Reference to the parent board ID
    type: mongoose.Schema.Types.ObjectId,
    required: true
  }
});

// Define task schema
const taskSchema = new mongoose.Schema({
  title: {
    type: String,
    required: false
  },
  description: {
    type: String,
    default: ''
  },
  status: {
    type: String,
    enum: ['Todo', 'In Progress', 'Done'],
    default: 'Todo'
  },
  subtasks: [subtaskSchema],
  columnId: { // Reference to the parent column ID
    type: mongoose.Schema.Types.ObjectId,
    required: true
  },
  boardId: { // Reference to the parent board ID
    type: mongoose.Schema.Types.ObjectId,
    required: true
  }
});

// Define column schema
const columnSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  tasks: [taskSchema],
  boardId: { // Reference to the parent board ID
    type: mongoose.Schema.Types.ObjectId,
    required: true
  }
});

// Define board schema
const boardSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  columns: [columnSchema]
});

const User = mongoose.model(
  "User",
  new mongoose.Schema({
    userId: {
      type: String,
      unique: true
    },
    Boards: [boardSchema]
  })
);

module.exports = User;

