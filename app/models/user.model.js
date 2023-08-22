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
    required: true,
    ref: 'Task' // Reference to the Task model
  },
  columnId: { // Reference to the parent column ID
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'Column' // Reference to the Column model
  },
  boardId: { // Reference to the parent board ID
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'Board' // Reference to the Board model
  }
});


// Define task schema
const taskSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
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
    required: true,
    ref: 'Column' // Reference to the Column model
  },
  boardId: { // Reference to the parent board ID
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'Board' // Reference to the Board model
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
    required: true,
    ref: 'Board' // Reference to the Board model
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

