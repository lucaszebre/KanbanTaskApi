const controller = require('../controllers/task.controller'); // Update the path accordingly

module.exports = function(app) {

// Define routes for tasks
app.post('/user/:userId/boards/:boardId/columns/:columnId', controller.createTask);
app.put('/user/:userId/boards/:boardId/columns/:columnId/tasks/:taskId', controller.updateTask);
app.get('/user/:userId/boards/:boardId/columns/:columnId/tasks/:taskId', controller.getTask);
app.delete('/user/:userId/boards/:boardId/columns/:columnId/tasks/:taskId', controller.deleteTask);
app.put('/user/:userId/boards/:boardId/columns1/:columnId1/tasks/:taskId/columns2/:columnId2', controller.changeColumns);
}
