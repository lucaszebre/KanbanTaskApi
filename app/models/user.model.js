const mongoose = require("mongoose");
const {isEmail} = require('validator')
const crypto = require("crypto")
const uuid = crypto.randomUUID()

// Define subtask schema
const subtaskSchema = new mongoose.Schema({
  _id: {
    type: String,
    default:  () => crypto.randomUUID()
    , // Generate a unique ID using nanoid
  },
  title: {
    type: String,
    required: true
  },
  isCompleted: {
    type: Boolean,
    default: false
  },
  columnId:{
    type:String,},
    boardId:{
      type:String,
    },
    taskId:{
      type:String,
      required:false
    }
});

// Define task schema
const taskSchema = new mongoose.Schema({
  _id: {
    type: String,
    default:  () => crypto.randomUUID(), // Generate a unique ID using nanoid
  },
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
  columnId:{
    type:String,
    },
    boardId:{
      type:String,
    }
});

// Define board schema
const boardSchema = new mongoose.Schema({
  _id: {
    type: String,
    default:  () => crypto.randomUUID(), // Generate a unique ID using nanoid
  },
  name: {
    type: String,
  },
  columns: [{
    _id: {
      type: String,
      default:  () => crypto.randomUUID(), // Generate a unique ID using nanoid
    },
    name: {
      type: String,
    },
    boardId:{
      type:String,
    },
    tasks: [taskSchema]
  
}]
});

const User = mongoose.model(
  "User",
  new mongoose.Schema({
    userId: {type:String,
    unique:true,
  },
    
    Boards:[boardSchema]
  })
);

// Create the Board model

module.exports = User;
