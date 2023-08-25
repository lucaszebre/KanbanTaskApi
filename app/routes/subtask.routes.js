const controller = require('../controllers/subtask.controller'); // Update the path accordingly

module.exports = function(app) {

// Define routes for tasks
app.put('/user/:userId/boards/:boardId/columns/:columnId/tasks/:taskId/subtask/:subtaskId', controller.ToggleSubTask);
app.post('/user/:userId/boards/:boardId/columns/:columnId/tasks/:taskId', controller.createSubTask);
}
