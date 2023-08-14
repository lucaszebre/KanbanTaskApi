const mongoose = require('mongoose');

// Define subtask schema
const subtaskSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  isCompleted: {
    type: Boolean,
    default: false
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
  subtasks: [subtaskSchema]
});

// Define board schema
const boardSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  columns: [{
  
    name: {
      type: String,
      required: true
    },
    tasks: [taskSchema]
  
}]
});

const AllBoardsSchema = new mongoose.Schema({
  Boards:[boardSchema]
})

// Create the Board model
const Board = mongoose.model('Board', boardSchema);
const AllBoard = mongoose.model('AllBoard',AllBoardsSchema)
module.exports = Board;

