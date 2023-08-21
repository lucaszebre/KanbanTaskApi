const db = require("../models");
const User = db.user;
// Get tasks for a specific column within a board
exports.getColumnTask = async (req, res) => {
    try {
      const { userId,boardId, columnId } = req.params; // Extract boardId and columnName from request parameters
      const user = await User.findOne({ userId: userId }); // Retrieve the board by its ID
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
      const user = await User.findOne({ userId: userId }); // Retrieve the board by its ID
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
      const boardIndex = user.Boards.findIndex(board => board._id.toString() === boardId);

      const columnIndex = user.Boards[boardIndex].columns.findIndex(column => column._id.toString() === columnId);

      const column = user.Boards[boardIndex].columns[columnIndex].tasks.push(newTask);
      const Newcolumn = user.Boards[boardIndex].columns[columnIndex].tasks;
  
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
      const { userId, boardId, columnId, taskId } = req.params; // Extract boardId, columnId, and taskId from request parameters
      const newTask = req.body; // Assuming the request body contains the new task data
    
      const user = await User.findOne({ userId: userId }); // Retrieve the user by their ID
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
  
      const boardIndex = user.Boards.findIndex(board => board._id.toString() === boardId);
      if (boardIndex === -1) {
        return res.status(404).json({ message: 'Board not found' });
      }
  
      const columnIndex = user.Boards[boardIndex].columns.findIndex(column => column._id.toString() === columnId);
      if (columnIndex === -1) {
        return res.status(404).json({ message: 'Column not found' });
      }
  
      const taskIndex = user.Boards[boardIndex].columns[columnIndex].tasks.findIndex(task => task._id.toString() === taskId);
      if (taskIndex === -1) {
        return res.status(404).json({ message: 'Task not found' });
      }
  
      // Update the task data with the newTask data
      user.Boards[boardIndex].columns[columnIndex].tasks[taskIndex] = {
        ...user.Boards[boardIndex].columns[columnIndex].tasks[taskIndex],
        ...newTask
      };
  
      await user.save(); // Save the updated user
  
      res.status(200).json(user.Boards[boardIndex].columns[columnIndex].tasks[taskIndex]);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal server error' });
    }
  };
  
  // Delete a task within a column
  exports.deleteTask = async (req, res) => {
    try {
      const { userId, boardId, columnId, taskId } = req.params; // Extract boardId, columnId, and taskId from request parameters
      const user = await User.findOne({ userId: userId }); // Retrieve the user by their ID
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
  
      const boardIndex = user.Boards.findIndex(board => board._id.toString() === boardId);
      if (boardIndex === -1) {
        return res.status(404).json({ message: 'Board not found' });
      }
  
      const columnIndex = user.Boards[boardIndex].columns.findIndex(column => column._id.toString() === columnId);
      if (columnIndex === -1) {
        return res.status(404).json({ message: 'Column not found' });
      }
  
      const taskIndex = user.Boards[boardIndex].columns[columnIndex].tasks.findIndex(task => task._id.toString() === taskId);
      if (taskIndex === -1) {
        return res.status(404).json({ message: 'Task not found' });
      }
  
      // Update the task data with the newTask data
      user.Boards[boardIndex].columns[columnIndex].tasks.splice(taskIndex,1);
  
      await user.save(); // Save the updated user
      res.status(201).json({ message: 'Task deleted successfully' });
    } catch (error) {
      res.status(500).json({ message: 'Internal server error' });
    }
  };


  
  exports.updateColumnTask = async (req, res) => {
    try{
      const { userId, boardId, columnId} = req.params;
      const newBoardData = req.body; 
      const { name } = newBoardData;
      const user = await User.findOne({ userId: userId }); // Retrieve the board by its ID
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
      user.Boards[boardIndex].columns[columnIndex].name=name

      await user.save()
      res.status(200).json(user.Boards[boardIndex].columns[columnIndex]);
    }catch(error){
      console.error(error);
      res.status(500).json({ message:error });
    }
  }