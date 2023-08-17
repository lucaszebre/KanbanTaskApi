const controller = require('../controllers/task.controller'); // Update the path accordingly
const authJwt = require("../middlewares/authJwt");

module.exports = function(app) {

// Define routes for tasks
app.get('/user/:userId/boards/:boardId/columns/:columnId', controller.getColumnTask);
app.post('/user/:userId/boards/:boardId/columns/:columnId', controller.createTask);
app.put('/user/:userId/boards/:boardId/columns/:columnId/tasks/:taskId', controller.updateTask);
app.delete('/user/:userId/boards/:boardId/columns/:columnId/tasks/:taskId', controller.deleteTask);

}
