const db = require("../models");
const Board = db.board;

// Get user's boards
exports.getUserBoards = async (req, res) => {
    try {
      // Assuming you have a user ID available in req.user
      const userBoards = await Board.find({ userId: req.user }); // Adjust the query to match your schema
        res.json(userBoards);
    } catch (error) {
        res.status(500).json({ message: 'Internal server error' });
    }
    };
    
  // Update boards
exports.updateBoards = async (req, res) => {
    try {
        // Assuming you have a user ID available in req.user
        // Update logic here, e.g., req.body contains updated board data
        // You can use findByIdAndUpdate or findOneAndUpdate
        const newBoardData = req.body; // Assuming the request body contains the new board data
        const { boardId} = req.params;
        const updatedBoards = await Board.findByIdAndUpdate(boardId, newBoardData);
        res.json(updatedBoards);
        } catch (error) {
        res.status(500).json({ message: 'Internal server error' });
        }
    };
    
  // Create new board
    exports.createBoard = async (req, res) => {
        try {
        // Assuming you have a user ID available in req.user
        const newBoardData = req.body; // Assuming the request body contains the new board data
        newBoardData.userId = req.user; // Set the user ID associated with the board
        const newBoard = await Board.create(newBoardData);
        res.status(201).json(newBoard);
        } catch (error) {
        res.status(500).json({ message: 'Internal server error' });
        }
    };

    exports.deleteBoard=async (req,res) => {
      try{
        const { boardId } = req.params;
        const deleteBoard = await Board.findByIdAndDelete(boardId)
        res.status(201).json(deleteBoard);
      }catch(error){
        res.status(500).json({message:'Internal server error'})
      }
    }