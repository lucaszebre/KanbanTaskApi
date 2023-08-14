const db = require("../models");
const Board = db.board;
const Task= db.Task

// Get tasks for a specific column within a board
exports.getColumnTasks = async (req, res) => {
    try {
      const { boardId, columnName } = req.params; // Extract boardId and columnName from request parameters
      const board = await Board.findById(boardId); // Retrieve the board by its ID
  
      if (!board) {
        return res.status(404).json({ message: 'Board not found' });
      }
  
      const column = board.columns.find(col => col.name === columnName); // Find the specified column
      if (!column) {
        return res.status(404).json({ message: 'Column not found' });
      }
  
      res.json(column.tasks);
    } catch (error) {
      res.status(500).json({ message: 'Internal server error' });
    }
  };
  
  // Create a new task within a column
  exports.createTask = async (req, res) => {
    try {
      const { boardId, columnName } = req.params; // Extract boardId and columnName from request parameters
      const board = await Board.findById(boardId); // Retrieve the board by its ID
  
      if (!board) {
        return res.status(404).json({ message: 'Board not found' });
      }
  
      const column = board.columns.find(col => col.name === columnName); // Find the specified column
      if (!column) {
        return res.status(404).json({ message: 'Column not found' });
      }
  
      const newTask = req.body; // Assuming the request body contains the new task data
      column.tasks.push(newTask); // Add the new task to the column
      await board.save(); // Save the updated board
  
      res.status(201).json(newTask);
    } catch (error) {
      res.status(500).json({ message: 'Internal server error' });
    }
  };
  
  // Update an existing task within a column
  exports.updateTask = async (req, res) => {
    try {
      const { boardId, columnName, taskId } = req.params; // Extract boardId, columnName, and taskId from request parameters
      const board = await Board.findById(boardId); // Retrieve the board by its ID
  
      if (!board) {
        return res.status(404).json({ message: 'Board not found' });
      }
  
      const column = board.columns.find(col => col.name === columnName); // Find the specified column
      if (!column) {
        return res.status(404).json({ message: 'Column not found' });
      }
  
      const task = column.tasks.id(taskId); // Find the task within the column by its ID
      if (!task) {
        return res.status(404).json({ message: 'Task not found' });
      }
  
      const updatedTaskData = req.body; // Assuming the request body contains the updated task data
      task.set(updatedTaskData); // Update the task properties
      await board.save(); // Save the updated board
  
      res.json(task);
    } catch (error) {
      res.status(500).json({ message: 'Internal server error' });
    }
  };
  
  // Delete a task within a column
  exports.deleteTask = async (req, res) => {
    try {
      const { boardId, columnName, taskId } = req.params; // Extract boardId, columnName, and taskId from request parameters
      const board = await Board.findById(boardId); // Retrieve the board by its ID
  
      if (!board) {
        return res.status(404).json({ message: 'Board not found' });
      }
  
      const column = board.columns.find(col => col.name === columnName); // Find the specified column
      if (!column) {
        return res.status(404).json({ message: 'Column not found' });
      }
  
      const task = column.tasks.id(taskId); // Find the task within the column by its ID
      if (!task) {
        return res.status(404).json({ message: 'Task not found' });
      }
  
      task.remove(); // Remove the task from the column
      await board.save(); // Save the updated board
  
      res.json({ message: 'Task deleted successfully' });
    } catch (error) {
      res.status(500).json({ message: 'Internal server error' });
    }
  };

  
  module.exports = {
    getColumnTasks,
    createTask,
    updateTask,
    deleteTask,
  };
  