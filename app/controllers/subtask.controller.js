const db = require("../models");
const User = db.user;
// Get tasks for a specific column within a board

    
    // Create a new task within a column
    exports.ToggleSubTask = async (req, res) => {
        try {
                const { userId, boardId, columnId, taskId,subtaskId } = req.params; // Extract boardId, columnId, and taskId from request parameters
                const { isCompleted } = req.body;  // Assuming the request body contains the new task data
                
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
                
                const subtaskIndex = user.Boards[boardIndex].columns[columnIndex].tasks[taskIndex].subtasks.findIndex(subtask => subtask._id.toString() === subtaskId)
                if (subtaskIndex === -1) {
                    return res.status(404).json({ message: 'SubTask not found' });
                }                
                
                user.Boards[boardIndex].columns[columnIndex].tasks[taskIndex].subtasks[subtaskIndex].isCompleted = isCompleted
            
                await user.save(); // Save the updated user
            
                res.status(200).json(user.Boards[boardIndex].columns[columnIndex].tasks[taskIndex]);
                } catch (error) {
                console.error(error);
                res.status(500).json({ message: 'Internal server error' });
                }
    };
    
  // Create a new task within a column
exports.createSubTask = async (req, res) => {
    try {
      const newSubtask = req.body; // Assuming the request body contains the new task data

      const { userId,boardId, columnId,taskId } = req.params; // Extract boardId and columnName from request parameters
      const user = await User.findOne({ userId: userId }); // Retrieve the board by its ID
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
      const boardIndex = user.Boards.findIndex(board => board._id.toString() === boardId);

      const columnIndex = user.Boards[boardIndex].columns.findIndex(column => column._id.toString() === columnId);
      const taskIndex = user.Boards[boardIndex].columns[columnIndex].tasks.findIndex(task => task._id.toString() === taskId);

      // Push the new subtask to the tasks array
    user.Boards[boardIndex].columns[columnIndex].tasks[taskIndex].subtasks.push(newSubtask);
  
    
     await user.save();
      res.status(201).json(newSubtask);
    } catch (error) {
      res.status(500).json({ message: 'Internal server error' });
    }
  };
  