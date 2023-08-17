const mongoose = require("mongoose");
const {isEmail} = require('validator')


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

const User = mongoose.model(
  "User",
  new mongoose.Schema({
    username: {
    type:String,
    required:[true,"please enter a username"],
    unique:true},
    email: {type:String,
    required:[true,'please enter a  email'],
    unique:true,
    validate:[isEmail,'Please enter a valid email']
  },
    password: {type:String,
    required:[true,'please enter a password'],
    minilength:[6,'Minimun password length of 6 character']},
    Boards:[boardSchema]
  })
);

// Create the Board model

module.exports = User;
