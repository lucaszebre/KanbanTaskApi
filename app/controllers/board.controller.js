const db = require("../models");
const User = db.user;
const Board = db.user;

// Get user's boards
exports.getUserBoards = async (req, res) => {
    try {
      const { userId} = req.params;
      // Assuming you have a user ID available in req.user
      const userBoards = await User.find({ userId: userId }); // Adjust the query to match your schema
        res.status(200).json(userBoards);
    } catch (error) {
        res.status(500).json({ message: 'Internal server error' });
    }
    };

    exports.getOneBoard = async (req,res) => {
      try{
      const {userId,boardId} = req.params;
      const userBoards = await User.findOne({ userId: userId } ); // Adjust the query to match your schema
      const boardIndex = userBoards.Boards.findIndex(board => board._id.toString() === boardId);

      const board = userBoards.Boards[boardIndex];
      console.log('board',board)
      res.status(200).json(board);
      }catch(error){
        res.status(500).json({message:'Internal server error'})
      }
    }
  // Update boards
  exports.updateBoards = async (req, res) => {
    try {
      const { boardId, userId } = req.params;
      const newBoardData = req.body; // Assuming the request body contains the new board data
      const { name, columns } = newBoardData;
  
      const userBoards = await User.findOne({ userId: userId }); // Adjust the query to match your schema
  
      if (!userBoards) {
        return res.status(404).json({ message: 'User not found' });
      }
  
      const boardIndex = userBoards.Boards.findIndex(board => board._id.toString() === boardId);
  
      if (boardIndex === -1) {
        return res.status(404).json({ message: 'Board not found' });
      }
  
      if (name) {
        // If "name" property is present in the request body, update only the name
        userBoards.Boards[boardIndex].name = name;
      }
  
      if (columns) {
        // If "columns" property is present in the request body, update columns
        userBoards.Boards[boardIndex].columns = columns;
      }
  
      await userBoards.save();
  
      res.status(200).json(userBoards);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal server error' });
    }
  };
  
  
    
  // Create new board
    exports.createBoard = async (req, res) => {
        try {
          const { userId} = req.params;
        // Assuming you have a user ID available in req.user
        const newBoardData = req.body; // Assuming the request body contains the new board data
        newBoardData.userId = req.user; // Set the user ID associated with the board

        const user = await User.findOneAndUpdate(
          {userId:userId},
          { $push: { Boards: newBoardData } }, // Add the new board to the user's Boards array
          { new: true } // Return the updated user
        );
        res.status(201).json(user);
        } catch (error) {
        res.status(500).json({ message: 'Internal server error' });
        }
    };

    exports.deleteBoard = async (req, res) => {
      try {
        const { boardId, userId } = req.params;
    
        // Find the user by ID
        const user = await User.findOne({ userId: userId });
        if(user){
          // Find the index of the board to be deleted in the user's Boards array
        const boardIndex = user.Boards.findIndex(board => board._id.toString() === boardId);
    
        if (boardIndex === -1) {
          return res.status(404).json({ message: 'Board not found' });
        }
    
        // Remove the board at the specified index
        user.Boards.splice(boardIndex, 1);
    
        // Save the updated user
        await user.save();
    
        res.status(200).json({ message: 'Board deleted successfully', updatedUser: user });
        }
    
        
      } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
      }
    };

    
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