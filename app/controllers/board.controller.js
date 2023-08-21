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

    exports.changeName = async (req, res) => {
      try {
        const { boardId,userId } = req.params;
        const { name } = req.body; // Assuming the request body contains the new board name
        console.log("userId:", userId);
    console.log("boardId:", boardId);
    console.log("name:", name);
        const userBoards = await User.findOne({ userId: userId }); // Assuming your User model has a field named userId
    
        if (!userBoards) {
          return res.status(404).json({ message: 'User not found' });
        }
    
        const boardIndex = userBoards.Boards.findIndex(board => board._id.toString() === boardId);
    
        if (boardIndex === -1) {
          return res.status(404).json({ message: 'Board not found' });
        }
    
        userBoards.Boards[boardIndex].name = name;
    
        await userBoards.save();
        res.status(200).json(userBoards);
      } catch (error) {
        console.error(error);
        res.status(500).json({ message: error });
      }
    };