const db = require("../models");
const User = db.user;

exports.createColumns = async (req, res) => {
    try {
      const { boardId, userId } = req.params;
      const { name } = req.body; // Assuming the request body contains the new column's name
  
      // Find the user by ID
      const user = await User.findOne({ userId: userId });
  
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
  
      // Find the index of the board to be updated in the user's Boards array
      const boardIndex = user.Boards.findIndex(board => board._id.toString() === boardId);
  
      if (boardIndex === -1) {
        return res.status(404).json({ message: 'Board not found' });
      }
  
      // Create a new column object with the provided name and an empty tasks array
      const newColumn = {
        name: name,
        tasks: []
      };
  
      // Push the new column to the existing columns array of the board
      user.Boards[boardIndex].columns.push(newColumn);
  
      // Save the updated user
      await user.save();
  
      res.status(200).json({ message: 'Column created successfully', updatedUser: user });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal server error' });
    }
  };


  exports.deleteColumns = async (req,res) => {
    try {
      const { userId, boardId, columnId } = req.params; // Extract boardId, columnId, and taskId from request parameters
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
  
      
  
      // Update the task data with the newTask data
      user.Boards[boardIndex].columns.splice(columnIndex,1);
  
      await user.save(); // Save the updated user
      res.status(201).json({ message: 'Column deleted successfully' });
    } catch (error) {
      res.status(500).json({ message: 'Internal server error' });
    }
  }

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