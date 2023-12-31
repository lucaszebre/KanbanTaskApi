const db = require("../models");
const User = db.user;
// Get tasks for a specific column within a board

  
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

      const column = user.Boards[boardIndex].columns[columnIndex].tasks.push({...newTask,userId,boardId,columnId});
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



  exports.getTask = async (req, res) => {
    try {
      const { userId, boardId, columnId, taskId } = req.params;
      const userBoards = await User.findOne({ userId: userId }); // Adjust the query to match your schema
  
      if (!userBoards) {
        res.status(400).json({ message: 'No user found' });
        return;
      }
  
      const boardIndex = userBoards.Boards.findIndex(board => board._id.toString() === boardId);
  
      if (boardIndex === -1) {
        res.status(400).json({ message: 'No board found' });
        return;
      }
  
      const board = userBoards.Boards[boardIndex];
  
      const columnIndex = board.columns.findIndex(column => column._id.toString() === columnId);
  
      if (columnIndex === -1) {
        res.status(400).json({ message: 'No column found' });
        return;
      }
  
      const column = board.columns[columnIndex];
  
      const taskIndex = column.tasks.findIndex(task => task._id.toString() === taskId);
  
      if (taskIndex === -1) {
        res.status(400).json({ message: 'No task found' });
        return;
      }
  
      const task = column.tasks[taskIndex];
  
      res.status(200).json(task);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal server error' });
    }
  };
  

  exports.changeColumns = async (req, res) => { 
    try {
      const { userId, boardId, columnId1,columnId2, taskId } = req.params; // Extract boardId, columnId, and taskId from request parameters
      const user = await User.findOne({ userId: userId }); // Retrieve the user by their ID
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
  
      const boardIndex = user.Boards.findIndex(board => board._id.toString() === boardId);
      if (boardIndex === -1) {
        return res.status(404).json({ message: 'Board not found' });
      }
  
      const columnIndex1 = user.Boards[boardIndex].columns.findIndex(column => column._id.toString() === columnId1);
      const columnIndex2 = user.Boards[boardIndex].columns.findIndex(column => column._id.toString() === columnId2);
      if (columnIndex1 === -1) {
        return res.status(404).json({ message: 'Column 1 not found' });
      }
      if (columnIndex2 === -1) {
        return res.status(404).json({ message: 'Column 2 not found' });
      }
  
      const taskIndex1 = user.Boards[boardIndex].columns[columnIndex1].tasks.findIndex(task => task._id.toString() === taskId);
      if (taskIndex1 === -1) {
        return res.status(404).json({ message: 'Task1 not found' });
      }
      
      
      const taskTemp = user.Boards[boardIndex].columns[columnIndex1].tasks[taskIndex1];
      
      // Update the task data with the newTask data
      user.Boards[boardIndex].columns[columnIndex1].tasks.splice(taskIndex1,1);
      user.Boards[boardIndex].columns[columnIndex2].tasks.push(taskTemp);
      await user.save(); // Save the updated user
      res.status(201).json({ message: 'Task change columns' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal server error' });
    }
  }