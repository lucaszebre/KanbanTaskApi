const db = require("../models");
const User = db.user;
// Get tasks for a specific column within a board
exports.getColumnTask = async (req, res) => {
    try {
      const { userId,boardId, columnId } = req.params; // Extract boardId and columnName from request parameters
      const user = await User.findById(userId); // Retrieve the board by its ID
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }

      const boardIndex = user.Boards.findIndex(board => board._id.toString() === boardId);

      const columnIndex = user.Boards[boardIndex].columns.findIndex(column => column._id.toString() === columnId);

      const column = user.Boards[boardIndex].columns[columnIndex];

 // Find the specified column
      if (!column) {
        return res.status(404).json({ message: 'Column not found' });
      }
  
      res.json(column);
    } catch (error) {
      res.status(500).json({ message: 'Internal server error' });
    }
  };
  
  // Create a new task within a column
  exports.createTask = async (req, res) => {
    try {
      const newTask = req.body; // Assuming the request body contains the new task data

      const { userId,boardId, columnId } = req.params; // Extract boardId and columnName from request parameters
      const user = await User.findById(userId); // Retrieve the board by its ID
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
      const boardIndex = user.Boards.findIndex(board => board._id.toString() === boardId);

      const columnIndex = user.Boards[boardIndex].columns.findIndex(column => column._id.toString() === columnId);

      const column = user.Boards[boardIndex].columns[columnIndex].tasks.push(newTask);
      const Newcolumn = user.Boards[boardIndex].columns[columnIndex].tasks;
      console.log('column',column);
  
      if (!column) {
        return res.status(404).json({ message: 'Column not found' });
      }
      user.save();
      res.status(201).json(Newcolumn);
    } catch (error) {
      res.status(500).json({ message: 'Internal server error' });
    }
  };
  
  // Update an existing task within a column
  exports.updateTask = async (req, res) => {
    try {
      const { userId,boardId, columnId, taskId } = req.params; // Extract boardId, columnName, and taskId from request parameters
      const newTask = req.body; // Assuming the request body contains the new task data
  
      const user = await User.findById(userId); // Retrieve the board by its ID
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
      const boardIndex = user.Boards.findIndex(board => board._id.toString() === boardId);
      if (boardIndex === -1) {
        return res.status(404).json({ message: 'Board not found' });
      }
      const columnIndex = user.Boards[boardIndex].columns.findIndex(column => column._id.toString() === columnId);
      if (columnIndex=== -1) {
        return res.status(404).json({ message: 'Column not found' });
      }
      const taskIndex = user.Boards[boardIndex].columns[columnIndex].tasks.findIndex(column => column._id.toString() === taskId);
      if (taskIndex === -1) {
        return res.status(404).json({ message: 'Task not found' });
      }
      const task = user.Boards[boardIndex].columns[columnIndex].tasks[taskIndex];

      console.log('task',task);
  
      
      user.save();
      res.status(201).json(task);
    } catch (error) {
      res.status(500).json({ message: 'Internal server error' });
    }
  };
  
  // Delete a task within a column
  exports.deleteTask = async (req, res) => {
    try {
      const { boardId, columnId, taskId } = req.params; // Extract boardId, columnName, and taskId from request parameters
      const board = await Board.findById(boardId); // Retrieve the board by its ID
  
      if (!board) {
        return res.status(404).json({ message: 'Board not found' });
      }
  
      const column = board.columns.findById(columnId); // Find the specified column
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


  